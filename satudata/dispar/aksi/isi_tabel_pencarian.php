<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$kata= trim($_POST['kata']);

$sqlx = ("SELECT id,nama,npsn,alamat_jalan,bentuk_pendidikan,lintang,bujur,stts_upload
FROM tbl_api_dispendik
WHERE nama like '%".$kata."%' OR npsn like '%".$kata."%' OR kecamatan like '%".$kata."%' OR desa_kelurahan like '%".$kata."%' OR bentuk_pendidikan like '%".$kata."%'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($sm=mysqli_fetch_array($result)){
	$no++;
	$idtempat = $sm['id'];$nmtempat = $sm['nama'];$koordinat = $sm['lintang'].",".$sm['bujur'];
    $alamat = $sm['alamat_jalan'];$bentukpendidikan = $sm['bentuk_pendidikan'];
	$sttsupload = strtoupper($sm['stts_upload']);
	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idtempat']=$idtempat;
	$row_array['nmtempat']=$nmtempat;
	$row_array['koordinat']=$koordinat;
	$row_array['alamat']=$alamat;
	$row_array['bentukpendidikan']=$bentukpendidikan;
	$row_array['sttsupload']=$sttsupload;

	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
