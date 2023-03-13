<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT desa FROM tbl_api_bpbd GROUP BY desa ASC");
$result = mysqli_query($dbconn,$sqlx);
$idne=100;
	while($t=mysqli_fetch_array($result)){
		$nmdesa = $t['desa'];
		$idne++;
		$sql2  = "UPDATE tbl_api_bpbd SET id_desa='$idne'
				WHERE desa='".$nmdesa."'"; 
				$res=mysqli_query($dbconn,$sql2);	
		if($res){
			$errMsg = "SUKSESS !!! Data sudah disimpan !!!";
			$status = 'ok';
		}else{
			$errMsg = "GAGAL !!! Data tidak bisa disimpan !!!";
			$status = 'err';
		}
	}			
	$data = array('msg1'=>$errMsg,'msg2'=>$status);
	echo json_encode($data);
	
	mysqli_free_result($res);
	mysqli_close($dbconn);
 ?>