<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT id_opd,nm_opd FROM m_opd WHERE aktif='Y' ORDER BY id_opd ASC");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){ 	
	$row_array = array();
	$row_array['idopd']=$t['id_opd'];$row_array['nmopd']=$t['nm_opd'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
