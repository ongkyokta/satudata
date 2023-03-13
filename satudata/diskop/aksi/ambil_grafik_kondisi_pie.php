<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(jml_koperasi_aktif) AS jumAktif, SUM(jml_koperasi_tidakaktif) AS jumTdkAktif, SUM(jml_melapor_rat) AS jumLapor
	FROM diskop WHERE tahun = '".$tahun."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumAktif']=$t['jumAktif'];
	$row_array['jumTdkAktif']=$t['jumTdkAktif'];
	$row_array['jumLapor']=$t['jumLapor'];		
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>