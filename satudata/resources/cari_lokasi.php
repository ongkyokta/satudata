<?php
error_reporting(0);
include '../operator/services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$kata= trim($_POST['kata']);

$sqlx = ("SELECT nm_tempat FROM m_tempat WHERE nm_tempat like '%".$kata."%'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmtempat']=ucwords(strtolower($t['nm_tempat']));
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
