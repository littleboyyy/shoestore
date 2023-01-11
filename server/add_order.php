<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");

$orDate=$_POST['orDate'];
$money=$_POST['money'];

$or_detail= $_POST['or_detail']; //mang 2 chieu bao gom shoeID, size, amount

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
$query="INSERT INTO shoe_order(customerID, orDate, totalMoney) values
        ('$cusID','$orDate', $money);";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

/* them order_detail */
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
            WHERE shoeID=$shoeID AND sizeID=$sizeID;";
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