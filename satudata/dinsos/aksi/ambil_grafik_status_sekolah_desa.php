<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['iddesa']);
$sqlx = ("SELECT DISTINCT (bentuk_pendidikan) AS nmbentuksekolah FROM tbl_api_dispendik WHERE id_desa='".$iddesa."'");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		

	$sqlcount = ("SELECT COUNT(IF(status_sekolah='SWASTA',0,null)) AS jumSwasta,
		COUNT(IF(status_sekolah='NEGERI',0,null)) AS jumNegeri FROM tbl_api_dispendik WHERE bentuk_pendidikan = '".$t['nmbentuksekolah']."' AND id_desa='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['nmbentuksekolah']=$t['nmbentuksekolah'];
	$row_array['jumSwasta']= $s['jumSwasta'];$row_array['jumNegeri']= $s['jumNegeri'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
