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

	$idinstansi =trim($_POST['idinstansi']);
	$nmskpd = strtoupper(anti_injection(trim($_POST['nmskpd'])));
	$alamat = anti_injection(trim($_POST['alamat']));
	$kota = strtoupper(anti_injection(trim($_POST['kota'])));
	$email = anti_injection(trim($_POST['email']));
	$telepon = anti_injection(trim($_POST['telepon']));
	$koordinat =trim($_POST['koordinat']);

	$pesanError = array();
	if (trim($idinstansi)=="") {
		$pesanError[] = "Data instansi tidak terdeteksi";		
	}
	if (trim($nmskpd)=="") {
		$pesanError[] = "Nama instansi tidak boleh kosong";		
	}
	if (trim($alamat)=="") {
		$pesanError[] = "Alamat tidak boleh kosong";		
	}
	if (trim($kota)=="") {
		$pesanError[] = "Kota tidak boleh kosong";		
	}
	if (trim($email)=="") {
		$pesanError[] = "Email tidak boleh kosong";		
	}
	if (trim($telepon)=="") {
		$pesanError[] = "Telepon tidak boleh kosong";		
	}
	if (trim($koordinat)=="") {
		$pesanError[] = "Koordinat tidak boleh kosong";		
	}
	if (count($pesanError)>=1 ){
			foreach ($pesanError as $indeks=>$pesan_tampil) { 
				$errMsg .="$pesan_tampil\n";	
				$status = 'err_val';
			} 
	}else{	
	
		$sql2  = "UPDATE m_instansi SET nm_instansi='$nmskpd',alamat='$alamat',kota='$kota',email='$email',telepon='$telepon',koordinat='$koordinat' WHERE id_instansi='".$idinstansi."'";
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
	mysqli_close($dbconn);
?>
