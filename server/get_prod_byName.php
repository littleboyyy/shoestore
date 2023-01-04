<?php
//tim kiem theo ten
require_once("connect_db.php");
$shoe_name=$_POST['shoe_name'];

$query="SELECT *FROM shoe WHERE name like '%$shoe_name%'";

$res= mysqli_query($conn,$query);
if(!$res){
    die("Failed to excute SQL query: $query<br>");
}
$rows= mysqli_fetch_all($res, MYSQLI_ASSOC);
echo json_encode($rows);

mysqli_free_result($res);
mysqli_close($conn);
?>