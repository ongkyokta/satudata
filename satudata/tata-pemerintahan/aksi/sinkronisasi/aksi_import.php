<?php
error_reporting(0);

	$idinstansi =trim($_POST['idinstansi']);
	$lokasi_akta    = $_FILES['upSurat']['tmp_name'];

	$pesanError = array();
	if (trim($idinstansi)=="") {
		$pesanError[] = "Instansi tidak terdeteksi";		
	}
	if (count($pesanError)>=1 ){
			foreach ($pesanError as $indeks=>$pesan_tampil) { 
				$errMsg .="$pesan_tampil\n";	
				$status = 'err_val';
			} 
	}else{	

		if(!is_dir("../../../template-import/dinsos"))
		mkdir("../../../template-import/dinsos",0777,true); 
		$path1 = "../../../template-import/dinsos/data.xlsx";	

		if (!($lokasi_akta)==''){
			move_uploaded_file($lokasi_akta, $path1);
			$errMsg = "SUKSESS !!! Data sudah terupload !!!";
			$status = 'ok';
		} else {
			$errMsg = "GAGAL !!! Data tidak terupload !!!";
			$status = 'err';
		}
	}			
	$data = array('msg1'=>$errMsg,'msg2'=>$status);
	echo json_encode($data);
?>
