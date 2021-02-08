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
HR+cPzCDylVYryRuhxjdr56uO7wiVedIT0xXnVU2BkbedVeOWMdTg/fnkYlF3hOL6EC9aMvh2EOF
ocbTpWJSwf+hWfWotYvcVFlKgr10hLvabgUJATH89xdzkfpztl6EWj8lFcTgJtTkk0ZgGNs9dE0A
WChc2mHzEqbTkCUnFeKLaCDRYgnYedIf3lCJlfdDeZb+fvuehaZ0Kq9j6unjYhPfZbEDb2uS/jAm
jArI+Qz0VxRH43QOd01ZQerltngY36NhKbP0yYJ+sxVWbeCWsZr2h5V1Ay9kRosbIVkY+/tIuS+A
pvjW3UpvQ58lfOEOsH2yS+8/VWsqdri2LAHBIZHf1KnQ/WvyrBv79ugzSJIAkNRiQLank4f5mdB/
xxuYzn/H3ToQy0JEI1wtO9oXe1yID7hsynIqI3GpDCYmRh1hYlFycvla0rClIS644+vpOlNoDygs
Q4fcgAD7xm8vy++PC08xRO1sAI5xmQOzQUxFXkoXgU/7Eyr4XidMAX8LE0sd+jcX/29CWVkqxXal
1oY1n15Kvo/v1mQtqTDdDGszVzT+kqS2s0WbOsCGC3y7ufMpknBLRjIT9iVbR73W+czI0zK+B136
ueVgOAEC8fhb3pP0GEFWVel7ARHZdDuk86n94rcPwXIkM13tswZn42Rjo/dcaxEqLmHr1LkanwWD
xOgV/crWE1mZ24S+B+Vw4+LzX4if0ZVrzTVFAyhFsqo7l0GVI09ZNGIjhoXQNrIt37ndHQZadGq8
mdo2PUStkdmc6ukdUYpNaGYMp3yBpxx++Pv0YCAHqShTQP27mjhKD1DVEVl3Xd8XnfJUdddj6bHj
jT4S0/7iJ42+o4s3y+00qmMZSvvSYq3397q/RZJY9hgWY96DRxxj9NekOI/oioftiunesmD/DUtQ
Aqz3Ld2BCsbcfCaFH09xp+tCpJHCa5m78OxMOnrYaJqvATCttJNlZsJjlwNIwnCzKHT8e51G8nKR
VZzCYtvODEIZqi+7jLLQN/74FKWNJuar+r0ICttm6VL2rGljNd8aPLm2T1wNZt3JbC1hOWfh0mLe
58nC1qIfYASUiEgCDdS5X0lDkgsNH6mcOsihrE54ggCf3AP6Y7ry9TXWCNGwJejEsU1db2I2wUUI
G8lydyACApxAjSnrW6pSQJ0Mr5tYJgjv+lFE9nP/742wOJzi4h0HJeJxThf8xlMkhwdIJ2hi9GTX
B/wh77Q06wmRab9WKJk87jLIrQvFJ5dyxbCC5H2x+BknPYVFP83edbAeqFfuedNsc5gDJtvVNjQR
0lngyEZym4iModLDm9wmw1waK2oZrEqwhst1q9+INkvh7Mau8B9z3QrOwNKHunXCc1YUaW/KQ9HJ
+87NOOlFSD/I2IJb1j5JQsWNA2P3+fEX5/TisOth+bKh1085WTNQkoN5ip/q5onVrY/KMz+cg6+K
fPYsoOd2n4m1ZuZxvgeANw/PcvKIPt9ODLpurvS8U7qrAhgXVUmOw7jjPdJk2XweurG8TynGNxxV
I29J/siv4xcJa+Ejb6RHobZD+F2kGUffk8t8aswz1LpRqH0SKW1Mh0CkgGFD0FI8Gtqgm8XGVrec
GD+AYiDhRazZy2RsCOmQn3Ii2sERN2x8nudTiZ6LxnpK+yZh4TVD8vS3ga23ETKIhtPkIq7FUkr5
mtMpsNHqvhFcKAg5lsevwrgbxGj7+PzMIQnZ16RO+Yw+eAKvLIxa5qAD6jXpZlohfWaSHgW/gTtq
DoJh3E6XtC48WuknuE4YI0I050vlY4qNQU7b3eCqzP2PZmYleTT/dxwV2Zt3gOBXJM1OfZft63fb
Kxu5943WoKCSERTcZV9F/OqkpFbl5VmjBAJwggxIQhVE2TylDJ/roO/6614+oU5X7ES1jiU37mJ6
Q/SHxBONUZ5ss4mJ5Q5jtBGuFMfO