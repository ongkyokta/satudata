<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(jml_kasipem) AS jumKasipem, SUM(jml_kasi_kesejahteraan) AS jumKasiKes,SUM(jml_kasipel) AS jumKasipel, SUM(jml_kasun_kaling) AS jumKasun
	FROM dispemasdes WHERE tahun = '".$tahun."' AND id_kecamatan = '".$idarea."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumKasipem']=$t['jumKasipem'];
	$row_array['jumKasiKes']=$t['jumKasiKes'];	
	$row_array['jumKasipel']=$t['jumKasipel'];	
	$row_array['jumKasun']=$t['jumKasun'];			
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>