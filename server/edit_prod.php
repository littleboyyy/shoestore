<?php
//sửa thông tin về shoe
require_once("connect_db.php");
include("functions.php");

$id=$_POST['shoeID'];

$name=$_POST['name'];
$brand=$_POST['brand'];
$category=$_POST['category'];
$price=$_POST['price'];
$sale=$_POST['sale'];
$color=$_POST['color'];
$imagePath=$_POST['imagePath'];

$categoryID= get_cateID($category, $conn);
$brandID= get_brandID($brand, $conn);

//update edition:
$k=0;
$query="UPDATE shoe SET ";
if($name!=""){
    $query.="name='$name' ";
    $k++;
}
if($brandID!=NULL){
    if($k>0) $query.=", ";
    $query.="brandID=$brandID ";
    $k++;
}
if($categoryID!=NULL){
    if($k>0) $query.=", ";
    $query.="categoryID=$categoryID ";
    $k++;
}
if($price!=""){
    if($k>0) $query.=", ";
    $query.="price=$price ";
    $k++;
}
if($sale!=""){
    if($k>0) $query.=", ";
    $query.="sale=$sale ";
    $k++;
}
if($color!=""){
    if($k>0) $query.=", ";
    $query.="color=$color ";
    $k++;
}
if($imagePath!=""){
    if($k>0) $query.=", ";
    $query.="imagePath=$imagePath ";
    $k++;
}
$query.="WHERE shoeID=$id";

$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
?>