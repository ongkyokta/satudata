<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

 $data = array();
	$sqlcount = ("SELECT COUNT(IF(bansos_bnpt='YA',0,null)) AS jumbnpt, COUNT(IF(bansos_pkh='YA',0,null)) AS jumpkh,
		COUNT(IF(bansos_ppkm='YA',0,null)) AS jumppkm, COUNT(IF(pbi_jkn='YA',0,null)) AS jumjkn 
		FROM tbl_api_dinsos");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumbnpt']=$t['jumbnpt'];
	$row_array['jumpkh']=$t['jumpkh'];	
	$row_array['jumppkm']=$t['jumppkm'];	
	$row_array['jumjkn']=$t['jumjkn'];	
	$row_array['jumtotal']=$t['jumbnpt'] + $t['jumpkh'] + $t['jumppkm'] + $t['jumjkn'];
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>