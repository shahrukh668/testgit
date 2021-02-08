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