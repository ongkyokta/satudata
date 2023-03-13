$(".lv_tahun").on("click", function () {
    bersihkan();
    $("#area-halaman").fadeIn();

    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");

    var tahun = $(this).data('id');
    $("#txttransid").val(tahun);
    $("#txttransketerangan").val("tahun");
    $("#txttranstahun").val(tahun);

    var nmwilayah = "Kabupaten Jember";
    $("#lblkoppeta").text(nmwilayah);
    $(".lblkoparea").text("Tahun " + tahun + " - " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahun + " : " + parseInt(tahun - 1) + " - " + nmwilayah);

    isiDataStatistik();
    GrafikKasiKasunPie(); GrafikPegawaiPie(); GrafikPendidikanKadesPie();
  
    $("#lblhalaman").val("tahun");
});

$("#lv_kota").on("click", function () {
    bersihkan();
    $("#area-halaman").fadeIn();

    $("#txttransketerangan").val("kota");
    var tahunakhir = $("#lbltahunakhir").val();
    $("#txttranstahun").val(tahunakhir);

    var nmwilayah = "Kabupaten Jember";
    $("#lblkoppeta").text(nmwilayah);
    $(".lblkoparea").text("Tahun " + tahunakhir + " - " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);

    isiDataStatistik();
    GrafikKasiKasunPie(); GrafikPegawaiPie(); GrafikPendidikanKadesPie();

    $("#lblhalaman").val("dashboard");
});

$(".lv_kecamatan").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var idkecamatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nama');
    var tahunakhir = $("#lbltahunakhir").val();
    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);

    isiDataStatistik();
    GrafikKasiKasunPie(); GrafikPegawaiPie(); GrafikPendidikanKadesPie();
});

$(".lv_desa").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var idkecamatan = $(this).data('idkec'); var tahun = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nmkecamatan');

    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahun + " : " + parseInt(tahun - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahun);

    isiDataStatistik();
    GrafikKasiKasunPie(); GrafikPegawaiPie(); GrafikPendidikanKadesPie();
});


// VARIABEL UNTUK PETA DI LEAFLET
var peta1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFoZW5kcmF5dWRoYSIsImEiOiJja29pNnAzajcwcmV3MndsbHlzNWMxM2RmIn0.Q53cv5O2-ozIAIZLhgcKcQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoibWFoZW5kcmF5dWRoYSIsImEiOiJja29pNnAzajcwcmV3MndsbHlzNWMxM2RmIn0.Q53cv5O2-ozIAIZLhgcKcQ'
});

var map = L.map("map", {
    center: [-8.264371593833262, 113.6321026467762],
    zoom: 10,
    layers: [peta1],
});

$.ajax({
    type: "GET",
    url: "aksi/ambil_vektor_kecamatan.php",
    dataType: "json",
    method: "GET",
    success: function (data) {
        var i;
        for (i = 0; i < data.length; i++) {
            L.geoJSON(data[i], {
                style: {
                    color: 'black',
                    fillColor: getRandomColor(),
                    fillOpacity: 0.2,
                    weight: 1,
                },
            }).addTo(map)
        }
    },
    error: function () {
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

function formatRibuan(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
}

Chart.defaults.global.defaultFontColor = "#fff";

var ctx = document.getElementById('ModalChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function isiDataStatistik() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }

    $("#lbljumlahRT").html(""); $("#lbljumlahRW").html("");
    $("#lbljumlahkasipem").html(""); $("#lbljumlahkasikes").html("");
    $("#lbljumlahkasipel").html(""); $("#lbljumlahkasun").html(""); $("#lbljumlahkepdes").html("");

    $("#lbljumlahsekdes").html(""); $("#lbljumlahTU").html(""); $("#lbljumlahKeuangan").html("");
    $("#lbljumlahrencana").html(""); $("#lbljumlahBPD").html(""); $("#lbljumlahSMP").html("");
    $("#lbljumlahSMA").html(""); $("#lbljumlahSarjana").html(""); 
    
    $("#lblketjumlahRT").html(""); $("#lblketjumlahRW").html("");
    $("#lblketjumlahkasipem").html(""); $("#lblketjumlahkasikes").html("");
    $("#lblketjumlahkasipel").html(""); $("#lblketjumlahkasun").html(""); $("#lblketjumlahkepdes").html("");

    $("#lblketjumlahsekdes").html(""); $("#lblketjumlahTU").html(""); $("#lblketjumlahKeuangan").html("");
    $("#lblketjumlahrencana").html(""); $("#lblketjumlahBPD").html(""); $("#lblketjumlahSMP").html("");
    $("#lblketjumlahSMA").html(""); $("#lblketjumlahSarjana").html(""); 

    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var i;
            var JumRT = 0; var JumRTT = 0;
            var JumRW = 0; var JumRWT = 0;
            var JumKasipem = 0; var JumKasipemT = 0;
            var JumKasikes = 0; var JumKasikesT = 0;
            var JumKasipel = 0; var JumKasipelT = 0;
            var JumKasun = 0; var JumKasunT = 0;
            var JumKades = 0; var JumKadesT = 0;
            var JumSekdes = 0; var JumSekdesT = 0;
            var JumTU = 0; var JumTUT = 0;

            var JumKeu = 0; var JumKeuT = 0;
            var JumRencana = 0; var JumRencanaT = 0;
            var JumBPD = 0; var JumBPDT = 0;
            var JumSMP = 0; var JumSMPT = 0;
            var JumSMA = 0; var JumSMAT = 0;
            var JumSarjana = 0; var JumSarjanaT = 0;

            for (i = 0; i < data.length; i++) {
                JumRT = data[i].JumRT; JumRTT = data[i].JumRTT;
                JumRW = data[i].JumRW; JumRWT = data[i].JumRWT;

                JumKasipem = data[i].JumKasipem; JumKasipemT = data[i].JumKasipemT;
                JumKasikes = data[i].JumKasikes; JumKasikesT = data[i].JumKasikesT;

                JumKasipel = data[i].JumKasipel; JumKasipelT = data[i].JumKasipelT;
                JumKasun = data[i].JumKasun; JumKasunT = data[i].JumKasunT;
                JumKades = data[i].JumKades; JumKadesT = data[i].JumKadesT;
                JumSekdes = data[i].JumSekdes; JumSekdesT = data[i].JumSekdesT;
                JumTU = data[i].JumTU; JumTUT = data[i].JumTUT;

                JumKeu = data[i].JumKeu; JumKeuT = data[i].JumKeuT;
                JumRencana = data[i].JumRencana; JumRencanaT = data[i].JumRencanaT;
                JumBPD = data[i].JumBPD; JumBPDT = data[i].JumBPDT;
                JumSMP = data[i].JumSMP; JumSMPT = data[i].JumSMPT;
                JumSMA = data[i].JumSMA; JumSMAT = data[i].JumSMAT;
                JumSarjana = data[i].JumSarjana; JumSarjanaT = data[i].JumSarjanaT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (JumRTT == 0) { PJumRT = 100; } else { PJumRT = ((JumRTT / JumRT)).toFixed(1); }
            if (JumRWT == 0) { PJumRW = 100; } else { PJumRW = ((JumRWT / JumRW)).toFixed(1); }
            if (JumKasipemT == 0) { PJumKasipem = 100; } else { PJumKasipem = ((JumKasipemT / JumKasipem)).toFixed(1); }
            if (JumKasikesT == 0) { PJumKasikes = 100; } else { PJumKasikes = ((JumKasikesT / JumKasikes)).toFixed(1); }
            if (JumKasipelT == 0) { PJumKasipel = 100; } else { PJumKasipel = ((JumKasipelT / JumKasipel)).toFixed(1); }
            if (JumKasunT == 0) { PJumKasun = 100; } else { PJumKasun = ((JumKasunT / JumKasun)).toFixed(1); }
            if (JumKadesT == 0) { PJumKades = 100; } else { PJumKades = ((JumKadesT / JumKades)).toFixed(1); }
            if (JumSekdesT == 0) { PJumSekdes = 100; } else { PJumSekdes = ((JumSekdesT / JumSekdes)).toFixed(1); }
            if (JumTUT == 0) { PJumTU = 100; } else { PJumTU = ((JumTUT / JumTU)).toFixed(1); }

            if (JumKeuT == 0) { PJumKeu = 100; } else { PJumKeu = ((JumKeuT / JumKeu)).toFixed(1); }
            if (JumRencanaT == 0) { PJumRencana = 100; } else { PJumRencana = ((JumRencanaT / JumRencana)).toFixed(1); }
            if (JumBPDT == 0) { PJumBPD = 100; } else { PJumBPD = ((JumBPDT / JumBPD)).toFixed(1); }
            if (JumSMPT == 0) { PJumSMP = 100; } else { PJumSMP = ((JumSMPT / JumSMP)).toFixed(1); }
            if (JumSMAT == 0) { PJumSMA = 100; } else { PJumSMA = ((JumSMAT / JumSMA)).toFixed(1); }
            if (JumSarjanaT == 0) { PJumSarjana = 100; } else { PJumSarjana = ((JumSarjanaT / JumSarjana)).toFixed(1); }

            if (parseInt(JumRTT) > parseInt(JumRT)) {
                var tandaupdwnmikro = "fa-caret-down text-danger";
            } else {
                var tandaupdwnmikro = "fa-caret-up text-primary";
            }

            if (parseInt(JumRWT) > parseInt(JumRW)) {
                var tandaupdwnkoperasi = "fa-caret-down text-danger";
            } else {
                var tandaupdwnkoperasi = "fa-caret-up text-primary";
            }

            if (parseInt(JumKasipemT) > parseInt(JumKasipem)) {
                var tandaupdwnanggota = "fa-caret-down text-danger";
            } else {
                var tandaupdwnanggota = "fa-caret-up text-primary";
            }

            if (parseInt(JumKasikesT) > parseInt(JumKasikes)) {
                var tandaupdwnkary = "fa-caret-down text-danger";
            } else {
                var tandaupdwnkary = "fa-caret-up text-primary";
            }

            if (parseInt(JumKasipelT) > parseInt(JumKasipel)) {
                var tandaupdwnmodal = "fa-caret-down text-danger";
            } else {
                var tandaupdwnmodal = "fa-caret-up text-primary";
            }

            if (parseInt(JumKasunT) > parseInt(JumKasun)) {
                var tandaupdwnvol = "fa-caret-down text-danger";
            } else {
                var tandaupdwnvol = "fa-caret-up text-primary";
            }

            if (parseInt(JumKadesT) > parseInt(JumKades)) {
                var tandaupdwnshu = "fa-caret-down text-danger";
            } else {
                var tandaupdwnshu = "fa-caret-up text-primary";
            }

            if (parseInt(JumSekdesT) > parseInt(JumSekdes)) {
                var tandaupdwnsekdes = "fa-caret-down text-danger";
            } else {
                var tandaupdwnsekdes = "fa-caret-up text-primary";
            }

            if (parseInt(JumTUT) > parseInt(JumTU)) {
                var tandaupdwntu = "fa-caret-down text-danger";
            } else {
                var tandaupdwntu = "fa-caret-up text-primary";
            }

            if (parseInt(JumKeuT) > parseInt(JumKeu)) {
                var tandaupdwnkeu = "fa-caret-down text-danger";
            } else {
                var tandaupdwnkeu = "fa-caret-up text-primary";
            }

            if (parseInt(JumRencanaT) > parseInt(JumRencana)) {
                var tandaupdwnrencana = "fa-caret-down text-danger";
            } else {
                var tandaupdwnrencana = "fa-caret-up text-primary";
            }

            if (parseInt(JumBPDT) > parseInt(JumBPD)) {
                var tandaupdwnbpd = "fa-caret-down text-danger";
            } else {
                var tandaupdwnbpd = "fa-caret-up text-primary";
            }

            if (parseInt(JumSMPT) > parseInt(JumSMP)) {
                var tandaupdwnsmp = "fa-caret-down text-danger";
            } else {
                var tandaupdwnsmp = "fa-caret-up text-primary";
            }

            if (parseInt(JumSMAT) > parseInt(JumSMA)) {
                var tandaupdwnsma = "fa-caret-down text-danger";
            } else {
                var tandaupdwnsma = "fa-caret-up text-primary";
            }

            if (parseInt(JumSarjanaT) > parseInt(JumSarjana)) {
                var tandaupdwnsarjana = "fa-caret-down text-danger";
            } else {
                var tandaupdwnsarjana = "fa-caret-up text-primary";
            }

            $("#lbljumlahRT").html(formatRibuan(JumRT.toString()));
            $("#lbljumlahRW").html(formatRibuan(JumRW.toString()));
            $("#lbljumlahkasipem").html(formatRibuan(JumKasipem.toString()));
            $("#lbljumlahkasikes").html(formatRibuan(JumKasikes.toString()));
            $("#lbljumlahkasipel").html(formatRibuan(JumKasipel.toString()));
            $("#lbljumlahkasun").html(formatRibuan(JumKasun.toString()));
            $("#lbljumlahkepdes").html(formatRibuan(JumKades.toString()));

            $("#lbljumlahsekdes").html(formatRibuan(JumSekdes.toString()));
            $("#lbljumlahTU").html(formatRibuan(JumTU.toString()));
            $("#lbljumlahKeuangan").html(formatRibuan(JumKeu.toString()));
            $("#lbljumlahrencana").html(formatRibuan(JumRencana.toString()));
            $("#lbljumlahBPD").html(formatRibuan(JumBPD.toString()));
            $("#lbljumlahSMP").html(formatRibuan(JumSMP.toString()));
            $("#lbljumlahSMA").html(formatRibuan(JumSMA.toString()));
            $("#lbljumlahSarjana").html(formatRibuan(JumSarjana.toString()));

            $("#lblketjumlahRT").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumRTT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnmikro + '"></span>' + PJumRT + ' %</h6>');
            $("#lblketjumlahRW").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumRWT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnkoperasi + '"></span>' + PJumRW + ' %</h6>');
            $("#lblketjumlahkasipem").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumKasipemT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnanggota + '"></span>' + PJumKasipem + ' %</h6>');
            $("#lblketjumlahkasikes").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumKasikesT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnkary + '"></span>' + PJumKasikes + ' %</h6>');
            $("#lblketjumlahkasipel").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumKasipelT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnmodal + '"></span>' + PJumKasipel + ' %</h6>');
            $("#lblketjumlahkasun").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumKasunT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnvol + '"></span>' + PJumKasun + ' %</h6>');
            $("#lblketjumlahkepdes").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumKadesT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnshu + '"></span>' + PJumKades + ' %</h6>');

            $("#lblketjumlahsekdes").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumSekdesT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnsekdes + '"></span>' + PJumSekdes + ' %</h6>');
            $("#lblketjumlahTU").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumTUT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwntu + '"></span>' + PJumTU + ' %</h6>');
            $("#lblketjumlahKeuangan").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumKeuT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnkeu + '"></span>' + PJumKeu + ' %</h6>');
            $("#lblketjumlahrencana").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumRencanaT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnrencana + '"></span>' + PJumRencana + ' %</h6>');
            $("#lblketjumlahBPD").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumBPDT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnbpd + '"></span>' + PJumBPD + ' %</h6>');
            $("#lblketjumlahSMP").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumSMPT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnsmp + '"></span>' + PJumSMP + ' %</h6>');
            $("#lblketjumlahSMA").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumSMAT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnsma + '"></span>' + PJumSMA + ' %</h6>');
            $("#lblketjumlahSarjana").html(
                '<h6 class="fs--2 text-700 mb-0">' + thnsblm + ' : ' + formatRibuan(JumSarjanaT.toString()) + ' </h6>' +
                '<h6 class="fs--2 ps-3 mb-0 text-primary"><span class="me-1 fas ' + tandaupdwnsarjana + '"></span>' + PJumSarjana + ' %</h6>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikKasiKasunPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_kasi_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_kasi_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_kasi_kecamatan_pie.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumKasipem = []; var jumKasiKes = [];jumKasipel = [];jumKasun = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumKasipem.push(jum.jumKasipem);
                jumKasiKes.push(jum.jumKasiKes);
                jumKasipel.push(jum.jumKasipel);
                jumKasun.push(jum.jumKasun);
            });

            datax = [jumKasipem, jumKasiKes,jumKasipel,jumKasun];
            legend = ['Kasipem', 'Kasikes', 'Kasipel', 'Kasun'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungUsahaMikroPie');
            hitChartContent.innerHTML = '';
            $('#hitungUsahaMikroPie').append('<canvas id="usahaMikroPie" height="250px"><canvas>');

            var salesChartCanvas = $('#usahaMikroPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah',
                        data: datax,
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor
                    }
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 255, 255,0.9)'
                    }
                },

                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'pie',
                data: salesChartData,
                options: salesChartOptions
            }
            )
            document.body.style.cursor = "default";
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPegawaiPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_pegawai_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_pegawai_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_pegawai_kecamatan_pie.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumSekdes = []; var jumTU = []; var jumKeu = [];var jumRencana = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumSekdes.push(jum.jumSekdes);
                jumTU.push(jum.jumTU);
                jumKeu.push(jum.jumKeu);jumRencana.push(jum.jumRencana);
            });

            datax = [jumSekdes, jumTU, jumKeu, jumRencana];
            legend = ['Sekdes', 'TU', 'Keuangan', 'Perencanaan'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungKondisiKoperasiPie');
            hitChartContent.innerHTML = '';
            $('#hitungKondisiKoperasiPie').append('<canvas id="KondisiKoperasiPie" height="250px"><canvas>');

            var salesChartCanvas = $('#KondisiKoperasiPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah',
                        data: datax,
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor
                    }
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 255, 255,0.9)'
                    }
                },

                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'pie',
                data: salesChartData,
                options: salesChartOptions
            }
            )
            document.body.style.cursor = "default";
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPendidikanKadesPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_pendidikan_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_pendidikan_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_pendidikan_kecamatan_pie.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumSMP = []; var jumSMA = [];var jumSarjana = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumSMP.push(jum.jumSMP);
                jumSMA.push(jum.jumSMA);
                jumSarjana.push(jum.jumSarjana);
            });

            datax = [jumSMP, jumSMA, jumSarjana];
            legend = ['SMP', 'SMA', 'Sarjana'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungAnggotaPie');
            hitChartContent.innerHTML = '';
            $('#hitungAnggotaPie').append('<canvas id="AnggotaPie" height="250px"><canvas>');

            var salesChartCanvas = $('#AnggotaPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah',
                        data: datax,
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor
                    }
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 255, 255,0.9)'
                    }
                },

                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'pie',
                data: salesChartData,
                options: salesChartOptions
            }
            )
            document.body.style.cursor = "default";
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}


