<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqladu = ("SELECT SUM(IF(tahun='".$tahun."',jml_pengaduan_anak,0)) AS JumAduA,SUM(IF(tahun='".$tahun."',jml_pengaduan_perempuan,0)) AS JumAduP,
SUM(IF(tahun='".$thnsebelumnya."',jml_pengaduan_anak,0)) AS JumAduAT,SUM(IF(tahun='".$thnsebelumnya."',jml_pengaduan_perempuan,0)) AS JumAduPT,

SUM(IF(tahun='".$tahun."',jml_penyelesaian_pengaduan_anak,0)) AS JumAduSelesaiA,SUM(IF(tahun='".$tahun."',jml_penyelesaian_pengaduan_perempuan,0)) AS JumAduSelesaiP,
SUM(IF(tahun='".$thnsebelumnya."',jml_penyelesaian_pengaduan_anak,0)) AS JumAduSelesaiAT,SUM(IF(tahun='".$thnsebelumnya."',jml_penyelesaian_pengaduan_perempuan,0)) AS JumAduSelesaiPT
FROM dp3akb_pengaduan");
$resultadu = mysqli_query($dbconn,$sqladu);$a= mysqli_fetch_assoc($resultadu);

	$row_array = array();
	$row_array['JumAduA']=$a['JumAduA'];$row_array['JumAduP']=$a['JumAduP'];	
	$row_array['JumAduAT']=$a['JumAduAT'];$row_array['JumAduPT']=$a['JumAduPT'];
	
	$row_array['JumAduSelesaiA']=$a['JumAduSelesaiA'];$row_array['JumAduSelesaiP']=$a['JumAduSelesaiP'];	
	$row_array['JumAduSelesaiAT']=$a['JumAduSelesaiAT'];$row_array['JumAduSelesaiPT']=$a['JumAduSelesaiPT'];
	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultadu->close();
  $dbconn->close();
?>