<?php
require_once("connect_db.php");
//thong tin ve customer:
$cus_name=$_POST['cus_name'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$address=$_POST['address'];

$query="INSERT INTO customer(name, phone, email, address) values
        ('$cus_name','$phone','$email','$address');";

$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
?>