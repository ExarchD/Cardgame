<?php

$host="localhost"; // Host name
$username="webapp"; // Mysql username
$password="web12accese4s"; // Mysql password
$db_name="cardgame_database"; // Database name
$tbl_name="members"; // Table name

// Connect to server and select databse.
// Create connection
$conn = new mysqli($host, $username, $password, $db_name);

// Check connection
if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
}
$myusername=$_POST['myusername'];
$mypassword=$_POST['mypassword'];

$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);

$sql="SELECT * FROM $tbl_name WHERE username='$myusername' and password='$mypassword'";
$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($result,MYSQLI_NUM);
printf ("%s (%s)\n",$row[0],$row[1]);

$row_cnt = $result->num_rows;
printf("Result set has %d rows.\n", $row_cnt);

// If result matched $myusername and $mypassword, table row must be 1 row
if($row_cnt==1){

// Register $myusername, $mypassword and redirect to file "login_success.php"
session_register("myusername");
session_register("mypassword");
header("location:login_success.php");
}
else {
echo "Wrong Username or Password";
}

?>
