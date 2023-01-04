<?php
require_once("connect_db.php");
include("functions.php");
//input
$name=$_POST['name'];
$brand=$_POST['brand'];
$category=$_POST['category'];
$price=$_POST['price'];
$sale=$_POST['sale'];
$color=$_POST['color'];
$imagePath=$_POST['imagePath'];
/*
$query="SELECT categoryID FROM category WHERE cate_name=$category";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$categoryID=$row[0]; //get categoryID

$query="SELECT brandID FROM brand WHERE brand_name=$brand";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$brandID=$row[0]; //get brandID
*/
$categoryID= get_cateID($category, $conn);
$brandID= get_brandID($brand, $conn);

$query="INSERT INTO shoe(name, price, sale, color, imagePath, categoryID) VALUES
        ('$name', $brandID, $categoryID, $price, $sale, '$color', '$imagePath')";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
?>