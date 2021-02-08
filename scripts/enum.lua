local tapenum = Listener.new(nil, "dns")
--debug = require('debug') -- restore proper 'debug' table
--require("mobdebug").start() -- start the debugger

--MySQL database connection
require "luasql.mysql"
env = assert (luasql.mysql())
con = assert (env:connect("voipmonitor", "root", "", "localhost"))

--[[

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
KEY `timestamp` (`timestamp`),
KEY `dnsid` (`dnsid`),
KEY `queryname` (`queryname`),
KEY `responsename` (`responsename`)
) ENGINE = INNODB;

]]--

-- called at the end of the capture to print the summary
function tapenum.draw()
--  debug("enum packets: " .. enumpackets)
end

-- called once each time the filter of the tap matches
local timestamp_f = Field.new("frame.time_epoch")
local ip_src_f = Field.new("ip.src")
local ip_dst_f = Field.new("ip.dst")

local dnsid_f = Field.new("dns.id");
local dnsquery_f = Field.new("dns.qry.name");
local dnsresponse_f = Field.new("dns.resp.name");
local recordtype_f = Field.new("dns.qry.type"); -- http://en.wikipedia.org/wiki/List_of_DNS_record_types
local isresponse_f = Field.new("dns.flags.response");

function tapenum.packet(pinfo,tvb,tapinfo)
	local queryname = dnsquery_f()
	local responsename = dnsresponse_f()
	local recordtype = recordtype_f()
	local isresponse = isresponse_f()
	local dnsid = dnsid_f()
	print("query [" .. tostring(queryname) .. "] response [" .. tostring(responsename) .. "] rt [" .. tostring(recordtype) .. "] isresponse [" .. tostring(isresponse) .. "] dnsid [" .. tostring(dnsid) .. "]")
	--myfile = io.open("/tmp/test.tvb", "w+b")
	--myfile:write(tobinary( tostring(tvb:range(0):bytes())))
	--myfile:flush()
	--myfile:close()
	--print(tostring(tvb:range(0):bytes()))

	local ts
	local usec
	ts, usec = string.match(tostring(timestamp_f()), "(%d+).(%d+)")

	local ip_src = ip_src_f()
	local ip_dst = ip_dst_f()

	-- write result into database
	res = assert (con:execute(string.format([[
	INSERT INTO enum_jj
	(dnsid, timestamp, usec, srcip, dstip, recordtype, isresponse, queryname, responsename, data)
	VALUES ('%s', FROM_UNIXTIME('%s'), '%s', INET_ATON('%s'), INET_ATON('%s'), '%s', '%s', '%s', '%s', '%s')
	]], con:escape(tostring(dnsid)), con:escape(tostring(ts)), con:escape(tostring(usec)), con:escape(tostring(ip_src)), 
	    con:escape(tostring(ip_dst)), con:escape(tostring(recordtype)), con:escape(tostring(isresponse)), con:escape(tostring(queryname)), 
	    con:escape(tostring(responsename)), con:escape(tobinary(tostring(tvb:range(0):bytes())))
	)))
	--print("stored?")
	--print(res)
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

