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

	$idinstansi = trim($_POST['idinstansi']);
	$akses = strtolower(trim($_POST['akses']));
	$nmuser = strtoupper(anti_injection(trim($_POST['nmuser'])));	
	$username = strtolower(anti_injection(trim($_POST['nmuser'])));$username = preg_replace('/\s+/', '', $username);
	$password = md5("operator");
	
	$sqlX = ("SELECT nm_operator FROM m_operator WHERE nm_operator='".$nmuser."'");			
	$resultx = mysqli_query($dbconn,$sqlX);$r= mysqli_fetch_assoc($resultx);
	
	$pesanError = array();
	if (strtolower($r['nm_operator'])==strtolower($nmuser)) {
		$pesanError[] = ucwords(strtolower($nmuser))." terdeteksi sudah ada\nInput data operator tidak boleh sama";	
	}		
	if (trim($nmuser)=="") {
		$pesanError[] = "Data Operator Tidak Terdeteksi";		
	}
	if (trim($username)=="") {
		$pesanError[] = "Data username tidak boleh kosong";		
	}	
	if (count($pesanError)>=1 ){
			foreach ($pesanError as $indeks=>$pesan_tampil) { 
				$errMsg .="$pesan_tampil\n";	
				$status = 'err_val';
			} 
	}else{	

		$sql2  = "INSERT INTO m_operator (nm_operator,username,password,akses,id_instansi) VALUES ('$nmuser','$username','$password','$akses','$idinstansi')";
		$res=mysqli_query($dbconn,$sql2);
		
		if($res){
			$errMsg = "SUKSESS !!! Data sudah disimpan !!!";
			$status = 'ok';
		}else{
			$errMsg = "GAGAL !!! Data tidak bisa disimpan !!!";
			$status = 'err';
		}
	}			
	$data = array('msg1'=>$errMsg,'msg2'=>$status);
	echo json_encode($data);
	
	mysqli_free_result($res);
	mysqli_free_result($resultx);
	mysqli_close($dbconn);
?>
