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