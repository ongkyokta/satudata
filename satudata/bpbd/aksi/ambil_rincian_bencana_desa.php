<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);

$data = array();
$sqlx = ("SELECT SUM(jml_laki) AS jmllaki, SUM(jml_perempuan) AS jmlperempuan, SUM(jml_laki+jml_perempuan) AS jmlpenduduk, SUM(jml_rawan) AS jmlrawan, SUM(jml_penerima) AS jmlpenerima
FROM tbl_api_bpbd WHERE id_desa='".$iddesa."'");
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

	$row_array = array();
	$row_array['jmllaki']=$row['jmllaki'];
  $row_array['jmlperempuan']=$row['jmlperempuan'];
  $row_array['jmlpenduduk']=$row['jmlpenduduk'];
  $row_array['jmlrawan']=$row['jmlrawan'];
  $row_array['jmlpenerima']=$row['jmlpenerima'];

	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>