<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idperiode = trim($_POST['idperiode']);
$data = array();
$sqlcount = ("SELECT SUM(laki) AS jumLaki, SUM(perempuan) AS jumPerempuan
	FROM dprd_anggota WHERE id_periode='".$idperiode."'");
$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

$row_array = array();
$row_array['jumLaki']=$s['jumLaki'];
$row_array['jumPerempuan']=$s['jumPerempuan'];
array_push($data,$row_array);

echo json_encode($data);
$resultcount->close();
$dbconn->close();
?>