<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT p.id_operator,p.nm_operator,p.username,p.akses,p.blokir,p.id_instansi FROM m_operator p WHERE aktif='Y'");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	

	if ($t['akses'] == "administrator"){
		$sqlx2 = ("SELECT id_instansi,nm_instansi FROM m_instansi WHERE id_instansi='".$t['id_instansi']."'");			
		$result2 = mysqli_query($dbconn,$sqlx2);$p=mysqli_fetch_array($result2);
		$nminstansi = $p['nm_instansi'];
	} else if ($t['akses'] == "lembaga"){
		$sqlx3 = ("SELECT id_lembaga,nm_lembaga FROM m_lembaga WHERE id_lembaga='".$t['id_instansi']."'");			
		$result3 = mysqli_query($dbconn,$sqlx3);$q=mysqli_fetch_array($result3);
		$nminstansi = $q['nm_lembaga'];
	} else if ($t['akses'] == "opd"){
		$sqlx4 = ("SELECT id_opd,nm_opd FROM m_opd WHERE id_opd='".$t['id_instansi']."'");			
		$result4 = mysqli_query($dbconn,$sqlx4);$r=mysqli_fetch_array($result4);
		$nminstansi = $r['nm_opd'];
	}

	if ($t['blokir']=='Y'){$nmblokir="BLOKIR";} else if ($t['blokir']=='N'){$nmblokir="AKTIF";}
	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmblokir']=$nmblokir;
	$row_array['idoperator']=$t['id_operator'];$row_array['nmoperator']=$t['nm_operator'];
	$row_array['nminstansi']=$nminstansi;
	$row_array['username']=$t['username'];
	$row_array['akses']=strtoupper($t['akses']);
	$row_array['blokir']=$t['blokir'];	
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
