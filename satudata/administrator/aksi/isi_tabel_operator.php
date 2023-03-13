<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idinstansi= trim($_POST['idinstansi']);

$sqlx = ("SELECT p.id_operator,p.nm_operator,p.username,p.akses,p.blokir,q.nm_instansi FROM m_operator p 
		LEFT JOIN m_instansi q ON p.id_instansi=q.id_instansi WHERE p.aktif='Y' ORDER BY p.nm_operator ASC");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	if ($t['blokir']=='Y'){$warna='background:#FFE4E1';} else if ($t['blokir']=='N'){$warna='';}
	if ($t['akses']=='super admin'){$nminstansi="Instansi Induk";} else {$nminstansi=ucwords(strtolower($t['nm_instansi']));}

	$row_array = array();
	$row_array['no']=$no;$row_array['warna']=$warna;
	$row_array['iduser']=$t['id_operator'];$row_array['nmuser']=ucwords(strtolower($t['nm_operator']));
	$row_array['username']=$t['username'];
	$row_array['akses']=ucwords(strtolower($t['akses']));
	$row_array['blokir']=$t['blokir'];	
	$row_array['nminstansi']=$nminstansi;
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
