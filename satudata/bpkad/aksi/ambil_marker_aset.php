<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT id,nm_barang,luas,alamat,koordinat,penggunaan,hpo,stts_sewa,stts_sertifikat,stts_tanah FROM det_kib_a");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){
	$row_array = array();
	$row_array['idtanah']=$t['id'];
	$row_array['nmbarang']=$t['nm_barang'];
	$row_array['alamat']=$t['alamat'];
	$row_array['luas']=number_format($t['luas'],0,",",".");
	$row_array['hpo']=number_format($t['hpo'],0,",",".");
	$row_array['penggunaan']=$t['penggunaan'];
	$row_array['sttssewa']=ucwords(strtolower($t['stts_sewa']));
	$row_array['sttssertifikat']=ucwords(strtolower($t['stts_sertifikat']));
	$row_array['sttstanah']=ucwords(strtolower($t['stts_tanah']));

	$row_array['koordinat']=$t['koordinat'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();//$resultWst->close();
$dbconn->close();
 ?>