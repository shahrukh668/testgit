<?php

if (file_exists('functions_brand.php')) {
	require_once('functions_brand.php');
}

if(!function_exists('wget_license')) {
function wget_license() {
	$SITE = Get_brand_sitename();
	$urlParams = escapeshellarg(
		"https://$SITE/getlicense" . '?' .
		'licensetoken=' . urlencode($_REQUEST['licensetoken']) . '&' .
		'hwid=' . urlencode($_REQUEST['hwid']));
	exec("wget --no-cache --no-check-certificate -t 1 --timeout=5 -qO- '{$urlParams}' 2>&1", $output, $return_var);
	if($output) {
		$output = implode("\n", $output);
	}
	$error = NULL;
	if($output) {
		if(!json_decode($output)) {
			$error = $output;
		}
	} else {
		$error = 'get license via wget failed';
	}
	if($error) {
		$output = '{"success":false, "key":"", "error":"' . $error . '"}';
	}
	echo $output;
} }

$VoipBinName = 'voipmonbinaries';
global $binUtils;
$SF_NAME = Get_brand_sf_projectname();
if(!isset($binUtils)) {
$binUtils = array(
'phantomjs' =>
	array('name'    => 'HTML/SVG phantomjs',
	      'bin'     => 'phantomjs-{VERSION}-{ARCH}',
	      'url'     => "http://sourceforge.net/projects/$SF_NAME/files/wkhtml/phantomjs-{VERSION}-{ARCH}.gz/download",
	      'version' => 'PHANTOMJS_VERSION',
	      'arch'    => 'detect',
	      'archs'   => array('i686','x86_64'),
	      'zip'     => true),
'sox' =>
	array('name'    => 'SOX',
	      'bin'     => 'sox-{ARCH}',
	      'url'     => "http://sourceforge.net/projects/$SF_NAME/files/wkhtml/sox-{ARCH}.gz/download",
	      'arch'    => 'detect',
	      'archs'   => array('i686','x86_64'),
	      'zip'     => true),
'tshark' =>
	array('name'    => 'TSHARK',
	      'bin'     => 'tshark-{VERSION}-{ARCH}',
	      'url'     => "http://sourceforge.net/projects/$SF_NAME/files/wkhtml/tshark-{VERSION}-{ARCH}.gz/download",
	      'version' => 'TSHARK_VERSION',
	      'arch'    => 'detect',
	      'archs'   => array('i686','x86_64'),
	      'zip'     => true),
'mergecap' =>
	array('name'    => 'MERGECAP',
	      'bin'     => 'mergecap-{VERSION}-{ARCH}',
	      'url'     => "http://sourceforge.net/projects/$SF_NAME/files/wkhtml/mergecap-{VERSION}-{ARCH}.gz/download",
	      'version' => 'MERGECAP_VERSION',
	      'arch'    => 'detect',
	      'archs'   => array('i686','x86_64'),
	      'zip'     => true),
't38_decode' => 
	array('name'    => 'T38 decoder',
	      'bin'     => 't38_decode-{VERSION}-{ARCH}',
	      'url'     => "http://sourceforge.net/projects/$SF_NAME/files/wkhtml/t38_decode-{VERSION}-{ARCH}.gz/download",
	      'version' => 'T38_DECODE_VERSION',
	      'arch'    => 'i686',
	      'archs'   => array('i686','x86_64'),
	      'zip'     => true)
);
}

if(!function_exists('get_configuration_bin_util')) {
function get_configuration_bin_util($binUtil) {
	global $binUtils;
	if(!isset($binUtils[$binUtil])) {
		return(NULL);
	}
	$constants = get_defined_constants();
	$version = isset($binUtils[$binUtil]['version']) ?
		    (defined($binUtils[$binUtil]['version']) ? 
		      $constants[$binUtils[$binUtil]['version']] :
		      $binUtils[$binUtil]['version']) :
		    NULL;
	$arch = isset($binUtils[$binUtil]['arch']) ?
		 ($binUtils[$binUtil]['arch'] == 'detect' ? 
		   php_uname('m') :
		   $binUtils[$binUtil]['arch']) :
		 NULL;
	if(isset($binUtils[$binUtil]['archs']) && is_array($binUtils[$binUtil]['archs']) &&
	   !in_array($arch, $binUtils[$binUtil]['archs'])) {
		return(NULL);
	}
	$binName = str_replace('{VERSION}', $version,
		   str_replace('{ARCH}', $arch, $binUtils[$binUtil]['bin']));
	$url = str_replace('{VERSION}', $version,
	       str_replace('{ARCH}', $arch, $binUtils[$binUtil]['url']));
	return(array('name' => isset($binUtils[$binUtil]['name']) ? $binUtils[$binUtil]['name'] : $binUtil,
		     'bin'  => $binName,
		     'url'  => $url,
		     'zip'  => !empty($binUtils[$binUtil]['zip'])));
} }

if(!function_exists('exists_bin_util')) {
function exists_bin_util($binUtil) {
	$confBinUtil = get_configuration_bin_util($binUtil);
	if(!$confBinUtil) {
		return(-1);
	}
	return(file_exists('bin/' . $confBinUtil['bin']));
} }

if(!function_exists('is_set_executable_bin_util')) {
function is_set_executable_bin_util($binUtil) {
	$confBinUtil = get_configuration_bin_util($binUtil);
	if(!$confBinUtil) {
		return(-1);
	}
	$bin = 'bin/' . $confBinUtil['bin'];
	if(is_executable($bin)) {
		return(true);
	}
	exec('chmod +x ' . escapeshellarg($bin));
	return(is_executable($bin));
} }

if(!function_exists('exists_is_set_executable_bin_util')) {
function exists_is_set_executable_bin_util($binUtil) {
	return(exists_bin_util($binUtil) && is_set_executable_bin_util($binUtil));
} }


if(!empty($_REQUEST['function_open_task'])) {
	$enableTasks = array(
		'wget_license'
	);
	if(!in_array($_REQUEST['function_open_task'], $enableTasks)) {
		echo 'access denied';
		exit;
	}
	$task = $_REQUEST['function_open_task'];
	$task();
	exit;
}

if(!function_exists('check_key_content_before_save')) {
function check_key_content_before_save($key) {

	$pattern = '/^<\?php exit\(0\); \?>[\r\n]{0,}
(^[\w ]+: [0-9a-zA-Z\.\-\+\/=\s\{\}:]+[\r\n]{0,})+
------ LICENSE FILE DATA -------[\r\n]{0,}
([0-9a-zA-Z\+\/=]+[\r\n]{0,})+
--------------------------------[\r\n]{0,}$/m';

	if (preg_match($pattern, $key) === 1) {
		return TRUE;
	} else {
		return FALSE;
	}
} }


?>
