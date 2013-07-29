<?php
$f=fopen('version.txt','r');
$r= fread($f,100);

echo $r;

?>