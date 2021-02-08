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
HR+cPsWMRnwhj5DIvjhwFIWfcksqIEOiaNXTh+jOovF3bXGPUMJcQbTAzuaIfQ2Y7p/bkoEr/I5W
wXlAKkSiYRTy4/OXk1LvuWmARiPQpRd/N6YjGxa7ySyXRGTSuXaMb5S6ZjBKxr8h8urDXybf/wqz
0XdZDVTiWolHlfyocWBJfLnmscaogO9iVltXU12CqN/im7Y1bEGakVzRBTcTAxFe3GqgYLJuVsnG
YrG10fDzCllZY22HDRcC6qJz7aOup/U1ChgckiZvJbJAE4BehftOK0tTrEdwOEoHMpHaPPy8p8Ci
foO00cD+U42C/dsmxsz8qOxbD80RsXZ4RNYTJ0QJnvlwB4uJc3NO/S24xuTSYWPjTHOikswmJwHh
/+MRYfGxIRHaKEXiDNx1nWMkbjfl/Zj1ntCp4aqQ3/Nm1/C9qIdHuuC6D5uPb7wUt+ZeS3843An5
pffNb0/7P6ROaVzRnMPHSyWQS+zRNtMAgyF4Tp65rf0fd8E86ok5TI7ofDKn2tWsYtPjZtDVAfSL
FJ2OpIzBqrXtCrmwMGp/oJJMhBy8jjlx117NGwavjVMsL98+RnTSCijYcJ9ny0+t4mreJ/qjWiYZ
O30pkc17Led39H7IM24V/Q125rszrS3NkWQWFjsiTkdjihO1WuKIV8O7keJRvXeTK6zodIIdeqm3
iubxi8CkY8TF2Mfa1oT768dHORctnh+Cs4HuiXzKOvl2AczRp67W3KTG9k+1wwWXVawjc9oDRBq1
jSHU393uvkVYh0nozrRQyDpWF/cT/imT4vlygLGlZ7TlUcwKFJ0BVLbNysnysHmSgGYLiKw0xZMS
dsCveQYmDkDnQF3YkVebGDyBPbBZmcwSCr1l5JUDSoulExybPmd4ySQQUAIL9OCiICc2JQQJpt2X
TPUTvDY/zjwwejBV8YTAa8KYtTQUnoTuXKDUJo6kuLrXBWwdvX8sXzpN/Tl9e08rtNwhwhp3p/c5
logtKAavXSPLJYb06fc9P+PANJ/cVxrmsKdrWa6rpy3zy5Ruravhr/lKjxJHtra1sqg2cOzQ28mj
i5ajB1Q9BKoZfJK4ZD1ZVz45cHbR3wYZeH/xm7SjUGs8+g27B9TXMQLd00yHp0ct7PQz7gyCEmwr
e9PsITrDRd8gBdD+VNO+ZmWhAKprep09nSR+ZKak826uMRA3OawAkmK73N/iGR6zoezY15Llhosg
PZbM82jYZXXeaHtq3bVrnB0+eOjq4eUOct9sMtHAxz9zxtOzOfk9cBrsiFwOozH3jECFgiGsMWLa
tJ13Na+mGapWEadHtfUDfaKFzUkPXJvc5fD7mQ5K5Unzf5ERxp6TUZqrFmmLmlWUuLexC5PQEQiz
E1vOCf3IINu74h0KvJX8zv5WWjGo2Y0LDJLHlE2g5/iuYUkVbnIVWDHlBPxeYvIwpk3tRPVRZdjw
8G5yZKxiuq5ka2oSim/jWf9eJeIUjxMyCwW9NIl+yOy+Kz5fG/mAOVSuLrgWxUs04t67lY4Gg+pJ
5T81y9WzPNEb15DbkCtGhl3dW+FmEaXV3ri14iLJYkXiiqZOGq6koEPdXhFzAl0LXN1fePHybZSB
dZORa7Am+afsChT5r/0N4rtxjVyABNbWf2NBt5BIGVcrmqdbCL9t4QCzyvguR4SaLomMZeGDzkqm
7370I1+TwLY+T8DzhcCMzCPU70DJ3F+L8T2UGoIwOHxd6LMx8PcQavCLVzrt0rfs29o05gM0fgcO
Ifwc+kx486iS1f4a5YC1/Mt/divsG34t29gdxGy2RnlDxNCvKm/v+4sRmijXb2eK3VACEnZAnuxB
P9DnOlDE9aL2y5sjUpJtzSIVICeBTzo4yzqA5cfaQhfCXx5005VN9hNn29ckGme1N+0nnfoQeiEz
Ynd+BvKaEAK3Z8O65p0mxDhtXs5+5nNnPY17wRVdDBfUZF68B4SKqzRlUDCJCd+Qt3YLE6lRykAm
olrFb9oHHRE3EsQ+D0xYcg+v1ivLbFgm03vq781hcfBdN8P/j4puxZOYwZc3w8FfaW9xNYyWqYxi
WfmjyvLrcdo5O1CL5gb90JtHCxh+UPuxgSIYTrnuR7F3ka0pBp2ZYyrOuPZIUpJ79UaUOiKu3Kig
JMkIkPcJadZ5X5kZAjPsH6tNSgomH2VRaCUJHnHf7jDkIuIGevSa+7smcvSWofAPU2yQbOKtvyTx
WkaeAGJcPP4cyQV01JALzi/VuKaGivwbKc8uUS/UNGks7ZMacEeh/o6qsAt3PdTTcrBlUydcbNJP
K07BTebS1JkB8/lwo3//TlhkoYbMbDQsfCB9qqqFfH+Wb3TnMPyUfFkKJhLBJkPFuiill1zYmmKS
UXAKUgzi0Wb+6ZO31dQpvz5TVa7q1H8BpA8XhN4UyEH6xn4PiFg9enHo6PocdoPWdRvY5VsaDTdd
c566OXRyttRcx9TlUD61RB4f1bHG/+bSYQdmxyh8vRU+k6OYBPpDGmZI9ph8q66v7DRjmFVosxVP
uQ7LB4BjdAVP/qjPvtQa/p35uCApPk8ZcPsEsio9CbydWQsPulS3Ifd6O1bHEBRc0Llb34XmVwBl
Lh6QOlzyv4ZltZ98C1DDQGYn/kS7zRt2SRiKzWHsIx1MFh6FB5BJYKj4fqh/kOM0d9EtLnozkrjT
2cZy+4eN+4FamPzPvU65bj705plui2jU4HMUNKwL8ZBjL/R5l+j8lSOWBVDBapBYwgAwaOET+2sD
f6xo9QcFszdYmUSXWZwYUExgLCbdPJtknWIVT9pEP8tnctZPxnehn6+xlm8lptGTG0TQR2SzoOb3
EVcXsKpBe+rNN2+0074fkLfYZy9BMZK+HwZuOC9p0u0fM0I1CUHeKVAKR/XD9HBZxGMt+4b8PLJ4
+A6r3O74pLZasvvgudFlx0JZ5e4u0fWHdSwVXp5dKKIr67WIjIiEiz0/ArJDJQJHQDaEa37KpgQY
PqqmTMpbAUA20ju8TughxQTfuCFHdD5co/xU4pagFgEgJszUkvwHeRBvyCSV34bVfxbkF+RC98Vi
P5BNT6eMSdJTxXOloGsF/0Gkqrs3xpR9WqeHvpH9xn5vhU6sOW34ljAsMO7ZFfSj8m1dp1OEI7Hv
Wto7gdckrIuLfhFFcUVPlan20t5oiMwrQ2LMJfx4hosTCrMxTa+wtXq43RigSciX+Eqp1l/eAgw6
V0SY+bD7+lOVlFRhW2zK3yy+tWAtwyR8x8ZSJ3BlvAiozHKv9o2ImUXtIaWDLJjCY8gdH71U5w8b
YgEtadVs5z4PIJMabM19RDxpyNGFTzTL2fdlTqAahZcpBoKqtZeFxcizGbCsMy+LKZ4vkrSq8F3o
Ja0hL+LtBMZiWNN3aBtRreut361FY6B3JQcWb+PrSDAeodS4IoTl/jrrxMULqAw5cwCzoWiK0v5j
ixIepwx8f2pX4RQYrEGOh4A8JQgb2xjhWL81nkgHWl1LfiBsNzfNFHKFujdeYVs8Q64ERHSwOmHu
kMKO/sV/9rPyCKlY7PYL/oS7KgiFmJsdzGoEmc1yncbyULaspl00hYQzpKhPBmX8zQqn1nQFT6fU
lcf7+EXdseIXQLhIDgPqWoqac25cDZ5F6EIjtM/khOYrhDpLREnA+Pn6Tk8PdnRBkEx7zWs5mik+
sxdz92BFXFrXXf1yYGsng9LaHdkP2jVK+kCbiz2hjlg/1BYznPpVEXzaxHXLY9Ndi+jmy5lL/Zjy
dGldWQXmCsc9bYBpPNM2+fG7dtG2DOepWteHB67t0FKVtF/Hw6Jx6/PoGO50QoN4MPKdwki5fRQg
WBiR1q2ADIi2pcrMGUP0+E6Bb0yD6OSNik/RbUQYSNKBJTKIY0y6Q6B1MNIw/wKPrPe=