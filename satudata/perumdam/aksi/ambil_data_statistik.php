<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlprod = ("SELECT SUM(IF(tahun='".$tahun."',produksi_air_minum,0)) AS JumProd,SUM(IF(tahun='".$thnsebelumnya."',produksi_air_minum,0)) AS JumProdT FROM perumdam_air");
$resultprod = mysqli_query($dbconn,$sqlprod);$a= mysqli_fetch_assoc($resultprod);

$sqlcus = ("SELECT SUM(IF(tahun='".$tahun."',jml_pelanggan,0)) AS JumCus,SUM(IF(tahun='".$thnsebelumnya."',jml_pelanggan,0)) AS JumCusT,
		SUM(IF(tahun='".$tahun."',air_terjual,0)) AS JumJual,SUM(IF(tahun='".$thnsebelumnya."',air_terjual,0)) AS JumJualT
		FROM perumdam_pelanggan");
$resultcus = mysqli_query($dbconn,$sqlcus);$b= mysqli_fetch_assoc($resultcus);

$sqlper = ("SELECT SUM(IF(tahun='".$tahun."',jml_pelanggan,0)) AS JumPer,SUM(IF(tahun='".$thnsebelumnya."',jml_pelanggan,0)) AS JumPerT FROM perumdam_perkembangan");
$resultper = mysqli_query($dbconn,$sqlper);$c= mysqli_fetch_assoc($resultper);

	$row_array = array();
	$row_array['JumProd']=$a['JumProd'];$row_array['JumProdT']=$a['JumProdT'];
	
	$row_array['JumCus']=$b['JumCus'];$row_array['JumCusT']=$b['JumCusT'];
	$row_array['JumJual']=$b['JumJual'];$row_array['JumJualT']=$b['JumJualT'];

	$row_array['JumPer']=$c['JumPer'];$row_array['JumPerT']=$c['JumPerT'];
	
	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultprod->close();$resultcus->close();$resultper->close();
  $dbconn->close();
?>