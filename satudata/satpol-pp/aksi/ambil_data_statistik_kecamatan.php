<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);

$data = array();

$sqlprod = ("SELECT SUM(IF(tahun='".$tahun."',jml_linmas,0)) AS JumLinmas,SUM(IF(tahun='".$tahun."',jml_poskamling,0)) AS JumPos
FROM satpolpp WHERE id_kecamatan='".$idarea."'");
$resultprod = mysqli_query($dbconn,$sqlprod);$a= mysqli_fetch_assoc($resultprod);

	$row_array = array();
	$row_array['JumLinmas']=$a['JumLinmas'];$row_array['JumPos']=$a['JumPos'];
	array_push($data,$row_array);
	
  echo json_encode($data);
  $resultprod->close();
  $dbconn->close();
?>