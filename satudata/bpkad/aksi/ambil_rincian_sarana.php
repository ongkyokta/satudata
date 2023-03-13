<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$data = array();

if ($keterangan=="kota"){
	$sqlxA = ("SELECT COUNT(id) AS jumkibA FROM det_kib_a");
	$resultxA = mysqli_query($dbconn,$sqlxA);$a= mysqli_fetch_assoc($resultxA);

	$sqlxB = ("SELECT COUNT(id) AS jumkibB FROM det_kib_b");
	$resultxB = mysqli_query($dbconn,$sqlxB);$b= mysqli_fetch_assoc($resultxB);

	$sqlxC = ("SELECT COUNT(id) AS jumkibC FROM det_kib_c");
	$resultxC = mysqli_query($dbconn,$sqlxC);$c= mysqli_fetch_assoc($resultxC);

	$sqlxD = ("SELECT COUNT(id) AS jumkibD FROM det_kib_d");
	$resultxD = mysqli_query($dbconn,$sqlxD);$d= mysqli_fetch_assoc($resultxD);
} else if ($keterangan=="kecamatan"){
	$sqlxA = ("SELECT COUNT(id) AS jumkibA FROM det_kib_a WHERE id_kecamatan='".$idarea."'");
	$resultxA = mysqli_query($dbconn,$sqlxA);$a= mysqli_fetch_assoc($resultxA);

	$sqlxB = ("SELECT COUNT(id) AS jumkibB FROM det_kib_b WHERE id_kecamatan='".$idarea."'");
	$resultxB = mysqli_query($dbconn,$sqlxB);$b= mysqli_fetch_assoc($resultxB);

	$sqlxC = ("SELECT COUNT(id) AS jumkibC FROM det_kib_c WHERE id_kecamatan='".$idarea."'");
	$resultxC = mysqli_query($dbconn,$sqlxC);$c= mysqli_fetch_assoc($resultxC);

	$sqlxD = ("SELECT COUNT(id) AS jumkibD FROM det_kib_d WHERE id_kecamatan='".$idarea."'");
	$resultxD = mysqli_query($dbconn,$sqlxD);$d= mysqli_fetch_assoc($resultxD);
} else if ($keterangan=="desa"){
	$sqlxA = ("SELECT COUNT(id) AS jumkibA FROM det_kib_a WHERE id_desa='".$idarea."'");
	$resultxA = mysqli_query($dbconn,$sqlxA);$a= mysqli_fetch_assoc($resultxA);

	$sqlxB = ("SELECT COUNT(id) AS jumkibB FROM det_kib_b WHERE id_desa='".$idarea."'");
	$resultxB = mysqli_query($dbconn,$sqlxB);$b= mysqli_fetch_assoc($resultxB);

	$sqlxC = ("SELECT COUNT(id) AS jumkibC FROM det_kib_c WHERE id_desa='".$idarea."'");
	$resultxC = mysqli_query($dbconn,$sqlxC);$c= mysqli_fetch_assoc($resultxC);

	$sqlxD = ("SELECT COUNT(id) AS jumkibD FROM det_kib_d WHERE id_desa='".$idarea."'");
	$resultxD = mysqli_query($dbconn,$sqlxD);$d= mysqli_fetch_assoc($resultxD);
}

	$row_array = array();
	
	$row_array['TotKIB']=$a['jumkibA'] + $b['jumkibB'] + $c['jumkibC'] + $d['jumkibD'];
	$row_array['jumkibA']=$a['jumkibA'];
	$row_array['jumkibB']=$b['jumkibB'];
	$row_array['jumkibC']=$c['jumkibC'];
	$row_array['jumkibD']=$d['jumkibD'];


	array_push($data,$row_array);

  echo json_encode($data);
  $resultxA->close();
  $dbconn->close();
?>