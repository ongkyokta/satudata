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
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_a");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "B"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_b");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "C"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_c");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "D"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_d");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		}
	} else if ($keterangan=="kecamatan"){
		if ($t['jeniskib'] == "A"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_a AND id_kecamatan = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "B"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_b AND id_kecamatan = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "C"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_c AND id_kecamatan = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "D"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_d AND id_kecamatan = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		}
	} else if ($keterangan=="desa"){
		if ($t['jeniskib'] == "A"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_a AND id_desa = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "B"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_b AND id_desa = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "C"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_c AND id_desa = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		} else if ($t['jeniskib'] == "D"){
			$sqlcount = ("SELECT COUNT(IF(stts_sewa='Y',0,null)) AS jumSwasta,
				COUNT(IF(stts_pinjam='Y',0,null)) AS jumNegeri FROM det_kib_d AND id_desa = '".$idarea."'");
			$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);
		}
	}

	$row_array = array();
	$row_array['nmbentuksekolah']="KIB-".$t['jeniskib'];
	$row_array['jumSwasta']= $s['jumSwasta'];$row_array['jumNegeri']= $s['jumNegeri'];
	array_push($data,$row_array);
}
echo json_encode($data);
$resultx->close();
$dbconn->close();
?>  
