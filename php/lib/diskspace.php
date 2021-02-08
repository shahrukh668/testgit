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
/58D1cH6mXoFXvxNxQDRpwEa7jdU