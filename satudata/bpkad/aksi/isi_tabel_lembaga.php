<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT id_lembaga,nm_lembaga,alamat,telepon FROM m_lembaga WHERE aktif='Y'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idlembaga']=$t['id_lembaga'];
	$row_array['nmlembaga']=ucwords(strtolower($t['nm_lembaga']));
	$row_array['alamat']=$t['alamat'];
	$row_array['telepon']=$t['telepon'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
