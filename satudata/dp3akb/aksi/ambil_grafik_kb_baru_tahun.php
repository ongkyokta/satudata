<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idkecamatan= trim($_POST['idarea']);
$tahun= trim($_POST['tahun']);

$data = array();
$sqlcount = ("SELECT SUM(kb_baru_akdr) AS jumAkdr, SUM(kb_baru_mop) AS jumMop, SUM(kb_baru_mow) AS jumMow, SUM(kb_baru_susuk_implant) AS jumSusuk,
SUM(kb_baru_suntik) AS jumSuntik, SUM(kb_baru_tablet) AS jumTablet, SUM(kb_baru_kondom) AS jumKondom, SUM(kb_baru_obat) AS jumObat
FROM dp3akb_kekerasan WHERE tahun='".$tahun."' AND id_kecamatan='".$idkecamatan."'");
$resultcount = mysqli_query($dbconn,$sqlcount);$t= mysqli_fetch_assoc($resultcount);

$row_array = array();
$row_array['jumAkdr']=$t['jumAkdr'];
$row_array['jumMop']=$t['jumMop'];	
$row_array['jumMow']=$t['jumMow'];
$row_array['jumSusuk']=$t['jumSusuk'];
$row_array['jumSuntik']=$t['jumSuntik'];
$row_array['jumTablet']=$t['jumTablet'];
$row_array['jumKondom']=$t['jumKondom'];
$row_array['jumObat']=$t['jumObat'];
array_push($data,$row_array);
echo json_encode($data);

$resultcount->close();
$dbconn->close();
 ?>