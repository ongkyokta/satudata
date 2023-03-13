<?php
error_reporting(0);
include '../operator/services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$sqlx = ("SELECT p.id_jenis,p.jenis FROM m_jenis_wisata p ORDER BY p.id_jenis ASC");		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($w=mysqli_fetch_array($resultx)){		
	$nmjenis = $w['jenis'];
	
	$qriloket = ("SELECT COUNT(id_wisata) AS jumjenis FROM m_wisata WHERE jenis = '".$w['jenis']."'");
	$dbloket = mysqli_query($dbconn,$qriloket);$t= mysqli_fetch_assoc($dbloket);
	
	$row_array = array();
	$row_array['nmjenis']= $nmjenis;
	$row_array['jumjenis']= $t['jumjenis'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbloket->close();
$dbconn->close();
?>  