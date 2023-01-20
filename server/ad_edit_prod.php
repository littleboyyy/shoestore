<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");
include("functions.php");

//sửa thông tin về shoe
if (isset($_POST['shoeID'])) $shoeID = $_POST['shoeID'];

if (isset($_POST['name'])) $name = $_POST['name'];
if (isset($_POST['brand'])) $brand = $_POST['brand'];
if (isset($_POST['category'])) $category = $_POST['category'];
if (isset($_POST['price'])) $price = $_POST['price'];
if (isset($_POST['sale'])) $sale = $_POST['sale'];
if (isset($_POST['color'])) $color = $_POST['color'];
if (isset($_POST['imagePath'])) $imagePath = $_POST['imagePath'];

if (isset($_POST['sizes'])) {
    $sizes = explode(",", $_POST['sizes']);
    //print_r($sizes);
}
//$sizes= json_decode($_POST['sizes']);
if (isset($_POST['amounts'])) {
    $amounts = explode(",", $_POST['amounts']);
    //print_r($amounts);
}
//$amounts= json_decode($_POST['amounts']);

if (isset($category)) $categoryID = get_cateID($category, $conn);
if (isset($brand)) $brandID = get_brandID($brand, $conn);

if (isset($sizes) && isset($amounts)) {
    update_storage($conn, $shoeID, $sizes, $amounts);
}

//update edition:
$k = 0;
$query = "UPDATE shoe SET ";
if (isset($name)) {
    $query .= "name='$name' ";
    $k++;
}
if (isset($brand)) {
    if ($k > 0) $query .= ", ";
    $query .= "brandID=$brandID ";
    $k++;
}
if (isset($categoryID)) {
    if ($k > 0) $query .= ", ";
    $query .= "categoryID=$categoryID ";
    $k++;
}
if (isset($price)) {
    if ($k > 0) $query .= ", ";
    $query .= "price=$price ";
    $k++;
}
if (isset($sale)) {
    if ($k > 0) $query .= ", ";
    $query .= "sale=$sale ";
    $k++;
}
if (isset($color)) {
    if ($k > 0) $query .= ", ";
    $query .= "color='$color' ";
    $k++;
}
if (isset($imagePath)) {
    if ($k > 0) $query .= ", ";
    $query .= "imagePath='$imagePath' ";
    $k++;
}
$query .= "WHERE shoeID=$shoeID";
if ($k > 0) {
    $res = mysqli_query($conn, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
}
mysqli_close($conn);
