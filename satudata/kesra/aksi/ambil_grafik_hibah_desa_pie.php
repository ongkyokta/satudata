<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$ketbansos = trim($_POST['ketbansos']);
$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

if ($ketbansos == "hibah"){$bansos = "Penerima HIBAH";}
else if ($ketbansos == "guru"){$bansos = "Bansos Guru Ngaji";}
else if ($ketbansos == "mudin"){$bansos = "Bansos P3N (mudin)";}

$data = array();
	$sqlcount = ("SELECT SUM(organisasi_instansi_penerima) AS jumInstansi, SUM(laki_laki) AS jumLaki, SUM(perempuan) AS jumPerempuan
	FROM kesra WHERE tahun = '".$tahun."' AND id_desa = '".$idarea."' AND kategori='".$bansos."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	if ($t['jumInstansi'] == NULL OR $t['jumInstansi'] == "0"){$jumInstansi = "0";} else {$jumInstansi = $t['jumInstansi'];}
	if ($t['jumLaki'] == NULL OR $t['jumLaki'] == "0"){$jumLaki = "0";} else {$jumLaki = $t['jumLaki'];}
	if ($t['jumPerempuan'] == NULL OR $t['jumPerempuan'] == "0"){$jumPerempuan = "0";} else {$jumPerempuan = $t['jumPerempuan'];}

	$row_array = array();
	$row_array['jumInstansi']=$jumInstansi;
	$row_array['jumLaki']=$jumLaki;$row_array['jumPerempuan']=$jumPerempuan;				
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>