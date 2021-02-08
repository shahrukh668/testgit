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