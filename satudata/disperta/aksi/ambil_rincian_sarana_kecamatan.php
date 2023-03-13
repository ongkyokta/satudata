<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idkecamatan= trim($_POST['idarea']);

$data = array();
$sqlx = ("SELECT SUM(IF(jenis='Pangan',hasil,NULL)) AS jmlpangan,SUM(IF(jenis='Holtikultura',hasil,NULL)) AS jmlholtikultura
,SUM(IF(jenis='Perkebunan',hasil,NULL)) AS jmlkebun
FROM tbl_api_disperta WHERE id_kecamatan='".$idkecamatan."'");
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

	$row_array = array();
	$row_array['jmlpangan']=round($row['jmlpangan']);
  $row_array['jmlholtikultura']=round($row['jmlholtikultura']);
  $row_array['jmlkebun']=round($row['jmlkebun']);
  $row_array['jmltotal']=round($row['jmlpangan'] + $row['jmlkebun'] + $row['jmlholtikultura']);

	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>