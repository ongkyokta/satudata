<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://pdesoebandi.id/informasi/api_kamar.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'x-token: kominfo2022jember'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

if($response){
    $json = json_decode($response,true);
    $nama =json_encode($json['response']);

    $destination = "dinkes.json";
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