<?php
//error_reporting(0);
session_start();
if(isset($_SESSION['IDOPERATOR'])){
    $iduser=$_SESSION['IDOPERATOR'];
	$username=$_SESSION['USERNAME'];
    $nmoperator=$_SESSION['NMOPERATOR'];
	$akses=$_SESSION['AKSES'];
    $idinstansi=$_SESSION['IDINSTANSI'];
}else{
	header('location:../login.html');
}

require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

include "../services/tgl_indo.php";
date_default_timezone_set('Asia/Jakarta');
$tanggal = tgl_indo(date('Y-m-d'));
$tglserver = date('Y-m-d');

$tglpic = date('d-m-Y');
$tglpic2 = date('d-m-Y', strtotime('+1 days', strtotime($tglpic))); 

$editor=$iduser;

if ($akses == "operator"){$disoperator = "display:none";}

$qricbg = ("SELECT nm_instansi,kota FROM m_instansi WHERE id_instansi='".$idinstansi."'");
$dbcabang = mysqli_query($dbconn,$qricbg);$c= mysqli_fetch_assoc($dbcabang);
$nmcabang = ucwords(strtolower($c['nm_instansi']));$nmkotains = ucwords(strtolower($c['kota']));
mysqli_free_result($dbcabang);//mysqli_close($dbconn);
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

    <title>JBigdata | Administrator</title>

    <link href="favicon.png" rel="icon" />
    <link href="favicon.png" rel="apple-touch-icon" />
    <link rel="manifest" href="../assets/img/favicons/manifest.json">
    <meta name="msapplication-TileImage" content="../assets/img/favicons/mstile-150x150.png">
    <meta name="theme-color" content="#ffffff">
    <script src="../assets/js/config.js"></script>
    <script src="../vendors/overlayscrollbars/OverlayScrollbars.min.js"></script>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap"
        rel="stylesheet">
    <link href="../vendors/overlayscrollbars/OverlayScrollbars.min.css" rel="stylesheet">
    <link href="../vendors/flatpickr/flatpickr.min.css" rel="stylesheet" />
    <link href="../assets/lib/select2/select2.min.css" rel="stylesheet">
    <link href="../assets/lib/select2-theme/select2-bootstrap4.min.css" rel="stylesheet">
    <link href="../vendors/select2-bootstrap4-theme/select2-bootstrap4.min.css" rel="stylesheet">

    <link href="../vendors/datatables-bs4/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-responsive-bs4/responsive.bootstrap4.css" rel="stylesheet">
    <link href="../assets/css/style_layanan.css" rel="stylesheet" id="style-default">

    <link href="../assets/css/theme.min.css" rel="stylesheet" id="style-default">

    <style type="text/css">
    #loading {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: url(assets/img/loading.gif) 50% 50% no-repeat #ede9df;
        background-color: #222;
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

        <input type="text" id="txtTransDashboardJadwal" value="<?php echo $tglserver;?>" readonly="readonly" />
    </div>

    <main class="main" id="top">
        <div class="container-fluid" data-layout="container">
            <nav class="navbar navbar-light navbar-vertical navbar-expand-xl">
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
                                class="text-primary fw-bold mb-0">JBigdata</span></div>
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
                    <div class="navbar-vertical-content scrollbar">
                        <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                            <li class="nav-item">

                                <a class="nav-link" href="#!" role="button" data-bs-toggle="collapse"
                                    aria-expanded="false" id="cmdDashboard">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-chart-pie"></span></span><span
                                            class="nav-link-text ps-1">Dashboard</span>
                                    </div>
                                </a>

                                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                                    <div class="col-auto navbar-vertical-label">Data Master
                                    </div>
                                    <div class="col ps-0">
                                        <hr class="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>

                                <a class="nav-link" href="#!" role="button" data-bs-toggle="collapse"
                                    aria-expanded="false" id="cmdInstansiPengguna">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-home"></span></span><span
                                            class="nav-link-text ps-1">Instansi</span>
                                    </div>
                                </a>

                                <a class="nav-link" href="#!" role="button" data-bs-toggle="" aria-expanded="false"
                                    id="cmdMasterOPD">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-layer-group"></span></span><span
                                            class="nav-link-text ps-1">OPD</span>
                                    </div>
                                </a>

                                <a class="nav-link" href="#!" role="button" data-bs-toggle="" aria-expanded="false"
                                    id="cmdMasterOperator">
                                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span
                                                class="fas fa-user-friends"></span></span><span
                                            class="nav-link-text ps-1">Operator</span>
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
                        <div class="d-flex align-items-center"><img class="me-2" src="favicon.png" alt=""
                                width="40" /><span class="font-sans-serif">JBigdata</span>
                        </div>
                    </a>

                    <ul class="navbar-nav align-items-center d-none d-lg-block">
                        <li class="nav-item">
                            <div class="search-box" data-list='{"valueNames":["title"]}'>
                                <form class="position-relative" data-bs-toggle="search" data-bs-display="static">
                                    <input class="form-control search-input fuzzy-search" type="search"
                                        placeholder="Search..." aria-label="Search" />
                                    <span class="fas fa-search search-box-icon"></span>

                                </form>
                                <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none"
                                    data-bs-dismiss="search">
                                    <div class="btn-close-falcon" aria-label="Close"></div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
                        <li class="nav-item d-none d-sm-block">
                            <a class="nav-link" href="#" id="cmdGantiPassword" data-bs-toggle="tooltip"
                                data-bs-placement="left" title="Ganti password" style="display:none"><span
                                    class="fas fa-lock" data-fa-transform="shrink-7"
                                    style="font-size: 32px;"></span></a>
                        </li>
                        <li class="nav-item d-none d-sm-block">
                            <a class="nav-link" href="logout.html" data-bs-toggle="tooltip" data-bs-placement="left"
                                title="Keluar aplikasi"><span class="fas fa-power-off" data-fa-transform="shrink-7"
                                    style="font-size: 32px;"></span></a>
                        </li>
                    </ul>
                </nav>

                <div id="area-halaman">
                    <?php         
                        include "dashboard.php";
                        include "master.php";
                    ?>
                </div>
                <!--halaman-->

            </div>
            <!--content-->

        </div>
        <!--container-fluid-->

        <?php
          include "modal.php";
        ?>

    </main>

    <script src="../vendors/popper/popper.min.js"></script>
    <script src="../vendors/bootstrap/bootstrap.min.js"></script>
    <script src="../vendors/anchorjs/anchor.min.js"></script>
    <script src="../vendors/is/is.min.js"></script>

    <script src="../vendors/echarts/echarts.min.js"></script>
    <script src="../vendors/fontawesome/all.min.js"></script>
    <script src="../vendors/lodash/lodash.min.js"></script>

    <script src="../vendors/jquery/jquery.min.js"></script>
    <script src="../vendors/jquery/socket.io-1.2.0.js"></script>

    <script src="../assets/lib/select2/select2.min.js"></script>

    <script src="../vendors/datatables/js/jquery.dataTables.min.js"></script>
    <script src="../vendors/datatables-bs4/dataTables.bootstrap4.min.js"></script>
    <script src="../vendors/datatables.net-responsive/dataTables.responsive.js"></script>
    <script src="../vendors/datatables.net-responsive-bs4/responsive.bootstrap4.js"></script>

    <script src="../assets/js/flatpickr.js"></script>
    <script src="../assets/js/theme.js"></script>
    <script src="master.js"></script>

    <script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        CariTglDashboard();
        awalTglJadwal();
        setTimeout(function() {
            document.body.style.cursor = "default";
            bersihkan();
            $("#area-halaman").fadeIn();
            //isiMasterPengunjung();
            $("#area-dashboard").fadeIn();
            $("#area-kop-dashboard").fadeIn();
            $("#lblhalaman").val("dashboard");
            $("#loading").fadeOut("slow");
        }, 1000);
    });
    </script>

</body>

</html>