<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$id_puskesmas= trim($_POST['id_puskesmas']);
$tahun= trim($_POST['tahun']);

$data = array();
	
	$sqlcount = ("SELECT SUM(jml_kematian_bayi) as jumkematian_bayi,
						 SUM(jml_kematian_ibu_melahirkan) as jumkematian_ibu,
						 SUM(jml_kematian_balita) as jumkematian_balita,
						 SUM(kunjungan_neonatus) as jumneonatus
	 			  FROM dinkes WHERE id_puskesmas='".$id_puskesmas."' AND tahun='".$tahun."'");

	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumkematian_bayi']=$s['jumkematian_bayi'];
	$row_array['jumkematian_ibu']=$s['jumkematian_ibu'];
	$row_array['jumkematian_balita']=$s['jumkematian_balita'];
	$row_array['jumneonatus']=$s['jumneonatus'];
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>