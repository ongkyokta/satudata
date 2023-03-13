<?php
//error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');
$tahun = trim($_POST['tahun']);
$data = array();
		$sqlx2 = ("SELECT SUM(p.dokter_umum) AS jmldr_umum,
							SUM(p.dokter_spesialis) AS jmldr_spesialis,
							SUM(p.dokter_gigi) AS jmldr_gigi,
							SUM(p.bidan) AS jmlbidan,
							SUM(p.perawat) AS jmlperawat,
							SUM(p.apoteker) AS jmlapoteker,
							SUM(p.promkes) AS jmlpromkes,
							SUM(p.epidemiologi_kesehatan) AS jmlepi_kesehatan,
							SUM(p.administrasi_kesehatan) AS jmladm_kesehatan,
							SUM(p.tenaga_sanitarian) AS jmlsanitaria,
							SUM(p.tenaga_gizi) AS jmlgizi,
							SUM(p.analis_kesehatan) AS jmlanalis,        
							SUM(p.tenaga_pendukung) AS jmlpendukung

		FROM rsd_balung p WHERE p.tahun='".$tahun."'");
		$result2 = mysqli_query($dbconn,$sqlx2);
		$row= mysqli_fetch_assoc($result2);

	$row_array = array();
//	$row_array['no']=$no;
	$row_array['tahun']=$tahun;

	$row_array['jmldr_umum']=$row['jmldr_umum'];
	$row_array['jmldr_spesialis']=$row['jmldr_spesialis'];
	$row_array['jmldr_gigi']=$row['jmldr_gigi'];
	$row_array['jmlbidan']=$row['jmlbidan'];
	$row_array['jmlperawat']=$row['jmlperawat'];
	$row_array['jmlapoteker']=$row['jmlapoteker'];
	$row_array['jmlpromkes']=$row['jmlpromkes'];
	$row_array['jmlepi_kesehatan']=$row['jmlepi_kesehatan'];
	$row_array['jmladm_kesehatan']=$row['jmladm_kesehatan'];
	$row_array['jmlsanitaria']=$row['jmlsanitaria'];
	$row_array['jmlgizi']=$row['jmlgizi'];
	$row_array['jmlanalis']=$row['jmlanalis'];
	$row_array['jmlpendukung']=$row['jmlpendukung'];
			
	array_push($data,$row_array);
	
echo json_encode($data);
$result2->close();
$dbconn->close();
 ?>