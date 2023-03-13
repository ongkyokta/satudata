<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sqlx = ("SELECT p.id,p.npsn,p.video,p.kelas,p.perpustakaan,p.kepsek,p.guru,p.pembinaan,p.multimedia,p.komputer,p.ips,p.ipa,
		p.bahasa,p.wc_umum,p.wc_siswa,p.wc_guru,p.ibadah,p.asrama,q.nama,q.lintang,q.bujur
		FROM tbl_media p LEFT JOIN tbl_api_dispendik q ON p.id=q.id");			
$result = mysqli_query($dbconn,$sqlx);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;	 	
	$jmltotal = $t['video'] + $t['kelas'] + $t['perpustakaan'] + $t['kepsek'] + $t['guru'] + $t['pembinaan'] + $t['multimedia'] + $t['komputer'] + $t['ips'] + $t['ipa'] + $t['bahasa'] + $t['wc_umum'] + $t['wc_siswa'] + $t['wc_guru'] + $t['ibadah'] + $t['asrama'];
	if (substr($t['nama'],0,53) == "UNIT PELAKSANA TEKNIS DAERAH (UPTD) SATUAN PENDIDIKAN"){
		$nminstansi = substr($t['nama'],54);
	} else {
		$nminstansi = $t['nama'];
	}

	$row_array = array();
	$row_array['id']=$t['id'];
	$row_array['npsn']=$t['npsn'];
	$row_array['nminstansi']=$nminstansi;
	$row_array['koordinat']=floatval($t['lintang']).",".floatval($t['bujur']);
	$row_array['video']=$t['video'];
	$row_array['kelas']=$t['kelas'];
	$row_array['perpustakaan']=$t['perpustakaan'];
	$row_array['kepsek']=$t['kepsek'];
	$row_array['guru']=$t['guru'];
	$row_array['pembinaan']=$t['pembinaan'];
	$row_array['multimedia']=$t['multimedia'];
	$row_array['komputer']=$t['komputer'];
	$row_array['ips']=$t['ips'];
	$row_array['ipa']=$t['ipa'];
	$row_array['bahasa']=$t['bahasa'];
	$row_array['wcumum']=$t['wc_umum'];
	$row_array['wcsiswa']=$t['wc_siswa'];
	$row_array['wcguru']=$t['wc_guru'];
	$row_array['ibadah']=$t['ibadah'];
	$row_array['asrama']=$t['asrama'];	
	$row_array['jmltotal']=$jmltotal;	
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
