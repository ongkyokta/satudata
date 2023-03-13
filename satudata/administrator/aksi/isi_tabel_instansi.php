<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idinstansi= trim($_POST['idinstansi']);

$sqlx = ("SELECT id_instansi,nm_instansi,alamat,kota,telepon,email FROM m_instansi ORDER BY id_instansi ASC");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idinstansi']=$t['id_instansi'];$row_array['nminstansi']=$t['nm_instansi'];
	$row_array['alamat']=$t['alamat'];$row_array['kota']=ucwords(strtolower($t['kota']));
	$row_array['telepon']=$t['telepon'];$row_array['email']=$t['email'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
