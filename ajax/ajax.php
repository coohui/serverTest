<?php 
header('Content-type:application/json;charset=utf-8');  
$raw = file_get_contents('php://input');
$data = json_decode($raw,true);
echo "你的名字：".$data['name']."，年龄：".$data['age']; 
//echo $name;
//echo "你的名字：".$data['name']."，年龄：".$data['age'];
// if($age<18){
// $sayList[]= array(	
// 	'age'=>$age,
// 	'name'=>$name,
// 	'tips'=>'未成年'
// );	
// }else if($age>=18&&$age<40){
// $sayList[]= array(	
// 	'age'=>$age,
// 	'name'=>$name,
// 	'tips'=>'中年'
// );
// }else if($age>=40){
// $sayList[]= array(	
// 	'age'=>$age,
// 	'name'=>$name,
// 	'tips'=>'老年'
// );
// }

// ini_set('display_errors', 1);
// //echo json_encode($sayList);
// echo 2342;
?>