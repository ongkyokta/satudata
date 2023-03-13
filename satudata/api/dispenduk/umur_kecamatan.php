<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/umur_kec.php',
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
$tot0_04 = 0;$tot05_09 = 0;
$tot10_14 = 0;$tot15_19 = 0;$tot20_24 = 0;$tot25_29 = 0;$tot30_34 = 0;
$tot35_39 = 0;$tot40_44 = 0;$tot45_49 = 0;$tot50_54 = 0;$tot55_59 = 0;
$tot60_64 = 0;$tot65_69 = 0;$tot70_74 = 0;$tot75 = 0;
foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {
    $tot0_04 = $tot0_04 + $val['"0-04_JUMLAH"'];
    $tot05_09 = $tot05_09 + $val['"05-09_JUMLAH"'];

    $tot10_14 = $tot10_14 + $val['"10-14_JUMLAH"'];
    $tot15_19 = $tot15_19 + $val['"15-19_JUMLAH"'];
    $tot20_24 = $tot20_24 + $val['"20-24_JUMLAH"'];
    $tot25_29 = $tot25_29 + $val['"25-29_JUMLAH"'];
    $tot30_34 = $tot30_34 + $val['"30-34_JUMLAH"'];

    $tot35_39 = $tot35_39 + $val['"35-39_JUMLAH"'];
    $tot40_44 = $tot40_44 + $val['"40-44_JUMLAH"'];
    $tot45_49 = $tot45_49 + $val['"45-49_JUMLAH"'];
    $tot50_54 = $tot50_54 + $val['"50-54_JUMLAH"'];
    $tot55_59 = $tot55_59 + $val['"55-59_JUMLAH"'];

    $tot60_64 = $tot60_64 + $val['"60-64_JUMLAH"'];
    $tot65_69 = $tot65_69 + $val['"65-69_JUMLAH"'];
    $tot70_74 = $tot70_74 + $val['"70-74_JUMLAH"'];
    $tot75 = $tot75 + $val['">75_JUMLAH"'];
  }
}
$a=array('balita'=>number_format($tot0_04,0,",","."),'05_09'=>number_format($tot05_09,0,",","."),
'10-14'=>number_format($tot10_14,0,",","."),'15_19'=>number_format($tot15_19,0,",","."),'20_24'=>number_format($tot20_24,0,",","."),
'25_29'=>number_format($tot25_29,0,",","."),'30_34'=>number_format($tot30_34,0,",",".")
,'35_39'=>number_format($tot35_39,0,",","."),'40_44'=>number_format($tot40_44,0,",","."),'45_49'=>number_format($tot45_49,0,",","."),
'50_54'=>number_format($tot50_54,0,",","."),'55_59'=>number_format($tot55_59,0,",",".")
,'60_64'=>number_format($tot60_64,0,",","."),'65_69'=>number_format($tot65_69,0,",",".")
,'70_74'=>number_format($tot70_74,0,",","."),'75'=>number_format($tot75,0,",","."),
'anak'=>number_format($tot05_09 + $tot10_14,0,",","."),
'remaja'=>number_format($tot15_19 + $tot20_24,0,",","."),
'dewasa'=>number_format($tot25_29 + $tot30_34 + $tot35_39 + $tot40_44 + $tot45_49 + $tot50_54,0,",","."),
'lansia'=>number_format($tot55_59 + $tot60_64 + $tot65_69 + $tot70_74 + $tot75,0,",","."));
$items[] = $a;
echo json_encode($items);
?>