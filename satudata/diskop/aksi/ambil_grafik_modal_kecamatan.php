<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(modal_sendiri) AS jumSendiri, SUM(modal_luar) AS jumLuar, SUM(aset) AS jumAset
	FROM diskop WHERE tahun = '".$tahun."' AND id_kecamatan='".$idarea."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumSendiri']=$t['jumSendiri'];
	$row_array['jumLuar']=$t['jumLuar'];	
	$row_array['jumAset']=$t['jumAset'];		
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>