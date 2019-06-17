<?php 
$stype = isset($_POST['type']) ? $_POST['type'] : 'type失败';
$file= isset($_FILES['file']) ? $_FILES['file']['name'] : 'file失败';
$blob = isset($_FILES['blob']) ? $_FILES['blob'] : 'blob失败';
$temp = file_get_contents($blob['tmp_name']);
file_put_contents('photo/test.jpeg', $temp ,true);
$json_array = array('type'=>$stype, 'file' => $file,'blob' => $blob['tmp_name']);
$json= json_encode($json_array);
echo $json;
?>