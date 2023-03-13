<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$sql = "CREATE TABLE tbl_api_dispendik2 (
  id BIGINT(30) AUTO_INCREMENT NULL PRIMARY KEY,
  nama VARCHAR(100) NULL,
  siswa INT(5) NULL,guru INT(5) NULL,
  bentuk_pendidikan VARCHAR(25) NULL,
  alamat_jalan TEXT NULL,
  rt VARCHAR(25) NULL, rw VARCHAR(25) NULL,
  nama_dusun VARCHAR(100) NULL,
  desa_kelurahan VARCHAR(100) NULL,kecamatan VARCHAR(100) NULL,
  lintang VARCHAR(100) NULL,bujur VARCHAR(100) NULL,
  status_sekolah VARCHAR(50) NULL,
  akreditasi VARCHAR(25) NULL,
  jml_asrama INT(5) NULL,
  asrama_siswa_baik INT(5) NULL,asrama_siswa_rusak_ringan INT(5) NULL,asrama_siswa_rusak_sedang INT(5) NULL,asrama_siswa_rusak_berat INT(5) NULL,
  jml_tempat_ibadah INT(5) NULL,
  tempat_ibadah_baik INT(5) NULL,tempat_ibadah_rusak_ringan INT(5) NULL,tempat_ibadah_rusak_sedang INT(5) NULL,tempat_ibadah_rusak_berat INT(5) NULL,
  jml_wc_guru INT(5) NULL,
  wc_guru_baik INT(5) NULL,wc_guru_rusak_ringan INT(5) NULL,wc_guru_rusak_sedang INT(5) NULL,wc_guru_rusak_berat INT(5) NULL,
  jml_wc_siswa INT(5) NULL,
  wc_siswa_baik INT(5) NULL,wc_siswa_rusak_ringan INT(5) NULL,wc_siswa_rusak_sedang INT(5) NULL,wc_siswa_rusak_berat INT(5) NULL,
  jml_wc_umum INT(5) NULL,
  wc_umum_baik INT(5) NULL,wc_umum_rusak_ringan INT(5) NULL,wc_umum_rusak_sedang INT(5) NULL,wc_umum_rusak_berat INT(5) NULL,
  jml_lab_bahasa INT(5) NULL,
  laboratorium_bahasa_baik INT(5) NULL,laboratorium_bahasa_rusak_ringan INT(5) NULL,laboratorium_bahasa_rusak_sedang INT(5) NULL,laboratorium_bahasa_rusak_berat INT(5) NULL,
  jml_lab_ipa INT(5) NULL,
  laboratorium_ipa_baik INT(5) NULL,laboratorium_ipa_rusak_ringan INT(5) NULL,laboratorium_ipa_rusak_sedang INT(5) NULL,laboratorium_ipa_rusak_berat INT(5) NULL,
  jml_lab_ips INT(5) NULL,
  laboratorium_ips_baik INT(5) NULL,laboratorium_ips_rusak_ringan INT(5) NULL,laboratorium_ips_rusak_sedang INT(5) NULL,laboratorium_ips_rusak_berat INT(5) NULL,
  jml_lab_komputer INT(5) NULL,
  laboratorium_komputer_baik INT(5) NULL,laboratorium_komputer_rusak_ringan INT(5) NULL,laboratorium_komputer_rusak_sedang INT(5) NULL,laboratorium_komputer_rusak_berat INT(5) NULL,
  jml_lab_multimedia INT(5) NULL,
  laboratorium_multimedia_baik INT(5) NULL,laboratorium_multimedia_rusak_ringan INT(5) NULL,laboratorium_multimedia_rusak_sedang INT(5) NULL,laboratorium_multimedia_rusak_berat INT(5) NULL,
  jml_ruang_bina INT(5) NULL,
  ruang_bina_baik INT(5) NULL,ruang_bina_rusak_ringan INT(5) NULL,ruang_bina_rusak_sedang INT(5) NULL,ruang_bina_rusak_berat INT(5) NULL,
  jml_ruang_guru INT(5) NULL,
  ruang_guru_baik INT(5) NULL,ruang_guru_rusak_ringan INT(5) NULL,ruang_guru_rusak_sedang INT(5) NULL,ruang_guru_rusak_berat INT(5) NULL,
  jml_ruang_kepala_sekolah INT(5) NULL,
  ruang_kepala_sekolah_baik INT(5) NULL,ruang_kepala_sekolah_rusak_ringan INT(5) NULL,ruang_kepala_sekolah_rusak_sedang INT(5) NULL,ruang_kepala_sekolah_rusak_berat INT(5) NULL,
  jml_ruang_perpustakaan INT(5) NULL,
  ruang_perpustakaan_baik INT(5) NULL,ruang_perpustakaan_rusak_ringan INT(5) NULL,ruang_perpustakaan_rusak_sedang INT(5) NULL,ruang_perpustakaan_rusak_berat INT(5) NULL,
  jml_ruang_kelas INT(5) NULL,
  ruang_kelas_baik INT(5) NULL,ruang_kelas_rusak_ringan INT(5) NULL,ruang_kelas_rusak_sedang INT(5) NULL,ruang_kelas_rusak_berat INT(5) NULL,
  id_kecamatan BIGINT(10) NULL,id_desa BIGINT(10) NULL
  )";
  
  if ($dbconn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
  } else {
    echo "Error creating table: " . $dbconn->error;
  }

?>