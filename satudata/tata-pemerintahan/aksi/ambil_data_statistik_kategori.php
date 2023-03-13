<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqladu = ("SELECT SUM(IF(tahun='".$tahun."' AND kategori='Kesehatan',capaian,0)) AS JumKesehatan,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Kesehatan',capaian,0)) AS JumKesehatanT,
SUM(IF(tahun='".$tahun."' AND kategori='Pendidikan',capaian,0)) AS JumPendidikan,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Pendidikan',capaian,0)) AS JumPendidikanT,
SUM(IF(tahun='".$tahun."' AND kategori='Sosial',capaian,0)) AS JumSosial,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Sosial',capaian,0)) AS JumSosialT,
SUM(IF(tahun='".$tahun."' AND kategori='Trantibhumlinmas',capaian,0)) AS JumTrantibhumlinmas,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Trantibhumlinmas',capaian,0)) AS JumTrantibhumlinmasT,
SUM(IF(tahun='".$tahun."' AND kategori='Pekerjaan Umum',capaian,0)) AS JumPU,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Pekerjaan Umum',capaian,0)) AS JumPUT,
SUM(IF(tahun='".$tahun."' AND kategori='Perumahan Rakyat',capaian,0)) AS JumPR,SUM(IF(tahun='".$thnsebelumnya."' AND kategori='Perumahan Rakyat',capaian,0)) AS JumPRT,

COUNT(IF(tahun='".$tahun."' AND kategori='Kesehatan',id,NULL)) AS ItmKesehatan,COUNT(IF(tahun='".$thnsebelumnya."' AND kategori='Kesehatan',id,NULL)) AS ItmKesehatanT,
COUNT(IF(tahun='".$tahun."' AND kategori='Pendidikan',id,NULL)) AS ItmPendidikan,COUNT(IF(tahun='".$thnsebelumnya."' AND kategori='Pendidikan',id,NULL)) AS ItmPendidikanT,
COUNT(IF(tahun='".$tahun."' AND kategori='Sosial',id,NULL)) AS ItmSosial,COUNT(IF(tahun='".$thnsebelumnya."' AND kategori='Sosial',id,NULL)) AS ItmSosialT,
COUNT(IF(tahun='".$tahun."' AND kategori='Trantibhumlinmas',id,NULL)) AS ItmTrantibhumlinmas,COUNT(IF(tahun='".$thnsebelumnya."' AND kategori='Trantibhumlinmas',id,NULL)) AS ItmTrantibhumlinmasT,
COUNT(IF(tahun='".$tahun."' AND kategori='Pekerjaan Umum',id,NULL)) AS ItmPU,COUNT(IF(tahun='".$thnsebelumnya."' AND kategori='Pekerjaan Umum',id,NULL)) AS ItmPUT,
COUNT(IF(tahun='".$tahun."' AND kategori='Perumahan Rakyat',id,NULL)) AS ItmPR,COUNT(IF(tahun='".$thnsebelumnya."' AND kategori='Perumahan Rakyat',id,NULL)) AS ItmPRT

FROM tapem_indikator");
$resultadu = mysqli_query($dbconn,$sqladu);$a= mysqli_fetch_assoc($resultadu);

	if($a['JumKesehatanT'] == "0" OR $a['ItmKesehatanT'] == "0"){$JumKesehatanT = "0";} else {$JumKesehatanT = $a['JumKesehatanT']/$a['ItmKesehatanT'];}
	if($a['JumPendidikanT'] == "0" OR $a['ItmPendidikanT'] == "0"){$JumPendidikanT = "0";} else {$JumPendidikanT = $a['JumPendidikanT']/$a['ItmPendidikanT'];}
	if($a['JumSosialT'] == "0" OR $a['ItmSosialT'] == "0"){$JumSosialT = "0";} else {$JumSosialT = $a['JumSosialT']/$a['ItmSosialT'];}
	if($a['JumTrantibhumlinmasT'] == "0" OR $a['ItmTrantibhumlinmasT'] == "0"){$JumTrantibhumlinmasT = "0";} else {$JumTrantibhumlinmasT = $a['JumTrantibhumlinmasT']/$a['ItmTrantibhumlinmasT'];}
	if($a['JumPUT'] == "0" OR $a['ItmPUT'] == "0"){$JumPUT = "0";} else {$JumPUT = $a['JumPUT']/$a['ItmPUT'];}
	if($a['JumPRT'] == "0" OR $a['ItmPRT'] == "0"){$JumPRT = "0";} else {$JumPRT = $a['JumPRT']/$a['ItmPRT'];}

	$row_array = array();
	
	$row_array['JumKesehatan']=$a['JumKesehatan']/$a['ItmKesehatan'];
	$row_array['JumPendidikan']=$a['JumPendidikan']/$a['ItmPendidikan'];
	$row_array['JumSosial']=$a['JumSosial']/$a['ItmSosial'];
	$row_array['JumTrantibhumlinmas']=$a['JumTrantibhumlinmas']/$a['ItmTrantibhumlinmas'];
	$row_array['JumPU']=$a['JumPU']/$a['ItmPU'];
	$row_array['JumPR']=$a['JumPR']/$a['ItmPR'];	

	$row_array['JumKesehatanT']=$JumKesehatanT;
	$row_array['JumPendidikanT']=$JumPendidikanT;
	$row_array['JumSosialT']=$JumSosialT;
	$row_array['JumTrantibhumlinmasT']=$JumTrantibhumlinmasT;
	$row_array['JumPUT']=$JumPUT;
	$row_array['JumPRT']=$JumPRT;

	$row_array['ItmKesehatan']=$a['ItmKesehatan'];$row_array['ItmKesehatanT']=$a['ItmKesehatanT'];

	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultadu->close();
  $dbconn->close();
?>