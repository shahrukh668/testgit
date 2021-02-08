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
XIRupr4wlqAu31u=