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
HR+cPmoKlJeBVWOzXYGe6VFG+02+kNVWC3qeLN/egz0KNhZgoD4L8Ip+7UmXbtq9qSx3v37zbVn6
10YRt6sjk6pm0qU5KaakX2WT9x5D19WsTVe9Dxt/AmZtFXHHBAqVSEYQhphfHGDI5ieYNMJpgVoB
l4C/vBmLmc2FHXEzHOp02jH280yVEa8RQzkGQ3GmYkPExInxPftbjkPFW++IHLSqwtCxjPeoLyIw
4NMVa5tYnSZ8IUtqNYnoYgXZbdJ/eV2dO3tOrJZHFT9h5AwHuFeIaGJtGzLPlg2qIHsbywRBqlAk
LgAw3dZ7y8eOHR8IwZFVw4kRigSMmLBHqbdRcAcT2KxEORyRVFrByvs4bZYQ8ZHWOna8dvkWFyCq
/gzqeCgsWl6GjWPTLu+RQxdA3a011N6czEId6CWEtFP9f77qqwTUrOODlUheDXj5rsw1OoJZ5yiz
EUl28o3jPldD1phNJo8q+kb8/Rb8pGbnImORjtybLgk9ww0aw7xJnQYQfQNmkWmK5i62C1zCsPb5
/QUtgeXuIhoQOt293F4gW6iD9TBH0NlRaSDjHPF8JacJtq7eSRrkthTjbybxHnwfApwG6RgMhYqa
Q2XY/65hGk2rv4L1sJ8Bgr5ysQ2TAUpJGE2X8Tb12Xz1xk+oVrJeL80XUIQ2fSzI5BrQ/O6IBRSH
OTAkV03s8Sz0YiR43QfzOup0Xz108Kt27wGNb2Lt/m43D/pDOLqsWNCOw/vLl0kaNIAbqyALo6+x
KrBDU8HmnSz5nhAzcrmOdZ6GtGbzpSBMSS3QIXgEWfE/FwsQosmzHFAAMhVWckmiBls32KzPHjuB
pgTAY0OBeKwa9ZuZijtL7DBp8YD0z6hZ7hC4yAn+dHFHOXX35vHl/lKE90igH5m9YVifLjb2C3wE
JUVLNjo31lLkD0NanMjcUdq6uG1c8YPznNEFbtUr05VE6Fnz/J49nm4QUv9VDWz+hQPNgpOvB0Ns
+i/Obu2ZaukFlptx+fAk3T8RIH6NvlDUlfJ1fkZUEKBoFRqohqAI8bBOSB/eKorVkW2PwUBbTejh
itD8zveXXCbJoNOpgIgvUWA9CA+JzWaJoqqNEmnqa/6Temyp2yefC8lCnDKJujPjk2/qEnS6Lot3
CqRXTXGMjT599mRBBvPyMMyUapXrE+AI4brRgm3b6OX05i7Hr9TgAVuxxzQSKTG66acSqUaQHYRY
gL7Odxu2ASH5+IncMBShM5ldBuZSYHKhbQPGUWTL2BZDKNQ8LOFIIAF7Qn7Dnl+QGYWhbjsR9XLN
91Umbx7b6c4Hm7q3YuxDrVoUKdMgC4Z3HL5HwGylsEWo9DZK4N6ujNvyBkk4QM8bIVknpirBsN7r
3LevYgyVJMboJAOhrGMVjQuxcPg36LHURdqvxHc/Oq3TDO9rO/yOZR3IO6UvWu6T0tOeDjGS1J4I
MxT7gRlGzR2FK1Kup7qdlPhHiH7/BXP/2q/tv13k8rLOUsc5Ckg9YIQprmUcPp53hcvIcMxQOJxG
47s/2pcxmPPpO/gK6Z87fDhqG6qcYZPCtWmbWUmA3eBI2f6npKFtH5YPa/I0mhbV19XWApswLUIE
Q0dbtk/7gs9RIIS7FXV1SLaO26dwUps2NXSC3dqoLNxPNl1r13N0Vdgyg5T0W5+kCQnENng4dkaB
/d8sAIMFmKvjX0PUIt+ofSKEPOVGJRtl/EhCNHzGPmt8sNq6ZSitfdB3RbnNvYaeGyzE/uEgzIpm
kb3RcEOIMBHSkNhGBaOxNI4t2naqso4vMdJIRLK+oNniCv2h94Cz4xLWCukNNoBHCOaQhas5wt7p
yYbmnzn9DJR0HOxtVEEWxUCXcWan71K98aS/b2MbYHlUcfflyrgZ3IV9RMMLpqF94S4MyQp/MpJt
1X9DExo8sqF/HdaAqkCBpB8OGItX8Mkqc/17UmGjNTDXDRFLAQZFYHIrXuPCRuMfwI4aH0eQ9+qp
Hyd8BaSzwGy7/JED5s1kXFLfnEosdibJd9uRGXwt5I8g5/hOAQniG6CmQTmnKjoeSU/CvNYj5tDd
nf9Hk7ErqqCPvIG+ZPvdKw7+jddtLPzGdum/oW36evPs9ejY4vivVG8M3trSOhzI3VJu7pqFBwpc
idsNih+fCDiHcrdQDNjBSLx/0GHsncuHvBkMhkyEXRfpt5JleF05hpLLhfDjA23cfbBihrFv6tfr
AchA7eM60DTGjfhqWoViVz59CBqXo5cTbKs6ihW8kKiluEowKlkQDetsMQjWOaBcX0qa/4T08LHT
k1DJxKSW5eviEat/VuYu6iv/5SouMpVrR0qc4G4r3QG9Cl6nKcfgVqIMce81sTn5dokpK0fmhDz1
tmKYowtpCDpkSZKDIeGPCG7voF6qCoCTHu4fthKeKISApp0v2lxCpKaIyW5FrNoDWJKREOdYAR0Q
wUWQGX38ovAx6n7/o75PrCfwvfnTBXomHhA/N8rV6LrTyhx+B3ueqKlwXWVmMlgZpGYuhDRwdsC=