<?php
error_reporting(0);
session_start();

if ($_SESSION['AKSES'] == "administrator") {
    $iduser = $_SESSION['IDOPERATOR'];
    $username = $_SESSION['USERNAME'];
    $nmoperator = $_SESSION['NMOPERATOR'];
    $akses = $_SESSION['AKSES'];
    $idinstansi = "1";
} else {
    header('location:../home.html');
}

require_once 'services/config.php';
$dbconn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Could not connect: ');

include "services/tgl_indo.php";
date_default_timezone_set('Asia/Jakarta');
$tglserver = date('Y-m-d');

$editor = $iduser;

$qricbg = ("SELECT nm_instansi,kota FROM m_instansi WHERE id_instansi='" . $idinstansi . "'");
$dbcabang = mysqli_query($dbconn, $qricbg);
$c = mysqli_fetch_assoc($dbcabang);
$nmcabang = ucwords(strtolower($c['nm_instansi']));
$nmkotains = ucwords(strtolower($c['kota']));
mysqli_free_result($dbcabang);
?>

<!DOCTYPE html>
<html lang="en-US" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta name="google" content="notranslate" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="-1">

    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>JBigdata | Kabupaten Jember</title>


    <!-- ===============================================-->
    <!--    Favicons-->
    <!-- ===============================================-->
    <link href="favicon.png" rel="icon" />
    <link href="favicon.png" rel="apple-touch-icon" />
    <link rel="manifest" href="../assets/img/favicons/manifest.json">
    <meta name="msapplication-TileImage" content="../assets/img/favicons/mstile-150x150.png">
    <meta name="theme-color" content="#ffffff">
    <script src="../assets/js/config.js"></script>
    <script src="../vendors/overlayscrollbars/OverlayScrollbars.min.js"></script>


    <!-- ===============================================-->
    <!--    Stylesheets-->
    <!-- ===============================================-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">

    <link href="../vendors/overlayscrollbars/OverlayScrollbars.min.css" rel="stylesheet">

    <link href="../vendors/flatpickr/flatpickr.min.css" rel="stylesheet" />

    <link href="../assets/lib/select2/select2.min.css" rel="stylesheet">
    <link href="../assets/lib/select2-theme/select2-bootstrap4.min.css" rel="stylesheet">
    <link href="../vendors/select2-bootstrap4-theme/select2-bootstrap4.min.css" rel="stylesheet">

    <link href="../vendors/datatables-bs4/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-responsive-bs4/responsive.bootstrap4.css" rel="stylesheet">

    <link href="../vendors/glightbox/glightbox.min.css" rel="stylesheet" />
    <link href="../vendors/plyr/plyr.css" rel="stylesheet" />
    <link href="../vendors/dropzone/dropzone.min.css" rel="stylesheet">

    <link href="../assets/css/theme.min.css" rel="stylesheet" id="style-default">

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/leaflet.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/leaflet.js"></script>

    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js" crossorigin="anonymous"></script>

    <!-- STYLING UNTUK LEAFLET -->
    <style>
        .leaflet-control-container .leaflet-routing-container-hide {
            display: none;
        }
    </style>
    <!-- STYLING UNTUK LEAFLET -->

    <style type="text/css">
        #loading {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url(../assets/css/loading.gif) 50% 50% no-repeat #ede9df;
            background-color: #252525;
            opacity: 0.7;
            filter: alpha(opacity=70);
        }

        .pagination {
            padding-right: 10px;
        }

        .page-link {
            border: none;
            margin-top: 5px;
            padding-top: 5px;
            height: 32px;
            text-align: center;
            vertical-align: middle;
            font-size: 12px;
        }

        .paginate_button.active .page-link {
            background-color: black !important;
        }

        @media screen and (min-width: 676px) {
            .modal-detail-dialog {
                max-width: 1100px;
                /* New width for default modal */
            }
        }
    </style>

</head>


<body style="-webkit-user-select:none;-moz-user-select:none;">

    <div id="loading"></div>

    <div style="display:none">

        <input type="text" id="lbltglserver" value="<?php echo $tglserver; ?>" readonly="readonly" />
        <input type="text" id="lblurlqrcode" value="<?php echo $serverurl; ?>" readonly="readonly" />
        <input type="text" id="lblhalaman" value="" readonly="readonly" />
        <input type="text" id="lblnminstansi" value="<?php echo $nmcabang; ?>" readonly="readonly" />

        <input type="text" id="lbleditor" value="<?php echo $editor; ?>" readonly="readonly" />
        <input type="text" id="lblakses" value="<?php echo $akses; ?>" readonly="readonly" />
        <input type="text" id="lblidinstansi" value="<?php echo $idinstansi; ?>" readonly="readonly" />

        <input type="text" id="lbllatitude" value="" readonly="readonly" />
        <input type="text" id="lbllongitude" value="" readonly="readonly" />

        <input type="text" id="txttransid" value="" readonly="readonly" /><!-- dashboard -->
        <input type="text" id="txttransketerangan" value="" readonly="readonly" /><!-- dashboard -->
        <input type="text" id="txttransnmwilayah" value="" readonly="readonly" /><!-- dashboard -->

        <input type="text" id="txttransiddetailsekolah" value="" readonly="readonly" /><!-- dashboard -->
    </div>

    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
        <div class="container-fluid" data-layout="container">
            <nav class="navbar navbar-light navbar-vertical navbar-expand-xl navbar-vibrant">

                <script>
                    var navbarStyle = localStorage.getItem("navbarStyle");
                    if (navbarStyle && navbarStyle !== 'transparent') {
                        document.querySelector('.navbar-vertical').classList.add(`navbar-${navbarStyle}`);
                    }
                </script>
                <div class="d-flex align-items-center">
                    <div class="toggle-icon-wrapper">

                        <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>

                    </div>
                    <a class="navbar-brand" href="#">
                        <div class="d-flex align-items-center py-3"><span class="text-primary fs-2 fw-bold mb-0">JSatudata</span></div>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
                    <div class="navbar-vertical-content scrollbar">
                        <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">

                            <li class="nav-item">
                                <div class="row navbar-vertical-label-wrapper mt-2 mb-2">
                                    <div class="col-auto navbar-vertical-label">Dashboard
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" id="lv_dashboard" href="#" role="button" data-nama="Kabupaten Jember" data-keterangan="kota" data-koordinat="-8.264371593833262, 113.6321026467762" href="#" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-map-marker-alt"></span></span><span class="nav-link-text ps-1">Peta</span>
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" id="lv_statistik" href="#" role="button" data-nama="Kabupaten Jember" data-keterangan="kota" href="#" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-chart-pie"></span></span><span class="nav-link-text ps-1">Statistik</span>
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                                    <div class="col-auto navbar-vertical-label">Pemetaan Wilayah
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>

                                <?php
                                $menuutama = mysqli_query($dbconn, "SELECT id_kecamatan,nm_kecamatan FROM m_kecamatan GROUP BY id_kecamatan ASC");
                                while ($dm = mysqli_fetch_array($menuutama)) {
                                    $idkec = $dm['id_kecamatan'];
                                    $idkec2 = "ID" . str_replace(".", "", $idkec);
                                    $nmkecamatan = ucwords(strtolower(str_replace("Kecamatan ", "", $dm['nm_kecamatan']))); //$koordinatkec = $dm['lintang'].",".$dm['bujur'];     
                                    $submenu = mysqli_query($dbconn, "SELECT id_desa,nm_desa,id_kecamatan FROM m_desa WHERE id_kecamatan = '" . $idkec . "' GROUP BY nm_desa ASC");

                                                            echo "<a class='nav-link dropdown-indicator lv_kecamatan' href='#$idkec2' data-id='$idkec' data-keterangan='kecamatan' data-nama='$nmkecamatan' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='$idkec2'>
                                        <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-map-marker-alt'></span></span><span class='nav-link-text ps-1'>$nmkecamatan</span>
                                        </div>
                                    </a>";

                                    echo "<ul class='nav collapse' id='$idkec2' data-parent='#navbarVerticalCollapse'>";

                                    while ($sub = mysqli_fetch_array($submenu)) {
                                        $idsub = $sub['id_desa'];
                                        $nmdesa = ucwords(strtolower($sub['nm_desa'])); // $koordinatdesa = $sub['lintang'].",".$sub['bujur'];     

                                        echo " <li class='nav-item'>
                                        <a class='nav-link lv_desa' href='#!' data-idkec='$idkec' data-id='$idsub' data-keterangan='desa' data-nama='$nmdesa' data-bs-toggle='' aria-expanded='false'>
                                            <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>$nmdesa</span>
                                            </div>
                                        </a>
                                    </li>";
                                    }
                                    
                                    echo "</ul>";
                                }
                                mysqli_free_result($menuutama);
                                mysqli_free_result($submenu);
                                mysqli_close($dbconn);
                                ?>

                            </li>

                        </ul>
                    </div>
                </div>


            </nav>
            <div class="content">

                <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">

                    <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
                    <ul class="navbar-nav align-items-center d-none d-lg-block">

                        <li class="nav-item">
                            <div class="search-box" data-list='{"valueNames":["title"]}'>
                                <input class="form-control search-input fuzzy-search" id="txtcarilokasi" type="text" placeholder="Search..." aria-label="Search" autocomplete="off" />
                                <span class="fas fa-search search-box-icon"></span>
                                <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none" data-bs-dismiss="search">
                                    <div class="btn-close-falcon" aria-label="Close"></div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">

                        <li class="nav-item dropdown"><a class="nav-link pe-0 ps-2" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="avatar avatar-xl">
                                    <img class="rounded-circle" src="../assets/img/team/avatar.png" alt="" />
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                                <div class="bg-white dark__bg-1000 rounded-2 py-2">
                                    <a class="dropdown-item" href="logout.html">Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div class="card mb-3" id="area-peta">
                    <div class="card-header">
                        <div class="row flex-between-center">
                            <div class="col-auto">
                                <h6 class="mb-0">Peta Sebaran Aset <span id="lblkoppeta"></span></h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-light">
                        <div class="tab-content">
                            <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-f7aa201b-9e09-4fdd-8fc3-b97550edbb34" id="dom-f7aa201b-9e09-4fdd-8fc3-b97550edbb34">
                                <div id="map" style="height:68vh"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="area-halaman-utama" style="display:none;">

                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header d-flex flex-between-center">
                                    <h6 class="mb-0">Statistik Data Aset</h6>
                                </div>
                                <div class="card-body bg-light pt-0">
                                    <div class="row mt-3 mb-2">
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumKIBA"></h4>
                                            <p class="fs--1 text-600 mb-0">Jumlah KIB-A</p>
                                        </div>
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumKIBB"></h4>
                                            <p class="fs--1 text-600 mb-0">Jumlah KIB-B</p>
                                        </div>
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumKIBC"></h4>
                                            <p class="fs--1 text-600 mb-0">Jumlah KIB-C</p>
                                        </div>
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumKIBD"></h4>
                                            <p class="fs--1 text-600 mb-0">Jumlah KIB-D</p>
                                        </div>
                                    </div>
                                    
                                    <div class="overflow-visible progress mt-4 mb-2 rounded-3" id="areastatistikSarana" style="height: 6px;">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col-xxl-12">
                            <div class="card z-index-1">
                                <div class="card-header">
                                    <div class="row flex-between-center g-0">
                                        <div class="col-auto">
                                            <h6 class="fs--1 mb-0">Rincian Tabel Data Aset Lembaga</h6>
                                        </div>
                                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                                            <div id="table-purchases-replace-element">
                                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshStatLembaga"><span class="d-none d-sm-inline-block">Refresh</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body bg-light px-3 py-3">
                                    <div class="table-responsive scrollbar">
                                        <table id="tabelAsetStatistikLembaga" class="table table-sm table-striped mb-0 fs--1 w-100">
                                            <thead class="bg-200">
                                                <tr>
                                                <th class="sort text-center">No.</th>
                                                <th class="sort text-center">Nama Lembaga</th>
                                                <th class="sort text-center">KIB-A</th>
                                                <th class="sort text-center">KIB-B</th>
                                                <th class="sort text-center">KIB-C</th>
                                                <th class="sort text-center">KIB-D</th>
                                                <th class="sort text-center">Jumlah</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white" id="isitabelAsetStatistikLembaga" />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!---------------- GRAFIK JUMLAH ------------------>
                    <!------------------------------------------------->
                    <div class="row mb-3 g-3">
                        <div class="col-xxl-6 px-xxl-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Jumlah Aset <span id="lblkopgrafik1"></span></p>
                                    </div>
                                    <div class="chart" id="hitungUmurChart" data-echart-responsive="true">
                                        <canvas id="umurChart" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col-lg-8 ps-lg-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Kategori Aset (KIB-A)</p>
                                    </div>
                                    <div class="chart h-100" id="hitungKategoriChart" data-echart-responsive="true">
                                        <canvas id="kategoriChart" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 ps-lg-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Status Sertifikat (KIB-A)</p>
                                    </div>
                                    <div class="chart h-100" id="hitungSertifikatChart" data-echart-responsive="true">
                                        <canvas id="sertifikatChart" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col-xxl-6 px-xxl-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Aset Disewakan / Pinjam Pakai <span id="lblkopgrafik2"></span></p>
                                    </div>
                                    <div class="chart" id="hitungChartContentADMIN" data-echart-responsive="true">
                                        <canvas id="hitungChartADMIN" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!---------------- STATUS SEWA / PINJAM ------------------>
                    <!------------------------------------------------->
                    <div class="row mb-3 g-3">
                        <div class="col-lg-6 ps-lg-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Aset Disewa</p>
                                    </div>
                                    <div class="chart h-100" id="hitungDisewakanChart" data-echart-responsive="true">
                                        <canvas id="sewaChart" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 ps-lg-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Aset Dipinjam Pakai</p>
                                    </div>
                                    <div class="chart h-100" id="hitungPinjamChart" data-echart-responsive="true">
                                        <canvas id="pinjamChart" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col-xxl-12">
                            <div class="card z-index-1">
                                <div class="card-header">
                                    <div class="row flex-between-center g-0">
                                        <div class="col-auto">
                                            <h6 class="fs--1 mb-0">Tabel Data Potensi Sewa Aset (KIB-A)</h6>
                                        </div>
                                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                                            <div id="table-purchases-replace-element">
                                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshPotensiSewa"><span class="d-none d-sm-inline-block">Refresh</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body bg-light px-3 py-3">
                                    <div class="table-responsive scrollbar">
                                        <table id="tabelPotensiSewa" class="table table-sm table-striped mb-0 fs--1 w-100">
                                            <thead class="bg-200">
                                                <tr>
                                                    <th class="sort">No.</th>
                                                    <th class="sort">Nama Aset</th>
                                                    <th class="sort">Alamat</th>
                                                    <th class="sort text-center">Luas</th>
                                                    <th class="sort">Harga/Meter</th>
                                                    <th class="sort text-center">Potensi Rp.</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white" id="isitabelPotensiSewa" />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col-xxl-12">
                            <div class="card z-index-1">
                                <div class="card-header">
                                    <div class="row flex-between-center g-0">
                                        <div class="col-auto">
                                            <h6 class="fs--1 mb-0">Tabel Data Pengajuan Sewa Perlu Tindak Lanjut</h6>
                                        </div>
                                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                                            <div id="table-purchases-replace-element">
                                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshPengajuanSewa"><span class="d-none d-sm-inline-block">Refresh</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body bg-light px-3 py-3">
                                    <div class="table-responsive scrollbar">
                                        <table id="tabelPengajuanStatistikSewa" class="table table-sm table-striped mb-0 fs--1 w-100">
                                            <thead class="bg-200">
                                                <tr>
                                                <th class="sort text-center">No.</th>
                                                <th class="sort text-center">Tanggal</th>
                                                <th class="sort text-center">Penyewa</th>
                                                <th class="sort text-center">Identitas Aset</th>
                                                <th class="sort text-center">Luas</th>
                                                <th class="sort text-center">Penawaran</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white" id="isitabelPengajuanStatistikSewa" />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div><!--halaman-->

                <!--halaman sekolah-->
                <div id="area-halaman-sekolah" style="display:none;">

                    <!----------------- DETAIL SEKOLAH ---------------->
                    <div id="hal-detail-sekolah"></div>

                    <!----------------- VIDEO ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Video Sarana Sekolah</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <!--video class="player rounded-3" controls crossorigin playsinline poster="" id="div-video"-->
                                    <video class="player rounded-3" controls crossorigin playsinline poster="" id="div-video"></video>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- KELAS ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Kelas</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-kelas"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- PERPUSTAKAN ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Perpustakaan</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-perpustakaan"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- kepsek ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Kepala Sekolah</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-kepsek"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- guru ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Guru</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-guru"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- pembinaan ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Pembinaan</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-pembinaan"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- multimedia ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Lab. Multimedia</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-multimedia"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- komputer ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Lab. Komputer</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-komputer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- ips ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Lab. IPS</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-ips"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- ipa ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Lab.IPA</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-ipa"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- bahasa ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Lab. Bahasa</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-bahasa"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- wc umum ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang WC Umum</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-wcumum"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- wc siswa ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang WC Siswa</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-wcsiswa"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- wc guru ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang WC Guru</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-wcguru"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- ibadah ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Ruang Ibadah</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-ibadah"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!----------------- asrama ---------------->
                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h6 class="mb-0">Foto Asrama</h6>
                                </div>
                                <div class="card-body bg-light overflow-hidden">
                                    <div class="row mx-n1" id="div-asrama"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div><!--halaman sekolah-->

                <?php
                include "master-kib.php";
                include "master-data.php";
                include "master-aset.php";
                include "transaksi-laporan.php";
                ?>

            </div><!--content-->

            <?php
            include "modal.php";
            ?>

        </div><!--container-->
    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->

    <!-- ===============================================-->
    <!-- JavaScripts-->
    <!-- ===============================================-->

    <script src="../vendors/popper/popper.min.js"></script>
    <script src="../vendors/bootstrap/bootstrap.min.js"></script>
    <script src="../vendors/anchorjs/anchor.min.js"></script>
    <!--script src="../vendors/is/is.min.js"></!--script-->

    <!--script src="../vendors/echarts/echarts.min.js"></!--script-->

    <script src="../vendors/fontawesome/all.min.js"></script>
    <script src="../vendors/lodash/lodash.min.js"></script>
    <!--script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></!--script-->
    <!--script src="../vendors/list.js/list.min.js"></!--script-->

    <script src="../vendors/jquery/jquery.min.js"></script>
    <script src="../assets/select2/select2.min.js"></script>

    <script src="../assets/lib/datatables/js/jquery.dataTables.min.js"></script>
    <script src="../assets/lib/datatables-bs4/dataTables.bootstrap4.min.js"></script>
    <script src="../assets/lib/datatables.net-responsive/dataTables.responsive.js"></script>
    <script src="../assets/lib/datatables.net-responsive-bs4/responsive.bootstrap4.js"></script>


    <script src="../vendors/plyr/plyr.polyfilled.min.js"></script>
    <script src="../vendors/dropzone/dropzone.min.js"></script>

    <script src="../assets/js/flatpickr.js"></script>
    <script src="../assets/js/theme.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>

    <!--script src="https://cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></!--script-->
    <!--script src="assets/glightbox/glightbox.js"></!--script-->

    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js" crossorigin="anonymous"></script>

    <script src="dashboard.js"></script>
    <script src="master-kib.js"></script>
    <script src="master-data.js"></script>
    <script src="master-aset.js"></script>
    <script src="transaksi-laporan.js"></script>

    <script type="text/javascript" charset="utf-8">
        $(document).ready(function() {
            setTimeout(function() {
                document.body.style.cursor = "default";
                bersihkan();
                ambilJumlahMenu()
                //$("#area-halaman-utama").fadeIn();
                $("#area-peta").fadeIn();

                $("#txttransketerangan").val("kota");
                var nmwilayah = "Kabupaten Jember";
                $("#lblkoppeta").text(nmwilayah);
                $("#lblkopgrafik1").text(nmwilayah);
                $("#lblkopgrafik2").text(nmwilayah);
                $("#lblkopgrafik3").text(nmwilayah);
                $("#lblkopgrafik4").text(nmwilayah);

                $("#lblhalaman").val("dashboard");
                $("#loading").fadeOut("slow");
            }, 1000);

        });
    </script>

</body>

</html>