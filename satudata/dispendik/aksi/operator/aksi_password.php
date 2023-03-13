<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

function anti_injection($data){
  global $dbconn;
  $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
  return $filter;
}	
	$iduser = anti_injection(trim($_POST['iduser']));
	$password = anti_injection(trim($_POST['password']));
	$passwordbaru = md5($password);
		
	$sql  = "UPDATE m_operator set password='$passwordbaru' WHERE id_operator='".$iduser."'";
	$res=mysqli_query($dbconn,$sql);
	
	if($res){
		$errMsg .= "SUKSESS !!! Data sudah disimpan !!!";
		$status = 'ok';
	}else{
		$errMsg .= "GAGAL !!! Data tidak bisa disimpan !!!";
		$status = 'err';
	}	
	$data = array('msg1'=>$errMsg,'msg2'=>$status);
	echo json_encode($data);	
	mysqli_free_result($res);
	mysqli_close($dbconn);
?>
