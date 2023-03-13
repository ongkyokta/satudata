<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sqlx = ("SELECT DISTINCT (stts_sertifikat) AS nmbentuk FROM det_kib_a");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		

	if ($keterangan=="kota"){
		$sqlcount = ("SELECT COUNT(stts_sertifikat) AS jumAset FROM det_kib_a WHERE stts_sertifikat = '".$t['nmbentuk']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="kecamatan"){
		$sqlcount = ("SELECT COUNT(stts_sertifikat) AS jumAset FROM det_kib_a WHERE stts_sertifikat = '".$t['nmbentuk']."' AND id_kecamatan = '".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="desa"){
		$sqlcount = ("SELECT COUNT(stts_sertifikat) AS jumAset FROM det_kib_a WHERE stts_sertifikat = '".$t['nmbentuk']."' AND id_desa = '".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	}

	$row_array = array();
	$row_array['nmbentuk']=ucwords(strtolower($t['nmbentuk']));
	$row_array['jumAset']= $s['jumAset'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
