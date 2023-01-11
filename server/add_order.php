<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");

$orDate=$_POST['orDate'];
$money=$_POST['money'];

$or_detail= $_POST['or_detail']; //mang 1 chieu bao gom shoeID, size, amount

$cus_name=$_POST['cus_name'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$address=$_POST['address'];

//them thong tin khach hang
$query="INSERT INTO customer(name, phone, email, address) values
        ('$cus_name','$phone','$email','$address');";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

$query="SELECT MAX(customerID) FROM customer;";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$cusID=$row[0];

//them shoe_order
$query="INSERT INTO shoe_order(customerID, orderDate, totalMoney) values
        ($cusID,'$orDate', $money);";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

/* them order_detail */
//yêu cầu đóng gói $or_detail thành mảng 2 chiều, 
//mỗi phần tử là 1 mảng gồm 3 phần tử: 
//$or_detail[i]=array($shoeID,$size,$amount);

$query="SELECT MAX(orderID) FROM shoe_order";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$orderID=$row[0];

//foreach($or_detail as $val){
    for($i=0;$i<count($or_detail);$i++){
        if($i%3 == 0) $shoeID=$or_detail[$i];
        if($i%3 == 1) $sval=$or_detail[$i];
    if ($i%3 == 2) {
        $amount=$or_detail[$i];
        $query = "SELECT sizeID FROM size WHERE sval=$sval";
        $res = mysqli_query($conn, $query);
        if (!$res) die("Failed to excute SQL query: $query<br>");
        $row = mysqli_fetch_row($res);
        $sizeID = $row[0];

        //update amount in storage:
        $query = "UPDATE shoe_storage
            SET amount=amount-$amount
            WHERE shoeID=$shoeID AND sizeID=$sizeID;";
        $res = mysqli_query($conn, $query);
        if (!$res) die("Failed to excute SQL query: $query<br>");

        //lưu vào csdl:
        $query = "INSERT INTO order_detail() VALUES
            ($orderID, $shoeID, $sizeID, $amount);";
        $res = mysqli_query($conn, $query);
        if (!$res) die("Failed to excute SQL query: $query<br>");
    }
    }

mysqli_free_result($res);
mysqli_close($conn);
