<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun= trim($_POST['tahun']);

$data = array();
$sqlx = ("SELECT SUM(keputusan_bupati_publish) AS jmlkeppublish,SUM(keputusan_bupati_tidak_publish) AS jmlkeptdkpublish,
SUM(peraturan_bupati_publish) AS jmlperbubpublish,SUM(peraturan_bupati_tidak_publish) AS jmlperbubtdkpublish,
SUM(peraturan_daerah_publish) AS jmlperdapublish,SUM(peraturan_daerah_tidak_publish) AS jmlperdatdkpublish,
SUM(sosialisasi_produk_hukum) AS jmlprod,SUM(penyuluhan_hukum) AS jmlsuluh,
SUM(pengurusan_perkara) AS jmlperkara,SUM(pembinaan_kelompok_kadarkum) AS jmlkadarkum,
SUM(bimtek) AS jmlbimtek
FROM bag_hukum WHERE tahun='".$tahun."'");
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

	$row_array = array();
  $row_array['jumkeputusan']=$row['jmlkeppublish']+$row['jmlkeptdkpublish'];
  $row_array['jumperaturan']=$row['jmlperbubpublish']+$row['jmlperbubtdkpublish'];
  $row_array['jumperda']=$row['jmlperdapublish']+$row['jmlperdatdkpublish'];
  
  $row_array['jumkinerja']=$row['jmlprod']+$row['jmlsuluh']+$row['jmlperkara']+$row['jmlkadarkum']+$row['jmlbimtek'];

	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>