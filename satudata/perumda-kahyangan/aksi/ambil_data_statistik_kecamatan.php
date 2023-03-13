<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$kebun = trim($_POST['kebun']);

$data = array();

$sqlcus = ("SELECT SUM(karet) AS JumKaret,SUM(kopi) AS JumKopi,SUM(cengkeh) AS JumCengkeh
		FROM perumda_kahyangan WHERE kebun='".$kebun."'");
$resultcus = mysqli_query($dbconn,$sqlcus);$b= mysqli_fetch_assoc($resultcus);

	$row_array = array();
	$row_array['JumKaret']=$b['JumKaret'];
	$row_array['JumKopi']=$b['JumKopi'];
	$row_array['JumCengkeh']=$b['JumCengkeh'];

	array_push($data,$row_array);

  echo json_encode($data);
  $resultcus->close();
  $dbconn->close();
?>