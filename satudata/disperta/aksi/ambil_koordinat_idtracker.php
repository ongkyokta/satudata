<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://api.trac.grin.id/track/location/user/bayu?address=true',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Api-Key: tTzoOVbP7gPqs7pAlQOx',
    'Cookie: ci_session=r98g4lq0m0tpku2ph6i0m0bdfv1pn9og'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
?>