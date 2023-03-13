<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sqlx = ("SELECT DISTINCT (a.id_kategori) AS idkategori,(a.nm_kategori) AS nmkategori
		FROM m_kategori a");
 $result = mysqli_query($dbconn,$sqlx);
 
 $data = array();
 $totaldetail =0;
 while($t=mysqli_fetch_array($result)){
	
	if ($keterangan=="kota"){
		$sqlcount = ("SELECT COUNT(id) as jumAset FROM det_kib_a WHERE id_kategori = '".$t['idkategori']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="kecamatan"){
		$sqlcount = ("SELECT COUNT(id) as jumAset FROM det_kib_a WHERE id_kategori = '".$t['idkategori']."' AND id_kecamatan='".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="desa"){
		$sqlcount = ("SELECT COUNT(id) as jumAset FROM det_kib_a WHERE id_kategori = '".$t['idkategori']."' AND id_desa='".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	}

	$row_array = array();
	$row_array['nmkategori']=$t['nmkategori'];
	$row_array['jumAset']=$s['jumAset'];	
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>