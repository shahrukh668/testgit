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