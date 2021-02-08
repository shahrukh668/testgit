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
ogjAIUiN