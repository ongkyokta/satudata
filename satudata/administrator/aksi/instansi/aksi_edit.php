<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

function anti_injection($data){
  global $dbconn;
  $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
  return $filter;
}
date_default_timezone_set('Asia/Jakarta');
	
	$idinstansi = anti_injection(trim($_POST['idinstansi']));
	$nminstansi = strtoupper(anti_injection(trim($_POST['nminstansi'])));
	$alamat = anti_injection(trim($_POST['alamat']));
	$kota = strtoupper(anti_injection(trim($_POST['kota'])));
	$email = anti_injection(trim($_POST['email']));	$telepon = trim($_POST['telepon']);

	$sqlX = ("SELECT nm_instansi FROM m_instansi WHERE nm_instansi='".$nminstansi."' AND id_instansi <> '".$idinstansi."'");			
	$resultx = mysqli_query($dbconn,$sqlX);$r= mysqli_fetch_assoc($resultx);
	
	$pesanError = array();
	if (strtolower($r['nm_instansi'])==strtolower($nminstansi)) {
		$pesanError[] = ucwords(strtolower($nminstansi))." terdeteksi sudah ada\nEdit data instansi tidak boleh sama";	
	}	
	if (trim($idinstansi)=="") {
		$pesanError[] = "Data Identitas Instansi Tidak Terdeteksi !";		
	}	
	if (trim($nminstansi)=="") {
		$pesanError[] = "Data Instansi Tidak Terdeteksi";		
	}
	if (trim($alamat)=="") {
		$pesanError[] = "Data alamat Tidak Terdeteksi";		
	}
	if (trim($kota)=="") {
		$pesanError[] = "Data kota Tidak Terdeteksi";		
	}
	if (trim($email)=="") {
		$pesanError[] = "Data email Tidak Terdeteksi";		
	}
	if (trim($telepon)=="") {
		$pesanError[] = "Data telepon Tidak Terdeteksi";		
	}
	if (count($pesanError)>=1 ){
			foreach ($pesanError as $indeks=>$pesan_tampil) { 
				$errMsg .="$pesan_tampil\n";	
				$status = 'err_val';
			} 
	}else{	
	
		$sql2  = "UPDATE m_instansi set nm_instansi='$nminstansi',alamat='$alamat',kota='$kota',email='$email',telepon='$telepon' WHERE id_instansi='".$idinstansi."'";
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
