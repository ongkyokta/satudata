<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT DISTINCT (a.bentuk_pendidikan) AS nmbentuksekolah
		FROM tbl_api_dispendik a");
 $result = mysqli_query($dbconn,$sqlx);
 
 $data = array();
 $totaldetail =0;
 while($t=mysqli_fetch_array($result)){
	
	$sqlcount = ("SELECT COUNT(id) as jumDetSekolah FROM tbl_api_dispendik WHERE bentuk_pendidikan = '".$t['nmbentuksekolah']."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	$totaldetail = $totaldetail + $s['jumDetSekolah'];

	$row_array = array();
	$row_array['nmbentuksekolah']=$t['nmbentuksekolah'];
	$row_array['jumDetSekolah']=$s['jumDetSekolah'];	
	$row_array['totaldetail']=$totaldetail;
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>