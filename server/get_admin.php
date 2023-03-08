<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$username = "root";
$password = "22336688";
$server = "localhost";
$dbname = "shoe_store";
$conn = mysqli_connect($server, $username, $password, $dbname);
if (!$conn) {
    die("Cannot connect to $server using $username");
}
$query = "select uname, passwd from admin";
$res = mysqli_query($conn, $query);
$row = mysqli_fetch_all($res, MYSQLI_ASSOC);
echo json_encode($row);
/*if(mysqli_num_rows($res) > 0){
    //check
}
else {
    echo "Username or password is incorrect!<br>";
}*/

mysqli_free_result($res);
mysqli_close($conn);
