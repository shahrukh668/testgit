<?php

function ioncube_event_handler($err_code, $params) {
	if($err_code == ION_CLOCK_SKEW) {
		echo 'Ioncube clock skew. Please check time on server side!';
		return;
	}
	header('Location: index.php');
}

?>
