<?php
require_once("connect_db.php");
//thong tin ve order:
$orDate=$_POST['orDate'];
$totalMoney=$_POST['totalMoney'];

$query="SELECT MAX(customerID) FROM customer;";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$cusID=$row[0];

$query="INSERT INTO shoe_order(customerID, orderDate, totalMoney) VALUES
        ($cusID,'$orDate',$totalMoney);";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
?>