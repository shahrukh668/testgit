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
HR+cPwNcNqUICAHeFrtAP98nT/qvwlruyQysvLNtR4MJB+mHMSU5p7hv+dbsiQlG3Irtk57xMYD3
q4PwIclWQx3VoxChzSOWoLjjK+0m83N0S9J2UftODqCCBGFQpoMSXey6LhUa7pE+wZD1VXLopkIA
NkigkEgBrJFCyoUCRGbum4q8qKBypYySPVvEAsqnkhSSk/MpqfpRb2gXCBz27GW9TmzCYwaXNFqK
Mls75e7Ax0J3CAHRN3ttG4l0k6CsoTOl0hBZ3VYmzFKTkde69D4Z3TnG7u7bP3YmT4IOEOfarw/6
L+d72RS3v7oYIOcqrmFxO6pbJMD01UP4F+QyY9AK2GDM85o/Ne6H2/w21QmuzaXWGHnchD+P6mDn
/mefyiq3V7bhOuA6ver+9o3FozmMhRfiPO9qKdJxqk6Qda5jjtN4tKu8JTGYpXJPcuMUQJeJ5Ii3
OuQg+U4x+HW7m2vKJQA3400PW1vNEGnJO4DmXhB+yQ1Pdqb6psAUaVkfyBOW0WTrEuPl3AYE8tuQ
En8Ude9ythsSBqysgwFycygFQ6XaAg+PCxnohmefHUe0f+mW57aTGLK3a0n6da+Z6F0hWmo05QcW
k+PzTH62DVhp8PZzjVl2j5Dlhyu2ndGgichIU6CCOinUWSXI7EchTbAaZQU5bb8wlkRsG1VqdM6r
PDgMmkBvT8jvLj1R4mnd0HqfzWN3yjrCPCh8Rciaq7Fr11dpysKFE7IpgDsxh/USeQP9uYrPjMPi
nbEG45J0vKMOk9cFKEm=