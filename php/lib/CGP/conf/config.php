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
OBi=