<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');
$thnini = date("Y");
$data = array();

for ($i = $thnini - 5; $i <= $thnini; $i++) {
	$tahunurut = $i;
	$sqljum = ("SELECT SUM(IF(tahun='".$tahunurut."',atlet_kabupaten,0)) AS jumKab,SUM(IF(tahun='".$tahunurut."',atlet_provinsi,0)) AS jumProv,
	SUM(IF(tahun='".$tahunurut."',atlet_nasional,0)) AS jumNas,SUM(IF(tahun='".$tahunurut."',atlet_internasional,0)) AS jumInter,
	SUM(IF(tahun='".$tahunurut."',atlet_asean,0)) AS jumAsean
	FROM dispora WHERE tahun = '".$tahunurut."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$t = mysqli_fetch_assoc($resuljum);

	$row_array = array();
	$row_array['nmTahun']=$tahunurut;
	$row_array['jumKab']=$t['jumKab'];
	$row_array['jumProv']=$t['jumProv'];	
	$row_array['jumNas']=$t['jumNas'];
	$row_array['jumInter']=$t['jumInter'];
	$row_array['jumAsean']=$t['jumAsean'];		
	array_push($data,$row_array);
}
echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  