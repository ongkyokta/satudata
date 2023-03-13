<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT id,npsn FROM tbl_api_dispendik");
$result = mysqli_query($dbconn,$sqlx);
while($t=mysqli_fetch_array($result)){
	
	$idsekolah = $t['id'];$npsn = $t['npsn'];

	$sql4  = "INSERT INTO tbl_media (id,npsn) VALUES ('$idsekolah','$npsn')";
	$res=mysqli_query($dbconn,$sql4);
}

if($res){
	$errMsg = "SUKSESS !!! Data sudah disimpan !!!";
	$status = 'ok';
}else{
	$errMsg = "GAGAL !!! Data tidak bisa disimpan !!!";
	$status = 'err';
}
				
$data = array('msg1'=>$errMsg,'msg2'=>$status);
echo json_encode($data);
	
mysqli_free_result($res);mysqli_free_result($result);
mysqli_close($dbconn);
?>
