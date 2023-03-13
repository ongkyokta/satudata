<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT p.id_user,p.nm_user,p.username,p.akses,p.validator,p.stts_validator,p.id_instansi FROM m_user_mobile p WHERE p.aktif='Y'");			
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

	if ($t['validator']=='Y'){$nmvalidator="VALIDATOR";} else if ($t['validator']=='N'){$nmvalidator="PETUGAS";}
	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['nmvalidator']=$nmvalidator;
	$row_array['iduser']=$t['id_user'];$row_array['nmuser']=$t['nm_user'];
	$row_array['nminstansi']=$nminstansi;
	$row_array['username']=$t['username'];
	$row_array['akses']=strtoupper($t['akses']);
	$row_array['sttsvalidator']=$t['stts_validator'];
	$row_array['validator']=$t['validator'];	
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
