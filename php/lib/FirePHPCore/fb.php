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
Uy91CGTKHSe3uXeOUMLxhWGutV6y4wGzfCAq