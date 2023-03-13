<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sqlx = ("SELECT DISTINCT (jenis_kib) AS jeniskib FROM trans_kib");
		
$resultx = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($resultx)){		

	if ($keterangan=="kota"){
		if ($t['jeniskib'] == "A"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_a");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "B"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_b");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "C"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_c");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "D"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_d");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		}
	} else if ($keterangan=="kecamatan"){
		if ($t['jeniskib'] == "A"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_a WHERE id_kecamatan='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "B"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_b WHERE id_kecamatan='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "C"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_c WHERE id_kecamatan='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "D"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_d WHERE id_kecamatan='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		}
	} else if ($keterangan=="desa"){
		if ($t['jeniskib'] == "A"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_a WHERE id_desa='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "B"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_b WHERE id_desa='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "C"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_c WHERE id_desa='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "D"){
			$sqlcount = ("SELECT COUNT(IF(dipinjam='Y',0,null)) AS jumDisewa,
				COUNT(IF(dipinjam='N',0,null)) AS jumTidak FROM det_kib_d WHERE id_desa='".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		}
	}

	$row_array = array();
	$row_array['nmbentuksekolah']=$t['jeniskib'];
	$row_array['jumDisewa']= $s['jumDisewa'];$row_array['jumTidak']= $s['jumTidak'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
