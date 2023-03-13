<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$thnini = date("Y");
$data = array();

for ($i = $thnini - 5; $i <= $thnini; $i++) {
	$tahunurut = $i;
	$sqljum = ("SELECT SUM(IF(tahun='".$tahunurut."',emas,0)) AS jumEmas,SUM(IF(tahun='".$tahunurut."',perak,0)) AS jumPerak,
	SUM(IF(tahun='".$tahunurut."',perunggu,0)) AS jumPerunggu
	FROM dispora WHERE kegiatan = '".$idarea."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$t = mysqli_fetch_assoc($resuljum);

	$row_array = array();
	$row_array['nmTahun']=$tahunurut;
	$row_array['jumEmas']=$t['jumEmas'];
	$row_array['jumPerak']=$t['jumPerak'];$row_array['jumPerunggu']=$t['jumPerunggu'];	
	array_push($data,$row_array);
}
echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  