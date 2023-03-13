<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT DISTINCT nm_komoditas FROM tbl_api_disperta WHERE jenis='Holtikultura' AND nm_komoditas='Bawang Merah'
		OR jenis='Holtikultura' AND nm_komoditas='Cabe Besar' OR  jenis='Holtikultura' AND nm_komoditas='Cabe Rawit'
		OR  jenis='Holtikultura' AND nm_komoditas='tomat'");
 $result = mysqli_query($dbconn,$sqlx);
 $data = array();
 $totaldetail =0;
 while($t=mysqli_fetch_array($result)){

	$sqlcount = ("SELECT SUM(hasil) AS jumDetSekolah FROM tbl_api_disperta WHERE nm_komoditas = '".$t['nm_komoditas']."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	$totaldetail = $totaldetail + $s['jumDetSekolah'];

	$row_array = array();
	$row_array['nmbentuksekolah']=$t['nm_komoditas'];
	$row_array['jumDetSekolah']=round($s['jumDetSekolah'],1);
	$row_array['totaldetail']=$totaldetail;
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>