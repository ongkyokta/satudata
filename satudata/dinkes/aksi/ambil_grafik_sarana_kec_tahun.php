<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun= trim($_POST['tahun']);
$id_puskesmas= trim($_POST['id_puskesmas']);

$data = array();
	
	$sqlcount = ("SELECT SUM(sop) as jumsop,
						 SUM(jml_ambulan) as jumambulan,
						 SUM(psc) as jumpsc,
						 SUM(pkm_rawat_inap_poned) as jumponed,
						 SUM(sistem_informasi_kesehatan) as jumsimkes,
						 SUM(pemutakhiran_data) as jumpemutakhiran,
						 SUM(polindes_ponkesdes) as jumpolindes,
						 SUM(pkm_pembantu) as jumpkm_pembantu,
						 SUM(fasilitas_poskestren) as jumposkestren
	 			  FROM dinkes WHERE id_puskesmas='".$id_puskesmas."' AND tahun='".$tahun."'");

	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumsop']=$s['jumsop'];
	$row_array['jumambulan']=$s['jumambulan'];
	$row_array['jumpsc']=$s['jumpsc'];
	$row_array['jumponed']=$s['jumponed'];
	$row_array['jumsimkes']=$s['jumsimkes'];
	$row_array['jumpemutakhiran']=$s['jumpemutakhiran'];
	$row_array['jumpolindes']=$s['jumpolindes'];
	$row_array['jumpkm_pembantu']=$s['jumpkm_pembantu'];
	$row_array['jumposkestren']=$s['jumposkestren'];
	array_push($data,$row_array);

echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>