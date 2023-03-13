<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

$sql = ("SELECT id_lembaga,nm_lembaga,koordinat FROM m_lembaga WHERE aktif='Y'");			
$result = mysqli_query($dbconn,$sql);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;

	if ($keterangan=="kota"){
		$sqlxA = ("SELECT COUNT(p.id) AS jmlkiba FROM det_kib_a p 
		LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='A'");			
		$resultxA = mysqli_query($dbconn,$sqlxA);$a = mysqli_fetch_assoc($resultxA);

		$sqlxB = ("SELECT COUNT(p.id) AS jmlkibb FROM det_kib_b p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='B'");			
		$resultxB = mysqli_query($dbconn,$sqlxB);$b = mysqli_fetch_assoc($resultxB);

		$sqlxC = ("SELECT COUNT(p.id) AS jmlkibc FROM det_kib_c p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='C'");			
		$resultxC = mysqli_query($dbconn,$sqlxC);$c = mysqli_fetch_assoc($resultxC);

		$sqlxD = ("SELECT COUNT(p.id) AS jmlkibd FROM det_kib_d p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='D'");			
		$resultxD = mysqli_query($dbconn,$sqlxD);$d = mysqli_fetch_assoc($resultxD);

		$jmlkiba = $a['jmlkiba'];$jmlkibb = $b['jmlkibb'];$jmlkibc = $c['jmlkibc'];$jmlkibd = $d['jmlkibd'];
		$jmltotal = $a['jmlkiba'] + $b['jmlkibb'] + $c['jmlkibc'] + $d['jmlkibd'];

	} else if ($keterangan=="kecamatan"){
		$sqlxA = ("SELECT COUNT(p.id) AS jmlkiba FROM det_kib_a p 
		LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='A' AND q.id_kecamatan='".$idarea."'");			
		$resultxA = mysqli_query($dbconn,$sqlxA);$a = mysqli_fetch_assoc($resultxA);

		$sqlxB = ("SELECT COUNT(p.id) AS jmlkibb FROM det_kib_b p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='B' AND q.id_kecamatan='".$idarea."'");			
		$resultxB = mysqli_query($dbconn,$sqlxB);$b = mysqli_fetch_assoc($resultxB);

		$sqlxC = ("SELECT COUNT(p.id) AS jmlkibc FROM det_kib_c p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='C' AND q.id_kecamatan='".$idarea."'");			
		$resultxC = mysqli_query($dbconn,$sqlxC);$c = mysqli_fetch_assoc($resultxC);

		$sqlxD = ("SELECT COUNT(p.id) AS jmlkibd FROM det_kib_d p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='D' AND q.id_kecamatan='".$idarea."'");			
		$resultxD = mysqli_query($dbconn,$sqlxD);$d = mysqli_fetch_assoc($resultxD);

		$jmlkiba = $a['jmlkiba'];$jmlkibb = $b['jmlkibb'];$jmlkibc = $c['jmlkibc'];$jmlkibd = $d['jmlkibd'];
		$jmltotal = $a['jmlkiba'] + $b['jmlkibb'] + $c['jmlkibc'] + $d['jmlkibd'];
	} else if ($keterangan=="desa"){
		$sqlxA = ("SELECT COUNT(p.id) AS jmlkiba FROM det_kib_a p 
		LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='A' AND q.id_desa='".$idarea."'");			
		$resultxA = mysqli_query($dbconn,$sqlxA);$a = mysqli_fetch_assoc($resultxA);

		$sqlxB = ("SELECT COUNT(p.id) AS jmlkibb FROM det_kib_b p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='B' AND q.id_desa='".$idarea."'");			
		$resultxB = mysqli_query($dbconn,$sqlxB);$b = mysqli_fetch_assoc($resultxB);

		$sqlxC = ("SELECT COUNT(p.id) AS jmlkibc FROM det_kib_c p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='C' AND q.id_desa='".$idarea."'");			
		$resultxC = mysqli_query($dbconn,$sqlxC);$c = mysqli_fetch_assoc($resultxC);

		$sqlxD = ("SELECT COUNT(p.id) AS jmlkibd FROM det_kib_d p 
			LEFT JOIN trans_kib q ON p.id_kib=q.id_kib WHERE q.id_lembaga='".$t['id_lembaga']."' AND q.jenis_kib='D' AND q.id_desa='".$idarea."'");			
		$resultxD = mysqli_query($dbconn,$sqlxD);$d = mysqli_fetch_assoc($resultxD);

		$jmlkiba = $a['jmlkiba'];$jmlkibb = $b['jmlkibb'];$jmlkibc = $c['jmlkibc'];$jmlkibd = $d['jmlkibd'];
		$jmltotal = $a['jmlkiba'] + $b['jmlkibb'] + $c['jmlkibc'] + $d['jmlkibd'];
	}
	
	$row_array = array();
	$row_array['no']=$no;
	$row_array['idlembaga']=$t['id_lembaga'];
	$row_array['nmlembaga']=ucwords(strtolower($t['nm_lembaga']));
	$row_array['koordinat']=$t['koordinat'];
	$row_array['jmlkiba']=number_format($jmlkiba,0,",",".");
	$row_array['jmlkibb']=number_format($jmlkibb,0,",",".");
	$row_array['jmlkibc']=number_format($jmlkibc,0,",",".");
	$row_array['jmlkibd']=number_format($jmlkibd,0,",",".");
	$row_array['jmltotal']=number_format($jmltotal,0,",",".");
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
