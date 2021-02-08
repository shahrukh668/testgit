<?php

function ioncube_event_handler($err_code, $params) {
	function key_check() {
		echo '<td style="color: red;">' . getIncubeErrorString($err_code);
		return 0;
	}
	function key_check2() {
		return 0;
	}
	function key_check3() {
		x_session_start();
		if(!empty($_SESSION['IONCUBE_OLD_KEY'])) {
			if(file_put_contents('../../key.php', $_SESSION['IONCUBE_OLD_KEY'])) {
				echo json_encode(array('success' => true, 'error' => getIncubeErrorString($err_code)));
			} else {
				echo json_encode(array('success' => false));
			}
			unset($_SESSION['IONCUBE_OLD_KEY']);
		} else {
			echo json_encode(array('success' => false));
		}
		return 0;
	}
}

function getIncubeErrorString($err_code) {
	switch($err_code) {
	case ION_CORRUPT_FILE:
		return('license file is corrupted');
	case ION_LICENSE_NOT_FOUND:
		return('license file key.php not found');
	case ION_LICENSE_CORRUPT:
		return('license file key.php is corrupted');
	case ION_LICENSE_EXPIRED:
		return('license file key.php expired');
	}
	return('license file key.php is invalid or corrupted<br>' .
	       htmlspecialchars('make sure you are pasting the key including "<?php...."'));
}

function x_session_start() {
	if(session_id() != '') {
		return;
	} else {
		if(file_exists('/dev/shm') && is_writable('/dev/shm')) ini_set('session.save_path','/dev/shm');
	}
	if(!defined('SESSION_NAME_IGNORE_SERVER_FOLDER') || !SESSION_NAME_IGNORE_SERVER_FOLDER ||
	   defined('_SESSION_NAME_BY_SERVER_FOLDER') && _SESSION_NAME_BY_SERVER_FOLDER) {
		$serverFolder = str_replace('/','_',getServerFolder());
		if($serverFolder) {
			session_name(session_name() . '-' . $serverFolder);
		}
	}
	session_start();
}

function getServerFolder() {
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

?>
