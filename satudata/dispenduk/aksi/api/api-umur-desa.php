<?php

$keterangan = trim($_POST['keterangan']);
$idarea = trim($_POST['idarea']);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/umur_desa.php',
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
$tot0_04 = 0;
$tot05_09 = 0;
$tot10_14 = 0;
$tot15_19 = 0;
$tot20_24 = 0;
$tot25_29 = 0;
$tot30_34 = 0;
$tot35_39 = 0;
$tot40_44 = 0;
$tot45_49 = 0;
$tot50_54 = 0;
$tot55_59 = 0;
$tot60_64 = 0;
$tot65_69 = 0;
$tot70_74 = 0;
$tot75 = 0;

$tot0_04_L = 0;
$tot05_09_L = 0;
$tot10_14_L = 0;
$tot15_19_L = 0;
$tot20_24_L = 0;
$tot25_29_L = 0;
$tot30_34_L = 0;
$tot35_39_L = 0;
$tot40_44_L = 0;
$tot45_49_L = 0;
$tot50_54_L = 0;
$tot55_59_L = 0;
$tot60_64_L = 0;
$tot65_69_L = 0;
$tot70_74_L = 0;
$tot75_L = 0;

$tot0_04_P = 0;
$tot05_09_P = 0;
$tot10_14_P = 0;
$tot15_19_P = 0;
$tot20_24_P = 0;
$tot25_29_P = 0;
$tot30_34_P = 0;
$tot35_39_P = 0;
$tot40_44_P = 0;
$tot45_49_P = 0;
$tot50_54_P = 0;
$tot55_59_P = 0;
$tot60_64_P = 0;
$tot65_69_P = 0;
$tot70_74_P = 0;
$tot75_P = 0;

foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {

    if ($keterangan == "kota") {
      $tot0_04_L = $tot0_04_L + $val['"0-04_LAKI"'];
      $tot0_04_P = $tot0_04_P + $val['"0-04_PEREMPUAN"'];
      $tot0_04 = $tot0_04 + $val['"0-04_JUMLAH"'];
      $tot05_09_L = $tot05_09_L + $val['"05-09_LAKI"'];
      $tot05_09_P = $tot05_09_P + $val['"05-09_PEREMPUAN"'];
      $tot05_09 = $tot05_09 + $val['"05-09_JUMLAH"'];

      $tot10_14_L = $tot10_14_L + $val['"10-14_LAKI"'];
      $tot10_14_P = $tot10_14_P + $val['"10-14_PEREMPUAN"'];
      $tot10_14 = $tot10_14 + $val['"10-14_JUMLAH"'];
      $tot15_19_L = $tot15_19_L + $val['"15-19_LAKI"'];
      $tot15_19_P = $tot15_19_P + $val['"15-19_PEREMPUAN"'];
      $tot15_19 = $tot15_19 + $val['"15-19_JUMLAH"'];
      $tot20_24_L = $tot20_24_L + $val['"20-24_LAKI"'];
      $tot20_24_P = $tot20_24_P + $val['"20-24_PEREMPUAN"'];
      $tot20_24 = $tot20_24 + $val['"20-24_JUMLAH"'];
      $tot25_29_L =  $tot25_29_L + $val['"25-29_LAKI"'];
      $tot25_29_P = $tot25_29_P + $val['"25-29_PEREMPUAN"'];
      $tot25_29 = $tot25_29 + $val['"25-29_JUMLAH"'];
      $tot30_34_L = $tot30_34_L + $val['"30-34_LAKI"'];
      $tot30_34_P = $tot30_34_P + $val['"30-34_PEREMPUAN"'];
      $tot30_34 = $tot30_34 + $val['"30-34_JUMLAH"'];

      $tot35_39_L = $tot35_39_L + $val['"35-39_LAKI"'];
      $tot35_39_P = $tot35_39_P + $val['"35-39_PEREMPUAN"'];
      $tot35_39 = $tot35_39 + $val['"35-39_JUMLAH"'];
      $tot40_44_L = $tot40_44_L + $val['"40-44_LAKI"'];
      $tot40_44_P = $tot40_44_P + $val['"40-44_PEREMPUAN"'];
      $tot40_44 = $tot40_44 + $val['"40-44_JUMLAH"'];
      $tot45_49_L = $tot45_49_L + $val['"45-49_LAKI"'];
      $tot45_49_P = $tot45_49_P + $val['"45-49_PEREMPUAN"'];
      $tot45_49 = $tot45_49 + $val['"45-49_JUMLAH"'];
      $tot50_54_L = $tot50_54_L + $val['"50-54_LAKI"'];
      $tot50_54_P = $tot50_54_P + $val['"50-54_PEREMPUAN"'];
      $tot50_54 = $tot50_54 + $val['"50-54_JUMLAH"'];
      $tot55_59_L = $tot55_59_L + $val['"55-59_LAKI"'];
      $tot55_59_P = $tot55_59_P + $val['"55-59_PEREMPUAN"'];
      $tot55_59 = $tot55_59 + $val['"55-59_JUMLAH"'];

      $tot60_64_L = $tot60_64_L + $val['"60-64_LAKI"'];
      $tot60_64_P = $tot60_64_P + $val['"60-64_PEREMPUAN"'];
      $tot60_64 = $tot60_64 + $val['"60-64_JUMLAH"'];
      $tot65_69_L = $tot65_69_L + $val['"65-69_LAKI"'];
      $tot65_69_P = $tot65_69_P + $val['"65-69_PEREMPUAN"'];
      $tot65_69 = $tot65_69 + $val['"65-69_JUMLAH"'];
      $tot70_74_L = $tot70_74_L + $val['"70-74_LAKI"'];
      $tot70_74_P = $tot70_74_P + $val['"70-74_PEREMPUAN"'];
      $tot70_74 = $tot70_74 + $val['"70-74_JUMLAH"'];
      $tot75_L = $tot75_L + $val['">75_LAKI"'];
      $tot75_P = $tot75_P + $val['">75_PEREMPUAN"'];
      $tot75 = $tot75 + $val['">75_JUMLAH"'];

    } else if ($keterangan == "kecamatan" AND $idarea == $val['NO_KEC']) {

      $tot0_04_L = $tot0_04_L + $val['"0-04_LAKI"'];
      $tot0_04_P = $tot0_04_P + $val['"0-04_PEREMPUAN"'];
      $tot0_04 = $tot0_04 + $val['"0-04_JUMLAH"'];
      $tot05_09_L = $tot05_09_L + $val['"05-09_LAKI"'];
      $tot05_09_P = $tot05_09_P + $val['"05-09_PEREMPUAN"'];
      $tot05_09 = $tot05_09 + $val['"05-09_JUMLAH"'];

      $tot10_14_L = $tot10_14_L + $val['"10-14_LAKI"'];
      $tot10_14_P = $tot10_14_P + $val['"10-14_PEREMPUAN"'];
      $tot10_14 = $tot10_14 + $val['"10-14_JUMLAH"'];
      $tot15_19_L = $tot15_19_L + $val['"15-19_LAKI"'];
      $tot15_19_P = $tot15_19_P + $val['"15-19_PEREMPUAN"'];
      $tot15_19 = $tot15_19 + $val['"15-19_JUMLAH"'];
      $tot20_24_L = $tot20_24_L + $val['"20-24_LAKI"'];
      $tot20_24_P = $tot20_24_P + $val['"20-24_PEREMPUAN"'];
      $tot20_24 = $tot20_24 + $val['"20-24_JUMLAH"'];
      $tot25_29_L =  $tot25_29_L + $val['"25-29_LAKI"'];
      $tot25_29_P = $tot25_29_P + $val['"25-29_PEREMPUAN"'];
      $tot25_29 = $tot25_29 + $val['"25-29_JUMLAH"'];
      $tot30_34_L = $tot30_34_L + $val['"30-34_LAKI"'];
      $tot30_34_P = $tot30_34_P + $val['"30-34_PEREMPUAN"'];
      $tot30_34 = $tot30_34 + $val['"30-34_JUMLAH"'];

      $tot35_39_L = $tot35_39_L + $val['"35-39_LAKI"'];
      $tot35_39_P = $tot35_39_P + $val['"35-39_PEREMPUAN"'];
      $tot35_39 = $tot35_39 + $val['"35-39_JUMLAH"'];
      $tot40_44_L = $tot40_44_L + $val['"40-44_LAKI"'];
      $tot40_44_P = $tot40_44_P + $val['"40-44_PEREMPUAN"'];
      $tot40_44 = $tot40_44 + $val['"40-44_JUMLAH"'];
      $tot45_49_L = $tot45_49_L + $val['"45-49_LAKI"'];
      $tot45_49_P = $tot45_49_P + $val['"45-49_PEREMPUAN"'];
      $tot45_49 = $tot45_49 + $val['"45-49_JUMLAH"'];
      $tot50_54_L = $tot50_54_L + $val['"50-54_LAKI"'];
      $tot50_54_P = $tot50_54_P + $val['"50-54_PEREMPUAN"'];
      $tot50_54 = $tot50_54 + $val['"50-54_JUMLAH"'];
      $tot55_59_L = $tot55_59_L + $val['"55-59_LAKI"'];
      $tot55_59_P = $tot55_59_P + $val['"55-59_PEREMPUAN"'];
      $tot55_59 = $tot55_59 + $val['"55-59_JUMLAH"'];

      $tot60_64_L = $tot60_64_L + $val['"60-64_LAKI"'];
      $tot60_64_P = $tot60_64_P + $val['"60-64_PEREMPUAN"'];
      $tot60_64 = $tot60_64 + $val['"60-64_JUMLAH"'];
      $tot65_69_L = $tot65_69_L + $val['"65-69_LAKI"'];
      $tot65_69_P = $tot65_69_P + $val['"65-69_PEREMPUAN"'];
      $tot65_69 = $tot65_69 + $val['"65-69_JUMLAH"'];
      $tot70_74_L = $tot70_74_L + $val['"70-74_LAKI"'];
      $tot70_74_P = $tot70_74_P + $val['"70-74_PEREMPUAN"'];
      $tot70_74 = $tot70_74 + $val['"70-74_JUMLAH"'];
      $tot75_L = $tot75_L + $val['">75_LAKI"'];
      $tot75_P = $tot75_P + $val['">75_PEREMPUAN"'];
      $tot75 = $tot75 + $val['">75_JUMLAH"'];

    } else if ($keterangan == "desa" AND $idarea == $val['NO_KEL']) {
      $tot0_04_L = $tot0_04_L + $val['"0-04_LAKI"'];
      $tot0_04_P = $tot0_04_P + $val['"0-04_PEREMPUAN"'];
      $tot0_04 = $tot0_04 + $val['"0-04_JUMLAH"'];
      $tot05_09_L = $tot05_09_L + $val['"05-09_LAKI"'];
      $tot05_09_P = $tot05_09_P + $val['"05-09_PEREMPUAN"'];
      $tot05_09 = $tot05_09 + $val['"05-09_JUMLAH"'];

      $tot10_14_L = $tot10_14_L + $val['"10-14_LAKI"'];
      $tot10_14_P = $tot10_14_P + $val['"10-14_PEREMPUAN"'];
      $tot10_14 = $tot10_14 + $val['"10-14_JUMLAH"'];
      $tot15_19_L = $tot15_19_L + $val['"15-19_LAKI"'];
      $tot15_19_P = $tot15_19_P + $val['"15-19_PEREMPUAN"'];
      $tot15_19 = $tot15_19 + $val['"15-19_JUMLAH"'];
      $tot20_24_L = $tot20_24_L + $val['"20-24_LAKI"'];
      $tot20_24_P = $tot20_24_P + $val['"20-24_PEREMPUAN"'];
      $tot20_24 = $tot20_24 + $val['"20-24_JUMLAH"'];
      $tot25_29_L =  $tot25_29_L + $val['"25-29_LAKI"'];
      $tot25_29_P = $tot25_29_P + $val['"25-29_PEREMPUAN"'];
      $tot25_29 = $tot25_29 + $val['"25-29_JUMLAH"'];
      $tot30_34_L = $tot30_34_L + $val['"30-34_LAKI"'];
      $tot30_34_P = $tot30_34_P + $val['"30-34_PEREMPUAN"'];
      $tot30_34 = $tot30_34 + $val['"30-34_JUMLAH"'];

      $tot35_39_L = $tot35_39_L + $val['"35-39_LAKI"'];
      $tot35_39_P = $tot35_39_P + $val['"35-39_PEREMPUAN"'];
      $tot35_39 = $tot35_39 + $val['"35-39_JUMLAH"'];
      $tot40_44_L = $tot40_44_L + $val['"40-44_LAKI"'];
      $tot40_44_P = $tot40_44_P + $val['"40-44_PEREMPUAN"'];
      $tot40_44 = $tot40_44 + $val['"40-44_JUMLAH"'];
      $tot45_49_L = $tot45_49_L + $val['"45-49_LAKI"'];
      $tot45_49_P = $tot45_49_P + $val['"45-49_PEREMPUAN"'];
      $tot45_49 = $tot45_49 + $val['"45-49_JUMLAH"'];
      $tot50_54_L = $tot50_54_L + $val['"50-54_LAKI"'];
      $tot50_54_P = $tot50_54_P + $val['"50-54_PEREMPUAN"'];
      $tot50_54 = $tot50_54 + $val['"50-54_JUMLAH"'];
      $tot55_59_L = $tot55_59_L + $val['"55-59_LAKI"'];
      $tot55_59_P = $tot55_59_P + $val['"55-59_PEREMPUAN"'];
      $tot55_59 = $tot55_59 + $val['"55-59_JUMLAH"'];

      $tot60_64_L = $tot60_64_L + $val['"60-64_LAKI"'];
      $tot60_64_P = $tot60_64_P + $val['"60-64_PEREMPUAN"'];
      $tot60_64 = $tot60_64 + $val['"60-64_JUMLAH"'];
      $tot65_69_L = $tot65_69_L + $val['"65-69_LAKI"'];
      $tot65_69_P = $tot65_69_P + $val['"65-69_PEREMPUAN"'];
      $tot65_69 = $tot65_69 + $val['"65-69_JUMLAH"'];
      $tot70_74_L = $tot70_74_L + $val['"70-74_LAKI"'];
      $tot70_74_P = $tot70_74_P + $val['"70-74_PEREMPUAN"'];
      $tot70_74 = $tot70_74 + $val['"70-74_JUMLAH"'];
      $tot75_L = $tot75_L + $val['">75_LAKI"'];
      $tot75_P = $tot75_P + $val['">75_PEREMPUAN"'];
      $tot75 = $tot75 + $val['">75_JUMLAH"'];
    }
  }
}

$a = array(
  'jum_0_4_L' => $tot0_04_L, 'jum_05_09_L' => $tot05_09_L,
  'jum_10_14_L' => $tot10_14_L, 'jum_15_19_L' => $tot15_19_L, 'jum_20_24_L' => $tot20_24_L,
  'jum_25_29_L' => $tot25_29_L, 'jum_30_34_L' => $tot30_34_L, 'jum_35_39_L' => $tot35_39_L, 'jum_40_44_L' => $tot40_44_L, 'jum_45_49_L' => $tot45_49_L,
  'jum_50_54_L' => $tot50_54_L, 'jum_55_59_L' => $tot55_59_L, 'jum_60_64_L' => $tot60_64_L, 'jum_65_69_L' => $tot65_69_L, 'jum_70_74_L' => $tot70_74_L, 'jum_75_L' => $tot75_L,

  'jum_0_4_P' => $tot0_04_P, 'jum_05_09_P' => $tot05_09_P,
  'jum_10_14_P' => $tot10_14_P, 'jum_15_19_P' => $tot15_19_P, 'jum_20_24_P' => $tot20_24_P,
  'jum_25_29_P' => $tot25_29_P, 'jum_30_34_P' => $tot30_34_P, 'jum_35_39_P' => $tot35_39_P, 'jum_40_44_P' => $tot40_44_P, 'jum_45_49_P' => $tot45_49_P,
  'jum_50_54_P' => $tot50_54_P, 'jum_55_59_P' => $tot55_59_P, 'jum_60_64_P' => $tot60_64_P, 'jum_65_69_P' => $tot65_69_P, 'jum_70_74_P' => $tot70_74_P, 'jum_75_P' => $tot75_P,

  'jum_0_4' => $tot0_04, 'jum_05_09' => $tot05_09,
  'jum_10_14' => $tot10_14, 'jum_15_19' => $tot15_19, 'jum_20_24' => $tot20_24,
  'jum_25_29' => $tot25_29, 'jum_30_34' => $tot30_34, 'jum_35_39' => $tot35_39, 'jum_40_44' => $tot40_44, 'jum_45_49' => $tot45_49,
  'jum_50_54' => $tot50_54, 'jum_55_59' => $tot55_59, 'jum_60_64' => $tot60_64, 'jum_65_69' => $tot65_69, 'jum_70_74' => $tot70_74, 'jum_75' => $tot75
);
$items[] = $a;
echo json_encode($items);
