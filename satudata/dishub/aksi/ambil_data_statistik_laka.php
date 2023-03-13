<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlx = ("SELECT SUM(IF(tahun='".$tahun."',meninggal,0)) AS JumMeninggal,SUM(IF(tahun='".$tahun."',luka_berat,0)) AS JumBerat,
SUM(IF(tahun='".$tahun."',luka_ringan,0)) AS JumRingan,
SUM(IF(tahun='".$thnsebelumnya."',meninggal,0)) AS JumMeninggalT,SUM(IF(tahun='".$thnsebelumnya."',luka_berat,0)) AS JumBeratT,
SUM(IF(tahun='".$thnsebelumnya."',luka_ringan,0)) AS JumRinganT
FROM dishub_kecelakaan");
$resultx = mysqli_query($dbconn,$sqlx);$t= mysqli_fetch_assoc($resultx);

if( $t['JumMeninggal'] == NULL OR $t['JumMeninggal'] == 0){$meninggal = 0;} else {$meninggal = $t['JumMeninggal'];}
if( $t['JumMeninggalT'] == NULL OR $t['JumMeninggalT'] == 0){$meninggalT = 0;} else {$meninggalT = $t['JumMeninggalT'];}

if( $t['JumBerat'] == NULL OR $t['JumBerat'] == 0){$berat = 0;} else {$berat = $t['JumBerat'];}
if( $t['JumBeratT'] == NULL OR $t['JumBeratT'] == 0){$beratT = 0;} else {$beratT = $t['JumBeratT'];}

if( $t['JumRingan'] == NULL OR $t['JumRingan'] == 0){$ringan = 0;} else {$ringan = $t['JumRingan'];}
if( $t['JumRinganT'] == NULL OR $t['JumRinganT'] == 0){$ringanT = 0;} else {$ringanT = $t['JumRinganT'];}

	$row_array = array();
	$row_array['JumMeninggal']=$meninggal;$row_array['JumBerat']=$berat;$row_array['JumRingan']=$ringan;
	$row_array['JumMeninggalT']=$meninggalT;$row_array['JumBeratT']=$beratT;$row_array['JumRinganT']=$ringanT;	
	
	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>