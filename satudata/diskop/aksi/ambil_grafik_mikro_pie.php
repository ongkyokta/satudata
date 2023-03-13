<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(jml_usaha_mikro) AS jumMikro, SUM(jml_koperasi) AS jumKop
	FROM diskop WHERE tahun = '".$tahun."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumMikro']=$t['jumMikro'];
	$row_array['jumKop']=$t['jumKop'];		
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>