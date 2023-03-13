<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT DISTINCT (pekerjaan) AS nmbentuk FROM tbl_api_dinsos");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		

	$sqlcount = ("SELECT COUNT(IF(bansos_bpnt='YA',0,null)) AS jumA, COUNT(IF(bansos_pkh='YA',0,null)) AS jumB, COUNT(IF(bansos_ppkm='C',0,null)) AS jumC
			, COUNT(IF(pbi_jkn='YA',0,null)) AS jumBelum, COUNT(IF(bansos_bpnt='-' OR bansos_pkh='-' OR bansos_ppkm='-' OR pbi_jkn='-',0,null)) AS jumTidak
			FROM tbl_api_dinsos WHERE pekerjaan = '".$t['nmbentuk']."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['nmbentuk']=$t['nmbentuk'];
	$row_array['jumA']= $s['jumA'];$row_array['jumB']= $s['jumB'];$row_array['jumC']= $s['jumC'];
	$row_array['jumBelum']= $s['jumBelum'];$row_array['jumTidak']= $s['jumTidak'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
