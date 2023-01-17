<?php
//tương ứng với chức năng Update sp của admin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");
include("functions.php");

$shoeID=$_POST['shoeID'];
$sizes= json_decode($_POST['sizes']);
$amounts= json_decode($_POST['amounts']);

update_storage($conn, $shoeID, $sizes, $amounts);

mysqli_close($conn);
?>