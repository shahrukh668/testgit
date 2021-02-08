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
HR+cPm4+6e7T1FynjioAZw9bg824UAPBv8blizKMg6LoSyabLzivCsPVFUmm9KJX0qSxfjiAKbY2
l72hIMppcDmScQSTImGE2gVuqsbIq3Cr1bQGhvcAbKkNJ2TbwE4MOfe1gKO5hv250SnaMn9gzptx
A3VZ6x6Mc/NbNZglg1i3tph4rozTBFTHGWLh8tnWPj64ACo/kGEaXD9zhum7pmScY+gQKsryBhzz
oR+KP5xgQQFBMh+GgvQ9PmEXG4jxPwxysOi+cizTppWnam+AlH5uiw07afFJAGy4wv4gZA7VAgJk
08PwMkjAPaJqWK/639+H0+RZECpoCbGWeifphj768/kRELWzGQI6YLZ+7801JwZ827amt+DeiDdA
WbJP78tfAl5yu/EMFxnV7ghWASpldg/Tl4sV7gU+fGrqQuTg7Uifmtdq7VxvjlYfL8dAISnOLUE/
xXCwOW0Upxt3CwqgI4pjfS2EdmSRp0zc18Jcc8HUplSPbzbTFdoch82ZDGYazteqLxlTKNeAAVNM
0d39U/Br+FVJO7mEuaiokx5nnxZjqHXUDpkkMtWfi6ktj6q6J0shKz16nF190CXqgSa2VtFPU6BS
IMQov8xHg0G0CrzcDA41ucg3H7b9JoO7X/pYXrbGOzi3CQqWyhBE/to99cVSDHyAqPIfFINkONgG
tJQ2X9/QxHxHixvC5sgdfHestU2mL1B1IaJ7J1NxGUJp5x5CnYjd1iq9Rn2953fMXWNhYgs5kSGa
VfqY60P9S3lf9UA33tRf4nZxHUB3XE5FlKu2cEfS5Gwc7Ahf/IuxrnGigGaeLbT+D753gZd7T7D3
pbSzkqRUM1j4X2TVCAgYmlSGWLdqv7k6a3IBFZJNMxL8dn1wKBnam1+2rl65gERoPx4GP0PqA7QR
noh9VsJ6l0a2Z8bCtCfejQrNpLW6KpwELfRkVW6PnqEpZAaQsfe3aQINEruvL1/ysnGChvboEFY6
Lt6kmtkHAx2AvKAi0fX80ZhBQ7XZj26Z51KcYLY4960OJSS2rLgzm28CGqggeYBoaTS=