<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idarea = trim($_POST['idarea']);
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlx = ("SELECT SUM(IF(tahun='".$tahun."',kb_baru_pb_sm,0)) AS JumKBBaru,SUM(IF(tahun='".$tahun."',kb_aktif_pb_sm,0)) AS JumKBAktif,
SUM(IF(tahun='".$tahun."',kekerasan_fisik_perempuan,0)) AS JumFisikP, SUM(IF(tahun='".$tahun."',kekerasan_psikis_perempuan,0)) AS JumPsikisP,SUM(IF(tahun='".$tahun."',kekerasan_seksual_perempuan,0)) AS JumSeksualP,SUM(IF(tahun='".$tahun."',penelantaran_perempuan,0)) AS JumPenelantaranP,SUM(IF(tahun='".$tahun."',kekerasan_perempuan_lain,0)) AS JumKerasLainP,SUM(IF(tahun='".$tahun."',perlindungan_perempuan,0)) AS JumPerlindunganP,
SUM(IF(tahun='".$tahun."',kekerasan_fisik_anak,0)) AS JumFisikA, SUM(IF(tahun='".$tahun."',kekerasan_psikis_anak,0)) AS JumPsikisA,SUM(IF(tahun='".$tahun."',kekerasan_seksual_anak,0)) AS JumSeksualA,SUM(IF(tahun='".$tahun."',penelantaran_anak,0)) AS JumPenelantaranA,SUM(IF(tahun='".$tahun."',kekerasan_anak_lain,0)) AS JumKerasLainA,
SUM(IF(tahun='".$thnsebelumnya."',kb_baru_pb_sm,0)) AS JumKBBaruT,SUM(IF(tahun='".$thnsebelumnya."',kb_aktif_pb_sm,0)) AS JumKBAktifT,
SUM(IF(tahun='".$thnsebelumnya."',kekerasan_fisik_perempuan,0)) AS JumFisikPT, SUM(IF(tahun='".$thnsebelumnya."',kekerasan_psikis_perempuan,0)) AS JumPsikisPT,SUM(IF(tahun='".$thnsebelumnya."',kekerasan_seksual_perempuan,0)) AS JumSeksualPT,SUM(IF(tahun='".$thnsebelumnya."',penelantaran_perempuan,0)) AS JumPenelantaranPT,SUM(IF(tahun='".$thnsebelumnya."',kekerasan_perempuan_lain,0)) AS JumKerasLainPT,SUM(IF(tahun='".$thnsebelumnya."',perlindungan_perempuan,0)) AS JumPerlindunganPT,
SUM(IF(tahun='".$thnsebelumnya."',kekerasan_fisik_anak,0)) AS JumFisikAT, SUM(IF(tahun='".$thnsebelumnya."',kekerasan_psikis_anak,0)) AS JumPsikisAT,SUM(IF(tahun='".$thnsebelumnya."',kekerasan_seksual_anak,0)) AS JumSeksualAT,SUM(IF(tahun='".$thnsebelumnya."',penelantaran_anak,0)) AS JumPenelantaranAT,SUM(IF(tahun='".$thnsebelumnya."',kekerasan_anak_lain,0)) AS JumKerasLainAT
FROM dp3akb_kekerasan WHERE id_kecamatan='".$idarea."'");
$resultx = mysqli_query($dbconn,$sqlx);$t= mysqli_fetch_assoc($resultx);

	$row_array = array();
	$row_array['JumKBBaru']=$t['JumKBBaru'];$row_array['JumKBAktif']=$t['JumKBAktif'];	
	$row_array['JumFisikP']=$t['JumFisikP'];$row_array['JumPsikisP']=$t['JumPsikisP'];$row_array['JumSeksualP']=$t['JumSeksualP'];$row_array['JumPenelantaranP']=$t['JumPenelantaranP'];$row_array['JumKerasLainP']=$t['JumKerasLainP'];$row_array['JumPerlindunganP']=$t['JumPerlindunganP'];
	$row_array['JumFisikA']=$t['JumFisikA'];$row_array['JumPsikisA']=$t['JumPsikisA'];$row_array['JumSeksualA']=$t['JumSeksualA'];$row_array['JumPenelantaranA']=$t['JumPenelantaranA'];$row_array['JumKerasLainA']=$t['JumKerasLainA'];
	
	$row_array['jumtotalkekerasan']=$t['JumFisikP'] + $t['JumPsikisP'] + $t['JumSeksualP'] + $t['JumPenelantaranP'] + $t['JumKerasLainP'] + $t['JumPerlindunganP']
	+ $t['JumFisikA'] + $t['JumPsikisA'] + $t['JumSeksualA'] + $t['JumPenelantaranA'] + $t['JumKerasLainA'];

	$row_array['JumKBBaruT']=$t['JumKBBaruT'];$row_array['JumKBAktifT']=$t['JumKBAktifT'];	
	$row_array['JumFisikPT']=$t['JumFisikPT'];$row_array['JumPsikisPT']=$t['JumPsikisPT'];$row_array['JumSeksualPT']=$t['JumSeksualPT'];$row_array['JumPenelantaranPT']=$t['JumPenelantaranPT'];$row_array['JumKerasLainPT']=$t['JumKerasLainPT'];$row_array['JumPerlindunganPT']=$t['JumPerlindunganPT'];
	$row_array['JumFisikAT']=$t['JumFisikAT'];$row_array['JumPsikisAT']=$t['JumPsikisAT'];$row_array['JumSeksualAT']=$t['JumSeksualAT'];$row_array['JumPenelantaranAT']=$t['JumPenelantaranAT'];$row_array['JumKerasLainAT']=$t['JumKerasLainAT'];
	
	$row_array['jumtotalkekerasanT']=$t['JumFisikPT'] + $t['JumPsikisPT'] + $t['JumSeksualPT'] + $t['JumPenelantaranPT'] + $t['JumKerasLainPT'] + $t['JumPerlindunganPT']
	+ $t['JumFisikAT'] + $t['JumPsikisAT'] + $t['JumSeksualAT'] + $t['JumPenelantaranAT'] + $t['JumKerasLainAT'];

	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>