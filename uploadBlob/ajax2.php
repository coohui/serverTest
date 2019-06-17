<?php 
//post方式获取
// header('Content-type:multipart/form-data');  
// $file = file_get_contents('php://input');
// var_dump($file)
// echo 'test'.$file;


//$data = json_decode($file, true);
$stype = isset($_POST['type']) ? $_POST['type'] : 'type失败';
$file= isset($_FILES['file']) ? $_FILES['file']['name'] : 'file失败';
$blob = isset($_POST['blob']) ? $_POST['blob'] : 'blob失败';
$json_array = array('type'=>$stype, 'file' => $file,'blob' => $blob);
$json= json_encode($json_array);
echo $json;
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
/** 二进制流生成文件
    * $_POST 无法解释二进制流，需要用到 $GLOBALS['HTTP_RAW_POST_DATA'] 或 php://input
    * $GLOBALS['HTTP_RAW_POST_DATA'] 和 php://input 都不能用于 enctype=multipart/form-data
    * @param    String  $file   要生成的文件路径
    * @return   boolean
    */
    // function binary_to_file($file){
    //     $content = $GLOBALS['HTTP_RAW_POST_DATA'];  // 需要php.ini设置
    //     if(empty($content)){
    //         $content = file_get_contents('php://input');    // 不需要php.ini设置，内存压力小
    //     }
    //     $ret = file_put_contents($file, $content, true);
    //     return $ret;
    // }
    
    // $pic = binary_to_file('photo/test.png');
    // echo "你的名字：".$pic
?>