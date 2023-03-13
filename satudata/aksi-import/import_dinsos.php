<?php
 require_once '../services/config.php';
 $dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

 //$qri="TRUNCATE TABLE tbl_api_dinsos";	
 //$resqri=mysqli_query($dbconn,$qri);

  $nama_file_baru = 'data1.xlsx';

  require_once '../PHPExcel/PHPExcel.php';
  
  $excelreader = new PHPExcel_Reader_Excel2007();
  $loadexcel = $excelreader->load('../template-import/dinsos/'.$nama_file_baru);
  $sheet = $loadexcel->getActiveSheet()->toArray(null, true, true ,true);
 
  $sql = $pdo->prepare("INSERT INTO tbl_api_dinsos VALUES(:nik,:kk,:nama,:tgl_lahir,:alamat,:rt,:rw,:desa,:kecamatan,
						:pekerjaan,:status,:nm_ibu,:bansos_bpnt,:bansos_pkh,:bansos_ppkm,:pbi_jkn,:id_kecamatan,:id_desa)");

  $numrow = 1;
  foreach($sheet as $row){
    $nik = $row['A']; 
    $kk = $row['B'];
    $nama = $row['C'];
    $tgl_lahir = $row['D']; 
    $alamat = $row['E'];
    $rt = $row['F']; 
    $rw = $row['G'];
    $desa = $row['H'];
	  $kecamatan = $row['I'];
    $pekerjaan = $row['J']; 
    $status = $row['K'];
    $nm_ibu = $row['L'];
    $bansos_bpnt = $row['M'];
    $bansos_pkh = $row['N']; 
    $bansos_ppkm = $row['O'];
	  $pbi_jkn = $row['P'];
    $idkecamatan = $row['Q'];$iddesa = $row['R'];

    if (empty($status)){$status="-";}
    if (empty($bansos_bpnt)){$bansos_bpnt="-";}
    if (empty($bansos_pkh)){$bansos_pkh="-";}
    if (empty($bansos_ppkm)){$bansos_ppkm="-";}
    if (empty($pbi_jkn)){$pbi_jkn="-";}
    if (empty($idkecamatan)){$idkecamatan="-";}
    if (empty($iddesa)){$iddesa="-";}

    if(empty($nik) && empty($kk) && empty($nama) && empty($tgl_lahir) && empty($alamat) && empty($rt) && empty($rw) && empty($desa) && empty($kecamatan) &&
		empty($pekerjaan) && empty($status) && empty($nm_ibu) && empty($bansos_bpnt) && empty($bansos_pkh) && empty($bansos_ppkm) && empty($pbi_jkn) && empty($idkecamatan) && empty($iddesa))
      continue; 

    if($numrow > 1){
      $sql->bindParam(':nik', $nik);
      $sql->bindParam(':kk', $kk);
      $sql->bindParam(':nama', $nama);
      $sql->bindParam(':tgl_lahir', $tgl_lahir);
      $sql->bindParam(':alamat', $alamat);
	  
      $sql->bindParam(':rt', $rt);
      $sql->bindParam(':rw', $rw);
      $sql->bindParam(':desa', $desa);
	    $sql->bindParam(':kecamatan', $kecamatan);
      $sql->bindParam(':pekerjaan', $pekerjaan);
      $sql->bindParam(':status', $status);	 
	  
      $sql->bindParam(':nm_ibu', $nm_ibu);
      $sql->bindParam(':bansos_bpnt', $bansos_bpnt);
      $sql->bindParam(':bansos_pkh', $bansos_pkh);
      $sql->bindParam(':bansos_ppkm', $bansos_ppkm);
      $sql->bindParam(':pbi_jkn', $pbi_jkn);
      $sql->bindParam(':id_kecamatan', $idkecamatan);
      $sql->bindParam(':id_desa', $iddesa);
	  
      $sql->execute(); 
    }
    
    $numrow++; 
  }

?>