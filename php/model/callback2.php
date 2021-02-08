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
HR+cPofTZawsf79X6+aRRSruHycn7j7dTqxiXT1lJ0p4Thy2sPi9UnQKiaMt7eLRxEplCgcpeZIu
JWip53AJzukvb2XSWqXbmlq7b+/NNQFRMhPtJmP14Dz/80W8NemtGSGzmbvEBKeIX73pS08L0hh4
xwN9Ztf6bHq6sl3E8sNi++YH5E6V6s60X87tdtmKS80mO1BT0TBaIFvCuutjw8tf1fF95jZj+6Ak
fLzxrNTO9E1YjeCNQfSD6+Yr/MmdBECV0odqTXe47ztou2pgeurs5iKNfhhXUR7uH47YchXMu/Da
Ju8QQ4Vsb5CXeVpiz1louytO2rPAWydB/PkH8dvqk+KpLVlcKkDprOO/zQrMAmKwgzaMq/dt0YZ/
UIe5V0EVyyz8YntmCmtxpOZ4WAVsaDY3yUJE+4afiaVf1gtb0zHwdxXeeE50Bz5jSn44PuLJhVGi
Xf3Mx1K4YD13iiU7GgnAY9S8SvLGEQbm0uw4wHv6hzrW1wgnFTXvLeTFwD1oKG1+LwQ/XLvhHJhw
hLFWEejL0hH+Tgp1nYiI1HVsEXp3bml283CDkQap1fYPTMuGmKgfC+GGJcc85rByRJZ8ss8Lm1aO
d8LvpG5d2U9xRYQgC3w9ULCI8Ao5/VkXbvENGpS2HJe7yOQe/Rh9IaSsU2lHYlHPnaMxMo4F0Phh
IhNmoOfY+Q1Lw/ZAW5Qp0oq5uIv7MvUz0YoiO//pUp5FzKVZZiB/H2SRHYHle8AF/8HnEMPCPZd7
sa8Cbjd4jDisqzluy+O9WhSqf090dFlBBg5MoXwaemXi+2MNvM92Se0rfK50Cr2HL6wirKQRQwwE
f+jZwp51kT6u1gP39aHccFpA5HmQiSeqCT5ZCkNTs8g0cHnL6lHGAnyhhLDWbOJf8r1TT1fqGPwf
MhXLTmUwOROLs0raMJ6UDxbnwMblgPTUz6XuCf+Cg7GRrSsvMpAlCVL4D+hs+Th890WkQm8VX4Ju
GF0d6ubQgmXov+BP3nq1FxVfntteg47dmOxdCIUizvN4qCkPw/CABV7Uu/2Yjwz7MW4IYNRJx/HA
pp2KqFgsO4VM/CDJ8OFq5rVBt0agN3a7ePpgwFDPzS4CTpzmbt15AKpB59FRa5cYOITNxlstZgCp
w/Vo9Rn+TFNZkW6HsHdAXjm+sP/RMxn16s0VYKFCY9yJYV/5MuhuVGkkHqVl7tYkrQTheDJ7l1ky
L2mXNKSh+EWt8iqEQFndhg91VpKw+qCMW+aNS1jyiuymoOju54wGPMDgc3/hRb1DTzvj/Xe/7Xax
qZ7MifCxXwRmunQZAUP7Kkp35nHmYJTClKjvFtF+bt3T9wqwUgjDPpZ7