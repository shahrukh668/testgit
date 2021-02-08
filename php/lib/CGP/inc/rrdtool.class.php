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