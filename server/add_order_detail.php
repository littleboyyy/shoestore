<?php
require_once("connect_db.php");
//thong tin ve order_detail:
$or_detail=$_POST['or_detail']; 
//yêu cầu đóng gói $or_detail thành mảng 2 chiều, 
//mỗi phần tử là 1 mảng gồm 3 phần tử: 
//$or_detail[i]=array($shoeID,$size,$amount);

$query="SELECT MAX(orderID) FROM order";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$orderID=$row[0];

foreach($or_detail as $val){
    $query = "SELECT sizeID FROM size WHERE sval=$val[1]"; //$val[1] là size
    $res = mysqli_query($conn, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    $sizeID = $row[0];
    
    //update amount in storage:
    $query = "UPDATE shoe_storage
            SET amount=amount-$val[2]
            WHERE shoeID=$val[0] AND sizeID=$sizeID;";
    $res = mysqli_query($conn, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");

    //lưu vào csdl:
    $query = "INSERT INTO order_detail() VALUES
            ($orderID, $val[0], $sizeID, $val[2]);";
    $res = mysqli_query($conn, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
}

mysqli_free_result($res);
mysqli_close($conn);
?>