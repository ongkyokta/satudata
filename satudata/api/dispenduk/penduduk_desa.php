<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

//$qri="TRUNCATE TABLE tbl_api_dispenduk_desa";	
//$resqri=mysqli_query($dbconn,$qri);

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
//echo $response;

$json = json_decode($response,true);
$nama = '['.json_encode($json['response']).']';
$data=(json_decode($nama, true));

$items = array();
$total = 0;$totP = 0;$totL = 0;
foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {
    $total = $total + $val['JUMLAH'];
    $totP = $totP + $val['LAKI'];$totL = $totL + $val['PEREMPUAN'];

//    $sql2  = "INSERT INTO tbl_api_dispenduk_desa (desa,kecamatan,jml_penduduk,jml_laki,jml_perempuan,id_kecamatan,id_desa) 
//                  VALUES ('".$val['NAMAKEL']."','".$val['NAMAKEC']."','".$val['JUMLAH']."','".$val['LAKI']."','".$val['PEREMPUAN']."','".$val['NO_KEC']."','".$val['NO_KEL']."')";
//                  $res=mysqli_query($dbconn,$sql2);

    $a=array('jmlperempuan'=>number_format($totP,0,",","."),'jmllaki'=>number_format($totL,0,",",".")
      ,'jmltotal'=>number_format($total,0,",","."),'kdpropinsi'=>$val['NO_PROP'],'kdkota'=>$val['NO_KAB']
      ,'kdkecamatan'=>$val['NO_KEC'],'nmkecamatan'=>$val['NAMAKEC']);
    $items[] = $a;
  }
}
echo json_encode($items);

