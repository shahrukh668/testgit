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
NSvuWGSMWp7olb0IbKW=