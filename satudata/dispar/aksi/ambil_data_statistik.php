<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$data = array();

if ($keterangan=="kota"){
	$sqlx = ("SELECT COUNT(IF(jenis='wisata',id_tempat,null)) AS jumwisata,COUNT(IF(jenis='hotel',id_tempat,null)) AS jumhotel,COUNT(IF(jenis='kuliner',id_tempat,null)) AS jumresto,
		COUNT(IF(jenis='ekraf',id_tempat,null)) AS jumekraf FROM m_tempat ");
} else if ($keterangan=="kecamatan"){
	$sqlx = ("SELECT COUNT(IF(jenis='wisata',id_tempat,null)) AS jumwisata,COUNT(IF(jenis='hotel',id_tempat,null)) AS jumhotel,COUNT(IF(jenis='kuliner',id_tempat,null)) AS jumresto,
		COUNT(IF(jenis='ekraf',id_tempat,null)) AS jumekraf FROM m_tempat WHERE id_kecamatan='".$idarea."'");
}
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

$sqlx2 = ("SELECT COUNT(id_kesenian) AS jumkesenian FROM m_kesenian");
$resultx2 = mysqli_query($dbconn,$sqlx2);$row2= mysqli_fetch_assoc($resultx2);

	$jumtotal = $row['jumwisata'] + $row['jumhotel'] + $row['jumresto'] + $row['jumekraf'] + $row2['jumkesenian'];
    $jumlahtotalRP = number_format($jumtotal,0,",",".");
	$row_array = array();
	$row_array['jumwisata']=$row['jumwisata'];
	$row_array['jumhotel']=$row['jumhotel'];
	$row_array['jumresto']=$row['jumresto'];
	$row_array['jumekraf']=$row['jumekraf'];

	$row_array['jumkesenian']=$row2['jumkesenian'];
	$row_array['jumtotal']=$jumtotal;

	$row_array['jumlahtotalrp']=$jumlahtotalRP;

	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();$resultx2->close();
  $dbconn->close();
?>