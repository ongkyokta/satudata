<?php

$keterangan = trim($_POST['keterangan']);
$idarea = trim($_POST['idarea']);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/status_desa.php',
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
$totBlmKwn_L = 0;
$totKawin_L = 0;
$totCeraiHidup_L = 0;
$totCeraiMati_L = 0;

$totBlmKwn_P = 0;
$totKawin_P = 0;
$totCeraiHidup_P = 0;
$totCeraiMati_P = 0;

foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {

    if ($keterangan == "kota") {
      $totBlmKwn_L = $totBlmKwn_L + $val['BLM_KWN_LAKI'];
      $totBlmKwn_P = $totBlmKwn_P + $val['BLM_KWN_PEREMPUAN'];

      $totKawin_L = $totKawin_L + $val['KAWIN_LAKI'];
      $totKawin_P = $totKawin_P + $val['KAWIN_PEREMPUAN'];

      $totCeraiHidup_L = $totCeraiHidup_L + $val['CERAI_HIDUP_LAKI'];
      $totCeraiHidup_P = $totCeraiHidup_P + $val['CERAI_HIDUP_PEREMPUAN'];

      $totCeraiMati_L = $totCeraiMati_L + $val['CERAI_MATI_LAKI'];
      $totCeraiMati_P = $totCeraiMati_P + $val['CERAI_MATI_PEREMPUAN'];

    } else if ($keterangan == "kecamatan" AND $idarea == $val['NO_KEC']) {

      $totBlmKwn_L = $totBlmKwn_L + $val['BLM_KWN_LAKI'];
      $totBlmKwn_P = $totBlmKwn_P + $val['BLM_KWN_PEREMPUAN'];

      $totKawin_L = $totKawin_L + $val['KAWIN_LAKI'];
      $totKawin_P = $totKawin_P + $val['KAWIN_PEREMPUAN'];

      $totCeraiHidup_L = $totCeraiHidup_L + $val['CERAI_HIDUP_LAKI'];
      $totCeraiHidup_P = $totCeraiHidup_P + $val['CERAI_HIDUP_PEREMPUAN'];

      $totCeraiMati_L = $totCeraiMati_L + $val['CERAI_MATI_LAKI'];
      $totCeraiMati_P = $totCeraiMati_P + $val['CERAI_MATI_PEREMPUAN'];

    } else if ($keterangan == "desa" AND $idarea == $val['NO_KEL']) {
      $totBlmKwn_L = $totBlmKwn_L + $val['BLM_KWN_LAKI'];
      $totBlmKwn_P = $totBlmKwn_P + $val['BLM_KWN_PEREMPUAN'];

      $totKawin_L = $totKawin_L + $val['KAWIN_LAKI'];
      $totKawin_P = $totKawin_P + $val['KAWIN_PEREMPUAN'];

      $totCeraiHidup_L = $totCeraiHidup_L + $val['CERAI_HIDUP_LAKI'];
      $totCeraiHidup_P = $totCeraiHidup_P + $val['CERAI_HIDUP_PEREMPUAN'];

      $totCeraiMati_L = $totCeraiMati_L + $val['CERAI_MATI_LAKI'];
      $totCeraiMati_P = $totCeraiMati_P + $val['CERAI_MATI_PEREMPUAN'];
 
    }
  }
}

$a = array(
  'totBlmKwn_L' => $totBlmKwn_L, 'totKawin_L' => $totKawin_L,
  'totCeraiHidup_L' => $totCeraiHidup_L, 'totCeraiMati_L' => $totCeraiMati_L,

  'totBlmKwn_P' => $totBlmKwn_P, 'totKawin_P' => $totKawin_P,
  'totCeraiHidup_P' => $totCeraiHidup_P, 'totCeraiMati_P' => $totCeraiMati_P
);
$items[] = $a;
echo json_encode($items);
