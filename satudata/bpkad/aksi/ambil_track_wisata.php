<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');
$idwisata= trim($_POST['idwisata']);

$sqlx = ("SELECT koordinat FROM m_tempat WHERE id_tempat='".$idtempat."'");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){
	$row_array = array();
	$row_array['koordinat']=$t['koordinat'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
 ?>