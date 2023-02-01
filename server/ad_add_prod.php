<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once("connect_db.php");
include("functions.php");
//input cho table shoe:
if(isset($_POST['name'])) $name=$_POST['name'];
else $name="NULL";
if(isset($_POST['brand'])) $brand=$_POST['brand'];
else $brand="NULL";
if(isset($_POST['category'])) $category=$_POST['category'];
else $category="NULL";
if(isset($_POST['price'])) $price=$_POST['price'];
else $price="NULL";
if(isset($_POST['sale'])) $sale=$_POST['sale'];
else $sale="NULL";
if(isset($_POST['color'])) $color=$_POST['color'];
else $color="NULL";
if(isset($_POST['imagePath'])) $imagePath=$_POST['imagePath'];
else $imagePath="NULL";

//input cho table shoe_storage
if(isset($_POST['sizes']))
    $sizes= json_decode($_POST['sizes']);
if(isset($_POST['amounts']))
    $amounts= json_decode($_POST['amounts']);

//lay $categoryID va $brandID:
if($category!="NULL") $categoryID= get_cateID($category, $conn);
else $categoryID="NULL";
if($brand!="NULL") $brandID= get_brandID($brand, $conn);
else $brandID="NULL";

//them sp moi:
$query="INSERT INTO shoe(name, brandID ,categoryID, price, sale, color, imagePath) VALUES
        ('$name', $brandID, $categoryID, $price, $sale, '$color', '$imagePath')";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");

/*them vao storage neu co du lieu ve $size va $amount*/
//lay shoeID la ID moi duoc them(ID max trong table shoe):
$query="SELECT MAX(shoeID) FROM shoe";
$res= mysqli_query($conn,$query);
if(!$res) die("Failed to excute SQL query: $query<br>");
$row=mysqli_fetch_row($res);
$shoeID=$row[0];
//them vao:
if(isset($sizes) && isset($amounts)){
    update_storage($conn, $shoeID, $sizes, $amounts);
}
mysqli_free_result($res);
mysqli_close($conn);
?>
