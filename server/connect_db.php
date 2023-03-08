<?php
$username = "root"; 
$password = "22336688";
$server = "localhost"; 
$dbname = "shoe_store";
$conn = mysqli_connect($server, $username, $password, $dbname);
    if (!$conn) {
        die("Cannot connect to $server using $username!");
    }
?>