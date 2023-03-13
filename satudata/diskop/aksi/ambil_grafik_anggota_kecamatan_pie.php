<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(jml_anggota) AS jumAnggota, SUM(jml_karyawan) AS jumKaryawan
	FROM diskop WHERE tahun = '".$tahun."' AND id_kecamatan = '".$idarea."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumAnggota']=$t['jumAnggota'];
	$row_array['jumKaryawan']=$t['jumKaryawan'];			
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>