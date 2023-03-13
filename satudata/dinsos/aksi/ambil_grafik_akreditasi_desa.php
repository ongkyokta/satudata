<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['iddesa']);

$sqlx = ("SELECT DISTINCT (bentuk_pendidikan) AS nmbentuk FROM tbl_api_dispendik WHERE id_desa='".$iddesa."'");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		

	$sqlcount = ("SELECT COUNT(IF(akreditasi='A',0,null)) AS jumA, COUNT(IF(akreditasi='B',0,null)) AS jumB, COUNT(IF(akreditasi='C',0,null)) AS jumC
			, COUNT(IF(akreditasi='Belum Terakreditasi',0,null)) AS jumBelum, COUNT(IF(akreditasi='Tidak Terakreditasi',0,null)) AS jumTidak
			FROM tbl_api_dispendik WHERE bentuk_pendidikan = '".$t['nmbentuk']."' AND id_desa='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['nmbentuk']=$t['nmbentuk'];
	$row_array['jumA']= $s['jumA'];$row_array['jumB']= $s['jumB'];$row_array['jumC']= $s['jumC'];
	$row_array['jumBelum']= $s['jumBelum'];$row_array['jumTidak']= $s['jumTidak'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
