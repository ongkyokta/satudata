<?php
error_reporting(0);
$jsondata = file_get_contents('hasilapi.json');
$array = json_decode($jsondata, true); 

$jmlasrama = 0;$asramaBaik = 0;$asramaRingan = 0;$asramaSedang = 0;$asramaBerat = 0;
$jmlibadah = 0;$ibadahBaik = 0;$ibadahRingan = 0;$ibadahSedang = 0;$ibadahBerat = 0;
$jmlwcguru = 0;$wcguruBaik = 0;$wcguruRingan = 0;$wcguruSedang = 0;$wcguruBerat = 0;
$jmlwcsiswa = 0;$wcsiswaBaik = 0;$wcsiswaRingan = 0;$wcsiswaSedang = 0;$wwcsiswaBerat = 0;
$jmlwcumum = 0;$wcumumBaik = 0;$wcumumRingan = 0;$wcumumSedang = 0;$wcumumBerat = 0;
$jmllabbahasa = 0;$labbahasaBaik = 0;$labbahasaRingan = 0;$labbahasaSedang = 0;$labbahasaBerat = 0;
$jmllabipa = 0;$labipaBaik = 0;$labipaRingan = 0;$labipaSedang = 0;$labipaBerat = 0;
$jmllabips = 0;$labipsBaik = 0;$labipsRingan = 0;$labipsSedang = 0;$labipsBerat = 0;
$jmllabkomputer = 0;$komputerBaik = 0;$komputerRingan = 0;$komputerSedang = 0;$komputerBerat = 0;
$jmllabmultimedia = 0;$multimediaBaik = 0;$multimediaRingan = 0;$multimediaSedang = 0;$multimediaBerat = 0;
$jmlruangbina = 0;$ruangbinaBaik = 0;$ruangbinaRingan = 0;$ruangbinaSedang = 0;$ruangbinaBerat = 0;
$jmlruangguru = 0;$ruangguruBaik = 0;$ruangguruRingan = 0;$ruangguruSedang = 0;$ruangguruBerat = 0;
$jmlruangkepsek = 0;$kepsekBaik = 0;$kepsekRingan = 0;$kepsekSedang = 0;$kepsekBerat = 0;
$jmlruangperpustakaan = 0;$perpustakaanBaik = 0;$perpustakaankRingan = 0;$perpustakaanSedang = 0;$perpustakaanBerat = 0;
$jmlruangkelas = 0;$kelasBaik = 0;$kelasRingan = 0;$kelasSedang = 0;$kelasBerat = 0;

$data = array();
foreach($array as $row) {
          
  $jmlasrama = $jmlasrama + $row['asrama_siswa_baik'] + $row['asrama_siswa_rusak_ringan'] + $row['asrama_siswa_rusak_sedang'] + $row['asrama_siswa_rusak_berat'];
  $asramaBaik = $asramaBaik + $row['asrama_siswa_baik'];
  $asramaRingan = $asramaRingan + $row['asrama_siswa_rusak_ringan'];
  $asramaSedang = $asramaSedang + $row['asrama_siswa_rusak_sedang'];
  $asramaBerat = $asramaBerat + $row['asrama_siswa_rusak_berat'];

  $jmlibadah = $jmlibadah +  $row['tempat_ibadah_baik'] + $row['tempat_ibadah_rusak_ringan'] + $row['tempat_ibadah_rusak_sedang'] + $row['tempat_ibadah_rusak_berat'];
  $ibadahBaik = $ibadahBaik + $row['tempat_ibadah_baik'];
  $ibadahRingan = $ibadahRingan + $row['tempat_ibadah_rusak_ringan'];
  $ibadahSedang = $ibadahSedang + $row['tempat_ibadah_rusak_sedang'];
  $ibadahBerat = $ibadahBerat + $row['tempat_ibadah_rusak_berat'];

  $jmlwcguru = $jmlwcguru +  $row['wc_guru_baik'] + $row['wc_guru_rusak_ringan'] + $row['wc_guru_rusak_sedang'] + $row['wc_guru_rusak_berat'];
  $wcguruBaik = $wcguruBaik + $row['wc_guru_baik'];
  $wcguruRingan = $wcguruRingan + $row['wc_guru_rusak_ringan'];
  $wcguruSedang = $wcguruSedang + $row['wc_guru_rusak_sedang'];
  $wcguruBerat = $wcguruBerat + $row['wc_guru_rusak_berat'];

  $jmlwcsiswa = $jmlwcsiswa +  $row['wc_siswa_baik'] + $row['wc_siswa_rusak_ringan'] + $row['wc_siswa_rusak_sedang'] + $row['wc_siswa_rusak_berat'];
  $wcsiswaBaik = $wcsiswaBaik + $row['wc_siswa_baik'];
  $wcsiswaRingan = $wcsiswaRingan + $row['wc_siswa_rusak_ringan'];
  $wcsiswaSedang = $wcsiswaSedang + $row['wc_siswa_rusak_sedang'];
  $wwcsiswaBerat = $wwcsiswaBerat + $row['wc_siswa_rusak_berat'];
 
  $jmlwcumum = $jmlwcumum +  $row['wc_umum_baik'] + $row['wc_umum_rusak_ringan'] + $row['wc_umum_rusak_sedang'] + $row['wc_umum_rusak_berat'];
  $wcumumBaik = $wcumumBaik + $row['wc_umum_baik'];
  $wcumumRingan = $wcumumRingan + $row['wc_umum_rusak_ringan'];
  $wcumumSedang = $wcumumSedang + $row['wc_umum_rusak_sedang'];
  $wcumumBerat = $wcumumBerat + $row['wc_umum_rusak_berat'];

  $jmllabbahasa = $jmllabbahasa +  $row['laboratorium_bahasa_baik'] + $row['laboratorium_bahasa_rusak_ringan'] + $row['laboratorium_bahasa_rusak_sedang'] + $row['laboratorium_bahasa_rusak_berat'];
  $labbahasaBaik = $labbahasaBaik + $row['laboratorium_bahasa_baik'];
  $labbahasaRingan = $labbahasaRingan + $row['laboratorium_bahasa_rusak_ringan'];
  $labbahasaSedang = $labbahasaSedang + $row['laboratorium_bahasa_rusak_sedang'];
  $labbahasaBerat = $labbahasaBerat + $row['laboratorium_bahasa_rusak_berat'];

  $jmllabipa = $jmllabipa +  $row['laboratorium_ipa_baik'] + $row['laboratorium_ipa_rusak_ringan'] + $row['laboratorium_ipa_rusak_sedang'] + $row['laboratorium_ipa_rusak_berat'];
  $labipaBaik = $labipaBaik + $row['laboratorium_ipa_baik'];
  $labipaRingan = $labipaRingan + $row['laboratorium_ipa_rusak_ringan'];
  $labipaSedang = $labipaSedang + $row['laboratorium_ipa_rusak_sedang'];
  $labipaBerat = $labipaBerat + $row['laboratorium_ipa_rusak_berat'];
 
  $jmllabips = $jmllabips +  $row['laboratorium_ips_baik'] + $row['laboratorium_ips_rusak_ringan'] + $row['laboratorium_ips_rusak_sedang'] + $row['laboratorium_ips_rusak_berat'];
  $labipsBaik = $labipsBaik + $row['laboratorium_ips_baik'];
  $labipsRingan = $labipsRingan + $row['laboratorium_ips_rusak_ringan'];
  $labipsSedang = $labipsSedang + $row['laboratorium_ips_rusak_sedang'];
  $labipsBerat = $labipsBerat + $row['laboratorium_ips_rusak_berat'];
 
  $jmllabkomputer = $jmllabkomputer +  $row['laboratorium_komputer_baik'] + $row['laboratorium_komputer_rusak_ringan'] + $row['laboratorium_komputer_rusak_sedang'] + $row['laboratorium_komputer_rusak_berat'];
  $komputerBaik = $komputerBaik + $row['laboratorium_komputer_baik'];
  $komputerRingan = $komputerRingan + $row['laboratorium_komputer_rusak_ringan'];
  $komputerSedang = $komputerSedang + $row['laboratorium_komputer_rusak_sedang'];
  $komputerBerat = $komputerBerat + $row['laboratorium_komputer_rusak_berat'];

  $jmllabmultimedia = $jmllabmultimedia +  $row['laboratorium_multimedia_baik'] + $row['laboratorium_multimedia_rusak_ringan'] + $row['laboratorium_multimedia_rusak_sedang'] + $row['laboratorium_multimedia_rusak_berat'];
  $multimediaBaik = $multimediaBaik + $row['laboratorium_multimedia_baik'];
  $multimediaRingan = $multimediaRingan + $row['laboratorium_multimedia_rusak_ringan'];
  $multimediaSedang = $multimediaSedang + $row['laboratorium_multimedia_rusak_sedang'];
  $multimediaBerat = $multimediaBerat + $row['laboratorium_multimedia_rusak_berat'];

  $jmlruangbina = $jmlruangbina +  $row['ruang_bina_baik'] + $row['ruang_bina_rusak_ringan'] + $row['ruang_bina_rusak_sedang'] + $row['ruang_bina_rusak_berat'];
  $ruangbinaBaik = $ruangbinaBaik + $row['ruang_bina_baik'];
  $ruangbinaRingan = $ruangbinaRingan + $row['ruang_bina_rusak_ringan'];
  $ruangbinaSedang = $ruangbinaSedang + $row['ruang_bina_rusak_sedang'];
  $ruangbinaBerat = $ruangbinaBerat + $row['ruang_bina_rusak_berat'];
 
  $jmlruangguru = $jmlruangguru +  $row['ruang_guru_baik'] + $row['ruang_guru_rusak_ringan'] + $row['ruang_guru_rusak_sedang'] + $row['ruang_guru_rusak_berat'];
  $ruangguruBaik = $ruangguruBaik + $row['ruang_guru_baik'];
  $ruangguruRingan = $ruangguruRingan + $row['ruang_guru_rusak_ringan'];
  $ruangguruSedang = $ruangguruSedang + $row['ruang_guru_rusak_sedang'];
  $ruangguruBerat = $ruangguruBerat + $row['ruang_guru_rusak_berat'];
 
  $jmlruangkepsek = $jmlruangkepsek +  $row['ruang_kepala_sekolah_baik'] + $row['ruang_kepala_sekolah_rusak_ringan'] + $row['ruang_kepala_sekolah_rusak_sedang'] + $row['ruang_kepala_sekolah_rusak_berat'];
  $kepsekBaik = $kepsekBaik + $row['ruang_kepala_sekolah_baik'];
  $kepsekRingan = $kepsekRingan + $row['ruang_kepala_sekolah_rusak_ringan'];
  $kepsekSedang = $kepsekSedang + $row['ruang_kepala_sekolah_rusak_sedang'];
  $kepsekBerat = $kepsekBerat + $row['ruang_kepala_sekolah_rusak_berat'];

  $jmlruangperpustakaan = $jmlruangperpustakaan +  $row['ruang_perpustakaan_baik'] + $row['ruang_perpustakaan_rusak_ringan'] + $row['ruang_perpustakaan_rusak_sedang'] + $row['ruang_perpustakaan_rusak_berat'];
  $perpustakaanBaik = $perpustakaanBaik + $row['ruang_perpustakaan_baik'];
  $perpustakaankRingan = $perpustakaankRingan + $row['ruang_perpustakaan_rusak_ringan'];
  $perpustakaanSedang = $perpustakaanSedang + $row['ruang_perpustakaan_rusak_sedang'];
  $perpustakaanBerat = $perpustakaanBerat + $row['ruang_perpustakaan_rusak_berat'];
 
  $jmlruangkelas = $jmlruangkelas +  $row['ruang_kelas_baik'] + $row['ruang_kelas_rusak_ringan'] + $row['ruang_kelas_rusak_sedang'] + $row['ruang_kelas_rusak_berat'];
  $kelasBaik = $kelasBaik + $row['ruang_kelas_baik'];
  $kelasRingan = $kelasRingan + $row['ruang_kelas_rusak_ringan'];
  $kelasSedang = $kelasSedang + $row['ruang_kelas_rusak_sedang'];
  $kelasBerat = $kelasBerat + $row['ruang_kelas_rusak_berat'];

	$row_array = array();
	$row_array['jmlasrama']=$jmlasrama;
	$row_array['asramaBaik']=$asramaBaik;$row_array['asramaRingan']=$asramaRingan;
	$row_array['asramaSedang']=$asramaSedang;$row_array['asramaBerat']=$asramaBerat;

	$row_array['jmlibadah']=$jmlibadah;
	$row_array['ibadahBaik']=$ibadahBaik;$row_array['ibadahRingan']=$ibadahRingan;
	$row_array['ibadahSedang']=$ibadahSedang;$row_array['ibadahBerat']=$ibadahBerat;

	$row_array['jmlwcguru']=$jmlwcguru;
	$row_array['wcguruBaik']=$wcguruBaik;$row_array['wcguruRingan']=$wcguruRingan;
	$row_array['wcguruSedang']=$wcguruSedang;$row_array['wcguruBerat']=$wcguruBerat;

	$row_array['jmlwcsiswa']=$jmlwcsiswa;
	$row_array['wcsiswaBaik']=$wcsiswaBaik;$row_array['wcsiswaRingan']=$wcsiswaRingan;
	$row_array['wcsiswaSedang']=$wcsiswaSedang;$row_array['wwcsiswaBerat']=$wwcsiswaBerat;

	$row_array['jmlwcumum']=$jmlwcumum;
	$row_array['wcumumBaik']=$wcumumBaik;$row_array['wcumumRingan']=$wcumumRingan;
	$row_array['wcumumSedang']=$wcumumSedang;$row_array['wcumumBerat']=$wcumumBerat;

	$row_array['jmllabbahasa']=$jmllabbahasa;
	$row_array['labbahasaBaik']=$labbahasaBaik;$row_array['labbahasaRingan']=$labbahasaRingan;
	$row_array['labbahasaSedang']=$labbahasaSedang;$row_array['labbahasaBerat']=$labbahasaBerat;

	$row_array['jmllabipa']=$jmllabipa;
	$row_array['labipaBaik']=$labipaBaik;$row_array['labipaRingan']=$labipaRingan;
	$row_array['labipaSedang']=$labipaSedang;$row_array['labipaBerat']=$labipaBerat;

	$row_array['jmllabips']=$jmllabips;
	$row_array['labipsBaik']=$labipsBaik;$row_array['labipsRingan']=$labipsRingan;
	$row_array['labipsSedang']=$labipsSedang;$row_array['labipsBerat']=$labipsBerat;

	$row_array['jmllabkomputer']=$jmllabkomputer;
	$row_array['komputerBaik']=$komputerBaik;$row_array['komputerRingan']=$komputerRingan;
	$row_array['komputerSedang']=$komputerSedang;$row_array['komputerBerat']=$komputerBerat;

	$row_array['jmllabmultimedia']=$jmllabmultimedia;
	$row_array['multimediaBaik']=$multimediaBaik;$row_array['multimediaRingan']=$multimediaRingan;
	$row_array['multimediaSedang']=$multimediaSedang;$row_array['multimediaBerat']=$multimediaBerat;

	$row_array['jmlruangbina']=$jmlruangbina;
	$row_array['ruangbinaBaik']=$ruangbinaBaik;$row_array['ruangbinaRingan']=$ruangbinaRingan;
	$row_array['ruangbinaSedang']=$ruangbinaSedang;$row_array['ruangbinaBerat']=$ruangbinaBerat;

	$row_array['jmlruangguru']=$jmlruangguru;
	$row_array['ruangguruBaik']=$ruangguruBaik;$row_array['ruangguruRingan']=$ruangguruRingan;
	$row_array['ruangguruSedang']=$ruangguruSedang;$row_array['ruangguruBerat']=$ruangguruBerat;

	$row_array['jmlruangkepsek']=$jmlruangkepsek;
	$row_array['kepsekBaik']=$kepsekBaik;$row_array['kepsekRingan']=$kepsekRingan;
	$row_array['kepsekSedang']=$kepsekSedang;$row_array['kepsekBerat']=$kepsekBerat;

	$row_array['jmlruangperpustakaan']=$jmlruangperpustakaan;
	$row_array['perpustakaanBaik']=$perpustakaanBaik;$row_array['perpustakaankRingan']=$perpustakaankRingan;
	$row_array['perpustakaanSedang']=$perpustakaanSedang;$row_array['perpustakaanBerat']=$perpustakaanBerat;
	
	$row_array['jmlruangkelas']=$jmlruangkelas;
	$row_array['kelasBaik']=$kelasBaik;$row_array['kelasRingan']=$kelasRingan;
	$row_array['kelasSedang']=$kelasSedang;$row_array['kelasBerat']=$kelasBerat;

	array_push($data,$row_array);
}
echo json_encode($data);
?>  
