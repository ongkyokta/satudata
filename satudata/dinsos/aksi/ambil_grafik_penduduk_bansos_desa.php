<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);

$data = array();
	$sqlcount = ("SELECT COUNT(IF(bansos_bnpt='YA',0,null)) AS jumbnpt, COUNT(IF(bansos_pkh='YA',0,null)) AS jumpkh,
		COUNT(IF(bansos_ppkm='YA',0,null)) AS jumppkm, COUNT(IF(pbi_jkn='YA',0,null)) AS jumjkn 
		FROM tbl_api_dinsos WHERE id_desa='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$sqlcount2 = ("SELECT SUM(jml_penduduk) AS jumpenduduk FROM tbl_api_dispenduk_desa WHERE id_desa='".$iddesa."'");
	$resultcount2 = mysqli_query($dbconn,$sqlcount2);$c= mysqli_fetch_assoc($resultcount2);

	$row_array = array();
	$row_array['jumtotal']=$t['jumbnpt'] + $t['jumpkh'] + $t['jumppkm'] + $t['jumjkn'];
	$row_array['jumpenduduk']=$c['jumpenduduk'];
	$row_array['jumtidakterima']=$c['jumpenduduk']-($t['jumbnpt'] + $t['jumpkh'] + $t['jumppkm'] + $t['jumjkn']);
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();$resultcount2->close();
$dbconn->close();
?>  
