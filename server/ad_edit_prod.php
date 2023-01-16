<?php
//sửa thông tin về shoe
require_once("connect_db.php");
include("functions.php");

$shoeID=$_POST['shoeID'];

if(isset($_POST['name'])) $name=$_POST['name'];
if(isset($_POST['brand'])) $brand=$_POST['brand'];
if(isset($_POST['category'])) $category=$_POST['category'];
if(isset($_POST['price'])) $price=$_POST['price'];
if(isset($_POST['sale'])) $sale=$_POST['sale'];
if(isset($_POST['color'])) $color=$_POST['color'];
if(isset($_POST['imagePath'])) $imagePath=$_POST['imagePath'];

if(isset($category)) $categoryID= get_cateID($category, $conn);
if(isset($brand)) $brandID= get_brandID($brand, $conn);

//update edition:
$k=0;
$query="UPDATE shoe SET ";
if(isset($name)){
    $query.="name='$name' ";
    $k++;
}
if(isset($brand)){
    if($k>0) $query.=", ";
    $query.="brandID=$brandID ";
    $k++;
}
if(isset($categoryID)){
    if($k>0) $query.=", ";
    $query.="categoryID=$categoryID ";
    $k++;
}
if(isset($price)){
    if($k>0) $query.=", ";
    $query.="price=$price ";
    $k++;
}
if(isset($sale)){
    if($k>0) $query.=", ";
    $query.="sale=$sale ";
    $k++;
}
if(isset($color)){
    if($k>0) $query.=", ";
    $query.="color=$color ";
    $k++;
}
if(isset($imagePath)){
    if($k>0) $query.=", ";
    $query.="imagePath=$imagePath ";
    $k++;
}
$query.="WHERE shoeID=$shoeID";

$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

mysqli_close($conn);
?>