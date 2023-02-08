<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//xoa theo shoeID (ma giay)
require_once("connect_db.php");

$shoeID = $_POST['shoeID'];

$query="SELECT MAX(shoeID) from shoe";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$max_shoeID=$row[0];

$query = "DELETE FROM shoe WHERE shoeID=$shoeID";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");

//update lai ID cua shoes
$k=$shoeID;
for($i=$shoeID+1;$i<=$max_shoeID;$i++){
    $query = "UPDATE shoe SET shoeID=$k WHERE shoeID=$k+1";
    $res = mysqli_query($conn, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $k++;
}

$query = "ALTER TABLE shoe AUTO_INCREMENT=$max_shoeID";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
