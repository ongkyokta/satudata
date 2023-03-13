<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sqlx = ("SELECT DISTINCT (jenis) AS nmjenis
		FROM m_tempat WHERE jenis !='oleh-oleh' AND jenis !='lain-lain'");
 $result = mysqli_query($dbconn,$sqlx);
 
 $data = array();
 while($t=mysqli_fetch_array($result)){
	
	if ($keterangan=="kota"){
		$sqlcount = ("SELECT SUM(p.jml_pengunjung) as jumPengunjung 
			FROM detail_pengunjung p LEFT JOIN m_tempat q ON p.id_tempat=q.id_tempat WHERE q.jenis = '".$t['nmjenis']."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	} else if ($keterangan=="kecamatan"){
		$sqlcount = ("SELECT SUM(p.jml_pengunjung) as jumPengunjung 
			FROM detail_pengunjung p LEFT JOIN m_tempat q ON p.id_tempat=q.id_tempat WHERE q.jenis = '".$t['nmjenis']."' AND q.id_kecamatan='".$idarea."'");
		$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
	}

	$row_array = array();
	$row_array['nmjenis']=$t['nmjenis'];
	$row_array['jumPengunjung']=$s['jumPengunjung'];	
	array_push($data,$row_array);
} 

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>