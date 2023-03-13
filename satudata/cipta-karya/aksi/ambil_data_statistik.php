<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');
$tahun = trim($_POST['tahun']);
$data = array();

	$sqljum = ("SELECT SUM(IF(tahun='".$tahun."',luas_taman,0)) AS Jumtaman,
	SUM(IF(tahun='".$tahun."',jml_kk_air,0)) AS JumAir,
	SUM(IF(tahun='".$tahun."',jml_kk_jamban,0)) AS JumJamban,
	SUM(IF(tahun='".$tahun."',rumah_layak_huni,0)) AS JumRumah,
	SUM(IF(tahun='".$tahun."',jml_titik_lampu,0)) AS JumLampu
	FROM cipta_karya WHERE tahun = '".$tahun."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$a = mysqli_fetch_assoc($resuljum);

	$row_array = array();

	$row_array['Jumtaman']=$a['Jumtaman'];
	$row_array['JumAir']=$a['JumAir'];
	$row_array['JumJamban']=$a['JumJamban'];
	$row_array['JumRumah']=$a['JumRumah'];
	$row_array['JumLampu']=$a['JumLampu'];

	array_push($data,$row_array);

echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  