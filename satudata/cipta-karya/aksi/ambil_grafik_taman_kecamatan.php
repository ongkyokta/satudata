<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$thnini = date("Y");
$data = array();

for ($i = $thnini - 10; $i <= $thnini; $i++) {
	$tahunurut = $i;
	$sqljum = ("SELECT SUM(IF(tahun='".$tahunurut."',luas_taman,0)) AS jumAir
	FROM cipta_karya WHERE id_kecamatan = '".$idarea."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$t = mysqli_fetch_assoc($resuljum);

	$row_array = array();
	$row_array['nmTahun']=$tahunurut;
	$row_array['jumAir']=$t['jumAir'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  