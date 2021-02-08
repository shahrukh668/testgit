<?PHP

require_once('php/lib/functions_brand.php');
require_once('php/lib/functions_open.php');
if(file_exists('config/bin_utils_configuration.php')) {
	require_once('config/bin_utils_configuration.php');
}

ini_set('session.cookie_httponly', 1);
if(!empty($_SERVER["HTTPS"])) ini_set('session.cookie_secure', 1);

define('MINIMAL_IONCUBE_VERSION', 50012);
define('MINIMAL_IONCUBE_VERSION_PHP7', 60009);
define('EXTJS_VERSION', '6.2.0');

function isThreadSafe(){
	ob_start();
	phpinfo(INFO_GENERAL);
	return preg_match('/Thread\s*Safety => enabled/i', strip_tags(ob_get_clean()));
}

// -----------------------------------------
// functions for the old version of php

if(!function_exists('sys_get_temp_dir')) {
	function sys_get_temp_dir() {
		if( $temp=getenv('TMP') )	return $temp;
		if( $temp=getenv('TEMP') )	return $temp;
		if( $temp=getenv('TMPDIR') )    return $temp;
		$temp=tempnam(__FILE__,'');
		if (file_exists($temp)) {
			@unlink($temp);
			return dirname($temp);
		}
		return null;
	}
}

// -----------------------------------------

if(isset($_REQUEST['logout'])) {
	_session_start__index();
	@session_destroy();
	echo '<meta http-equiv="refresh" content="0;URL=./">';
	die();
}

$setConfigurationTypeValue_rslt = array();
if(file_exists('config/configuration.php')) {
	$existsConfiguration = true;
	if(isset($_POST['recheck'])) {
		if(!empty($_POST['SPOOLDIR'])) {
			setConfigurationTypeValue__index('SPOOLDIR', $_POST['SPOOLDIR']);
		}
	}
	include_once('config/configuration.php');
	if (!defined('MYSQL_KEY')) {
		define("MYSQL_KEY", NULL);
	}
	if (!defined('MYSQL_CERT')) {
		define("MYSQL_CERT", NULL);
	}
	if (!defined('MYSQL_CACERT')) {
		define("MYSQL_CACERT", NULL);
	}
	if (!defined('MYSQL_CAPATH')) {
		define("MYSQL_CAPATH", NULL);
	}
	if (!defined('MYSQL_CIPHERS')) {
		define("MYSQL_CIPHERS", NULL);
	}
	if (!defined('MYSQL_KEY_2')) {
		define("MYSQL_KEY_2", NULL);
	}
	if (!defined('MYSQL_CERT_2')) {
		define("MYSQL_CERT_2", NULL);
	}
	if (!defined('MYSQL_CACERT_2')) {
		define("MYSQL_CACERT_2", NULL);
	}
	if (!defined('MYSQL_CAPATH_2')) {
		define("MYSQL_CAPATH_2", NULL);
	}
	if (!defined('MYSQL_CIPHERS_2')) {
		define("MYSQL_CIPHERS_2", NULL);
	}
} else {
	$existsConfiguration = false;
}

$eulaConfirmed = true;
$eulaRejected = false;
if(!$existsConfiguration &&
   !isset($_POST['eula_agree']) &&
   !isset($_POST['submit']) &&
   !isset($_POST['recheck']) &&
   !isset($_POST['skip'])) {
	if(isset($_POST['eula_do_not_agree'])) {
		$eulaRejected = true;
	}
	$eulaConfirmed = false;
}

$APP_NAME = Get_brand_name();
$APP_URL = Get_brand_url();
$DBNAME = Get_brand_dbname();
$LOGO = Get_brand_logo();
$SNIFFERNAME = Get_brand_sniffername();

$guiionphperr;
if (!check_ioncube_php_version($guiionphperr)) {
	render_install();
	die();
}

$urlParamsType = array('cdrId', 'messageId', 'ss7Id', 'trackerId', 'disableRtp',
		       'callid', 
		       'num', 'srcnum', 'dstnum', 'caller', 'called',
		       'calldate', 'calldatemin', 'calldatemax',
		       'cdr_filter', 'cdr_group_data',
		       'message_filter', 'message_group_data',
		       'ss7_filter',
		       'register_active_filter', 'register_failed_filter', 'register_state_filter',
		       'sip_msg_active_filter', 'sip_msg_filter',
		       'dashboard', 'dashboard_id', 'hidemenu', 'passivecharts',
		       'activecalls', 'hidegrid',
		       'user','password',
		       'alertId', 'reportId',
		       'exclude_ip', 'exclude_ip_dst', 'exclude_number',
		       'svg_paint', 'start_watching',
		       'debug', 'dbcheck',
		       'test');
$urlParams = array();
foreach($urlParamsType as $paramType) {
	if(!empty($_REQUEST[$paramType])) {
		$urlParams[] = $paramType . '=' . $_REQUEST[$paramType];
	}
}
$urlParamsString = count($urlParams) ? implode('&', $urlParams) : NULL;


$rsltWriteLicense = NULL;
if(isset($_POST['recheck']) &&
   !empty($_POST['licensekey']) &&
   @file_get_contents(dirname(__FILE__).'/key.php') != $_POST['licensekey']) {
	if (!check_key_content_before_save($_POST['licensekey'])) {
		$rsltWriteLicense = 'Bad key content.';
	} else if(@file_put_contents(dirname(__FILE__).'/key.php', $_POST['licensekey'])) {
		$rsltWriteLicense = true;
	} else {
		$rsltWriteLicense = false;
	}
}

if(!empty($_POST['license_token'])) {
	saveLicenseToken__index($_POST['license_token']);
}

if(extension_loaded('ionCube Loader') && check_ioncube_version()) {
	require_once('ioncubetest.php');
}
$rsltCheckMysqlConnectSaved = NULL;
$rsltCheckSpooldirSaved = NULL;
$rsltCheckConfigurationSaved = NULL;
$rsltCheckMysqlConnect = NULL;
$rsltCheckSpooldir = NULL;
$rsltCheckConfiguration = NULL;
if(empty($_POST['recheck']) && $eulaConfirmed) {
	install_all();
}
$rsltCheckAllSaved = check_all(true);


_session_start__index();

if($rsltCheckAllSaved &&
   (isset($_SESSION['authuser']['sqlrow']) ||
    !empty($_REQUEST['user']) && !empty($_REQUEST['password']) ||
    !is_cloud() && !check_exists_local_admin())) {
	if($urlParamsString) {
		$urlParamsStringEnc = str_replace('+', '%2B',
				      str_replace('%', '%25', $urlParamsString));
	}
	$redirectUrl = 'admin.php' . ($urlParamsString ? '?' . $urlParamsStringEnc : '');
	if(headers_sent()) {
		echo '<script> location.replace("' . $redirectUrl . '"); </script>';
		echo str_repeat(' ',1024*64);
		flush();
	} else {
		header('Location: ' . $redirectUrl);
	}
	die();
}

@session_destroy();

set_default_config();
$rsltCheckAll = check_all();

$rsltWriteConfiguration = NULL;
if((isset($_POST['submit']) || isset($_POST['recheck'])) &&
   isset($_POST['SPOOLDIR']) && $rsltCheckConfiguration) {
	$rsltWriteConfiguration = write_config();
}

if(!$rsltCheckAllSaved) {
	render_install();
	die();
}

// -----------------------------------------
// configuration form

function render_install() {
error_reporting(E_ALL ^ E_NOTICE);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?PHP global $APP_NAME; echo $APP_NAME;?> installation</title>
<meta name="keywords" content="VoIP, recorder, monitoring, quality, qos, ITU-T G.107, linux, sniffer, packet capture, SIP, RTP, latency, jitter" />
<meta name="description" content="<?PHP global $APP_NAME; echo $APP_NAME;?> is open source live network packet sniffer voip monitoring tool and call recorder which analyzes SIP and RTP protocol and predicts call quality" />
<meta name="author" content="Martin Vit" />
<meta name="robots" content="index,follow" />
<link rel="shortcut icon" type="image/x-icon" href="<?PHP echo Handle_favicon();?>" />
<link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
</head>
<body>

<header>
	<a href="/" class="logo"><img src="images/<?PHP global $LOGO; echo $LOGO; ?>" alt="<?PHP global $APP_NAME; echo $APP_NAME;?>" /></a>
</header>

<section>
	<article>
	<!-- [1] content -->
	<h1> <?PHP global $APP_NAME; echo $APP_NAME;?> installation </h1>
	<?PHP 
		global $guiionphperr;
		global $APP_NAME;  
		global $eulaConfirmed;
		global $eulaRejected;
		global $existsConfiguration;
		if (!$guiionphperr) {
			echo $eulaConfirmed ?
			      ($APP_NAME . ' ' .
			       ($existsConfiguration ?
				 'has detected a problem in the configuration. Please check System requirements which has to be all "green"' :
				 'is unconfigured yet, please check System requirements which has to be all "green" and Configuration section below:')) :
			      ('Please read this end user license agreement (EULA) before agreeing to accept these terms and conditions.' .
			       ($eulaRejected ?
				 ' You have to accept EULA to use this software.' :
				 ''));
		}
	?>
	<br><br>
	
<?PHP

	global $rsltCheckAll;
	global $rsltCheckConfiguration;
	global $rsltCheckConfigurationSaved;
	global $rsltWriteConfiguration;
	global $eulaConfirmed;
	global $existsConfiguration;
	
	$needFormConfiguration = !($rsltCheckConfigurationSaved ||
				   $rsltCheckConfiguration && $rsltWriteConfiguration === 1) &&
				 !$existsConfiguration;
	
	if ($guiionphperr) {
		echo $guiionphperr;
	} elseif(!$eulaConfirmed) {
		render_eula();
	} else {
		render_install_form_base($needFormConfiguration);
		
		if($rsltWriteConfiguration === 1 && $rsltCheckAll) {
			render_install_form_ok_btn();
		} else if($rsltWriteConfiguration && $rsltWriteConfiguration !== 1) {
			render_install_form_write_configuration_failed();
		} else {
			render_install_form_recheck_btn();
		}
		
		if($needFormConfiguration) {
			render_install_form_configuration();
		}
	}
        
?>
	<!-- [2] content -->
	</article>
</section>

<footer>
</footer>


</body>
</html>
<?PHP
}

function render_eula() {
	echo '<h1> EULA </h1>';
	echo '<script type="text/javascript">
	      function resize_eula() {
		  document.getElementById("eula").style.height = Math.max(window.innerHeight - 350, 400);
		  setTimeout(function() {
		      document.getElementById("eula").style.height = Math.max(window.innerHeight - 350, 400) - 1;
		  }, 10);
	      }
	      </script>' .
	     '<iframe src="EULA.pdf" '.
	     'id="eula" ' .
	     'frameborder="0" ' . 
	     'style="border: 1px solid grey; ' . 
		    'width: 798px; '.
	     '" ' .
	     ' onload = "resize_eula();" ' .
	     '></iframe>';
	echo '<br><br>';
	echo '<table style="margin-left: auto; margin-right: auto;">' .
	     '<form id="form" action="./" method="post">' .
	     '<td>' . '<input type="submit" name="eula_agree" value="agree" class="button button-blue">' .
	     '<td>' . '<input type="submit" name="eula_do_not_agree" value="do not agree" class="button button-blue">' .
	     '</form>' .
	     '</table>';
}

function render_install_form_base($showFormConfiguration) {
	global $existsConfiguration;
	$arch = php_uname('m');
	$phpver = getPhpVersion__index();
	if ($phpver >= 700) {
		$major = round($phpver / 100);
		$minor = $phpver % 100;
		$dlver = "$major.$minor";
		$phpdebcmds = array(
			'gd' => "apt-get install php$dlver-gd",
			'mysql' => "apt-get install php$dlver-mysql",
			'json' => "apt-get install php$dlver-json",
			'mbstring' => "apt-get install php$dlver-mbstring",
			'zip' => "apt-get install php$dlver-zip or apt-get install unzip",
		);
		$ioncubedata = array(
			'apaphpcfg' => "/etc/php/$dlver/apache2/conf.d/01-ioncube.ini",
			'cliphpcfg' => "/etc/php/$dlver/cli/conf.d/01-ioncube.ini",
		);
	} else {
		$phpdebcmds = array(
			'gd' => 'apt-get install php5-gd',
			'mysql' => 'apt-get install php5-mysql',
			'json' => 'apt-get install php5-json',
			'zip' => 'apt-get install php5-zip or apt-get install unzip',
			'mbstring' => NULL,
		);
		$ioncubedata = array(
			'apaphpcfg' => '/etc/php5/apache2/conf.d/01-ioncube.ini',
			'cliphpcfg' => '/etc/php5/cli/conf.d/01-ioncube.ini',
		);
	}

	echo '<form id="form" action="./" method="post">';
	echo '<h1> System requirments </h1>';
	if(!$existsConfiguration) {
		echo 'The configuration does not exists yet - please check following configuration and submit.';
	}
	echo '<table border=1 style="width: 800px;border-collapse: collapse; padding: 5px;">';
	echo '<tr><td>PHP MySQL module</td>';
	// mysql
	if(!function_exists('mysql_connect') && !function_exists('mysqli_connect')) {
		echo '<td>'.
		     instructionsInstall__index('FAILED',
						$phpdebcmds['mysql'],
						'yum install php-mysql',
						NULL,
						'restart_apache').
		     '</td></tr>';
	} else {
		global $rsltCheckMysqlConnectSaved;
		global $rsltWriteConfiguration;
		if(!$rsltCheckMysqlConnectSaved && $rsltWriteConfiguration !== 1) {
			check_mysql_connect(false, $connect_error);
			echo '<td style="color: red;">'.
			     ($existsConfiguration ?
			       ($connect_error ?
				 '<h3 style="padding-bottom: 4px;">FAILED</h3>'.
				 $connect_error.'<br>Correct MySQL settings in configuration.php.</td>' :
				 'Correct MySQL settings in configuration.php.</td>') :
			       ($connect_error ?
				 '<h3 style="padding-bottom: 4px;">FAILED</h3>'.
				 $connect_error.'<br>Correct MySQL settings in the form below on this page.</td>' :
				 'Set and submit MySQL settings in the form below on this page.</td>'));
		} else {	
			echo '<td style="color: green;">OK</td></tr>';
		}
	}
	// json_encode
	if($phpver >= 502 && !function_exists('json_encode')) {
		echo '<tr><td>PHP JSON module</td>'.
		     '<td>'.
		     instructionsInstall__index('FAILED',
						$phpdebcmds['json'],
						'yum install php-json',
						NULL,
						'restart_apache').
		     '</td></tr>';
	}
	// zip (mainly for ubuntu with ppa repository); unzip binary can be used as a workaround so warn if are missing both things
	echo '<tr><td>PHP ZIP module</td>';
	if(!function_exists('zip_open') && !exists_unzip__index()) {
		echo '<td>'.
		     instructionsInstall__index('FAILED',
						$phpdebcmds['zip'],
						'yum install php-zip or yum install unzip',
						NULL,
						'restart_apache').
		     '</td></tr>';
	} else {
		echo '<td style="color: green;">OK</td></tr>';
	}
	// gd
	echo '<tr><td>PHP GD module</td>';
	if(!function_exists('gd_info')) {
		echo '<td>'.
		     instructionsInstall__index('FAILED',
						$phpdebcmds['gd'],
						'yum install php-gd',
						NULL,
						'restart_apache').
		     '</td></tr>';
	} else {
		echo '<td style="color: green;">OK</td></tr>';
	}
	// mb
	if(!function_exists('mb_strlen')) {
		echo '<tr><td>PHP MBSTRING module</td>'.
		     '<td>'.
		     instructionsInstall__index('FAILED',
						$phpdebcmds['mbstring'],
						'yum install php-mbstring',
						NULL,
						'restart_apache').
		     '</td></tr>';
	}
	// posig_getpwuid
	if(!function_exists('posix_getpwuid')) {
		echo '<tr><td>PHP posix_getpwuid function</td>'.
		     '<td>'.
		     instructionsInstall__index('FAILED',
						NULL,
						'yum install php-process',
						NULL,
						'restart_apache').
		     '</td></tr>';
	}
	// gzdecode
	if(!function_exists('gzdecode') && !function_exists('gzinflate')) {
		echo '<tr><td>PHP gzdecode function</td>'.
		     '<td>'.
		     instructionsInstall__index('FAILED',
						NULL,
						'Install php support for function gzdecode!',
						NULL,
						NULL).
		     '</td></tr>';
	}
	/*
	// mcrypt - obsolete
	if(!function_exists('mcrypt_decrypt')) {
		echo '<tr><td>PHP mcrypt_decrypt function</td>'.
		     '<td>'.
		     instructionsInstall__index('FAILED',
						'apt-get install php5-mcrypt',
						NULL,
						NULL,
						'restart_apache').
		     '</td></tr>';
	}
	*/
	// phantomjs
	check_bin_util('phantomjs');
	// sox
	check_bin_util('sox');
	// tshark
	check_bin_util('tshark');
	// mergecap
	check_bin_util('mergecap');
	// t38_decode
	check_bin_util('t38_decode');
	// mscgen
	if(file_exists('bin/mscgen-'.$arch) and !is_set_executable__index('bin/mscgen-'.$arch)) {
		$dir = dirname(__FILE__)."/bin/";
		echo '<tr><td>MSCGEN binary is not executable</td>'.
		     '<td>'.
		     instructions__index('FAILED',
					 'chmod +x "'.$dir.'mscgen-'.$arch.'"').
		     '</td></tr>';
	}
	// charts
	if(file_exists('bin/charts-'.$arch) and !is_set_executable__index('bin/charts-'.$arch)) {
		$dir = dirname(__FILE__)."/bin/";
		echo '<tr><td>CHARTS binary is not executable</td>'.
		     '<td>'.
		     instructions__index('FAILED',
					 'chmod +x "'.$dir.'charts-'.$arch.'"').
		     '</td></tr>';
	}
	// vm
	if(in_array($arch, array('i686','x86_64'))) {
		if(!file_exists('bin/vm-'.$arch) && !file_exists('bin/vm')) {
			$dir = dirname(__FILE__)."/bin/";
			echo '<tr><td>VM binary missing</td>'.
			     '<td>'.
			     instructions__index('MISSING',
						 'contact support').
			     '</td></tr>';
		} else if(!is_set_executable__index('bin/vm-'.$arch) && !is_set_executable__index('bin/vm')) {
			$dir = dirname(__FILE__)."/bin/";
			echo '<tr><td>VM binary is not executable</td>'.
			     '<td>'.
			     instructions__index('FAILED',
						 'chmod +x "'.$dir.'vm-'.$arch.'"').
			     '</td></tr>';
		}
	}
	// vmcodecs
	if(file_exists('bin/vmcodecs') and !is_set_executable__index('bin/vmcodecs')) {
		$dir = dirname(__FILE__)."/bin/";
		echo '<tr><td>VMCODECS binary is not executable</td>'.
		     '<td>'.
		     instructions__index('FAILED',
					 'chmod +x "'.$dir.'vmcodecs"').
		     '</td></tr>';
	}
	// temp
	if(!check_temp()) {
		echo '<tr><td>system temp directory is not writable</td>'.
		     '<td>'.
		     instructions__index('FAILED',
					 'chmod 777 "'.sys_get_temp_dir().'"').
		     '</td></tr>';
	}
	if(!(defined('DISABLE_CHECK_SPOOLDIR') && DISABLE_CHECK_SPOOLDIR) &&
	   empty($_POST['DISABLE_CHECK_SPOOLDIR']) &&
	   (!check_spooldir_set(true) ||
	    !check_spooldir_exists(true))) {
		// spooldir - check exists
		echo '<tr><td>PCAP spool directory set and exists</td>';
		if($showFormConfiguration) {
			echo '<td style="color: red;">'.
			     (check_spooldir_set() && !check_spooldir_exists() ?
			       '<h3 style="padding-bottom: 4px;">FAILED</h3>' .
			       'Directory '.check_spooldir_set().' not exists.<br>'.
			       'Correct and submit PCAP spool directory in the form below on this page.' :
			       'Set and submit PCAP spool directory in the form below on this page.').
			     '</td></tr>';
		} else {
			global $setConfigurationTypeValue_rslt;
			echo '<td>'.
			     instructions__index(check_spooldir_set(true)?'FAILED':'MISSING',
						 '<input type="text" name="SPOOLDIR" size="100" value="'.check_spooldir_set().'"/>'.
						 (isset($setConfigurationTypeValue_rslt['SPOOLDIR']) && $setConfigurationTypeValue_rslt['SPOOLDIR'] === false ?
						  BR4__index()."write to config/configuration.php failed":NULL),
						 'red',
						 'Please set correct path to PCAP spool directory:').
			     '</td></tr>';
		}
	}
	if(check_spooldir_set() && check_spooldir_exists()) {
		// spooldir - check writable
		echo '<tr><td>PCAP spool directory is writable by PHP</td>';
		if(defined('DISABLE_CHECK_SPOOLDIR') && DISABLE_CHECK_SPOOLDIR ||
		   !empty($_POST['DISABLE_CHECK_SPOOLDIR'])) {
			echo '<td style="color: orange;">SKIP</td></tr>';
		} else if(!check_spooldir()) {
			echo '<td>'.
			     instructions__index('FAILED',
						 'chown '.get_www_user__index().' '.$_POST['SPOOLDIR'].BR4__index().
						 'Also the selinux has to be set properly on centos. Try to run "setenforce 0"').
			     '</td></tr>';
		} else {
			echo '<td style="color: green;">OK</td></tr>';
		}
	}
	// ioncube loader
	echo '<tr><td>ionCube loader</td>';
	if(ignore_ioncube_check__index()) {
		echo '<td style="color: orange;">SKIP';
	} else if(!extension_loaded('ionCube Loader') ||
		  !check_ioncube_version()) {
		echo '<td>';
		$version = explode('.', PHP_VERSION);
		$path = ini_get('extension_dir');
		$ts = isThreadSafe() ? "_ts" : "";
		$loader_file = "ioncube_loader_lin_".$version[0].".".$version[1].$ts.".so";
		if($arch == 'x86_64') {
			$loader_path = "x86_64/$loader_file";
		} else {
			$loader_path = "i686/$loader_file";
		}
		global $APP_NAME;
		$upgradeIoncube = false;
		if(!extension_loaded('ionCube Loader')) {
			echo '<h2 style="color: red;">' . $APP_NAME . ' requires ioncube.com PHP Loader</h2>';
			echo '<h3 style="padding-bottom: 4px;">follow these installation instructions:</h3>';
		} else {
			echo '<h2 style="color: red;">Your ioncube loader is too old (' . ioncube_loader_iversion() . '). ' . 
			     'Please upgrade it to the latest version.</h2>';
			echo '<h3 style="padding-bottom: 4px;">follow these upgrade instructions:</h3>';
			$upgradeIoncube = true;
		}
		global $APP_URL;
		if(!exists_apt_get__index()) {
			if(!$upgradeIoncube) {
				echo "yum install wget".BR4__index();
			}
			echo "wget --no-continue $APP_URL/ioncube/$loader_path -O $path/$loader_file".BR4__index();
			if(!$upgradeIoncube) {
				echo "echo \"zend_extension = $path/$loader_file\" > /etc/php.d/ioncube.ini".BR4__index();
			}
		} else {
			if(!$upgradeIoncube) {
				echo "apt-get install wget".BR4__index();
			}
			echo "wget --no-continue $APP_URL/ioncube/$loader_path -O $path/$loader_file".BR4__index();
			if(!$upgradeIoncube) {
				echo "echo \"zend_extension = $path/$loader_file\" > $ioncubedata[apaphpcfg]".BR4__index();
				echo "echo \"zend_extension = $path/$loader_file\" > $ioncubedata[cliphpcfg]".BR4__index();
			}
		}
		echo get_apache_restart_command__index().BR4__index();
		echo '</td></tr>';
	} else {
		echo '<td style="color: green;">OK</td></tr>';
		echo '<tr><td>license key</td>';
		if(isset($_POST['licensekey']) and $_POST['licensekey'] != '') {
			global $rsltWriteLicense;
			if (is_string($rsltWriteLicense)) {
				echo '<td style="color: red;">';
				render_install_form_base_licensekey();
				echo "<br><br>$rsltWriteLicense";
				echo '</td></tr>';
			} else if($rsltWriteLicense === false) {
				echo '<td style="color: red;">';
				render_install_form_base_licensekey();
				echo '<br><br>'.
				     'Cannot write '.dirname(__FILE__).'/key.php file. Upload manually or run <br>chown -R '.get_www_user__index().' '.dirname(__FILE__);
				echo '</td></tr>';
			} else {
				if(!key_check()) {
					echo '<br>';
					render_install_form_base_licensekey();
				}
				echo '</td></tr>';
			}
		} else {
			if(file_exists('key.php')) {
				if(!key_check()) {
					echo '<br><br>';
					render_install_form_base_licensekey();
				}
				echo '</td></tr>';
			} else {
				echo '<td style="color:red;">license file key.php is missing'.
				     '<br><br>';
				render_install_form_base_licensekey();
				echo '</td></tr>';
			}
		}
	}
	// ioncube loader in php cli
	if(!ignore_ioncube_check__index() &&
	   extension_loaded('ionCube Loader') &&
	   !check_ioncube_loader_phpcli__index($errstring)) {
		echo '<tr><td>ionCube loader in PHP cli</td>'.
		     '<td>'.
		     instructions__index("FAILED $errstring",
					 'Check your phpcli configuration !<br>Hints:<br>1) Different version of the php web module and php cli. On Ubuntu/Debian check your \'/etc/alternatives/php\' link. If bad then you can try ({VERSION} replace your right php version (5.6, 7.0)):<br>rm /etc/alternatives/php<br>ln -s /usr/bin/php{VERSION} /etc/alternatives/php<br><br>2) ionCube module has sometimes bad access rights:<br>chmod 0644 YOUR_PHP_IONCUBE_MODULE<br>3) check permissions for full php module path, all directories in the path must have 0755').
		     '</td></tr>';
	}
	// urw fonts
	if(!check_fonts()) {
		echo '<tr><td>Postscript fonts</td>'.
		     '<td>'.
		     instructionsInstall__index('Postscript fonts missing',
						'apt-get install gsfonts',
						'yum install urw-fonts',
						'zypper install ghostscript-fonts-std').
		     '</td></tr>';
	}
	//
	echo '</table><br>';
}

function render_install_form_base_licensekey() {
	echo '<table cellpadding=0 cellspacing=0">';
	$SITE = Get_brand_sitename();
	$licensekeyUrl = Get_brand_get_licensekey_url();
	if($licensekeyUrl) {
		$hwid = NULL;
		exec("bin/hwid-" . php_uname('m'), $output_hwid , $return_var_hwid);
		if(count($output_hwid) &&
		   preg_match('/hardware id:(?P<hwid>.*)/', $output_hwid[0], $match_hwid)) {
			$hwid = $match_hwid['hwid'];
		}
		$dbtoken = getLicenseTokenDB__index();
		$token = $dbtoken !== false ? $dbtoken : $_POST['license_token'];
		echo '<tr>'.
		     '<td colspan=2 style="padding: 1px; padding-right: 20px;">'.
		     "<p style=\"color:black; word-wrap: break-word; white-space: normal; width: 550;\">your server id is: {$hwid}".
		     '</td></tr><tr>';
		echo '<td colspan=2 style="padding: 1px;">'.
		     '<br><h2>If you do not have account yet please create one on:</h2>'.
		     '<a target="_blank" href="https://' . $SITE . '/getfreetrial" class="button button-blue" style="float: right; margin-right: 20px; padding: 4px 7px 5px 7px;">register</a><br><br>'.
		     '</td></tr><tr>';
		echo '<td colspan=2 style="padding: 1px;">'.
		     '<br><h2>If you have already your license token insert it here</h2>'.
		     '</td></tr><tr>'.
		     '<td colspan=2 style="padding: 1px;">'.
		     '<span id="licensekey_alert" style="color: red; font-weight: bold;"></span>'.
		     '</td></tr><tr>'.
		     '<td style="padding: 1px; color: black;">license token:</td>'.
		     '<td style="padding: 1px; padding-right: 20px; width: 470px;">'.
		     '<input type="text" name="license_token" id="license_token" value="' . $token . '" style="width: 100%;">'.
		     '</td></tr><tr>'.
		     '<td colspan=2 style="padding: 1px; padding-top: 5px;">'.
		     '<a target="_blank" onclick="getlicense(false, true)" class="button button-blue" style="float: right; margin-right: 20px; padding: 4px 7px 5px 7px;">get/update license key</a><br><br>'.
		     '</td></tr><tr>';
		echo '<td colspan=2 style="padding: 1px;">'.
		     '<br><h2 style="padding-right: 20px;">If your machine does not have access to internet please paste your license key which you can get from:</h2>'.
		     '<a target="_blank" href="http://' . $SITE . '/whmcs/clientarea.php?action=products" class="button button-blue" style="float: right; margin-right: 20px; padding: 4px 7px 5px 7px;">download license</a><br><br>'.
		     '</td></tr>';
	}
	echo '<tr>'.
	     '<td style="padding: 1px; color: black;">license key:</td>'.
	     '<td style="padding: 1px; padding-right: 20px;">'.
	     '<textarea rows=6 name="licensekey" id="licensekey" style="width: 100%;">'.htmlspecialchars($_POST['licensekey']).'</textarea>'.
	     '</td></tr>';
	echo '</table>';
	if($licensekeyUrl) {
		echo '<script type="text/javascript">
			function getlicense(useWget, tryWget) {
				getlicense_alert("");
				var elLicenseToken = document.getElementById("license_token");
				if(!elLicenseToken.value) {
					getlicense_alert("missing license token");
					return;
				}
				var elLicenseKey = document.getElementById("licensekey");
				var xmlhttp;
				if(window.XMLHttpRequest) {
					xmlhttp = new XMLHttpRequest();
				} else {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange = function() {
					if(xmlhttp.readyState == 4) {
						if(xmlhttp.status == 200) {
							result = xmlhttp.responseText ? JSON.parse(xmlhttp.responseText) : null;
							if(!result) {
								getlicense_alert("unknown response");
							} else {
								if(result.success) {
									elLicenseKey.value = result.key;
									var recheckButton = document.getElementById("recheck_button");
									if(recheckButton) {
										recheckButton.click();
									}
								} else {
									getlicense_alert(result.error);
								}
							}
						} else {
							if(xmlhttp.statusText) {
								getlicense_alert(xmlhttp.statusText);
							} else {
								getlicense_alert("unknown error");
							}
							if(!useWget && tryWget) {
								getlicense(true);
							}
						}
					}
				}
				if(useWget) {
					xmlhttp.open("POST", "php/lib/functions_open.php", true);
					xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlhttp.send("function_open_task=wget_license" +
						     "&licensetoken=" + encodeURIComponent(elLicenseToken.value.trim()) +
						     "&hwid=" + "' . urlencode($hwid) . '");
				} else {
					xmlhttp.open("POST", "' . $licensekeyUrl . '", true);
					xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlhttp.send("licensetoken=" + encodeURIComponent(elLicenseToken.value.trim()) +
						     "&hwid=" + "' . urlencode($hwid) . '");
				}
			}
			function getlicense_alert(text) {
				var elLicenseKeyAlert = document.getElementById("licensekey_alert");
				elLicenseKeyAlert.innerHTML = text;
			}
		      </script>';
	}
}

function render_install_form_configuration() {
	echo '<br><br><h1> Configuration </h1>';
	echo '<table>';
	echo '<tr><td>pcap spool directory</td><td><input type="text" name="SPOOLDIR" size="100" value="'.
	     $_POST['SPOOLDIR'].'"/></tr></tr>';
	echo '<tr><td>Disable check spool directory</td><td><input type="checkbox" name="DISABLE_CHECK_SPOOLDIR" value="1" '.
	     ($_POST['DISABLE_CHECK_SPOOLDIR'] == 1 ? 'checked' : '').'/></td></tr>';
	echo '<tr><td>MySQL host</td><td><input type="text" name="MYSQL_HOST" size="100" value="'.
	     $_POST['MYSQL_HOST'].'"/></tr></tr>';
	echo '<tr><td>MySQL database</td><td><input type="text" name="MYSQL_DB" size="100" value="'.
	     $_POST['MYSQL_DB'].'"/></tr></tr>';
	$muser = str_replace('"', '&#34;', $_POST['MYSQL_USER']);
	echo '<tr><td>MySQL user</td><td><input type="text" name="MYSQL_USER" size="100" value="'.
	     $muser.'"/></tr></tr>';
	echo '<tr><td>MySQL password</td><td><input type="text" name="MYSQL_PASS" size="100" value="'.
	     $_POST['MYSQL_PASS'].'"/></td></tr>';
	echo '<tr><td>MySQL key for SSL/TLS</td><td><input type="text" name="MYSQL_KEY" size="100" value="'.
	     $_POST['MYSQL_KEY'].'"/></tr></tr>';
	echo '<tr><td>MySQL certificate for SSL/TLS</td><td><input type="text" name="MYSQL_CERT" size="100" value="'.
	     $_POST['MYSQL_CERT'].'"/></tr></tr>';
	echo '<tr><td>MySQL ca certificate for SSL/TLS</td><td><input type="text" name="MYSQL_CACERT" size="100" value="'.
	     $_POST['MYSQL_CACERT'].'"/></tr></tr>';
	echo '<tr><td>MySQL ca path for SSL/TLS</td><td><input type="text" name="MYSQL_CAPATH" size="100" value="'.
	     $_POST['MYSQL_CAPATH'].'"/></tr></tr>';
	echo '<tr><td>MySQL ciphers for SSL/TLS</td><td><input type="text" name="MYSQL_CIPHERS" size="100" value="'.
	     $_POST['MYSQL_CIPHERS'].'"/></tr></tr>';
	echo '<tr><td>Sniffer manager host</td><td><input type="text" name="VPMANAGERHOST" size="100" value="'.
	     $_POST['VPMANAGERHOST'].'"/></td></tr>';
	echo '<tr><td>Sniffer manager port</td><td><input type="text" name="VPMANAGERPORT" size="100" value="'.
	     $_POST['VPMANAGERPORT'].'"/></td></tr>';
	echo '<tr><td>DNS reverse lookup</td><td><input type="checkbox" name="ENABLE_IP_REVERSE_LOOKUP" value="1" '.
	     ($_POST['ENABLE_IP_REVERSE_LOOKUP'] == 1 ? 'checked' : '').'/></td></tr>';
	echo '<tr><td>Default CDR date interval</td><td><input type="text" name="DEFAULT_CDR_INTERVAL" size="100" value="'.
	     $_POST['DEFAULT_CDR_INTERVAL'].'"/></td></tr>';
	//echo '<tr><td>Group IP type</td><td><input type="text" name="" size="100" value="'.$_POST[''].'"/></td></tr>';
	echo '</table>';
	echo '<br><br>';
	echo '<input type="submit" name="submit" value="Submit" class="button button-blue">';
}

function render_install_form_recheck_btn() {
	echo '<input type="submit" name="recheck" value="Recheck" id="recheck_button" class="button button-blue">';
}

function render_install_form_ok_btn() {
	echo '<button class="button button-blue" onClick="window.location=\'./admin.php\';">Installation is finished</button>';
}

function render_install_form_write_configuration_failed() {
	global $rsltWriteConfiguration;
	echo '<div style="color: red;">Cannot write configuration file '.dirname(__FILE__).'/config/configuration.php'.'<br><br>Copy following contents to that file or make dir '.dirname(__FILE__).' writable by web server. Run chown -R '.get_www_user__index().' '.dirname(__FILE__).' <br></div>';
	echo '<textarea cols=80, rows=55>'.htmlspecialchars($rsltWriteConfiguration).'</textarea>';
	echo '<br>';
	render_install_form_recheck_btn();
}

// -----------------------------------------
// write and default configuration

function write_config() {
	global $APP_NAME;
	global $DBNAME;
	global $SNIFFERNAME;
	$BASENAME = Get_brand_base();
	$mpasswd = str_replace("'", "\'", $_POST['MYSQL_PASS']);
	$muser =  str_replace('"', '\"', $_POST['MYSQL_USER']);
	$data = '<?PHP

define("SNIFFER_NAME", "' . $SNIFFERNAME . '");
define("SQL_DRIVER", "mysql"); // mysql || mssql || odbc
define("SQL_CDRTABLE", "cdr");
define("SQL_CDR_RTP_TABLE", "cdr_rtp");
define("SQL_CDR_NEXT_TABLE", "cdr_next");
define("SQL_CDR_PHONE_NUMBER_TABLE", "cdr_phone_number");
define("SQL_CDR_NAME_TABLE", "cdr_name");
define("SQL_CDR_DOMAIN_TABLE", "cdr_domain");
define("SQL_CDR_UA_TABLE", "cdr_ua");
define("SQL_CDR_SIP_RESPONSE_TABLE", "cdr_sip_response");

define("MYSQL_HOST", "'.$_POST['MYSQL_HOST'].'");
define("MYSQL_DB", "'.$_POST['MYSQL_DB'].'");
define("MYSQL_USER", "'.$muser.'");
define("MYSQL_PASS", \''.$mpasswd.'\');
define("MYSQL_KEY", "'.$_POST['MYSQL_KEY'].'");
define("MYSQL_CERT", "'.$_POST['MYSQL_CERT'].'");
define("MYSQL_CACERT", "'.$_POST['MYSQL_CACERT'].'");
define("MYSQL_CAPATH", "'.$_POST['MYSQL_CAPATH'].'");
define("MYSQL_CIPHERS", "'.$_POST['MYSQL_CIPHERS'].'");

define("MSSQL_HOST", "127.0.0.1");
define("MSSQL_DB", "' . $DBNAME . '");
define("MSSQL_USER", "root");
define("MSSQL_PASS", \'\');

define("ODBC_DSN", "' . $DBNAME . '");
define("ODBC_USER", "root");
define("ODBC_PASS", \'\');
define("ODBC_DRIVER", "mssql");

define("SPOOLDIR", "'.$_POST['SPOOLDIR'].'");

define("VPMANAGERHOST", "'.$_POST['VPMANAGERHOST'].'");
/* define manager port for call monitoring */
define("VPMANAGERPORT", "'.$_POST['VPMANAGERPORT'].'");

# this is for rare cases when wav cannot be decoded 
#define("NORTPFIRSTLEG", true);

define("TIMEZONE", "' . (get_system_timezone__index() ? 'system default' : 'Etc/UTC') . '");
define("DATE_FORMAT", "Y-m-d");
define("TIME_FORMAT", "G:i:s");

define("DEFAULT_CDR_INTERVAL", '.$_POST['DEFAULT_CDR_INTERVAL'].');

define("ENABLE_GROUPS_CDR", true);
define("ENABLE_FILTER_CDR_BY_IP_GROUPS", true);
define("ENABLE_GROUP_CDR_BY_IP_GROUPS", true);
define("ENABLE_IP_REVERSE_LOOKUP", '.(!empty($_POST['ENABLE_IP_REVERSE_LOOKUP']) ? 'true' : 'false').');
define("ENABLE_SQL_IP_REVERSE_LOOKUP", true);
define("ENABLE_DIG_REVERSE_RESOLVE", false);
define("ENABLE_SQL_CUSTOMER_PREFIX_LOOKUP", false);
define("ENABLE_TEST_SIP_USERS", false);

// if true  https://' . $BASENAME . '/php/2909.wav will not require user to be logged 

// if true, user is not checked against valid session when downloading WAV. Suitable for downloading WAV outside ' . $APP_NAME . ' GUI. If you need to secure it, you can set WAV_API_KEY below.
define("DISABLE_WAV_SECURITY", false);

// if you set DISABLE_WAV_SECURITY and set WAV_API_KEY, you have to pass &key=puthereSomeKey to WAV /php/wav.php?id=226587&key=puthereSomeKey. If you do not set WAV_API_KEY you do not need to pass that key (but still have to set true to DISABLE_WAV_SECURITY
#define("WAV_API_KEY", "puthereSomeKey");

// disable showing domains in CDR
define("DISABLE_SHOW_DOMAIN", false);

// disable play in live view globally
define("DISABLE_LIVEPLAY", false);

// disable play in CDR globally
define("DISABLE_CDRPLAY", false);

// define configuration file used for uploading files
define("UPLOADPCAP_SNIFFERCONF", "/etc/' . $SNIFFERNAME . '.conf");

define("DISABLE_CHECK_SPOOLDIR", '.(!empty($_POST['DISABLE_CHECK_SPOOLDIR']) ? 'true' : 'false').');

define("EULA_AGREE", true);

?>';

	if(!file_exists(dirname(__FILE__).'/config/configuration.php')) {
		if(!@touch(dirname(__FILE__).'/config/configuration.php')) {
			return $data;
		} else {
			file_put_contents(dirname(__FILE__).'/config/configuration.php', $data);
			return 1;
		}
	}

	return 1;
}

function set_default_config() {
	global $DBNAME;
	global $SNIFFERNAME;
	if(!isset($_POST['SPOOLDIR'])) {
		if(file_exists('config/configuration.php')) {
			require_once('config/configuration.php');
			$_POST['SPOOLDIR'] = defined('SPOOLDIR') ? SPOOLDIR : NULL;
			$_POST['DISABLE_CHECK_SPOOLDIR'] = defined('DISABLE_CHECK_SPOOLDIR') ? DISABLE_CHECK_SPOOLDIR : 0;
			$_POST['MYSQL_HOST'] = defined('MYSQL_HOST') ? MYSQL_HOST : NULL;
			$_POST['MYSQL_DB'] = defined('MYSQL_DB') ? MYSQL_DB : NULL;
			$_POST['MYSQL_USER'] = defined('MYSQL_USER') ? MYSQL_USER : NULL;
			$_POST['MYSQL_PASS'] = defined('MYSQL_PASS') ? MYSQL_PASS : NULL;
			$_POST['MYSQL_KEY'] = defined('MYSQL_KEY') ? MYSQL_KEY : NULL;
			$_POST['MYSQL_CERT'] = defined('MYSQL_CERT') ? MYSQL_CERT : NULL;
			$_POST['MYSQL_CACERT'] = defined('MYSQL_CACERT') ? MYSQL_CACERT : NULL;
			$_POST['MYSQL_CAPATH'] = defined('MYSQL_CAPATH') ? MYSQL_CAPATH : NULL;
			$_POST['MYSQL_CIPHERS'] = defined('MYSQL_CIPHERS') ? MYSQL_CIPHERS : NULL;
			$_POST['VPMANAGERHOST'] = defined('VPMANAGERHOST') ? VPMANAGERHOST : NULL;
			$_POST['VPMANAGERPORT'] = defined('VPMANAGERPORT') ? VPMANAGERPORT : NULL;
			$_POST['DEFAULT_CDR_INTERVAL'] = defined('DEFAULT_CDR_INTERVAL') ? DEFAULT_CDR_INTERVAL : NULL;
			$_POST['ENABLE_GROUPS_CDR'] = defined('ENABLE_GROUPS_CDR') ? ENABLE_GROUPS_CDR : NULL;
			$_POST['ENABLE_IP_REVERSE_LOOKUP'] = defined('ENABLE_IP_REVERSE_LOOKUP') ? ENABLE_IP_REVERSE_LOOKUP : NULL;
		} else {
			$_POST['SPOOLDIR'] = '/var/spool/' . $SNIFFERNAME . '/';
			$_POST['DISABLE_CHECK_SPOOLDIR'] = 0;
			$_POST['MYSQL_HOST'] = '127.0.0.1';
			$_POST['MYSQL_DB'] = $DBNAME;
			$_POST['MYSQL_USER'] = 'root';
			$_POST['MYSQL_KEY'] = NULL;
			$_POST['MYSQL_CERT'] = NULL;
			$_POST['MYSQL_CACERT'] = NULL;
			$_POST['MYSQL_CAPATH'] = NULL;
			$_POST['MYSQL_CIPHERS'] = NULL;
			$_POST['VPMANAGERHOST'] = '127.0.0.1';
			$_POST['VPMANAGERPORT'] = '5029';
			$_POST['DEFAULT_CDR_INTERVAL'] = '0';
			$_POST['ENABLE_GROUPS_CDR'] = 1;
			$_POST['ENABLE_IP_REVERSE_LOOKUP'] = 0;
		}
	}
}

// -----------------------------------------
// check configuration

function check_all($savedOnly = false) {
	$rsltCheckBase = check_base();
	$rsltCheckConfiguration = check_configuration($savedOnly);
	return($rsltCheckBase &&
	       $rsltCheckConfiguration &&
	       check_exists_key() &&
	       (ignore_ioncube_check__index() ||
		extension_loaded('ionCube Loader') &&
		check_ioncube_version() &&
		key_check2()) &&
	       (ignore_ioncube_check__index() ||
		check_ioncube_loader_phpcli__index($etmp)));
}

function check_base() {
	$arch = php_uname('m');
	return(
		(function_exists('mysql_connect') || function_exists('mysqli_connect')) &&
		(getPhpVersion__index() < 502 || function_exists('json_encode')) &&
		function_exists('gd_info') &&
		(function_exists('zip_open') || exists_unzip__index()) &&
		function_exists('mb_strlen') &&
		function_exists('posix_getpwuid') &&
		(function_exists('gzdecode') || function_exists('gzinflate')) &&
		exists_is_set_executable_bin_util('phantomjs') &&
		exists_is_set_executable_bin_util('sox') &&
		exists_is_set_executable_bin_util('tshark') &&
		exists_is_set_executable_bin_util('mergecap') &&
		exists_is_set_executable_bin_util('t38_decode') &&
		(!file_exists('bin/mscgen-'.$arch) || is_set_executable__index('bin/mscgen-'.$arch)) &&
		(!file_exists('bin/charts-'.$arch) || is_set_executable__index('bin/charts-'.$arch)) &&
		(file_exists('bin/vm-'.$arch) && is_set_executable__index('bin/vm-'.$arch) ||
		 file_exists('bin/vm') && is_set_executable__index('bin/vm') ||
		 !in_array($arch, array('i686','x86_64'))) &&
		(!file_exists('bin/vmcodecs') || is_set_executable__index('bin/vmcodecs')) &&
		check_temp() &&
		check_fonts());
}

function check_fonts() {
	return(file_exists('/usr/share/fonts/default/Type1') ||
	       file_exists('/usr/share/fonts/ghostscript') ||
	       file_exists('/usr/share/fonts/type1/gsfonts') ||
	       file_exists('/usr/share/fonts/urw-fonts') ||
	       file_exists('/usr/share/fonts/urw-base35'));
}

function check_configuration($savedOnly = false) {
	if(is_cloud()) {
		return(true);
	}
	$_checkMysqlConnect = check_mysql_connect($savedOnly, $connect_error);
	$_checkSpooldir = check_spooldir($savedOnly);
	if($savedOnly) {
		global $rsltCheckMysqlConnectSaved;
		global $rsltCheckSpooldirSaved;
		global $rsltCheckConfigurationSaved;
		$rsltCheckMysqlConnectSaved = $_checkMysqlConnect;
		$rsltCheckSpooldirSaved = $_checkSpooldir;
		$rsltCheckConfigurationSaved = $_checkMysqlConnect && $_checkSpooldir;
	} else {
		global $rsltCheckMysqlConnect;
		global $rsltCheckSpooldir;
		global $rsltCheckConfiguration;
		$rsltCheckMysqlConnect = $_checkMysqlConnect;
		$rsltCheckSpooldir = $_checkSpooldir;
		$rsltCheckConfiguration = $_checkMysqlConnect && $_checkSpooldir;
	}
	return($_checkMysqlConnect && $_checkSpooldir);
}       

function check_exists_key() {
	return(file_exists('key.php'));
}

function check_mysql_connect($savedOnly, &$connect_error) {
	$connect_error = NULL;
	if(!function_exists('mysql_connect') && !function_exists('mysqli_connect')) {
		$connect_error = 'missing functions mysql_connect and mysqli_connect in php configuration';
		return(false);
	}
	if(defined('SQL_DRIVER') && SQL_DRIVER != 'mysql') {
		return(true);
	}
	if(!isset($_POST['MYSQL_HOST']) || $savedOnly) {
		if(file_exists('config/configuration.php')) {
			require_once('config/configuration.php');
			if(!defined('MYSQL_HOST')) {
				$connect_error = 'missing mysql configuration in config/configuration.php';
				return(false);
			}
		} else {
			$connect_error = 'missing config/configuration.php';
			return(false);
		}
	}
	$link = isset($_POST['MYSQL_HOST']) && !$savedOnly ?
		vm_mysql_connect__index($_POST['MYSQL_HOST'], $_POST['MYSQL_USER'], $_POST['MYSQL_PASS'],
				$_POST['MYSQL_KEY'], $_POST['MYSQL_CERT'], $_POST['MYSQL_CACERT'], $_POST['MYSQL_CAPATH'], $_POST['MYSQL_CIPHERS']) :
		vm_mysql_connect__index(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_KEY, MYSQL_CERT, MYSQL_CACERT, MYSQL_CAPATH, MYSQL_CIPHERS);
	if($link) {
		if(!vm_mysql_select_db__index(isset($_POST['MYSQL_DB']) && !$savedOnly ? $_POST['MYSQL_DB'] : MYSQL_DB, $link)) {
			$connect_error = vm_mysql_error__index($link);
			return(false);
		}
	} else {
		$connect_error = vm_mysql_error__index();
		return(false);
	}
	return(true);
}

function check_spooldir_set($savedOnly = false) {
	if(!$savedOnly && isset($_POST['SPOOLDIR']) && $_POST['SPOOLDIR']) {
		return($_POST['SPOOLDIR']);
	}
	if(file_exists('config/configuration.php')) {
		require_once('config/configuration.php');
		if(defined('SPOOLDIR') && SPOOLDIR) {
			return(SPOOLDIR);
		}
	}
	return(false);
}

function check_spooldir_exists($savedOnly = false) {
	$spooldir = NULL;
	if(!$savedOnly && isset($_POST['SPOOLDIR'])) {
		$spooldir = $_POST['SPOOLDIR'];
	} else if(file_exists('config/configuration.php')) {
		require_once('config/configuration.php');
		if(defined('SPOOLDIR') && SPOOLDIR) {
			$spooldir = SPOOLDIR; 
		}
	}
	return($spooldir && file_exists($spooldir));
}

function check_spooldir($savedOnly = false) {
	if(!isset($_POST['SPOOLDIR']) || $savedOnly) {
		if(file_exists('config/configuration.php')) {
			require_once('config/configuration.php');
			if(!defined('SPOOLDIR')) {
				return(false);
			}
		} else {
			return(false);
		}
	}
	if(isset($_POST['SPOOLDIR']) && !$savedOnly ?
		!empty($_POST['DISABLE_CHECK_SPOOLDIR']) :
		true_defined__index('DISABLE_CHECK_SPOOLDIR')) {
		return(true);
	}
	$spooldir = isset($_POST['SPOOLDIR']) && !$savedOnly ?
			$_POST['SPOOLDIR'] :
			SPOOLDIR;
	if(@touch($spooldir."/testwrite")) {
		@unlink($spooldir."/testwrite");
		return(true);
	}
	return(false);
}

function check_temp() {
	$tempFile = tempnam(sys_get_temp_dir(), 'VM');
	if($tempFile) {
		@unlink($tempFile);
		return(true);
	}
	return(false);
}

function check_exists_local_admin() {
	if(file_exists('config/configuration.php')) {
		require_once('config/configuration.php');
	} else {
		return(-1);
	}
	if(defined('SQL_DRIVER') && SQL_DRIVER != 'mysql') {
		return(-1);
	}
	if(!($dbLink = vm_mysql_connect__index(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_KEY, MYSQL_CERT, MYSQL_CACERT, MYSQL_CAPATH, MYSQL_CIPHERS))) {
		return(-1);
	}
	if(!vm_mysql_select_db__index(MYSQL_DB , $dbLink)) {
		return(-1);
	}
	if(!($queryRslt = vm_mysql_query__index("show tables like 'users'", $dbLink))) {
		return(-1);
	}
	if(!vm_mysql_fetch_array__index($queryRslt)) {
		return(false);
	}
	if(!($queryRslt = vm_mysql_query__index("select * from users", $dbLink))) {
		return(-1);
	}
	if(!vm_mysql_fetch_array__index($queryRslt)) {
		return(false);
	}
	return(true);
}

function is_cloud() {
	return(defined('MYSQL_CLOUD_HOST'));
}

// -----------------------------------------
// install scripts

function install_all() {
	install_phantom_js();
	install_sox();
	install_tshark();
	install_mergecap();
	install_t38_decode();
}

function install_phantom_js() {
	install_bin_util('phantomjs');
}

function install_sox() {
	install_bin_util('sox');
}

function install_tshark() {
	install_bin_util('tshark');
}

function install_mergecap() {
	install_bin_util('mergecap');
}

function install_t38_decode() {
	install_bin_util('t38_decode');
}

function check_bin_util($binUtil) {
	if(!exists_bin_util($binUtil)) {
		echo instructions_install_bin_util($binUtil);
	}
	else if(!is_set_executable_bin_util($binUtil)) {
		echo instructions_set_executable_bin_util($binUtil);
	}
}

function instructions_install_bin_util($binUtil) {
	$confBinUtil = get_configuration_bin_util($binUtil);
	if(!$confBinUtil) {
		return;
	}
	$dir = dirname(__FILE__)."/bin/";
	return("<tr><td>{$confBinUtil['name']} binary</td>".
	       "<td>".
	       ($confBinUtil['zip'] ?
		 instructions__index('FAILED',
				     "wget {$confBinUtil['url']} -O '{$dir}{$confBinUtil['bin']}.gz'".BR4__index().
				     "gunzip '{$dir}{$confBinUtil['bin']}.gz'".BR4__index().
				     "chmod +x '{$dir}{$confBinUtil['bin']}'") :
		 instructions__index('FAILED',
				     "wget {$confBinUtil['url']} -O '{$dir}{$confBinUtil['bin']}'".BR4__index().
				     "chmod +x '{$dir}{$confBinUtil['bin']}'")) .
	       "</td></tr>");
}

function instructions_set_executable_bin_util($binUtil) {
	$confBinUtil = get_configuration_bin_util($binUtil);
	if(!$confBinUtil) {
		return;
	}
	$dir = dirname(__FILE__)."/bin/";
	return("<tr><td>{$confBinUtil['name']} binary is not executable</td>".
	       "<td>".
	       instructions__index('FAILED',
				   "chmod +x '{$dir}{$confBinUtil['bin']}'") .
	       "</td></tr>");
}

function try2untar_bins() {
	if(isset($_POST['skip'])) {
		return;
	}

	global $VoipBinName;
	$bintarfile = "$VoipBinName-" . php_uname('m') . '.tar.gz';
	if (!file_exists($bintarfile)) {
		return;
	}

	$dir = dirname(__FILE__)."/bin/";
	$chownInstruction = '<span style=\"font-size: 70%;\">next please run: chown -R ' . get_www_user__index() . ' ' . $dir . '</span>';

	$download = new cDownload__index();
	$download->setTitle('Trying to untar pre-downloaded archive with binaries.');
	$download->setText('Untaring ...');
	$download->createProgressBar();
	if ($download->untar($bintarfile)) {
		$download->setText('SUCCESS');
		sleep(1);
	} else {
		$download->setText('');
		$download->setError('Error: to fallback to binary downloading, delete tarfile from gui directory<br>' . $chownInstruction);
		exit;
	}
	$download->destroyProgressBar();
}

function install_bin_util($binUtil) {
	$confBinUtil = get_configuration_bin_util($binUtil);
	if(!$confBinUtil) {
		return;
	}
	//debug_stderr__index(print_r($confBinUtil, true));
	if(!file_exists('bin/' . $confBinUtil['bin'])) {
		try2untar_bins();
	}
	if(file_exists('bin/' . $confBinUtil['bin'])) {
		return;
	}

	install_bin($confBinUtil['name'], $confBinUtil['url'], $confBinUtil['bin'], $confBinUtil['zip']);
}

function install_bin($name, $url, $binName, $zip) {
	if(isset($_POST['skip'])) {
		return;
	}
	$dir = dirname(__FILE__)."/bin/";
	$chownInstruction = '<span style=\"font-size: 70%;\">please run: chown -R ' . get_www_user__index() . ' ' . $dir . '</span>';
	$ok = false;
	$download = new cDownload__index();
	$download->createProgressBar();
	$download->setTitle('downloading and installing ' . $name);
	$download->setText('downloading ...');
	if($download->download($url)) {
		$download->setText('save');
		$binPathName = 'bin/' . $binName;
		$zipName = $binName . '.gz';
		$zipPathName = 'bin/' . $zipName;
		@unlink($zipPathName);
		if($download->save($zip ? $zipPathName : $binPathName)) {
			if($zip) {
				$download->setText('unzip');
				@unlink($binPathName);
			}
			if(!$zip || $download->unzip($zipPathName)) {
				$download->setText('set chmod +x');
				if($download->chmodx($binPathName)) {
					$download->setText('SUCCESS');
					$ok = true;
				} else {
					$download->setText('');
					$download->setError('set chmod +x failed<br>' . $chownInstruction);
				}
			} else {
				$download->setText('');
				$download->setError('unzip failed<br>' . $chownInstruction);
			}
		} else {
			$download->setText('');
			$download->setError('save failed<br>' . $chownInstruction);
		}
	} else {
		$download->setText('');
		$download->setError('download failed');
	}
	if($ok) {
		sleep(1);
	} else {
		exit;
	}
	$download->destroyProgressBar();
	return($ok);
}

// -----------------------------------------
// additional features

function _getCookie__index($name) {
        $name = _getCookieName__index($name);
        return(isset($_COOKIE[$name]) ? $_COOKIE[$name] : '');
}

function _setCookie__index($name, $value) {
        setcookie(_getCookieName__index($name), $value, time()+60*60*24*365, '/', '', !empty($_SERVER["HTTPS"]), true);
}

function _clearCookie__index($name) {
        setcookie(_getCookieName__index($name), '', false, '/');
}

function _getCookieName__index($name) {
        if(!true_defined__index('SESSION_NAME_IGNORE_SERVER_FOLDER')) {
                $serverFolder = str_replace('/','_',_getServerFolder__index());
                if($serverFolder) {
                        $name .= '_' . $serverFolder;
                }
        }
        return($name);
}

function _getServerFolder__index() {
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

function _session_start__index() {
	if(session_id() != '') {
		return;
	} else {
		if(file_exists('/dev/shm') && is_writable('/dev/shm')) {
			ini_set('session.save_handler', 'files');
			ini_set('session.save_path','/dev/shm');
		}
	}
	if(!true_defined__index('SESSION_NAME_IGNORE_SERVER_FOLDER') ||
	   true_defined__index('_SESSION_NAME_BY_SERVER_FOLDER')) {
		$serverFolder = str_replace('/','_',_getServerFolder__index());
		if($serverFolder) {
			session_name(session_name() . '-' . $serverFolder);
		}
	}
	session_start();
}

function true_defined__index($name) {
	if(defined($name)) {
		$constants = get_defined_constants();
		if(isset($constants[$name])) {
			return($constants[$name]);
		}
	}
	return(false);
}

function _is_number__index($value) {
	return(is_int($value) || is_float($value) ||
	       is_string($value) && (string)($value*1) === $value);
}

function set_executable__index($file) {
	exec('chmod +x ' . escapeshellarg($file));
	return(is_executable($file));
}

function is_set_executable__index($file) {
	if(is_executable($file)) {
		return(true);
	}
	exec('chmod +x ' . escapeshellarg($file));
	return(is_executable($file));
}

function is_fileinpath__index($find, $paths) {
	$found = false;
	$paths = explode(":", $paths);
	foreach($paths as $p) {
		$fullname = $p.DIRECTORY_SEPARATOR.$find;
		if(is_file($fullname)) {
			$found = $fullname;
			break;
		}
	}
	return $found;
}

function get_www_user__index() {
	global $SNIFFERNAME;
	$lockfile = tempnam(sys_get_temp_dir(), "$SNIFFERNAME.testpid");
	touch($lockfile);
	if(function_exists('posix_getpwuid')) {
		$info = @posix_getpwuid(fileowner($lockfile));
	} else {
		return "apache"; // the posix_getpwuid does not exists assume user apache
	}
	@unlink($lockfile);
	return($info['name']);
}

function get_apache_restart_command__index($enablePlaceHolderComment = true) {
	$cmds = array('/etc/init.d/apache' => '/etc/init.d/apache restart',
		      '/etc/init.d/apache2' => '/etc/init.d/apache2 restart',
		      '/etc/init.d/http' => '/etc/init.d/http restart',
		      '/etc/init.d/httpd' => '/etc/init.d/httpd restart',
		      '/lib/systemd/system/httpd.service;/lib/systemd/system/php-fpm.service' => 'service httpd restart; service php-fpm restart',
		      '/lib/systemd/system/httpd.service' => 'service httpd restart');
	$rsltCmd = NULL;
	foreach($cmds as $testFiles => $cmd) {
		$testFilesA = explode(';', $testFiles);
		$okFiles = true;
		foreach($testFilesA as $testFile) {
			if(!file_exists($testFile)) {
				$okFiles = false;
				break;
			}
		}
		if($okFiles) {
			$rsltCmd = $cmd;
			break;
		}
	}
	return($rsltCmd ? 
		$rsltCmd :
		($enablePlaceHolderComment ? '<i>restart http|apache server</i>' : NULL));
}

function exists_apt_get__index() {
	return(is_fileinpath__index("apt-get", "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"));
}

function exists_unzip__index() {
	return(is_fileinpath__index("unzip", "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"));
}

function exists_yum__index() {
	return(is_fileinpath__index("yum", "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"));
}

function instructions__index($title, $instructions, $color = 'red', $instructionsTitle = "follow these instructions:") {
	$html = '<h2 style="color: ' . $color . ';">' . $title . '</h2>'.
		'<h3 style="padding-bottom: 4px;">' . $instructionsTitle . '</h3>';
	$html .= $instructions . BR4__index();
	return($html);
}

function instructionsInstall__index($title, $debian, $redhat, $color = NULL, $other = NULL) {
	if(!$color) {
		$color = 'red';
	}
	$html = '<h2 style="color: ' . $color . ';">' . $title . '</h2>'.
		'<h3 style="padding-bottom: 4px;">follow these installation instructions:</h3>';
	if($debian && exists_apt_get__index()) {
		$html .= //'<h3>Debian/Ubuntu or derivates</h3><br>' .
			 $debian . BR4__index();
	} else if($redhat && exists_yum__index()) {
		$html .= //'<h3>Centos/Redhat or derivates</h3><br>' .
			 $redhat . BR4__index();
	} else {
		$html .= ($debian ? $debian : $redhat) . BR4__index();
	}
	switch($other) {
	case 'restart_apache':
		$html .= get_apache_restart_command__index() . BR4__index();
	}
	return($html);
}

function BR4__index() {
	 return('<br><div style="height: 4px;"></div>');
}

function ignore_ioncube_check__index() {
	return(false);
	/*return((true_defined__index('ENABLE_DEBUG') || defined('ENABLE_DEBUG') && ENABLE_DEBUG === 0) &&
	       getPhpVersion__index() >= 702);*/
}

function check_ioncube_loader_phpcli__index(&$retstr) {
	exec("PATH=\$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin php -r 'echo extension_loaded(\"ionCube Loader\")?\"yes\":\"no\";' 2>&1", $output, $return_var);
	if (count($output)) {
		if ($output[0] == 'yes') {
			return(true);
		} else if ($output[0] == 'no') {
			$retstr = ": no ionCube extension enabled in PHP cli.";
		} else {
			$retstr = ': ' . $output[0];
		}
		return(false);
	} else {
		$retstr = ': really strange, I got no output from php cli command ?!';
	}
}

function getPhpVersion__index() {
	$version = phpversion();
	$version = explode('.', $version);
	return($version[0] * 100 + $version[1]);
}

function getLicenseTokenDB__index() {
	if((!function_exists('mysql_connect') && !function_exists('mysqli_connect')) ||
	   !function_exists('json_encode')) {
		return(false);
	}
	$db = isset($_POST['MYSQL_HOST']) ?
		vm_mysql_connect__index($_POST['MYSQL_HOST'], $_POST['MYSQL_USER'], $_POST['MYSQL_PASS'],
				$_POST['MYSQL_KEY'], $_POST['MYSQL_CERT'], $_POST['MYSQL_CACERT'], $_POST['MYSQL_CAPATH'], $_POST['MYSQL_CIPHERS']) :
		vm_mysql_connect__index(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_KEY, MYSQL_CERT, MYSQL_CACERT, MYSQL_CAPATH, MYSQL_CIPHERS);
	if(!$db ||
	   !vm_mysql_select_db__index(isset($_POST['MYSQL_DB']) ? $_POST['MYSQL_DB'] : MYSQL_DB, $db)) {
		return(false);
	}
	$result = vm_mysql_query__index(
		"select id from `system` where type = 'license_token'",
		$db);
	if(!$result) {
		return(false);
	}
	$result = vm_mysql_query__index(
		"select content from `system` where id = (select id from `system` where type = 'license_token')",
		$db);
	if(!$result) {
		return(false);
	}
	if($row = vm_mysql_fetch_array__index($result)) {
		return($row['content']);
	}
}

function setConfigurationTypeValue__index($type, $value) {
	$content = file_get_contents(dirname(__FILE__).'/config/configuration.php');
	$contentE = explode("\n", $content);
	$contentNewE = array();
	$existsType = false;
	$typeValueOk = false;
	if(is_string($value)) {
		$value = '"' . $value . '"';
	}
	$newTypeValue = "define(\"{$type}\", {$value});";
	foreach($contentE as $contentI) {
		if(strpos($contentI, '"' . $type . '"') !== false) {
			if($contentI != $newTypeValue) {
				$contentNewE[] = $newTypeValue;
				$existsType = true;
			} else {
				$typeValueOk = true;
			}
		} else {
			$contentNewE[] = $contentI;
		}
	}
	global $setConfigurationTypeValue_rslt;
	if($typeValueOk) {
		$setConfigurationTypeValue_rslt[$type] = true;
	} else {
		if(!$existsType) {
			$contentNewE[] = $newTypeValue;
		}
		$setConfigurationTypeValue_rslt[$type] = file_put_contents(dirname(__FILE__).'/config/configuration.php', implode("\n", $contentNewE));
	}
}

function saveLicenseToken__index($token) {
	if((!function_exists('mysql_connect') && !function_exists('mysqli_connect')) || 
	   !function_exists('json_encode')) {
		return(false);
	}
	$db = isset($_POST['MYSQL_HOST']) ?
		vm_mysql_connect__index($_POST['MYSQL_HOST'], $_POST['MYSQL_USER'], $_POST['MYSQL_PASS'],
				$_POST['MYSQL_KEY'], $_POST['MYSQL_CERT'], $_POST['MYSQL_CACERT'], $_POST['MYSQL_CAPATH'], $_POST['MYSQL_CIPHERS']) :
		vm_mysql_connect__index(MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_KEY, MYSQL_CERT, MYSQL_CACERT, MYSQL_CAPATH, MYSQL_CIPHERS);
	if(!$db ||
	   !vm_mysql_select_db__index(isset($_POST['MYSQL_DB']) ? $_POST['MYSQL_DB'] : MYSQL_DB, $db)) {
		return(false);
	}
	vm_mysql_query__index(
		"CREATE TABLE IF NOT EXISTS `system` (
			`id` int NOT NULL auto_increment,
			`type` text default NULL,
			`cdate` date default NULL,
			`cdatetime` datetime default NULL,
			`content` text default NULL,
			PRIMARY KEY  (`id`),
			UNIQUE `type_cdate` (type(100), cdate)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1;",
		$db);
	$result = vm_mysql_query__index(
		"select id from `system` where type = 'license_token'",
		$db);
	if(!$result) {
		return(false);
	}
	$token = vm_mysql_real_escape_string__index(trim($token));
	if($row = vm_mysql_fetch_array__index($result)) {
		return(vm_mysql_query__index("update `system` set content = '{$token}' where id = {$row['id']}",
					     $db));
	} else {
		return(vm_mysql_query__index("insert into `system` (type, content) values('license_token', '{$token}')",
					     $db));
	}
}

class cDownload__index {
	function __construct() {
		$this->downloadSize = 0;
		$this->content = NULL;
		$this->error = NULL;
	}
	function download($url) {
		return($this->_download_file_get_contents($url) ||
		       $this->_download_wget($url));
	}
	function _download_file_get_contents($url) {
		$oldErrorHandler = set_error_handler(array($this, 'error_handler'));
		$ctx = stream_context_create(array(
			"ssl" => array(
				"verify_peer" => false,
				"verify_peer_name" => false)));
		stream_context_set_params($ctx, array("notification" => array($this, "stream_notification_callback")));
		$this->content = file_get_contents($url, false, $ctx);
		if($this->content !== false) {
			$this->error = NULL;
		}
		if($oldErrorHandler) {
			set_error_handler($oldErrorHandler);
		}
		return($this->content !== false);
	}
	function _download_wget($url) {
		if(!is_fileinpath__index("wget", "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin")) {
			return(false);
		}
		$this->setText('downloading ... try wget ...');
		$this->content = false;
		$tmpDestFile = tempnam(sys_get_temp_dir(), "vm_inst_");
		$wgetCmd = "wget" . 
			   " --no-cache --no-check-certificate -t 1" . 
			   " --timeout=10" . 
			   " " . escapeshellarg($url) . 
			   " -O " . escapeshellarg($tmpDestFile) . 
			   " 2>&1";
		exec($wgetCmd, $output, $return_var);
		if($return_var === 0 && file_exists($tmpDestFile)) {
			$this->content = file_get_contents($tmpDestFile);
		} else {
			$this->error = (!empty($this->error) ? $this->error . '<br><br>' : '') . 
				       'wget<br><br>' . implode("<br>", $output);
		}
		unlink($tmpDestFile);
		return($this->content !== false);
	}
	function save($toFile) {
		$oldErrorHandler = set_error_handler(array($this, 'error_handler'));
		$rslt = file_put_contents($toFile, $this->content);
		if($rslt !== false) {
			$this->error = NULL;
		}
		if($oldErrorHandler) {
			set_error_handler($oldErrorHandler);
		}
		return($rslt !== false);
	}
	function untar($tarFile) {
		$cmd = 'tar xfz ' . $tarFile;
		$pipeDescr = array(
			1 => array('pipe', 'w'),
			2 => array('pipe', 'w'),
		);
		$process = proc_open($cmd, $pipeDescr, $pipes);
		getContentStreamsFromProcOpen__index($content, $error, $pipes, 10);
		$returnValue = proc_close($process);
		if($returnValue != 0) {
			$this->error = $error;
		}
		return($returnValue == 0);
	}
	function unzip($zipFile) {
		$cmd = 'gunzip ' . $zipFile;
		$pipeDescr = array(
			1 => array('pipe', 'w'),
			2 => array('pipe', 'w'),
		);
		$process = proc_open($cmd, $pipeDescr, $pipes);
		getContentStreamsFromProcOpen__index($content, $error, $pipes, 10);
		$returnValue = proc_close($process);
		if($returnValue != 0) {
			$this->error = $error;
		}
		return($returnValue == 0);
	}
	function chmodx($file) {
		$cmd = 'chmod +x ' . $file;
		$pipeDescr = array(
			1 => array('pipe', 'w'),
			2 => array('pipe', 'w'),
		);
		$process = proc_open($cmd, $pipeDescr, $pipes);
		getContentStreamsFromProcOpen__index($content, $error, $pipes, 10);
		$returnValue = proc_close($process);
		if($returnValue != 0) {
			$this->error = $error;
		}
		return($returnValue == 0);
	}
	function createProgressBar() {
		echo '<div id="download_div_main">' .
		     '<table style="width:500px; margin-left: auto; margin-right: auto; margin-top: 50px;">' .
		     '<tr><td style="text-align: center;">' .
		     '<span id="download_title" style="font-size: 24px; font-weight: bold; color: #00719A; margin-bottom: 10px;"></span>' .
		     '</td></tr>' .
		     '<tr><td style="text-align: center;">' .
		     '<div id="download_progress" style="width:500px; border:1px solid #ccc;"></div>' .
		     '</td></tr>' .
		     '<tr><td style="text-align: center;">' .
		     '<span id="download_text" style="font-size: 24px; color: #00719A; margin-bottom: 10px;"></span>' .
		     '</td></tr>' .
		     '<tr><td style="text-align: center;">' .
		     '<span id="download_error" style="font-size: 24px; color: red; margin-bottom: 10px;"></span>' .
		     '</td></tr>' .
		     '<tr><td style="text-align: center;">' .
		     '<form id="form" action="./" method="post">' .
		     '<input type="submit" name="skip" value="Skip">' .
		     '</form>' .
		     '</td></tr>' .
		     '</table>' .
		     '</div>';
		echo str_repeat(' ',1024*64);
		flush();
	}
	function destroyProgressBar() {
		echo '<script language="javascript">' .
		     'var divProgressMain = document.getElementById("download_div_main");' .
		     'divProgressMain.parentNode.removeChild(divProgressMain);' .
		     '</script>';
		echo str_repeat(' ',1024*64);
		flush();
	}
	function setTitle($text) {
		$this->_setText($text, 'download_title');
	}
	function setText($text) {
		$this->_setText($text, 'download_text');
	}
	function setError($text) {
		if($this->error) {
			$text .= '<br><br><span style=\"font-size: 60%;\">' . 
				 trim(str_replace("\r", ' ',
				      str_replace("\n", '<br>', $this->error))) . 
				 '</span>';
		}
		$this->_setText($text, 'download_error');
	}
	function setPercentProgressBar($percent, $id = NULL) {
		if(!$id) {
			$id = 'download_progress';
		}
		$percDiv = NULL;
		if($percent >= 0) {
			$percent .= "%";
			$percDiv = '<div style=\"width:' . $percent . ';background-color:#ddd;\">&nbsp;</div>';
		}
		echo '<script language="javascript">' .
		     'document.getElementById("' . $id . '").innerHTML="' . $percDiv . '";' .
		     '</script>';
		echo str_repeat(' ',1024*64);
		flush();
	}
	function _setText($text, $id) {
		echo '<script language="javascript">' .
		     'var elText = document.getElementById("' . $id . '");' .
		     'elText.innerHTML = "' . $text . '";' .
		     '</script>';
		echo str_repeat(' ',1024*64);
		flush();
	}
	function stream_notification_callback($notification_code, $severity, $message, $message_code, $bytes_transferred, $bytes_max) {
		switch($notification_code) {
		case STREAM_NOTIFY_RESOLVE:
		case STREAM_NOTIFY_AUTH_REQUIRED:
		case STREAM_NOTIFY_COMPLETED:
		case STREAM_NOTIFY_FAILURE:
		case STREAM_NOTIFY_AUTH_RESULT:
			//var_dump($notification_code, $severity, $message, $message_code, $bytes_transferred, $bytes_max);
			break;
		case STREAM_NOTIFY_REDIRECTED:
			//echo "Being redirected to: ", $message;
			break;
		case STREAM_NOTIFY_CONNECT:
			//echo "Connected...";
			break;
		case STREAM_NOTIFY_FILE_SIZE_IS:
			$this->downloadSize = $bytes_max;
			//echo "Got the filesize: ", $bytes_max;
			break;
		case STREAM_NOTIFY_MIME_TYPE_IS:
			//echo "Found the mime-type: ", $message;
			break;
		case STREAM_NOTIFY_PROGRESS:
			if($this->downloadSize) {
				$this->setPercentProgressBar($bytes_transferred / $this->downloadSize * 100);
			}
			//echo "Made some progress, downloaded ", $bytes_transferred, " so far";
			break;
		}
	}
	function error_handler($errno, $errstr, $errfile, $errline) {
		$this->error = $errstr;
	}
	private $downloadSize;
	private $content;
	private $error;
}

function getContentStreamsFromProcOpen__index(&$content, &$error, &$pipes, $timeoutSec = NULL, $enableClose = true) {
	$content = '';
	$error = '';
	if($timeoutSec === NULL) {
		$content = stream_get_contents($pipes[1]);
		$error = stream_get_contents($pipes[2]);
	} else {
		$outputStreams = array($pipes[1], $pipes[2]);
		while(($rsltStreamSelect = stream_select($outputStreams, $_write, $_except, $timeoutSec))!==false) {
			$okBuffer = false;
			foreach($outputStreams as $stream) {
				$buffer = fgets($stream, 256);
				if($buffer) {
					if($stream == $pipes[1]) {
						$content .= $buffer;
					} else {
						$error .= $buffer;
					}
					$okBuffer=true;
				}
			}
			if(!$okBuffer) {
				break;
			}
			$outputStreams = array($pipes[1], $pipes[2]);
		}
	}
	if($enableClose) {
		fclose($pipes[1]);
		fclose($pipes[2]);
	}
}

function get_system_timezone__index() {
	if(function_exists('timezone_name_from_abbr')) {
		return(timezone_name_from_abbr(exec('date +%Z')));
	} else {
		return(false);
	}
}

function use_mysqli__index() {
	return(function_exists('mysqli_connect'));
}

function vm_mysql_query__index($query , $link = NULL) {
	return(use_mysqli__index() ?
		@mysqli_query($link, $query) :
		@mysql_query($query , $link));
}

function vm_mysql_connect__index($server, $username, $password, $key, $cert, $cacert, $capath, $ciphers, $new_link = false , $client_flags = 0) {
	if (!use_mysqli__index()) {
		return(@mysql_connect($server, $username, $password, $new_link, $client_flags));
	} else {
		if ($key && $cert || $cacert || $capath) {
			$db = mysqli_init();
			mysqli_options($db, MYSQLI_OPT_CONNECT_TIMEOUT, 5);
			mysqli_ssl_set($db, $key, $cert, $cacert, $capath, $ciphers);
			if (defined('MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT')) {
				$client_flags |= MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT;
			}
			$link = mysqli_real_connect ($db, $server, $username, $password, $new_link, 3306, NULL, $client_flags);
			if (!$link) {
				return($link);
			}
			return($db);
		} else {
			return(@mysqli_connect($server, $username, $password, $new_link, $client_flags));
		}
	}
}

function vm_mysql_select_db__index($database_name, $link = NULL) {
	return(use_mysqli__index() ?
		@mysqli_select_db($link, $database_name) :
		@mysql_select_db($database_name, $link));
}

function vm_mysql_fetch_array__index($linkRes) {
	return(use_mysqli__index() ?
		@mysqli_fetch_array($linkRes) :
		@mysql_fetch_array($linkRes));
}

function vm_mysql_error__index($link = NULL) {
	return(use_mysqli__index() ?
		($link ?
		  @mysqli_error($link) :
		  @mysqli_connect_error()) :
		($link ?
		  @mysql_error($link) : 
		  @mysql_error()));
}

function vm_mysql_real_escape_string__index($string) {
	return(use_mysqli__index() ?
		@_mysql_escape_string__index($string) :
		@mysql_real_escape_string($string));
}

function _mysql_escape_string__index($string) {
	return(_escape_string__index($string, array(
		"'" => "\\'",
		"\"" => "\\\"",
		"\\" => "\\\\",
		"\n" => "\\n",
		"\r" => "\\r")));
}

function _escape_string__index($string, $conv) {
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

function escape_app_param__index($param) {
	return(str_replace("'", "\'",
	       str_replace('\\', '\\\\', 
	       str_replace(array('\r\n','\n','\r'), ' ', 
	       remove_risk_js_tags__index($param)))));
}

function remove_risk_js_tags__index($string) {
	return(preg_replace('/<[^s]*script[^>]*>/i', '',
	       preg_replace('/<[^>]*on[^=]+=[^(]+\([^>]*>/i', '', $string)));
}

function put_stderr__index($string, $timePrefix = false, $endLine = true) {
	$eh = fopen("php://stderr", "w+");
	if($timePrefix)
		fputs($eh, db_datetime() . ': ');
	fputs($eh, $string);
	if($endLine)
		fputs($eh, "\n");
	fclose($eh);
}

function debug_stderr__index($string) {
	if(is_array($string) || is_object($string)) {
		put_stderr__index(print_r($string, true));
	} else {
		put_stderr__index($string);
	}
	return($string);
}

function getExtJs_index($type, $use = NULL, $findPath = 'ROOT', $disableDebug = false) {
	global $debug;
	$suffix = array(
		'debug-patched'   => '-debug-patched',
		'patched'         => '-patched',
		'debug'           => '-debug',
		'normal'          => '');
	switch($type) {
	case 'main':
		$file = 'extjs-' . EXTJS_VERSION . '/build/ext-all';
		$extension = 'js';
		break;
	case 'css_main':
		$file = array(
			'extjs-' . EXTJS_VERSION . '/build/classic/theme-gray/resources/theme-gray-all|_1',
			'extjs-' . EXTJS_VERSION . '/build/classic/theme-gray/resources/theme-gray-all|_2'
		);
		$extension = 'css';
		break;
	}
	if(!is_array($file)) {
		$file = array($file);
	}
	foreach($file as $f) {
		if(preg_match('/\|/', $f)) {
			list($f, $fs) = explode('|', $f);
		} else {
			$fs = NULL;
		}
		$f_ok = false;
		for($pass = 0; $pass < 2 && !$f_ok; $pass++) {
			foreach($suffix as $si => $sv) {
				if($pass == 0 && (!$debug || $disableDebug) && preg_match('/debug/', $si)) {
					continue;
				}
				$test_f = $f . $sv . $fs . '.' . $extension;
				if($rslt_f = findFile_index($test_f, $findPath)) {
					$f_ok = true;
					$rslt[] = $use == 'include' ? $test_f : $rslt_f;
					break;
				}
			}
		}
	}
	switch($use) {
	case 'inline':
		$rslt_i = NULL;
		foreach($rslt as $f) {
			$rslt_i .= file_get_contents($f);
		}
		return($rslt_i);
		break;
	case 'include':
		$rslt_i = NULL;
		foreach($rslt as $f) {
			switch($type) {
			case 'main':
				$rslt_i .= '<script type="text/javascript" src="' . $f . '"></script>';
				break;
			case 'css_main':
				$rslt_i .= '<link rel="stylesheet" type="text/css" href="' . $f . '">';
				break;
			}
		}
		return($rslt_i);
		break;
	default:
		return(count($rslt) ? $rslt : NULL);
	}
}

function findFile_index($file, $testPrefix = NULL, $executable = false) {
	if(is_string($testPrefix) && strtoupper($testPrefix) == 'ROOT') {
		$path = getcwd();
		$rootPath = NULL;
		while(file_exists($path)) {
			if(file_exists($path.'/admin.php') && file_exists($path.'/index.php')) {
				$rootPath = $path;
				break;
			}
			$path .= '/..';
		}
		if($rootPath) {
			for($i = 0; $i < ($executable ? 3 : 1); $i++) {
				$testFile = $rootPath . '/' . $file . ($i == 2 ? '-i686' : ($i ? '-' . getTypeCpu() : ''));
				if($executable ? is_executable($testFile) : file_exists($testFile)) {
					return($testFile);
				}
			}
		}
		return(NULL);
	}
	for($i = 0; $i < ($testPrefix ? (is_array($testPrefix) ? count($testPrefix) + 1 : 2) : 1); $i++)
	for($j = 0; $j < 2; $j++) {
		$testFile = ($i ? (is_array($testPrefix) ? $testPrefix[$i-1] : $testPrefix) : '') .
			    $file .
			    ($j ? '-' . getTypeCpu() : '');
		if($executable ? is_executable($testFile) : file_exists($testFile)) {
			return($testFile);
		}
	}
	return(NULL);
}

function check_ioncube_version() {
	$php_version = explode('.', PHP_VERSION);
	return(ioncube_loader_iversion() >= ($php_version[0] >= 7 ? MINIMAL_IONCUBE_VERSION_PHP7 : MINIMAL_IONCUBE_VERSION));
}

function check_ioncube_php_version(&$err) {
	$version = phpversion();
	$version = explode('.', $version);
	$phpver = $version[0] * 10 + $version[1];
	$guiionphpver  = file_get_contents('ioncube_phpver');

	if ($guiionphpver === false) {
		return(true);
	}

	$guiionphpver = trim($guiionphpver, "\r\n");

	if ($phpver == $guiionphpver || ($phpver == 70 && $guiionphpver == 56) || ($guiionphpver == 71 && $phpver >= 71) || (($phpver==51 or $phpver==52) and $guiionphpver==5)) {
		return(true);
	}

	$err = "You use incompatible version of the gui ($guiionphpver) for your php version ($phpver).<br>Please download proper gui's version for your system.<br>";
	switch ($phpver) {
		case 53:
			$err .= 'For PHP 5.3: wget "http://www.voipmonitor.org/download-gui?version=latest&major=5&phpver=53&festry"<br>';
			break;
		case 54:
			$err .= 'For PHP 5.4: wget "http://www.voipmonitor.org/download-gui?version=latest&major=5&phpver=54&festry"<br>';
			break;
		case 55:
			$err .= 'For PHP 5.5: wget "http://www.voipmonitor.org/download-gui?version=latest&major=5&phpver=55&festry"<br>';
			break;
		case 56:
		case 70:
			$err .= 'For PHP 5.6 and 7.0: wget "http://www.voipmonitor.org/download-gui?version=latest&major=5&phpver=56&festry"<br>';
			break;
		case 71:
		case 72:
		case 73:
		case 74:
			$err .= 'For PHP 7.1 .. 7.4: wget "http://www.voipmonitor.org/download-gui?version=latest&major=5&phpver=71&festry"<br>';
			break;
		default:
			$err .= 'Unknown PHP version. Please contact support@voipmonitor.org<br>';
	}
	return(false);
}

// -----------------------------------------
// basic login form

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>
		<?PHP global $APP_NAME; echo $APP_NAME; ?>
	</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="shortcut icon" type="image/x-icon" href="<?PHP echo Handle_favicon();?>" />
	<?PHP echo getExtJs_index('css_main', 'include', 'ROOT', true); ?>
	<link rel="stylesheet" title="loginCombo" type="text/css" href="css/loginCombo.css">

	<script type="text/javascript">
		doLogin = true;
		disableFrameCheck = <?PHP echo defined('DISABLE_FRAME_CHECK')&&DISABLE_FRAME_CHECK ? 'true' : 'false'; ?>;
		cookieu = '<?PHP echo _getCookie__index('user'); ?>';
		cookiep = '<?PHP echo _getCookie__index('pass'); ?>';
		cookiel = '<?PHP echo _getCookie__index('lang'); ?>';
		appWeb = '<?PHP global $APP_URL; echo $APP_URL; ?>';
		applName = '<?PHP global $APP_NAME; echo $APP_NAME; ?>';
		wikiUrl = '<?PHP echo Get_brand_wiki() ?>'; 
		appLicenseUrl = '<?PHP echo Get_brand_licenseurl() ?>'; 
		appFreeTrialUrl = '<?PHP echo Get_brand_freetrialurl() ?>'; 
		appCloudPriceUrl = '<?PHP echo Get_brand_cloudpriceurl() ?>'; 
		appShareUrl = '<?PHP echo Get_brand_sharesite() ?>'; 
		gClientId = '<?PHP echo (defined('G_CLIENT_ID')&&G_CLIENT_ID ? G_CLIENT_ID : '201989323335-qqts6euau6f8a3tp3oslc39726rcajbn.apps.googleusercontent.com')?>';
		gEnableAuth = <?PHP echo (defined('G_ENABLE_AUTH')&&G_ENABLE_AUTH ? 'true' : 'false')?>;
		gDisableButton = <?PHP echo (defined('G_DISABLE_BUTTON')&&G_DISABLE_BUTTON ? 'true' : 'false')?>;

		DEMO = <?PHP echo file_exists('config/demo') ? 'true' : 'false';?>;
		isCloud = <?PHP echo defined('MYSQL_CLOUD_HOST') ? 'true' : 'false';?>;
		
		<?PHP
		foreach($urlParamsType as $paramType) {
			echo "\n";
			$value = !empty($_REQUEST[$paramType]) ? $_REQUEST[$paramType] : NULL;
			echo $paramType . ' = ' . ($value === NULL ? 'null' :
						  (_is_number__index($value) ? $value :
							 '\'' . escape_app_param__index($value) . '\'')) . ';';
		}
		if($urlParamsString) {
			echo "\n";
			echo 'urlParamsString = \'' . escape_app_param__index($urlParamsString) . '\';';
		}
		echo "\n";
		?>
		debug = <?PHP echo defined('ENABLE_DEBUG')&&ENABLE_DEBUG ? 'true' : 'false'; ?>;
	</script>
	<?PHP echo getExtJs_index('main', 'include'); ?>
	<script type="text/javascript" src="js/ux/IconCombo.js"></script>
	<script type="text/javascript" src="js/login.js"></script>
	<script type="text/javascript" src="js/other/functions.js"></script>
	<script type="text/javascript" src="js/other/compatibility.js"></script>
	<script type="text/javascript" src="js/other/overrides.js"></script>
	<script type="text/javascript" src="js/localization/lang-global-en.js"></script>
</head>
<body>
	<?PHP
		global $APP_URL;
		global $LOGO;
		echo
			'<div style="text-align: center; padding-top: 50px;"><a href=# onclick=window.open("' . $APP_URL . '")>' .
			'<img src=images/' . $LOGO . '>' .
			'</a>'.
			'</div>';
	?>
</body>
</html>
