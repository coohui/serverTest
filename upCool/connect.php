<?php
$host="localhost";
$db_user="root";
$db_pass="";
$db_name="test";
$timezone="Asia/Shanghai";
// 创建连接
$conn=mysqli_connect($host,$db_user,$db_pass,$db_name);
mysqli_query($conn,'set names utf8');
//header("Content-Type: text/html; charset=utf-8");
date_default_timezone_set($timezone); //北京时间
?>
