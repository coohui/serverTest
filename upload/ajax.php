<?php 
//post方式获取
// header('Content-type:multipart/form-data');  
// $raw = file_get_contents('php://input');
$file = basename($_POST['file']);  //php的basename() 方法可获取文件名
$json_array = array('file'=>$file ); //转换成数组类型
$json= json_encode($json_array);  //将数组转换成json对象
echo  $json;
// $data = json_decode($file,true);
// echo "你的名字：".$raw
//get方式获取
//echo "你的名字：".$_GET['name']."，年龄：".$_GET['age']; 
// if(isset($_GET['upload']) && $_GET['upload'] == 'img'){
//     //二进制数据流
//     $data = file_get_contents ( 'php://input' );    // 不需要php.ini设置，内存压力小
//     if(empty($data)){
//         $data = gzuncompress ( $GLOBALS ['HTTP_RAW_POST_DATA'] );    // 需要php.ini设置
//     }
//     if(imagecreatefromstring($data) == false){
//         exit('图片已损坏');
//     }
//     $filename=time().'.png';
//     $ret = file_put_contents($filename, $data, true);
//     exit('http://'.$_SERVER['HTTP_HOST'].'/'.$filename);
// }
?>