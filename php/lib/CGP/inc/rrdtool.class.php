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
9WHGvYEr6leqp2LpnQskBz4p