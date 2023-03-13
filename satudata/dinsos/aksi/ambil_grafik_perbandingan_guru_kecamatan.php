<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idkecamatan= trim($_POST['idkecamatan']);
$sqlx = ("SELECT DISTINCT (bentuk_pendidikan) AS nmbentuksekolah FROM tbl_api_dispendik WHERE id_kecamatan='".$idkecamatan."'");		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		

	$sqlcount = ("SELECT SUM(guru) AS jumGuru,
		SUM(siswa) AS jumSiswa FROM tbl_api_dispendik WHERE bentuk_pendidikan = '".$t['nmbentuksekolah']."' AND id_kecamatan='".$idkecamatan."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['nmbentuksekolah']=$t['nmbentuksekolah'];
	$row_array['jumGuru']= $s['jumGuru'];$row_array['jumSiswa']= $s['jumSiswa'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
