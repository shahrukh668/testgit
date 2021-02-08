<?php

_session_start();
if(!isset($_SESSION['authuser']['sqlrow'])) {
	die('permission denied');
}

require_once("../../ioncubetest.php");
key_check3();

function _session_start() {
	if(session_id() != '') {
		return;
	} else {
		if(file_exists('/dev/shm') && is_writable('/dev/shm')) ini_set('session.save_path','/dev/shm');
	}
	if(!true_defined('SESSION_NAME_IGNORE_SERVER_FOLDER') ||
	   true_defined('_SESSION_NAME_BY_SERVER_FOLDER')) {
		$serverFolder = str_replace('/','_',_getServerFolder());
		if($serverFolder) {
			session_name(session_name() . '-' . $serverFolder);
		}
	}
	session_start();
}

function _getServerFolder() {
	$uri = $_SERVER['REQUEST_URI'];
	$uria = explode('/', $uri);
	$folder = array();
	for($i = 0; $i < count($uria); $i++) {
		if($uria[$i] === '') {
			continue;
		}
		if($uria[$i] == 'php' || strstr($uria[$i], '.php') !== false) {
			break;
		}
		$folder[] = $uria[$i];
	}
	return(implode('/', $folder));
}

function true_defined($name) {
	if(defined($name)) {
		$constants = get_defined_constants();
		if(isset($constants[$name])) {
			return($constants[$name]);
		}
	}
	return(false);
}

?>
