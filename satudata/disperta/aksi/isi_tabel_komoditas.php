<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT DISTINCT nm_kecamatan FROM tbl_api_disperta");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){

	$sqlx2 = ("SELECT SUM(luas_tanam) AS jmltanam, SUM(luas_panen) AS jmlpanen, SUM(hasil) AS jmlhasil 
	FROM tbl_api_disperta WHERE nm_kecamatan='".$t['nm_kecamatan']."'");
	$result2 = mysqli_query($dbconn,$sqlx2);
	$c= mysqli_fetch_assoc($result2);

	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmkecamatan']="Kecamatan ".ucwords(strtolower($t['nm_kecamatan']));
	$row_array['jmltanam']=$c['jmltanam'];
	$row_array['jmlpanen']=$c['jmlpanen'];
	$row_array['jmlhasil']=$c['jmlhasil'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();$result2->close();
$dbconn->close();
 ?>