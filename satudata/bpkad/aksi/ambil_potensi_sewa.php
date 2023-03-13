<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

if ($keterangan=="kota"){
	$sql = ("SELECT p.id,p.id_kib,p.nm_barang,p.alamat,p.koordinat,p.luas,p.hrg_sewa
			FROM det_kib_a p LEFT JOIN trans_kib q ON p.id_kib=q.id_kib
			WHERE p.aktif='Y' AND p.stts_sewa='Y' AND p.disewa='N' ORDER BY p.id_kategori ASC");
} else if ($keterangan=="kecamatan"){
	$sql = ("SELECT p.id,p.id_kib,p.nm_barang,p.alamat,p.koordinat,p.luas,p.hrg_sewa
			FROM det_kib_a p LEFT JOIN trans_kib q ON p.id_kib=q.id_kib
			WHERE p.aktif='Y' AND p.stts_sewa='Y' AND p.disewa='N' AND p.id_kecamatan='".$idarea."' ORDER BY p.id_kategori ASC");
} else if ($keterangan=="desa"){
	$sql = ("SELECT p.id,p.id_kib,p.nm_barang,p.alamat,p.koordinat,p.luas,p.hrg_sewa
			FROM det_kib_a p LEFT JOIN trans_kib q ON p.id_kib=q.id_kib
			WHERE p.aktif='Y' AND p.stts_sewa='Y' AND p.disewa='N' AND p.id_desa='".$idarea."' ORDER BY p.id_kategori ASC");
}

$result = mysqli_query($dbconn,$sql);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idtanah']=$t['id'];$row_array['idkib']=$t['id_kib'];
	$row_array['nmbarang']=ucwords(strtolower($t['nm_barang']));
	$row_array['alamat']=$t['alamat'];$row_array['koordinat']=$t['koordinat'];
	$row_array['luas']=number_format($t['luas'],0,",",".");
	$row_array['hrgsewa']=number_format($t['hrg_sewa'],0,",",".");
	$row_array['hrgpotensi']=number_format($t['hrg_sewa'] * $t['luas'],0,",",".");
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
