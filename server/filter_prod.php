<?php
//yêu cầu front-end: tạo lựa chọn dùng tab "select", có 1 option là "none" với value=""
require_once("connect_db.php");
include("functions.php");

$brand=$_POST['brand'];
$category=$_POST['category'];
$color=$_POST['color'];

$categoryID= get_cateID($category, $conn);
$brandID= get_brandID($brand, $conn);

$k=0;
$query="SELECT *FROM shoe WHERE ";
if($brandID != NULL){
    $query.="brandID=$brandID ";
    $k++;
}
if($categoryID != NULL){
    if($k>0) $query.="and ";
    $query.="categoryID=$categoryID ";
    $k++;
}
if($color != ""){ //$color có kiểu chuỗi
    if($k>0) $query.="and ";
    $query.="color='$color' ";
    $k++;
}
if($k==0) $query="SELECT *FROM shoe";
$res= mysqli_query($conn,$query);
if(!$res){
    die("Failed to excute SQL query: $query<br>");
}
$rows= mysqli_fetch_all($res, MYSQLI_ASSOC);
echo json_encode($rows);

mysqli_free_result($res);
mysqli_close($conn);
/*
foreach($rows as $row){
    foreach($row as $val){
        echo "'$val', ";
    }
    print("<br>");
}*/
?>
