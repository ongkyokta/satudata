<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idkecamatan= trim($_POST['idarea']);

$sqlx = ("SELECT DISTINCT id_komoditas,nm_komoditas FROM tbl_api_disperta WHERE jenis='Holtikultura'");
 $result = mysqli_query($dbconn,$sqlx);
 $data = array();
 $persentasi = 0;$no = 0;
 while($t=mysqli_fetch_array($result)){
	$no++;
	$sqlcount = ("SELECT SUM(luas_tanam) as jumlstanam ,SUM(luas_panen) as jumlspanen ,SUM(hasil) as jumhasil FROM tbl_api_disperta 
		WHERE nm_komoditas = '".$t['nm_komoditas']."' AND id_kecamatan='".$idkecamatan."'");
	$resultcount = mysqli_query($dbconn,$sqlcount);$s= mysqli_fetch_assoc($resultcount);

	$row_array = array();
	$row_array['no']=$no;
	$row_array['idkomoditas']=$t['id_komoditas'];
	$row_array['nmkomoditas']=$t['nm_komoditas'];
	$row_array['jumlstanam']=number_format($s['jumlstanam'],0,",",".");
	$row_array['jumlspanen']=number_format($s['jumlspanen'],0,",",".");
	$row_array['jumhasil']=number_format($s['jumhasil'],0,",",".");
	array_push($data,$row_array);
}

echo json_encode($data);

$result->close();
$resultcount->close();
$dbconn->close();
 ?>