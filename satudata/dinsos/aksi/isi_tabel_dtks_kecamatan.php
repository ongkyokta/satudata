<?php
//error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');
$idkecamatan= trim($_POST['idarea']);

$sqlx = ("SELECT DISTINCT id_desa,desa FROM tbl_api_dinsos WHERE id_kecamatan='".$idkecamatan."'");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	
	$sqlx3 = ("SELECT SUM(jml_penduduk) AS jmlpenduduk FROM tbl_api_dispenduk_desa WHERE id_desa='".$t['id_desa']."'");
	$resultx3 = mysqli_query($dbconn,$sqlx3);$r= mysqli_fetch_assoc($resultx3);

	$sqlx2 = ("SELECT COUNT(IF(bansos_bnpt='YA',0,null)) AS jumBNPT, COUNT(IF(bansos_pkh='YA',0,null)) AS jumPKH, COUNT(IF(bansos_ppkm='YA',0,null)) AS jumPPKM,
	COUNT(IF(pbi_jkn='YA',0,null)) AS jumJKN
	FROM tbl_api_dinsos WHERE id_desa='".$t['id_desa']."'");
	$result2 = mysqli_query($dbconn,$sqlx2);
	$c= mysqli_fetch_assoc($result2);

	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmkecamatan']="Desa ".ucwords(strtolower($t['desa']));
	$row_array['jumBNPT']=number_format($c['jumBNPT'],0,".",",");
	$row_array['jumPKH']=number_format($c['jumPKH'],0,".",",");
	$row_array['jumPPKM']=number_format($c['jumPPKM'],0,".",",");
	$row_array['jumJKN']=number_format($c['jumJKN'],0,".",",");

	$row_array['jmlbansos']=number_format($c['jumBNPT']+$c['jumPKH']+$c['jumPPKM']+$c['jumJKN'],0,".",",");
	$row_array['jmlpenduduk']=number_format($r['jmlpenduduk'],0,".",",");
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();$result2->close();$resultx3->close();
$dbconn->close();
 ?>