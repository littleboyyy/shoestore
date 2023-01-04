<?php
//xoa theo shoeID (ma giay)
require_once("connect_db.php");
$shoeID=$_POST['shoeID'];

$query="DELETE FROM shoe WHERE shoeID=$shoeID";

$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
?>