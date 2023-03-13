<?php
error_reporting(0);
require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$qri="TRUNCATE TABLE tbl_api_dispenduk_lahir";	
$resqri=mysqli_query($dbconn,$qri);

$jsondata = file_get_contents('dispenduklahir.json');
$array = json_decode($jsondata,true);
$no = 0;
foreach($array as $row) {
  $no++;        
  //$kecamatan = $row['Kecamatan'];$jmlpenduduk = $row['Jumlah_Penduduk'];
  
              $sql2  = "INSERT INTO tbl_api_dispenduk_lahir (tmp_lahir,jumlah) 
                  VALUES ('".$row['Tempat_Lahir']."','".$row['Jumlah']."')";
                  $res=mysqli_query($dbconn,$sql2);
}

                  if($res){
                    $errMsg = "SUKSESS !!! Data sudah disimpan !!!";
                    $status = 'ok';
                  }else{
                    $errMsg = "GAGAL !!! Data tidak bisa disimpan !!!";
                    $status = 'err';
                  }		
                
$data = array('msg1'=>$errMsg,'msg2'=>$status);
                echo json_encode($data);
                
                mysqli_free_result($res);
                mysqli_close($dbconn);

?>