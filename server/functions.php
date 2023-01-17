<?php
function get_cateID($category, $connect){
    $query = "SELECT categoryID FROM category WHERE cate_name='$category'";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    if($row == NULL) return NULL; //if not found
    return $row[0]; //categoryID
}
function get_brandID($brand, $connect){
    $query = "SELECT brandID FROM brand WHERE brand_name='$brand'";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    if($row == NULL) return NULL;
    return $row[0]; //brandID
}
function get_sizeID($connect, $size){
    $query = "SELECT sizeID FROM size WHERE sval=$size";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    $row = mysqli_fetch_row($res);
    if($row == NULL) return NULL;
    return $row[0];
}
function check_exist_row_storage($connect, $shoeID, $sizeID){
    $query = "SELECT *FROM shoe_storage WHERE shoeID=$shoeID AND sizeID=$sizeID";
    $res = mysqli_query($connect, $query);
    if (!$res) die("Failed to excute SQL query: $query<br>");
    if(mysqli_num_rows($res) > 0)
        return 1;
    else return 0;
}

function update_storage($connect, $shoeID, $sizes, $amounts){
    for($i=0;$i<count($sizes);$i++){
        $size=$sizes[$i];
        $amt=$amounts[$i];
        $sizeID=get_sizeID($connect, $size);
        if($sizeID == NULL){ //neu chua co size nay trong csdl:
            //them vao table size:
            $query = "INSERT INTO size(sval) VALUES ($size)";
            $res = mysqli_query($connect, $query);
            if (!$res) die("Failed to excute SQL query: $query<br>"); 
            $sizeID=get_sizeID($connect, $size);                           
        }
        $ret = check_exist_row_storage($connect, $shoeID, $sizeID);
        if ($ret == 0) { //$size cua $shoeID chua co trong shoe_storage
            $query= "INSERT INTO shoe_storage() VALUES
                    ($shoeID, $sizeID, $amt)";
        }
        else if($ret==1){
            $query="UPDATE shoe_storage 
                SET amount=amount+$amt
                WHERE shoeID=$shoeID AND sizeID=$sizeID";
        }
        //update vao shoe_storage:
        $res = mysqli_query($connect, $query);
        if (!$res) die("Failed to excute SQL query: $query<br>");
    }
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