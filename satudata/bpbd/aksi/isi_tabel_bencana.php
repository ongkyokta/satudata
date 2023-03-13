<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT DISTINCT id_kecamatan,kecamatan FROM tbl_api_bpbd");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){

	$sqlx2 = ("SELECT SUM(jml_laki) AS jmllaki, SUM(jml_perempuan) AS jmlperempuan, SUM(jml_perempuan + jml_laki) AS jmlpenduduk, SUM(jml_rawan) AS jmlrawan, SUM(jml_penerima) AS jmlpenerima
	FROM tbl_api_bpbd WHERE id_kecamatan='".$t['id_kecamatan']."'");
	$result2 = mysqli_query($dbconn,$sqlx2);
	$c= mysqli_fetch_assoc($result2);

	$sqlx3 = ("SELECT DISTINCT ancaman_bahaya FROM tbl_api_bpbd WHERE id_kecamatan='".$t['id_kecamatan']."'");
	$result3 = mysqli_query($dbconn,$sqlx3);
	$ancamanbahaya = "";
	while($q=mysqli_fetch_array($result3)){
		$ancamanbahaya = $ancamanbahaya . $q['ancaman_bahaya'].", ";
	}

	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmkecamatan']="Kecamatan ".ucwords(strtolower($t['kecamatan']));
	$row_array['jmllaki']=number_format($c['jmllaki'],0,".",",");
	$row_array['jmlperempuan']=number_format($c['jmlperempuan'],0,".",",");
	$row_array['jmlpenduduk']=number_format($c['jmlpenduduk'],0,".",",");
	$row_array['jmlrawan']=number_format($c['jmlrawan'],0,".",",");
	$row_array['jmlpenerima']=number_format($c['jmlpenerima'],0,".",",");

	$row_array['ancamanbahaya']=$ancamanbahaya;
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();$result2->close();$result3->close();
$dbconn->close();
 ?>