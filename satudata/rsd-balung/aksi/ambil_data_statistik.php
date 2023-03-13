<?php
//error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$tahun = "2022";//trim($_POST['tahun']);

$data = array();
$sqlx = ("SELECT SUM(p.dokter_umum) AS jmldr_umum,
                 SUM(p.dokter_spesialis) AS jmldr_spesialis,
                 SUM(p.dokter_gigi) AS jmldr_gigi,
                 SUM(p.bidan) AS jmlbidan,
                 SUM(p.perawat) AS jmlperawat,
                 SUM(p.apoteker) AS jmlapoteker,
                 SUM(p.promkes) AS jmlpromkes,
                 SUM(p.epidemiologi_kesehatan) AS jmlepi_kesehatan,
                 SUM(p.administrasi_kesehatan) AS jmladm_kesehatan,
                 SUM(p.tenaga_sanitarian) AS jmlsanitaria,
                 SUM(p.tenaga_gizi) AS jmlgizi,
                 SUM(p.analis_kesehatan) AS jmlanalis,   
                 SUM(p.tenaga_pendukung) AS jmlpendukung,

                 SUM(p.sop) as jumsop,
                  SUM(p.jml_ambulan) as jumambulan,
                  SUM(p.psc) as jumpsc,
                  SUM(p.pkm_rawat_inap_poned) as jumponed,
                  SUM(p.sistem_informasi_kesehatan) as jumsimkes,
                  SUM(p.pembangunan_pemutakhiran_data) as jumpemutakhiran,
                  SUM(p.polindes_ponkesdes) as jumpolindes,
                  SUM(p.pkm_pembantu) as jumpkm_pembantu,
                  SUM(p.fasilitas_poskestren) as jumposkestren,

                  SUM(p.jml_rawat_jalan) as jumrwtjalan,
                  SUM(p.jml_rawat_inap) as jumrwtinap,
                  SUM(p.rujukan_rs_kab_kota) as jumrujukan,
                  SUM(p.pengolahan_limbah) as jumlimbah,
                  SUM(p.penggunaan_aplikasi) as jumaplikasi

          FROM rsd_balung p WHERE p.tahun='".$tahun."'");
$resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

	$row_array = array();
  $row_array['jmlnakes']=$row['jmldr_umum']+$row['jmldr_spesialis']+$row['jmldr_gigi']+
                         $row['jmlbidan']+$row['jmlperawat']+$row['jmlpromkes']+
                         $row['jmlapoteker']+$row['jmlepi_kesehatan']+
                         $row['jmladm_kesehatan']+$row['jmlsanitaria']+$row['jmlgizi']+
                         $row['jmlanalis']+$row['jmlpendukung'];
  
  $row_array['jmlsarana']=$row['jumsop']+$row['jumambulan']+$row['jumpsc']+
                         $row['jumponed']+$row['jumsimkes']+$row['jumpemutakhiran']+
                         $row['jumpolindes']+$row['jumpkm_pembantu']+$row['jumposkestren'];
                         
 $row_array['jmlurusan']=$row['jumrwtjalan']+$row['jumrwtinap']+$row['jumrujukan']+
                         $row['jumlimbah']+$row['jumaplikasi'];
                         
	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>