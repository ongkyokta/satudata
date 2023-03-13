<?php
 require_once '../services/config.php';
 $dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

 $qri="TRUNCATE TABLE tbl_api_cipta_air";	
 $resqri=mysqli_query($dbconn,$qri);

  $nama_file_baru = 'air-minum.xlsx';

  require_once '../PHPExcel/PHPExcel.php';
  
  $excelreader = new PHPExcel_Reader_Excel2007();
  $loadexcel = $excelreader->load('../template-import/cipta-karya/'.$nama_file_baru);
  $sheet = $loadexcel->getActiveSheet()->toArray(null, true, true ,true);
 
  $sql = $pdo->prepare("INSERT INTO tbl_api_cipta_air VALUES(:jml_kk,:jml_sr,:jml_sr_pdam,:jml_total,:kecamatan,:id_kecamatan)");


  $numrow = 1;
  foreach($sheet as $row){
    $jmlkk = $row['C']; 
    $jmlsr = $row['D'];
    $jmlsrpdam = $row['E'];
    $jmltotal = $row['F']; 
    $kecamatan = $row['B'];
    $idkecamatan = $row['A'];

    if (empty($jmlkk)){$jmlkk="0";}
    if (empty($jmlsr)){$jmlsr="0";}
    if (empty($jmlsrpdam)){$jmlsrpdam="0";}
    if (empty($jmltotal)){$jmltotal="0";}
    if (empty($kecamatan)){$kecamatan="-";}
    if (empty($idkecamatan)){$idkecamatan=NULL;}

    if(empty($jmlkk) && empty($jmlsr) && empty($jmlsrpdam) && empty($jmltotal) && empty($kecamatan) && empty($idkecamatan))
      continue; 

    if($numrow > 1){
      $sql->bindParam(':jml_kk', $jmlkk);
      $sql->bindParam(':jml_sr', $jmlsr);
      $sql->bindParam(':jml_sr_pdam', $jmlsrpdam);
      $sql->bindParam(':jml_total', $jmltotal);
      $sql->bindParam(':kecamatan', $kecamatan);
      $sql->bindParam(':id_kecamatan', $idkecamatan);

      $sql->execute(); 
    }
    
    $numrow++; 
  }

?>