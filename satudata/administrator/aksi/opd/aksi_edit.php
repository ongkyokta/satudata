<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

function anti_injection($data){
  global $dbconn;
  $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
  return $filter;
}
date_default_timezone_set('Asia/Jakarta');
	
	$idopd = anti_injection(trim($_POST['idopd']));
	$nmopd = anti_injection(trim($_POST['nmopd']));
	$kategori = strtoupper(anti_injection(trim($_POST['kategori'])));

	$sqlX = ("SELECT nm_opd FROM m_opd WHERE nm_opd='".$nmopd."' AND id_opd <> '".$idopd."'");			
	$resultx = mysqli_query($dbconn,$sqlX);$r= mysqli_fetch_assoc($resultx);
	
	$pesanError = array();
	if (strtolower($r['nm_opd'])==strtolower($nmopd)) {
		$pesanError[] = ucwords(strtolower($nmopd))." terdeteksi sudah ada\nEdit data OPD tidak boleh sama";	
	}	
	if (trim($idopd)=="") {
		$pesanError[] = "Data Identitas OPD Tidak Terdeteksi !";		
	}	
	if (trim($nmopd)=="") {
		$pesanError[] = "Data OPD Tidak Terdeteksi";		
	}
	if (count($pesanError)>=1 ){
			foreach ($pesanError as $indeks=>$pesan_tampil) { 
				$errMsg .="$pesan_tampil\n";	
				$status = 'err_val';
			} 
	}else{	
	
		$sql2  = "UPDATE m_opd set nm_opd='$nmopd',kategori='$kategori' WHERE id_opd='".$idopd."'";
		$res=mysqli_query($dbconn,$sql2);			

		if($res){
			$errMsg .= "SUKSESS !!! Data sudah disimpan !!!";
			$status = 'ok';
		}else{
			$errMsg .= "GAGAL !!! Data tidak bisa disimpan !!!";
			$status = 'err';
		}
	}			
	$data = array('msg1'=>$errMsg,'msg2'=>$status);
	echo json_encode($data);
	
	mysqli_free_result($res);
	mysqli_free_result($resultx);
	mysqli_close($dbconn);
?>
