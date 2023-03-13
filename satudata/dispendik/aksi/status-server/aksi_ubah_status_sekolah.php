<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

function anti_injection($data){
  global $dbconn;
  $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
  return $filter;
}	

	$idsekolah = anti_injection(trim($_POST['idsekolah']));
	$ubahstts = strtolower(trim($_POST['ubahstts']));
	
	$sql  = "UPDATE tbl_api_dispendik SET stts_upload='$ubahstts' WHERE id='".$idsekolah."'";
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
