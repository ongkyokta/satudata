<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$iddesa= trim($_POST['idarea']);

$data = array();
$sqlx = ("SELECT SUM(asrama_siswa_baik) AS asramaBaik,SUM(asrama_siswa_rusak_ringan) AS asramaRingan,SUM(asrama_siswa_rusak_sedang) AS asramaSedang,SUM(asrama_siswa_rusak_berat) AS asramaBerat,
SUM(asrama_siswa_baik + asrama_siswa_rusak_ringan + asrama_siswa_rusak_sedang + asrama_siswa_rusak_berat) AS jmlasrama,
SUM(tempat_ibadah_baik) AS ibadahBaik,SUM(tempat_ibadah_rusak_ringan) AS ibadahRingan,SUM(tempat_ibadah_rusak_sedang) AS ibadahSedang,SUM(tempat_ibadah_rusak_berat) AS ibadahBerat,
SUM(tempat_ibadah_baik + tempat_ibadah_rusak_ringan + tempat_ibadah_rusak_sedang + tempat_ibadah_rusak_berat) AS jmlibadah, 
SUM(wc_guru_baik) AS wcguruBaik,SUM(wc_guru_rusak_ringan) AS wcguruRingan,SUM(wc_guru_rusak_sedang) AS wcguruSedang,SUM(wc_guru_rusak_berat) AS wcguruBerat,
SUM(wc_guru_baik + wc_guru_rusak_ringan + wc_guru_rusak_sedang + wc_guru_rusak_berat) AS jmlwcguru, 
SUM(wc_siswa_baik) AS wcsiswaBaik,SUM(wc_siswa_rusak_ringan) AS wcsiswaRingan,SUM(wc_siswa_rusak_sedang) AS wcsiswaSedang,SUM(wc_siswa_rusak_berat) AS wwcsiswaBerat,
SUM(wc_siswa_baik + wc_siswa_rusak_ringan + wc_siswa_rusak_sedang + wc_siswa_rusak_berat) AS jmlwcsiswa, 
SUM(wc_umum_baik) AS wcumumBaik,SUM(wc_umum_rusak_ringan) AS wcumumRingan,SUM(wc_umum_rusak_sedang) AS wcumumSedang,SUM(wc_umum_rusak_berat) AS wcumumBerat,
SUM(wc_umum_baik + wc_umum_rusak_ringan + wc_umum_rusak_sedang + wc_umum_rusak_berat) AS jmlwcumum, 
SUM(laboratorium_bahasa_baik) AS labbahasaBaik,SUM(laboratorium_bahasa_rusak_ringan) AS labbahasaRingan,SUM(laboratorium_bahasa_rusak_sedang) AS labbahasaSedang,SUM(laboratorium_bahasa_rusak_berat) AS labbahasaBerat,
SUM(laboratorium_bahasa_baik + laboratorium_bahasa_rusak_ringan + laboratorium_bahasa_rusak_sedang + laboratorium_bahasa_rusak_berat) AS jmllabbahasa, 
SUM(laboratorium_ipa_baik) AS labipaBaik,SUM(laboratorium_ipa_rusak_ringan) AS labipaRingan,SUM(laboratorium_ipa_rusak_sedang) AS labipaSedang,SUM(laboratorium_ipa_rusak_berat) AS labipaBerat,
SUM(laboratorium_ipa_baik + laboratorium_ipa_rusak_ringan + laboratorium_ipa_rusak_sedang + laboratorium_ipa_rusak_berat) AS jmllabipa, 
SUM(laboratorium_ips_baik) AS labipsBaik,SUM(laboratorium_ips_rusak_ringan) AS labipsRingan,SUM(laboratorium_ips_rusak_sedang) AS labipsSedang,SUM(laboratorium_ips_rusak_berat) AS labipsBerat,
SUM(laboratorium_ips_baik + laboratorium_ips_rusak_ringan + laboratorium_ips_rusak_sedang + laboratorium_ips_rusak_berat) AS jmllabips,
SUM(laboratorium_komputer_baik) AS komputerBaik,SUM(laboratorium_komputer_rusak_ringan) AS komputerRingan,SUM(laboratorium_komputer_rusak_sedang) AS komputerSedang,SUM(laboratorium_komputer_rusak_berat) AS komputerBerat,
SUM(laboratorium_komputer_baik + laboratorium_komputer_rusak_ringan + laboratorium_komputer_rusak_sedang + laboratorium_komputer_rusak_berat) AS jmllabkomputer,
SUM(laboratorium_multimedia_baik) AS multimediaBaik,SUM(laboratorium_multimedia_rusak_ringan) AS multimediaRingan,SUM(laboratorium_multimedia_rusak_sedang) AS multimediaSedang,SUM(laboratorium_multimedia_rusak_berat) AS multimediaBerat,
SUM(laboratorium_multimedia_baik + laboratorium_multimedia_rusak_ringan + laboratorium_multimedia_rusak_sedang + laboratorium_multimedia_rusak_berat) AS jmllabmultimedia,
SUM(ruang_bina_baik) AS ruangbinaBaik,SUM(ruang_bina_rusak_ringan) AS ruangbinaRingan,SUM(ruang_bina_rusak_sedang) AS ruangbinaSedang,SUM(ruang_bina_rusak_berat) AS ruangbinaBerat,
SUM(ruang_bina_baik + ruang_bina_rusak_ringan + ruang_bina_rusak_sedang + ruang_bina_rusak_berat) AS jmlruangbina,
SUM(ruang_guru_baik) AS ruangguruBaik,SUM(ruang_guru_rusak_ringan) AS ruangguruRingan,SUM(ruang_guru_rusak_sedang) AS ruangguruSedang,SUM(ruang_guru_rusak_berat) AS ruangguruBerat,
SUM(ruang_guru_baik + ruang_guru_rusak_ringan + ruang_guru_rusak_sedang + ruang_guru_rusak_berat) AS jmlruangguru,
SUM(ruang_kepala_sekolah_baik) AS kepsekBaik,SUM(ruang_kepala_sekolah_rusak_ringan) AS kepsekRingan,SUM(ruang_kepala_sekolah_rusak_sedang) AS kepsekSedang,SUM(ruang_kepala_sekolah_rusak_berat) AS kepsekBerat,
SUM(ruang_kepala_sekolah_baik + ruang_kepala_sekolah_rusak_ringan + ruang_kepala_sekolah_rusak_sedang + ruang_kepala_sekolah_rusak_berat) AS jmlruangkepsek,
SUM(ruang_perpustakaan_baik) AS perpustakaanBaik,SUM(ruang_perpustakaan_rusak_ringan) AS perpustakaankRingan,SUM(ruang_perpustakaan_rusak_sedang) AS perpustakaanSedang,SUM(ruang_perpustakaan_rusak_berat) AS perpustakaanBerat,
SUM(ruang_perpustakaan_baik + ruang_perpustakaan_rusak_ringan + ruang_perpustakaan_rusak_sedang + ruang_perpustakaan_rusak_berat) AS jmlruangperpustakaan,
SUM(ruang_kelas_baik) AS kelasBaik,SUM(ruang_kelas_rusak_ringan) AS kelasRingan,SUM(ruang_kelas_rusak_sedang) AS kelasSedang,SUM(ruang_kelas_rusak_berat) AS kelasBerat,
SUM(ruang_kelas_baik + ruang_kelas_rusak_ringan + ruang_kelas_rusak_sedang + ruang_kelas_rusak_berat) AS jmlruangkelas,
COUNT(id) AS jumSekolah,
COUNT(IF(asrama_siswa_rusak_ringan=0 AND asrama_siswa_rusak_sedang=0 AND asrama_siswa_rusak_berat=0
		AND tempat_ibadah_rusak_ringan=0 AND tempat_ibadah_rusak_sedang=0 AND tempat_ibadah_rusak_berat=0
		AND wc_guru_rusak_ringan=0 AND wc_guru_rusak_sedang=0 AND wc_guru_rusak_berat=0
		AND wc_siswa_rusak_ringan=0 AND wc_siswa_rusak_sedang=0 AND wc_siswa_rusak_berat=0
		AND wc_umum_rusak_ringan=0 AND wc_umum_rusak_sedang=0 AND wc_umum_rusak_berat=0
		AND laboratorium_bahasa_rusak_ringan=0 AND laboratorium_bahasa_rusak_sedang=0 AND laboratorium_bahasa_rusak_berat=0
		AND laboratorium_ipa_rusak_ringan=0 AND laboratorium_ipa_rusak_sedang=0 AND laboratorium_ipa_rusak_berat=0
		AND laboratorium_ips_rusak_ringan=0 AND laboratorium_ips_rusak_sedang=0 AND laboratorium_ips_rusak_berat=0
		AND laboratorium_komputer_rusak_ringan=0 AND laboratorium_komputer_rusak_sedang=0 AND laboratorium_komputer_rusak_berat=0
		AND laboratorium_multimedia_rusak_ringan=0 AND laboratorium_multimedia_rusak_sedang=0 AND laboratorium_multimedia_rusak_berat=0
		AND ruang_bina_rusak_ringan=0 AND ruang_bina_rusak_sedang=0 AND ruang_bina_rusak_berat=0
		AND ruang_guru_rusak_ringan=0 AND ruang_guru_rusak_sedang=0 AND ruang_guru_rusak_berat=0
		AND ruang_kepala_sekolah_rusak_ringan=0 AND ruang_kepala_sekolah_rusak_sedang=0 AND ruang_kepala_sekolah_rusak_berat=0
		AND ruang_perpustakaan_rusak_ringan=0 AND ruang_perpustakaan_rusak_sedang=0 AND ruang_perpustakaan_rusak_berat=0
		AND ruang_kelas_rusak_ringan=0 AND ruang_kelas_rusak_sedang=0 AND ruang_kelas_rusak_berat=0,id,null)) AS jumTotSekolahBaik,
COUNT(IF(asrama_siswa_rusak_ringan>0
		OR tempat_ibadah_rusak_ringan>0
		OR wc_guru_rusak_ringan>0
		OR wc_siswa_rusak_ringan>0
		OR wc_umum_rusak_ringan>0
		OR laboratorium_bahasa_rusak_ringan>0
		OR laboratorium_ipa_rusak_ringan>0
		OR laboratorium_ips_rusak_ringan>0
		OR laboratorium_komputer_rusak_ringan>0
		OR laboratorium_multimedia_rusak_ringan>0
		OR ruang_bina_rusak_ringan>0
		OR ruang_guru_rusak_ringan>0
		OR ruang_kepala_sekolah_rusak_ringan>0
		OR ruang_perpustakaan_rusak_ringan>0
		OR ruang_kelas_rusak_ringan>0,id,null)) AS jumTotSekolahRingan,
COUNT(IF(asrama_siswa_rusak_sedang>0
		OR tempat_ibadah_rusak_sedang>0
		OR wc_guru_rusak_sedang>0
		OR wc_siswa_rusak_sedang>0
		OR wc_umum_rusak_sedang>0
		OR laboratorium_bahasa_rusak_sedang>0
		OR laboratorium_ipa_rusak_sedang>0
		OR laboratorium_ips_rusak_sedang>0
		OR laboratorium_komputer_rusak_sedang>0
		OR laboratorium_multimedia_rusak_sedang>0
		OR ruang_bina_rusak_sedang>0
		OR ruang_guru_rusak_sedang>0
		OR ruang_kepala_sekolah_rusak_sedang>0
		OR ruang_perpustakaan_rusak_sedang>0
		OR ruang_kelas_rusak_sedang>0,id,null)) AS jumTotSekolahSedang,
COUNT(IF(asrama_siswa_rusak_berat>0
		OR tempat_ibadah_rusak_berat>0
		OR wc_guru_rusak_berat>0
		OR wc_siswa_rusak_berat>0
		OR wc_umum_rusak_berat>0
		OR laboratorium_bahasa_rusak_berat>0
		OR laboratorium_ipa_rusak_berat>0
		OR laboratorium_ips_rusak_berat>0
		OR laboratorium_komputer_rusak_berat>0
		OR laboratorium_multimedia_rusak_berat>0
		OR ruang_bina_rusak_berat>0
		OR ruang_guru_rusak_berat>0
		OR ruang_kepala_sekolah_rusak_berat>0
		OR ruang_perpustakaan_rusak_berat>0
		OR ruang_kelas_rusak_berat>0,id,null)) AS jumTotSekolahBerat
FROM tbl_api_dispendik WHERE id_desa='".$iddesa."'");

  $resultx = mysqli_query($dbconn,$sqlx);$row= mysqli_fetch_assoc($resultx);

	$row_array = array();
	$row_array['jmlasrama']=$row['jmlasrama'];
	$row_array['asramaBaik']=$row['asramaBaik'];$row_array['asramaRingan']=$row['asramaRingan'];
	$row_array['asramaSedang']=$row['asramaSedang'];$row_array['asramaBerat']=$row['asramaBerat'];

	$row_array['jmlibadah']=$row['jmlibadah'];
	$row_array['ibadahBaik']=$row['ibadahBaik'];$row_array['ibadahRingan']=$row['ibadahRingan'];
	$row_array['ibadahSedang']=$row['ibadahSedang'];$row_array['ibadahBerat']=$row['ibadahBerat'];

	$row_array['jmlwcguru']=$row['jmlwcguru'];
	$row_array['wcguruBaik']=$row['wcguruBaik'];$row_array['wcguruRingan']=$row['wcguruRingan'];
	$row_array['wcguruSedang']=$row['wcguruSedang'];$row_array['wcguruBerat']=$row['wcguruBerat'];

	$row_array['jmlwcsiswa']=$row['jmlwcsiswa'];
	$row_array['wcsiswaBaik']=$row['wcsiswaBaik'];$row_array['wcsiswaRingan']=$row['wcsiswaRingan'];
	$row_array['wcsiswaSedang']=$row['wcsiswaSedang'];$row_array['wwcsiswaBerat']=$row['wwcsiswaBerat'];

	$row_array['jmlwcumum']=$row['jmlwcumum'];
	$row_array['wcumumBaik']=$row['wcumumBaik'];$row_array['wcumumRingan']=$row['wcumumRingan'];
	$row_array['wcumumSedang']=$row['wcumumSedang'];$row_array['wcumumBerat']=$row['wcumumBerat'];

	$row_array['jmllabbahasa']=$row['jmllabbahasa'];
	$row_array['labbahasaBaik']=$row['labbahasaBaik'];$row_array['labbahasaRingan']=$row['labbahasaRingan'];
	$row_array['labbahasaSedang']=$row['labbahasaSedang'];$row_array['labbahasaBerat']=$row['labbahasaBerat'];

	$row_array['jmllabipa']=$row['jmllabipa'];
	$row_array['labipaBaik']=$row['labipaBaik'];$row_array['labipaRingan']=$row['labipaRingan'];
	$row_array['labipaSedang']=$row['labipaSedang'];$row_array['labipaBerat']=$row['labipaBerat'];

	$row_array['jmllabips']=$row['jmllabips'];
	$row_array['labipsBaik']=$row['labipsBaik'];$row_array['labipsRingan']=$row['labipsRingan'];
	$row_array['labipsSedang']=$row['labipsSedang'];$row_array['labipsBerat']=$row['labipsBerat'];

	$row_array['jmllabkomputer']=$row['jmllabkomputer'];
	$row_array['komputerBaik']=$row['komputerBaik'];$row_array['komputerRingan']=$row['komputerRingan'];
	$row_array['komputerSedang']=$row['komputerSedang'];$row_array['komputerBerat']=$row['komputerBerat'];

	$row_array['jmllabmultimedia']=$row['jmllabmultimedia'];
	$row_array['multimediaBaik']=$row['multimediaBaik'];$row_array['multimediaRingan']=$row['multimediaRingan'];
	$row_array['multimediaSedang']=$row['multimediaSedang'];$row_array['multimediaBerat']=$row['multimediaBerat'];

	$row_array['jmlruangbina']=$row['jmlruangbina'];
	$row_array['ruangbinaBaik']=$row['ruangbinaBaik'];$row_array['ruangbinaRingan']=$row['ruangbinaRingan'];
	$row_array['ruangbinaSedang']=$row['ruangbinaSedang'];$row_array['ruangbinaBerat']=$row['ruangbinaBerat'];

	$row_array['jmlruangguru']=$row['jmlruangguru'];
	$row_array['ruangguruBaik']=$row['ruangguruBaik'];$row_array['ruangguruRingan']=$row['ruangguruRingan'];
	$row_array['ruangguruSedang']=$row['ruangguruSedang'];$row_array['ruangguruBerat']=$row['ruangguruBerat'];

	$row_array['jmlruangkepsek']=$row['jmlruangkepsek'];
	$row_array['kepsekBaik']=$row['kepsekBaik'];$row_array['kepsekRingan']=$row['kepsekRingan'];
	$row_array['kepsekSedang']=$row['kepsekSedang'];$row_array['kepsekBerat']=$row['kepsekBerat'];

	$row_array['jmlruangperpustakaan']=$row['jmlruangperpustakaan'];
	$row_array['perpustakaanBaik']=$row['perpustakaanBaik'];$row_array['perpustakaankRingan']=$row['perpustakaankRingan'];
	$row_array['perpustakaanSedang']=$row['perpustakaanSedang'];$row_array['perpustakaanBerat']=$row['perpustakaanBerat'];
	
	$row_array['jmlruangkelas']=$row['jmlruangkelas'];
	$row_array['kelasBaik']=$row['kelasBaik'];$row_array['kelasRingan']=$row['kelasRingan'];
	$row_array['kelasSedang']=$row['kelasSedang'];$row_array['kelasBerat']=$row['kelasBerat'];

	$row_array['jumTotSekolah']=$row['jumSekolah'];
	$row_array['jumTotRuangan']=$row['jmlruangkelas'] + $row['jmlruangperpustakaan'] + $row['jmlruangkepsek'] + $row['jmlruangguru'] + $row['jmlruangbina'] + $row['jmllabmultimedia'] + $row['jmllabkomputer'] + $row['jmllabips'] + $row['jmllabipa'] + $row['jmllabbahasa'] + $row['jmlwcumum'] + $row['jmlwcsiswa'] + $row['jmlwcguru'] + $row['jmlibadah'] + $row['jmlasrama'];

	$row_array['jumTotBaik']=$row['asramaBaik'] + $row['ibadahBaik'] + $row['wcguruBaik'] + $row['wcsiswaBaik'] + $row['wcumumBaik'] + $row['labbahasaBaik'] + $row['labipaBaik'] + $row['labipsBaik'] + $row['komputerBaik'] + $row['multimediaBaik'] + $row['ruangbinaBaik'] + $row['ruangguruBaik'] + $row['kepsekBaik'] + $row['perpustakaanBaik'] + $row['kelasBaik'];
	$row_array['jumTotRingan']=$row['asramaRingan'] + $row['ibadahRingan'] + $row['wcguruRingan'] + $row['wcsiswaRingan'] + $row['wcumumRingan'] + $row['labbahasaRingan'] + $row['labipaRingan'] + $row['labipsRingan'] + $row['komputerRingan'] + $row['multimediaRingan'] + $row['ruangbinaRingan'] + $row['ruangguruRingan'] + $row['kepsekRingan'] + $row['perpustakaankRingan'] + $row['kelasRingan'];
	$row_array['jumTotSedang']=$row['asramaSedang'] + $row['ibadahSedang'] + $row['wcguruSedang'] + $row['wcsiswaSedang'] + $row['wcumumSedang'] + $row['labbahasaSedang'] + $row['labipaSedang'] + $row['labipsSedang'] + $row['komputerSedang'] + $row['multimediaSedang'] + $row['ruangbinaSedang'] + $row['ruangguruSedang'] + $row['kepsekSedang'] + $row['perpustakaanSedang'] + $row['kelasSedang'];
	$row_array['jumTotBerat']=$row['asramaBerat'] + $row['ibadahBerat'] + $row['wcguruBerat'] + $row['wwcsiswaBerat'] + $row['wcumumBerat'] + $row['labbahasaBerat'] + $row['labipaBerat'] + $row['labipsBerat'] + $row['komputerBerat'] + $row['multimediaBerat'] + $row['ruangbinaBerat'] + $row['ruangguruBerat'] + $row['kepsekBerat'] + $row['perpustakaanBerat'] + $row['kelasBerat'];

	$row_array['jumTotSekolahBaik']=$row['jumTotSekolahBaik'];
	$row_array['jumTotSekolahRingan']=$row['jumTotSekolahRingan'];
	$row_array['jumTotSekolahSedang']=$row['jumTotSekolahSedang'];
	$row_array['jumTotSekolahBerat']=$row['jumTotSekolahBerat'];
	
	array_push($data,$row_array);

  echo json_encode($data);
  $resultx->close();
  $dbconn->close();
?>