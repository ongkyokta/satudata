<?php
error_reporting(0);
require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$qri="TRUNCATE TABLE tbl_api_dinkes";	
$resqri=mysqli_query($dbconn,$qri);

$jsondata = file_get_contents('dinkes.json');
$array = json_decode($jsondata,true);
$no = 0;
foreach($array as $row) {
  $no++;        
  //$kecamatan = $row['Kecamatan'];$jmlpenduduk = $row['Jumlah_Penduduk'];
  
              $sql2  = "INSERT INTO tbl_api_dinkes (ruangan,total_tt,terisi,kosong) 
                  VALUES ('".$row['ruangan']."','".$row['total_TT']."','".$row['terisi']."','".$row['kosong']."')";
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