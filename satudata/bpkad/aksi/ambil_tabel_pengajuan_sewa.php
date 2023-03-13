<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');	

function tgl_indo_list($tgl){
	$tanggal = substr($tgl,8,2);
	$bulan = getBulanList(substr($tgl,5,2));
	$tahun = substr($tgl,0,4);
	return $tanggal.' '.$bulan.' '.$tahun;		 
}
function getBulanList($bln){
	switch ($bln){
		case 1: 
			return "Jan";
			break;
		case 2:
			return "Feb";
			break;
		case 3:
			return "Mar";
			break;
		case 4:
			return "Apr";
			break;
		case 5:
			return "Mei";
			break;
		case 6:
			return "Jun";
			break;
		case 7:
			return "Jul";
			break;
		case 8:
			return "Agu";
			break;
		case 9:
			return "Sep";
			break;
		case 10:
			return "Okt";
			break;
		case 11:
			return "Nov";
			break;
		case 12:
			return "Des";
			break;
	}
} 

$idarea= trim($_POST['idarea']);
$keterangan= trim($_POST['keterangan']);

if ($keterangan=="kota"){
	$sql = ("SELECT DISTINCT p.id_trans_sewa,p.tgl_pengajuan,q.luas_sewa,q.hrg_penawaran,p.nik,
		p.nm_penyewa,p.stts_transaksi,q.id,q.id_tanah,r.nm_barang,r.alamat FROM det_sewa q
		LEFT JOIN trans_sewa p ON p.id_trans_sewa = q.id_trans_sewa 
		LEFT JOIN det_kib_a r ON q.id_tanah = r.id WHERE p.stts_transaksi='pengajuan'");
} else if ($keterangan=="kecamatan"){
	$sql = ("SELECT DISTINCT p.id_trans_sewa,p.tgl_pengajuan,q.luas_sewa,q.hrg_penawaran,p.nik,
		p.nm_penyewa,p.stts_transaksi,q.id,q.id_tanah,r.nm_barang,r.alamat FROM det_sewa q
		LEFT JOIN trans_sewa p ON p.id_trans_sewa = q.id_trans_sewa 
		LEFT JOIN det_kib_a r ON q.id_tanah = r.id WHERE p.stts_transaksi='pengajuan' AND r.id_kecamatan='".$idarea."'");
} else if ($keterangan=="desa"){
	$sql = ("SELECT DISTINCT p.id_trans_sewa,p.tgl_pengajuan,q.luas_sewa,q.hrg_penawaran,p.nik,
		p.nm_penyewa,p.stts_transaksi,q.id,q.id_tanah,r.nm_barang,r.alamat FROM det_sewa q
		LEFT JOIN trans_sewa p ON p.id_trans_sewa = q.id_trans_sewa 
		LEFT JOIN det_kib_a r ON q.id_tanah = r.id WHERE p.stts_transaksi='pengajuan' AND r.id_desa='".$idarea."'");
}
		
$result = mysqli_query($dbconn,$sql);
$data = array();
$no=0;
while($t=mysqli_fetch_array($result)){
	$no++;

	$row_array = array();
	$row_array['no']=$no;
	$row_array['iddetail']=$t['id'];$row_array['mdiddetail']=md5($t['id']);
	$row_array['idtranssewa']=$t['id_trans_sewa'];
	$row_array['tglpengajuan']=tgl_indo_list($t['tgl_pengajuan']);
	
	$row_array['totluas']=number_format($t['luas_sewa'],0,",",".");
	$row_array['totpenawaran']=number_format($t['hrg_penawaran'],0,",",".");
	$row_array['nik']=$t['nik'];
	$row_array['nmpenyewa']=ucwords(strtolower($t['nm_penyewa']));
	$row_array['nmbarang']=$t['nm_barang'];
	$row_array['alamat']=$t['alamat'];
	$row_array['sttstransaksi']=ucwords(strtolower($t['stts_transaksi']));
	$row_array['idtanah']=$t['id_tanah'];
	array_push($data,$row_array);
}
echo json_encode($data);
$result->close();
$dbconn->close();
?>  
