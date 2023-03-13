<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);
$data = array();
$sqlx = ("SELECT COUNT(IF(bansos_bnpt='YA',0,null)) AS jmlbnpt,COUNT(IF(bansos_pkh='YA',0,null)) AS jmlpkh,COUNT(IF(bansos_ppkm='YA',0,null)) AS jmlppkm,COUNT(IF(pbi_jkn='YA',0,null)) AS jmljkn
FROM tbl_api_dinsos WHERE id_desa='".$iddesa."'");
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

$sqlx2 = ("SELECT SUM(jml_penduduk) AS jmlpenduduk FROM tbl_api_dispenduk_desa WHERE id_desa='".$iddesa."'");
$resultx2 = mysqli_query($dbconn,$sqlx2);$r= mysqli_fetch_assoc($resultx2);

 
$row_array = array();
$row_array['jmlbnpt']=$row['jmlbnpt'];
$row_array['jmlpkh']=$row['jmlpkh'];
$row_array['jmlppkm']=$row['jmlppkm'];
$row_array['jmljkn']=$row['jmljkn'];
$row_array['jmlbansos']=$row['jmlbnpt']+$row['jmlpkh']+$row['jmlppkm']+$row['jmljkn'];
$row_array['jmlpenduduk']=$r['jmlpenduduk'];

array_push($data,$row_array);

echo json_encode($data);
$resultx->close();$resultx2->close();
$dbconn->close();
?>