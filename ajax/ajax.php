<?php 
//post方式获取
header('Content-type:application/json;charset=utf-8');  
$raw = file_get_contents('php://input');
$data = json_decode($raw,true);
echo "你的名字：".$data['name']."，年龄：".$data['age']; 
//get方式获取
//echo "你的名字：".$_GET['name']."，年龄：".$_GET['age']; 
?>