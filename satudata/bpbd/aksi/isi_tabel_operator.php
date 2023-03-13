<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idinstansi= trim($_POST['idinstansi']);

$sqlx = ("SELECT p.id_operator,p.nm_operator,p.username,p.akses,p.blokir FROM m_operator p WHERE p.id_instansi='".$idinstansi."'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	if ($t['blokir']=='Y'){$warna='danger';$nmblokir="Blocked";} else if ($t['blokir']=='N'){$warna='success';$nmblokir="Unbloked";}
	
	$row_array = array();
	$row_array['no']=$no;$row_array['warna']=$warna;$row_array['nmblokir']=$nmblokir;
	$row_array['idoperator']=$t['id_operator'];$row_array['nmoperator']=$t['nm_operator'];
	$row_array['username']=$t['username'];
	$row_array['akses']=$t['akses'];
	$row_array['blokir']=$t['blokir'];	
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
