<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$sqlx = ("SELECT tahun AS nmTahun, SUM(karet) AS JumKaret,SUM(kopi) AS JumKopi,SUM(cengkeh) AS Jumcengkeh
	FROM perumda_kahyangan GROUP BY tahun ASC");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		
	$row_array = array();
	$row_array['nmTahun']=$t['nmTahun'];
	$row_array['JumKaret']= $t['JumKaret'];$row_array['JumKopi']= $t['JumKopi'];$row_array['Jumcengkeh']= $t['Jumcengkeh'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
