function sinkronJson(){
	$.ajax({
	  type:"GET",
	  url : "aksi/ambil_api_sekolah_json.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
      console.log(data)
      if(data.msg2 == 'OK'){
        sinkronTabel();     
      }	else {
        $("#loading").fadeOut("slow");
        alert("Sinkronisasi data gagal, ulangi lagi\n"+data.msg2);
        document.body.style.cursor = "default";	
      }				
	  },
	  error: function() {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";					
	  },
	});	
	
  }
    
  function sinkronTabel(){
    $.ajax({
      type:"POST",
      url : "aksi/ambil_api_sekolah.php",
      dataType : 'json',
      beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
      },
      success:function(data){
        console.log(data)
        if(data.msg2 == 'ok'){
          sinkronKecamatan();           
        }	else {
          $("#loading").fadeOut("slow");
          alert("Sinkronisasi data tabel gagal, ulangi lagi");
          document.body.style.cursor = "default";	
        }	
      },
      error: function() {
        $("#loading").fadeOut("slow");
        alert("Koneksi bermasalah periksa internet");
        document.body.style.cursor = "default";					
      },
    });	    
  }

  function sinkronKecamatan(){
    $.ajax({
      type:"POST",
      url : "aksi/aksi_sinkron_area.php",
      dataType : 'json',
      beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
      },
      success:function(data){
        console.log(data)
        if(data.msg2 == 'ok'){     
          sinkronDesa();     
        }	else {
          $("#loading").fadeOut("slow");
          alert("Sinkronisasi data kecamatan, ulangi lagi");
          document.body.style.cursor = "default";	
        }				
      },
      error: function() {
        $("#loading").fadeOut("slow");
        alert("Koneksi bermasalah periksa internet");
        document.body.style.cursor = "default";					
      },
    });	    
  }

  function sinkronDesa(){
    $.ajax({
      type:"POST",
      url : "aksi/aksi_sinkron_area_desa.php",
      dataType : 'json',
      beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
      },
      success:function(data){
        console.log(data)
        if(data.msg2 == 'ok'){     
          location.reload()       
        }	else {
          $("#loading").fadeOut("slow");
          alert("Sinkronisasi data desa gagal, ulangi lagi");
          document.body.style.cursor = "default";	
        }					
      },
      error: function() {
        $("#loading").fadeOut("slow");
        alert("Koneksi bermasalah periksa internet");
        document.body.style.cursor = "default";					
      },
    });	    
  }

    /*================ TABELDASHBOARD =================*/
    function isiDataSarana() {

      $("#lbljumsekolahSarana").html("");
      $("#lbljumruangSarana").html("");
      $("#areastatistikSarana").html("");

      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "../operator/aksi/ambil_rincian_sarana.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "../operator/aksi/ambil_rincian_sarana_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "../operator/aksi/ambil_rincian_sarana_desa.php";}
        $.ajax({
            type: "POST",
            url: Urlnya,
            data: {idarea: idarea},
            dataType: 'json',
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success: function(data) {
                document.body.style.cursor = "default";
                var i;
                var html = "";
                for (i = 0; i < data.length; i++) {

                  var jumTotSekolah = data[i].jumTotSekolah;
                 
                  var jumTotRuangan = data[i].jumTotRuangan;
                  var jumTotBaik = data[i].jumTotBaik;
                  var jumTotRingan = data[i].jumTotRingan;
                  var jumTotSedang = data[i].jumTotSedang;
                  var jumTotBerat = data[i].jumTotBerat;
                 
                  var jmlruangkelas = data[i].jmlruangkelas;var kelasBaik = data[i].kelasBaik;var kelasRingan = data[i].kelasRingan;
                  var kelasSedang = data[i].kelasSedang;var kelasBerat = data[i].kelasBerat;

                  var jmlruangperpustakaan = data[i].jmlruangperpustakaan;var perpustakaanBaik = data[i].perpustakaanBaik;var perpustakaankRingan = data[i].perpustakaankRingan;
                  var perpustakaanSedang = data[i].perpustakaanSedang;var perpustakaanBerat = data[i].perpustakaanBerat;

                  var jmlruangkepsek = data[i].jmlruangkepsek;var kepsekBaik = data[i].kepsekBaik;var kepsekRingan = data[i].kepsekRingan;
                  var kepsekSedang = data[i].kepsekSedang;var kepsekBerat = data[i].kepsekBerat;

                  var jmlruangguru = data[i].jmlruangguru;var ruangguruBaik = data[i].ruangguruBaik;var ruangguruRingan = data[i].ruangguruRingan;
                  var ruangguruSedang = data[i].ruangguruSedang;var ruangguruBerat = data[i].ruangguruBerat;

                  var jmlruangbina = data[i].jmlruangbina;var ruangbinaBaik = data[i].ruangbinaBaik;var ruangbinaRingan = data[i].ruangbinaRingan;
                  var ruangbinaSedang = data[i].ruangbinaSedang;var ruangbinaBerat = data[i].ruangbinaBerat;

                  var jmllabmultimedia = data[i].jmllabmultimedia;var multimediaBaik = data[i].multimediaBaik;var multimediaRingan = data[i].multimediaRingan;
                  var multimediaSedang = data[i].multimediaSedang;var multimediaBerat = data[i].multimediaBerat;

                  var jmllabkomputer = data[i].jmllabkomputer;var komputerBaik = data[i].komputerBaik;var komputerRingan = data[i].komputerRingan;
                  var komputerSedang = data[i].komputerSedang;var komputerBerat = data[i].komputerBerat;

                  var jmllabips = data[i].jmllabips;var labipsBaik = data[i].labipsBaik;var labipsRingan = data[i].labipsRingan;
                  var labipsSedang = data[i].labipsSedang;var labipsBerat = data[i].labipsBerat;

                  var jmllabipa = data[i].jmllabipa;var labipaBaik = data[i].labipaBaik;var labipaRingan = data[i].labipaRingan;
                  var labipaSedang = data[i].labipaSedang;var labipaBerat = data[i].labipaBerat;

                  var jmllabbahasa = data[i].jmllabbahasa;var labbahasaBaik = data[i].labbahasaBaik;var labbahasaRingan = data[i].labbahasaRingan;
                  var labbahasaSedang = data[i].labbahasaSedang;var labbahasaBerat = data[i].labbahasaBerat;

                  var jmlwcumum = data[i].jmlwcumum;var wcumumBaik = data[i].wcumumBaik;var wcumumRingan = data[i].wcumumRingan;
                  var wcumumSedang = data[i].wcumumSedang;var wcumumBerat = data[i].wcumumBerat;

                  var jmlwcsiswa = data[i].jmlwcsiswa;var wcsiswaBaik = data[i].wcsiswaBaik;var wcsiswaRingan = data[i].wcsiswaRingan;
                  var wcsiswaSedang = data[i].wcsiswaSedang;var wwcsiswaBerat = data[i].wwcsiswaBerat;

                  var jmlwcguru = data[i].jmlwcguru;var wcguruBaik = data[i].wcguruBaik;var wcguruRingan = data[i].wcguruRingan;
                  var wcguruSedang = data[i].wcguruSedang;var wcguruBerat = data[i].wcguruBerat;

                  var jmlibadah = data[i].jmlibadah;var ibadahBaik = data[i].ibadahBaik;var ibadahRingan = data[i].ibadahRingan;
                  var ibadahSedang = data[i].ibadahSedang;var ibadahBerat = data[i].ibadahBerat;

                  var jmlasrama = data[i].jmlasrama;var asramaBaik = data[i].asramaBaik;var asramaRingan = data[i].asramaRingan;
                  var asramaSedang = data[i].asramaSedang;var asramaBerat = data[i].asramaBerat;
                 
                }
               
                if (jmlruangkelas >= 1){
                  var PkelasBaik = ((kelasBaik / jmlruangkelas)*(100)).toFixed(2);
                  var PkelasRingan =  ((kelasRingan / jmlruangkelas)*(100)).toFixed(2);
                  var PkelasSedang =  ((kelasSedang / jmlruangkelas)*(100)).toFixed(2);
                  var PkelasBerat =  ((kelasBerat / jmlruangkelas)*(100)).toFixed(2);
                } else  if (jmlruangkelas == 0){
                  var PkelasBaik = 0;
                  var PkelasRingan = 0;
                  var PkelasSedang = 0;
                  var PkelasBerat = 0;
                }

                if (jmlruangperpustakaan >= 1){
                  var PperpusBaik =  ((perpustakaanBaik / jmlruangperpustakaan)*(100)).toFixed(2);
                  var PperpusRingan =  ((perpustakaankRingan / jmlruangperpustakaan)*(100)).toFixed(2);
                  var PperpusSedang =  ((perpustakaanSedang / jmlruangperpustakaan)*(100)).toFixed(2);
                  var PperpusBerat =  ((perpustakaanBerat / jmlruangperpustakaan)*(100)).toFixed(2);
                } else if (jmlruangperpustakaan == 0){
                  var PperpusBaik = 0;
                  var PperpusRingan = 0;
                  var PperpusSedang = 0;
                  var PperpusBerat = 0;
                }
                if (jmlruangkepsek >= 1){
                  var PkepsekBaik =  ((kepsekBaik / jmlruangkepsek)*(100)).toFixed(2);
                  var PkepsekRingan =  ((kepsekRingan / jmlruangkepsek)*(100)).toFixed(2);
                  var PkepsekSedang =  ((kepsekSedang / jmlruangkepsek)*(100)).toFixed(2);
                  var PkepsekBerat =  ((kepsekBerat / jmlruangkepsek)*(100)).toFixed(2);
                } else if (jmlruangkepsek == 0){
                  var PkepsekBaik = 0;
                  var PkepsekRingan = 0;
                  var PkepsekSedang = 0;
                  var PkepsekBerat = 0;
                }

                if (jmlruangguru >= 1){
                  var PguruBaik =  ((ruangguruBaik / jmlruangguru)*(100)).toFixed(2);
                  var PguruRingan =  ((ruangguruRingan / jmlruangguru)*(100)).toFixed(2);
                  var PguruSedang =  ((ruangguruSedang / jmlruangguru)*(100)).toFixed(2);
                  var PguruBerat =  ((ruangguruBerat / jmlruangguru)*(100)).toFixed(2);
                } else if (jmlruangguru == 0){
                  var PguruBaik = 0;
                  var PguruRingan = 0;
                  var PguruSedang = 0;
                  var PguruBerat = 0;
                }

                if (jmlruangbina >= 1){
                  var PbinaBaik =  ((ruangbinaBaik / jmlruangbina)*(100)).toFixed(2);
                  var PbinaRingan =  ((ruangbinaRingan / jmlruangbina)*(100)).toFixed(2);
                  var PbinaSedang =  ((ruangbinaSedang / jmlruangbina)*(100)).toFixed(2);
                  var PbinaBerat =  ((ruangbinaBerat / jmlruangbina)*(100)).toFixed(2);
                } else if (jmlruangbina == 0){
                  var PbinaBaik = 0;
                  var PbinaRingan = 0;
                  var PbinaSedang = 0;
                  var PbinaBerat = 0;
                }

                if (jmllabmultimedia >= 1){
                  var PmediaBaik =  ((multimediaBaik / jmllabmultimedia)*(100)).toFixed(2);
                  var PmediaRingan =  ((multimediaRingan / jmllabmultimedia)*(100)).toFixed(2);
                  var PmediaSedang =  ((multimediaSedang / jmllabmultimedia)*(100)).toFixed(2);
                  var PmediaBerat =  ((multimediaBerat / jmllabmultimedia)*(100)).toFixed(2);
                } else if (jmllabmultimedia == 0){
                  var PmediaBaik = 0;
                  var PmediaRingan = 0;
                  var PmediaSedang = 0;
                  var PmediaBerat = 0;
                }

                if (jmllabkomputer >= 1){
                  var PkompBaik =  ((komputerBaik / jmllabkomputer)*(100)).toFixed(2);
                  var PkompRingan =  ((komputerRingan / jmllabkomputer)*(100)).toFixed(2);
                  var PkompSedang =  ((komputerSedang / jmllabkomputer)*(100)).toFixed(2);
                  var PkompBerat =  ((komputerBerat / jmllabkomputer)*(100)).toFixed(2);
                } else if (jmllabkomputer== 0){
                  var PkompBaik = 0;
                  var PkompRingan = 0;
                  var PkompSedang = 0;
                  var PkompBerat = 0;
                }

                if (jmllabips >= 1){
                  var PipsBaik =  ((labipsBaik / jmllabips)*(100)).toFixed(2);
                  var PipsRingan =  ((labipsRingan / jmllabips)*(100)).toFixed(2);
                  var PipsSedang =  ((labipsSedang / jmllabips)*(100)).toFixed(2);
                  var PipsBerat =  ((labipsBerat / jmllabips)*(100)).toFixed(2);
                } else if (jmllabips== 0){
                  var PipsBaik = 0;
                  var PipsRingan = 0;
                  var PipsSedang = 0;
                  var PipsBerat = 0;
                }

                if (jmllabipa >= 1){
                  var PipaBaik =  ((labipaBaik / jmllabipa)*(100)).toFixed(2);
                  var PipaRingan =  ((labipaRingan / jmllabipa)*(100)).toFixed(2);
                  var PipaSedang =  ((labipaSedang / jmllabipa)*(100)).toFixed(2);
                  var PipaBerat =  ((labipaBerat / jmllabipa)*(100)).toFixed(2);
                } else if (jmllabipa== 0){
                  var PipaBaik = 0;
                  var PipaRingan = 0;
                  var PipaSedang = 0;
                  var PipaBerat = 0;
                }

                if (jmllabbahasa >= 1){
                  var PbhsBaik =  ((labbahasaBaik / jmllabbahasa)*(100)).toFixed(2);
                  var PbhsRingan =  ((labbahasaRingan / jmllabbahasa)*(100)).toFixed(2);
                  var PbhsSedang =  ((labbahasaSedang / jmllabbahasa)*(100)).toFixed(2);
                  var PbhsBerat =  ((labbahasaBerat / jmllabbahasa)*(100)).toFixed(2);
                } else if (jmllabbahasa== 0){
                  var PbhsBaik = 0;
                  var PbhsRingan = 0;
                  var PbhsSedang = 0;
                  var PbhsBerat = 0;
                }

                if (jmlwcumum >= 1){
                  var PwcuBaik =  ((wcumumBaik / jmlwcumum)*(100)).toFixed(2);
                  var PwcuRingan =  ((wcumumRingan / jmlwcumum)*(100)).toFixed(2);
                  var PwcuSedang =  ((wcumumSedang / jmlwcumum)*(100)).toFixed(2);
                  var PwcuBerat =  ((wcumumBerat / jmlwcumum)*(100)).toFixed(2);
                } else if (jmlwcumum== 0){
                  var PwcuBaik = 0;
                  var PwcuRingan = 0;
                  var PwcuSedang = 0;
                  var PwcuBerat = 0;
                }

                if (jmlwcsiswa >= 1){
                  var PwcsBaik =  ((wcsiswaBaik / jmlwcsiswa)*(100)).toFixed(2);
                  var PwcsRingan =  ((wcsiswaRingan / jmlwcsiswa)*(100)).toFixed(2);
                  var PwcsSedang =  ((wcsiswaSedang / jmlwcsiswa)*(100)).toFixed(2);
                  var PwcsBerat =  ((wwcsiswaBerat / jmlwcsiswa)*(100)).toFixed(2);
                } else if (jmlwcsiswa== 0){
                  var PwcsBaik = 0;
                  var PwcsRingan = 0;
                  var PwcsSedang = 0;
                  var PwcsBerat = 0;
                }

                if (jmlwcguru >= 1){
                  var PwcgBaik =  ((wcguruBaik / jmlwcguru)*(100)).toFixed(2);
                  var PwcgRingan =  ((wcguruRingan / jmlwcguru)*(100)).toFixed(2);
                  var PwcgSedang =  ((wcguruSedang / jmlwcguru)*(100)).toFixed(2);
                  var PwcgBerat =  ((wcguruBerat / jmlwcguru)*(100)).toFixed(2);
                } else if (jmlwcguru== 0){
                  var PwcgBaik = 0;
                  var PwcgRingan = 0;
                  var PwcgSedang = 0;
                  var PwcgBerat = 0;
                }

                if (jmlibadah >= 1){
                  var PibadahBaik =  ((ibadahBaik / jmlibadah)*(100)).toFixed(2);
                  var PibadahRingan =  ((ibadahRingan / jmlibadah)*(100)).toFixed(2);
                  var PibadahSedang =  ((ibadahSedang / jmlibadah)*(100)).toFixed(2);
                  var PibadahBerat =  ((ibadahBerat / jmlibadah)*(100)).toFixed(2);
                } else if (jmlibadah== 0){
                  var PibadahBaik = 0;
                  var PibadahRingan = 0;
                  var PibadahSedang = 0;
                  var PibadahBerat = 0;
                }

                if (jmlasrama >= 1){
                  var PasramaBaik =  ((asramaBaik / jmlasrama)*(100)).toFixed(2);
                  var PasramaRingan =  ((asramaRingan / jmlasrama)*(100)).toFixed(2);
                  var PasramaSedang =  ((asramaSedang / jmlasrama)*(100)).toFixed(2);
                  var PasramaBerat =  ((asramaBerat / jmlasrama)*(100)).toFixed(2);
                } else if (jmlasrama== 0){
                  var PasramaBaik = 0;
                  var PasramaRingan = 0;
                  var PasramaSedang = 0;
                  var PasramaBerat = 0;
                }

                if (jumTotRuangan >= 1){
                  var PruangBaik =  ((jumTotBaik / jumTotRuangan)*(100)).toFixed(2);
                  var PruangRingan =  ((jumTotRingan / jumTotRuangan)*(100)).toFixed(2);
                  var PruangSedang =  ((jumTotSedang / jumTotRuangan)*(100)).toFixed(2);
                  var PruangBerat =  ((jumTotBerat / jumTotRuangan)*(100)).toFixed(2);
                } else if (jumTotRuangan== 0){
                  var PruangBaik = 0;
                  var PruangRingan = 0;
                  var PruangSedang = 0;
                  var PruangBerat = 0;
                }

                $("#lbljumsekolahSarana").html(formatRibuan(jumTotSekolah));
                $("#lbljumruangSarana").html(formatRibuan(jumTotRuangan.toString()));

                $("#areastatistikSarana").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+PruangBaik+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Baik '+formatRibuan(jumTotBaik.toString())+' - '+PruangBaik+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+PruangRingan+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Rusak Ringan '+formatRibuan(jumTotRingan.toString())+' - '+PruangRingan+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+PruangSedang+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Rusak Sedang '+formatRibuan(jumTotSedang.toString())+' - '+PruangSedang+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-danger rounded-start rounded-pill"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+PruangBerat+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Rusak Berat '+formatRibuan(jumTotBerat.toString())+' - '+PruangBerat+' %</span></div>');

                       html =(
                        '<tr class="border-bottom border-200">'+
'                      <td class="align-middle white-space-nowrap fw-semi-bold">Kelas</td>'+
'                        <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlruangkelas)+'</td>'+
'                        <td class="align-middle pe-card">'+
'                            <div class="d-flex align-items-center">'+
'                                <div class="progress me-3 rounded-3 bg-200"'+
'                                    style="height: 5px;width:80px">'+
'                                    <div class="progress-bar bg-primary rounded-pill"'+
'                                        role="progressbar" style="width: '+PkelasBaik+'%;"'+
'                                        aria-valuenow="'+PkelasBaik+'" aria-valuemin="0"'+
'                                        aria-valuemax="100"></div>'+
'                                </div>'+
'                                <div class="fw-semi-bold ms-2">'+PkelasBaik+'%</div>'+
'                            </div>'+
'                        </td>'+
'                        <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PkelasRingan+'%;"'+
'                    aria-valuenow="'+PkelasRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkelasRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PkelasSedang+'%;"'+
'                    aria-valuenow="'+PkelasSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkelasSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PkelasBerat+'%;"'+
'                    aria-valuenow="'+PkelasBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkelasBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">'+
'        Perpustakaan</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlruangperpustakaan)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PperpusBaik+'%;"'+
'                    aria-valuenow="'+PperpusBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PperpusBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PperpusRingan+'%;"'+
'                    aria-valuenow="'+PperpusRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PperpusRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PperpusSedang+'%;"'+
'                    aria-valuenow="'+PperpusSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PperpusSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width: '+PperpusBerat+'%;"'+
'                    aria-valuenow="'+PperpusBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PperpusBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Kepala'+
'        Sekolah</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlruangkepsek)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PkepsekBaik+'%;"'+
'                    aria-valuenow="'+PkepsekBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkepsekBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width:'+PkepsekRingan+'%;"'+
'                    aria-valuenow="'+PkepsekRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkepsekRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PkepsekSedang+'%;"'+
'                    aria-valuenow="'+PkepsekSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkepsekSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PkepsekBerat+'%;"'+
'                    aria-valuenow="'+PkepsekBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkepsekBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Guru</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlruangguru)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PguruBaik+'%;"'+
'                    aria-valuenow="'+PguruBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PguruBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PguruRingan+'%;"'+
'                    aria-valuenow="'+PguruRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PguruRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PguruSedang+'%;"'+
'                    aria-valuenow="'+PguruSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PguruSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PguruBerat+'%;"'+
'                    aria-valuenow="'+PguruBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PguruBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Pembinaan</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlruangbina)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PbinaBaik+'%;"'+
'                    aria-valuenow="'+PbinaBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbinaBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width:'+PbinaRingan+'%;"'+
'                    aria-valuenow="'+PbinaRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbinaRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PbinaSedang+'%;"'+
'                    aria-valuenow="'+PbinaSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbinaSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width: '+PbinaBerat+'%;"'+
'                    aria-valuenow="'+PbinaBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbinaBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Lab.'+
'        Multimedia</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmllabmultimedia)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width:'+PmediaBaik+'%;"'+
'                    aria-valuenow="'+PmediaBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PmediaBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PmediaRingan+'%;"'+
'                    aria-valuenow="'+PmediaRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PmediaRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PmediaSedang+'%;"'+
'                    aria-valuenow="'+PmediaSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PmediaSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PmediaBerat+'%;"'+
'                    aria-valuenow="'+PmediaBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PmediaBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Lab.'+
'        Komputer</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmllabkomputer)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PkompBaik+'%;"'+
'                    aria-valuenow="'+PkompBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkompBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PkompRingan+'%;"'+
'                    aria-valuenow="'+PkompRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkompRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PkompSedang+'%;"'+
'                    aria-valuenow="'+PkompSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkompSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width: '+PkompBerat+'%;"'+
'                    aria-valuenow="'+PkompBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PkompBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Lab. IPS'+
'    </td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmllabips)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width:'+PipsBaik+'%;"'+
'                    aria-valuenow="'+PipsBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipsBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width:'+PipsRingan+'%;"'+
'                    aria-valuenow="'+PipsRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipsRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PipsSedang+'%;"'+
'                    aria-valuenow="'+PipsSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipsSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width: '+PipsBerat+'%;"'+
'                    aria-valuenow="'+PipsBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipsBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Lab. IPA'+
'    </td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmllabipa)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PipaBaik+'%;"'+
'                    aria-valuenow="'+PipaBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipaBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PipaRingan+'%;"'+
'                    aria-valuenow="'+PipaRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipaRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PipaSedang+'%;"'+
'                    aria-valuenow="'+PipaSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipaSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PipaBerat+'%;"'+
'                    aria-valuenow="'+PipaBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PipaBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Lab. Bahasa'+
'    </td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmllabbahasa)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PbhsBaik+'%;"'+
'                    aria-valuenow="'+PbhsBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbhsBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width:'+PbhsRingan+'%;"'+
'                    aria-valuenow="'+PbhsRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbhsRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PbhsSedang+'%;"'+
'                    aria-valuenow="'+PbhsSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbhsSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width: '+PbhsBerat+'%;"'+
'                    aria-valuenow="'+PbhsBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PbhsBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Wc Umum'+
'    </td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlwcumum)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PwcuBaik+'%;"'+
'                    aria-valuenow="'+PwcuBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcuBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PwcuRingan+'%;"'+
'                    aria-valuenow="'+PwcuRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcuRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width:'+PwcuSedang+'%;"'+
'                    aria-valuenow="'+PwcuSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcuSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width: '+PwcuBerat+'%;"'+
'                    aria-valuenow="'+PwcuBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcuBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Wc Siswa'+
'    </td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlwcsiswa)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PwcsBaik+'%;"'+
'                    aria-valuenow="'+PwcsBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcsBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PwcsRingan+'%;"'+
'                    aria-valuenow="'+PwcsRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcsRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PwcsSedang+'%;"'+
'                    aria-valuenow="'+PwcsSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcsSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PwcsBerat+'%;"'+
'                    aria-valuenow="'+PwcsBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcsBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr class="border-bottom border-200">'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Wc Guru'+
'    </td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlwcguru)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width:'+PwcgBaik+'%;"'+
'                    aria-valuenow="'+PwcgBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcgBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width: '+PwcgRingan+'%;"'+
'                    aria-valuenow="'+PwcgRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcgRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PwcgSedang+'%;"'+
'                    aria-valuenow="'+PwcgSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcgSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PwcgBerat+'%;"'+
'                    aria-valuenow="'+PwcgBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PwcgBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr>'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Tempat'+
'        Ibadah</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlibadah)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PibadahBaik+'%;"'+
'                    aria-valuenow="'+PibadahBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PibadahBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width:'+PibadahRingan+'%;"'+
'                    aria-valuenow="'+PibadahRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PibadahRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PibadahSedang+'%;"'+
'                    aria-valuenow="'+PibadahSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PibadahSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PibadahBerat+'%;"'+
'                    aria-valuenow="'+PibadahBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PibadahBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>'+
'<tr>'+
'    <td class="align-middle white-space-nowrap fw-semi-bold">Asrama</td>'+
'    <td class="align-middle white-space-nowrap text-center">'+formatRibuan(jmlasrama)+'</td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-primary rounded-pill"'+
'                    role="progressbar" style="width: '+PasramaBaik+'%;"'+
'                    aria-valuenow="'+PasramaBaik+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PasramaBaik+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-info rounded-pill"'+
'                    role="progressbar" style="width:'+PasramaRingan+'%;"'+
'                    aria-valuenow="'+PasramaRingan+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PasramaRingan+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-warning rounded-pill"'+
'                    role="progressbar" style="width: '+PasramaSedang+'%;"'+
'                    aria-valuenow="'+PasramaSedang+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PasramaSedang+'%</div>'+
'        </div>'+
'    </td>'+
'    <td class="align-middle pe-card">'+
'        <div class="d-flex align-items-center">'+
'            <div class="progress me-3 rounded-3 bg-200"'+
'                style="height: 5px;width:80px">'+
'                <div class="progress-bar bg-danger rounded-pill"'+
'                    role="progressbar" style="width:'+PasramaBerat+'%;"'+
'                    aria-valuenow="'+PasramaBerat+'" aria-valuemin="0"'+
'                    aria-valuemax="100"></div>'+
'            </div>'+
'            <div class="fw-semi-bold ms-2">'+PasramaBerat+'%</div>'+
'        </div>'+
'    </td>'+
'</tr>');
$('#list-data-sarana').html(html);
                $("#loading").fadeOut("slow");
            },
            error: function() {
                $("#loading").fadeOut("slow");
                alert("Koneksi bermasalah periksa internet");
                document.body.style.cursor = "default";
            },
        });
    }
/*
    $('#listTabelDashboard').on('click','.btnViewMap',function(){
        var koordinat = $(this).data('koordinat');
        var nmkecamatan = $(this).data('nmkecamatan');
        var jmlwisata = $(this).data('jmlwisata');
        var jmltravel = $(this).data('jmltravel');
        var jmlhotel = $(this).data('jmlhotel');
        var jmlresto = $(this).data('jmlresto');
        window.scrollTo(0,0);
        const words1 = koordinat.split(',');
       
        map.setView([words1[0], words1[1]],13);

        var marker = L.marker([words1[0], words1[1]], {
        }).addTo(map).bindPopup(
            '<b class="text-xs">' + nmkecamatan +
            '</b><br><span class="btext-xs">Obyek Wisata &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;</span>' + jmlwisata + '<br>' +
            '<span class="btext-xs">Tour & Travel &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> &nbsp;&nbsp;' + jmltravel + '<br>' +
            '<span class="btext-xs">Hotel & Penginapan &nbsp;: </span> &nbsp;&nbsp;' + jmlhotel + '<br>' +
            '<span class="btext-xs">Restoran &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> &nbsp;&nbsp;' + jmlresto           
        ).openPopup()  
      });
*/
    ///// POSISI KOORDINA USER /////   
    if (Geolocation = navigator.geolocation) {
        Geolocation.getCurrentPosition(getPosition, errorHandler)
    } else {
        console.log('Ups, browser anda tidak mendukung Geolocation');
    }

    function getPosition(position) {
        console.log(position);
        $("#lbllatitude").val(position.coords.latitude);$("#lbllongitude").val(position.coords.longitude);
        var marker = L.circleMarker([position.coords.latitude, position.coords.longitude], {
            //icon: userIcon,
            color: 'lightgreen', weight: 2, fillOpacity: 0.6
        }).addTo(map)//.bindTooltip("Anda", {permanent: true, direction: 'bottom'});
        marker.setRadius(20);
    }

    function errorHandler(err) {
        console.error(err);
    }
    ///// END POSISI KOORDINA USER /////

//    const apiKey =
//        "AAPK43da434581de48bc8d1a3cee384f4c0ccevS2V9EIypW6kg3RSg4wOww0B6nGKKVozpYLXxU-9iRmgYEiEnrjR-jC1y1H3Wv"; // eslint-disable-line no-unused-vars, eol-last
/*
    var peta1 = L.esri.Vector.vectorBasemapLayer("ArcGIS:Imagery", {
        apikey: apiKey,
    });
*/
    // VARIABEL UNTUK PETA DI LEAFLET
	var peta1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFoZW5kcmF5dWRoYSIsImEiOiJja29pNnAzajcwcmV3MndsbHlzNWMxM2RmIn0.Q53cv5O2-ozIAIZLhgcKcQ', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		accessToken: 'pk.eyJ1IjoibWFoZW5kcmF5dWRoYSIsImEiOiJja29pNnAzajcwcmV3MndsbHlzNWMxM2RmIn0.Q53cv5O2-ozIAIZLhgcKcQ'
	});
	// VARIABEL UNTUK PETA DI LEAFLET

    // DEKLARASI LAYERGROUP
    //var vector_kecamatan = L.layerGroup();
    var wisatalayer = L.layerGroup();
    var travellayer = L.layerGroup();
    var hotellayer = L.layerGroup();
    var restolayer = L.layerGroup();
    // DEKLARASI LAYERGROUP
/*
    // LOOPING UNTUK GET VECTOR KECAMATAN, MEMANGGIL GEOJSON YG DI DATABASE
    $.ajax({
        type: "GET",
        url: "../operator/aksi/ambil_vektor_kecamatan.php",
        dataType: "json",
        method: "GET",
        success: function(data) {
            var i;
            for (i = 0; i < data.length; i++) {
                L.geoJSON(data[i], {
                    style: {
                        color: 'gray',
                        fillColor: getRandomColor(),
                        fillOpacity: 0,
                        weight: 1,
                    },
                }).addTo(vector_kecamatan)
            }
        },
        error: function() {
            console.log('Koneksi bermasalah periksa internet');
        },
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
*/
    var map = L.map("map", {
        center: [-8.264371593833262, 113.6321026467762],
        zoom: 10,
        layers: [peta1, wisatalayer, hotellayer, restolayer],
    });
    
/*
    var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
*/
    ////POSISI ALUN2 JEMBER ////
    var marker = L.circleMarker([-8.264371593833262, 113.6321026467762], {
        color: '#3388ff', weight: 2, fillOpacity: 0.4
    }).addTo(map).bindPopup("Pusat Kota");
    marker.setRadius(20);
   

    // API UNTUK MARKER
    var iconApiKey = "a6bdace0ef044b63b68223c23362f463";
    // API UNTUK MARKER

    // CUSTOM MARKER/PIN
    var userIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
       // iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=lightgreen&icon=user&apiKey=${iconApiKey}`,
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=lightgreen&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var travelIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=green&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var blueIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=blue&icon=house-damage&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [10,10],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
    });
    var redIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=building&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
       
    });
    var goldIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=gold&icon=house-user&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });

    var userIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=lightgreen&icon=user&apiKey=${iconApiKey}`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var travelIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=green&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var blueIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=blue&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var redIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=house-building&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var goldIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=gold&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    // CUSTOM MARKER/PIN
/*
    var baseMaps = {
        "Kabupaten Jember": peta1,
    };

    // UNTUK MENAMPILKAN OVERLAY/VECTOR/PIN/MARKER
    var overlays = {
        "Obyek Wisata": wisatalayer,       
        "Hotel & Penginapan": hotellayer,
        "Restoran & Rumah Makan": restolayer,
       // "Tour, Travel, dll": travellayer,
    };
    // UNTUK MENAMPILKAN OVERLAY/VECTOR/PIN/MARKER

    L.control.layers(baseMaps, overlays, {
        collapsed: false
    }).addTo(map);
  

    var legend = L.control({
        position: "bottomright",
    });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create(
                "div",
                "info legend leaflet-control br {clear: both;}"
            ),
            grades = [],
            labels = [],
            from,
            to;

        labels.push(
            '<i style="background:blue' + '"></i> Objek Wisata',         
            '<i style="background:red' + '"></i> Hotel & Penginapan',
            '<i style="background:orange' + '"></i> Restoran & Rumah Makan',
            //'<i style="background:green' + '"></i> Tour, Travel, dll'
        );
        div.innerHTML = labels.join("<br>");
        return div;
    };
    legend.addTo(map);
*/
    ambilmarkerwisata();
 
    function ambilmarkerwisata() {
        $.ajax({
            url: "../operator/aksi/ambil_marker_pendidikan.php",
            dataType: "json",
            method: "POST",
            success: function(data) {
                const pusatXY = "-8.264371593833262, 113.6321026467762";
                const pusat = pusatXY.split(',');
                var pusatX = pusat[0];
                var pusatY = pusat[1];

                var posisiX = $("#lbllatitude").val();
                var posisiY = $("#lbllongitude").val();

                for (var i = 0; i < data.length; i++) {
                    const str2 = data[i].koordinat;
                    const words2 = str2.split(',');
                    
                    //// menghitung jarak user
                    var markerFrom = L.circleMarker([posisiX, posisiY]);
                    var markerTo =  L.circleMarker([words2[0], words2[1]]);
                    var from = markerFrom.getLatLng();
                    var to = markerTo.getLatLng();
                    var jarakuser = from.distanceTo(to).toFixed(0)/1000;

                    //// menghitung jarak kota
                    var markerFromKota = L.circleMarker([pusatX, pusatY]);
                    var markerTo2 =  L.circleMarker([words2[0], words2[1]]);
                    var fromkota = markerFromKota.getLatLng();
                    var to2 = markerTo2.getLatLng();
                    var jarakkota = fromkota.distanceTo(to2).toFixed(0)/1000;
 /*
                    var marker = L.circleMarker([-8.264371593833262, 113.6321026467762], {
                      color: '#3388ff', weight: 2, fillOpacity: 0.4
                  }).addTo(map).bindPopup("Pusat Kota");
                  marker.setRadius(20);
*/
                    if (data[i].bentuk == "TK"){
                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#3388ff', weight: 2, fillOpacity: 0.1
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">NPSN</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Desa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].desa +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].kecamatan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kabupaten</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Propinsi</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].status +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Waktu</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Jenjang</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                            '</tr>'+
                          '</table>'+
                          '<br><span class="btext-xs" style="color:gray"><b>Keterangan</b><br>' + data[i].diskripsi +
                          '</span>' +
                          '<br><br><a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="user" data-koordinat="' + data[i].koordinat +
                          '" style="color:green;cursor: pointer;"><span class="fas fa-user"></span>&nbsp;&nbsp;&nbsp;' + jarakuser + ' Km dengan posisi Anda</a><br>' +
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill" type="button" data-id = '+ data[i].idtempat + '>Tampilkan Profil Sekolah</button></center>'                       
                            ).addTo(wisatalayer)
                        marker.setRadius(8);

                    } else if (data[i].bentuk == "SD" || data[i].bentuk == "SPK SD" || data[i].bentuk == "TK" || data[i].bentuk == "KB"){
                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#FF0000', weight: 2, fillOpacity: 0.1
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">NPSN</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Desa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].desa +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].kecamatan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kabupaten</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Propinsi</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].status +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Waktu</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Jenjang</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                            '</tr>'+
                          '</table>'+
                          '<br><span class="btext-xs" style="color:gray"><b>Keterangan</b><br>' + data[i].diskripsi +
                          '</span>' +
                          '<br><br><a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="user" data-koordinat="' + data[i].koordinat +
                          '" style="color:green;cursor: pointer;"><span class="fas fa-user"></span>&nbsp;&nbsp;&nbsp;' + jarakuser + ' Km dengan posisi Anda</a><br>' +
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill" type="button" data-id = '+ data[i].idtempat + '>Tampilkan Profil Sekolah</button></center>'                       

                        ).addTo(hotellayer)
                        marker.setRadius(8);

                    } else if (data[i].bentuk == "SMP" || data[i].bentuk == "SMPLB"){
                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#DAA520', weight: 2, fillOpacity: 0.1
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">NPSN</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Desa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].desa +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].kecamatan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kabupaten</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Propinsi</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].status +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Waktu</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Jenjang</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                            '</tr>'+
                          '</table>'+
                          '<br><span class="btext-xs" style="color:gray"><b>Keterangan</b><br>' + data[i].diskripsi +
                          '</span>' +
                          '<br><br><a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="user" data-koordinat="' + data[i].koordinat +
                          '" style="color:green;cursor: pointer;"><span class="fas fa-user"></span>&nbsp;&nbsp;&nbsp;' + jarakuser + ' Km dengan posisi Anda</a><br>' +
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill" type="button" data-id = '+ data[i].idtempat + '>Tampilkan Profil Sekolah</button></center>'                       

                        ).addTo(restolayer)
                        marker.setRadius(8);

                    } else if (data[i].bentuk == "SMA" || data[i].bentuk == "SMK"){
                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#663399', weight: 2, fillOpacity: 0.1
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">NPSN</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Desa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].desa +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].kecamatan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kabupaten</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Propinsi</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].status +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Waktu</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Jenjang</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                            '</tr>'+
                          '</table>'+
                          '<br><span class="btext-xs" style="color:gray"><b>Keterangan</b><br>' + data[i].diskripsi +
                          '</span>' +
                          '<br><br><a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="user" data-koordinat="' + data[i].koordinat +
                          '" style="color:green;cursor: pointer;"><span class="fas fa-user"></span>&nbsp;&nbsp;&nbsp;' + jarakuser + ' Km dengan posisi Anda</a><br>' +
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill" type="button" data-id = '+ data[i].idtempat + '>Tampilkan Profil Sekolah</button></center>'                       

                        ).addTo(travellayer)
                        marker.setRadius(8);

                    } else if (data[i].bentuk == "SPS" || data[i].bentuk == "Kursus" || data[i].bentuk == "TPA" || data[i].bentuk == "PKBM" || data[i].bentuk == "SLB" || data[i].bentuk == "SDLB" || data[i].bentuk == "SMLB" || data[i].bentuk == "SMPLB") {
                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#90EE90', weight: 2, fillOpacity: 0.1
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">NPSN</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Desa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].desa +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].kecamatan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kabupaten</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Propinsi</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].status +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Waktu</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Jenjang</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + "-" +'</td>'+
                            '</tr>'+
                          '</table>'+
                          '<br><span class="btext-xs" style="color:gray"><b>Keterangan</b><br>' + data[i].diskripsi +
                          '</span>' +
                          '<br><br><a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="user" data-koordinat="' + data[i].koordinat +
                          '" style="color:green;cursor: pointer;"><span class="fas fa-user"></span>&nbsp;&nbsp;&nbsp;' + jarakuser + ' Km dengan posisi Anda</a><br>' +
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill" type="button" data-id = '+ data[i].idtempat + '>Tampilkan Profil Sekolah</button></center>'                       

                        ).addTo(travellayer)
                        marker.setRadius(8);

                    }
                }
            },
        });
    }

    $('#map').on('click', 'a', function() {

        const pusatXY = "-8.264371593833262, 113.6321026467762";
        const pusat = pusatXY.split(',');
        var pusatX = pusat[0];
        var pusatY = pusat[1];

        var posisiX = $("#lbllatitude").val();
        var posisiY = $("#lbllongitude").val();

        const koordinat = $(this).data("koordinat");
        const poss = koordinat.split(',');
        var koordinatX = poss[0];var koordinatY = poss[1];

        var keterangan = $(this).data("keterangan");
        var ketjarak = $(this).data("ketjarak");
        
        map.closePopup();
       
        if (ketjarak == "user"){
            var control = L.Routing.control({
                createMarker: function() { return null; },// menghilangkan marker tambahan						
                waypoints: [
                    L.latLng(koordinatX, koordinatY),
                    L.latLng(posisiX, posisiY)
                ],
                routeWhileDragging: false,
                reverseWaypoints: false,
                fitSelectedRoutes: true,
            }).addTo(map)
            //map.closePopup();
            control.hide();
            //control.spliceWaypoints(0, 1); // <-- removes your route
        } else if (ketjarak == "kota"){
            var control = L.Routing.control({
                createMarker: function() { return null; },	// menghilangkan marker tambahan					
                waypoints: [
                    L.latLng(koordinatX, koordinatY),
                    L.latLng(pusatX, pusatY)
                ],
                routeWhileDragging: false,
                reverseWaypoints: false,
                fitSelectedRoutes: true,
            }).addTo(map)
            control.hide();
        }
    });

    $('#txtcarilokasi').keydown(function(e) {
        if (e.keyCode == 13) {
            var kata = $("#txtcarilokasi").val();
            if (kata.length >= 2) {
                $.ajax({
                    type: 'POST',
                    url: 'aksi/cari_lokasi.php',
                    data: {
                        kata: kata
                    },
                    dataType: 'json',
                    beforeSend: function(e) {
                        $("#loading").fadeIn();
                        document.body.style.cursor = "wait";
                    },
                    success: function(resp) {
                        $("#loading").fadeOut("slow");
                        document.body.style.cursor = "default";
                        if (resp.length >= 1) {
                            pencarianLokasi();
                        } else if (resp.length <= 0) {
                            alert("Data tidak diketemukan");
                            $("#txtcarilokasi").val("");
                            $("#txtcarilokasi").focus();
                        } else {
                            alert("Data tidak diketemukan");
                            $("#txtcarilokasi").val("");
                            $("#txtcarilokasi").focus();
                        }
                    },
                    error: function() {
                        $("#loading").fadeOut("slow");
                        document.body.style.cursor = "default";
                        alert("Koneksi ke server terputus");
                    },
                });

            } else {
                alert("Kata kunci pencarian kosong")
            }
        }
    });

    function pencarianLokasi() {
        var kata = $("#txtcarilokasi").val();
        $.ajax({
            type: 'POST',
            url: "aksi/isi_pencarian.php",
            data: {
                kata: kata
            },
            success: function(resp) {
                $("#loading").fadeOut("slow");
                $("#isianModTambahDataLarge").html(resp);
                $("#isianModTambahDataLarge").fadeIn(1000);
                $("#modTambahDataLarge").modal('show');
                $("#txtcarilokasi").val("");
            },
        });
    }

    var ctx = document.getElementById('umurChart').getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.4)')
    gradient.addColorStop(1, '#FFFFFF')

    function hitungGrafikTotalSekolah(){
        $.ajax({
            type:"POST",
            url :"aksi/ambil_grafik_total_sekolah.php",
            async : false,
            dataType : 'json',			
            success:function(data){	
                var labels = [];
                var values = [];		
                myArray = data;
                $.each(myArray, function(index, jum) {
                    document.body.style.cursor = "default";	
                    $("#loading").fadeOut("slow");
 
                    labels.push(jum.nmbentuksekolah);
                    values.push(jum.jumDetSekolah);
                
                    var hitChartContent = document.getElementById('hitungUmurChart');
                    hitChartContent.innerHTML = '';
                    $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
      
                    var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                    var salesChartData = {
                        labels: labels,
                            datasets: [
                                {
                                label                   : 'Jumlah',
                                borderColor             : 'rgb(54, 162, 235)',
                                backgroundColor         : gradient,
                                fill                    : true,
                                pointBorderColor        : 'rgba(0, 0, 0, 0)',
                                pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                                pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                                pointHoverBorderColor   : 'rgb(54, 162, 235)',
                                data                    : values,
                                },
                            ]
                    }
                    
                    var salesChartOptions = {
                        maintainAspectRatio : true,
                        responsive : true,
                        elements: {
                            point: {
                                radius: 0,
                                hitRadius: 10,
                                hoverRadius: 8
                            }
                        },
                        legend: {
                            display: false
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true,
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: false
                        },	
                        scales: {
                            xAxes: [{
                                ticks: {display: true},
                                gridLines : {display : false,},
                                barPercentage: 0.6
                            }],
                            yAxes: [{
                                ticks: {display: true,beginAtZero: true},
                                gridLines : {display : true,}
                            }]
                        }
                        
                    }
                    var salesChart = new Chart(salesChartCanvas, { 
                        type: 'line', 
                        data: salesChartData, 
                        options: salesChartOptions,
                    })
                }); 
            },
            error: function() {
                $("#loading").fadeOut("slow");
                document.body.style.cursor = "default";				
            },				
        });		
    }	
  
    
    function isiGrafikStatus(){
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_status_sekolah.php",
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valsw = [];var valneg = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuksekolah);
                    valsw.push(jum.jumSwasta);
                    valneg.push(jum.jumNegeri);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentADMIN');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN"><canvas>');
     
      var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'Negeri',
            backgroundColor		: '#4169E1',
            borderColor         : '#4169E1',
            data                : valneg,
          },
          {
            label               : 'Swasta',
            backgroundColor		: '#E6E6FA',
            borderColor         : '#E6E6FA',
            data                : valsw,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: true,
          callbacks: {
            label: function (tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
            }
         },	
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },	
        scales: {
          xAxes: [{
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,beginAtZero: true},
            gridLines : {display : true,}
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, { 
          type: 'bar', 
          data: salesChartData, 
          options: salesChartOptions
        }
      )
    
    //////////////////////////////////////////////////////////////////// 				
                    $("#loading").fadeOut("slow");	
                    document.body.style.cursor = "default";
    
            },
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

    function isiGrafikAkreditasi(){
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_akreditasi.php",
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valA = [];var valB = [];var valC = [];var valBelum = [];var valTidak = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuk);
                    valA.push(jum.jumA);valB.push(jum.jumB);valC.push(jum.jumC);
                    valBelum.push(jum.jumBelum);valTidak.push(jum.jumTidak);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentAkreditasi');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentAkreditasi').append('<canvas id="hitungChartAkreditasi" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartAkreditasi').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'A',
            backgroundColor		: '#6495ED',
            borderColor         : '#6495ED',
            data                : valA,
          },
          {
            label               : 'B',
            backgroundColor		: '#87CEFA',
            borderColor         : '#87CEFA',
            data                : valB,
          },
          {
            label               : 'C',
            backgroundColor		: '#E6E6FA',
            borderColor         : '#E6E6FA',
            data                : valC,
          },
          {
            label               : 'Belum Terakreditasi',
            backgroundColor		: '#EEE8AA',
            borderColor         : '#EEE8AA',
            data                : valBelum,
          },
          {
            label               : 'Tidak Terakreditasi',
            backgroundColor		: '#FFA500',
            borderColor         : '#FFA500',
            data                : valTidak,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: true,
          callbacks: {
            label: function (tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
            }
         },	
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },	
        scales: {
          xAxes: [{
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,beginAtZero: true},
            gridLines : {display : true,}
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, { 
          type: 'bar', 
          data: salesChartData, 
          options: salesChartOptions
        }
      )
    
    //////////////////////////////////////////////////////////////////// 				
                    $("#loading").fadeOut("slow");	
                    document.body.style.cursor = "default";
    
            },
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

    function isiGrafikBandingGuruSiswa(){
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_perbandingan_guru.php",
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valsw = [];var valgu = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuksekolah);
                    valsw.push(jum.jumSiswa);
                    valgu.push(jum.jumGuru);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentGuru');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentGuru').append('<canvas id="hitungChartGuru" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartGuru').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'Guru',
            backgroundColor		: '#4169E1',
            borderColor         : '#4169E1',
            data                : valgu,
          },
          {
            label               : 'Siswa',
            backgroundColor		: '#E6E6FA',
            borderColor         : '#E6E6FA',
            data                : valsw,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: true,
          callbacks: {
            label: function (tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
            }
         },	
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },	
        scales: {
          xAxes: [{
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,beginAtZero: true},
            gridLines : {display : true,}
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, { 
          type: 'bar', 
          data: salesChartData, 
          options: salesChartOptions
        }
      )
    
    //////////////////////////////////////////////////////////////////// 				
                    $("#loading").fadeOut("slow");	
                    document.body.style.cursor = "default";
    
            },
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

    //////////////////////////////////////////
    //////////////// KECAMATAN ///////////////
    //////////////////////////////////////////
    
    function hitungGrafikTotalSekolahKec(){
        var idkecamatan = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url :"aksi/ambil_grafik_total_sekolah_kecamatan.php",
             data:{idkecamatan:idkecamatan},
             async : false,
             dataType : 'json',			
             success:function(data){	
                 var labels = [];
                 var values = [];		
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     document.body.style.cursor = "default";	
                     $("#loading").fadeOut("slow");
  
                     labels.push(jum.nmbentuksekolah);
                     values.push(jum.jumDetSekolah);
                 
                     var hitChartContent = document.getElementById('hitungUmurChart');
                     hitChartContent.innerHTML = '';
                     $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
       
                     var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                     var salesChartData = {
                         labels: labels,
                             datasets: [
                                 {
                                    label                   : 'Jumlah',
                                    borderColor             : 'rgb(54, 162, 235)',
                                    backgroundColor         : gradient,
                                    fill                    : true,
                                    pointBorderColor        : 'rgba(0, 0, 0, 0)',
                                    pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                                    pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                                    pointHoverBorderColor   : 'rgb(54, 162, 235)',
                                    data                    : values,
                                 },
                             ]
                     }
                     
                     var salesChartOptions = {
                         maintainAspectRatio : true,
                         responsive : true,
                         elements: {
                            point: {
                                radius: 0,
                                hitRadius: 10,
                                hoverRadius: 8
                            }
                        },
                         legend: {
                             display: false
                         },
                         animation: {
                             animateScale: true,
                             animateRotate: true,
                         },
                         tooltips: {
                             mode: 'index',
                             intersect: false,
                         },
                         hover: {
                             mode: 'nearest',
                             intersect: false
                         },	
                         scales: {
                             xAxes: [{
                                 ticks: {display: true},
                                 gridLines : {display : false,},
                                 barPercentage: 0.6
                             }],
                             yAxes: [{
                                 ticks: {display: true,beginAtZero: true},
                                 gridLines : {display : true,}
                             }]
                         }
                         
                     }
                     var salesChart = new Chart(salesChartCanvas, { 
                         type: 'line', 
                         data: salesChartData, 
                         options: salesChartOptions,
                     })
                 }); 
             },
             error: function() {
                 $("#loading").fadeOut("slow");
                 document.body.style.cursor = "default";				
             },				
         });						
     }	
   
     
     function isiGrafikStatusKec(){
        var idkecamatan = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_status_sekolah_kecamatan.php",
             data:{idkecamatan:idkecamatan},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valneg = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSwasta);
                     valneg.push(jum.jumNegeri);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentADMIN');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN"><canvas>');
      
       var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Negeri',
             backgroundColor		: '#4169E1',
             borderColor         : '#4169E1',
             data                : valneg,
           },
           {
             label               : 'Swasta',
             backgroundColor		: '#E6E6FA',
             borderColor         : '#E6E6FA',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
         legend: {
           display: true
         },
         animation: {
           animateScale: true,
           animateRotate: true
         },
         tooltips: {
           mode: 'index',
           intersect: false,
           enabled: true,
           callbacks: {
             label: function (tooltipItems, data) {
                 return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
             }
          },	
         },
         hover: {
           mode: 'nearest',
           intersect: true
         },	
         scales: {
           xAxes: [{
             gridLines : {display : false,},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,beginAtZero: true},
             gridLines : {display : true,}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )			
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }
 
     function isiGrafikAkreditasiKec(){
        var idkecamatan = $("#txttransid").val();
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_akreditasi_kecamatan.php",
            data:{idkecamatan:idkecamatan},
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valA = [];var valB = [];var valC = [];var valBelum = [];var valTidak = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuk);
                    valA.push(jum.jumA);valB.push(jum.jumB);valC.push(jum.jumC);
                    valBelum.push(jum.jumBelum);valTidak.push(jum.jumTidak);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentAkreditasi');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentAkreditasi').append('<canvas id="hitungChartAkreditasi" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartAkreditasi').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'A',
            backgroundColor		: '#6495ED',
            borderColor         : '#6495ED',
            data                : valA,
          },
          {
            label               : 'B',
            backgroundColor		: '#87CEFA',
            borderColor         : '#87CEFA',
            data                : valB,
          },
          {
            label               : 'C',
            backgroundColor		: '#E6E6FA',
            borderColor         : '#E6E6FA',
            data                : valC,
          },
          {
            label               : 'Belum Terakreditasi',
            backgroundColor		: '#EEE8AA',
            borderColor         : '#EEE8AA',
            data                : valBelum,
          },
          {
            label               : 'Tidak Terakreditasi',
            backgroundColor		: '#FFA500',
            borderColor         : '#FFA500',
            data                : valTidak,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: true,
          callbacks: {
            label: function (tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
            }
         },	
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },	
        scales: {
          xAxes: [{
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,beginAtZero: true},
            gridLines : {display : true,}
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, { 
          type: 'bar', 
          data: salesChartData, 
          options: salesChartOptions
        }
      )
    
    //////////////////////////////////////////////////////////////////// 				
                    $("#loading").fadeOut("slow");	
                    document.body.style.cursor = "default";
    
            },
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

     function isiGrafikBandingGuruSiswaKec(){
        var idkecamatan = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_perbandingan_guru_kecamatan.php",
             data:{idkecamatan:idkecamatan},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valgu = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSiswa);
                     valgu.push(jum.jumGuru);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentGuru');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentGuru').append('<canvas id="hitungChartGuru" height="300px"><canvas>');
      
       var salesChartCanvas = $('#hitungChartGuru').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Guru',
             backgroundColor		: '#4169E1',
             borderColor         : '#4169E1',
             data                : valgu,
           },
           {
             label               : 'Siswa',
             backgroundColor		: '#E6E6FA',
             borderColor         : '#E6E6FA',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
         legend: {
           display: true
         },
         animation: {
           animateScale: true,
           animateRotate: true
         },
         tooltips: {
           mode: 'index',
           intersect: false,
           enabled: true,
           callbacks: {
             label: function (tooltipItems, data) {
                 return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
             }
          },	
         },
         hover: {
           mode: 'nearest',
           intersect: true
         },	
         scales: {
           xAxes: [{
             gridLines : {display : false,},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,beginAtZero: true},
             gridLines : {display : true,}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )
 		
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }

   
    //////////////////////////////////////////
    //////////////// DESA ///////////////
    //////////////////////////////////////////
    
    function hitungGrafikTotalSekolahDesa(){
        var iddesa = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url :"aksi/ambil_grafik_total_sekolah_desa.php",
             data:{iddesa:iddesa},
             async : false,
             dataType : 'json',			
             success:function(data){	
                 var labels = [];
                 var values = [];		
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     document.body.style.cursor = "default";	
                     $("#loading").fadeOut("slow");
  
                     labels.push(jum.nmbentuksekolah);
                     values.push(jum.jumDetSekolah);
                 
                     var hitChartContent = document.getElementById('hitungUmurChart');
                     hitChartContent.innerHTML = '';
                     $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
       
                     var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                    var salesChartData = {
                        labels: labels,
                            datasets: [
                                {
                                    label                   : 'Jumlah',
                                    borderColor             : 'rgb(54, 162, 235)',
                                    backgroundColor         : gradient,
                                    fill                    : true,
                                    pointBorderColor        : 'rgba(0, 0, 0, 0)',
                                    pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                                    pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                                    pointHoverBorderColor   : 'rgb(54, 162, 235)',
                                    data                    : values,
                                },
                            ]
                    }
                    
                    var salesChartOptions = {
                        maintainAspectRatio : true,
                        responsive : true,
                        elements: {
                            point: {
                                radius: 0,
                                hitRadius: 10,
                                hoverRadius: 8
                            }
                        },
                        legend: {
                            display: false
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true,
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: false
                        },	
                        scales: {
                            xAxes: [{
                                ticks: {display: true},
                                gridLines : {display : false,},
                                barPercentage: 0.6
                            }],
                            yAxes: [{
                                ticks: {display: true,beginAtZero: true},
                                gridLines : {display : true,}
                            }]
                        }
                        
                    }
                    var salesChart = new Chart(salesChartCanvas, { 
                        type: 'line', 
                        data: salesChartData, 
                        options: salesChartOptions,
                    })
                }); 
            },
             error: function() {
                 $("#loading").fadeOut("slow");
                 document.body.style.cursor = "default";				
             },				
         });						
     }	
   
     
     function isiGrafikStatusDesa(){
        var iddesa = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_status_sekolah_desa.php",
             data:{iddesa:iddesa},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valneg = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSwasta);
                     valneg.push(jum.jumNegeri);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentADMIN');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN"><canvas>');
      
       var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Negeri',
             backgroundColor		: '#4169E1',
             borderColor         : '#4169E1',
             data                : valneg,
           },
           {
             label               : 'Swasta',
             backgroundColor		: '#E6E6FA',
             borderColor         : '#E6E6FA',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
         legend: {
           display: true
         },
         animation: {
           animateScale: true,
           animateRotate: true
         },
         tooltips: {
           mode: 'index',
           intersect: false,
           enabled: true,
           callbacks: {
             label: function (tooltipItems, data) {
                 return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
             }
          },	
         },
         hover: {
           mode: 'nearest',
           intersect: true
         },	
         scales: {
           xAxes: [{
             gridLines : {display : false,},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,beginAtZero: true},
             gridLines : {display : true,}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )			
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }
 
     function isiGrafikAkreditasiDesa(){
        var iddesa = $("#txttransid").val();
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_akreditasi_desa.php",
            data:{iddesa:iddesa},
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valA = [];var valB = [];var valC = [];var valBelum = [];var valTidak = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuk);
                    valA.push(jum.jumA);valB.push(jum.jumB);valC.push(jum.jumC);
                    valBelum.push(jum.jumBelum);valTidak.push(jum.jumTidak);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentAkreditasi');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentAkreditasi').append('<canvas id="hitungChartAkreditasi" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartAkreditasi').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'A',
            backgroundColor		: '#6495ED',
            borderColor         : '#6495ED',
            data                : valA,
          },
          {
            label               : 'B',
            backgroundColor		: '#87CEFA',
            borderColor         : '#87CEFA',
            data                : valB,
          },
          {
            label               : 'C',
            backgroundColor		: '#E6E6FA',
            borderColor         : '#E6E6FA',
            data                : valC,
          },
          {
            label               : 'Belum Terakreditasi',
            backgroundColor		: '#EEE8AA',
            borderColor         : '#EEE8AA',
            data                : valBelum,
          },
          {
            label               : 'Tidak Terakreditasi',
            backgroundColor		: '#FFA500',
            borderColor         : '#FFA500',
            data                : valTidak,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: true,
          callbacks: {
            label: function (tooltipItems, data) {
                return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
            }
         },	
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },	
        scales: {
          xAxes: [{
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,beginAtZero: true},
            gridLines : {display : true,}
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, { 
          type: 'bar', 
          data: salesChartData, 
          options: salesChartOptions
        }
      )
    
    //////////////////////////////////////////////////////////////////// 				
                    $("#loading").fadeOut("slow");	
                    document.body.style.cursor = "default";
    
            },
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

     function isiGrafikBandingGuruSiswaDesa(){
        var iddesa = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_perbandingan_guru_desa.php",
             data:{iddesa:iddesa},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valgu = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSiswa);
                     valgu.push(jum.jumGuru);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentGuru');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentGuru').append('<canvas id="hitungChartGuru" height="300px"><canvas>');
      
       var salesChartCanvas = $('#hitungChartGuru').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Guru',
             backgroundColor		: '#4169E1',
             borderColor         : '#4169E1',
             data                : valgu,
           },
           {
             label               : 'Siswa',
             backgroundColor		: '#E6E6FA',
             borderColor         : '#E6E6FA',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
         legend: {
           display: true
         },
         animation: {
           animateScale: true,
           animateRotate: true
         },
         tooltips: {
           mode: 'index',
           intersect: false,
           enabled: true,
           callbacks: {
             label: function (tooltipItems, data) {
                 return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
             }
          },	
         },
         hover: {
           mode: 'nearest',
           intersect: true
         },	
         scales: {
           xAxes: [{
             gridLines : {display : false,},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,beginAtZero: true},
             gridLines : {display : true,}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )
 		
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }


    function formatRibuan(angka, prefix){
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split   		= number_string.split(','),
        sisa     		= split[0].length % 3,
        rupiah     		= split[0].substr(0, sisa),
        ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
     
        if(ribuan){
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
     
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
    }
    
    $("#lv_kota").click(function(){
        $("#txttransid").val(""); $("#txttransketerangan").val("");
        map.closePopup();
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah);
        $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
        $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
        var keterangan = $(this).data('keterangan');
        $("#txttransketerangan").val(keterangan);
        var koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]],10);
        hitungGrafikTotalSekolah();isiGrafikStatus();isiGrafikAkreditasi();isiGrafikBandingGuruSiswa();
        isiDataSarana();
    });

    $("#lv_sinkron").click(function(){
      map.closePopup();
      sinkronJson();
  });

    $(".lv_kecamatan").click(function(){
        $("#txttransid").val(""); $("#txttransketerangan").val("");
        map.closePopup();    
        var koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]],16);   
        //map.openPopup();
        //hitungkecamatan();
        var idkecamatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah);
        $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
        $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
        $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan);
        hitungGrafikTotalSekolahKec();isiGrafikStatusKec(); isiGrafikAkreditasiKec();isiGrafikBandingGuruSiswaKec();
        isiDataSarana();
    });
    
    $(".lv_desa").click(function(){
        $("#txttransid").val(""); $("#txttransketerangan").val("");
        map.closePopup();
        var koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]],18);
        //hitungdesa();	
        var iddesa = $(this).data('id'); var keterangan = $(this).data('keterangan');
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah);
        $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
        $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
        $("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan);
        hitungGrafikTotalSekolahDesa();isiGrafikStatusDesa(); isiGrafikAkreditasiDesa();isiGrafikBandingGuruSiswaDesa();
        isiDataSarana();
    });