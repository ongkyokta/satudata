<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun= trim($_POST['tahun']);

$data = array();
$sqlcount = ("SELECT SUM(peraturan_daerah_publish) AS jumYa,
SUM(peraturan_daerah_tidak_publish) AS jumTidak FROM bag_hukum WHERE tahun='".$tahun."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumYa']= $s['jumYa'];
	$row_array['jumTidak']= $s['jumTidak'];
	array_push($data,$row_array);

echo json_encode($data);
$resultcount->close();
$dbconn->close();
?>  
