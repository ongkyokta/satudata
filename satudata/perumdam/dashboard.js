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
    GrafikProduksi();GrafikPenjualan();GrafikPerkembangan();
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
    GrafikProduksi();GrafikPenjualan();GrafikPerkembangan();

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
    GrafikProduksi();GrafikPenjualan();GrafikPerkembangan();
});

$(".lv_desa").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var idkecamatan = $(this).data('idkec');var tahun = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nmkecamatan');
    //var tahunakhir = $("#lbltahunakhir").val();
    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahun + " : " + parseInt(tahun - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahun);

    isiDataStatistik();
    GrafikProduksi();GrafikPenjualan();GrafikPerkembangan();
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

var ctx = document.getElementById('perkembanganChart').getContext("2d")
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

    $("#lbljumlahproduksi").html(""); $("#lbljumlahpelanggan").html("");
    $("#lbljumlahpenjualan").html(""); $("#lbljumlahperkembangancus").html("");
    $("#areastatistikperumdam").html("");
    var tahun = $("#txttranstahun").val();
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
            document.body.style.cursor = "default";
            var i;
            var html = "";

            var JumProd = 0;var JumProdT = 0;
            var JumCus = 0;var JumCusT = 0;
            
            var JumJual = 0;var JumJualT = 0;
            var JumPer = 0;var JumPerT = 0;
 
            for (i = 0; i < data.length; i++) {
                JumProd = data[i].JumProd;JumProdT = data[i].JumProdT;
                JumCus = data[i].JumCus;JumCusT = data[i].JumCusT;

                JumJual = data[i].JumJual;JumJualT = data[i].JumJualT;
                JumPer = data[i].JumPer;JumPerT = data[i].JumPerT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }
        
            PJumProd = ((JumProdT / JumProd)).toFixed(2);
            PJumCus = ((JumCusT / JumCus)).toFixed(2);
            PJumJual = ((JumJualT / JumJual)).toFixed(2);
            PJumPer = ((JumPerT / JumPer)).toFixed(2);

            if (parseInt(JumProdT) > parseInt(JumProd)) {
                var tandaupdwnKIR = "fa-caret-down text-danger";
            } else {
                var tandaupdwnKIR = "fa-caret-up text-primary";
            }

            if (parseInt(JumCusT) > parseInt(JumCus)) {
                var tandaupdwnLaka = "fa-caret-down text-danger";
            } else {
                var tandaupdwnLaka = "fa-caret-up text-primary";
            }

            if (parseInt(JumJualT) > parseInt(JumJual)) {
                var tandaupdwnsarana = "fa-caret-down text-danger";
            } else {
                var tandaupdwnsarana = "fa-caret-up text-primary";
            }

            if (parseInt(JumPerT) > parseInt(JumPer)) {
                var tandaupdwnTrayek = "fa-caret-down text-danger";
            } else {
                var tandaupdwnTrayek = "fa-caret-up text-primary";
            }

            $("#lbljumlahproduksi").html(formatRibuan(JumProd.toString()));
            $("#lbljumlahpelanggan").html(formatRibuan(JumCus.toString()));
            $("#lbljumlahpenjualan").html(formatRibuan(JumJual.toString()));
            $("#lbljumlahperkembangancus").html(formatRibuan(JumPer.toString()));
            
            $("#areastatistikperumdam").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumProd.toString()) + ' : ' + formatRibuan(JumProdT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKIR + ' me-2"></span>' + PJumProd + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-danger border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumCus + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumCus.toString()) + ' : ' + formatRibuan(JumCusT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnLaka + ' me-2"></span>' + PJumCus + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumJual + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumJual.toString()) + ' : ' + formatRibuan(JumJualT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnsarana + ' me-2"></span>' + PJumJual + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-success border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumPer + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumPer.toString()) + ' : ' + formatRibuan(JumPerT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnTrayek + ' me-2"></span>' + PJumPer + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikProduksi() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_produksi.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var jumProd = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                jumProd.push(jum.jumProd);
            });

            var hitChartContent = document.getElementById('hitungChartProduksi');
            hitChartContent.innerHTML = '';
            $('#hitungChartProduksi').append('<canvas id="produksiChart" height="250px"><canvas>');

            var salesChartCanvas = $('#produksiChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Produksi Air Minum',
                        backgroundColor: '#007FFF',
                        borderColor: '#007FFF',
                        data: jumProd,
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

function GrafikPerkembangan() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_perkembangan.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_laka_lintas_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_laka_lintas_desa.php"; }
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_perkembangan.php",
        data: { idarea: idarea,tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var kelompok = [];
            var jmlpelanggan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                kelompok.push(jum.kelompok);
                jmlpelanggan.push(jum.jmlpelanggan);
            });

            var hitChartContent = document.getElementById('hitungPerkembanganChart');
            hitChartContent.innerHTML = '';
            $('#hitungPerkembanganChart').append('<canvas id="perkembanganChart" height="250px"><canvas>');

            var salesChartCanvas = $('#perkembanganChart').get(0).getContext('2d')
            var salesChartData = {
                labels: kelompok,
                datasets: [
                    {
                        label: 'Pelanggan',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jmlpelanggan,
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

            //$("#loading").fadeOut("slow");
            document.body.style.cursor = "default";

        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPenjualan() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_penjualan.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_penjualan_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_penjualan_kecamatan.php"; }
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
            var jumCus = []; var jumJual = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumCus.push(jum.jumCus);
                jumJual.push(jum.jumJual);
            });

            var hitChartContent = document.getElementById('hitungPenjualanPie');
            hitChartContent.innerHTML = '';
            $('#hitungPenjualanPie').append('<canvas id="penjualansPie" height="250px"><canvas>');

            var salesChartCanvas = $('#penjualansPie').get(0).getContext('2d')
            var salesChartData = {
                labels: ['Pelanggan','Penjualan'],
                datasets: [
                    {
                        label: 'Pelanggan',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumCus,
                    },
                    {
                        label: 'penjualan',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumJual,
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