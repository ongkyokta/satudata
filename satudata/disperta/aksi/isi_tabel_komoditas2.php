<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT nm_komoditas FROM tbl_api_disperta_m_komoditas");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){

	$sqlx2 = ("SELECT SUM(luas_tanam) AS jmltanam, SUM(luas_panen) AS jmlpanen, SUM(hasil) AS jmlhasil 
	FROM tbl_api_disperta WHERE nm_komoditas='".$t['nm_komoditas']."'");
	$result2 = mysqli_query($dbconn,$sqlx2);
	$c= mysqli_fetch_assoc($result2);

	if ($c['jmltanam'] == null){$jmltanam = 0;}else{$jmltanam = $c['jmltanam'];}
	if ($c['jmlpanen'] == null){$jmlpanen = 0;}else{$jmlpanen = $c['jmlpanen'];}
	if ($c['jmlhasil'] == null){$jmlhasil = 0;}else{$jmlhasil = $c['jmlhasil'];}

	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmkecamatan']=ucwords(strtolower($t['nm_komoditas']));
	$row_array['jmltanam']=$jmltanam;
	$row_array['jmlpanen']=$jmlpanen;
	$row_array['jmlhasil']=$jmlhasil;
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();$result2->close();
$dbconn->close();
 ?>