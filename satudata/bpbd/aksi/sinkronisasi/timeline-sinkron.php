<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
date_default_timezone_set('Asia/Jakarta');	
date_default_timezone_set('Asia/Jakarta');
function tgl_indo($tgl){
	$tanggal = substr($tgl,8,2);
	$bulan = getBulan(substr($tgl,5,2));
	$tahun = substr($tgl,0,4);
	return $tanggal.' '.$bulan.' '.$tahun;		 
}

function getBulan($bln){
	switch ($bln){
		case 1: 
			return "Januari";
			break;
		case 2:
			return "Februari";
			break;
		case 3:
			return "Maret";
			break;
		case 4:
			return "April";
			break;
		case 5:
			return "Mei";
			break;
		case 6:
			return "Juni";
			break;
		case 7:
			return "Juli";
			break;
		case 8:
			return "Agustus";
			break;
		case 9:
			return "September";
			break;
		case 10:
			return "Oktober";
			break;
		case 11:
			return "November";
			break;
		case 12:
			return "Desember";
			break;
	}
} 

$idsurat = trim($_POST['idsurat']);

$sqltps = ("SELECT p.no_surat,p.tgl_terima,p.tgl_surat,p.perihal,p.id_opd,p.tgl_kirim,p.tgl_validasi,p.jam_validasi,
            p.ket_status,p.stts_asal_surat,p.asal_umum,q.nm_opd
			FROM trans_surat p LEFT JOIN m_opd q ON p.id_opd=q.id_opd WHERE p.id_surat='".$idsurat."'");
$restps = mysqli_query($dbconn,$sqltps);$sm= mysqli_fetch_assoc($restps);
$nosurat = $sm['no_surat'];
$tglterima = tgl_indo($sm['tgl_terima']);
$tglsurat = tgl_indo($sm['tgl_surat']);
$tglkirim = tgl_indo($sm['tgl_kirim']);
$tgldispo = tgl_indo($sm['tgl_validasi']);$jamdispo = date("H:i",strtotime($sm['jam_validasi']));
$perihal = $sm['perihal'];

$asalsurat = $sm['stts_asal_surat'];
if ($asalsurat == "opd"){$nmopd = $sm['nm_opd'];} else if ($asalsurat == "umum"){$nmopd = $sm['asal_umum'];}

$statusx = $sm['ket_status'];
if ($statusx == "terima"){$disdispos = "";} else if ($statusx == "belum"){$disdispos = "display:none !important";}
mysqli_free_result($restps);
?>

<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
    <div class="position-relative z-index-1 light">
        <h5 class="mb-0 text-white">Timeline Status Sinkronisasi</h5>
        <p class="fs--1 mb-0 text-white">Timeline status sinkronisasi</p>
    </div>
    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
        aria-label="Close"></button>
</div>
<div class="modal-body bg-light py-3 px-4">

    <div class="overflow-visible progress mt-4 mb-2 rounded-3" id="areastatistikSarana" style="height: 6px;">
        <div class="overflow-visible progress-bar bg-secondary border-end border-white border-2 rounded-end rounded-pill"
            role="progressbar" style="width: 33%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
        <div class="overflow-visible progress-bar bg-secondary border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-danger border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-danger border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-warning border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-warning border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-success border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>
		<div class="overflow-visible progress-bar bg-info border-end border-white border-2" role="progressbar"
            style="width: 34%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
            <span class="mt-n4 text-900">100K</span>
        </div>		
        <div class="overflow-visible progress-bar bg-primary rounded-start rounded-pill" role="progressbar"
            style="width: 33%;<?php echo $disdispos ?>" aria-valuenow="15" aria-valuemin="15" aria-valuemax="100"><span
                class="mt-n4 text-900">100K</span></div>
    </div>

    <div class="d-flex" id="gross-revenue-footer">
        <div class="btn btn-sm btn-text d-flex align-items-center p-0 shadow-none" id="currentMonth"
            data-month="current"><span class="fas fa-circle text-secondary fs--1 me-1"></span><span
                class="text fs--2">Surat Diterima</span></div>
        <div class="btn btn-sm btn-text d-flex align-items-center p-0 shadow-none" id="currentMonth"
            data-month="current"><span class="fas fa-circle text-warning fs--1 me-1 ms-2"></span><span
                class="text fs--2">Dikirim</span></div>
        <div class="btn btn-sm btn-text d-flex align-items-center p-0 shadow-none ms-2" id="prevMonth"
            data-month="prev"><span class="fas fa-circle text-primary fs--2 me-1"></span><span class="text fs--2">Terdisposisi</span></div>
    </div>
</div>
<div class="modal-footer float-right">
    <button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">Close</button>
</div>
