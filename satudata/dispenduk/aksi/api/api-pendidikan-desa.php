<?php

$keterangan = trim($_POST['keterangan']);
$idarea = trim($_POST['idarea']);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/pendidikan_desa.php',
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

$json = json_decode($response, true);
$nama = '[' . json_encode($json['response']) . ']';
$data = (json_decode($nama, true));

$items = array();
$totBS_L = 0;
$totBLMSD_L = 0;
$totSD_L = 0;
$totSMP_L = 0;
$totSMA_L = 0;$totD1_L = 0;$totD3_L = 0;$totS1_L = 0;$totS2_L = 0;$totS3_L = 0;

$totBS_P = 0;
$totBLMSD_P = 0;
$totSD_P = 0;
$totSMP_P = 0;
$totSMA_P = 0;$totD1_P = 0;$totD3_P = 0;$totS1_P = 0;$totS2_P = 0;$totS3_P = 0;

foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {

    if ($keterangan == "kota") {
      $totBS_L = $totBS_L + $val['BS_LAKI'];
      $totBS_P = $totBS_P + $val['BS_PEREMPUAN'];

      $totBLMSD_L = $totBLMSD_L + $val['BLMSD_LAKI'];
      $totBLMSD_P = $totBLMSD_P + $val['BLMSD_PEREMPUAN'];

      $totSD_L = $totSD_L + $val['SD_LAKI'];
      $totSD_P = $totSD_P + $val['SD_PEREMPUAN'];

      $totSMP_L = $totSMP_L + $val['SMP_LAKI'];
      $totSMP_P = $totSMP_P + $val['SMP_PEREMPUAN'];

      //////////////////////////////////////////////
      $totSMA_L = $totSMA_L + $val['SMA_LAKI'];
      $totSMA_P = $totSMA_P + $val['SMA_PEREMPUAN'];

      $totD1_L = $totD1_L + $val['D1_LAKI'];
      $totD1_P = $totD1_P + $val['D1_PEREMPUAN'];

      $totD3_L = $totD3_L + $val['D3_LAKI'];
      $totD3_P = $totD3_P + $val['D3_PEREMPUAN'];

      $totS1_L = $totS1_L + $val['S1_LAKI'];
      $totS1_P = $totS1_P + $val['S1_PEREMPUAN'];

      $totS2_L = $totS2_L + $val['S2_LAKI'];
      $totS2_P = $totS2_P + $val['S2_PEREMPUAN'];

      $totS3_L = $totS3_L + $val['S3_LAKI'];
      $totS3_P = $totS3_P + $val['S3_PEREMPUAN'];
      //////////////////////////////////////////////

    } else if ($keterangan == "kecamatan" AND $idarea == $val['NO_KEC']) {

      $totBS_L = $totBS_L + $val['BS_LAKI'];
      $totBS_P = $totBS_P + $val['BS_PEREMPUAN'];

      $totBLMSD_L = $totBLMSD_L + $val['BLMSD_LAKI'];
      $totBLMSD_P = $totBLMSD_P + $val['BLMSD_PEREMPUAN'];

      $totSD_L = $totSD_L + $val['SD_LAKI'];
      $totSD_P = $totSD_P + $val['SD_PEREMPUAN'];

      $totSMP_L = $totSMP_L + $val['SMP_LAKI'];
      $totSMP_P = $totSMP_P + $val['SMP_PEREMPUAN'];

      //////////////////////////////////////////////
      $totSMA_L = $totSMA_L + $val['SMA_LAKI'];
      $totSMA_P = $totSMA_P + $val['SMA_PEREMPUAN'];

      $totD1_L = $totD1_L + $val['D1_LAKI'];
      $totD1_P = $totD1_P + $val['D1_PEREMPUAN'];

      $totD3_L = $totD3_L + $val['D3_LAKI'];
      $totD3_P = $totD3_P + $val['D3_PEREMPUAN'];

      $totS1_L = $totS1_L + $val['S1_LAKI'];
      $totS1_P = $totS1_P + $val['S1_PEREMPUAN'];

      $totS2_L = $totS2_L + $val['S2_LAKI'];
      $totS2_P = $totS2_P + $val['S2_PEREMPUAN'];

      $totS3_L = $totS3_L + $val['S3_LAKI'];
      $totS3_P = $totS3_P + $val['S3_PEREMPUAN'];
      //////////////////////////////////////////////

    } else if ($keterangan == "desa" AND $idarea == $val['NO_KEL']) {

      $totBS_L = $totBS_L + $val['BS_LAKI'];
      $totBS_P = $totBS_P + $val['BS_PEREMPUAN'];

      $totBLMSD_L = $totBLMSD_L + $val['BLMSD_LAKI'];
      $totBLMSD_P = $totBLMSD_P + $val['BLMSD_PEREMPUAN'];

      $totSD_L = $totSD_L + $val['SD_LAKI'];
      $totSD_P = $totSD_P + $val['SD_PEREMPUAN'];

      $totSMP_L = $totSMP_L + $val['SMP_LAKI'];
      $totSMP_P = $totSMP_P + $val['SMP_PEREMPUAN'];

      //////////////////////////////////////////////
      $totSMA_L = $totSMA_L + $val['SMA_LAKI'];
      $totSMA_P = $totSMA_P + $val['SMA_PEREMPUAN'];

      $totD1_L = $totD1_L + $val['D1_LAKI'];
      $totD1_P = $totD1_P + $val['D1_PEREMPUAN'];

      $totD3_L = $totD3_L + $val['D3_LAKI'];
      $totD3_P = $totD3_P + $val['D3_PEREMPUAN'];

      $totS1_L = $totS1_L + $val['S1_LAKI'];
      $totS1_P = $totS1_P + $val['S1_PEREMPUAN'];

      $totS2_L = $totS2_L + $val['S2_LAKI'];
      $totS2_P = $totS2_P + $val['S2_PEREMPUAN'];

      $totS3_L = $totS3_L + $val['S3_LAKI'];
      $totS3_P = $totS3_P + $val['S3_PEREMPUAN'];
      //////////////////////////////////////////////
    }
  }
}

$a = array(
  'totBS_L' => $totBS_L, 'totBLMSD_L' => $totBLMSD_L,
  'totSD_L' => $totSD_L, 'totSMP_L' => $totSMP_L,
  'totSMA_L' => $totSMA_L, 'totD1_L' => $totD1_L,'totD3_L' => $totD3_L, 'totS1_L' => $totS1_L,'totS2_L' => $totS2_L, 'totS3_L' => $totS3_L,

  'totBS_P' => $totBS_P, 'totBLMSD_P' => $totBLMSD_P,
  'totSD_P' => $totSD_P, 'totSMP_P' => $totSMP_P,
  'totSMA_P' => $totSMA_P, 'totD1_P' => $totD1_P,'totD3_P' => $totD3_P, 'totS1_P' => $totS1_P,'totS2_P' => $totS2_P, 'totS3_P' => $totS3_P
);
$items[] = $a;
echo json_encode($items);
