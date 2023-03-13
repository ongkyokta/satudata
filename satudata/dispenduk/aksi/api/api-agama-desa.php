<?php

$keterangan = trim($_POST['keterangan']);
$idarea = trim($_POST['idarea']);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/agama_desa.php',
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
$totIslam_L = 0;
$totKristen_L = 0;
$totKatholik_L = 0;
$totHindu_L = 0;
$totBudha_L = 0;$totKhonghucu_L = 0;$totKepercayaan_L = 0;

$totIslam_P = 0;
$totKristen_P = 0;
$totKatholik_P = 0;
$totHindu_P = 0;
$totBudha_P = 0;$totKhonghucu_P = 0;$totKepercayaan_P = 0;

foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {

    if ($val['ISLAM_LAKI'] == null) {$islam_L = 0;} else {$islam_L = $val['ISLAM_LAKI'];}
    if ($val['ISLAM_PEREMPUAN'] == null) {$islam_P = 0;} else {$islam_P = $val['ISLAM_PEREMPUAN'];}

    if ($val['KRISTEN_LAKI'] == null) {$kristen_L = 0;} else {$kristen_L = $val['KRISTEN_LAKI'];}
    if ($val['KRISTEN_PEREMPUAN'] == null) {$kristen_P = 0;} else {$kristen_P = $val['KRISTEN_PEREMPUAN'];}

    if ($val['KATHOLIK_LAKI'] == null) {$katholik_L = 0;} else {$katholik_L = $val['KATHOLIK_LAKI'];}
    if ($val['KATHOLIK_PEREMPUAN'] == null) {$katholik_P = 0;} else {$katholik_P = $val['KATHOLIK_PEREMPUAN'];}

    if ($val['HINDU_LAKI'] == null) {$hindu_L = 0;} else {$hindu_L = $val['HINDU_LAKI'];}
    if ($val['HINDU_PEREMPUAN'] == null) {$hindu_P = 0;} else {$hindu_P = $val['HINDU_PEREMPUAN'];}

    if ($val['BUDHA_LAKI'] == null) {$budha_L = 0;} else {$budha_L = $val['BUDHA_LAKI'];}
    if ($val['BUDHA_PEREMPUAN'] == null) {$budha_P = 0;} else {$budha_P = $val['BUDHA_PEREMPUAN'];}

    if ($val['KHONGHUCU_LAKI'] == null) {$khonghucu_L = 0;} else {$khonghucu_L = $val['KHONGHUCU_LAKI'];}
    if ($val['KHONGHUCU_PEREMPUAN'] == null) {$khonghucu_P = 0;} else {$khonghucu_P = $val['KHONGHUCU_PEREMPUAN'];}

    if ($val['KEPERCAYAAN_LAKI'] == null) {$kepercayaan_L = 0;} else {$kepercayaan_L = $val['KEPERCAYAAN_LAKI'];}
    if ($val['KEPERCAYAAN_PEREMPUAN'] == null) {$kepercayaan_P = 0;} else {$kepercayaan_P = $val['KEPERCAYAAN_PEREMPUAN'];}

    if ($keterangan == "kota") {
      $totIslam_L = $totIslam_L + $islam_L;
      $totIslam_P = $totIslam_P + $islam_P;

      $totKristen_L = $totKristen_L + $kristen_L;
      $totKristen_P = $totKristen_P + $kristen_P;

      $totKatholik_L = $totKatholik_L + $katholik_L;
      $totKatholik_P = $totKatholik_P + $katholik_P;

      $totHindu_L = $totHindu_L + $hindu_L;
      $totHindu_P = $totHindu_P + $hindu_P;

      $totBudha_L = $totBudha_L + $budha_L;
      $totBudha_P = $totBudha_P + $budha_P;

      $totKhonghucu_L = $totKhonghucu_L + $khonghucu_L;
      $totKhonghucu_P = $totKhonghucu_P + $khonghucu_P;

      $totKepercayaan_L = $totKepercayaan_L + $kepercayaan_L;
      $totKepercayaan_P = $totKepercayaan_P + $kepercayaan_P;

    } else if ($keterangan == "kecamatan" AND $idarea == $val['NO_KEC']) {

      $totIslam_L = $totIslam_L + $islam_L;
      $totIslam_P = $totIslam_P + $islam_P;

      $totKristen_L = $totKristen_L + $kristen_L;
      $totKristen_P = $totKristen_P + $kristen_P;

      $totKatholik_L = $totKatholik_L + $katholik_L;
      $totKatholik_P = $totKatholik_P + $katholik_P;

      $totHindu_L = $totHindu_L + $hindu_L;
      $totHindu_P = $totHindu_P + $hindu_P;

      $totBudha_L = $totBudha_L + $budha_L;
      $totBudha_P = $totBudha_P + $budha_P;

      $totKhonghucu_L = $totKhonghucu_L + $khonghucu_L;
      $totKhonghucu_P = $totKhonghucu_P + $khonghucu_P;

      $totKepercayaan_L = $totKepercayaan_L + $kepercayaan_L;
      $totKepercayaan_P = $totKepercayaan_P + $kepercayaan_P;

    } else if ($keterangan == "desa" AND $idarea == $val['NO_KEL']) {
      $totIslam_L = $totIslam_L + $islam_L;
      $totIslam_P = $totIslam_P + $islam_P;

      $totKristen_L = $totKristen_L + $kristen_L;
      $totKristen_P = $totKristen_P + $kristen_P;

      $totKatholik_L = $totKatholik_L + $katholik_L;
      $totKatholik_P = $totKatholik_P + $katholik_P;

      $totHindu_L = $totHindu_L + $hindu_L;
      $totHindu_P = $totHindu_P + $hindu_P;

      $totBudha_L = $totBudha_L + $budha_L;
      $totBudha_P = $totBudha_P + $budha_P;

      $totKhonghucu_L = $totKhonghucu_L + $khonghucu_L;
      $totKhonghucu_P = $totKhonghucu_P + $khonghucu_P;

      $totKepercayaan_L = $totKepercayaan_L + $kepercayaan_L;
      $totKepercayaan_P = $totKepercayaan_P + $kepercayaan_P;
 
    }
  }
}

$a = array(
  'totIslam_L' => $totIslam_L, 'totKristen_L' => $totKristen_L,
  'totKatholik_L' => $totKatholik_L, 'totHindu_L' => $totHindu_L,
  'totBudha_L' => $totBudha_L, 'totKhonghucu_L' => $totKhonghucu_L,'totKepercayaan_L' => $totKepercayaan_L,

  'totIslam_P' => $totIslam_P, 'totKristen_P' => $totKristen_P,
  'totKatholik_P' => $totKatholik_P, 'totHindu_P' => $totHindu_P,
  'totBudha_P' => $totBudha_P, 'totKhonghucu_P' => $totKhonghucu_P,'totKepercayaan_P' => $totKepercayaan_P
);
$items[] = $a;
echo json_encode($items);
