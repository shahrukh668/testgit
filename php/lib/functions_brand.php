<?PHP

if(file_exists('config/system_configuration.php')) {
        include_once('config/system_configuration.php');
}

function Handle_favicon() {
	if (defined('FAVICON')) {
		return(constant('FAVICON'));
	} else {
		return('/favicon.ico');
	}
}

function Get_brand_name() {
	if (defined('BRAND_NAME')) {
		return(constant('BRAND_NAME'));
	} else {
		return('VoIPmonitor');
	}
}
function Get_brand_url() {
	if (defined('BRAND_URL')) {
		return(constant('BRAND_URL'));
	} else {
		return('http://voipmonitor.org');
	}
}

function Get_brand_wiki() {
	if (defined('BRAND_WIKI')) {
		return(constant('BRAND_WIKI'));
	} else {
		return('http://www.voipmonitor.org/doc/');
	}
}

function Get_brand_sitename() {
	if (defined('BRAND_SITENAME')) {
		return(constant('BRAND_SITENAME'));
	} else {
		return('www.voipmonitor.org');
	}
}

function Get_brand_domain() {
	if (defined('BRAND_DOMAIN')) {
		return(constant('BRAND_DOMAIN'));
	} else {
		return('voipmonitor.org');
	}
}

function Get_brand_base() {
	if (defined('BRAND_BASE')) {
		return(constant('BRAND_BASE'));
	} else {
		return('voipmonitor');
	}
}

function Get_brand_dbname() {
	if (defined('BRAND_DBNAME')) {
		return(constant('BRAND_DBNAME'));
	} else {
		return('voipmonitor');
	}
}

function Get_brand_sniffername() {
	if (defined('SNIFFER_NAME')) {
		return(constant('SNIFFER_NAME'));
	} else if (defined('BRAND_SNIFFERNAME')) {
		return(constant('BRAND_SNIFFERNAME'));
	} else {
		return('voipmonitor');
	}
}

function Get_brand_download() {
	if (defined('DOWNLOAD_WEB')) {
		return(constant('DOWNLOAD_WEB'));
	} else if (defined('BRAND_DOWNLOAD')) {
		return(constant('BRAND_DOWNLOAD'));
	} else {
		return('http://download.voipmonitor.org');
	}
}

function Get_brand_get_licensekey_url() {
	if (defined('LICENSEKEY_URL')) {
		return(constant('LICENSEKEY_URL'));
	} else if (defined('BRAND_GETLICENSEKEY_URL')) {
		return(constant('BRAND_GETLICENSEKEY_URL'));
	} else {
		return('https://www.voipmonitor.org/getlicense');
	}
}

function Get_brand_sf_projectname() {
	if (defined('BRAND_SF_PROJECTNAME')) {
		return(constant('BRAND_SF_PROJECTNAME'));
	} else {
		return('voipmonitor');
	}
}

function Get_brand_guiname() {
	if (defined('BRAND_GUINAME')) {
		return(constant('BRAND_GUINAME'));
	} else {
		return('voipmonitor-gui');
	}
}

function Get_brand_sharesite() {
	if (defined('BRAND_SHARESITE')) {
		return(constant('BRAND_SHARESITE'));
	} else {
		return('share.voipmonitor.org');
	}
}

function Get_brand_licenseurl() {
	if (defined('BRAND_LICENSEURL')) {
		return(constant('BRAND_LICENSEURL'));
	} else {
		return('http://www.voipmonitor.org/licenses');
	}
}

function Get_brand_freetrialurl() {
	if (defined('BRAND_FREETRIALURL')) {
		return(constant('BRAND_FREETRIALURL'));
	} else {
		return('https://www.voipmonitor.org/getfreetrial');
	}
}

function Get_brand_cloudpriceurl() {
	if (defined('BRAND_CLOUDPRICEURL')) {
		return(constant('BRAND_CLOUDPRICEURL'));
	} else {
		return('https://www.voipmonitor.org/whmcs/cart.php?gid=2');
	}
}

function Get_brand_logo() {
	if (file_exists('images/logo-custom.png')) {
		return('logo-custom.png');
	} else if (defined('BRAND_LOGO')) {
		return(constant('BRAND_LOGO'));
	} else {
		return('logo.png');
	}
}

?>
