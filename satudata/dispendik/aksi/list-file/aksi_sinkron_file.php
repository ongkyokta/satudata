<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

$sqlx = ("SELECT id FROM tbl_api_dispendik");
$result = mysqli_query($dbconn,$sqlx);
while($t=mysqli_fetch_array($result)){
	
	$idsekolah = $t['id'];

	$dirvideo = "../../../data-media/video/";
	$source_video = glob($dirvideo.$idsekolah.".mp4"); 
	$jmlvideo = count($source_video);

	$dirasrama = "../../../data-media/foto/".$idsekolah."/asrama/";
	$source_asrama = glob($dirasrama."*.jpeg"); 
	$jmlasrama = count($source_asrama);

	$dirbahasa = "../../../data-media/foto/".$idsekolah."/bahasa/";
	$source_bahasa = glob($dirbahasa."*.jpeg"); 
	$jmlbahasa = count($source_bahasa);

	$dirguru = "../../../data-media/foto/".$idsekolah."/guru/";
	$source_guru = glob($dirguru."*.jpeg"); 
	$jmlguru = count($source_guru);

	$diribadah = "../../../data-media/foto/".$idsekolah."/ibadah/";
	$source_ibadah = glob($diribadah."*.jpeg"); 
	$jmlibadah = count($source_ibadah);

	$diripa = "../../../data-media/foto/".$idsekolah."/ipa/";
	$source_ipa = glob($diripa."*.jpeg"); 
	$jmlipa = count($source_ipa);

	$dirips = "../../../data-media/foto/".$idsekolah."/ips/";
	$source_ips = glob($dirips."*.jpeg"); 
	$jmlips = count($source_ips);

	$dirkelas = "../../../data-media/foto/".$idsekolah."/kelas/";
	$source_kelas = glob($dirkelas."*.jpeg"); 
	$jmlkelas = count($source_kelas);

	$dirkepsek = "../../../data-media/foto/".$idsekolah."/kepsek/";
	$source_kepsek = glob($dirkepsek."*.jpeg"); 
	$jmlkepsek = count($source_kepsek);

	$dirkomputer = "../../../data-media/foto/".$idsekolah."/komputer/";
	$source_komputer = glob($dirkomputer."*.jpeg"); 
	$jmlkomputer = count($source_komputer);

	$dirmultimedia = "../../../data-media/foto/".$idsekolah."/multimedia/";
	$source_multimedia = glob($dirmultimedia."*.jpeg"); 
	$jmlmultimedia = count($source_multimedia);

	$dirpembinaan = "../../../data-media/foto/".$idsekolah."/pembinaan/";
	$source_pembinaan = glob($dirpembinaan."*.jpeg"); 
	$jmlpembinaan = count($source_pembinaan);

	$dirperpustakaan = "../../../data-media/foto/".$idsekolah."/perpustakaan/";
	$source_perpustakaan = glob($dirperpustakaan."*.jpeg"); 
	$jmlperpustakaan = count($source_perpustakaan);

	$dirwcguru = "../../../data-media/foto/".$idsekolah."/wcguru/";
	$source_wcguru = glob($dirwcguru."*.jpeg"); 
	$jmlwcguru = count($source_wcguru);

	$dirwcsiswa = "../../../data-media/foto/".$idsekolah."/wcsiswa/";
	$source_wcsiswa = glob($dirwcsiswa."*.jpeg"); 
	$jmlwcsiswa = count($source_wcsiswa);

	$dirwcumum = "../../../data-media/foto/".$idsekolah."/wcumum/";
	$source_wcumum = glob($dirwcumum."*.jpeg"); 
	$jmlwcumum = count($source_wcumum);

	$sql2  = "UPDATE tbl_media SET video='$jmlvideo',kelas='$jmlkelas',perpustakaan='$jmlperpustakaan',kepsek='$jmlkepsek',guru='$jmlguru',
			pembinaan='$jmlpembinaan',multimedia='$jmlmultimedia',komputer='$jmlkomputer',ips='$jmlips',ipa='$jmlipa',bahasa='$jmlbahasa',
			wc_umum='$jmlwcumum',wc_siswa='$jmlwcsiswa',wc_guru='$jmlwcguru',ibadah='$jmlibadah',asrama='$jmlasrama' WHERE id='".$idsekolah."'";
			$res=mysqli_query($dbconn,$sql2);	
}

if($res){
	$errMsg = "SUKSESS !!! Data sudah disimpan !!!";
	$status = 'ok';
}else{
	$errMsg = "GAGAL !!! Data tidak bisa disimpan !!!";
	$status = 'err';
}
				
$data = array('msg1'=>$errMsg,'msg2'=>$status);
echo json_encode($data);
	
mysqli_free_result($res);mysqli_free_result($result);
mysqli_close($dbconn);
?>
