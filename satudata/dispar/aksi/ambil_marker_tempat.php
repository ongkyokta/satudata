<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT p.id_tempat,p.nm_tempat,p.alamat,p.no_telepon,p.no_hp,p.email,p.website,p.link_video,p.pemilik,
		p.diskripsi,p.jenis,p.koordinat,p.id_kecamatan,p.id_jenis,q.nama_kecamatan
		FROM m_tempat p LEFT JOIN m_kecamatan q ON p.id_kecamatan=q.id_kecamatan 
		WHERE p.koordinat IS NOT NULL");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){
	$row_array = array();
	$row_array['idtempat']=$t['id_tempat'];
	$row_array['nmtempat']=$t['nm_tempat'];
	$row_array['alamat']=$t['alamat'];
	$row_array['notelepon']=$t['no_telepon'];
	$row_array['nohp']=$t['no_hp'];
	$row_array['email']=$t['email'];
	$row_array['website']=$t['website'];
	$row_array['linkvideo']=$t['link_video'];
	$row_array['pemilik']=$t['pemilik'];
	$row_array['diskripsi']=$t['diskripsi'];
	$row_array['jenis']=ucwords(strtolower($t['jenis']));
	$row_array['koordinat']=$t['koordinat'];

	$row_array['idkecamatan']=$t['id_kecamatan'];$row_array['nmkecamatan']=$t['nama_kecamatan'];
	$row_array['idjenis']=$t['id_jenis'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
 ?>