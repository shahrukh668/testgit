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
HR+cPtdAAmbN4v0kUd++AXUSrUqnJ0H/dJHUrVD5e8Jg8KMrmbQm3bLadIsruhqzwpl7ncE6+z98
q8EmQE+QZzixvMfN2ITuK+dsRB9dZqT8jaYI2yCSw85vHNZxGuk/JwzOYQOsRkomM2afDW9OV75d
GP5m0Fga0PkeDzNVuIE6QX8s9OwWMVR2HnIHDdoRqikCtTvErOpOET87AFGTgK8xRnHDXtfgSNZE
iN9pE9RlluwsgwbpTVpZ69GasjMEYNJwOkm/RDcc1+H00vmxProtsyBCWA2QTaFcNw0dpcicmew3
jIlA0b4wtN2OOzzg4xfpFZjWEizxBuzjlqdT+s6cl2XmKbFSgQKCc8CuEYDuWV2CQ6vFdda096Qz
LeW1VYqGdXxImWxVSN02AnElLAaKXFhhZVu/J1isp0WYOc0HxgYDP2E6+TA6a+zXhqwmE/+PgTTS
U330v+s0PJeGz9pqn0+vVYLTVtNheGcNAtHaDOxFH0iCSVgFXhyFcwMPKA5Nfwxnkr7YOIMbPN/G
jkUOZrmvW25Va8GvKillFP9FKcZYevQj34PBrMDdNW6oayY4Gt3vYwYrucsbVf9CW444kYwtsulC
dcsyFXKAuKCN9FxpP/6qGEAJXlbv4Nbwsa8hKluk0dPpbr87OoXWcNrgBp//Ykx7NpfvuDxB3yZv
D4yt7QeLyRdM/jQ1JiWU+bSYv9f0Z781x53AxCuwy6CzIsHdsG+WUFAcQS1mBzVoZ709BYaVj77H
Ydb452LKQHvwc8nfhJZGbtz/E6I7ovNsiEaix4PPw4LHSXxfN4t8V/oiDA/XSUBhBTsNqy8UandQ
TmzU4n7FI+mb4UJKAEEozJlemIy3Yqy3cXkPno7pgY3TiJvlRB6GnfCdECFLzoN0RCyubzTvp90l
MbVEHVYwxjYfQymq2qFt58FMMAtFv95xfND79DWTVP+fyDpmIxOBAHyQvwa6iFVxhtanMUAveiPh
R1KhdILOqBoKRKT1D8gxHAD8WrxKRvo6uB1rjQPekpBIdOEJ07aPRQ4vOrnOaZvZAHdR6xKVCndQ
cJP+m2vbtLCg/oR/7k6D99eYZtbyNxFraWJeRJ3ZxfkKVv1nwwGKXCj2YdKFArE6esiRpaClTcdD
FYI3uOLwSCHZ8nzvo2cU9yN5zl5SSN/D21fQ6vkeOiGEhM7hiOldHHT2AdQqkfi0b9u9a8dAUVUG
Z/mH2L/pRP4WFn533a5gPGiFe7I399Q1kYNRQmqF/g/PPAwlJQ06oBVZmxW/YJR4hNCgYyooUKs+
T1GOjrjjtYciEovzYg3QCA2MADCP+E/48laZnf7rK+xqMGUvIafxYw62kZRfUHtTLFUBb2hMY8TR
R+VjAs6EStDalN5jkE2c0gcfXNPOTXypPdyv3vJ5I8NSQc3QQtYpQ3R6vvTuM0smzZWY8sATBPEo
7D0EHwYgQc9/a44cWDpmx7BsqaLOsF057eshfOdH2P3lV544slOzAjDClBqdtJxj6Q0p/tkWFNuD
qWYMsNm/4Wdl+5GpzRFX9ng71xNStpF7crxPuOALsTA1tClu84dOSsNWJL3mHfY3Uc+CUAEnkRnb
jOuIZ/jNDuilCJCSNFl0LJABvZ6hHPVdcK1OZtye1EAQTuGoabtUkKq6l9YzeKE+2+9vD0==