<?php
error_reporting(0);
include '../operator/services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$sqlx = ("SELECT p.id_kelas,p.kelas FROM m_kelas_hotel p ORDER BY p.id_kelas ASC");		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($w=mysqli_fetch_array($resultx)){		
	$nmkelas = $w['kelas'];
	
	$qriloket = ("SELECT COUNT(kelas) AS jumkelas FROM m_hotel WHERE kelas = '".$w['kelas']."'");
	$dbloket = mysqli_query($dbconn,$qriloket);$t= mysqli_fetch_assoc($dbloket);
	
	$row_array = array();
	$row_array['nmkelas']= $nmkelas;
	$row_array['jumkelas']= $t['jumkelas'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbloket->close();
$dbconn->close();
?>  