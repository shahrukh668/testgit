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
HR+cPto8jvr5KGpIH3qYlkNiTbmnIvu3hmvgyzW03qM3YPLuuzgBnm4sryu162uFpF3c44F5O7h+
OXGKyUK7beEC5Wypm8CdVf/v/EylBXb3D/7pWhc3Oaf8DGEqnLNzcQmFJDv3Wn5PNDP8UY/nKtZb
qYVi4Aw7MOeLDyA01oRt1fAVDRR0o09GPjuf0IzJWRmCgVaipxfhBeY/bM2CC8AA4C+9N5o86F9+
AG8ZLDghjsrzj63wfq2lA0bPLQYA4LovMQGPkWsktwoJEXzQi7UHRNv6fcqd86umGfZIQG0qs+BM
mEgpcB8vvClIBfWOkwBpBR07Vfqvxlzwfn9EXDipM8q8WBZfwOoDGTx4ViDrpQNhiWMTc8EvUfQa
SVyi0lQS4rhJQkcPV6bg2Rns02+YuBq3MtRgGfVaPLRvdphOzgyDFKxMldZwVs3r9FkEWvEGg6eg
woOxs1o10PBqjR9Wwp6XWYTG8ADUGbggWjosLwZ73qb6eNhONd9v4iNu/Pk4DhBA4ZWbZtVssOSa
mkw82euJ9vJsvOagZrMzJ31ExBTgzCnnfZOr+bGaYIcvWmnbqLYUASSn+eBlYFjE1hReXTCaqoKK
vZj/4jlXACF9Ipx6GmtUJ/FdlcvrbMie8gWfV9QRdV+YKnO5IVRw6tqzXrE3Pqucty3O5FXEloDz
j+zpUNsPWyuYh5G6JyzLcvtQ9cC1hv5Mva3v8daABReefQQdI7N/1EluIG0PU5VFlxAY9Ad5UDvY
l0FaTCDR19R+LzaNyY1CSufZvuh/Mn0vCN3R93fYtsZZMA7thvy8ctybm8e5X7fsNzE+YixoyHVf
RnhMIk3XwmC998slFf4DS27rPzqvWTVsHoR24VA1KORMRynSBgPkAfyvEDMFc9Efh8BpCGBbPyx1
BPEo+1k2UtXAHeGxFXviiKkYR45Vt0/elJRqjh7xa4yCUU1ytyn1rL22j9qYQn2uMKbdsSODbTRB
vUYZuJzjtgy+fO/O2OkZ5YMtoaJbDTWb/pYZyd/FfjWv7U9KdyONihie9fcTiFa3ajDxWsf/4xfQ
Vi03XJid7sR/eR7WT0HqHRnH1voJsuu+Jbv7C2OP2mv417aBPszt7+OkCAFDsc0nYOTb9iI46dE7
MeFpWLfVe5C+HxPnDwN0kjcWYSzVIyPIY+KVGmW8Z6chQv/KwoHx7xtxqFqbtJsDVtOhWc5ld3x2
SK3HLvGXoBufTkbBtVxuaoiXWcZIY2/qigng39DjwpB9XOprz/C/jZrbMYz/T0TGYKRysfX+gxAs
3y8ErbO72clsdUAzBLFDUJKwkcX/qC2wtc33LdaIo4eY0vgdsKukFw1Lti3ribgZUnt966uHs7Zz
oYdsQcaRrGKvsEclFNxs3C//9BsB7MRLF+50r/TiZStl07zyFMVevGss4Ij0nrlF1f4cOdUSZR66
EQyspBSJto4qCjZYK8vueZV09gUuTcZ/UzA+8ocGERPk55aHU5Ewjn+DNkg6iwJJpE2vjUFL8ZGm
y2sV7CAeR0VidKM5hI5WE1zBqZd4wiTqkMqQdUSI2YDmY4HYOA1v5D+I2cClz7ER4N0Wjss7d3He
NRXDje7ys3Q1WjwhBEbummSNzmjerV+ApUuR3lMp9dqnfqI3c6CHPTWMxX4Ai7QpXdfEsLjDWvQW
LUKbNW==