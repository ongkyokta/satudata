<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://simpedasign.jemberkab.go.id/simpeda-pdf/cekduk_statistik/stats_lhr.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);
curl_close($curl);

if($response){
    $json = json_decode($response,true);
    $nama =json_encode($json['data']);

    $destination = "dispenduklahir.json";
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