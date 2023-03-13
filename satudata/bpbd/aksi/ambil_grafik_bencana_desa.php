<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);

$sqlx = ("SELECT DISTINCT (ancaman_bahaya) AS nmancaman FROM tbl_api_bpbd WHERE id_desa='".$iddesa."'");
 $result = mysqli_query($dbconn,$sqlx);
 $data = array();
 $totaldetail =0;
 while($t=mysqli_fetch_array($result)){
	
	$sqlcount = ("SELECT SUM(jml_rawan) as jumDetSekolah FROM tbl_api_bpbd WHERE ancaman_bahaya = '".$t['nmancaman']."' AND id_desa='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	$totaldetail = $totaldetail + $s['jumDetSekolah'];

	$row_array = array();
	$row_array['nmbentuksekolah']=$t['nmancaman'];
	$row_array['jumDetSekolah']=$s['jumDetSekolah'];	
	$row_array['totaldetail']=$totaldetail;
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>