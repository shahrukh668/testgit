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
HR+cPsGYGSGK2BhhjPRKvq6LfoRcVhPbecfCY3rIOj/Ww2vc7rMGMh2GbOvfr1LRhhLMdEc3E5T0
tZNbEafEE6IR4DpWTFJTU8VTWietqRlEZMlVnZOWInSqdNSOxnyDdeUhwxFugRo7KCAPdIbN9BzH
Wxe7dHCkVTXlc+FIY5rbZtsycfvqeTtxbidwujp2GPgiHh2IAgGWO8I2+DgxAdsQu4j57j5BwEFQ
zZiZd2QALs/yEZ2yUe/EWh0wYQpRR2LjL2K5ltUCPTCe0Hd3lkT4xXy6hJL10mGdD9hTf/SOJpOE
tikOFpx+fhxYEuB/U1v4M2CVBFs3sUMOzlvVQ22a2NxdK8OTAiKbaOw6nCXqKS0LE4PXuBfAsg9w
/oga3U5oEErMiYGxeXmlzPDNXRJcf6UvkLznqmv0UOl9WVrTu7gCfjMwbz9I94boTIyY2f4NI9+O
ZNH4+JLjunJ5Ycks/4vKPhpy1U7vi+mw8CJUk0RJMAGthwORHVl0Rx2IGS9fmzVG4pQ6IEE7lQ84
aRqPSeuDnXGlDw41Lckl1O/wnZAZkSEm8/afofkzARbGkNrgMmITjTKRslddpc+0dcGeNgVoKdx/
hRy5GzFObjs12Uaq17DVV9y+Q2wgsVmEBYQbIw9W4LreN3wBUVauiYqMGdPnA/WWEqITj3HaXCfv
ESBJvkf6fUt06TPfNObaT8pHep390WeYbs5ns7oJ9QzmJ55DXrxHX3b+dEBaY9xuppVGgNdYQaM0
0FyqtDya3vT1UcGGAsV63fbn8KgFmKsSn6YfLTRIP+33pkjQZdjdhW9KH4ESsgfrH1Gx3OXjZets
B6eXHweTk6p7qCP7Xp2yNuIuGGsj82RBr5S9Oi4SqQJKTTmJWQikEszXoulsHu11ybEnE8duee8i
yZjyHcrZdEnYM6Y/q+FvvuDvgp0Xobyo3jV87aIRtQ8W69IBEPADa25y+8/UFXqmYnyuhcRZMAYV
sr8RHBMfKkNgsARTtP3/JO0WTe5sqZ523QKYhhgGKcWZm+L6AXORcOc+g/XhX0==