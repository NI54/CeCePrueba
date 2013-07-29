<?php
include 'connection.php';

$author= $_POST['author'];
$title= $_POST['titulo'];
$text= $_POST['text'];
$category= $_POST['categoria'];
$summary= $_POST['bajada'];

$string1= "INSERT INTO articulos(author,category,title,summary) VALUES ('$author','$category','$title','$summary')";

$query= mysqli_query($connection,$string1);

$auxString= "SELECT * FROM articulos WHERE category ='$category' AND title='$title' AND author='$author' AND summary='$summary' ORDER BY id DESC";

$query2= mysqli_query($connection,$auxString);

$array= mysqli_fetch_assoc($query2);

//echo $array['id'];

$f=fopen("article/art".$array['id'].".txt","x+");
fwrite($f,$text);
fclose($f);

$f2=fopen("version.txt","w+");
fwrite($f2,$array['id']);
fclose($f2);

//echo "asdas";

?>