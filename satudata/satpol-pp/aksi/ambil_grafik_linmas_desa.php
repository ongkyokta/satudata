<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');
$idarea= trim($_POST['idarea']);

$thnini = date("Y");
$data = array();

for ($i = $thnini - 5; $i <= $thnini; $i++) {
	$tahunurut = $i;
	$sqljum = ("SELECT SUM(IF(tahun='".$tahunurut."',jml_linmas,0)) AS JumLinmas,SUM(IF(tahun='".$tahunurut."',jml_poskamling,0)) AS JumPos
	FROM satpolpp WHERE tahun = '".$tahunurut."' AND id_desa='".$idarea."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$c = mysqli_fetch_assoc($resuljum);

	$row_array = array();
	$row_array['nmTahun']=$tahunurut;
	$row_array['JumLinmas']= $c['JumLinmas'];$row_array['JumPos']= $c['JumPos'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  

