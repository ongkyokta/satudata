<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);

$data = array();
$sqlx = ("SELECT SUM(luas_tanam) AS jmltanam,SUM(luas_panen) AS jmlpanen,SUM(hasil) AS jmlhasil
FROM tbl_api_disperta WHERE id_desa='".$iddesa."'");
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

	$row_array = array();
	$row_array['jmltanam']=$row['jmltanam'];
  $row_array['jmlpanen']=$row['jmlpanen'];
  $row_array['jmlhasil']=$row['jmlhasil'];

	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>