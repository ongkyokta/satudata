<?php
error_reporting(0);
include '../operator/services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$tglserver = date("Y-m-d");

function tgl_indo_list($tgl){
	$tanggal = substr($tgl,8,2);
	$bulan = getBulanList(substr($tgl,5,2));
	$tahun = substr($tgl,0,4);
	return $tanggal.' '.$bulan.' '.$tahun;		 
}

function getBulanList($bln){
	switch ($bln){
		case 1: 
			return "Jan";
			break;
		case 2:
			return "Feb";
			break;
		case 3:
			return "Mar";
			break;
		case 4:
			return "Apr";
			break;
		case 5:
			return "Mei";
			break;
		case 6:
			return "Jun";
			break;
		case 7:
			return "Jul";
			break;
		case 8:
			return "Agu";
			break;
		case 9:
			return "Sep";
			break;
		case 10:
			return "Okt";
			break;
		case 11:
			return "Nov";
			break;
		case 12:
			return "Des";
			break;
	}
} 

$sqlx = ("SELECT MONTH(tgl_awal) AS nmBulan,YEAR(tgl_awal) AS nmTahun, SUM(jml_pengunjung) AS jmlpengunjung FROM detail_pengunjung 
		WHERE tgl_awal < NOW() AND tgl_awal > DATE_ADD(NOW(),INTERVAL - 24 MONTH) OR tgl_awal < NOW() AND tgl_awal > DATE_ADD(NOW(),INTERVAL - 24 MONTH) 
		GROUP BY YEAR(tgl_awal), MONTH(tgl_awal) ORDER BY YEAR(tgl_awal), MONTH(tgl_awal) ASC");			
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		
	$row_array = array();
	$row_array['nmBulan']=getBulanList($t['nmBulan']). " " .$t['nmTahun'] ;
	$row_array['jmlpengunjung']= $t['jmlpengunjung'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
