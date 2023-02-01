<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");

function get_cus_infor($connect, $cusID){
    $query="SELECT name, phone, email, address 
            FROM customer WHERE customerID=$cusID";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_assoc($res);
    if ($row == NULL) return NULL;
    return $row;
}

//$orderID=$_POST['orderID'];

$query="SELECT *FROM shoe_order";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$rows=mysqli_fetch_all($res, MYSQLI_ASSOC);

for($i=0;$i<mysqli_num_rows($res);$i++){
    $row=$rows[$i];
    //thêm thông tin về customer:
    $cus_inf=get_cus_infor($conn, $row['customerID']);
    $rows[$i]['cus_inf']=$cus_inf;
    //thêm thông tin về order detail:
    $query="SELECT s.name as shoe_name, sval as size, amount 
    FROM order_detail od, shoe s, size si
    WHERE od.shoeID=s.shoeID AND od.sizeID=si.sizeID AND
    orderID=$row[orderID];";
    $res2= mysqli_query($conn,$query);
    if(!$res2) die("Failed to excute SQL query: $query<br>");
    $rows2=mysqli_fetch_all($res2, MYSQLI_ASSOC);
    $rows[$i]['detail']=$rows2;
}
echo json_encode($rows);

mysqli_free_result($res);
mysqli_close($conn);
?>