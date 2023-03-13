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
    'Authorization: Bearer rKBjOV4viXmVBMhn0oT66mcu9YI0vCombDTmi7b5',
    'Cookie: XSRF-TOKEN=eyJpdiI6IkJ1NzlXbU16cmhsRjZzd01pNDFHOUE9PSIsInZhbHVlIjoiZC8yMGdVcXN2NWRSQVZlWHpCc1loTHZZNmhVWmxsa2d5djJDVzVrZmo3OUxIQWdVWWdsbWRuUW1zd2tQV3IxN3FuNHdjZHJMc3R6WnphYnNubmYrNHNQcWtVcFo3N1lXUlVSMCtUREZ2amthYXR4OCtLaFdOTW16Zzh6ZzVFZVYiLCJtYWMiOiIzZDJkMzhhNTk4NDEzNDQ4NWFiMDZkZDk0NzBlNjM1YjE3NmY5ZmU0MzJkOTQ1YzQ3MjIwNzI5NjgyYTY2ZGJjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik5hVS9GWTMvUkdER2h4bEVKZGhyZXc9PSIsInZhbHVlIjoiOEQ5SjRyc28wU3pVTjhwdzVHb2syc280S3N5Qm11YytYT0ora1BZaGJpY0RkWjVjaEMwR0tFMGhld2djVW9zSWd2SC9nNmF0QlVmeTczMlNtWmJHeGN6WGo0MXpzekswa1VmNFc1QXRHS1IrRXo1R1FjUlhNNSsvWmJlazAraTUiLCJtYWMiOiI4NzhkYjkxYWFiZDk2OWIwYjVhYzVmNzQ2NmFjOTViOTRmYjAwOTFhNzM2OGRkYzg5YjY2NzJlOTBhYzdmZmY5IiwidGFnIjoiIn0%3D'
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