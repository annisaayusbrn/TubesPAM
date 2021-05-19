<?php
$servername = "localhost";
$passsword = "";
$username = "root";
$database = "tubespam";

$conn = new mysqli($servername, $username, $passsword, $database);

if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}
?>