<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

 $data = array();
	
	$sqlcount = ("SELECT SUM(sosialisasi_produk_hukum) as jumsosialisasi,SUM(penyuluhan_hukum) as jumpenyuluhan,
	SUM(pengurusan_perkara) as jumperkara,SUM(pembinaan_kelompok_kadarkum) as jumkadarkum,SUM(bimtek) as jumbimtek
	 FROM bag_hukum");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumsosialisasi']=$s['jumsosialisasi'];$row_array['jumpenyuluhan']=$s['jumpenyuluhan'];
	$row_array['jumperkara']=$s['jumperkara'];$row_array['jumkadarkum']=$s['jumkadarkum'];
	$row_array['jumbimtek']=$s['jumbimtek'];
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>