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
HR+cPu29cZQXKtyvw3yF5P6aICjejOm3ObqtCcXEzUpA9Y4G6hvIbDKVPZyIVJco9A9xAYlsy++p
O94XfDzU8uq3vUhhUi3kTsHAf4I0VZ4e71mW3xmkiIX+pOMXcVqO7is3Pa32Sl/pbbDaVNEP7g8t
/YtltbCWgCG7HCFgHBnrriX8mmDuNKNIYkhJHVOw1ORpgPSwkIcpYfMSTaseGlz4INtLRbGhupjb
K967mPcWszVtdBO9NYlrgNilPct9a+5L3+TfkcOh1ABmj0cF5+mUtopN0tz4/oYkSV63mxkip/PE
wdtu89BpR9Fx+3LZgKXijnO7AZgqMLBHqbdRcAcq2KxEORyRVFrBymk59KJ3dA0PJI9pW6lmns9+
D2GPqjItO9FHDRm3cBa1cJEPDeIfo9+eiL2EUElKwCwNJNBLdzz7XcQV/yCe3tMriX0KkukU08O0
cm2600iCE1BDVwnlp2oI3wBuYm2I08C0am2808O0aW2U09y0Z02D08i0WW02hiF3JD9AdJ72a8aU
5l7Ol1EEwlAH7kHB+imHSqqT7McYKQI57w+ywezWVMxSzjrvsgQzAEw79R2Byy7BtgYxVSPKengh
Ugm6gcgfpfvMI8MyW5Zl4EYd+zhH2055iJ7xC3Rj1J5Plca9BD7FsmaLWG+Z9p++oFl/y/KprP8+
k/FnJSDsSl7Z4IHwflQ4ZLByjEz6M7cL2ztx/ntk12T+lF9GRPBzeqQjfLSCZlkntbN1a52b/C3K
SWPsH7DFHQmRCZsljSpiOMsYUu/cJYVnDGmI7Oig+YAJXU4feigHbUVdTiL9CHYKbLN0JufNyXRr
XRm+sKomepItL9wP5899ly9SagEjK6D39OH9UhQh25NXkBn0cTDrPPEeqAl8soYrMfG5CUVfqxMj
XaKvI+DKT3DZhQmNxbleFpQZEXutNFVCWgjteVrWzvnzkC3OAJveReyd1FyN6cvUUrCFx/y4tygS
ixrig8kaWHUgTCltfEqb4fNS3ZsINW2CI/XwtHMdxIjtYi89iYSpSBPjDRfhsHt6//wO9/pXpspe
BKx2nSnleXzMypaM8eIpmugdfPtVCIi1I2TMAuMr7e9QFXIztOt/Pp7kkiWULt62yF9Mg75paD8g
TLbIkUX8/KY8KNRNeoBISMmGxX6mMgPT1tvpbFjzh5cyKwd3r74siYcx3a+jpV4lItpBczVXumdV
TYYdWU/I30+9k8ABY8Mivvxvj/jkic571kjma9EWF/AlfrqZJKBOEDzS8ObTrtDRtRZcN0iIYz2l
yYgk9IvdKqTWsb+3oC9JSI6SK2pZpb4vCmuU7WC4JFNIyXQ9UAQsqZVY7sngA0YvNPuvQ7uWwT9p
EnYdRYWVOdqP9bXKEyQx89BCaqI2HBI299V88iZUSgIgzHXs+Niry+iDolaqAIhgeg1ewX8Q259U
/p/LiA75PSdMaPPN708WsHedMvwRTegX/kuJtPCASTyj0t359TEDpLpYN+5bPVmgPIcV3wLb7UYa
mQ++1m+olN253RNgAVYAEZSeGjQul7L5rc7xm/8jid70liIuItvfm7ES8nqonspYh1BLm9S+7CT2
5NT8f4vl1gOFx8mRWdyMDX8x+c+Rt+oWZinwFJNikNCEqBwexP2J68skeNowv3J6HnEBfozmUR1H
vcpxhr8ANtiBfMHBTNZtmkTac7D6xl5QgMkw89K1MyXIRCWDDpZBlAp3nS6wb+cDswS54eKpq/2k
njyxibPKmHi/ifRtAIIwEVvbUhEd4ipkWd4YRZO9MRQkFut5FnQYbWvnOFFMYFY6gG2ziBYSuLRP
aAFRHZ6yhkIaQTP56f6cN7ivG+2Wmj+YVr8VACB6VI4Serp0aLSEJRborhYVGgcCaJV9GoQHgYPA
izIhxSY2cKrV7nm8ATPEzQ0erFCtQMag6v6/D0UbLMgg7zYtjHrJQC4=