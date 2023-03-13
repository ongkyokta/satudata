<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlX = ("SELECT COUNT(id_operator) AS jumoperator FROM m_operator");			
$resultx = mysqli_query($dbconn,$sqlX);$r= mysqli_fetch_assoc($resultx);
$jmloperator = number_format($r['jumoperator'],0,".",",");
echo $jmloperator;

mysqli_close($dbconn);
?>