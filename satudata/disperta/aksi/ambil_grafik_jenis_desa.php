<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);

$sqlx = ("SELECT nm_jenis FROM tbl_api_disperta_m_jenis");
 $result = mysqli_query($dbconn,$sqlx);
 $data = array();
 $jumhasil =0;
 while($t=mysqli_fetch_array($result)){
	
	$sqlcount = ("SELECT SUM(hasil) as jumhasil FROM tbl_api_disperta WHERE jenis = '".$t['nm_jenis']."' AND id_desa='".$iddesa."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	if ($s['jumhasil'] == null){$jumhasil = 0;} else {$jumhasil = $s['jumhasil'];}

	$row_array = array();
	$row_array['nmjenis']=$t['nm_jenis'];
	$row_array['jumhasil']=$jumhasil;
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
?>  
