<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sqlx = ("SELECT DISTINCT (a.jenis_kib) AS nmbentuksekolah
		FROM trans_kib a");
 $result = mysqli_query($dbconn,$sqlx);
 
 $data = array();
 $totaldetail =0;
 while($t=mysqli_fetch_array($result)){

	if ($keterangan=="kota"){
		$sqlcount = ("SELECT COUNT(id_kib) as jumDetSekolah FROM trans_kib WHERE jenis_kib = '".$t['nmbentuksekolah']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		$totaldetail = $totaldetail + $s['jumDetSekolah'];
	} else if ($keterangan=="kecamatan"){
		$sqlcount = ("SELECT COUNT(id_kib) as jumDetSekolah FROM trans_kib WHERE jenis_kib = '".$t['nmbentuksekolah']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		$totaldetail = $totaldetail + $s['jumDetSekolah'];
	} else if ($keterangan=="desa"){
		$sqlcount = ("SELECT COUNT(id_kib) as jumDetSekolah FROM trans_kib WHERE jenis_kib = '".$t['nmbentuksekolah']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		$totaldetail = $totaldetail + $s['jumDetSekolah'];
	}

	$row_array = array();
	$row_array['nmbentuksekolah']="KIB-".$t['nmbentuksekolah'];
	$row_array['jumDetSekolah']=$s['jumDetSekolah'];	
	$row_array['totaldetail']=$totaldetail;
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>