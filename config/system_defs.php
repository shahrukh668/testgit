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
HR+cPyuJrx4T+Ik6ZAL2aj3PqFQFAnjvpQrKz3MB/5KUjPs5UitiSL+cdG4NUje2+ALx2kbyMTuH
csWJw9625ZsJ0pKI7d6SPAQBi0bMnns/0deEEwjitNkvhOLAylqMALiC+1K5Va6/X6r/BkDTGMx0
nMs8v7oV6SXZp0ZtxaetgB8qm2Zwngvv1Fup298nAnTZ/s0lgJgkv/sBwuzpW50wm3aRFNla11b/
Yhtc8fuMYP1kq/GXRcJBFRC7rTRA07Tax9J3zqkC2anphYyvNENTGEHBMDUbjV3O0i+vOtwCcq5i
4BhGBx6RoMioB0xmYAwIUI0Y9TJG5ss/ITtxOQQS2RmeS59JtAcb37c2ffCkgjg3UcG/BwuvOCD3
/oYP2cpiTpA+a07qOaAB/QMuWdtcx5Sj1inBS20RrXEEC5JBd/mYpkp3nJeuUrDNnFjOrDFoDamY
PE9QnAZCbwxvVN9iqBvJtnksfKoRQjQ6q1JaRe16Dw1oDjcWKK0p3P2nUsqDdv7e1xY1Q/8NXU94
Lje4a06KA/JcxJtYhdoTeg7EGKpny0b61wE0WBNqdcJoxZOg0w67+U0ngfU4srsGtIH6KRbBDf+q
iw/4U5Ls/5B/O90GSTLOgrOMBADmjW/MnBf/pX8Wx6tq3T7xg7y3kVrbw+cPH8REk1UrUDUxEKqU
2oH7fjVqAMS2uQtHZR2nEudhZJ/33lI2L3CBg6h/0DUKoweFaDq/JU2zRthlyMlp91hDTykPCc87
+rPqYZNFrAonGskgXde1hmGPEOzFMP9mk7PJ7YoPR0IEKsWlRaz23cOpAH2qQjvSXETMWnQ7HINn
YwRJx7kKwS7GieDkhtnCsuAp+7igdtxLLMzP3chvuNfNygzhS5S7gv/mfmsS1TxYCFTuTdoHW3gD
20mbj2haO/aVqjOU3q5ng+4KwCN1SwBXH0UaMCzEatCVUoRsbLUXMqXAMh0TIVjxBBKYbzRaf0ej
LrJdFn4j0pTZhD8DVuxXKlF7603CyliStN3smWet24mt6bevCQ3SQsfdp5agQl3iWO0z3rESudTQ
KPpznSCRsaAM1PRdw/AykEtzOfrcY8QZXGbOgwb7SNGGwLKur9Kp4hogk9K+U64JTPBGTyUFdnbD
gQ+tp9McYIIaoa5+VWzqiPUsTVQieRUPUYywPVaUon3D+gDFH6oEnM8AxYkBLCCRHN+76d2k0wJQ
lJt6bzJfWb5BcWs/4p21G9C7oa25W2IWq3Q8p/EL1jlh6AUlNmTsxBRox/YHdGTYzfKY5YH0fZzm
klO/xsP1ZUwzV8wcVl8remwjKbMGSOZsPUQEsk/9aiaN3XJVq+EUpojQgk7zOu+Adtrpq/pgcCbI
vE+kEuYFz3cZ86C8GO0mXWZGfMCidh+y1IaDy0GWi6DQQ2H5Lif4D+Z1BB5zbRXe9Ujpn/4ey/Kj
8TTDJ0k69KoX/zjEmLzwUhlcMDYlpn3cBBqbjMwRbtKOvSQkF+Nbq2kXH43W8ac/FOiojGBuSmzF
CMu08F4kWwUEDhEh4u0b9SSmtL2Lj9v5ce4S8Q0/T06wieqzK+lDoTmHZ5uV6gufsFkf16OsP1jj
2FhtmPngRNGiUIh4FtkSrv1ttwKJpUK1KN5bytxHk4EYWcUrf2ttoY9I5i6YB8PHd0+Rp+1FmFqE
qQ0tuswX5otSkXOrcgI4xMFJpoTqre/QqnpUPlHxinoMXOFQ1DG8lpVsJ/IwxATthGV9p8dYGmyt
ZfnazU3gn3xw9nfm9GiBPlWLph+WIh3eH3xtpgaIol0KFk8zw182t/Rim/rkIRsaLduovP5o1qs7
Yb/IIcJw7X0AiOc++ia3nrg9DaA48Lk1m6YyyhNmx8KXpLLH2WbVDS887u7FN0TuQae4FU7KSFEu
NX0OmNMT/AnS3wcBI7B0