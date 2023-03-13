<?php
error_reporting(0);
require_once 'services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

include "services/tgl_indo.php";
date_default_timezone_set('Asia/Jakarta');
$tahun = date('Y-m-d');
/*
$qrirec = ("SELECT SUM(TABLE_ROWS) AS jmlrecord FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'db_bigdata'");
$dbqrirec = mysqli_query($dbconn,$qrirec);$rec= mysqli_fetch_assoc($dbqrirec);
$jmlrecord = number_format($rec['jmlrecord'],0,",",".");
mysqli_free_result($dbqrirec);
*/

// jumlah OPD //
$qri2 = ("SELECT COUNT(id_instansi) AS jmlopd FROM m_instansi");
$dbqri2 = mysqli_query($dbconn,$qri2);$b= mysqli_fetch_assoc($dbqri2);
$jmlopd = number_format($b['jmlopd']-1,0,",",".");
mysqli_free_result($dbqri2);

// bpbd //
$qri4 = ("SELECT SUM(jml_rawan) AS jmlrawanbencana, SUM(jml_penerima) AS jmlpenerima FROM tbl_api_bpbd");
$dbqri4 = mysqli_query($dbconn,$qri4);$d= mysqli_fetch_assoc($dbqri4);
$jmlrawanbencana = number_format($d['jmlrawanbencana'],0,",",".");
$jmlpenerima = number_format($d['jmlpenerima'],0,",",".");
mysqli_free_result($dbqri4);

$qri5 = ("SELECT SUM(jml_pus) AS jmlpus, SUM(jml_pus_kb) AS jmlkb, SUM(jml_pus_bukan_kb) AS jmlbukankb FROM tbl_api_dp3akb");
$dbqri5 = mysqli_query($dbconn,$qri5);$e= mysqli_fetch_assoc($dbqri5);
$jmlpus = number_format($e['jmlpus'],0,",",".");
$jmlkb = number_format($e['jmlkb'],0,",",".");
$jmlbukankb = number_format($e['jmlbukankb'],0,",",".");
mysqli_free_result($dbqri5);

// cipta karya //
$qri6 = ("SELECT SUM(rumah_layak_huni) AS jmlrmhlayak,SUM(jml_kk_air) AS jmlair,SUM(jml_kk_jamban) AS jmljamban FROM cipta_karya");
$dbqri6 = mysqli_query($dbconn,$qri6);$f= mysqli_fetch_assoc($dbqri6);
$jmlrmhlayak = number_format($f['jmlrmhlayak'],0,",",".");
$jmlair = number_format($f['jmlair'],0,",",".");
$jmljamban = number_format($f['jmljamban'],0,",",".");

// dinas pertanian //
$qri7 = ("SELECT SUM(luas_tanam) AS jmltanam, SUM(luas_panen) AS jmlpanen, SUM(hasil) AS jmlhasil FROM tbl_api_disperta");
$dbqri7 = mysqli_query($dbconn,$qri7);$g= mysqli_fetch_assoc($dbqri7);
$jmltanam = number_format($g['jmltanam'],0,",",".");
$jmlpanen = number_format($g['jmlpanen'],0,",",".");
$jmlhasil = number_format($g['jmlhasil'],0,",",".");
mysqli_free_result($dbqri7);

// bansos dinas sosial //
$qri8 = ("SELECT COUNT(IF(bansos_bnpt='YA',nik,null)) AS jmlbnpt,COUNT(IF(bansos_pkh='YA',nik,null)) AS jmlpkh,
        COUNT(IF(bansos_ppkm='YA',nik,null)) AS jmlppkm,COUNT(IF(pbi_jkn='YA',nik,null)) AS jmljkn
         FROM tbl_api_dinsos");
$dbqri8 = mysqli_query($dbconn,$qri8);$h= mysqli_fetch_assoc($dbqri8);
$jmlbansos = number_format($h['jmlbnpt'] + $h['jmlpkh'] + $h['jmlppkm'] + $h['jmljkn'] ,0,",",".");
$jmlbnpt = number_format($h['jmlbnpt'],0,",",".");
$jmlpkh = number_format($h['jmlpkh'],0,",",".");
$jmlppkm = number_format($h['jmlppkm'],0,",",".");
$jmljkn = number_format($h['jmljkn'],0,",",".");
mysqli_free_result($dbqri8);

$totalrecord = number_format($h['jmlbnpt'] + $h['jmlpkh'] + $h['jmlppkm'] + $h['jmljkn']
                + $g['jmlpanen'] + $f['jmlsanitasi'] + $e['jmlpus'] + $d['jmlrawanbencana'] + $c['jmlsekolah']
                + $b['jmlopd'] - 1 + $a['jmlpenduduk'] ,0,",",".");

mysqli_close($dbconn);
?>

<!DOCTYPE html>
<html lang="en-US" dir="ltr">

<head>
    <meta charset="utf-8" />
    <meta name="google" content="notranslate" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Jember Satu Data</title>

    <link rel="apple-touch-icon" sizes="180x180" href="./assets/img/favicons/logo_jember.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/img/favicons/logo_jember.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/img/favicons/logo_jember.png" />
    <meta name="msapplication-TileImage" content="./assets/img/favicons/logo_jember.png" />
    <meta name="theme-color" content="#ffffff" />
    <script src="./assets/js/config.js"></script>
    <script src="./vendors/overlayscrollbars/OverlayScrollbars.min.js"></script>

    <link href="./vendors/swiper/swiper-bundle.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap"
        rel="stylesheet" />
    <link href="./vendors/overlayscrollbars/OverlayScrollbars.min.css" rel="stylesheet" />
    <link href="./assets/css/theme-rtl.min.css" rel="stylesheet" id="style-rtl" />
    <link href="./assets/css/theme.min.css" rel="stylesheet" id="style-default" />
    <link href="./assets/css/user-rtl.min.css" rel="stylesheet" id="user-style-rtl" />
    <link href="./assets/css/user.min.css" rel="stylesheet" id="user-style-default" />
    <script>
    var isRTL = JSON.parse(localStorage.getItem("isRTL"));
    if (isRTL) {
        var linkDefault = document.getElementById("style-default");
        var userLinkDefault = document.getElementById("user-style-default");
        linkDefault.setAttribute("disabled", true);
        userLinkDefault.setAttribute("disabled", true);
        document.querySelector("html").setAttribute("dir", "rtl");
    } else {
        var linkRTL = document.getElementById("style-rtl");
        var userLinkRTL = document.getElementById("user-style-rtl");
        linkRTL.setAttribute("disabled", true);
        userLinkRTL.setAttribute("disabled", true);
    }
    </script>
</head>

<body style="-webkit-user-select:none;-moz-user-select:none;">
 
    <main class="main" id="top">
        <nav class="navbar navbar-standard navbar-expand-lg fixed-top navbar-dark"
            data-navbar-darken-on-scroll="data-navbar-darken-on-scroll">
            <div class="container">
                <a class="navbar-brand" href="./home.html">
                    <div class="d-flex align-items-center py-2">
                        <img class="me-2" src="./assets/img/logos/logo_jember_satu_data.png" alt="Logo Jember Satu Data"
                            width="200" />
                    </div>
                </a>
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse scrollbar" id="navbarStandard">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link btn btn-primary px-4" href="#!" data-bs-toggle="modal"
                                data-bs-target="#loginModal">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header px-4 position-relative modal-shape-header bg-shape">
                        <div class="position-relative z-index-1 light">
                            <h5 class="mb-0 text-white">Login Jember Satu Data</h5>
                            <p class="fs--1 mb-0 text-white">Silahkan masukkan username dan password Anda</p>
                        </div>
                        <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div id="loginMsg" style="display:none"></div>
                        <form id="loginFrm">
                            <div class="mb-3">
                                <input class="form-control" type="text" id="txtusername" autocomplete="off" placeholder="Username" />
                            </div>
                            <div class="mb-3">
                                <input class="form-control" type="password" id="txtpassword" autocomplete="off" placeholder="Password" />
                            </div>
                            <div class="mb-1">
                                <button class="btn btn-primary d-block w-100 mt-4" id="cmdLogin" type="button">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-0 overflow-hidden light" id="banner">
            <div class="bg-holder overlay" style="background-color: #180d5b"></div>
            <div class="container">
                <div class="row flex-center pt-8 pt-lg-12 pb-4" style="height:100vh">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5 pb-4 text-start">
                        <h3 class="text-white fw-light">
                            Jember Satu<br>
                            <span class="typed-text fw-bold"
                                data-typed-text='["Satu Data, Satu Peta, Satu Kebijakan","Pemerintah Kabupaten Jember"]'></span>
                        </h3>
                        <p class="lead text-white opacity-75" style="font-size:15px;">
                            Peta Jember Satu Data memiliki fitur 2D yang dapat diakses menggunakan browser
                            Google Chrome, Mozilla untuk kelancaran pengguna peta Jember Satu Data.<br>
                            Harap menggunakan browser yang direkomendasikan.
                        </p>

                        <div id="btn-pelayanan" class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" style="display:none">
                            Ekosistem Jember Satu Data<span class="fas fa-play ms-2"
                                data-fa-transform="shrink-6 down-1"></span>
                        </div>
                    </div>
                    <div class="d-none d-sm-block col-xl-6 offset-1 align-self-center">
                        <img class="img-fluid" src="./assets/img/illustrations/Jsatu_landing.png" alt="Illustration" /><br><br><br>
                    </div>
                </div>
            </div>
        </section>
 
        <section id="data-informasi" class="pt-6 pb-6 text-center">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h2 class="fs-2 fs-sm-3 fs-md-3">Ekosistem Jember Satu Data</h2>
                        <p class="lead fs-0">
                            Ekosistem ,Statistik Dan Penilaian Penentuan Kebijakan Pemerintah Kabupaten Jember
                        </p>
                    </div>
                </div>

                <div class="row flex-center mt-6">
                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/database.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $totalrecord ?></h4>
                                <h6 class="fs--1">Data Record</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/opd.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlopd ?></h4>
                                <h6 class="fs--1">Jumlah OPD</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas Kependudukan dan Pencatatan Sipil</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/penduduk.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlpendudukDispenduk"></h4>
                                <h6 class="fs--1">Penduduk</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/balita.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbllakiDispenduk"></h4>
                                <h6 class="fs--1">Laki-laki</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/anak_anak.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lblperempuanDispenduk"></h4>
                                <h6 class="fs--1">Perempuan</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row flex-center mt-6">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/balita.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lblpendudukbalitaDispenduk"></h4>
                                <h6 class="fs--1">Balita < 5 Tahun</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/anak_anak.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lblpenduduk-5-17-Dispenduk"></h4>
                                <h6 class="fs--1">Anak-anak 5 - 17 Tahun</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/remaja.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lblpenduduk-17-25-Dispenduk"></h4>
                                <h6 class="fs--1">Remaja 17 - 25 Tahun</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/dewasa.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lblpenduduk-25-55-Dispenduk"></h4>
                                <h6 class="fs--1">Dewasa 25 - 55 Tahun</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/tua.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lblpenduduklansiaDispenduk"></h4>
                                <h6 class="fs--1">Lansia > 55 Tahun</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas Pendidikan</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/sekolah.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlsekolahDispendik"></h4>
                                <h6 class="fs--1">Jumlah Sekolah</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/guru.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlguruDispendik"></h4>
                                <h6 class="fs--1">Jumlah Guru</h6>
                            </div>
                        </div>
                    </div>
 
                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/murid.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlsiswaDispendik"></h4>
                                <h6 class="fs--1">Jumlah Siswa</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas Sosial</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/penerima_bansos.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlbansos ?></h4>
                                <h6 class="fs--1">Jumlah Bansos</h6>
                            </div>
                        </div>
                    </div>
 
                <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/bansos_bpnt.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlbnpt ?></h4>
                                <h6 class="fs--1">Bansos BNPT</h6>
                            </div>
                        </div>
                    </div>
 
                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/bansos_pkh.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlpkh ?></h4>
                                <h6 class="fs--1">Bansos PKH</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/bansos_ppkm.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlppkm ?></h4>
                                <h6 class="fs--1">Bansos PPKM</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/bansos_jkn.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmljkn ?></h4>
                                <h6 class="fs--1">Bansos PBI JKN</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas PU Cipta Karya</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/buang_air.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlrmhlayak ?></h4>
                                <h6 class="fs--1">Jumlah Rumah Layak Huni</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/sumur.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlair ?></h4>
                                <h6 class="fs--1">Jumlah KK<br>Saluran Air Rumah</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/pdam.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmljamban ?></h4>
                                <h6 class="fs--1">Jumlah KK<br>Memiliki Jamban</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas Pertanian</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/luas_tanam.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmltanam ?></h4>
                                <h6 class="fs--1">Luas Tanam (Ha)</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/luas_panen.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlpanen ?></h4>
                                <h6 class="fs--1">Luas Panen (Ha)</h6>
                            </div>
                        </div>
                    </div>
 
                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/hasil_panen.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlhasil ?></h4>
                                <h6 class="fs--1">Hasil Panen (Ton)</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Badan Penanggulangan Bencana Daerah</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/bencana.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlrawanbencana ?></h4>
                                <h6 class="fs--1">Penduduk Rawan Bencana</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/penerima_bantuan.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlpenerima ?></h4>
                                <h6 class="fs--1">Penduduk Penerima Layanan</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas Pemberdayaan Perempuan, Perlindungan Anak Dan Keluarga Berencana</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/pus.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlpus ?></h4>
                                <h6 class="fs--1">Pasangan Usia Subur</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/kb.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlkb ?></h4>
                                <h6 class="fs--1">Pasangan Usia Subur Peserta KB</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/non_kb.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2"><?php echo $jmlbukankb ?></h4>
                                <h6 class="fs--1">Pasangan Usia Subur Bukan Peserta KB</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="flex-1 position-relative ps-3">
                        <div class="border-dashed-bottom my-3"></div>
                        <h6 class="fs-0 mb-0">Statistik Data Dinas Pariwisata</h6>
                        <div class="border-dashed-bottom my-3"></div>
                    </div>
                </div>

                <div class="row flex-center mt-4">
                    <div class="col-lg-2 mt-6 mt-lg-0">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/wisata.png" alt="Icon" width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlwisata"></h4>
                                <h6 class="fs--1">Tempat Wisata</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/hotel.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlhotel"></h4>
                                <h6 class="fs--1">Hotel & Penginapan</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/restaurant.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlresto"></h4>
                                <h6 class="fs--1">Resto & Cafe</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/ekraf.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlekraf"></h4>
                                <h6 class="fs--1">Ekonomi Kreatif</h6>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-2">
                        <div class="card card-span h-100">
                            <div class="card-span-img">
                                <img class="fs-4 text-info" src="./assets/img/icons/seni.png" alt="Icon"
                                    width="50" />
                            </div>
                            <div class="card-body pt-6 pb-4">
                                <h4 class="mb-2" id="lbljmlkesenian"></h4>
                                <h6 class="fs--1">Kesenian & Kebudayaan</h6>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </section>

        <section class="bg-dark pt-6 pb-4 light">
            <div class="container">
                <div class="row">
                    <div class="col ps-lg-12 ps-xl-12">
                        <div class="row mt-5 mt-lg-0">
                            <div class="col-lg-6 col-md-3">
                                <h5 class="text-uppercase text-white opacity-85 mb-3">
                                    Tautan Eksternal
                                </h5>
                                <ul class="list-unstyled">
                                    <li class="mb-1">
                                        <a class="link-600" target="_blank"
                                            href="https://www.jemberkab.go.id/">Pemerintah Kabupaten Jember</a>
                                    </li>
                                    <li class="mb-1">
                                        <a class="link-600" target="_blank"
                                            href="https://diskominfo.jemberkab.go.id/">Diskominfo Jember</a>
                                    </li>
                                    <li class="mb-1">
                                        <a class="link-600" target="_blank" href="https://ppid.jemberkab.go.id/">PPID
                                            Kabupaten Jember</a>
                                    </li>
                                </ul>
                            </div>
                 
                            <div class="col-lg-6 mt-5 mt-md-0">
                                <h5 class="text-uppercase text-white opacity-85 mb-3">
                                    Dinas Komunikasi dan Informatika Kabupaten Jember
                                </h5>
                                <ul class="list-unstyled">
                                    <li>
                                        <h5 class="fs-0 mb-4">
                                            <a class="link-600"
                                                href="https://www.google.com/maps?ll=-8.18281,113.677579&z=18&t=m&hl=id&gl=ID&mapclient=embed&cid=14999340710307375497" target="_blank">
                                                Jl. Nusantara No.2, Area BSG, Kaliwates Kabupaten
                                                Jember Jawa Timur
                                            </a>
                                        </h5>
                                    </li>
                                    <li>
                                        <h5 class="fs-0 mb-0">
                                            <a class="link-600" href="#!">
                                                <b>Telepon</b> : (0331) 5102507</a>
                                        </h5>
                                        <h5 class="fs-0 mb-0">
                                            <a class="link-600" href="#!"><b>Email</b> : diskominfo@jemberkab.go.id</a>
                                        </h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-0 bg-dark light">
            <div>
                <hr class="my-0 text-600 opacity-25" />
                <div class="container py-3">
                    <div class="row justify-content-center fs--1">
                        <div class="col-12 col-sm-auto text-center">
                            <p class="mb-0 text-600 opacity-85">
                                Copyright &copy; Pemerintah Kabupaten Jember
                                <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" />
                                2022
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
 
    <script src="./vendors/popper/popper.min.js"></script>
    <script src="./vendors/bootstrap/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    <script src="./vendors/anchorjs/anchor.min.js"></script>
    <script src="./vendors/is/is.min.js"></script>
    <script src="./vendors/swiper/swiper-bundle.min.js"></script>
    <script src="./vendors/typed.js/typed.js"></script>
    <script src="./vendors/fontawesome/all.min.js"></script>
    <script src="./vendors/lodash/lodash.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
    <script src="./vendors/list.js/list.min.js"></script>
    <script src="./assets/js/theme.js"></script>

    <script src="data-api.js"></script>

    <script type="text/javascript" charset="utf-8">
    $(document).ready(function(){
      document.body.style.cursor = "default";	

      $("#cmdLogin").removeAttr("disabled");		
      $("#txtusername").val("");
      $("#txtpassword").val("");
      ambilApiStatistikJTourism();
      ambilTotalStatistikDispenduk();ambilUmurStatistikDispenduk();
      ambilTotalStatistikDispendik();
    });	

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    $("#btn-pelayanan").click(function() {
        $("html, body").animate({
                scrollTop: $("#data-informasi").offset().top,
            },
            1000
        );
    });

    $("#cmdLogin").click(function(){
      $("#loginFrm").submit(function(e){return false;});
      var name = $("#txtusername").val();
      var nameLength = name.length;
      var pw   = $("#txtpassword").val();
      var pwLength = pw.length;	
      if (nameLength == 0){$("#txtusername").focus();alert("Maaf, username masih kosong");
      } else if (pwLength == 0){$("#txtpassword").focus();alert("Maaf, password masih kosong");
      } else if (nameLength && pwLength >= 1){
        $.ajax({
          type:"POST",
          url :"services/login_user.php",
          data:{checkUser:'',uid:name,pwrd:pw},
          beforeSend: function(e) {
            $("#cmdLogin").attr("disabled","disabled");
            document.body.style.cursor = "wait";
          },										
          success:function(resp){
            document.body.style.cursor = "default";	
            $("#cmdLogin").removeAttr("disabled");
            $("#loginMsg").html(resp);
          },
          error: function() {alert('Koneksi bermasalah periksa internet');
            document.body.style.cursor = "default";	
            $("#cmdLogin").removeAttr("disabled");
          },							
        });							
      } 
    });		

    </script>
</body>

</html>