<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idsekolah= trim($_POST['idsekolah']);

$sqlx = ("SELECT * FROM tbl_api_dispendik WHERE id='".$idsekolah."'");
$result = mysqli_query($dbconn,$sqlx);$sm= mysqli_fetch_assoc($result);

$nmsekolah = $sm['nama'];$koordinat = $sm['lintang'].",".$sm['bujur'];
$alamat = $sm['alamat_jalan'];$desa = $sm['desa_kelurahan'];$kecamatan = $sm['kecamatan'];
$bentukpendidikan = $sm['bentuk_pendidikan'];
$guru = $sm['guru']; $siswa = $sm['siswa'];
$statussekolah = $sm['status_sekolah'];$akreditasi = $sm['akreditasi'];

$jml_ruang_kelas = $sm['jml_ruang_kelas'];$ruang_kelas_baik = $sm['ruang_kelas_baik'];$ruang_kelas_rusak_ringan = $sm['ruang_kelas_rusak_ringan'];
$ruang_kelas_rusak_sedang = $sm['ruang_kelas_rusak_sedang'];$ruang_kelas_rusak_berat = $sm['ruang_kelas_rusak_berat'];

$jml_ruang_perpustakaan = $sm['jml_ruang_perpustakaan'];$ruang_perpustakaan_baik = $sm['ruang_perpustakaan_baik'];$ruang_perpustakaan_rusak_ringan = $sm['ruang_perpustakaan_rusak_ringan'];
$ruang_perpustakaan_rusak_sedang = $sm['ruang_perpustakaan_rusak_sedang'];$ruang_perpustakaan_rusak_berat = $sm['ruang_perpustakaan_rusak_berat'];

$jml_ruang_kepala_sekolah = $sm['jml_ruang_kepala_sekolah'];$ruang_kepala_sekolah_baik = $sm['ruang_kepala_sekolah_baik'];$ruang_kepala_sekolah_rusak_ringan = $sm['ruang_kepala_sekolah_rusak_ringan'];
$ruang_kepala_sekolah_rusak_sedang = $sm['ruang_kepala_sekolah_rusak_sedang'];$ruang_kepala_sekolah_rusak_berat = $sm['ruang_kepala_sekolah_rusak_berat'];

$jml_ruang_guru = $sm['jml_ruang_guru'];$ruang_guru_baik = $sm['ruang_guru_baik'];$ruang_guru_rusak_ringan = $sm['ruang_guru_rusak_ringan'];
$ruang_guru_rusak_sedang = $sm['ruang_guru_rusak_sedang'];$ruang_guru_rusak_berat = $sm['ruang_guru_rusak_berat'];

$jml_ruang_bina = $sm['jml_ruang_bina'];$ruang_bina_baik = $sm['ruang_bina_baik'];$ruang_bina_rusak_ringan = $sm['ruang_bina_rusak_ringan'];
$ruang_bina_rusak_sedang = $sm['ruang_bina_rusak_sedang'];$ruang_bina_rusak_berat = $sm['ruang_bina_rusak_berat'];

$jml_lab_multimedia = $sm['jml_lab_multimedia'];$laboratorium_multimedia_baik = $sm['laboratorium_multimedia_baik'];$laboratorium_multimedia_rusak_ringan = $sm['laboratorium_multimedia_rusak_ringan'];
$laboratorium_multimedia_rusak_sedang = $sm['laboratorium_multimedia_rusak_sedang'];$laboratorium_multimedia_rusak_berat = $sm['laboratorium_multimedia_rusak_berat'];

$jml_lab_komputer = $sm['jml_lab_komputer'];$laboratorium_komputer_baik = $sm['laboratorium_komputer_baik'];$laboratorium_komputer_rusak_ringan = $sm['laboratorium_komputer_rusak_ringan'];
$laboratorium_komputer_rusak_sedang = $sm['laboratorium_komputer_rusak_sedang'];$laboratorium_komputer_rusak_berat = $sm['laboratorium_komputer_rusak_berat'];

$jml_lab_ips = $sm['jml_lab_ips'];$laboratorium_ips_baik = $sm['laboratorium_ips_baik'];$laboratorium_ips_rusak_ringan = $sm['laboratorium_ips_rusak_ringan'];
$laboratorium_ips_rusak_sedang = $sm['laboratorium_ips_rusak_sedang'];$laboratorium_ips_rusak_berat = $sm['laboratorium_ips_rusak_berat'];

$jml_lab_ipa = $sm['jml_lab_ipa'];$laboratorium_ipa_baik = $sm['laboratorium_ipa_baik'];$laboratorium_ipa_rusak_ringan = $sm['laboratorium_ipa_rusak_ringan'];
$laboratorium_ipa_rusak_sedang = $sm['laboratorium_ipa_rusak_sedang'];$laboratorium_ipa_rusak_berat = $sm['laboratorium_ipa_rusak_berat'];

$jml_lab_bahasa = $sm['jml_lab_bahasa'];$laboratorium_bahasa_baik = $sm['laboratorium_bahasa_baik'];$laboratorium_bahasa_rusak_ringan = $sm['laboratorium_bahasa_rusak_ringan'];
$laboratorium_bahasa_rusak_sedang = $sm['laboratorium_bahasa_rusak_sedang'];$laboratorium_bahasa_rusak_berat = $sm['laboratorium_bahasa_rusak_berat'];

$jml_wc_umum = $sm['jml_wc_umum'];$wc_umum_baik = $sm['wc_umum_baik'];$wc_umum_rusak_ringan = $sm['wc_umum_rusak_ringan'];
$wc_umum_rusak_sedang = $sm['wc_umum_rusak_sedang'];$wc_umum_rusak_berat = $sm['wc_umum_rusak_berat'];

$jml_wc_siswa = $sm['jml_wc_siswa'];$wc_siswa_baik = $sm['wc_siswa_baik'];$wc_siswa_rusak_ringan = $sm['wc_siswa_rusak_ringan'];
$wc_siswa_rusak_sedang = $sm['wc_siswa_rusak_sedang'];$wc_siswa_rusak_berat = $sm['wc_siswa_rusak_berat'];

$jml_wc_guru = $sm['jml_wc_guru'];$wc_guru_baik = $sm['wc_guru_baik'];$wc_guru_rusak_ringan = $sm['wc_guru_rusak_ringan'];
$wc_guru_rusak_sedang = $sm['wc_guru_rusak_sedang'];$wc_guru_rusak_berat = $sm['wc_guru_rusak_berat'];

$jml_tempat_ibadah = $sm['jml_tempat_ibadah'];$tempat_ibadah_baik = $sm['tempat_ibadah_baik'];$tempat_ibadah_rusak_ringan = $sm['tempat_ibadah_rusak_ringan'];
$tempat_ibadah_rusak_sedang = $sm['tempat_ibadah_rusak_sedang'];$tempat_ibadah_rusak_berat = $sm['tempat_ibadah_rusak_berat'];

$jml_asrama = $sm['jml_asrama'];$asrama_siswa_baik = $sm['asrama_siswa_baik'];$asrama_siswa_rusak_ringan = $sm['asrama_siswa_rusak_ringan'];
$asrama_siswa_rusak_sedang = $sm['asrama_siswa_rusak_sedang'];$asrama_siswa_rusak_berat = $sm['asrama_siswa_rusak_berat'];

mysqli_free_result($result);
mysqli_close($dbconn);
?>
<!------------------MODAL PENCARIAN ------------------>
<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
    <div class="position-relative z-index-1 light">
        <h5 class="mb-0 text-white">Data Sekolah</h5>
        <p class="fs--1 mb-0 text-white">Tabel detail data sekolah</p>
    </div>
    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
        aria-label="Close"></button>
</div>
<div class="modal-body py-3">

    <div class="col-xxl-12 col-lg-12">
        <div class="card h-100 mb-3">
            <div class="card-body py-0"> 
                <table class="table table-borderless fs--1 mt-3 mb-0">
                    <tr class="border-bottom">
                        <th class="ps-0 pt-0"><?php echo $nmsekolah ?>
                            <div class="text-800 fw-normal fs--2"><?php echo $alamat ?> - <?php echo $desa ?> - <?php echo $kecamatan ?><br><span class="text-success"><?php echo $koordinat ?></span></div>
                        </th>
                        <th class="pe-0 text-end pt-0"></th>
                    </tr>
                    <tr class="border-bottom">
                        <th class="ps-0">Bentuk Pendidikan</th>
                        <th class="pe-0 text-end"><?php echo $bentukpendidikan ?></th>
                    </tr>
                    <tr class="border-bottom">
                        <th class="ps-0">Jumlah Guru / Siswa</th>
                        <th class="pe-0 text-end"><?php echo $guru ?> / <?php echo $siswa ?></th>
                    </tr>
                    <tr>
                        <th class="ps-0">Status Sekolah / Akreditasi</th>
                        <th class="pe-0 text-end"><?php echo $statussekolah ?> / <?php echo $akreditasi ?></th>
                    </tr>
                </table>
            </div>
        </div>

        <div class="card h-100">
            <div class="card-header d-flex flex-between-center">
                <h6 class="mb-0">Kondisi Sarana dan Ruang Sekolah</h6>
            </div>
            <div class="card-body px-0 py-0"> 
            <div class="table-responsive scrollbar">
                    <table class="table fs--1 mb-0 overflow-hidden">
                      <thead class="bg-200 text-900">
                        <tr>
                          <th class="align-middle white-space-nowrap">Ruangan</th>
                          <th class="align-middle white-space-nowrap text-center">Baik</th>
                          <th class="align-middle white-space-nowrap text-center">Rusak Ringan</th>
                          <th class="align-middle white-space-nowrap text-center">Rusak Sedang</th>
                          <th class="align-middle white-space-nowrap text-center">Rusak Berat</th>
                          <th class="align-middle white-space-nowrap text-center">Jumlah</th>
                        </tr>
                      </thead>
                      <tbody class="list">
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Ruang Kelas</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kelas_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kelas_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kelas_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kelas_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_ruang_kelas ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Ruang Perpustakaan</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_perpustakaan_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_perpustakaan_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_perpustakaan_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_perpustakaan_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_ruang_perpustakaan ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Ruang Kepala Sekolah</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kepala_sekolah_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kepala_sekolah_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kepala_sekolah_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_kepala_sekolah_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_ruang_kepala_sekolah ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Ruang Guru</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_guru_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_guru_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_guru_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_guru_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_ruang_guru ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Ruang Bina</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_bina_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_bina_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_bina_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $ruang_bina_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_ruang_bina ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Laboratorium Multimedia</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_multimedia_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_multimedia_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_multimedia_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_multimedia_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_lab_multimedia ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Laboratorium Komputer</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_komputer_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_komputer_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_komputer_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_komputer_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_lab_komputer ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Laboratorium IPS</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ips_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ips_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ips_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ips_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_lab_ips ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Laboratorium IPA</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ipa_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ipa_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ipa_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_ipa_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_lab_ipa ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Laboratorium Bahasa</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_bahasa_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_bahasa_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_bahasa_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $laboratorium_bahasa_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_lab_bahasa ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">WC Umum</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_umum_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_umum_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_umum_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_umum_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_wc_umum ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">WC Guru</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_guru_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_guru_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_guru_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_guru_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_wc_guru ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">WC Siswa</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_siswa_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_siswa_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_siswa_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $wc_siswa_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_wc_siswa ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Tempat Ibadah</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $tempat_ibadah_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $tempat_ibadah_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $tempat_ibadah_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $tempat_ibadah_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_tempat_ibadah ?></b></td>
                        </tr>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle white-space-nowrap">Asrama</td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $asrama_siswa_baik ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $asrama_siswa_rusak_ringan ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $asrama_siswa_rusak_sedang ?></td>
                          <td class="align-middle white-space-nowrap text-center"><?php echo $asrama_siswa_rusak_berat ?></td>
                          <td class="align-middle white-space-nowrap text-center"><b><?php echo $jml_asrama ?></b></td>
                        </tr>
                      </tbody>
                    </table>
            </div>
        </div>

    </div>

</div>
