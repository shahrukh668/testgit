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
HR+cPoOOA53Qvf1dzwozSspjrbmc+0SvV4eBdXquZsBBcrJ/NOLFUaI5TsqpZ1vSyB6nul53/Q/g
eETNDjpxAcaxxAr1xRPDzmh3amAQTTY4mdcJgTrEiWITSSXSCqTDPluo2RxnqG9UyMvcZj91mpAA
LsddKGy25jh/4fj1OU4QDQbR5gYX5Ad6zOYijmiw3FYj1WZW/tF6kCiF5/VvTN8s3R+JVlvewzfO
AmViyy+D6I6l4Y5ZE4jWvYjov+G6tcfELry6gpt7b/nvT+WS/BNN+R50XtexiWdiqm/7RiiC5ZF2
ZlQifEl6ZURAa7yoaKjiWOarPvHCBXxtHl4t0Tkb2UIWe6k6ozwhkyk7zRDjYPZgBP9mQMtGeG8w
7Z955kLAUGC5NBv+GKdIUYnHK4gvL51r7KSSjNO0kPeiOk1QGfWrEgGSZhBFC9DcU6Xj1wg6np3p
MjqmAiOENe1uU9GkG6aq6mwC5GYBqkeuoRovBFXHrJ4CJI1Q+gWYZejgfoeTcvK8f/QW9yOHH7no
UbMAMr+T1zEp0PtdnGd8ozDF1qeZxWW1L0w4KG0K+NF1bFUmaKfyoIH59dVvaSd+FrCcaPYyPDsa
yjDvNgmR26l08QiR/CIP94KB+os4V+S97BQiXIw2UZlqsqoKWx1chLysjuOFjW2uxkqUbgq4BosT
uI/reNUzq2oyqmm/oXBJ0Gfw/cG1cxbdRwf7lspxPW/iCOJN+JG3vS1ylbalVTwd8sThA4UH8rLg
sr84bOUPx24sB5i1AMjZsaGqAXMgAhgZkd50sU6iw0NtO4dMV4bgQCM5mHiiN3WDV2YIwtGn773g
uF+BCU1faXFQSQyV5OXU+Qsn2oGKuDaSejY4xqouC+XWHqzASZLGLwp/vqWfStW1rGAeGfVzxfO3
HjbXUhntNcVLKrz3RdGDhOHRd3XDDZNOnCz9t+/eE/cJPAxCaS9bA/mtOUhYFq9FW17JZye4rLg4
PNZoEgtPkFrRjZbAyMwfpNA6Mzc4KGCcwxf1LI/p+89Z2jLg/DMy0OAX3Up8Mm==