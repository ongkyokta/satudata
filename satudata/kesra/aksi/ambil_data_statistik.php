<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlprod = ("SELECT SUM(IF(tahun='".$tahun."' AND kategori='Penerima HIBAH',organisasi_instansi_penerima + laki_laki + perempuan,0)) AS JumHibah,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Penerima HIBAH',organisasi_instansi_penerima + laki_laki + perempuan,0)) AS JumHibahT,
SUM(IF(tahun='".$tahun."' AND kategori='Bansos Guru Ngaji',organisasi_instansi_penerima + laki_laki + perempuan,0)) AS JumGuru,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Bansos Guru Ngaji',organisasi_instansi_penerima + laki_laki + perempuan,0)) AS JumGuruT,
SUM(IF(tahun='".$tahun."' AND kategori='Bansos P3N (mudin)',organisasi_instansi_penerima + laki_laki + perempuan,0)) AS JumMudin,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Bansos P3N (mudin)',organisasi_instansi_penerima + laki_laki + perempuan,0)) AS JumMudinT
FROM kesra");
$resultprod = mysqli_query($dbconn,$sqlprod);$a= mysqli_fetch_assoc($resultprod);

	$row_array = array();
	$row_array['JumHibah']=$a['JumHibah'];$row_array['JumHibahT']=$a['JumHibahT'];
	$row_array['JumGuru']=$a['JumGuru'];$row_array['JumGuruT']=$a['JumGuruT'];
	$row_array['JumMudin']=$a['JumMudin'];$row_array['JumMudinT']=$a['JumMudinT'];
	
	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);
	
  echo json_encode($data);
  $resultprod->close();
  $dbconn->close();
?>