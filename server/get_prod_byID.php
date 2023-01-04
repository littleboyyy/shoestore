<?php
//tim kiem theo shoeID
require_once("connect_db.php");
$shoeID=$_POST['shoeID'];

$query="SELECT *FROM shoe WHERE shoeID=$shoeID";

$res= mysqli_query($conn,$query);
if(!$res){
    die("Failed to excute SQL query: $query<br>");
}
$row= mysqli_fetch_assoc($res);

echo json_encode($row);

mysqli_free_result($res);
mysqli_close($conn);
?>