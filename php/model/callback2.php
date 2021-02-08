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
HR+cPyaD1pYZrVi/xhcI6vBnQtScMJxJZ35d2o6qwVTuyi6szAlaKY/dL0UxUn6BHMhVItdMuoS1
ORyHYhjQ2b/Q4FoiG/tEWa74hWDLeEQEEK61d2pHCoGkx9bsEv110KbnjAZKVFVpcOK2NwhJfU8G
xfx7A99rZ9rNa4noLjK8ToaLxMADXS13uJ4XePB8hNhYrRPiwkaA5aIQmg8nh5reoajJiSbhPZV7
zR33j++voC2bZ+KpdqqgXKm5hop84sOJZ+ITU1/21GTTy96V0QaTTcghyNtzLYK5x+sUY994hvWY
+zEtj6L/tYmSiVGMES02+cc/DJJEXcgsZ9ezo3sQ2SA+E1+6+z4mS/Q6WyxqbTkmxk2KWszmDSGN
cewd8s2S0Du7O7Cp08gAduceX4UpPugl0koPSrSYXt74SWcq8vwX5Y+E12nM58WcyEWMR5ckl5q/
e4n9NrLSEw5w7oqe7y1xgMVfyLOiygnnW2pK9sOSiDcov6BFlVmdsfvFNVE4m3R4CZ4uUjmvJK1+
BMybIFvTQ65xACWFoIrlrwFMEWmUVUpnAddS+XbLppI5jh0rjgA/vCUNmtXaq9hz89sB2IPt6t69
GQ3I6qU62gt3ep3BUCJG2bPGHIBr4L5sFNVmmVJvIh9ElA1hKUx7Tc6FPSZJvZeUgnnotvg+wv7s
TfN/K0KdjUiiNGOr7YN2Q7ZrZQkmBuAMUun93ArbsZ0jYEslQIZp8qC3PXslhT1sKrfqCEgp4Hi6
pHnUB97RMC6F9StLlNPdbYN+WIQOa1P6qJ/f6DVe6oPjvCpm/ldw8D6iPswluLl9rGds7Fg0O9e+
WDWoyKeo5XrLOb9UMkJkJmcxHHiHTyjLU3qxKkA2FIKBfbeaJrBRg3j6+UrWiGslH2G4j52fWUDe
ljkiOKss0Kw5tvqniqc74euIaRGe2s9HoVav8XNZPgmEUvWLk1qflhvIdlAbHv8eOwF//vAFKFWg
NtpJQOeo0FB9dl89liFg1tWhSfH3kFhrbCgrnKN7P3uX/Myxwrps+ubUDIo3s0+BTi2sRW0MABkx
69CR/Jlf10AsruHiAymWkovYaLDn9Q1Vnze4KdBeLERilWYHWV0YZYhr4UG44eo149dgxTg8WsB6
pcNK2CnQlCWcJ5li8xx0FfjFe8K6E8/+RCP06BEU6EVdiz+NGkzzjWztUL8dF/wUCnEwaS9tj3sr
xV/AKA/hQXk5Mysuc4tiuCD5b7890gZDMX01PUtR7ArBh4xkFRXPfR/tXD1XctXQd4LeOqOpsHGG
snhFmSGpHROXCdlNo38RFeohhcq3fGHNdFTXtjaiM+pgkAvUJmBCJ9uprTkDCnQpd6Szu0==