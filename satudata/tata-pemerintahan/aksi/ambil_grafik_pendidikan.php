<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$tahun= trim($_POST['tahun']);

$sqlx = ("SELECT indikator, capaian
	FROM tapem_indikator WHERE tahun = '".$tahun."' AND kategori='Pendidikan'");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
$no = 0;
while($t=mysqli_fetch_array($resultx)){		
	$no++;
	$row_array = array();
	$row_array['indikator']=$t['indikator'];
	$row_array['capaian']= $t['capaian'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
