<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$thnini = date("Y");
$data = array();

for ($i = $thnini - 5; $i <= $thnini; $i++) {
	$tahunurut = $i;
	$sqljum = ("SELECT COUNT(IF(tahun='".$tahunurut."' AND tingkat='Kabupaten',id,NULL)) AS jumKab,COUNT(IF(tahun='".$tahunurut."' AND tingkat='Provinsi',id,NULL)) AS jumProv,
	COUNT(IF(tahun='".$tahunurut."' AND tingkat='Nasional',id,NULL)) AS jumNas,COUNT(IF(tahun='".$tahunurut."' AND tingkat='Internasional',id,NULL)) AS jumInter
	FROM dispora WHERE kegiatan = '".$idarea."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$t = mysqli_fetch_assoc($resuljum);

	$row_array = array();
	$row_array['nmTahun']=$tahunurut;
	$row_array['jumKab']=$t['jumKab'];
	$row_array['jumProv']=$t['jumProv'];$row_array['jumNas']=$t['jumNas'];$row_array['jumInter']=$t['jumInter'];	
	array_push($data,$row_array);
}
echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  