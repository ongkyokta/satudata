<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idperiode= trim($_POST['idperiode']);

$data = array();
$sqlx = ("SELECT id_partai,partai FROM dprd_m_partai where id_periode='".$idperiode."'");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($p=mysqli_fetch_array($result)){

	$sqlcount = ("SELECT SUM(laki) AS jumLaki, SUM(perempuan) AS jumPerempuan
			FROM dprd_anggota WHERE id_periode='".$idperiode."' AND id_partai='".$p['id_partai']."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['nmpartai']=$p['partai'];
	$row_array['jumTotal']=$t['jumLaki']+$t['jumPerempuan'];
	array_push($data,$row_array);
}
echo json_encode($data);

$result->close();$resultcount->close();
$dbconn->close();
