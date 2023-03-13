<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');
$idopd=trim($_POST['idopd']);
	
$qri="UPDATE m_opd SET aktif='N' WHERE id_opd='".$idopd."'";	
$res=mysqli_query($dbconn,$qri);
if($res){
	$errMsg .="SUKSES ! Selamat, data sudah dihapus.";
}else{
	$errMsg .="GAGAL ! Data tidak terhapus !<br>Error time limit.";
}	
echo json_encode($errMsg);
mysqli_free_result($res);
mysqli_close($dbconn);	
?>
