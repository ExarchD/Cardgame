<?php
session_start();
if ( !isset( $_SESSION['user'] ) ){
header("location:main_login.php");
}
?>

<html>
<body>
Login Successful
</body>
</html>
