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
HR+cP/rHjDxMlWmH++GX/PF+lw8fFq9vvfX0R3CiyPphpihm8CMpPUtN1tsveyuCknqx8p79O8ly
ko++oUazvu1qWITB/hQzz2Ea1JdnGm98C/Pcu31W5bQyTDEwxgwDTw+MKsPW+XmZ+lHnzTAT4luT
oKrgZWHuYsHQN/qippqic6wORNAgQpUZjVOsB7vrC2UPy2HzajmkGUiLkk4Nt49TCgttpD+EvH95
H7MLrSiUtKFX69gaSggUPPpvUSNhmQ4KswcBtuF9//UkRCtVradB6RzLK08zFupGhQskIny/Idy3
Vpf+Ha5CTHF60s7ZyA3ql3+BfURQ+RLUwsq5BXsE2RS4TwliCpHjFTsABex7tPgIujsvpboGTmH8
/zNk7s4QaA89oYBB5Rr3RcuD1olo9RUyxGOwRFVoHPRVLuW9lJLC9RqebhoO/lMGcgb6uZvjRqCA
0vJWKOEph5nma2u39lKYmZCqbQyRc26c2TTMhQvs//RcCosy+T6KSsnlNtY9APIb+AdjBrWI6qkf
reX/Rk0CL7iFq3uxFociJapMqsiQdCu6aWXDyoPlcdNBMIv/5GGLWuELslsfwmQsW/DUNzeqxkKN
2k3PyGcXTvwiVNroCavHiq9HbsPTTfBcXNbjyv4BT1yiN370d9WjH637UZ9CyCnp1TYdi28+QMCc
UODHFQdwPK8UbtaoXAetMRT3A8zh0NX1DN67X0542RlZ62ZK9lzL8bvS+UR7eObfViuBxjKW49G5
hRJJ9yE/APceGy7Lnh3nP0gS9g5VV724S4mm2FSlMZEgV8fj6rgSPQk1L3vi1yhXKEjEQgQw7XmL
FKjE+IRjskuiTVXz+0ZGAuK9r/VULZMdIDSZb1DLi/eeLfvxZYWFP32MHrJDKnUrJJ0fdCyo6jCQ
3mYRaNJioFs42LR8IcTei55BwMGBquNHGsmQhZggvgZXwyFhCNvvdX9GAZ2ayJYW1nqk2B/FSDKO
TLDi5CHSTZ6vGSjON0HlWtwimU1FH+hNvIId5v1fE286Hv3mt4cIl36edako0ZGHflt3SIDJrIc8
rBbUC8NqAVncNV+NZ/fnZMN0Mf5MgPyHmqCpQoadY5qOv6BPqzh2wgc3TvRrekgQvoFFMptmM2hx
W6TI2su5rqfAUyNuEp5QUNqkQCPAG1omBdOrECf8IgSCIhKW4BgrbS2IT8s4qqNUubElGHmPadIA
OaZPXgfIKQjn5/kAT7OG7YBiYUqKQG7WDrK5VTlag/1BeCH0GQhgFOhXumY33PsYy+liYQUx+8IF
JfnSc6MnvtYjum5VAM4WPfzwOi7DsCKcIj6MbYPZDDamWadhNeSvJ6SpbYa4by+MZLLKZPKiMPHA
nC8K1V2e9mqifJ5ibXia7NaG76DKnWzInIdqB/gNZHrGwL2PatXDhLkaPqrW6Bci/M4/9PhQp/ll
iG49kXIdQcDFV7qZMEo21/9W97Gp3LBtoTSHDm7pIhHP9AJUckrEy4tiM5cGJZPK5OZz3zy26L8w
fTQJXsPj8ndoF+a7XAD+ncFNRVPFRdQU2Xz3D+B0ywSwD2u3BVYjgx0GfA9xdlp4r0Js7UyfS1P0
iDvRIRdgO1nLfgEEoFnsfOe1/hx7K4+VKmbtnPxrHJ/u7LfouNuaisNYkqV9+MC=