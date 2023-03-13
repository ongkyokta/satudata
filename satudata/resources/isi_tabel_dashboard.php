<?php
error_reporting(0);
include '../operator/services/config.php';
$dbconn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Could not connect: ');

$qria = ("SELECT id_kecamatan,nama_kecamatan,latitude,longitude FROM m_kecamatan");
$listbaga = mysqli_query($dbconn, $qria);

$data = array();
$no = 0;
while ($a = mysqli_fetch_array($listbaga)) {
	$idkecamatan = $a['id_kecamatan'];
	$nmkecamatan = ucwords(strtolower($a['nama_kecamatan']));
	//$latitude = $a['latitude'];$longitude = $a['longitude'];
	$koordinat =  $a['latitude'].",". $a['longitude'];
	$geojson = $a['geojson'];

	$qrijumwisata = ("SELECT COUNT(id_tempat) AS jmlwisata FROM m_tempat WHERE id_kecamatan='" . $idkecamatan . "' AND id_jenis='1'");
	$dbjumlahwisata = mysqli_query($dbconn, $qrijumwisata);
	$d = mysqli_fetch_assoc($dbjumlahwisata);
	$jmlwisata = $d['jmlwisata'];

	//$qrijumtravel = ("SELECT COUNT(id_tempat) AS jmltravel FROM m_tempat WHERE id_kecamatan='" . $idkecamatan . "' AND id_jenis='4'");
	//$dbjumlahtravel = mysqli_query($dbconn, $qrijumtravel);
	//$g = mysqli_fetch_assoc($dbjumlahtravel);
	//$jmltravel = $g['jmltravel'];

	$qrijumhotel = ("SELECT COUNT(id_tempat) AS jmlhotel FROM m_tempat WHERE id_kecamatan='" . $idkecamatan . "' AND id_jenis='2'");
	$dbjumlahotel = mysqli_query($dbconn, $qrijumhotel);
	$e = mysqli_fetch_assoc($dbjumlahotel);
	$jmlhotel = $e['jmlhotel'];

	$qrijumresto = ("SELECT COUNT(id_tempat) AS jmlresto FROM m_tempat WHERE id_kecamatan='" . $idkecamatan . "' AND id_jenis='3'");
	$dbjumlahresto = mysqli_query($dbconn, $qrijumresto);
	$f = mysqli_fetch_assoc($dbjumlahresto);
	$jmlresto = $f['jmlresto'];

	$no++;
	$row_array = array();
	$row_array['no'] = $no;
	$row_array['idkecamatan'] = $idkecamatan;
	$row_array['nmkecamatan'] = $nmkecamatan;
	$row_array['koordinat'] = $koordinat;
	$row_array['jmlwisata']=number_format($jmlwisata,0,',','.');
	//$row_array['jmltravel']=number_format($jmltravel,0,',','.');
	$row_array['jmlhotel']=number_format($jmlhotel,0,',','.');
	$row_array['jmlresto']=number_format($jmlresto,0,',','.');
	array_push($data, $row_array);
}
echo json_encode($data);
$listbaga->close();$dbjumlahwisata->close();
//$dbjumlahtravel->close();
$dbjumlahotel->close();$dbjumlahresto->close();
$dbconn->close();