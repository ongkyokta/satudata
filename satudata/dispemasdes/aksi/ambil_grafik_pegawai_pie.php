<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$tahun = trim($_POST['tahun']);

$data = array();
	$sqlcount = ("SELECT SUM(jml_sekdes) AS jumSekdes, SUM(jml_peg_tu) AS jumTU, SUM(jml_peg_keuangan) AS jumKeu, SUM(jml_peg_perencanaan) AS jumRencana
	FROM dispemasdes WHERE tahun = '".$tahun."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['jumSekdes']=$t['jumSekdes'];
	$row_array['jumTU']=$t['jumTU'];
	$row_array['jumKeu']=$t['jumKeu'];$row_array['jumRencana']=$t['jumRencana'];			
	array_push($data,$row_array);
	
	echo json_encode($data);
	
	$resultcount->close();
	$dbconn->close();
 ?>