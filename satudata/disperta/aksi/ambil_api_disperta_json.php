<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://petakomoditas.jemberkab.go.id/api/trkomoditasAPI',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer S0Ah4ppTdaOGRKQYLyUPhBI4MfneEiHE695Kxh6Y',
    'Cookie: XSRF-TOKEN=eyJpdiI6Ik1GL3UrYS84OEEvcW4zMms2V0Z5dFE9PSIsInZhbHVlIjoiNXR6NHlUakpGL2dUR1JHTUdRT3RRMFo1MkRVRHd3Ym1lSkkvYkdLQlpHYittaVZIM3ZENzFkaGUvWTQwR1JwNk5EYkx2L0I0Zk56Rnduc05Hb2Y4QkVMSVRZOVNYM2xZYzdyNTRoY3BTM0c3bHRiUllTVTlTandzMEZQdGRkL1YiLCJtYWMiOiI1OGFiOTAwNGFhODYyNjg4MDE0M2U4YmNhMGU0ZGE4ZmVmYWE3ZTEwYmI1ZDNmMjM1MzU0YjY2YTI1YjRlOGViIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkhKdTRoZzZTUlZqNmtJSXpHeVZhQ2c9PSIsInZhbHVlIjoiandlRXl4Uk5IN0U0UHZyM1Z6SXI2aEphUFJ0YmF0c0Y3b1ZmaXhudG1uVFpUT3BiYU4zQ2tCbktHNVcwc2lvMUJram1XOThFcDdKc2lGSnhRdnk3S2RNRkdpRXY3cGlMcHYxaDRmL0JCa0ZEclNWdGdIUUpib0NhL2JtRmltYkkiLCJtYWMiOiIzMTI1ZjBmN2FkNjllNmQzNjc2YWY2YjllZDZjMjE0Yjg5MTRlMmU1NmY4MzM1NTg1ZTU4ZTVmNzZjNmE1NjE4IiwidGFnIjoiIn0%3D'
  ),
));


$response = curl_exec($curl);

curl_close($curl);
echo $response;

if($response){
    $json = json_decode($response,true);
    $nama =json_encode($json['data']);

    $destination = "disperta.json";
    $file = fopen($destination, "w+");
    fputs($file,  $nama);
    fclose($file);

    $sttserror = "OK";
} else {
  $sttserror = "NO RESPON";
}

$data = array('msg2'=>$sttserror);
echo json_encode($data);
?>