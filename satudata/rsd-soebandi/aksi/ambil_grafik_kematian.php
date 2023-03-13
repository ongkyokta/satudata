<?php
//error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$tahun = trim($_POST['tahun']);

 $data = array();
	
	$sqlcount = ("SELECT SUM(kematian_bayi) as jumkematian_bayi,
						 SUM(kematian_ibu_melahirkan) as jumkematian_ibu,
						 SUM(kematian_balita) as jumkematian_balita,
						 SUM(kunjungan_neonatus) as jumneonatus	 
 			  FROM rsd_dr_soebandi WHERE tahun='".$tahun."'");


	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumkematianbayi']=$s['jumkematian_bayi'];
	$row_array['jumkematianibu']=$s['jumkematian_ibu'];
	$row_array['jumkematianbalita']=$s['jumkematian_balita'];
	$row_array['jumneonatus']=$s['jumneonatus'];
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>