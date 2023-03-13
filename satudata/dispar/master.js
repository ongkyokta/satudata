function bersihkan(){
	$("#lblhalaman").val("");
	$("#txttransid").val("");$("#txttransketerangan").val("");$("#txttransnmwilayah").val("");

	$("#lblkoppeta").text("");
	$("#lblkopgrafik1").text("");$("#lblkopgrafik2").text("");
	$("#lblkopgrafik3").text("");$("#lblkopgrafik4").text("");
	
	$("#area-halaman-grafik").css("display","none");
	$("#area-peta").css("display","none");
  }

  $(".lv_desa").click(function(){
	bersihkan();
	$("#area-halaman-grafik").fadeIn();
    $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
    map.closePopup();
    var nmwilayah = $(this).data('nama');

	var iddesa = $(this).data('id'); var keterangan = $(this).data('keterangan');
	var nmwilayah = $(this).data('nama');
	$("#lblkoppeta").text(nmwilayah);$(".lblkoparea").text("Desa "+nmwilayah);
	$("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan);

	$("#lblkopstatistik").text(nmwilayah);
    $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
    $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
    $("#txttransnmwilayah").val(nmwilayah);

	isiDataStatistik();
	hitungGrafikTotal();isiGrafikKunjungan();
	hitungGrafikJenisWisata();hitungGrafikKelasHOtel();hitungGrafikKuliner();hitungGrafikKesenian();
	hitungTabelGrafikEkraf();
});

$(".lv_kecamatan").click(function(){
	bersihkan();
	$("#area-halaman-grafik").fadeIn();
    $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
    map.closePopup();
    var nmwilayah = $(this).data('nama');

	var iddesa = $(this).data('id'); var keterangan = $(this).data('keterangan');
	var nmwilayah = $(this).data('nama');
	$("#lblkoppeta").text(nmwilayah);$(".lblkoparea").text("Desa "+nmwilayah);
	$("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan);

	$("#lblkopstatistik").text(nmwilayah);
    $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
    $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
    $("#txttransnmwilayah").val(nmwilayah);

	isiDataStatistik();
	hitungGrafikTotal();isiGrafikKunjungan();
	hitungGrafikJenisWisata();hitungGrafikKelasHOtel();hitungGrafikKuliner();hitungGrafikKesenian();
	hitungTabelGrafikEkraf();
});

  $("#lv_dashboard").click(function(){
    bersihkan();

    $("#area-peta").fadeIn();

    $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
    map.closePopup();
    var nmwilayah = $(this).data('nama');
    $("#lblkoppeta").text(nmwilayah);
	$("#lblkopstatistik").text(nmwilayah);
    $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
    $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
    var keterangan = $(this).data('keterangan');
    $("#txttransketerangan").val(keterangan);$("#txttransnmwilayah").val(nmwilayah);
    var koordinat = $(this).data('koordinat');
    const words1 = koordinat.split(',');
    map.setView([words1[0], words1[1]],10);

  });

  $("#lv_grafik").click(function(){
    bersihkan();

	$("#area-halaman-grafik").fadeIn();
 
    $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
    map.closePopup();
    var nmwilayah = $(this).data('nama');
	$("#lblkopstatistik").text(nmwilayah);
    $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
    $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
    var keterangan = $(this).data('keterangan');
    $("#txttransketerangan").val(keterangan);$("#txttransnmwilayah").val(nmwilayah);

	isiDataStatistik();
	hitungGrafikTotal();isiGrafikKunjungan();
	hitungGrafikJenisWisata();hitungGrafikKelasHOtel();hitungGrafikKuliner();hitungGrafikKesenian();
	hitungTabelGrafikEkraf();
    
  });
