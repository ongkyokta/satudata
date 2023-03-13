<?php
error_reporting(0);
require_once '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: ');

function anti_injection($data){
    global $dbconn;
    $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
    return $filter;
  }

  $password = md5("operator");

//$qri="TRUNCATE TABLE tbl_api_sinkron";	
//$resqri=mysqli_query($dbconn,$qri);

$jsondata = file_get_contents('dispendik.json');
$array = json_decode($jsondata,true);
$no = 0;
foreach($array as $row) {
  $no++;  
  $jmlasrama = $row['asrama_siswa_baik'] + $row['asrama_siswa_rusak_ringan'] + $row['asrama_siswa_rusak_sedang'] + $row['asrama_siswa_rusak_berat'];
  $jmltempatibadah = $row['tempat_ibadah_baik'] + $row['tempat_ibadah_rusak_ringan'] + $row['tempat_ibadah_rusak_sedang'] + $row['tempat_ibadah_rusak_berat'];
  
  $jmlwcguru = $row['wc_guru_baik'] + $row['wc_guru_rusak_ringan'] + $row['wc_guru_rusak_sedang'] + $row['wc_guru_rusak_berat'];
  $jmlwcsiswa = $row['wc_siswa_baik'] + $row['wc_siswa_rusak_ringan'] + $row['wc_siswa_rusak_sedang'] + $row['wc_siswa_rusak_berat'];
  $jmlwcumum = $row['wc_umum_baik'] + $row['wc_umum_rusak_ringan'] + $row['wc_umum_rusak_sedang'] + $row['wc_umum_rusak_berat'];
 
  $jmllabbahasa = $row['laboratorium_bahasa_baik'] + $row['laboratorium_bahasa_rusak_ringan'] + $row['laboratorium_bahasa_rusak_sedang'] + $row['laboratorium_bahasa_rusak_berat'];
  $jmllabipa = $row['laboratorium_ipa_baik'] + $row['laboratorium_ipa_rusak_ringan'] + $row['laboratorium_ipa_rusak_sedang'] + $row['laboratorium_ipa_rusak_berat'];
  $jmllabips = $row['laboratorium_ips_baik'] + $row['laboratorium_ips_rusak_ringan'] + $row['laboratorium_ips_rusak_sedang'] + $row['laboratorium_ips_rusak_berat'];
  $jmllabkomputer = $row['laboratorium_komputer_baik'] + $row['laboratorium_komputer_rusak_ringan'] + $row['laboratorium_komputer_rusak_sedang'] + $row['laboratorium_komputer_rusak_berat'];
  $jmllabmultimedia = $row['laboratorium_multimedia_baik'] + $row['laboratorium_multimedia_rusak_ringan'] + $row['laboratorium_multimedia_rusak_sedang'] + $row['laboratorium_multimedia_rusak_berat'];
  
  $jmlruangbina = $row['ruang_bina_baik'] + $row['ruang_bina_rusak_ringan'] + $row['ruang_bina_rusak_sedang'] + $row['ruang_bina_rusak_berat'];
  $jmlruangguru = $row['ruang_guru_baik'] + $row['ruang_guru_rusak_ringan'] + $row['ruang_guru_rusak_sedang'] + $row['ruang_guru_rusak_berat'];
  $jmlruangkepalasekolah = $row['ruang_kepala_sekolah_baik'] + $row['ruang_kepala_sekolah_rusak_ringan'] + $row['ruang_kepala_sekolah_rusak_sedang'] + $row['ruang_kepala_sekolah_rusak_berat'];
  $jmlruangperpustakaan = $row['ruang_perpustakaan_baik'] + $row['ruang_perpustakaan_rusak_ringan'] + $row['ruang_perpustakaan_rusak_sedang'] + $row['ruang_perpustakaan_rusak_berat'];
  $jmlruangkelas = $row['ruang_kelas_baik'] + $row['ruang_kelas_rusak_ringan'] + $row['ruang_kelas_rusak_sedang'] + $row['ruang_kelas_rusak_berat'];

          $sqlx = ("SELECT COUNT(id) AS jumKetemu FROM tbl_api_dispendik WHERE npsn = '". $row['npsn']."'");
          $result = mysqli_query($dbconn,$sqlx);$b = mysqli_fetch_assoc($result);
          
          if ($b['jumKetemu'] <= 0){
           

              $sql2  = "INSERT INTO tbl_api_dispendik (npsn,nama,siswa,guru,bentuk_pendidikan,alamat_jalan,rt,rw,nama_dusun,
                  desa_kelurahan,kecamatan,lintang,bujur,status_sekolah,akreditasi,
                  jml_asrama,asrama_siswa_baik,asrama_siswa_rusak_ringan,asrama_siswa_rusak_sedang,asrama_siswa_rusak_berat,
                  jml_tempat_ibadah,tempat_ibadah_baik,tempat_ibadah_rusak_ringan,tempat_ibadah_rusak_sedang,tempat_ibadah_rusak_berat,
                  jml_wc_guru,wc_guru_baik,wc_guru_rusak_ringan,wc_guru_rusak_sedang,wc_guru_rusak_berat,
                  jml_wc_siswa,wc_siswa_baik,wc_siswa_rusak_ringan,wc_siswa_rusak_sedang,wc_siswa_rusak_berat,
                  jml_wc_umum,wc_umum_baik,wc_umum_rusak_ringan,wc_umum_rusak_sedang,wc_umum_rusak_berat,
                  jml_lab_bahasa,laboratorium_bahasa_baik,laboratorium_bahasa_rusak_ringan,laboratorium_bahasa_rusak_sedang,laboratorium_bahasa_rusak_berat,
                  jml_lab_ipa,laboratorium_ipa_baik,laboratorium_ipa_rusak_ringan,laboratorium_ipa_rusak_sedang,laboratorium_ipa_rusak_berat,
                  jml_lab_ips,laboratorium_ips_baik,laboratorium_ips_rusak_ringan,laboratorium_ips_rusak_sedang,laboratorium_ips_rusak_berat,
                  jml_lab_komputer,laboratorium_komputer_baik,laboratorium_komputer_rusak_ringan,laboratorium_komputer_rusak_sedang,laboratorium_komputer_rusak_berat,
                  jml_lab_multimedia,laboratorium_multimedia_baik,laboratorium_multimedia_rusak_ringan,laboratorium_multimedia_rusak_sedang,laboratorium_multimedia_rusak_berat,
                  jml_ruang_bina,ruang_bina_baik,ruang_bina_rusak_ringan,ruang_bina_rusak_sedang,ruang_bina_rusak_berat,
                  jml_ruang_guru,ruang_guru_baik,ruang_guru_rusak_ringan,ruang_guru_rusak_sedang,ruang_guru_rusak_berat,
                  jml_ruang_kepala_sekolah,ruang_kepala_sekolah_baik,ruang_kepala_sekolah_rusak_ringan,ruang_kepala_sekolah_rusak_sedang,ruang_kepala_sekolah_rusak_berat,
                  jml_ruang_perpustakaan,ruang_perpustakaan_baik,ruang_perpustakaan_rusak_ringan,ruang_perpustakaan_rusak_sedang,ruang_perpustakaan_rusak_berat,
                  jml_ruang_kelas,ruang_kelas_baik,ruang_kelas_rusak_ringan,ruang_kelas_rusak_sedang,ruang_kelas_rusak_berat) 
                  VALUES ('".$row['npsn']."','".anti_injection($row['nama'])."','".$row['siswa']."','".$row['guru']."','".$row['bentuk_pendidikan']."','".anti_injection($row['alamat_jalan'])."'
                  ,'".$row['rt']."','".$row['rw']."','".anti_injection($row['nama_dusun'])."'
                  ,'".$row['desa_kelurahan']."','".$row['kecamatan']."','".$row['lintang']."','".$row['bujur']."'
                  ,'".$row['status_sekolah']."','".$row['akreditasi']."',
                  '".$jmlasrama."',
                  '".$row['asrama_siswa_baik']."','".$row['asrama_siswa_rusak_ringan']."','".$row['asrama_siswa_rusak_sedang']."','".$row['asrama_siswa_rusak_berat']."',
                  '".$jmltempatibadah."',
                  '".$row['tempat_ibadah_baik']."','".$row['tempat_ibadah_rusak_ringan']."','".$row['tempat_ibadah_rusak_sedang']."','".$row['tempat_ibadah_rusak_berat']."',   
                  '".$jmlwcguru."',
                  '".$row['wc_guru_baik']."','".$row['wc_guru_rusak_ringan']."','".$row['wc_guru_rusak_sedang']."','".$row['wc_guru_rusak_berat']."',
                  '".$jmlwcsiswa."',
                  '".$row['wc_siswa_baik']."','".$row['wc_siswa_rusak_ringan']."','".$row['wc_siswa_rusak_sedang']."','".$row['wc_siswa_rusak_berat']."',
                  '".$jmlwcumum."',
                  '".$row['wc_umum_baik']."','".$row['wc_umum_rusak_ringan']."','".$row['wc_umum_rusak_sedang']."','".$row['wc_umum_rusak_berat']."',
                  '".$jmllabbahasa."',
                  '".$row['laboratorium_bahasa_baik']."','".$row['laboratorium_bahasa_rusak_ringan']."','".$row['laboratorium_bahasa_rusak_sedang']."','".$row['laboratorium_bahasa_rusak_berat']."',
                  '".$jmllabipa."',
                  '".$row['laboratorium_ipa_baik']."','".$row['laboratorium_ipa_rusak_ringan']."','".$row['laboratorium_ipa_rusak_sedang']."','".$row['laboratorium_ipa_rusak_berat']."',
                  '".$jmllabips."',
                  '".$row['laboratorium_ips_baik']."','".$row['laboratorium_ips_rusak_ringan']."','".$row['laboratorium_ips_rusak_sedang']."','".$row['laboratorium_ips_rusak_berat']."',
                  '".$jmllabkomputer."',
                  '".$row['laboratorium_komputer_baik']."','".$row['laboratorium_komputer_rusak_ringan']."','".$row['laboratorium_komputer_rusak_sedang']."','".$row['laboratorium_komputer_rusak_berat']."',
                  '".$jmllabmultimedia."',
                  '".$row['laboratorium_multimedia_baik']."','".$row['laboratorium_multimedia_rusak_ringan']."','".$row['laboratorium_multimedia_rusak_sedang']."','".$row['laboratorium_multimedia_rusak_berat']."',
                  '".$jmlruangbina."',
                  '".$row['ruang_bina_baik']."','".$row['ruang_bina_rusak_ringan']."','".$row['ruang_bina_rusak_sedang']."','".$row['ruang_bina_rusak_berat']."',
                  '".$jmlruangguru."',
                  '".$row['ruang_guru_baik']."','".$row['ruang_guru_rusak_ringan']."','".$row['ruang_guru_rusak_sedang']."','".$row['ruang_guru_rusak_berat']."',
                  '".$jmlruangkepalasekolah."',
                  '".$row['ruang_kepala_sekolah_baik']."','".$row['ruang_kepala_sekolah_rusak_ringan']."','".$row['ruang_kepala_sekolah_rusak_sedang']."','".$row['ruang_kepala_sekolah_rusak_berat']."',
                  '".$jmlruangperpustakaan."',
                  '".$row['ruang_perpustakaan_baik']."','".$row['ruang_perpustakaan_rusak_ringan']."','".$row['ruang_perpustakaan_rusak_sedang']."','".$row['ruang_perpustakaan_rusak_berat']."',
                  '".$jmlruangkelas."',
                  '".$row['ruang_kelas_baik']."','".$row['ruang_kelas_rusak_ringan']."','".$row['ruang_kelas_rusak_sedang']."','".$row['ruang_kelas_rusak_berat']."')";
                  $res=mysqli_query($dbconn,$sql2);

                  $sqlX = ("SELECT MAX(id) AS idne FROM tbl_api_dispendik ORDER BY id DESC");			
	                    $resultx = mysqli_query($dbconn,$sqlX);$r= mysqli_fetch_assoc($resultx);

                  $sql3  = "INSERT INTO m_operator (nm_operator,username,password,akses,id_instansi) 
                        VALUES ('".anti_injection($row['nama'])."','".anti_injection($row['npsn'])."','$password','operator','".$r['idne']."')";
		                $res=mysqli_query($dbconn,$sql3);

                  $sql4  = "INSERT INTO tbl_media (id,npsn) VALUES ('".$r['idne']."','".anti_injection($row['npsn'])."')";
                        $res=mysqli_query($dbconn,$sql4);

                    if($res){
                        $npsnnya = "";
                    }else{
                        $npsnnya.=$row['npsn']."<br>";
                    }
          }
}

    $data = array('msg1'=>$no,'msg2'=>$npsnnya);
                echo json_encode($data);
                
                mysqli_free_result($res);
                mysqli_close($dbconn);
