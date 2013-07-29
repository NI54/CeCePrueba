<?php
include 'connection.php';

$index= $_GET['ix'];
$cuantity= $_GET["cu"];
$category= $_GET["ca"];

//$cuantity= 10;
//$category="all";

//$connection= mysqli_connect("localhost","","","test");

if($category!="all"){

	$query= mysqli_query($connection,"SELECT * FROM articulos WHERE category ='$category' AND id<'$index' ORDER BY id DESC");


} else{
	$query= mysqli_query($connection,"SELECT * FROM articulos WHERE id<'$index' ORDER BY id DESC");
	//$query= mysqli_query($connection,"SELECT * FROM articulos WHERE id<='$index' ORDER BY id DESC");
}


$aux=0;

$array= mysqli_fetch_assoc($query);

while($aux<$cuantity&&$aux<$array!=null){

$aux+= 1;

echo $array['id'].'|';
echo $array['title'].'|';
echo $array['author'].'|';
echo $array['date'].'|';
echo $array['category'].'|';
echo $array['summary'].'|';
echo '~';

$array= mysqli_fetch_assoc($query);

}

?>