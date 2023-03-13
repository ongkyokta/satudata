<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$kata= trim($_POST['kata']);

$sqlx = ("SELECT nama,npsn,kecamatan,desa_kelurahan,bentuk_pendidikan FROM tbl_api_dispendik WHERE 
nama like '%".$kata."%' OR npsn like '%".$kata."%' OR kecamatan like '%".$kata."%' OR desa_kelurahan like '%".$kata."%' OR bentuk_pendidikan like '%".$kata."%'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nama']=ucwords(strtolower($t['nama']));
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
