<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea = trim($_POST['idarea']);
$thnini = date("Y");
$data = array();
$jmlTotalAtlet = 0;
$JumEmas = 0;$JumPerak = 0;$JumPerunggu = 0;
for ($i = $thnini - 5; $i <= $thnini; $i++) {
	$tahunurut = $i;
	$sqljum = ("SELECT SUM(IF(tahun='".$tahunurut."',atlet_kabupaten,0)) AS JumAtKab,
	SUM(IF(tahun='".$tahunurut."',atlet_provinsi,0)) AS JumAtProv,
	SUM(IF(tahun='".$tahunurut."',atlet_nasional,0)) AS JumAtNas,
	SUM(IF(tahun='".$tahunurut."',atlet_internasional,0)) AS JumAtInter,
	SUM(IF(tahun='".$tahunurut."',atlet_asean,0)) AS JumAtAsean,
	SUM(IF(tahun='".$tahunurut."',emas,0)) AS JumEmas,
	SUM(IF(tahun='".$tahunurut."',perak,0)) AS JumPerak,
	SUM(IF(tahun='".$tahunurut."',perunggu,0)) AS JumPerunggu
	FROM dispora WHERE kegiatan = '".$idarea."'");
	$resuljum = mysqli_query($dbconn,$sqljum);$a = mysqli_fetch_assoc($resuljum);

	$jmlTotalAtlet = $jmlTotalAtlet+$a['JumAtKab']+$a['JumAtProv']+$a['JumAtNas']+$a['JumAtInter']+$a['JumAtAsean'];
	$JumEmas = $JumEmas+$a['JumEmas'];
	$JumPerak = $JumPerak+$a['JumPerak'];
	$JumPerunggu = $JumPerunggu+$a['JumPerunggu'];
}
	$row_array = array();
	$row_array['jmlTotalAtlet']=$jmlTotalAtlet;

	$row_array['JumEmas']=$JumEmas;
	$row_array['JumPerak']=$JumPerak;
	$row_array['JumPerunggu']=$JumPerunggu;

	array_push($data,$row_array);
//}
echo json_encode($data);
$resuljum->close();
$dbconn->close();
?>  