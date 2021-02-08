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