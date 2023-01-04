<?php
function get_cus_infor($cusID, $connect){
        $query = "SELECT *FROM customer WHERE customerID=$cusID";
        $res = mysqli_query($connect, $query);
        if (!$res) die("Failed to excute SQL query: $query<br>");
        $row = mysqli_fetch_assoc($res);
        if ($row == NULL) return NULL;
        return $row;
}
function get_order_detail($orderID, $connect){
        $query = "SELECT *FROM order_detail WHERE orderID=$orderID";
        $res = mysqli_query($connect, $query);
        if (!$res) die("Failed to excute SQL query: $query<br>");
        $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
        if ($rows == NULL) return NULL;
        return $rows;
}
//tim kiem bill theo ngay order, customer
require_once("connect_db.php");

$cus_name=$_POST['cus_name'];
$orDate=$_POST['orDate'];

$sql="SELECT orderID FROM shoe_order o, customer c
        WHERE o.customerID=c.customerID ";
if($cus_name != ""){
        $sql.="AND c.name LIKE '$cus_name' ";
}
if($orDate != ""){
        $sql.="AND orderDate='$orDate'";
}
$sql2="SELECT *FROM shoe_order WHERE orderID IN($sql);";
$res= mysqli_query($conn,$sql2);
if(!$res) die("Failed to excute SQL query: $query<br>");
$rows=mysqli_fetch_all($res, MYSQLI_ASSOC); //

for($i=0; $i < mysqli_num_rows($res); $i++){
        $tmp=get_cus_infor($rows[$i]['customerID'], $conn); //mang 1 chieu chua thong tin ve customer
        $rows[$i]['cus_infor']=$tmp;
        $tmp=get_order_detail($rows[$i]['orderID'], $conn);
        $rows[$i]['detail']=$tmp;
}
echo json_encode($rows); //chua thong tin 1 order
//print_r($rows);

mysqli_free_result($res);
mysqli_close($conn);
?>