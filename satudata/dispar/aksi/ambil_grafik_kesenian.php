<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sqlx = ("SELECT id_jenis,nm_jenis_kesenian
		FROM m_jenis_kesenian");
 $result = mysqli_query($dbconn,$sqlx);
 
 $data = array();
 while($t=mysqli_fetch_array($result)){
	
	if ($keterangan=="kota"){
		$sqlcount = ("SELECT COUNT(id_kesenian) as jumTempat FROM m_kesenian WHERE id_jenis = '".$t['id_jenis']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="kecamatan"){
		$sqlcount = ("SELECT COUNT(id_kesenian) as jumTempat FROM m_kesenian WHERE id_jenis = '".$t['id_jenis']."' AND id_kecamatan='".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	}

	$row_array = array();
	$row_array['nmjenis']=$t['nm_jenis_kesenian'];
	$row_array['jumTempat']=$s['jumTempat'];	
	array_push($data,$row_array);
} 

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>