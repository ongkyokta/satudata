<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$data = array();
 $sqlx = ("SELECT id_jenis,nm_jenis_wisata FROM m_jenis_wisata");
 $result = mysqli_query($dbconn,$sqlx);
 
 $data = array();
 while($t=mysqli_fetch_array($result)){

	if ($keterangan=="kota"){
		$sqlcount = ("SELECT COUNT(id_tempat) as jumTempat FROM m_tempat WHERE id_jenis = '".$t['id_jenis']."' AND jenis='wisata'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="kecamatan"){
		$sqlcount = ("SELECT COUNT(id_tempat) as jumTempat FROM m_tempat WHERE id_jenis = '".$t['id_jenis']."' AND jenis='wisata' AND id_kecamatan='".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	}

	$row_array = array();
	$row_array['nmjenis']=$t['nm_jenis_wisata'];
	$row_array['jumTempat']=$s['jumTempat'];	
	array_push($data,$row_array);
} 

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>