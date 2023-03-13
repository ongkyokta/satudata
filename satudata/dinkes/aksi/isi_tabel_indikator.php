<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT MAX(tahun) AS nm_tahun, COUNT(id_puskesmas) as jumpus FROM dinkes");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;
	$idkecamatan = $t['nm_tahun'];
		
		$sqlx2 = ("SELECT SUM(p.bor) AS jmlbor,
						  SUM(p.aios) AS jmlaios,
						  SUM(p.toi) AS jmltoi,
						  SUM(p.bto) AS jmlbto,
						  SUM(p.ndr) AS jmlndr,
						  SUM(p.gdr) AS jmlgdr
						  
		FROM dinkes p WHERE p.tahun='".$idkecamatan."'");
		$result2 = mysqli_query($dbconn,$sqlx2);
		$row= mysqli_fetch_assoc($result2);

	$row_array = array();
	$row_array['no']=$no;
	$row_array['tahun']=$t['nm_tahun'];
	$row_array['jumpus']=$t['jumpus'];
	$row_array['jmlbor']=$row['jmlbor']/$t['jumpus'];
	$row_array['jmlaios']=$row['jmlaios']/$t['jumpus'];
	$row_array['jmltoi']=$row['jmltoi']/$t['jumpus'];
	$row_array['jmlbto']=$row['jmlbto']/$t['jumpus'];
	$row_array['jmlndr']=$row['jmlndr']/$t['jumpus'];
	$row_array['jmlgdr']=$row['jmlgdr']/$t['jumpus'];
	
			
	array_push($data,$row_array);
}	
echo json_encode($data);
$result->close();
$dbconn->close();
 ?>