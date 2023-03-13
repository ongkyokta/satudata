<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlprod = ("SELECT SUM(IF(tahun='".$tahun."',rt,0)) AS JumRT,SUM(IF(tahun='".$thnsebelumnya."',rt,0)) AS JumRTT,
SUM(IF(tahun='".$tahun."',rw,0)) AS JumRW,SUM(IF(tahun='".$thnsebelumnya."',rw,0)) AS JumRWT,
SUM(IF(tahun='".$tahun."',jml_kasipem,0)) AS JumKasipem,SUM(IF(tahun='".$thnsebelumnya."',jml_kasipem,0)) AS JumKasipemT,
SUM(IF(tahun='".$tahun."',jml_kasi_kesejahteraan,0)) AS JumKasikes,SUM(IF(tahun='".$thnsebelumnya."',jml_kasi_kesejahteraan,0)) AS JumKasikesT,
SUM(IF(tahun='".$tahun."',jml_kasipel,0)) AS JumKasipel,SUM(IF(tahun='".$thnsebelumnya."',jml_kasipel,0)) AS JumKasipelT,
SUM(IF(tahun='".$tahun."',jml_kasun_kaling,0)) AS JumKasun,SUM(IF(tahun='".$thnsebelumnya."',jml_kasun_kaling,0)) AS JumKasunT,
SUM(IF(tahun='".$tahun."',jml_kades,0)) AS JumKades,SUM(IF(tahun='".$thnsebelumnya."',jml_kades,0)) AS JumKadesT,
SUM(IF(tahun='".$tahun."',jml_sekdes,0)) AS JumSekdes,SUM(IF(tahun='".$thnsebelumnya."',jml_sekdes,0)) AS JumSekdesT,
SUM(IF(tahun='".$tahun."',jml_peg_tu,0)) AS JumTU,SUM(IF(tahun='".$thnsebelumnya."',jml_peg_tu,0)) AS JumTUT,

SUM(IF(tahun='".$tahun."',jml_peg_keuangan,0)) AS JumKeu,SUM(IF(tahun='".$thnsebelumnya."',jml_peg_keuangan,0)) AS JumKeuT,
SUM(IF(tahun='".$tahun."',jml_peg_perencanaan,0)) AS JumRencana,SUM(IF(tahun='".$thnsebelumnya."',jml_peg_perencanaan,0)) AS JumRencanaT,
SUM(IF(tahun='".$tahun."',anggota_bpd,0)) AS JumBPD,SUM(IF(tahun='".$thnsebelumnya."',anggota_bpd,0)) AS JumBPDT,
SUM(IF(tahun='".$tahun."',kades_tamatan_smp,0)) AS JumSMP,SUM(IF(tahun='".$thnsebelumnya."',kades_tamatan_smp,0)) AS JumSMPT,
SUM(IF(tahun='".$tahun."',kades_tamatan_sma,0)) AS JumSMA,SUM(IF(tahun='".$thnsebelumnya."',kades_tamatan_sma,0)) AS JumSMAT,
SUM(IF(tahun='".$tahun."',kades_tamatan_sma_ke_atas,0)) AS JumSarjana,SUM(IF(tahun='".$thnsebelumnya."',kades_tamatan_sma_ke_atas,0)) AS JumSarjanaT
FROM dispemasdes");
$resultprod = mysqli_query($dbconn,$sqlprod);$a= mysqli_fetch_assoc($resultprod);

	$row_array = array();
	$row_array['JumRT']=$a['JumRT'];$row_array['JumRTT']=$a['JumRTT'];
	$row_array['JumRW']=$a['JumRW'];$row_array['JumRWT']=$a['JumRWT'];
	$row_array['JumKasipem']=$a['JumKasipem'];$row_array['JumKasipemT']=$a['JumKasipemT'];
	$row_array['JumKasikes']=$a['JumKasikes'];$row_array['JumKasikesT']=$a['JumKasikesT'];
	$row_array['JumKasipel']=$a['JumKasipel'];$row_array['JumKasipelT']=$a['JumKasipelT'];
	$row_array['JumKasun']=$a['JumKasun'];$row_array['JumKasunT']=$a['JumKasunT'];
	$row_array['JumKades']=$a['JumKades'];$row_array['JumKadesT']=$a['JumKadesT'];
	$row_array['JumSekdes']=$a['JumSekdes'];$row_array['JumSekdesT']=$a['JumSekdesT'];
	$row_array['JumTU']=$a['JumTU'];$row_array['JumTUT']=$a['JumTUT'];

	$row_array['JumKeu']=$a['JumKeu'];$row_array['JumKeuT']=$a['JumKeuT'];
	$row_array['JumRencana']=$a['JumRencana'];$row_array['JumRencanaT']=$a['JumRencanaT'];
	$row_array['JumBPD']=$a['JumBPD'];$row_array['JumBPDT']=$a['JumBPDT'];
	$row_array['JumSMP']=$a['JumSMP'];$row_array['JumSMPT']=$a['JumSMPT'];
	$row_array['JumSMA']=$a['JumSMA'];$row_array['JumSMAT']=$a['JumSMAT'];
	$row_array['JumSarjana']=$a['JumSarjana'];$row_array['JumSarjanaT']=$a['JumSarjanaT'];

	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);
	
  echo json_encode($data);
  $resultprod->close();
  $dbconn->close();
?>