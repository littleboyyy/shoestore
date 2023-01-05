<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");

$query = "select * from shoe";
$res = mysqli_query($conn, $query);
if (!$res) die("Failed to excute SQL query: $query<br>");
$rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
$rows_count = mysqli_num_rows($res);
$k = 0;
for ($i = 0; $i < $rows_count; $i++) {
    $row = $rows[$i];
    $query = "SELECT sval from shoe_storage, size
    where shoe_storage.sizeID=size.sizeID and
    shoeID=$row[shoeID] and amount>0
    ";
    $res = mysqli_query($conn, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $rows2 = mysqli_fetch_all($res);
    for ($j = 0; $j < mysqli_num_rows($res); $j++) {
        $sizes[$k] = $rows2[$j][0];
        $k++;
    }
    $rows[$i]['sizes'] = $sizes;
    $k = 0;
    unset($sizes);
}
echo json_encode($rows);

mysqli_free_result($res);
mysqli_close($conn);
