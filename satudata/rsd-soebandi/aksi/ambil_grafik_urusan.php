<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);

 $data = array();
	
	$sqlcount = ("SELECT SUM(jml_rawat_jalan) as jumrwtjalan,
						 SUM(jml_rawat_inap) as jumrwtinap,
						 SUM(rujukan_rs_kab_kota	) as jumrujukan,
						 SUM(pengolahan_limbah) as jumlimbah,
						 SUM(penggunaan_aplikasi) as jumaplikasi
	 			  FROM rsd_dr_soebandi WHERE tahun='".$tahun."'");

	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumrwtjalan']=$s['jumrwtjalan'];
	$row_array['jumrwtinap']=$s['jumrwtinap'];
	$row_array['jumrujukan']=$s['jumrujukan'];
	$row_array['jumlimbah']=$s['jumlimbah'];
	$row_array['jumaplikasi']=$s['jumaplikasi'];
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>