<?php
error_reporting(0);
session_start();

if ($_SESSION['AKSES'] == "operator") {
    $iduser = $_SESSION['IDOPERATOR'];
    $username = $_SESSION['USERNAME'];
    $nmoperator = $_SESSION['NMOPERATOR'];
    $akses = $_SESSION['AKSES'];
    $idinstansi = $_SESSION['IDINSTANSI'];
} else if ($_SESSION['AKSES'] == "administrator") {
    $iduser = $_SESSION['IDOPERATOR'];
    $username = $_SESSION['USERNAME'];
    $nmoperator = $_SESSION['NMOPERATOR'];
    $akses = $_SESSION['AKSES'];
    $idinstansi = "12";
} else {
    header('location:../home.html');
}

require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Could not connect: ');

include "../services/tgl_indo.php";
date_default_timezone_set('Asia/Jakarta');
$tglserver = date('Y-m-d');

$editor = $iduser;

$qricbg = ("SELECT nm_instansi,kota FROM m_instansi WHERE id_instansi='" . $idinstansi . "'");
$dbcabang = mysqli_query($dbconn, $qricbg);
$c = mysqli_fetch_assoc($dbcabang);
$nmcabang = ucwords(strtolower($c['nm_instansi']));
$nmkotains = ucwords(strtolower($c['kota']));
mysqli_free_result($dbcabang);

$qrithnakhir = ("SELECT MAX(tahun) AS thnakhir FROM bag_hukum");
$dbthnakhir = mysqli_query($dbconn, $qrithnakhir);
$e = mysqli_fetch_assoc($dbthnakhir);
$thnakhir = $e['thnakhir'];
mysqli_free_result($dbthnakhir);

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

    <title>JBigdata | Kabupaten Jember</title>

    <link href="favicon.png" rel="icon" />
    <link href="favicon.png" rel="apple-touch-icon" />
    <link rel="manifest" href="../assets/img/favicons/manifest.json">
    <meta name="msapplication-TileImage" content="../assets/img/favicons/mstile-150x150.png">
    <meta name="theme-color" content="#ffffff">
    <script src="../assets/js/config.js"></script>
    <script src="../vendors/overlayscrollbars/OverlayScrollbars.min.js"></script>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet">

    <link href="../vendors/overlayscrollbars/OverlayScrollbars.min.css" rel="stylesheet">

    <link href="../assets/css/theme.min.css" rel="stylesheet" id="style-default">

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
    </style>

</head>


<body style="-webkit-user-select:none;-moz-user-select:none;">

    <div id="loading"></div>

    <div style="display:none">

        <input type="text" id="lbltglserver" value="<?php echo $tglserver; ?>" readonly="readonly" />
        <input type="text" id="lbltahunakhir" value="<?php echo $thnakhir; ?>" readonly="readonly" />
        <input type="text" id="lblhalaman" value="" readonly="readonly" />
        <input type="text" id="lblnminstansi" value="<?php echo $nmcabang; ?>" readonly="readonly" />

        <input type="text" id="lbleditor" value="<?php echo $editor; ?>" readonly="readonly" />
        <input type="text" id="lblakses" value="<?php echo $akses; ?>" readonly="readonly" />
        <input type="text" id="lblidinstansi" value="<?php echo $idinstansi; ?>" readonly="readonly" />

        <input type="text" id="lbllatitude" value="" readonly="readonly" />
        <input type="text" id="lbllongitude" value="" readonly="readonly" />

        <input type="text" id="txttransid" value="" readonly="readonly" />
        <input type="text" id="txttransketerangan" value="" readonly="readonly" />
        <input type="text" id="txttranstahun" value="<?php echo $thnakhir; ?>" readonly="readonly" />
    </div>

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
                        <div class="d-flex align-items-center py-3"><span class="text-primary fw-bold mb-0">JSatudata</span></div>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
                    <div class="navbar-vertical-content scrollbar">
                        <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                            <li class="nav-item mt-2 mb-0">
                                <!-- parent pages--><a class="nav-link active" id="lv_kota" data-nama="Kabupaten Jember" data-keterangan="kota" data-koordinat="-8.264371593833262, 113.6321026467762" href="#" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-chart-pie"></span></span><span class="nav-link-text ps-1">Dashboard</span>
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item" style="display:none">
                                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                                    <div class="col-auto navbar-vertical-label">Sinkronisasi Data
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>

                                <a class="nav-link active" id="lv_import" href="#" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-sync"></span></span><span class="nav-link-text ps-1">Import</span>
                                    </div>
                                </a>

                                <a class="nav-link active" id="lv_sinkron" href="#" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-sync"></span></span><span class="nav-link-text ps-1">Sinkronisasi</span>
                                    </div>
                                </a>

                            </li>

                            <li class="nav-item">
                                <div class="row navbar-vertical-label-wrapper mt-2 mb-2">
                                    <div class="col-auto navbar-vertical-label">Data Periode Tahun
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>

                                <?php
                                $menuutama = mysqli_query($dbconn, "SELECT tahun FROM bag_hukum ORDER BY tahun DESC");
                                while ($dm = mysqli_fetch_array($menuutama)) {
                                    $idkec = $dm['tahun'];

                                    echo "<a class='nav-link lv_kecamatan' href='#!' data-id='$idkec' data-keterangan='kecamatan' data-tahun='$idkec' role='button' data-bs-toggle='' aria-expanded='false'>
                <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-calendar'></span></span><span class='nav-link-text ps-1'>$idkec</span>
                </div>
              </a>";
                                }
                                mysqli_free_result($menuutama);
                                ?>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
            <div class="content">

                <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">

                    <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
                    <a class="navbar-brand me-1 me-sm-3" href="home.html">
                        <div class="d-flex align-items-center py-3"><span class="text-primary fw-bold mb-0">JSatudata</span></div>
                    </a>
                    <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">

                        <li class="nav-item">
                            <div class="search-box" data-list='{"valueNames":["title"]}'>
                                <!--form class="position-relative" data-bs-toggle="search" data-bs-display="static"-->
                                <input class="form-control search-input fuzzy-search" id="txtcarilokasi" type="text" placeholder="Search..." aria-label="Search" autocomplete="off" />
                                <span class="fas fa-search search-box-icon"></span>
                                <!--/form-->
                                <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none" data-bs-dismiss="search">
                                    <div class="btn-close-falcon" aria-label="Close"></div>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item d-none d-sm-block">
                            <a class="nav-link" href="logout.html"><span class="fas fa-power-off" data-fa-transform="shrink-7" style="font-size: 33px;"></span></a>
                        </li>
                    </ul>
                </nav>

                <div id="area-halaman">

                    <div class="row mb-3">
                        <div class="col">
                            <div class="card bg-100 shadow-none border">
                                <div class="row gx-0 flex-between-center">
                                    <div class="col-sm-auto d-flex align-items-center"><img class="ms-n2" src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90" />
                                        <div>
                                            <h6 class="text-primary fs--1 mb-0">Selamat Datang
                                                <?php echo ucwords(strtolower($nmoperator)); ?></h6>
                                            <h4 class="text-primary fw-bold mb-0"><?php echo $nmcabang; ?></h4>
                                        </div><img class="ms-n4 d-md-none d-lg-block" src="../assets/img/illustrations/crm-line-chart.png" alt="" width="150" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3 g-3">
                        <div class="col">
                            <div class="card h-100">
                                <div class="card-header d-flex flex-between-center">
                                    <h6 class="mb-0">Statistik Kinerja Penataan Peraturan Perundang-Undangan</h6>
                                </div>
                                <div class="card-body bg-light pt-0">
                                    <div class="row mt-4 mb-2">
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumlahkepbup"></h4>
                                            <p class="fs--1 text-600 mb-0">Keputusan Bupati</p>
                                        </div>
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumlahperaturanbup"></h4>
                                            <p class="fs--1 text-600 mb-0">Peraturan Bupati</p>
                                        </div>
                                        <div class="col-3 border-end border-200">
                                            <h4 class="mb-0" id="lbljumlahperda"></h4>
                                            <p class="fs--1 text-600 mb-0">Peraturan Daerah</p>
                                        </div>
                                        <div class="col-3 border-200">
                                            <h4 class="mb-0" id="lbljumlahkinerjalainnya"></h4>
                                            <p class="fs--1 text-600 mb-0">Kinerja Lainnya</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3 g-3">
                    <div class="col-lg-4 ps-lg-2">
                        <div class="card bg-line-chart-gradient h-lg-100">
                            <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                <div class="col light">
                                    <p class="fs--1 fw-semi-bold">Grafik Keputusan Bupati</p>
                                </div>
                                <div class="chart h-100" id="hitungChartKepBup" data-echart-responsive="true">
                                    <canvas id="KepBupChart" height="250px"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 ps-lg-2">
                        <div class="card bg-line-chart-gradient h-lg-100">
                            <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                <div class="col light">
                                    <p class="fs--1 fw-semi-bold">Grafik Peraturan Bupati</p>
                                </div>
                                <div class="chart h-100" id="hitungChartPerBup" data-echart-responsive="true">
                                    <canvas id="PerBupChart" height="250px"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 ps-lg-2">
                        <div class="card bg-line-chart-gradient h-lg-100">
                            <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                <div class="col light">
                                    <p class="fs--1 fw-semi-bold">Grafik Peraturan Daerah</p>
                                </div>
                                <div class="chart h-100" id="hitungChartPerda" data-echart-responsive="true">
                                    <canvas id="PerdaChart" height="250px"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3 g-3">
                    <div class="col-lg-12 ps-lg-2">
                        <div class="card bg-line-chart-gradient h-lg-100">
                            <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                                <div class="col light">
                                    <p class="fs--1 fw-semi-bold">Grafik Data Kinerja Lainnya</p>
                                </div>
                                <div class="chart h-100" id="hitungKinerjaLainnyaChart" data-echart-responsive="true">
                                    <canvas id="KinerjaLainnyaChart" height="250px"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </main>
 
    <script src="../vendors/bootstrap/bootstrap.min.js"></script>
    <script src="../vendors/anchorjs/anchor.min.js"></script>

    <script src="../vendors/fontawesome/all.min.js"></script>
    <script src="../vendors/lodash/lodash.min.js"></script>

    <script src="../vendors/jquery/jquery.min.js"></script>

    <script src="../assets/js/theme.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>

    <script src="dashboard.js"></script>

    <script type="text/javascript" charset="utf-8">
        $(document).ready(function() {

            setTimeout(function() {
                document.body.style.cursor = "default";
                $("#area-halaman").fadeIn();

                $("#txttransketerangan").val("kota");
               
                isiDataStatistik();
                grafikKeputusanBupati();grafikPeraturanBupati();grafikPeraturanDaerah();
                grafikKinerja();

                $("#lblhalaman").val("dashboard");
                $("#loading").fadeOut("slow");
            }, 1000);
        });
    </script>

</body>

</html>