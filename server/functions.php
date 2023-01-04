<?php
function get_cateID($category, $connect)
{
    $query = "SELECT categoryID FROM category WHERE cate_name='$category'";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    if($row == NULL) return NULL; //if not found
    return $row[0]; //categoryID
}

function get_brandID($brand, $connect)
{
    $query = "SELECT brandID FROM brand WHERE brand_name='$brand'";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    if($row == NULL) return NULL;
    return $row[0]; //brandID
}

/*function get_prod_byID($id, $connect)
{
    $query = "SELECT *FROM shoe WHERE shoeID=$id";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    if($row == NULL) return NULL;
    return $row;
}*/
/*
function get_customerID($cus_name, $connect){
    $query = "SELECT customerID FROM customer WHERE name LIKE '$cus_name'";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
    return $rows;
}*/
?>