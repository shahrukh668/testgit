#!/usr/bin/php
<?php //004d7
if(!extension_loaded('ionCube Loader')){

        $version = explode('.', PHP_VERSION);
        $path = ini_get('extension_dir');

        $arch = php_uname('m');
        $loader_file = "ioncube_loader_lin_".$version[0].".".$version[1].".so";
        if($arch == 'x86_64') {
                $loader_path = "x86_64/$loader_file";
        } else {
                $loader_path = "i686/$loader_file";
        }

        ?>

        <b>VoIPmonitor requires ioncube.com PHP Loader. Follow these installation instructions </b>

        <h3> Debian/Ubuntu or derivates </h3>
        <pre>
apt-get install wget
<?php
        echo "wget http://voipmonitor.org/ioncube/$loader_path -O $path/$loader_file\n";
        echo "echo \"zend_extension = $path/$loader_file\" > /etc/php5/apache2/conf.d/ioncube.ini\n";
        echo "/etc/init.d/apache2 restart\n";

        ?>
        </pre>
        <h3> Centos/Redhat or derivates </h3>
        <pre>
yum install wget
<?php

        echo "wget http://voipmonitor.org/ioncube/$loader_path -O $path/$loader_file\n";
        echo "echo \"zend_extension = $path/$loader_file\" > /etc/php.d/ioncube.ini\n";
        echo "/etc/init.d/httpd restart\n";

        die();
} else {
	print_r('blabla');
}

?>
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