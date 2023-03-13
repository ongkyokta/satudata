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

$sqlx = ("SELECT kelompok, jml_pelanggan
	FROM perumdam_perkembangan WHERE tahun = '".$tahun."'");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		
	$row_array = array();
	$row_array['kelompok']= ucwords(strtolower($t['kelompok']));
	$row_array['jmlpelanggan']= $t['jml_pelanggan'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
