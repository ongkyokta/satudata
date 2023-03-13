<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(meninggal) AS jumMeninggal, SUM(luka_berat) AS jumBerat, SUM(luka_ringan) AS jumRingan
	FROM dishub_kecelakaan WHERE tahun = '".$tahun."' AND id_desa='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumMeninggal']=$t['jumMeninggal'];
	$row_array['jumBerat']=$t['jumBerat'];	
	$row_array['jumRingan']=$t['jumRingan'];
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
?>  
