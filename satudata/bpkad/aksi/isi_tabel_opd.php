<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT p.id_opd,p.nm_opd,p.alamat,p.telepon,p.email,q.nm_lembaga FROM m_opd p
		LEFT JOIN m_lembaga q ON p.id_lembaga=q.id_lembaga WHERE p.aktif='Y'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idopd']=$t['id_opd'];
	$row_array['nmopd']=ucwords(strtolower($t['nm_opd']));
	$row_array['nmlembaga']=ucwords(strtolower($t['nm_lembaga']));
	$row_array['alamat']=$t['alamat'];
	$row_array['telepon']=$t['telepon'];$row_array['email']=$t['email'];	
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
