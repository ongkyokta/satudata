<?php
error_reporting(0);
session_start();

if($_SESSION['AKSES']=="operator"){
	$iduser=$_SESSION['IDOPERATOR'];
	$username=$_SESSION['USERNAME'];
    $nmoperator=$_SESSION['NMOPERATOR'];
	$akses=$_SESSION['AKSES'];
    $idinstansi=$_SESSION['IDINSTANSI'];
} else if($_SESSION['AKSES']=="administrator"){
	$iduser=$_SESSION['IDOPERATOR'];
	$username=$_SESSION['USERNAME'];
    $nmoperator=$_SESSION['NMOPERATOR'];
	$akses=$_SESSION['AKSES'];
    $idinstansi="1";
} else{
	header('location:../home.html');
}

require_once 'services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

include "services/tgl_indo.php";
date_default_timezone_set('Asia/Jakarta');
$tglserver = date('Y-m-d');

$editor=$iduser; 

$qricbg = ("SELECT nm_instansi,kota FROM m_instansi WHERE id_instansi='".$idinstansi."'");
$dbcabang = mysqli_query($dbconn,$qricbg);$c= mysqli_fetch_assoc($dbcabang);
$nmcabang = ucwords(strtolower($c['nm_instansi']));$nmkotains = ucwords(strtolower($c['kota']));
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
    <link href="../vendors/flatpickr/flatpickr.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap"
        rel="stylesheet">

    <link href="../vendors/overlayscrollbars/OverlayScrollbars.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../vendors/select2/css/select2.min.css">

    <link href="../assets/lib/select2/select2.min.css" rel="stylesheet">
    <link href="../assets/lib/select2-theme/select2-bootstrap4.min.css" rel="stylesheet">
    <link href="../vendors/select2-bootstrap4-theme/select2-bootstrap4.min.css" rel="stylesheet">

    <link href="../vendors/datatables-bs4/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-responsive-bs4/responsive.bootstrap4.css" rel="stylesheet">

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
    </style>

</head>


<body style="-webkit-user-select:none;-moz-user-select:none;">

    <div id="loading"></div>

    <div style="display:none">

        <input type="text" id="lbltglserver" value="<?php echo $tglserver;?>" readonly="readonly" />
        <input type="text" id="lblhalaman" value="" readonly="readonly" />
        <input type="text" id="lblnminstansi" value="<?php echo $nmcabang;?>" readonly="readonly" />

        <input type="text" id="lbleditor" value="<?php echo $editor;?>" readonly="readonly" />
        <input type="text" id="lblakses" value="<?php echo $akses;?>" readonly="readonly" />
        <input type="text" id="lblidinstansi" value="<?php echo $idinstansi;?>" readonly="readonly" />

        <input type="text" id="lbllatitude" value="" readonly="readonly" />
        <input type="text" id="lbllongitude" value="" readonly="readonly" />

        <input type="text" id="txttransid" value="" readonly="readonly" />
        <input type="text" id="txttransketerangan" value="" readonly="readonly" />
        <input type="text" id="txttransnmwilayah" value="" readonly="readonly" />
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

                        <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"><span
                                class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>

                    </div>
                    <a class="navbar-brand" href="#">
                        <div class="d-flex align-items-center py-3"><span
                                class="text-primary fw-bold mb-0">JSatudata</span></div>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
                    <div class="navbar-vertical-content scrollbar">
                        <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                            <li class="nav-item">
                                <!-- parent pages--><a class="nav-link active" id="lv_kota" data-nama="Kabupaten Jember"
                                    data-keterangan="kota" data-koordinat="-8.264371593833262, 113.6321026467762"
                                    href="#" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-map-marked-alt"></span></span><span
                                            class="nav-link-text ps-1">Sebaran Sekolah</span>
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item" style="display:none">
                                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                                    <div class="col-auto navbar-vertical-label">Sinkronisasi data
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>

                                <!-- parent pages--><a class="nav-link active" id="lv_sinkron" href="#" role="button"
                                    data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-sync"></span></span><span
                                            class="nav-link-text ps-1">Sinkron Data</span>
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
              $menuutama = mysqli_query($dbconn, "SELECT * FROM tbl_api_dispendik GROUP BY id_kecamatan ASC");
              while($dm = mysqli_fetch_array($menuutama)){
				$idkec = $dm['id_kecamatan'];$idkec2="ID". str_replace(".", "", $idkec);
                $nmkecamatan = ucwords(strtolower(substr($dm['kecamatan'],5)));$koordinatkec = $dm['lintang'].",".$dm['bujur'];     
				$submenu = mysqli_query($dbconn, "SELECT * FROM tbl_api_dispendik WHERE id_kecamatan = '".$idkec."' GROUP BY desa_kelurahan ASC");

                echo "<a class='nav-link dropdown-indicator lv_kecamatan' href='#$idkec2' data-id='$idkec' data-keterangan='kecamatan' data-nama='$nmkecamatan' data-koordinat='$koordinatkec' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='$idkec2'>
                <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-map-marker-alt'></span></span><span class='nav-link-text ps-1'>$nmkecamatan</span>
                </div>
              </a>";

                      echo "<ul class='nav collapse' id='$idkec2' data-parent='#navbarVerticalCollapse'>";
 
                      while($sub = mysqli_fetch_array($submenu)){
                            $idsub = $sub['id_desa']; $nmdesa = ucwords(strtolower($sub['desa_kelurahan'])); $koordinatdesa = $sub['lintang'].",".$sub['bujur'];     

                            echo " <li class='nav-item'>
                                        <a class='nav-link lv_desa' href='#' data-idkec='$idkec' data-id='$idsub' data-keterangan='desa' data-nama='$nmdesa' data-koordinat='$koordinatdesa' data-bs-toggle='' aria-expanded='false'>
                                            <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>$nmdesa</span>
                                            </div>
                                        </a>
                                    </li>"; 

                  } 
                  echo"</ul>";
              }
			mysqli_free_result($menuutama);mysqli_free_result($submenu);
		    mysqli_close($dbconn);
            ?>

                            </li>



                            <li class="nav-item" style="display:none">
                                <!-- label-->
                                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                                    <div class="col-auto navbar-vertical-label">App
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>
                                <!-- parent pages--><a class="nav-link" href="app/calendar.html" role="button"
                                    data-bs-toggle="" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-calendar-alt"></span></span><span
                                            class="nav-link-text ps-1">Calendar</span>
                                    </div>
                                </a>
                                <!-- parent pages--><a class="nav-link" href="app/chat.html" role="button"
                                    data-bs-toggle="" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-comments"></span></span><span
                                            class="nav-link-text ps-1">Chat</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>


            </nav>
            <div class="content">

                <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">

                    <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse"
                        aria-controls="navbarVerticalCollapse" aria-expanded="false"
                        aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span
                                class="toggle-line"></span></span></button>
                    <a class="navbar-brand me-1 me-sm-3" href="home.html">
                        <div class="d-flex align-items-center py-3"><span
                                class="text-primary fw-bold mb-0">JSatudata</span></div>
                    </a>
                    <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">

                        <li class="nav-item">
                            <div class="search-box" data-list='{"valueNames":["title"]}'>
                                <!--form class="position-relative" data-bs-toggle="search" data-bs-display="static"-->
                                <input class="form-control search-input fuzzy-search" id="txtcarilokasi" type="text"
                                    placeholder="Search..." aria-label="Search" autocomplete="off" />
                                <span class="fas fa-search search-box-icon"></span>
                                <!--/form-->
                                <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none"
                                    data-bs-dismiss="search">
                                    <div class="btn-close-falcon" aria-label="Close"></div>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item d-none d-sm-block">
                            <a class="nav-link" href="logout.html"><span class="fas fa-power-off"
                                    data-fa-transform="shrink-7" style="font-size: 33px;"></span></a>
                        </li>
                    </ul>
                </nav>

                <div id="area-halaman">

                    <div class="row mb-3">
                        <div class="col">
                            <div class="card bg-100 shadow-none border">
                                <div class="row gx-0 flex-between-center">
                                    <div class="col-sm-auto d-flex align-items-center"><img class="ms-n2"
                                            src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90" />
                                        <div>
                                            <h6 class="text-primary fs--1 mb-0">Selamat Datang
                                                <?php echo ucwords(strtolower($nmoperator));?></h6>
                                            <h4 class="text-primary fw-bold mb-0"><?php echo $nmcabang;?></h4>
                                        </div><img class="ms-n4 d-md-none d-lg-block"
                                            src="../assets/img/illustrations/crm-line-chart.png" alt="" width="150" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="card mb-3">
                        <div class="card-header">
                            <div class="row flex-between-center">
                                <div class="col-auto">
                                    <h6 class="mb-0">Peta Sebaran Sekolah <span id="lblkoppeta"></span></h6>
                                </div>
                            </div>
                        </div>
                        <div class="card-body bg-light">
                            <div class="tab-content">
                                <div class="tab-pane preview-tab-pane active" role="tabpanel"
                                    aria-labelledby="tab-dom-f7aa201b-9e09-4fdd-8fc3-b97550edbb34"
                                    id="dom-f7aa201b-9e09-4fdd-8fc3-b97550edbb34">
                                    <div id="map" style="height:68vh"></div>

                                    <!--div id="nyobak" style="height:68vh"></!--div-->
                                </div>
                                <div class="tab-pane code-tab-pane" role="tabpanel"
                                    aria-labelledby="tab-dom-86ce401a-9300-4880-8a1e-b4a081710f6c"
                                    id="dom-86ce401a-9300-4880-8a1e-b4a081710f6c">
                                    <pre class="scrollbar rounded-1"
                                        style="max-height:420px"><code class="language-html">&lt;div id=&quot;map&quot; style=&quot;height:300px&quot;&gt;&lt;/div&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!---------------- GRAFIK JUMLAH ------------------>
                    <!------------------------------------------------->
                    <div class="row mb-3 g-3">
                        <div class="col-lg-6 ps-lg-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Jumlah Sekolah <span
                                                id="lblkopgrafik1"></span></p>
                                    </div>
                                    <div class="chart h-100" id="hitungUmurChart" data-echart-responsive="true">
                                        <canvas id="umurChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 ps-lg-2">
                            <div class="card bg-line-chart-gradient h-lg-100">
                                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                    <div class="col light">
                                        <p class="fs--1 fw-semi-bold">Grafik Status Sekolah <span
                                                id="lblkopgrafik2"></span></p>
                                    </div>
                                    <div class="chart h-100" id="hitungChartContentADMIN" data-echart-responsive="true">
                                        <canvas id="hitungChartADMIN"></canvas>
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
                                        <p class="fs--1 fw-semi-bold">Grafik Status Akreditasi Sekolah <span
                                                id="lblkopgrafik4"></span></p>
                                    </div>
                                    <div class="chart h-100" id="hitungChartContentAkreditasi"
                                        data-echart-responsive="true">
                                        <canvas id="hitungChartAkreditasi" height="300px"></canvas>
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
                                        <p class="fs--1 fw-semi-bold">Grafik Perbandingan Jumlah Guru Dengan Jumlah
                                            Siswa <span id="lblkopgrafik3"></span></p>
                                    </div>
                                    <div class="chart h-100" id="hitungChartContentGuru" data-echart-responsive="true">
                                        <canvas id="hitungChartGuru" height="300px"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header d-flex flex-between-center">
                                    <h6 class="mb-0">Statistik Kondisi Ruang / Sarana Sekolah</h6>
                                </div>
                                <div class="card-body bg-light pt-0">
                                    <div class="row mt-3 mb-2">
                                        <div class="col-6 border-end border-200">
                                            <h4 class="mb-0" id="lbljumsekolahSarana"></h4>
                                            <p class="fs--1 text-600 mb-0">Jumlah Sekolah</p>
                                        </div>
                                        <div class="col-6 border-end border-200">
                                            <h4 class="mb-0" id="lbljumruangSarana"></h4>
                                            <p class="fs--1 text-600 mb-0">Jumlah Ruang / Sarana</p>
                                        </div>
                                    </div>
                                    <h6 class="fs--1 mb-3 mt-3">Prosentase</h6>
                                    <div class="overflow-visible progress mt-4 mb-2 rounded-3" id="areastatistikSarana"
                                        style="height: 6px;">
                                    </div>

                                    <div class="row g-4">
                                        <div class="col-sm-3 col-md-3">
                                            <div class="d-flex position-relative">
                                                <div class="icon-item icon-item-sm border rounded-3 shadow-none me-2">
                                                    <span class="fas fa-check text-primary"></span></div>
                                                <div class="flex-1">
                                                    <a class="stretched-link" id="cmdTampilBaik" href="#!">
                                                        <h6 class="text-800 mb-0">Baik</h6>
                                                    </a>
                                                    <p class="mb-0 fs--2 text-500">Sekolah kondisi baik</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-3">
                                            <div class="d-flex position-relative">
                                                <div class="icon-item icon-item-sm border rounded-3 shadow-none me-2">
                                                    <span class="fas fa-bell text-success"></span></div>
                                                <div class="flex-1"><a class="stretched-link" id="cmdTampilRingan" href="#!">
                                                        <h6 class="text-800 mb-0">Rusak Ringan</h6>
                                                    </a>
                                                    <p class="mb-0 fs--2 text-500">Sekolah kondisi rusak ringan</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-3">
                                            <div class="d-flex position-relative">
                                                <div class="icon-item icon-item-sm border rounded-3 shadow-none me-2">
                                                    <span class="fas fa-ban text-warning"></span></div>
                                                <div class="flex-1"><a class="stretched-link" id="cmdTampilSedang" href="#!">
                                                        <h6 class="text-800 mb-0">Rusak Sedang</h6>
                                                    </a>
                                                    <p class="mb-0 fs--2 text-500">Sekolah kondisi rusak sedang</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 col-md-3">
                                            <div class="d-flex position-relative">
                                                <div class="icon-item icon-item-sm border rounded-3 shadow-none me-2">
                                                    <span class="fas fa-power-off text-danger"></span></div>
                                                <div class="flex-1"><a class="stretched-link" id="cmdTampilBerat" href="#!">
                                                        <h6 class="text-800 mb-0">Rusak Berat</h6>
                                                    </a>
                                                    <p class="mb-0 fs--2 text-500">Sekolah kondisi rusak berat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-lg-100 overflow-hidden mb-3">
                                <div class="card-header">
                                    <h6 class="mb-0">Detail Kondisi Ruang / Sarana Sekolah</h6>
                                </div>
                                <div class="card-body p-0">
                                    <div class="table-responsive scrollbar">
                                        <table class="table table-dashboard mb-0 table-borderless fs--1 border-200">
                                            <thead class="bg-light">
                                                <tr class="text-900">
                                                    <th>Nama Ruang</th>
                                                    <th class="text-center">Jumlah</th>
                                                    <th>Kondisi Baik</th>
                                                    <th>Rusak Ringan</th>
                                                    <th>Rusak Sedang</th>
                                                    <th>Rusak Berat</th>
                                                </tr>
                                            </thead>
                                            <tbody id="list-data-sarana">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>





                <!---------------- akhir pengunjung ------------------>
                <!------------------------------------------------->

                <!---------------- tabel operator ------------------>
                <!------------------------------------------------->
                <div class="col-xxl-12" id="area-operator" style="display:none">

                    <div class="card z-index-1 mb-3">
                        <div class="card-header">
                            <div class="row flex-between-center">
                                <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                                    <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">Data Operator </h5>
                                </div>
                                <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                                    <div id="table-purchases-replace-element">
                                        <button class="btn btn-falcon-default btn-sm mx-2" type="button"
                                            id="cmdTambahOperator"><span class="d-none d-sm-inline-block ms-1">Tambah
                                                Data</span></button>
                                        <button class="btn btn-falcon-default btn-sm" type="button"
                                            id="cmdRefreshOperator"><span
                                                class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body px-0 py-0">

                            <div id="tableOperator"
                                data-list='{"valueNames":["nmoperator","username","akses","blokir"],"page":10,"pagination":true}'>
                                <div class="table-responsive scrollbar">
                                    <table class="table table-sm table-striped fs--1 mb-0 overflow-hidden">
                                        <thead class="bg-200 text-900">
                                            <tr>
                                                <th class="sort" data-sort="nmoperator">Nama Operator</th>
                                                <th class="sort" data-sort="username">Username</th>
                                                <th class="sort" data-sort="akses">Akses</th>
                                                <th class="sort" data-sort="blokir">Blokir</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody class="list" id="list-operator">
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <!---------------- akhir operator ------------------>
                <!------------------------------------------------->

            </div>


        </div>
        <!--area halaman-->

        </div>
        <!--content-->

        <?php
          include "modal.php";
        ?>

        </div>
    </main>
 
    <script src="../vendors/bootstrap/bootstrap.min.js"></script>
    <script src="../vendors/anchorjs/anchor.min.js"></script>
 
    <script src="../vendors/fontawesome/all.min.js"></script>
    <script src="../vendors/lodash/lodash.min.js"></script>
 
    <script src="../vendors/jquery/jquery.min.js"></script>

    <script src="../assets/lib/datatables/js/jquery.dataTables.min.js"></script>
    <script src="../assets/lib/datatables-bs4/dataTables.bootstrap4.min.js"></script>
    <script src="../assets/lib/datatables.net-responsive/dataTables.responsive.js"></script>
    <script src="../assets/lib/datatables.net-responsive-bs4/responsive.bootstrap4.js"></script>

    <script src="../assets/js/theme.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js" crossorigin="anonymous"></script>

    <script src="dashboard.js"></script>
    <script src="master.js"></script>

    <script type="text/javascript" charset="utf-8">
    $(document).ready(function() {

        setTimeout(function() {
            document.body.style.cursor = "default";
            bersihkan();
            $("#area-halaman").fadeIn();

            $("#txttransketerangan").val("kota");
            var nmwilayah = "Kabupaten Jember";
            $("#lblkoppeta").text(nmwilayah);
            $("#lblkopgrafik1").text(nmwilayah);
            $("#lblkopgrafik2").text(nmwilayah);
            $("#lblkopgrafik3").text(nmwilayah);
            $("#lblkopgrafik4").text(nmwilayah);

            hitungGrafikTotalSekolah();
            isiGrafikStatus();
            isiGrafikAkreditasi();
            isiDataSarana();
            isiGrafikBandingGuruSiswa();
            $("#area-pengunjung").fadeIn();
            $("#lblhalaman").val("dashboard");
            $("#loading").fadeOut("slow");
        }, 1000);
    });
    </script>

</body>

</html>