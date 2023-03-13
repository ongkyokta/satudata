<?php
error_reporting(0);
require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$data = array();
$sqlX = ("SELECT COUNT(id_operator) AS jumoperator FROM m_operator WHERE aktif='Y'");			
$resultx = mysqli_query($dbconn,$sqlX);$r= mysqli_fetch_assoc($resultx);
$jmloperator = number_format($r['jumoperator'],0,",",".");

$sqlX2 = ("SELECT COUNT(id_opd) AS jumopd FROM m_opd WHERE aktif='Y'");			
$resultx2 = mysqli_query($dbconn,$sqlX2);$s= mysqli_fetch_assoc($resultx2);
$jumopd = number_format($s['jumopd'],0,",",".");

$sqlX3 = ("SELECT COUNT(id_lembaga) AS jumlembaga FROM m_lembaga WHERE aktif='Y'");			
$resultx3 = mysqli_query($dbconn,$sqlX3);$t= mysqli_fetch_assoc($resultx3);
$jumlembaga = number_format($t['jumlembaga'],0,",",".");

$sqlX4 = ("SELECT COUNT(id_user) AS jumuser FROM m_user_mobile WHERE aktif='Y'");			
$resultx4 = mysqli_query($dbconn,$sqlX4);$u= mysqli_fetch_assoc($resultx4);
$jumuser = number_format($u['jumuser'],0,",",".");

$row_array = array();
$row_array['jmloperator']=$jmloperator;$row_array['jumuser']=$jumuser;
$row_array['jumopd']=$jumopd;
$row_array['jumlembaga']=$jumlembaga;

array_push($data,$row_array);

echo json_encode($data);
$resultx->close();
$dbconn->close();
?>