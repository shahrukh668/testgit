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
IRgwrcIekRZZ3G==