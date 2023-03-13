<?php
//error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$qri="TRUNCATE TABLE tbl_dispenduk_agama";	
$resqri=mysqli_query($dbconn,$qri);

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
//echo $response;

$json = json_decode($response,true);
$nama = '['.json_encode($json['response']).']';
$data=(json_decode($nama, true));

$items = array();

foreach ($data as $key => $value) {
  foreach ($value['list'] as  $val) {

    IF ($val['ISLAM_LAKI'] == null){$l_islam = 0;} else {$l_islam = $val['ISLAM_LAKI'];}
    IF ($val['ISLAM_PEREMPUAN'] == null){$p_islam = 0;} else {$p_islam = $val['ISLAM_PEREMPUAN'];}
    IF ($val['ISLAM_JUMLAH'] == null){$jml_islam = 0;} else {$jml_islam = $val['ISLAM_JUMLAH'];}

    IF ($val['KRISTEN_LAKI'] == null){$l_kristen = 0;} else {$l_kristen = $val['KRISTEN_LAKI'];}
    IF ($val['KRISTEN_PEREMPUAN'] == null){$p_kristen = 0;} else {$p_kristen = $val['KRISTEN_PEREMPUAN'];}
    IF ($val['KRISTEN_JUMLAH'] == null){$jml_kristen = 0;} else {$jml_kristen = $val['KRISTEN_JUMLAH'];}

    IF ($val['KATHOLIK_LAKI'] == null){$l_katolik = 0;} else {$l_katolik = $val['KATHOLIK_LAKI'];}
    IF ($val['KATHOLIK_PEREMPUAN'] == null){$p_katolik = 0;} else {$p_katolik = $val['KATHOLIK_PEREMPUAN'];}
    IF ($val['KATHOLIK_JUMLAH'] == null){$jml_katolik = 0;} else {$jml_katolik = $val['KATHOLIK_JUMLAH'];}

    IF ($val['HINDU_LAKI'] == null){$l_hindu = 0;} else {$l_hindu = $val['HINDU_LAKI'];}
    IF ($val['HINDU_PEREMPUAN'] == null){$p_hindu = 0;} else {$p_hindu = $val['HINDU_PEREMPUAN'];}
    IF ($val['HINDU_JUMLAH'] == null){$jml_hindu = 0;} else {$jml_hindu = $val['HINDU_JUMLAH'];}

    IF ($val['BUDHA_LAKI'] == null){$l_budha = 0;} else {$l_budha = $val['BUDHA_LAKI'];}
    IF ($val['BUDHA_PEREMPUAN'] == null){$p_budha = 0;} else {$p_budha = $val['BUDHA_PEREMPUAN'];}
    IF ($val['BUDHA_JUMLAH'] == null){$jml_budha = 0;} else {$jml_budha = $val['BUDHA_JUMLAH'];}

    IF ($val['KHONGHUCU_LAKI'] == null){$l_konghuchu = 0;} else {$l_konghuchu = $val['KHONGHUCU_LAKI'];}
    IF ($val['KHONGHUCU_PEREMPUAN'] == null){$p_konghuchu = 0;} else {$p_konghuchu = $val['KHONGHUCU_PEREMPUAN'];}
    IF ($val['KHONGHUCU_JUMLAH'] == null){$jml_konghuchu = 0;} else {$jml_konghuchu = $val['KHONGHUCU_JUMLAH'];}

    IF ($val['KEPERCAYAAN_LAKI'] == null){$l_kepercayaan = 0;} else {$l_kepercayaan = $val['KEPERCAYAAN_LAKI'];}
    IF ($val['KEPERCAYAAN_PEREMPUAN'] == null){$p_kepercayaan = 0;} else {$p_kepercayaan = $val['KEPERCAYAAN_PEREMPUAN'];}
    IF ($val['KEPERCAYAAN_JUMLAH'] == null){$jml_kepercayaan = 0;} else {$jml_kepercayaan = $val['KEPERCAYAAN_JUMLAH'];}

    $sql2  = "INSERT INTO tbl_dispenduk_agama (kecamatan,desa,l_islam,p_islam,jml_islam,
        l_kristen,p_kristen,jml_kristen,
        l_katolik,p_katolik,jml_katolik,
        l_hindu,p_hindu,jml_hindu,
        l_budha,p_budha,jml_budha,
        l_konghuchu,p_konghuchu,jml_konghuchu,
        l_kepercayaan,p_kepercayaan,jml_kepercayaan,
        id_kecamatan,id_desa) 
                  VALUES ('".$val['NAMAKEC']."','".$val['NAMAKEL']."','".$l_islam."','".$p_islam."','".$jml_islam."',
                  '".$l_kristen."','".$p_kristen."','".$jml_kristen."',
                  '".$l_katolik."','".$p_katolik."','".$jml_katolik."',
                  '".$l_hindu."','".$p_hindu."','".$jml_hindu."',
                  '".$l_budha."','".$p_budha."','".$jml_budha."',
                  '".$l_konghuchu."','".$p_konghuchu."','".$jml_konghuchu."',
                  '".$l_kepercayaan."','".$p_kepercayaan."','".$jml_kepercayaan."',
                  '".$val['NO_KEC']."','".$val['NO_KEL']."')";
                  $res=mysqli_query($dbconn,$sql2);
 
                  
  }
}
echo $response;
//echo json_encode($items);

