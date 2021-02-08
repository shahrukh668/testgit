-- tshark -R 'http or dns' -Xlua_script:http_enum.lua -o frame.generate_md5_hash:TRUE -r pcap
-- tshark -R 'http or dns' -Xlua_script:http_enum.lua -d tcp.port==8060,http -o frame.generate_md5_hash:TRUE -r pcap
-- */1 *   * * *   root    pgrep -f "Xlua_script" ||  (start-stop-daemon --start --quiet --background --exec /usr/bin/tshark --  -i eth2 -n -P -w /tmp/http -b filesize:20000 -b files:3 -Xlua_script:/root/http_enum.lua -q)


local version = "1.6"

local mysql_host = "127.0.0.1"
local mysql_db   = "voipmonitor"
local mysql_user = "root"
local mysql_pass = ""
local id_sensor  = 1


local tappacket_http = Listener.new(nil, "http")
local tappacket_enum = Listener.new(nil, "dns")
--debug = require('debug') -- restore proper 'debug' table
--require("mobdebug").start() -- start the debugger


--MySQL database connection
luasql = require "luasql.mysql"
env = assert (luasql.mysql())
con = assert (env:connect(mysql_db, mysql_user, mysql_pass, mysql_host))

--[[

CREATE TABLE  `voipmonitor`.`http_jj` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`master_id` INT UNSIGNED,
`timestamp` DATETIME NOT NULL ,
`usec` INT UNSIGNED NOT NULL,
`srcip` INT UNSIGNED NOT NULL ,
`dstip` INT UNSIGNED NOT NULL ,
`url` TEXT NOT NULL ,
`type` ENUM('http_ok') DEFAULT NULL ,
`http` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ,
`body` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ,
`callid` VARCHAR( 255 ) NOT NULL ,
`sessid` VARCHAR( 255 ) NOT NULL ,
`external_transaction_id` varchar( 255 ) NOT NULL ,
`id_sensor` smallint DEFAULT NULL,
KEY `timestamp` (`timestamp`),
KEY `callid` (`callid`),
KEY `sessid` (`sessid`),
KEY `external_transaction_id` (`external_transaction_id`),
CONSTRAINT fk__http_jj__master_id
    FOREIGN KEY (`master_id`) REFERENCES `http_jj` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = INNODB;

CREATE TABLE  `voipmonitor`.`enum_jj` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`dnsid` INT UNSIGNED NOT NULL ,
`timestamp` DATETIME NOT NULL ,
`usec` INT UNSIGNED NOT NULL,
`srcip` INT UNSIGNED NOT NULL ,
`dstip` INT UNSIGNED NOT NULL ,
`isresponse` TINYINT NOT NULL ,
`recordtype` SMALLINT NOT NULL ,
`queryname` VARCHAR(255) NOT NULL ,
`responsename` VARCHAR(255) NOT NULL ,
`data` BLOB NOT NULL ,
`id_sensor` smallint DEFAULT NULL,
KEY `timestamp` (`timestamp`),
KEY `dnsid` (`dnsid`),
KEY `queryname` (`queryname`),
KEY `responsename` (`responsename`)
) ENGINE = INNODB;

]]--


-- called at the end of the capture to print the summary
function tappacket_http.draw()
--  debug("http packets: " .. httppackets)
end

function tappacket_enum.draw()
--  debug("http packets: " .. httppackets)
end


-- called once each time the filter of the tap matches
local body_f = Field.new("data-text-lines")
local json_body_f = Field.new("json")
local data_body_f = Field.new("data")
local http_request_uri_f = Field.new("http.request.uri")
local timestamp_f = Field.new("frame.time_epoch")
local ip_src_f = Field.new("ip.src")
local ip_dst_f = Field.new("ip.dst")
local port_src_f = Field.new("tcp.srcport")
local port_dst_f = Field.new("tcp.dstport")
local seq_f = Field.new("tcp.seq")
local ack_f = Field.new("tcp.ack")
local http_resp_code_f = Field.new("http.response.code")
local http_f = Field.new("http")

local dnsid_f = Field.new("dns.id")
local dnsquery_f = Field.new("dns.qry.name")
local dnsresponse_f = Field.new("dns.resp.name")
local recordtype_f = Field.new("dns.qry.type") -- http://en.wikipedia.org/wiki/List_of_DNS_record_types
local isresponse_f = Field.new("dns.flags.response")

local md5_f = Field.new("frame.md5_hash")

-- -------------------------------------
-- HTTP
-- -------------------------------------

-- http200_OK table
local http200_OK = {}

function tappacket_http.packet(pinfo,tvb,tapinfo)
 
	local ip_src = ip_src_f()
	local ip_dst = ip_dst_f()
	local port_src = port_src_f()
	local port_dst = port_dst_f()
	local seq = seq_f()

	if(not check_dupl(ip_src, ip_dst, port_src, port_dst, seq)) then
		return
	end

	local ack = ack_f()
	
	-- store split timestamp and usec
	local ts
	local usec
	ts, usec = string.match(tostring(timestamp_f()), "(%d+).(%d+)")
	
	local http_request_uri = http_request_uri_f()
	local http_resp_code = http_resp_code_f()

	local body_ascii = ""
	local body = body_f()
	if(not body) then
		body = json_body_f()
		if(not body) then
			body = data_body_f()
		end
	end
	if(body) then
		local body_str = tostring(body.value)
		-- convert hex string pairs to real string
		local hexnum
		for i = 1, string.len(tostring(body_str)), 2 do
			hexnum = tonumber(string.sub(body_str, i, i + 1), 16)
			body_ascii = body_ascii .. string.format("%c", hexnum)
		end
	end
	
	local http_ascii = ""
	local http_ascii_conv_cr_lf = ""
	local http = http_f()
	if(http) then
		local http_str = tostring(http.value)
		-- convert hex string pairs to real string
		local hexnum
		for i = 1, string.len(tostring(http_str)), 2 do
			hexnum = tonumber(string.sub(http_str, i, i + 1), 16)
			local char = string.format("%c", hexnum)
			http_ascii = http_ascii .. char
			if(char == "\n") then
				char = "\\n"
			elseif(char == "\r") then
				char = "\\r"
			end
			http_ascii_conv_cr_lf = http_ascii_conv_cr_lf .. char
		end
	end
	
	local uri = ""
	if(http_request_uri) then
		uri = tostring(http_request_uri)
		if(not uri) then
			uri = ""
		end
	end
	
	if(body_ascii ~= "" and uri ~= "") then
		sessionid = string.match(uri, "jajahsessionid=(.*)")
		if(not sessionid) then
			-- session not in uri - try it from body
			sessionid = string.match(body_ascii, "\"variable_jjSessionId\" *\t*: *\t*\"([^\"]+)\"")
		end
		if(not sessionid) then
			-- still no session - take it from another uri format
			sessionid = string.match(uri, "sessions/+([^/]*)/")
		end
		if(not sessionid) then
			sessionid = ""
		end
	end

	local callid = ""
	if(body_ascii ~= "") then
		callid = string.match(body_ascii, "\"variable_sip_call_id\" *: *\t*\"([^\"]+)\"")
		if(not callid) then
			callid = ""
		end
	end
	
	if(http_ascii_conv_cr_lf ~= "") then
		external_transaction_id = string.match(http_ascii_conv_cr_lf, "External[-]Transaction[-]Id: ([^\\]+)\\r\\n")
		if(not external_transaction_id) then
			external_transaction_id = ""
		end
	end
	
	local http_ok = false
	local master_id = nil
	if(http_resp_code and tostring(http_resp_code) == "200") then
		local idHttp200_Ok = "ips:"..tostring(ip_src).."_ipd:"..tostring(ip_dst)..
				     "_ports:"..tostring(port_src).."_portd:"..tostring(port_dst)..
				     "_seq"..tostring(seq)
		
		if(http200_OK[idHttp200_Ok]) then
			http_ok = true
			master_id = tostring(http200_OK[idHttp200_Ok]["id"]);
			http200_OK[idHttp200_Ok] = nil
		end
	end
	
	if(uri ~= "" and body_ascii ~= "" or http_ok) then
	
		local master_id_sql_string;
		local type_sql_string;
	 
		if(http_ok) then
			master_id_sql_string = tostring(master_id)
			type_sql_string = "'http_ok'"
		else
			master_id_sql_string = 'NULL'
			type_sql_string = "NULL"
		end
	 
		for i=1,2 do
			if(i == 2) then
				print("problem with insert tryting again")
				con = env:connect(mysql_db, mysql_user, mysql_pass, mysql_host)
			end
			res = con:execute(string.format([[
				INSERT INTO http_jj
				(master_id, timestamp, usec, srcip, dstip, url, type, http, body, callid, sessid, external_transaction_id, id_sensor)
				VALUES (%s, FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s', %s, '%s', '%s', '%s', '%s', '%s', %s)
				]],
				master_id_sql_string,
				con:escape(tostring(ts)), con:escape(tostring(usec)), 
				con:escape(tostring(ip_src)), con:escape(tostring(ip_dst)), 
				con:escape(tostring(uri)), 
				type_sql_string,
				con:escape(tostring(http_ascii)),
				con:escape(tostring(body_ascii)),
				con:escape(tostring(callid)), 
				con:escape(tostring(sessionid)),
				con:escape(tostring(external_transaction_id)),
				tostring(id_sensor)
				))
			if(res) then
				break
			end
		end
		
		if(res) then
			if(http_ok) then
				print("HTTP 200 OK STORED")
			else
				print("HTTP BODY STORED")
				local lastId = nil
				local resLastId = con:execute("SELECT LAST_INSERT_ID()")
				if resLastId then
					lastId  = resLastId:fetch()
				end
				if lastId then
					local idHttp200_Ok = "ips:"..tostring(ip_dst).."_ipd:"..tostring(ip_src)..
							     "_ports:"..tostring(port_dst).."_portd:"..tostring(port_src)..
							     "_seq"..tostring(ack)
					http200_OK[idHttp200_Ok] = {
						id = lastId,
						ts = ts
					}
				end
			end
		end
	end

	-- remove old http 200 ok ids
	for i,j in pairs(http200_OK) do
		if(tonumber(http200_OK[i]["ts"]) > tonumber(ts) + 60) then
			http200_OK[i] = nil
		end
	end
end


-- -------------------------------------
-- ENUM
-- -------------------------------------

function tappacket_enum.packet(pinfo,tvb,tapinfo)
 
	local ip_src = ip_src_f()
	local ip_dst = ip_dst_f()
	local port_src = port_src_f()
	local port_dst = port_dst_f()
	local seq = seq_f()

	if(not check_dupl(ip_src, ip_dst, port_src, port_dst, seq)) then
		return
	end

	local queryname = dnsquery_f()
	local responsename = dnsresponse_f()
	local recordtype = recordtype_f()
	local isresponse = isresponse_f()
	local dnsid = dnsid_f()
	
	print("dns query [" .. tostring(queryname) .. "] response [" .. tostring(responsename) .. "] rt [" .. tostring(recordtype) .. "] isresponse [" .. tostring(isresponse) .. "] dnsid [" .. tostring(dnsid) .. "]")
	
	--myfile = io.open("/tmp/test.tvb", "w+b")
	--myfile:write(tobinary( tostring(tvb:range(0):bytes())))
	--myfile:flush()
	--myfile:close()
	--print(tostring(tvb:range(0):bytes()))

	local ts
	local usec
	ts, usec = string.match(tostring(timestamp_f()), "(%d+).(%d+)")

	-- write result into database
	for i=1,2 do
		if(i == 2) then
			print("problem with insert tryting again")
			con = env:connect(mysql_db, mysql_user, mysql_pass, mysql_host)
		end
		res = con:execute(string.format([[
			INSERT INTO enum_jj
			(dnsid, timestamp, usec, srcip, dstip, recordtype, isresponse, queryname, responsename, data, id_sensor)
			VALUES ('%s', FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s', '%s', '%s', '%s', '%s', %s)
			]], 
			con:escape(tostring(dnsid)), 
			con:escape(tostring(ts)), con:escape(tostring(usec)), 
			con:escape(tostring(ip_src)), con:escape(tostring(ip_dst)), 
			con:escape(tostring(recordtype)), 
			con:escape(tostring(isresponse)), 
			con:escape(tostring(queryname)), 
			con:escape(tostring(responsename)), 
			con:escape(tobinary(tostring(tvb:range(0):bytes()))),
			tostring(id_sensor)
		))
		if(res) then
			break
		end
	end
	if(res) then
		print("DNS QUERY STORED")
	end
end

function hex(ascii_code)
	-- convert an ascii char code to an integer value "0" => 0, "1" => 1, etc
	if not ascii_code then
		return 0
	elseif ascii_code < 58 then
		return ascii_code - 48
	elseif ascii_code < 91 then
		return ascii_code - 65 + 10
	else
		return ascii_code - 97 + 10
	end
end

function tobinary(hexbytes)
-- this function converts a hex-string to raw bytes
	
	binary = ""
	
	for i=1,string.len(hexbytes),2 do
		byte = 16 * hex( string.byte(hexbytes,i) ) + hex( string.byte(hexbytes,i+1) )
		binary = binary .. string.char( byte )
		
	end

	return binary
	
end

-- -------------------------------------
-- check dupl
-- -------------------------------------

local table_id_dupl = {}

function check_dupl(ip_src, ip_dst, port_src, port_dst, seq)
	local id_string = tostring(ip_src) .. tostring(ip_dst) .. tostring(port_src) .. tostring(port_dst) .. tostring(seq)
	for i, v in ipairs(table_id_dupl) do
		if(v == id_string) then
			print("-- DUPLICATE PACKET DETECTED")
			return false
		end
	end
	table.insert(table_id_dupl, id_string)
	if(#table_id_dupl > 10) then
		table.remove(table_id_dupl, 1)
	end
	return true
end
