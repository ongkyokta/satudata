<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT kecamatan FROM tbl_api_dinsos GROUP BY kecamatan ASC");
$result = mysqli_query($dbconn,$sqlx);
$idne=0;
	while($t=mysqli_fetch_array($result)){
		$nmkecamatan = $t['kecamatan'];
		$idne++;
		$sql2  = "UPDATE tbl_api_dinsos SET id_kecamatan='$idne'
				WHERE kecamatan='".$nmkecamatan."'"; 
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