<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$data = array();
$sqlcount = ("SELECT SUM(jml_laki) AS jumlaki,
SUM(jml_perempuan) AS jumperempuan,SUM(jml_rawan) AS jumrawan FROM tbl_api_bpbd");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumpenduduk']= $s['jumlaki'] + $s['jumperempuan']- $s['jumrawan'];
	$row_array['jumrawan']= $s['jumrawan'];
	array_push($data,$row_array);

echo json_encode($data);
$resultcount->close();
$dbconn->close();
?>  
