<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(kb_aktif_pb_sm) AS jumAktifTotalSM, SUM(kb_aktif_pb_mke) AS jumAktifTotalMKE
	FROM dp3akb_kekerasan WHERE tahun = '".$tahun."' AND id_kecamatan='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumAktifTotalSM']=$t['jumAktifTotalSM'];
	$row_array['jumAktifTotalMKE']=$t['jumAktifTotalMKE'];
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
?>  
