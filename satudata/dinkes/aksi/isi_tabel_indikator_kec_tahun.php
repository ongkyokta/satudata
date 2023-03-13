<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT MAX(tahun) AS nm_tahun FROM dinkes");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;
	$idkecamatan = $t['nm_tahun'];
		
		$sqlx2 = ("SELECT (p.bor) AS jmlbor,
						  (p.aios) AS jmlaios,
						  (p.toi) AS jmltoi,
						  (p.bto) AS jmlbto,
						  (p.ndr) AS jmlndr,
						  (p.gdr) AS jmlgdr

		FROM rsd_dr_soebandi p WHERE p.tahun='".$idkecamatan."'");
		$result2 = mysqli_query($dbconn,$sqlx2);
		$row= mysqli_fetch_assoc($result2);

	$row_array = array();
	$row_array['no']=$no;
	$row_array['tahun']=$t['nm_tahun'];

	$row_array['jmlbor']=$row['jmlbor'];
	$row_array['jmlaios']=$row['jmlaios'];
	$row_array['jmltoi']=$row['jmltoi'];
	$row_array['jmlbto']=$row['jmlbto'];
	$row_array['jmlndr']=$row['jmlndr'];
	$row_array['jmlgdr']=$row['jmlgdr'];
			
	array_push($data,$row_array);
}	
echo json_encode($data);
$result->close();
$dbconn->close();
 ?>