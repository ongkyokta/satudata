<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idinstansi= trim($_POST['idinstansi']);

$sqlx = ("SELECT p.id_opd,p.nm_opd,p.kategori FROM m_opd p WHERE p.aktif='Y' ORDER BY p.id_opd ASC");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idopd']=$t['id_opd'];$row_array['nmopd']=$t['nm_opd'];$row_array['kategori']=$t['kategori'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
