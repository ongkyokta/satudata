<?php
error_reporting(0);
require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$qri="TRUNCATE TABLE tbl_api_disperta";	
$resqri=mysqli_query($dbconn,$qri);

$jsondata = file_get_contents('disperta.json');
$array = json_decode($jsondata,true);
$no = 0;
foreach($array as $row) {
  $no++;        
  //$kecamatan = $row['Kecamatan'];$jmlpenduduk = $row['Jumlah_Penduduk'];
  
              $sql2  = "INSERT INTO tbl_api_disperta (id,id_komoditas,nm_komoditas,luas_panen,luas_tanam,id_desa,nm_desa,id_kecamatan,nm_kecamatan,hasil,satuan,jenis) 
                  VALUES ('".$row['id']."','".$row['tm_komoditas_id']."','".$row['nama_komoditas']."','".$row['luas_panen']."','".$row['luas_tanam']."','".$row['tm_desa_id']."','".$row['nama_desa']."',
                  '".$row['tm_kecamatan_id']."','".$row['nama_kecamatan']."','".$row['hasil']."','".$row['satuan']."','".$row['jenis']."')";
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