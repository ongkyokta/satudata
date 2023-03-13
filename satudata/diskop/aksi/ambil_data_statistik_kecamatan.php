<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlprod = ("SELECT SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',jml_usaha_mikro,0)) AS JumMikro,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',jml_usaha_mikro,0)) AS JumMikroT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',jml_koperasi,0)) AS JumKoperasi,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',jml_koperasi,0)) AS JumKoperasiT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',jml_anggota,0)) AS JumAnggota,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',jml_anggota,0)) AS JumAnggotaT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',jml_karyawan,0)) AS JumKary,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',jml_karyawan,0)) AS JumKaryT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',modal_sendiri,0)) AS JumModalSendiri,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',modal_sendiri,0)) AS JumModalSendiriT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',modal_luar,0)) AS JumModalLuar,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',modal_luar,0)) AS JumModalLuarT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',aset,0)) AS JumAset,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',aset,0)) AS JumAsetT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',volume_usaha,0)) AS JumVol,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',volume_usaha,0)) AS JumVolT,
SUM(IF(tahun='".$tahun."' AND id_kecamatan='".$idarea."',shu,0)) AS JumSHU,SUM(IF(tahun='".$thnsebelumnya."' AND id_kecamatan='".$idarea."',shu,0)) AS JumSHUT
 FROM diskop");
$resultprod = mysqli_query($dbconn,$sqlprod);$a= mysqli_fetch_assoc($resultprod);

	$row_array = array();
	$row_array['JumMikro']=$a['JumMikro'];$row_array['JumMikroT']=$a['JumMikroT'];
	$row_array['JumKoperasi']=$a['JumKoperasi'];$row_array['JumKoperasiT']=$a['JumKoperasiT'];
	$row_array['JumAnggota']=$a['JumAnggota'];$row_array['JumAnggotaT']=$a['JumAnggotaT'];
	$row_array['JumKary']=$a['JumKary'];$row_array['JumKaryT']=$a['JumKaryT'];
	$row_array['JumVol']=$a['JumVol'];$row_array['JumVolT']=$a['JumVolT'];
	$row_array['JumSHU']=$a['JumSHU'];$row_array['JumSHUT']=$a['JumSHUT'];

	$row_array['JumTotModal']=$a['JumModalSendiri']+$a['JumModalLuar']+$a['JumAset'];
	$row_array['JumTotModalT']=$a['JumModalSendiriT']+$a['JumModalLuarT']+$a['JumAsetT'];
	
	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);
	
  echo json_encode($data);
  $resultprod->close();
  $dbconn->close();
?>