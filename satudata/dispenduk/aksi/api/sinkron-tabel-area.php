<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$qri="TRUNCATE TABLE tbl_dispenduk_area";	
$resqri=mysqli_query($dbconn,$qri);

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/penduduk_desa.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'user: kominfo',
    'password: kominfo@123'
  ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;

$json = json_decode($response,true);
$nama = '['.json_encode($json['response']).']';
$data=(json_decode($nama, true));

$items = array();
foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {
    $idkecamatan = $val['NO_KEC'];$nmkecamatan = $val['NAMAKEC'];
    $iddesa = $val['NO_KEL'];$nmdesa = $val['NAMAKEL'];
  
    $sql2  = "INSERT INTO tbl_dispenduk_area (kecamatan,desa,id_kecamatan,id_desa) 
                  VALUES ('".$val['NAMAKEC']."','".$val['NAMAKEL']."','".$val['NO_KEC']."','".$val['NO_KEL']."')";
                  $res=mysqli_query($dbconn,$sql2);
  }
}


