<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(kades_tamatan_smp) AS jumSMP, SUM(kades_tamatan_sma) AS jumSMA, SUM(kades_tamatan_sma_ke_atas) AS jumSarjana
	FROM dispemasdes WHERE tahun = '".$tahun."' AND id_kecamatan = '".$idarea."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumSMP']=$t['jumSMP'];
	$row_array['jumSMA']=$t['jumSMA'];$row_array['jumSarjana']=$t['jumSarjana'];		
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>