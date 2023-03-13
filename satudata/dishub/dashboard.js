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

    isiDataStatistikLaka();
    grafikLakaLintas();grafikLakaLintasPie();
    
    isiDataStatistikSarpras();
    GrafikKIR();GrafikLaka();GrafikSarpras();GrafikTrayek();GrafikPenumpang();GrafikArmada();

    $("#halaman-area-pengaduan").fadeIn();
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

    isiDataStatistikLaka();
    grafikLakaLintas();grafikLakaLintasPie();
 
    isiDataStatistikSarpras();
    GrafikKIR();GrafikLaka();GrafikSarpras();GrafikTrayek();GrafikPenumpang();GrafikArmada();

    $("#halaman-area-pengaduan").fadeIn();
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

    $("#halaman-area-pengaduan").fadeOut("slow");
    isiDataStatistikLaka();
    grafikLakaLintas();grafikLakaLintasPie();
});

$(".lv_desa").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var iddesa = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nmkecamatan');
    var tahunakhir = $("#lbltahunakhir").val();
    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);
    $("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);

    $("#halaman-area-pengaduan").fadeOut("slow");
    isiDataStatistikLaka();
    grafikLakaLintas();grafikLakaLintasPie();
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

/*===================================
======== STATISTIK LAKA =============
===================================*/
function isiDataStatistikLaka() {

    $("#lbljumlahMeninggal").html(""); $("#lbljumlahLukaBerat").html("");
    $("#lbljumlahLukaRingan").html("");
    $("#areastatistikLaka").html("");

    var tahun = $("#txttranstahun").val();
    var keterangan = $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik_laka.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_laka_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_data_statistik_laka_desa.php"; }
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
            var html = "";
 
            var JumMeninggal = 0; var JumBerat = 0; var JumRingan = 0;
            var JumMeninggalT = 0; var JumBeratT = 0; var JumRinganT = 0;
            for (i = 0; i < data.length; i++) {
                JumMeninggal = data[i].JumMeninggal;
                JumBerat = data[i].JumBerat;
                JumRingan = data[i].JumRingan;

                JumMeninggalT = data[i].JumMeninggalT;
                JumBeratT = data[i].JumBeratT;
                JumRinganT = data[i].JumRinganT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (JumMeninggalT >= JumMeninggal) {
                PJumMeninggal = ((JumMeninggal / JumMeninggalT) * (100)).toFixed(2);
                var tandaupdwnKBBaru = "fa-caret-up text-primary";
            } else if (JumMeninggalT <= JumMeninggal) {
                PJumMeninggal = ((JumMeninggalT / JumMeninggal) * (100)).toFixed(2);
                var tandaupdwnKBBaru = "fa-caret-down text-danger";
            }

            if (JumBeratT >= JumBerat) {
                PJumBerat = ((JumBerat / JumBeratT) * (100)).toFixed(2);
                var tandaupdwnKBAktif = "fa-caret-up text-primary";
            } else if (JumBeratT <= JumBerat) {
                PJumBerat = ((JumBeratT / JumBerat) * (100)).toFixed(2);
                var tandaupdwnKBAktif = "fa-caret-down text-danger";
            }

            if (JumRinganT >= JumRingan) {
                PJumRingan = ((JumRingan / JumRinganT) * (100)).toFixed(2);
                var tandaupdwnKeras = "fa-caret-up text-primary";
            } else if (JumRinganT <= JumRingan) {
                PJumRingan = ((JumRinganT / JumRingan) * (100)).toFixed(2);
                var tandaupdwnKeras = "fa-caret-down text-danger";
            }

            if(isNaN(PJumMeninggal)){PJumMeninggal=0;}else{PJumMeninggal=PJumMeninggal;}
            if(isNaN(PJumBerat)){PJumBerat=0;}else{PJumBerat=PJumBerat;}
            if(isNaN(PJumRingan)){PJumRingan=0;}else{PJumRingan=PJumRingan;}

            $("#lbljumlahMeninggal").html(formatRibuan(JumMeninggal.toString()));
            $("#lbljumlahLukaBerat").html(formatRibuan(JumBerat.toString()));
            $("#lbljumlahLukaRingan").html(formatRibuan(JumRingan.toString()));

            $("#areastatistikLaka").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:33%" aria-valuenow="33%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumMeninggal.toString()) + ' : ' + formatRibuan(JumMeninggalT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBAktif + ' me-2"></span>' + PJumMeninggal + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:34%" aria-valuenow="' + PJumBerat + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumBerat.toString()) + ' : ' + formatRibuan(JumBeratT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBBaru + ' me-2"></span>' + PJumBerat + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"' +
                'role="progressbar" style="width:33%" aria-valuenow="' + PJumRingan + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumRingan.toString()) + ' : ' + formatRibuan(JumRinganT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKeras + ' me-2"></span>' + PJumRingan + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
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

var ctx = document.getElementById('LakaLintasChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function grafikLakaLintasPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_pie_laka.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_pie_laka_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_pie_laka_desa.php"; }
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
            var jumMeninggal = []; var jumBerat = [];var jumRingan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumMeninggal.push(jum.jumMeninggal);
                jumBerat.push(jum.jumBerat);
                jumRingan.push(jum.jumRingan);
            });

            datax = [jumMeninggal, jumBerat, jumRingan];
            legend = ['Meninggal', 'Luka Berat', 'Luka Ringan'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungLakaLintasPie');
            hitChartContent.innerHTML = '';
            $('#hitungLakaLintasPie').append('<canvas id="LakaLintasPie" height="250px"><canvas>');

            var salesChartCanvas = $('#LakaLintasPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah Kecelakaan',
                        data: datax,
                        backgroundColor: ['#2ECC40', 'rgb(255, 99, 132)'],
                        borderColor: ['#2ECC40', 'rgb(255, 99, 132)']
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

function grafikLakaLintas() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_laka_lintas.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_laka_lintas_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_laka_lintas_desa.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea,tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var jummeninggal = []; var jumberat = [];var jumringan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                jummeninggal.push(jum.jummeninggal);
                jumberat.push(jum.jumberat);
                jumringan.push(jum.jumringan);
            });

            var hitChartContent = document.getElementById('hitungLakaLintasChart');
            hitChartContent.innerHTML = '';
            $('#hitungLakaLintasChart').append('<canvas id="LakaLintasChart" height="250px"><canvas>');

            var salesChartCanvas = $('#LakaLintasChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Meninggal',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: jummeninggal,
                    },
                    {
                        label: 'Luka Berat',
                        backgroundColor: '#FF851B',
                        borderColor: '#FF851B',
                        data: jumberat,
                    },
                    {
                        label: 'Luka Ringan',
                        backgroundColor: '#2ECC40',
                        borderColor: '#2ECC40',
                        data: jumringan,
                    },
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })

            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";

        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function isiDataStatistikSarpras() {
    $("#lbljumlahUjiKIR").html(""); $("#lbljumlahLakaLintas").html("");
    $("#lbljumlahSarpras").html(""); $("#lbljumlahTrayek").html("");
    $("#lbljumlahPenumpang").html(""); $("#lbljumlahArmada").html("");
    $("#areastatistikSarpras").html("");
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_data_statistik_sarpras.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var i;
            var html = "";

            var JumKIR = 0;var JumKIRT = 0;
            var JumLaka = 0;var JumLakaT = 0;
            
            var JumSarana = 0;var JumSaranaT = 0;
            var JumTrayek = 0;var JumTrayekT = 0;
            var JumPenumpang = 0;var JumPenumpangT = 0;
            var JumArmada = 0;var JumArmadaT = 0;

            for (i = 0; i < data.length; i++) {
                JumKIR = data[i].JumKIR;JumKIRT = data[i].JumKIRT;
                JumLaka = data[i].JumLaka;JumLakaT = data[i].JumLakaT;

                JumSarana = data[i].JumSarana;JumSaranaT = data[i].JumSaranaT;
                JumTrayek = data[i].JumTrayek;JumTrayekT = data[i].JumTrayekT;

                JumPenumpang = data[i].JumPenumpang;JumPenumpangT = data[i].JumPenumpangT;
                JumArmada = data[i].JumArmada;JumArmadaT = data[i].JumArmadaT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (JumKIRT >= JumKIR) {
                PJumKIR = ((JumKIR / JumKIRT) * (100)).toFixed(2);
                var tandaupdwnKIR = "fa-caret-up text-primary";
            } else if (JumKIRT <= JumKIR) {
                PJumKIR = ((JumKIRT / JumKIR) * (100)).toFixed(2);
                var tandaupdwnKIR = "fa-caret-down text-danger";
            }

            if (JumLakaT >= JumLaka) {
                PJumLaka = ((JumLaka / JumLakaT) * (100)).toFixed(2);
                var tandaupdwnLaka = "fa-caret-up text-primary";
            } else if (JumLakaT <= JumLaka) {
                PJumLaka = ((JumLakaT / JumLaka) * (100)).toFixed(2);
                var tandaupdwnLaka = "fa-caret-down text-danger";
            }

            if (JumSaranaT >= JumSarana) {
                PJumSarana = ((JumSarana / JumSaranaT) * (100)).toFixed(2);
                var tandaupdwnsarana = "fa-caret-up text-primary";
            } else if (JumSaranaT <= JumSarana) {
                PJumSarana = ((JumSaranaT / JumSarana) * (100)).toFixed(2);
                var tandaupdwnsarana = "fa-caret-down text-danger";
            }

            if (JumTrayekT >= JumTrayek) {
                PJumTrayek = ((JumTrayek / JumTrayekT) * (100)).toFixed(2);
                var tandaupdwnTrayek = "fa-caret-up text-primary";
            } else if (JumTrayekT <= JumTrayek) {
                PJumTrayek = ((JumTrayekT / JumTrayek) * (100)).toFixed(2);
                var tandaupdwnTrayek = "fa-caret-down text-danger";
            }

            if (JumPenumpangT >= JumPenumpang) {
                PJumPenumpang = ((JumPenumpang / JumPenumpangT) * (100)).toFixed(2);
                var tandaupdwnPenumpang = "fa-caret-up text-primary";
            } else if (JumPenumpangT <= JumPenumpang) {
                PJumPenumpang = ((JumPenumpangT / JumPenumpang) * (100)).toFixed(2);
                var tandaupdwnPenumpang = "fa-caret-down text-danger";
            }

            if (JumArmadaT >= JumArmada) {
                PJumArmada = ((JumArmada / JumArmadaT) * (100)).toFixed(2);
                var tandaupdwnArmada = "fa-caret-up text-primary";
            } else if (JumArmadaT <= JumArmada) {
                PJumArmada = ((JumArmadaT / JumArmada) * (100)).toFixed(2);
                var tandaupdwnArmada = "fa-caret-down text-danger";
            }

            $("#lbljumlahUjiKIR").html(formatRibuan(JumKIR.toString()));
            $("#lbljumlahLakaLintas").html(formatRibuan(JumLaka.toString()));
            $("#lbljumlahSarpras").html(formatRibuan(JumSarana.toString()));
            $("#lbljumlahTrayek").html(formatRibuan(JumTrayek.toString()));
            $("#lbljumlahPenumpang").html(formatRibuan(JumPenumpang.toString())); 
            $("#lbljumlahArmada").html(formatRibuan(JumArmada.toString()));

            $("#areastatistikSarpras").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumKIR.toString()) + ' : ' + formatRibuan(JumKIRT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKIR + ' me-2"></span>' + PJumKIR + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-danger border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumLaka + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumLaka.toString()) + ' : ' + formatRibuan(JumLakaT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnLaka + ' me-2"></span>' + PJumLaka + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumSarana + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumSarana.toString()) + ' : ' + formatRibuan(JumSaranaT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnsarana + ' me-2"></span>' + PJumSarana + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-success border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumTrayek + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumTrayek.toString()) + ' : ' + formatRibuan(JumTrayekT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnTrayek + ' me-2"></span>' + PJumTrayek + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumPenumpang + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumPenumpang.toString()) + ' : ' + formatRibuan(JumPenumpangT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnPenumpang + ' me-2"></span>' + PJumPenumpang + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-primary rounded-start rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumArmada + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumArmada.toString()) + ' : ' + formatRibuan(JumArmadaT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnArmada + ' me-2"></span>' + PJumArmada + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikKIR() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_KIR.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var jumkir = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                jumkir.push(jum.jumKIR);
            });

            var hitChartContent = document.getElementById('hitungChartUjiKIR');
            hitChartContent.innerHTML = '';
            $('#hitungChartUjiKIR').append('<canvas id="ujiKIRChart" height="250px"><canvas>');

            var salesChartCanvas = $('#ujiKIRChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Uji KIR',
                        backgroundColor: '#007FFF',
                        borderColor: '#007FFF',
                        data: jumkir,
                    },
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikLaka() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_laka.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var jumlaka = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                jumlaka.push(jum.jumLaka);
            });

            var hitChartContent = document.getElementById('hitungChartLakaPerlintasan');
            hitChartContent.innerHTML = '';
            $('#hitungChartLakaPerlintasan').append('<canvas id="LakaPerlintasanChart" height="250px"><canvas>');

            var salesChartCanvas = $('#LakaPerlintasanChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Kecelakaan Perlintasan',
                        backgroundColor: '#FF4136',
                        borderColor: '#FF4136',
                        data: jumlaka,
                    },
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikSarpras() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_sarpras.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var trafik = [];var warning = [];var halte = [];var terminal = [];
            var poslintas = [];//var rambu = [];
            var rppaj = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                trafik.push(jum.trafik);warning.push(jum.warning);halte.push(jum.halte);terminal.push(jum.terminal);
                poslintas.push(jum.poslintas);//rambu.push(jum.rambu);
                rppaj.push(jum.rppaj);
            });
 
            var hitChartContent = document.getElementById('hitungChartSarpras');
            hitChartContent.innerHTML = '';
            $('#hitungChartSarpras').append('<canvas id="SarprasChart" height="250px"><canvas>');

            var salesChartCanvas = $('#SarprasChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [//"#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE"
                    {label: 'Traffic Light',backgroundColor: '#FF4136',borderColor: '#FF4136',data: trafik,},
                    {label: 'Warning Light',backgroundColor: '#2ECC40',borderColor: '#2ECC40',data: warning,},
                    {label: 'Halte',backgroundColor: '#FF851B',borderColor: '#FF851B',data: halte,},
                    {label: 'Terminal',backgroundColor: '#7FDBFF',borderColor: '#7FDBFF',data: terminal,},
                    {label: 'Pos Lalu Lintas',backgroundColor: '#B10DC9',borderColor: '#B10DC9',data: poslintas,},
                    //{label: 'Rambu',backgroundColor: '#FFDC00',borderColor: '#FFDC00',data: rambu,},
                    {label: 'RPPAJ',backgroundColor: '#01FF70',borderColor: '#01FF70',data: rppaj,},
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.4
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikTrayek() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_trayek.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var jumkota = []; var jumdesa = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                jumkota.push(jum.jumkota);
                jumdesa.push(jum.jumdesa);
            });

            var hitChartContent = document.getElementById('hitungChartTrayek');
            hitChartContent.innerHTML = '';
            $('#hitungChartTrayek').append('<canvas id="TrayekChart" height="250px"><canvas>');

            var salesChartCanvas = $('#TrayekChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Perkotaan',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: jumkota,
                    },
                    {
                        label: 'Pedesaan',
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: jumdesa,
                    },
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })

            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";

        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPenumpang() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_penumpang.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var mpuberangkat = [];var mpudatang = [];var pesawatberangkat = [];var pesawatdatang = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                mpuberangkat.push(jum.mpuberangkat);mpudatang.push(jum.mpudatang);
                pesawatberangkat.push(jum.pesawatberangkat);pesawatdatang.push(jum.pesawatdatang);
            });
 
            var hitChartContent = document.getElementById('hitungChartPenumpang');
            hitChartContent.innerHTML = '';
            $('#hitungChartPenumpang').append('<canvas id="PenumpangChart" height="250px"><canvas>');

            var salesChartCanvas = $('#PenumpangChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [//"#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE"
                    {label: 'MPU Berangkat',backgroundColor: '#FF4136',borderColor: '#FF4136',data: mpuberangkat,},
                    {label: 'MPU Datang',backgroundColor: '#2ECC40',borderColor: '#2ECC40',data: mpudatang,},
                    {label: 'Pesawat Berangkat',backgroundColor: '#FF851B',borderColor: '#FF851B',data: pesawatberangkat,},
                    {label: 'Pesawat Datang',backgroundColor: '#7FDBFF',borderColor: '#7FDBFF',data: pesawatdatang,},
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikArmada() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_armada.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var mpuberangkat = [];var mpudatang = [];var pesawatberangkat = [];var pesawatdatang = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                mpuberangkat.push(jum.mpuberangkat);mpudatang.push(jum.mpudatang);
                pesawatberangkat.push(jum.pesawatberangkat);pesawatdatang.push(jum.pesawatdatang);
            });
 
            var hitChartContent = document.getElementById('hitungChartArmada');
            hitChartContent.innerHTML = '';
            $('#hitungChartArmada').append('<canvas id="ArmadaChart" height="250px"><canvas>');

            var salesChartCanvas = $('#ArmadaChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [//"#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE"
                    {label: 'MPU Berangkat',backgroundColor: '#39CCCC',borderColor: '#39CCCC',data: mpuberangkat,},
                    {label: 'MPU Datang',backgroundColor: '#2ECC40',borderColor: '#2ECC40',data: mpudatang,},
                    {label: 'Pesawat Berangkat',backgroundColor: '#85144b',borderColor: '#85144b',data: pesawatberangkat,},
                    {label: 'Pesawat Datang',backgroundColor: '#F012BE',borderColor: '#F012BE',data: pesawatdatang,},
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 8
                    },
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
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return data.datasets[tooltipItems.datasetIndex].label + ' : ' + tooltipItems.yLabel.toLocaleString();
                        }
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
                        gridLines: { display: false, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.6
                    }]
                }

            }
            var salesChart = new Chart(salesChartCanvas, {
                type: 'bar',
                data: salesChartData,
                options: salesChartOptions,
            })
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

