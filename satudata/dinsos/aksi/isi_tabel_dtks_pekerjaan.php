<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT DISTINCT (pekerjaan) AS nmpekerjaan FROM tbl_api_dinsos");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){

	$sqlx2 = ("SELECT COUNT(IF(bansos_bnpt='YA',0,null)) AS jumBNPT, COUNT(IF(bansos_pkh='YA',0,null)) AS jumPKH, COUNT(IF(bansos_ppkm='YA',0,null)) AS jumPPKM,
	COUNT(IF(pbi_jkn='YA',0,null)) AS jumJKN
	FROM tbl_api_dinsos WHERE pekerjaan='".$t['nmpekerjaan']."'");
	$result2 = mysqli_query($dbconn,$sqlx2);
	$c= mysqli_fetch_assoc($result2);

	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmpekerjaan']=ucwords(strtolower($t['nmpekerjaan']));
	$row_array['jumBNPT']=number_format($c['jumBNPT'],0,".",",");
	$row_array['jumPKH']=number_format($c['jumPKH'],0,".",",");
	$row_array['jumPPKM']=number_format($c['jumPPKM'],0,".",",");
	$row_array['jumJKN']=number_format($c['jumJKN'],0,".",",");

	$row_array['jmlbansos']=number_format($c['jumBNPT']+$c['jumPKH']+$c['jumPPKM']+$c['jumJKN'],0,".",",");
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();$result2->close();
$dbconn->close();
 ?>