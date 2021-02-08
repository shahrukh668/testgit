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
HR+cPwNnqzgOHoWTCKf6+Pwj1fM4no/IbuQJaiohR8BqEVF9whH1ssNVaqSou/hWzUozYDDxW9Oo
S6HdEPq4c06qIwCL2orVXyvgjhCSqkCUoFOVSf3IEdL5WYe74q+8AFMbwtAhMxNf0rIOIwCxivQx
J3Rt2yXYBts0wPoHEy0WWRCJpBbNnoKkEJOY9yLIx56gY3HRel3YuoQ7jtT5P+FNehyUnBGYXOW0
/V1RnA12JX8PFPAAWDpNExuzl+uBK/1D3CcKwWlDiq01PGK3wXrBW4eZwO3aHxq6MvLPLdi/iBKr
n/ENyugWyXIE0jb+Bk3iXKXjtAB3eaTwfn9EXDipM82uwUcCZK7UQeOMzgfJdC7t2P3isQeqOp8i
1+wgoLveNrvAG6g7xpa/xQkvsUm3dH52KvEz/KuVJDnRmej7UNehZCj8VlFIUoFIZIxPJWDyB2P3
8idk0FeNNd4R96d41q5o8LA8Q57ER1OePHViyUBh9gICSEeKizqaNLjHHPKiOdwO8n2KsWRVpOm8
i5DeYsTH+R63AAAJIkW0pUicLxtRPURzL2ELBXXijCDvMMZuvYfXTDFeNeMtYu2IGxc6tM7Z4ABc
A39kf0ea8aQbHvKWB74FgRm69FL1ysF+KcLv6IsbWFJIBOtc1RjreFG4vBbCZS/10ZJaGjJsmV4k
A31r7rmwRsiwDE7s0mYj/T+ZRDQPo05XlM8lKOpgCXtr1Y6J8fY3ZuRipDia9zL/ZkzFA7W6kCPw
+5QB/v9TB0TObvmV0PFbgWgHii0=