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
IxvhVOcy