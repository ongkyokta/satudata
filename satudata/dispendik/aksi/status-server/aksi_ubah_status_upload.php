<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

function anti_injection($data){
  global $dbconn;
  $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
  return $filter;
}	

	$sttsmode = strtolower(trim($_POST['sttsmode']));

	$sql  = "UPDATE tbl_api_dispendik SET stts_upload='$sttsmode'";
	$res=mysqli_query($dbconn,$sql);

	$sql2  = "UPDATE set_server SET stts_upload='$sttsmode'";
	$res=mysqli_query($dbconn,$sql2);
	
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
