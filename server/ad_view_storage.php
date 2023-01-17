<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");

$query="SELECT s.shoeID, s.name as shoe_name, brand_name, cate_name, price, sale, SUM(amount) as total_amount 
FROM shoe s, brand b, category c, shoe_storage ss
WHERE s.brandID=b.brandID AND s.categoryID=c.categoryID AND s.shoeID=ss.shoeID
GROUP BY ss.shoeID";

$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$rows=mysqli_fetch_all($res, MYSQLI_ASSOC);

echo json_encode($rows);
/*foreach($rows as $row){
    foreach($row as $val){
        echo "$val, ";
    }
    echo "<br>";
}*/
mysqli_free_result($res);
mysqli_close($conn);
?>