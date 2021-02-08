<?php

if(!isset($_REQUEST['sensor_id'])) {
	echoError('sensor_id is not set');
	exit;
}
if(!isset($_REQUEST['callref'])) {
	echoError('callref is not set');
	exit;
}

require('configuration.php');

$dblink = vm_mysql_pconnect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS,
	defined(MYSQL_KEY)?	MYSQL_KEY:NULL,
	defined(MYSQL_CERT)?	MYSQL_CERT:NULL,
	defined(MYSQL_CACERT)?	MYSQL_CACERT:NULL,
	defined(MYSQL_CAPATH)?	MYSQL_CAPATH:NULL,
	defined(MYSQL_CIPHERS)?	MYSQL_CIPHERS:NULL);
if(!$dblink) {
	$mysqlError = vm_mysql_error();
	echoError($mysqlError ? $mysqlError : 'mysql_pconnect: FAIL');
	exit;
}
if(!vm_mysql_select_db(MYSQL_DB , $dblink)) {
	$mysqlError = vm_mysql_error();
	echoError($mysqlError ? $mysqlError : 'mysql_select_db: FAIL');
	exit;
}

if($_REQUEST['sensor_id'] > 0) {
	$sensor_row = vm_mysql_fetch_assoc(vm_mysql_query(
		"SELECT id, host, port FROM sensors WHERE
		id_sensor = '".vm_mysql_real_escape_string($_REQUEST['sensor_id'])."'", $dblink));
	if(@$sensor_row['id'] == "") {
		echoError('sensor with this id does not exists');
		exit;
	}
	$host = $sensor_row['host'];
	$port = $sensor_row['port'];
} else {
	$host = VPMANAGERHOST;
	$port = VPMANAGERPORT;
}
$fp = @fsockopen($host, $port, $errno, $errstr, 2);
if (!$fp) {
	echoError("$errstr ($errno)");
	exit;
}


switch($_REQUEST['task']) {
case "SPYCALL":
	$cmd = (empty($_REQUEST['stop'])?'listen':'listen_stop').' '.$_REQUEST['callref'];
	fwrite($fp, $cmd);
	$data = "";
	stream_set_timeout($fp, 5);
	while (!feof($fp)) {                
		$data .= fread($fp, 1024);        
	}
	@fclose($fp);
	$data = trim($data);
	if(empty($data) || $data === 'success' || $data === 'call already listening') {
		echoSuccess();
	} else {
		echoError($data);
	}
	break;
case "READAUDIO":
	fwrite($fp, "readaudio ".$_REQUEST['callref']);
	$data = "";
	stream_set_timeout($fp, 5);
	while (!feof($fp)) {                
		$data .= fread($fp, 1024);        
	}
	@fclose($fp);
	echo $data;
	break;
}

function echoSuccess($resultData = NULL, $return = false) {
	if($resultData && (is_object($resultData) || is_array($resultData)))
		$rslt = (object)$resultData;
	else {
		$rslt = new stdClass;
		if($resultData)
			$rslt->result = $resultData;
	}
	$rslt->success = true;
	if($return)
		return $rslt;
	else
		echo json_encode($rslt);
}

function echoError($errorData = NULL, $return = false) {
	if($errorData && (is_object($errorData) || is_array($errorData)))
		$rslt = (object)$errorData;
	else {
		$rslt = new stdClass;
		if($errorData)
			$rslt->error = $errorData;
	}
	$rslt->success = false;
	if($return)
		return $rslt;
	else
		echo json_encode($rslt);
}

function vm_mysql_connect($server, $username, $password, $key, $cert, $cacert, $capath, $ciphers, $new_link = false , $client_flags = 0) {
	if (!use_mysqli()) {
		$result = @mysql_connect($server, $username, $password, $new_link, $client_flags);
	} else {
		if ($key && $cert || $cacert || $capath) {
			$dbcon = mysqli_init();
			mysqli_options($dbcon, MYSQLI_OPT_CONNECT_TIMEOUT, 5);
			mysqli_ssl_set($dbcon, $key, $cert, $cacert, $capath, $ciphers);
			$result = mysqli_real_connect ($dbcon, $server, $username, $password, $new_link, 3306, NULL, $client_flags | MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT);
			if ($result) {
				$result = $dbconn;
			}
		} else {
			$result = @mysqli_connect($server, $username, $password, $new_link, $client_flags);
		}
	}
	return($result);
}

function vm_mysql_pconnect($server, $username, $password, $key, $cert, $cacert, $capath, $ciphers, $client_flags = 0) {
	if(use_mysqli()) {
		return(vm_mysql_connect($server, $username, $password, $key, $cert, $cacert, $capath, $ciphers, false, $client_flags));
	}
	$result = @mysql_pconnect($server, $username, $password, $client_flags);
	return($result);
}

function vm_mysql_select_db($database_name, $link = NULL) {
	$result = use_mysqli() ?
		   @mysqli_select_db($link, $database_name) :
		   @mysql_select_db($database_name, $link);
	return($result);
}

function vm_mysql_query($query , $link = NULL, $unbufferedQuery = false) {
	$result = use_mysqli() ?
		   ($unbufferedQuery ?
		     (@mysqli_real_query($link, $query) ?
		       @mysqli_use_result($link) :
		       false) :
		     @mysqli_query($link, $query)) :
		   ($unbufferedQuery ?
		     @mysql_unbuffered_query($query , $link) :
		     @mysql_query($query , $link));
	return($result);
}

function vm_mysql_fetch_assoc($linkRes) {
	$result = use_mysqli() ?
		   @mysqli_fetch_assoc($linkRes) :
		   @mysql_fetch_assoc($linkRes);
	return($result);
}

function vm_mysql_error($link = NULL) {
	return(use_mysqli() ?
		($link ?
		  @mysqli_error($link) :
		  @mysqli_connect_error()) :
		($link ?
		  @mysql_error($link) : 
		  'connect error'));
}

function vm_mysql_errno($link = NULL) {
	return(use_mysqli() ?
		($link ?
		  @mysqli_errno($link) :
		  @mysqli_connect_errno()) :
		($link ?
		  @mysql_errno($link) :
		  0));
}

function vm_mysql_real_escape_string($string) {
	return(use_mysqli() ?
		@_mysql_escape_string($string) :
		@mysql_real_escape_string($string));
}

function _mysql_escape_string($string) {
	return(_escape_string($string, array(
		"'" => "\\'",
		"\"" => "\\\"",
		"\\" => "\\\\",
		"\n" => "\\n",
		"\r" => "\\r")));
}

function _escape_string($string, $conv) {
	if(!isset($string)) {
		return(NULL);
	}
	$escString = "";
	for($pos = 0; $pos < strlen($string); $pos++) {
		$c = false;
		foreach($conv as $s => $d) {
			$sl = strlen($s);
			if(substr($string, $pos, $sl) === $s) {
				$escString .= $d;
				$c = true;
				$pos += $sl - 1;
				break;
			}
		}
		if(!$c) {
			$escString .= substr($string, $pos, 1);
		}
	}
	return($escString);
}

function use_mysqli() {
	return(!function_exists('mysql_connect') && function_exists('mysqli_connect'));
}

?>
