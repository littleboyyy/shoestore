<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require_once("connect_db.php");

$query="SELECT MAX(orderID) from shoe_order";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$max_orderID=$row[0];

//xoa don hang moi them:
$query = "DELETE FROM shoe_order WHERE orderID=$max_orderID";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");

//update auto increment cua shoe_order:
$query = "ALTER TABLE shoe_order AUTO_INCREMENT=$max_orderID";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");

mysqli_free_result($res);
mysqli_close($conn);
