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
iNLaZTy=