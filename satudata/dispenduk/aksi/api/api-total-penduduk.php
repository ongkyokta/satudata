<?php
$keterangan = trim($_POST['keterangan']);
$idarea = trim($_POST['idarea']);

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

$json = json_decode($response,true);
$nama = '['.json_encode($json['response']).']';
$data=(json_decode($nama, true));

$items = array();
$total = 0;$totP = 0;$totL = 0;
foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {
    if ($keterangan == "kota") {
      $total = $total + $val['JUMLAH'];
      $totP = $totP + $val['PEREMPUAN'];$totL = $totL + $val['LAKI'];
    } else if ($keterangan == "kecamatan" AND $idarea == $val['NO_KEC']) {
      $total = $total + $val['JUMLAH'];
      $totP = $totP + $val['PEREMPUAN'];$totL = $totL + $val['LAKI'];
    } else if ($keterangan == "desa" AND $idarea == $val['NO_KEL']) {
      $total = $total + $val['JUMLAH'];
      $totP = $totP + $val['PEREMPUAN'];$totL = $totL + $val['LAKI'];
    }
  }
}
$a=array('jmlperempuan'=>$totP,'jmllaki'=>$totL,'jmlpenduduk'=>$total);
$items[] = $a;
echo json_encode($items);

