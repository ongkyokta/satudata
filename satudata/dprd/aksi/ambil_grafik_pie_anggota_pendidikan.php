<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idperiode = trim($_POST['idperiode']);
$data = array();
$sqlcount = ("SELECT SUM(sltp) AS jumSMP, SUM(sma) AS jumSMA, SUM(d3) AS jumD3, SUM(s1_s2) AS jumS1
	FROM dprd_anggota WHERE id_periode='".$idperiode."'");
$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

$row_array = array();
$row_array['jumSMP']=$s['jumSMP'];
$row_array['jumSMA']=$s['jumSMA'];
$row_array['jumD3']=$s['jumD3'];
$row_array['jumS1']=$s['jumS1'];
array_push($data,$row_array);

echo json_encode($data);
$resultcount->close();
$dbconn->close();
?>