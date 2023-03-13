<?php
//error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$tahun = trim($_POST['tahun']);
$data = array();
		
		$sqlx2 = ("SELECT SUM(p.bor) AS jmlbor,
						  SUM(p.aios) AS jmlaios,
						  SUM(p.toi) AS jmltoi,
						  SUM(p.bto) AS jmlbto,
						  SUM(p.ndr) AS jmlndr,
						  SUM(p.gdr) AS jmlgdr
						  
		FROM rsd_dr_soebandi p WHERE p.tahun='".$tahun."'");
		$result2 = mysqli_query($dbconn,$sqlx2);
		$row= mysqli_fetch_assoc($result2);

	$row_array = array();
	$row_array['tahun']=$tahun;
	$row_array['jmlbor']=$row['jmlbor'];
	$row_array['jmlaios']=$row['jmlaios'];
	$row_array['jmltoi']=$row['jmltoi'];
	$row_array['jmlbto']=$row['jmlbto'];
	$row_array['jmlndr']=$row['jmlndr'];
	$row_array['jmlgdr']=$row['jmlgdr'];
	
			
	array_push($data,$row_array);
	
echo json_encode($data);
$result2->close();
$dbconn->close();
 ?>