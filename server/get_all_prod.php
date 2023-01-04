<?php
require_once("connect_db.php");
$query="select * from shoe";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

$rows= mysqli_fetch_all($res, MYSQLI_ASSOC);//mang 2 chieu

/*foreach($rows as $val){
    echo "$val[shoeID]: $val[name]<br>";
}*/
echo json_encode($rows);

mysqli_free_result($res);
mysqli_close($conn);
?>