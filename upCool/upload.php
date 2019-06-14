<?php
header("Content-type: text/html; charset=utf-8"); 
require_once('connect.php');
/*   $sql ="insert into coolup (name) values ('aaa')";
   mysqli_query($conn,$sql);
$fileCd='14979243746211230302';
$upIndex=66;
$upProgress=90;
$complete=1;
$sql ="update coolup SET upIndex=$upIndex,complete=$complete,upProgress=$upProgress WHERE cd=$fileCd";
$result=mysqli_query($conn,$sql);
   exit();*/
//session_start();
$fileCd=isset($_POST['cd'])?$_POST['cd']:null;
$len=isset($_POST['len'])?$_POST['len']:null;
$index=isset($_POST['index'])?intval($_POST['index']):0;

$tSize=isset($_POST['tSize'])?intval($_POST['tSize']):0;
$start=isset($_POST['start'])?intval($_POST['start']):0;
$index=isset($_POST['index'])?intval($_POST['index']):0;
$name=isset($_POST['name'])?$_POST['name']:'';
//var_dump($len);
//var_dump($len);
$filename="upload/".$name;

$sql ="select * from coolup where cd=$fileCd;";
$result=mysqli_query($conn,$sql);
if(!$fileCd){
	$sayList[]= array(	
	'name'=>$name,
	'tSize'=>$tSize,
	'cd'=>$fileCd,
	'tm'=>date('Y-m-d'),
	'start'=>$start,
	'index'=>$len,
	'complete'=>false,
	'type'=>'cd值不对'
	);	
}
//var_dump($result);
//var_dump($result->num_rows);
if($result&&$result->num_rows>0)//有上传过
{
	$row=$result->fetch_array();
	if($row['complete']){//服务器已经存在完整的文件
		while($row){
			$sayList[]= array(	
			'name'=>$row['name'],
			'tSize'=>$row['tSize'],
			'cd'=>$row['cd'],
			'tm'=>$row['tm'],
			'start'=>$row['tSize'],
			'index'=>$len,
			'complete'=>$row['complete'],
			'type'=>'服务器已经存在完整的文件'
			);	
			break;
		}
	}else{//服务器存在文件但不完整，则继续上传
		//$tSize=funConversionUnit($tSize);
		if($len>=$index){
			$complete=0;
			if($start!=0){
				$upProgress=$start/$tSize;
				$name=iconv("UTF-8","gb2312",$name);
				file_put_contents("upload/".$name,file_get_contents($_FILES['sFile']['tmp_name']),FILE_APPEND);
				$name=iconv("gb2312","UTF-8",$name);
				$upIndex=intval($index)+1;	
			}else{
                $upIndex=intval($row['upIndex'])+intval($index)+1;	
			}
		}else{
		   $complete=1;	
		}
		$sayList[]= array(	
			'name'=>$name,
			'tSize'=>$tSize,
			'cd'=>$fileCd,
			'tm'=>date('Y-m-d'),
			'start'=>$start,
			'index'=>$upIndex,
			'complete'=>$complete,
			'type'=>'服务器存在文件但不完整，则继续上传'
		);
	    $sql ="update coolup SET upIndex='$upIndex',complete='$complete',upProgress='$upProgress' WHERE cd=$fileCd";
	       //var_dump($sql);
	    $result=mysqli_query($conn,$sql);
	}
}else{//未上传过
	$name=iconv("UTF-8","gb2312",$name);
	file_put_contents("upload/".$name,file_get_contents($_FILES['sFile']['tmp_name']),FILE_APPEND);
	$name=iconv("gb2312","UTF-8",$name);
	$upIndex=$index+1;
	$complete=($len>=$upIndex)?1:0;
	$sayList[]= array(	
		'name'=>$_POST['name'],
		'tSize'=>$tSize,    
		'cd'=>$fileCd,
		'tm'=>date('Y-m-d'),
		'start'=>$start,
		'index'=>$upIndex,
		'complete'=>$complete,
		'type'=>'未上传过'
	);
   $tm=date('Y-m-d');
   $upProgress=$start/$tSize;
   $sql ="insert into coolup (name,tSize,cd,tm,start,upIndex,complete,path,upProgress,len) values ('$name','$tSize','$fileCd','$tm','$start','$upIndex','$complete','$filename','$upProgress','$len')";
   mysqli_query($conn,$sql);
}
/*function upload(){
	$name=iconv("UTF-8","gb2312",$name);
	file_put_contents("upload/".$name,file_get_contents($_FILES['sFile']['tmp_name']),FILE_APPEND);
	$name=iconv("gb2312","UTF-8",$name);

	$sayList[]= array(	
		'name'=>$_POST['name'], 
		'tSize'=>$tSize,     
		'cd'=>$fileCd, 
		'tm'=>date('Y-m-d'),
		'start'=>$start,
		'index'=>$index+1
	);
};*/

function funConversionUnit($num){//转换单位
  if($num/1024>1024){
      $num=round($num/1048576,2)+'Mb'; 
  }else {
      $num=round($num/1024,2)+'Kb';  
  }
  return $num;
}
echo json_encode($sayList);
mysqli_close($conn);
ini_set('display_errors',1);
exit();
	//$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
		if (1) {
/*			file_put_contents(
				'uploads/' . $fn,
				file_get_contents('php://input')
			);*/
			file_put_contents('1.jpg',file_get_contents($_FILES['file']['tmp_name']),FILE_APPEND);
			echo "uploads/$fn";
		}else{
			if(is_uploaded_file($_FILES['pic']['tmp_name']))
			{
			  //你可以加上，文件类型，大小等判断
			  if(move_uploaded_file($_FILES['pic']['tmp_name'], 'uploads2.jpg'))
			  {
			    //这就算上传成功了
			    echo '成功！';
			  }
			  else
			  {
			    //上传失败了
			    echo '失败！';
			  }
			}
			echo 'attach:'.$_FILES['pic']['name'].':'.$_POST['name'];
            move_uploaded_file($_FILES['pic']['name'],'uploads/' . $_FILES['pic']['name']);
		}
//}else
//{
	//echo '0';
	//exit;
//}
//mysqli_close($conn);
//ini_set('display_errors', 1);
?>













