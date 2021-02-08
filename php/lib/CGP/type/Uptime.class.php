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
+2QfCDj9vZ6RNtjHgzC14kS=