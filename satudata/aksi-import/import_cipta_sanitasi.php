<?php
 require_once '../services/config.php';
 $dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

 $qri="TRUNCATE TABLE tbl_api_cipta_sanitasi";	
 $resqri=mysqli_query($dbconn,$qri);

  $nama_file_baru = 'air-minum.xlsx';

  require_once '../PHPExcel/PHPExcel.php';
  
  $excelreader = new PHPExcel_Reader_Excel2007();
  $loadexcel = $excelreader->load('../template-import/cipta-karya/'.$nama_file_baru);
  $sheet = $loadexcel->getActiveSheet()->toArray(null, true, true ,true);
 
  $sql = $pdo->prepare("INSERT INTO tbl_api_cipta_sanitasi VALUES(:jml_kk,:jml_kk_layak,:jml_babs,:kecamatan,:id_kecamatan)");


  $numrow = 1;
  foreach($sheet as $row){
    $jmlkk = $row['C']; 
    $jmlkklayak = $row['D'];
    $jmlbabs = $row['E'];
    $kecamatan = $row['B'];
    $idkecamatan = $row['A'];

    if (empty($jmlkk)){$jmlkk="0";}
    if (empty($jmlkklayak)){$jmlkklayak="0";}
    if (empty($jmlbabs)){$jmlbabs="0";}
    if (empty($kecamatan)){$kecamatan="-";}
    if (empty($idkecamatan)){$idkecamatan=NULL;}

    if(empty($jmlkk) && empty($jmlkklayak) && empty($jmlbabs) && empty($kecamatan) && empty($idkecamatan))
      continue; 

    if($numrow > 1){
      $sql->bindParam(':jml_kk', $jmlkk);
      $sql->bindParam(':jml_kk_layak', $jmlkklayak);
      $sql->bindParam(':jml_babs', $jmlbabs);
      $sql->bindParam(':kecamatan', $kecamatan);
      $sql->bindParam(':id_kecamatan', $idkecamatan);

      $sql->execute(); 
    }
    
    $numrow++; 
  }

?>