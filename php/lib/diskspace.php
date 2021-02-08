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