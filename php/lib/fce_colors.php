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
5bMvI0EVL+fOgAX1XKm/PES2YyhBcMgzwA//EQ8=