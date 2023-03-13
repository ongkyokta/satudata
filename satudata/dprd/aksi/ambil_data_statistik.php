<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idperiode = trim($_POST['idperiode']);
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqlx = ("SELECT SUM(IF(id_periode='".$idperiode."',laki,0)) AS JumLaki,SUM(IF(id_periode='".$idperiode."',perempuan,0)) AS JumPerempuan
FROM dprd_anggota");
$resultx = mysqli_query($dbconn,$sqlx);$p= mysqli_fetch_assoc($resultx);

$sqlx2 = ("SELECT SUM(IF(tahun='".$tahun."',perda,0)) AS JumPerda,SUM(IF(tahun='".$tahun."',perda_usul_eksekutif,0)) AS JumPerdaUsul,
SUM(IF(tahun='".$tahun."',perda_inisiatif_dprd,0)) AS JumPerdaInisiatif, SUM(IF(tahun='".$tahun."',sk_internal,0)) AS JumSKIntern,SUM(IF(tahun='".$tahun."',sk_eksternal,0)) AS JumSKEkstern,SUM(IF(tahun='".$tahun."',keputusan_pimpinan_dprd,0)) AS JumKepPimpinan,

SUM(IF(tahun='".$tahun."',kunjungan_kerja,0)) AS JumKunjungan,SUM(IF(tahun='".$tahun."',penerimaan_kunjungan_kerja,0)) AS JumTerimaKunjungan,
SUM(IF(tahun='".$tahun."',pengaduan,0)) AS JumPengaduan, 

SUM(IF(tahun='".$tahun."',penayangan_kegiatan,0)) AS JumTayang,
SUM(IF(tahun='".$tahun."',paripurna,0)) AS JumParipurna,

SUM(IF(tahun='".$thnsebelumnya."',perda,0)) AS JumPerdaT,SUM(IF(tahun='".$thnsebelumnya."',perda_usul_eksekutif,0)) AS JumPerdaUsulT,
SUM(IF(tahun='".$thnsebelumnya."',perda_inisiatif_dprd,0)) AS JumPerdaInisiatifT, SUM(IF(tahun='".$thnsebelumnya."',sk_internal,0)) AS JumSKInternT,SUM(IF(tahun='".$thnsebelumnya."',sk_eksternal,0)) AS JumSKEksternT,SUM(IF(tahun='".$thnsebelumnya."',keputusan_pimpinan_dprd,0)) AS JumKepPimpinanT,

SUM(IF(tahun='".$thnsebelumnya."',kunjungan_kerja,0)) AS JumKunjunganT,SUM(IF(tahun='".$thnsebelumnya."',penerimaan_kunjungan_kerja,0)) AS JumTerimaKunjunganT,
SUM(IF(tahun='".$thnsebelumnya."',pengaduan,0)) AS JumPengaduanT, 

SUM(IF(tahun='".$thnsebelumnya."',penayangan_kegiatan,0)) AS JumTayangT,
SUM(IF(tahun='".$thnsebelumnya."',paripurna,0)) AS JumParipurnaT
FROM dprd_produk");

$resultx2 = mysqli_query($dbconn,$sqlx2);$t= mysqli_fetch_assoc($resultx2);

	$row_array = array();
	$row_array['jumTotAnggota']=$p['JumLaki']+$p['JumPerempuan'];	
	
	$row_array['jumTotProduk']=$t['JumPerda'] + $t['JumPerdaUsul'] + $t['JumPerdaInisiatif'] + $t['JumSKIntern'] + $t['JumSKEkstern'] + $t['JumKepPimpinan'];
	$row_array['jumTotProdukT']=$t['JumPerdaT'] + $t['JumPerdaUsulT'] + $t['JumPerdaInisiatifT'] + $t['JumSKInternT'] + $t['JumSKEksternT'] + $t['JumKepPimpinanT'];

	$row_array['jumTotKunjungan']=$t['JumKunjungan'] + $t['JumTerimaKunjungan'] + $t['JumPengaduan'];
	$row_array['jumTotKunjunganT']=$t['JumKunjunganT'] + $t['JumTerimaKunjunganT'] + $t['JumPengaduanT'];

	$row_array['JumTayang']=$t['JumTayang'];
	$row_array['JumTayangT']=$t['JumTayangT'];

	$row_array['JumParipurna']=$t['JumParipurna'];
	$row_array['JumParipurnaT']=$t['JumParipurnaT'];
	
	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>