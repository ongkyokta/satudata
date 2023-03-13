<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$tahun = trim($_POST['tahun']);
$thnsebelumnya = trim($_POST['tahun'] - 1);

$data = array();

$sqladu = ("SELECT SUM(IF(tahun='".$tahun."',kendaraan_uji_kir,0)) AS JumKIR,SUM(IF(tahun='".$tahun."',jml_kecelakaan_perlintasan,0)) AS JumLaka,
SUM(IF(tahun='".$thnsebelumnya."',kendaraan_uji_kir,0)) AS JumKIRT,SUM(IF(tahun='".$thnsebelumnya."',jml_kecelakaan_perlintasan,0)) AS JumLakaT,

SUM(IF(tahun='".$tahun."',traffic_light,0)) AS JumTraffic,SUM(IF(tahun='".$tahun."',warning_light,0)) AS JumWarning,
SUM(IF(tahun='".$thnsebelumnya."',traffic_light,0)) AS JumTrafficT,SUM(IF(tahun='".$thnsebelumnya."',warning_light,0)) AS JumWarningT,

SUM(IF(tahun='".$tahun."',halte,0)) AS JumHalte,SUM(IF(tahun='".$tahun."',terminal,0)) AS JumTerminal,
SUM(IF(tahun='".$thnsebelumnya."',halte,0)) AS JumHalteT,SUM(IF(tahun='".$thnsebelumnya."',terminal,0)) AS JumTerminalT,

SUM(IF(tahun='".$tahun."',pos_lalu_lintas,0)) AS JumPos,SUM(IF(tahun='".$tahun."',rambu_lalu_lintas,0)) AS JumRambu,
SUM(IF(tahun='".$thnsebelumnya."',pos_lalu_lintas,0)) AS JumPosT,SUM(IF(tahun='".$thnsebelumnya."',rambu_lalu_lintas,0)) AS JumRambuT,

SUM(IF(tahun='".$tahun."',rppaj,0)) AS JumRppaj,
SUM(IF(tahun='".$thnsebelumnya."',rppaj,0)) AS JumRppajT,

SUM(IF(tahun='".$tahun."',izin_trayek_perkotaan,0)) AS JumTrayekKota,SUM(IF(tahun='".$tahun."',izin_trayek_pedesaan,0)) AS JumTrayekDesa,
SUM(IF(tahun='".$thnsebelumnya."',izin_trayek_perkotaan,0)) AS JumTrayekKotaT,SUM(IF(tahun='".$thnsebelumnya."',izin_trayek_pedesaan,0)) AS JumTrayekDesaT,

SUM(IF(tahun='".$tahun."',penumpang_mpu_berangkat,0)) AS JumMPUBerangkat,SUM(IF(tahun='".$tahun."',penumpang_mpu_datang,0)) AS JumMPUDatang,
SUM(IF(tahun='".$thnsebelumnya."',penumpang_mpu_berangkat,0)) AS JumMPUBerangkatT,SUM(IF(tahun='".$thnsebelumnya."',penumpang_mpu_datang,0)) AS JumMPUDatangT,

SUM(IF(tahun='".$tahun."',penumpang_pesawat_berangkat,0)) AS JumPesawatBerangkat,SUM(IF(tahun='".$tahun."',penumpang_pesawat_datang,0)) AS JumPesawatDatang,
SUM(IF(tahun='".$thnsebelumnya."',penumpang_pesawat_berangkat,0)) AS JumPesawatBerangkatT,SUM(IF(tahun='".$thnsebelumnya."',penumpang_pesawat_datang,0)) AS JumPesawatDatangT,

SUM(IF(tahun='".$tahun."',armada_mpu_berangkat,0)) AS JumArmadaMPUBerangkat,SUM(IF(tahun='".$tahun."',armada_mpu_datang,0)) AS JumArmadaMPUDatang,
SUM(IF(tahun='".$thnsebelumnya."',armada_mpu_berangkat,0)) AS JumArmadaMPUBerangkatT,SUM(IF(tahun='".$thnsebelumnya."',armada_mpu_datang,0)) AS JumArmadaMPUDatangT,

SUM(IF(tahun='".$tahun."',armada_pesawat_berangkat,0)) AS JumArmadaPesawatBerangkat,SUM(IF(tahun='".$tahun."',armada_pesawat_datang,0)) AS JumArmadaPesawatDatang,
SUM(IF(tahun='".$thnsebelumnya."',armada_pesawat_berangkat,0)) AS JumArmadaPesawatBerangkatT,SUM(IF(tahun='".$thnsebelumnya."',armada_pesawat_datang,0)) AS JumArmadaPesawatDatangT

FROM dishub_indikator");
$resultadu = mysqli_query($dbconn,$sqladu);$a= mysqli_fetch_assoc($resultadu);

	$row_array = array();
	$row_array['JumKIR']=$a['JumKIR'];$row_array['JumLaka']=$a['JumLaka'];	
	$row_array['JumKIRT']=$a['JumKIRT'];$row_array['JumLakaT']=$a['JumLakaT'];
	
	$row_array['JumSarana']=$a['JumTraffic'] + $a['JumWarning'] + $a['JumHalte'] + $a['JumTerminal'] + $a['JumPos'] + $a['JumRambu'] + $a['JumRppaj'];	
	$row_array['JumSaranaT']=$a['JumTrafficT'] + $a['JumWarningT'] + $a['JumHalteT'] + $a['JumTerminalT'] + $a['JumPosT'] + $a['JumRambuT'] + $a['JumRppajT'];

	$row_array['JumTrayek']=$a['JumTrayekKota'] + $a['JumTrayekDesa'];
	$row_array['JumTrayekT']=$a['JumTrayekKotaT'] + $a['JumTrayekDesaT'];

	$row_array['JumPenumpang']=$a['JumMPUBerangkat'] + $a['JumMPUDatang'] + $a['JumPesawatBerangkat'] + $a['JumPesawatDatang'];
	$row_array['JumPenumpangT']=$a['JumMPUBerangkatT'] + $a['JumMPUDatangT'] + $a['JumPesawatBerangkatT'] + $a['JumPesawatDatangT'];

	$row_array['JumArmada']=$a['JumArmadaMPUBerangkat'] + $a['JumArmadaMPUDatang'] + $a['JumArmadaPesawatBerangkat'] + $a['JumArmadaPesawatDatang'];
	$row_array['JumArmadaT']=$a['JumArmadaMPUBerangkatT'] + $a['JumArmadaMPUDatangT'] + $a['JumArmadaPesawatBerangkatT'] + $a['JumArmadaPesawatDatangT'];

	$row_array['thnskrg']=$tahun;$row_array['thnsblm']=$thnsebelumnya;
	array_push($data,$row_array);

  echo json_encode($data);
  $resultadu->close();
  $dbconn->close();
?>