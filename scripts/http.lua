-- tshark -R http -Xlua_script:http.lua -r pcap

local version = "1.1"

local mysql_host = "127.0.0.1"
local mysql_db   = "voipmonitor"
local mysql_user = "root"
local mysql_pass = ""

local taphttp = Listener.new(nil, "http")
--debug = require('debug') -- restore proper 'debug' table
--require("mobdebug").start() -- start the debugger

--MySQL database connection
luasql = require "luasql.mysql"
env = assert (luasql.mysql())
con = assert (env:connect(mysql_db, mysql_user, mysql_pass, mysql_host))

--http200_OK table
local http200_OK = {}

--[[

CREATE TABLE  `voipmonitor`.`http_jj` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`master_id` INT UNSIGNED,
`timestamp` DATETIME NOT NULL ,
`usec` INT UNSIGNED NOT NULL,
`srcip` INT UNSIGNED NOT NULL ,
`dstip` INT UNSIGNED NOT NULL ,
`url` TEXT NOT NULL ,
`body` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL ,
`callid` VARCHAR( 255 ) NOT NULL ,
`sessid` VARCHAR( 255 ) NOT NULL ,
KEY `timestamp` (`timestamp`),
KEY `callid` (`callid`),
KEY `sessid` (`sessid`),
CONSTRAINT fk__http_jj__master_id
    FOREIGN KEY (`master_id`) REFERENCES `http_jj` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = INNODB;

]]--

-- called at the end of the capture to print the summary
function taphttp.draw()
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


function taphttp.packet(pinfo,tvb,tapinfo)
		
	local ip_src = ip_src_f()
	local ip_dst = ip_dst_f()
	local port_src = port_src_f()
	local port_dst = port_dst_f()
	local seq = seq_f();
	local ack = ack_f();
	
	-- store split timestamp and usec
	local ts
	local usec
	ts, usec = string.match(tostring(timestamp_f()), "(%d+).(%d+)")
	
	local http_request_uri = http_request_uri_f();
	local http_resp_code = http_resp_code_f();

	local body_ascii = ""
	local body = body_f()
	if(not body and
	   http_request_uri and not(http_resp_code and tostring(http_resp_code) == "200")) then
		body = json_body_f();
		if(not body) then
			body = data_body_f();
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
	
	if(body_ascii ~= "") then
		if(not http_request_uri) then
			return
		end
		local uri = tostring(http_request_uri)
		
		-- take session id from uri
		sessionid = string.match(uri, "jajahsessionid=(.*)")
		if(not sessionid) then
			-- session not in uri - try it from body
			sessionid = string.match(body_ascii, "\"variable_jjSessionId\" *\t*: *\t*\"([^\"]+)\"")
		end
		if(not sessionid) then
			-- still no session - take it from another uri format
			sessionid = string.match(uri, "sessions/+([^/]*)/")
		end

		-- take callid from body
		callid = string.match(body_ascii, "\"variable_sip_call_id\" *: *\t*\"([^\"]+)\"")
		if(not callid) then
			callid = "";
		end

		-- write result into database
		res = con:execute(string.format([[
			INSERT INTO http_jj
			(timestamp, usec, srcip, dstip, url, body, callid, sessid)
			VALUES (FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s', '%s', '%s', '%s')
			]], con:escape(tostring(ts)), con:escape(tostring(usec)), con:escape(tostring(ip_src)), con:escape(tostring(ip_dst)), con:escape(tostring(uri)), con:escape(tostring(body_ascii)), con:escape(tostring(callid)), con:escape(tostring(sessionid))
			))
		if(not res) then
			print("problem with insert tryting again")
			con = env:connect(mysql_db, mysql_user, mysql_pass, mysql_host)
			res = con:execute(string.format([[
				INSERT INTO http_jj
				(timestamp, usec, srcip, dstip, url, body, callid, sessid)
				VALUES (FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s', '%s', '%s', '%s')
				]], con:escape(tostring(ts)), con:escape(tostring(usec)), con:escape(tostring(ip_src)), con:escape(tostring(ip_dst)), con:escape(tostring(uri)), con:escape(tostring(body_ascii)), con:escape(tostring(callid)), con:escape(tostring(sessionid))
				))
		end
		
		if(res) then
			print("BODY STORED")
			local lastId = nil
			local resLastId = con:execute("SELECT LAST_INSERT_ID()")
			if resLastId then
				lastId  = resLastId:fetch()
			end
			if lastId then
				local idHttp200_Ok = "ips:"..tostring(ip_dst).."_ipd:"..tostring(ip_src)..
						     "_ports:"..tostring(port_dst).."_portd:"..tostring(port_src)..
						     "_seq"..tostring(ack);
				http200_OK[idHttp200_Ok] = {
					id = lastId,
					ts = ts
				}
			end
		end
	end
	
	if(http_resp_code and tostring(http_resp_code) == "200") then
		local idHttp200_Ok = "ips:"..tostring(ip_src).."_ipd:"..tostring(ip_dst)..
				     "_ports:"..tostring(port_src).."_portd:"..tostring(port_dst)..
				     "_seq"..tostring(seq);
		if(http200_OK[idHttp200_Ok]) then
			if(not body_ascii) then
				body_ascii = "";
			end;
			if(body_ascii ~= "") then
				body_ascii = " " .. body_ascii
			end
			body_ascii = "HTTP 200 OK" .. body_ascii;
			-- write result into database
			res = con:execute(string.format([[
				INSERT INTO http_jj
				(master_id, timestamp, usec, srcip, dstip, body)
				VALUES ('%s', FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s')
				]], con:escape(tostring(http200_OK[idHttp200_Ok]["id"])), con:escape(tostring(ts)), con:escape(tostring(usec)), con:escape(tostring(ip_src)), con:escape(tostring(ip_dst)), con:escape(tostring(body_ascii))
				))
			if(not res) then
				print("problem with insert tryting again")
				con = env:connect(mysql_db, mysql_user, mysql_pass, mysql_host)
				res = con:execute(string.format([[
					INSERT INTO http_jj
					(master_id, timestamp, usec, srcip, dstip, body)
					VALUES ('%s', FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s')
					]], con:escape(tostring(http200_OK[idHttp200_Ok]["id"])), con:escape(tostring(ts)), con:escape(tostring(usec)), con:escape(tostring(ip_src)), con:escape(tostring(ip_dst)), con:escape(tostring(body_ascii))
					))
			end
			if(res) then
				print("HTTP 200 OK STORED")
			end
			http200_OK[idHttp200_Ok] = nil;
		end
		-- remove old http 200 ok ids
		for i,j in pairs(http200_OK) do
			if(tonumber(http200_OK[i]["ts"]) > tonumber(ts) + 60) then
				http200_OK[i] = nil;
			end
		end
	end
	
end
