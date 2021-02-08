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
7t8HQ+FT5uYT0chAaNDwAj2mWR6vcx2PFm==