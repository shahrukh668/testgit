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
HR+cPtoLPDAdO5tcwYxnyMNUguIjv1Bu5A6IAIp54XnQkSKocPoLCRLfvyKYkp7TWZOUHtV1xZct
3XxuD0UN1fCEwLfyxW5icFGGS30/RBY5QDXJpsMWOQnnQyw6UtyAHIDSABjnvCYNuuGI4g3IOoQh
x7+phOsMWJWz44SVozBnM6Gmyw28tcXeEwxt5UbhyHwA4nC3qOwm41yVocCH9I0W8iW/IUmShgrX
K01izH/OjAxVGw6GlaLklJWhZxZ3ewXe26fhONOUG+cU73x4/UeCxI3Gpgs1iB5NhYzrkaYB3RCl
rydCby1KGWf8aq1RYAM7jXq+keEtABLUwsq5BXsh2RS4TwliCpHjFSn+4nAe00KUWsvO9fnWYOC5
+Kdm2J+KwpIa7nqDXbBKWs30HL8IEwoyJwQWbfSP33WJ0cfEGJbi0CfsJ9/uwX6BWOFG8unrKE1E
mZEBOXM5438tqjQxnVapFvAID2+lWYYBvlvkVEYqD4e5zjOTgYO9xUeU7LhSLWsqw3GxAs74FxaQ
0vi5K9L+n3OnfeJSkdJNMGt3JFIcOHk7xAI6Ka6OUsjLL3i0l+hf+j2ZYX6JIvb2wqdD0hNf9y15
jN9lzrUb7UVTL/TErtWsGG0CQ7UwHDvcrzLWOak26tWZBQF2wLdMWizIyReXulO+NmAhpvjj1dBb
XEf/0kb2et1ukbNV5K8xQKUYhTdJu8Ny5mMMbLF1Rq0ZqIdEbIFa44YWf4xhNubHWEH6PEs7P59u
DNoGH2NdX16d2a600BnFZlIz