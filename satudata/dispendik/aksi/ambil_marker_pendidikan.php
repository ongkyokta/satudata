<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT * FROM tbl_api_dispendik");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){
	$row_array = array();
	$row_array['idtempat']=$t['id'];
	$row_array['npsn']=$t['npsn'];
	$row_array['nmtempat']=$t['nama'];
	$row_array['alamat']=$t['alamat_jalan'];
	$row_array['bentuk']=$t['bentuk_pendidikan'];
	$row_array['desa']=$t['desa_kelurahan'];
	$row_array['dusun']=$t['nama_dusun'];
	$row_array['kecamatan']=$t['kecamatan'];
	$row_array['status']=$t['status_sekolah'];

	$row_array['diskripsi']="Jumlah Siswa : ".$t['siswa']." - Jumlah Guru : ".$t['guru'];
	$row_array['koordinat']=floatval($t['lintang']).",".floatval($t['bujur']);

	$row_array['idkecamatan']=$t['id_kecamatan'];
	$row_array['idjenis']=$t['id_desa'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();//$resultWst->close();
$dbconn->close();
 ?>