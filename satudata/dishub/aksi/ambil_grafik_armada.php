<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$tahun = trim($_POST['tahun']);

function getBulanList($bln){
	switch ($bln){
		case "JANUARI": 
			return "Jan";
			break;
		case "FEBRUARI":
			return "Feb";
			break;
		case "MARET":
			return "Mar";
			break;
		case "APRIL":
			return "Apr";
			break;
		case "MEI":
			return "Mei";
			break;
		case "JUNI":
			return "Jun";
			break;
		case "JULI":
			return "Jul";
			break;
		case "AGUSTUS":
			return "Agu";
			break;
		case "SEPTEMBER":
			return "Sep";
			break;
		case "OKTOBER":
			return "Okt";
			break;
		case "NOVEMBER":
			return "Nov";
			break;
		case "DESEMBER":
			return "Des";
			break;
	}
} 

$sqlx = ("SELECT bulan AS nmBulan,tahun AS nmTahun,armada_mpu_berangkat,armada_mpu_datang,armada_pesawat_berangkat,armada_pesawat_datang
	FROM dishub_indikator WHERE tahun = '".$tahun."'");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		
	$row_array = array();
	$row_array['nmBulan']=getBulanList($t['nmBulan']). " " .$t['nmTahun'] ;
	$row_array['mpuberangkat']= $t['armada_mpu_berangkat'];
	$row_array['mpudatang']= $t['armada_mpu_datang'];
	$row_array['pesawatberangkat']= $t['armada_pesawat_berangkat'];
	$row_array['pesawatdatang']= $t['armada_pesawat_datang'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
