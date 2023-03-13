<?php

$keterangan = trim($_POST['keterangan']);
$idarea = trim($_POST['idarea']);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://siapdukcapil.jemberkab.go.id/mantap/api/pekerjaan_desa.php',
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
$totTDK_KRJ_L = 0;
$totAPARATUR_L = 0;
$totPENGAJAR_L = 0;
$totWIRASWASTA_L = 0;
$totPETANI_L = 0;$totNELAYAN_L = 0;$totAGAMA_L = 0;$totPELAJAR_L = 0;
$totNAKES_L = 0;$totPENSIUNAN_L = 0;$totLAINNYA_L = 0;

$totTDK_KRJ_P = 0;
$totAPARATUR_P = 0;
$totPENGAJAR_P = 0;
$totWIRASWASTA_P = 0;
$totPETANI_P = 0;$totNELAYAN_P = 0;$totAGAMA_P = 0;$totPELAJAR_P = 0;
$totNAKES_P = 0;$totPENSIUNAN_P = 0;$totLAINNYA_P = 0;

foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {

    if ($keterangan == "kota") {

      $totTDK_KRJ_L = $totTDK_KRJ_L + $val['TDK_KRJ_LAKI'];
      $totTDK_KRJ_P = $totTDK_KRJ_P + $val['TDK_KRJ_PEREMPUAN'];

      $totAPARATUR_L = $totAPARATUR_L + $val['APARATUR_LAKI'];
      $totAPARATUR_P = $totAPARATUR_P + $val['APARATUR_PEREMPUAN'];

      $totPENGAJAR_L = $totPENGAJAR_L + $val['PENGAJAR_LAKI'];
      $totPENGAJAR_P = $totPENGAJAR_P + $val['PENGAJAR_PEREMPUAN'];

      $totWIRASWASTA_L = $totWIRASWASTA_L + $val['WIRASWASTA_LAKI'];
      $totWIRASWASTA_P = $totWIRASWASTA_P + $val['WIRASWASTA_PEREMPUAN'];

      //////////////////////////////////////////////
      $totPETANI_L = $totPETANI_L + $val['PETANI_LAKI'];
      $totPETANI_P = $totPETANI_P + $val['PETANI_PEREMPUAN'];

      $totNELAYAN_L = $totNELAYAN_L + $val['NELAYAN_LAKI'];
      $totNELAYAN_P = $totNELAYAN_P + $val['NELAYAN_PEREMPUAN'];

      $totAGAMA_L = $totAGAMA_L + $val['AGAMA_LAKI'];
      $totAGAMA_P = $totAGAMA_P + $val['AGAMA_PEREMPUAN'];

      $totPELAJAR_L = $totPELAJAR_L + $val['PELAJAR_LAKI'];
      $totPELAJAR_P = $totPELAJAR_P + $val['PELAJAR_PEREMPUAN'];

      $totNAKES_L = $totNAKES_L + $val['NAKES_LAKI'];
      $totNAKES_P = $totNAKES_P + $val['NAKES_PEREMPUAN'];

      $totPENSIUNAN_L = $totPENSIUNAN_L + $val['PENSIUNAN_LAKI'];
      $totPENSIUNAN_P = $totPENSIUNAN_P + $val['PENSIUNAN_PEREMPUAN'];

      $totLAINNYA_L = $totLAINNYA_L + $val['LAINNYA_LAKI'];
      $totLAINNYA_P = $totLAINNYA_P + $val['LAINNYA_PEREMPUAN'];
      //////////////////////////////////////////////

    } else if ($keterangan == "kecamatan" AND $idarea == $val['NO_KEC']) {

      $totTDK_KRJ_L = $totTDK_KRJ_L + $val['TDK_KRJ_LAKI'];
      $totTDK_KRJ_P = $totTDK_KRJ_P + $val['TDK_KRJ_PEREMPUAN'];

      $totAPARATUR_L = $totAPARATUR_L + $val['APARATUR_LAKI'];
      $totAPARATUR_P = $totAPARATUR_P + $val['APARATUR_PEREMPUAN'];

      $totPENGAJAR_L = $totPENGAJAR_L + $val['PENGAJAR_LAKI'];
      $totPENGAJAR_P = $totPENGAJAR_P + $val['PENGAJAR_PEREMPUAN'];

      $totWIRASWASTA_L = $totWIRASWASTA_L + $val['WIRASWASTA_LAKI'];
      $totWIRASWASTA_P = $totWIRASWASTA_P + $val['WIRASWASTA_PEREMPUAN'];

      //////////////////////////////////////////////
      $totPETANI_L = $totPETANI_L + $val['PETANI_LAKI'];
      $totPETANI_P = $totPETANI_P + $val['PETANI_PEREMPUAN'];

      $totNELAYAN_L = $totNELAYAN_L + $val['NELAYAN_LAKI'];
      $totNELAYAN_P = $totNELAYAN_P + $val['NELAYAN_PEREMPUAN'];

      $totAGAMA_L = $totAGAMA_L + $val['AGAMA_LAKI'];
      $totAGAMA_P = $totAGAMA_P + $val['AGAMA_PEREMPUAN'];

      $totPELAJAR_L = $totPELAJAR_L + $val['PELAJAR_LAKI'];
      $totPELAJAR_P = $totPELAJAR_P + $val['PELAJAR_PEREMPUAN'];

      $totNAKES_L = $totNAKES_L + $val['NAKES_LAKI'];
      $totNAKES_P = $totNAKES_P + $val['NAKES_PEREMPUAN'];

      $totPENSIUNAN_L = $totPENSIUNAN_L + $val['PENSIUNAN_LAKI'];
      $totPENSIUNAN_P = $totPENSIUNAN_P + $val['PENSIUNAN_PEREMPUAN'];

      $totLAINNYA_L = $totLAINNYA_L + $val['LAINNYA_LAKI'];
      $totLAINNYA_P = $totLAINNYA_P + $val['LAINNYA_PEREMPUAN'];
      //////////////////////////////////////////////

    } else if ($keterangan == "desa" AND $idarea == $val['NO_KEL']) {

      $totTDK_KRJ_L = $totTDK_KRJ_L + $val['TDK_KRJ_LAKI'];
      $totTDK_KRJ_P = $totTDK_KRJ_P + $val['TDK_KRJ_PEREMPUAN'];

      $totAPARATUR_L = $totAPARATUR_L + $val['APARATUR_LAKI'];
      $totAPARATUR_P = $totAPARATUR_P + $val['APARATUR_PEREMPUAN'];

      $totPENGAJAR_L = $totPENGAJAR_L + $val['PENGAJAR_LAKI'];
      $totPENGAJAR_P = $totPENGAJAR_P + $val['PENGAJAR_PEREMPUAN'];

      $totWIRASWASTA_L = $totWIRASWASTA_L + $val['WIRASWASTA_LAKI'];
      $totWIRASWASTA_P = $totWIRASWASTA_P + $val['WIRASWASTA_PEREMPUAN'];

      //////////////////////////////////////////////
      $totPETANI_L = $totPETANI_L + $val['PETANI_LAKI'];
      $totPETANI_P = $totPETANI_P + $val['PETANI_PEREMPUAN'];

      $totNELAYAN_L = $totNELAYAN_L + $val['NELAYAN_LAKI'];
      $totNELAYAN_P = $totNELAYAN_P + $val['NELAYAN_PEREMPUAN'];

      $totAGAMA_L = $totAGAMA_L + $val['AGAMA_LAKI'];
      $totAGAMA_P = $totAGAMA_P + $val['AGAMA_PEREMPUAN'];

      $totPELAJAR_L = $totPELAJAR_L + $val['PELAJAR_LAKI'];
      $totPELAJAR_P = $totPELAJAR_P + $val['PELAJAR_PEREMPUAN'];

      $totNAKES_L = $totNAKES_L + $val['NAKES_LAKI'];
      $totNAKES_P = $totNAKES_P + $val['NAKES_PEREMPUAN'];

      $totPENSIUNAN_L = $totPENSIUNAN_L + $val['PENSIUNAN_LAKI'];
      $totPENSIUNAN_P = $totPENSIUNAN_P + $val['PENSIUNAN_PEREMPUAN'];

      $totLAINNYA_L = $totLAINNYA_L + $val['LAINNYA_LAKI'];
      $totLAINNYA_P = $totLAINNYA_P + $val['LAINNYA_PEREMPUAN'];
      //////////////////////////////////////////////
    }
  }
}

$a = array(
  'totTDK_KRJ_L' => $totTDK_KRJ_L, 'totAPARATUR_L' => $totAPARATUR_L,
  'totPENGAJAR_L' => $totPENGAJAR_L, 'totWIRASWASTA_L' => $totWIRASWASTA_L,
  'totPETANI_L' => $totPETANI_L, 'totNELAYAN_L' => $totNELAYAN_L,'totAGAMA_L' => $totAGAMA_L, 
  'totPELAJAR_L' => $totPELAJAR_L,'totNAKES_L' => $totNAKES_L, 'totPENSIUNAN_L' => $totPENSIUNAN_L,'totLAINNYA_L' => $totLAINNYA_L,

  'totTDK_KRJ_P' => $totTDK_KRJ_P, 'totAPARATUR_P' => $totAPARATUR_P,
  'totPENGAJAR_P' => $totPENGAJAR_P, 'totWIRASWASTA_P' => $totWIRASWASTA_P,
  'totPETANI_P' => $totPETANI_P, 'totNELAYAN_P' => $totNELAYAN_P,'totAGAMA_P' => $totAGAMA_P,
  'totPELAJAR_P' => $totPELAJAR_P,'totNAKES_P' => $totNAKES_P, 'totPENSIUNAN_P' => $totPENSIUNAN_P,'totLAINNYA_P' => $totLAINNYA_P
);
$items[] = $a;
echo json_encode($items);
