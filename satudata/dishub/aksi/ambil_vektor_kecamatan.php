<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT geojson FROM m_kecamatan");
$result = mysqli_query($dbconn,$sqlx);
$data = array();
while($t=mysqli_fetch_array($result)){
	array_push($data, json_decode($t['geojson']));
}
echo json_encode($data);
$result->close();
$dbconn->close();
 ?>