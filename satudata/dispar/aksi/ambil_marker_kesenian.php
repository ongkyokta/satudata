<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT p.id_kesenian,p.no_induk,p.nm_organisasi,p.alamat,p.pimpinan,p.diskripsi,p.jml_anggota,p.koordinat,
		p.id_kecamatan,p.id_desa,p.id_jenis,p.id_sub,q.nama_kecamatan,r.nama_desa,s.nm_jenis_kesenian,t.nm_sub_kesenian
		FROM m_kesenian p LEFT JOIN m_kecamatan q ON p.id_kecamatan=q.id_kecamatan
		LEFT JOIN m_desa r ON p.id_desa=r.id_desa 
		LEFT JOIN m_jenis_kesenian s ON p.id_jenis=s.id_jenis 
		LEFT JOIN m_sub_kesenian t ON p.id_sub=t.id_sub 
		WHERE p.koordinat IS NOT NULL");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){
	$row_array = array();
	$row_array['idkesenian']=$t['id_kesenian'];
	$row_array['noinduk']=$t['no_induk'];
	$row_array['nmorganisasi']=ucwords(strtolower($t['nm_organisasi']));
	$row_array['alamat']=ucwords(strtolower($t['alamat']));
	$row_array['pimpinan']=ucwords(strtolower($t['pimpinan']));
	$row_array['diskripsi']=ucwords(strtolower($t['diskripsi']));
	$row_array['jmlanggota']=$t['jml_anggota'];
	$row_array['koordinat']=$t['koordinat'];

	$row_array['idkecamatan']=$t['id_kecamatan'];
	$row_array['nmkecamatan']=ucwords(strtolower($t['nama_kecamatan']));
	$row_array['nmdesa']=ucwords(strtolower($t['nama_desa']));
	$row_array['nmjenis']=ucwords(strtolower($t['nm_jenis_kesenian']));
	$row_array['nmsub']=ucwords(strtolower($t['nm_sub_kesenian']));
	$row_array['idjenis']=$t['id_jenis'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
 ?>