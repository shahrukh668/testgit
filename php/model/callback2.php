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
HR+cPxjQeFane1Z+cEursiI1PxUSTUcS8kceYspDdonVfWpYL6rh5pEiLgrQA1UXtVnGvOIbZaKp
xwWSFRspJ0Vxv5rNqMa8Htqj1TJL+dISO3FP9AdABFHMVjeQ34o0kV6e79sg4+2pOsoAKR9kKIBc
k/dA6XFv8toNtDQ95WUL6yPgRPqh+ytzInV7+xqwACgF8J565zoVAVhMWP4Y5RrHE6+Y9lJ+alKv
uN9w57ZrDALYAA14n2DbFlriCY//lCbZZQJjNLUoGkGEjqCa0HTVZOINWL+KNEXvae1d+Iz6fkua
gqqpqzvnLEUedMSZ3I1sBIWl4DugXIrFHNrptg2N2OGZPcSSxPrzht+2vSsVz3yoT6d+QBrQR8HA
95PHBvvntxlJuBoSLrq0AZ5wm+kgEVRIrj/GSWnIbyasFNltMehfGKkeAoNBnP/Na4MVbOD5/eSJ
9RcMoIjUEEAyybeNzV3/HAMEheQFAn745QBz9SgtI/9xJgDhjjydzH0UDMehN8ZzCfPTLjK9HT2y
pLI1MZPVM6IaYJ50j5fLB8/BG/DUeukzB/Nl6oe3k7q89i8bC7tV2wxldSdMfNJ3yn3W6ijzhdX7
+7cxCPMqqvuvDfQ9YUEyh8f1rw8dmvB1YR7OenfnfoG1v6qXlLNBqGAgPMQMjNKZMlFT5+xKxavS
TaFW4VWf4KKrxQ3aRZYSnmXp7Ne4rZIhlWoL38iCQWaFo+vtJZSORPvx/+cULnd8VncJ4cV9MIzx
6v9BBhI7dBmE102myEOJYp8cfu+4/PeO383+u982TVEiVAkFG515lAqMCIHY5nqnSjTaRAQjAUWj
MeSXtHvkmS6uCAN8QftNFeuXAgCbbnmRgAly/pqdSpxLcraE2qRwLsuWwJ8iwOQrVNL2c80T3nAb
7lAegE/+Wm12xojcDLBmjuVpcv07o2wf1mIk1EIGboWXRGVZRfkjRzAz38nAMlxlXdhz4M+DfDEr
9KQZvJSxyqnrxzdqbbuVXOkRankKtetJmUqImxQgZibwwwZ2/6xBaWpUgqmZKE5Q6EZr0oU5hPvL
rAuJK7BLmhphVWme8ac/nYaXplTBRDkiorFw2j+kkJ4d+jycGLzQ9WjCycpyYFiKMPGQLc5whcYG
1msuOLuE1qCcI2ZR84a86UU9SWxJals8yss4S3To+uhuCbmYezhcmvfJoE1+88v0lqDWaw4PXnfE
0QpN5mgTJL/RRqlWFtnaIzP+zu/RhFzuejgr53lrg6XvWlHaZZJzA3TkwhyvbiKntA80wDc9RG/L
G08ncjx1gOq8nlIy8nSzYyIM4Mf4trdSAvcXLEpsJDSnpqc9C24CJat8yfO2He2cHodMjwridQG=