$("#lv_kota").on("click", function () {
    bersihkan();
    $("#area-halaman").fadeIn();

    $("#txttransketerangan").val("kota");
    var tahunakhir = $("#lbltahunakhir").val();
    $("#txttranstahun").val(tahunakhir);

    var nmwilayah = "Kabupaten Jember";
    $(".lblkoparea").text(" - 5 Tahun " + nmwilayah);
   
    isiDataStatistik();
    GrafikKategoriAtlet();GrafikTingkat();GrafikPerolehanMedali();
    
    $("#lblhalaman").val("dashboard");
});

$(".lv_kecamatan").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var kegiatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nama');
    var tahunakhir = $("#lbltahunakhir").val();
    $(".lblkoparea").text(" - 5 Tahun " + nmwilayah);
    $("#txttransid").val(kegiatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);

    isiDataStatistik();
    GrafikKategoriAtlet();GrafikTingkat();GrafikPerolehanMedali();
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

var ctx = document.getElementById('AtletChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function isiDataStatistik() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
    $("#lbljumlahatlet").html(""); $("#lbljumlahemas").html("");
    $("#lbljumlahperak").html(""); $("#lbljumlahperunggu").html("");
    $("#areastatistikdispora").html("");
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
            var jmlTotalAtlet = 0;var JumEmas = 0;var JumPerak = 0;var JumPerunggu = 0;
            for (i = 0; i < data.length; i++) {
                jmlTotalAtlet = data[i].jmlTotalAtlet;
                JumEmas = data[i].JumEmas;
                JumPerak = data[i].JumPerak;
                JumPerunggu = data[i].JumPerunggu;
            }

            $("#lbljumlahatlet").html(formatRibuan(jmlTotalAtlet.toString()));
            $("#lbljumlahemas").html(formatRibuan(JumEmas.toString()));
            $("#lbljumlahperak").html(formatRibuan(JumPerak.toString()));
            $("#lbljumlahperunggu").html(formatRibuan(JumPerunggu.toString()));
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikKategoriAtlet() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_atlet.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_atlet_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_atlet_kecamatan.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var jumKab = []; var jumProv = [];var jumNas = [];var jumInter = [];var jumAsean = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push("Tahun "+jum.nmTahun);
                jumKab.push(jum.jumKab);jumProv.push(jum.jumProv);
                jumNas.push(jum.jumNas);jumInter.push(jum.jumInter);
                jumAsean.push(jum.jumAsean);
            });

            var hitChartContent = document.getElementById('hitungAtletChart');
            hitChartContent.innerHTML = '';
            $('#hitungAtletChart').append('<canvas id="AtletChart" height="300px"><canvas>');

            var salesChartCanvas = $('#AtletChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    //["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                    {
                        label: 'Atlet Kabupaten',
                        backgroundColor: "#FF4136",
                        borderColor: "#FF4136",
                        data: jumKab,
                    },
                    {
                        label: 'Atlet Provinsi',
                        backgroundColor: "#2ECC40",
                        borderColor: "#2ECC40",
                        data: jumProv,
                    },
                    {
                        label: 'Atlet Nasional',
                        backgroundColor: "#FF851B",
                        borderColor: "#FF851B",
                        data: jumNas,
                    },
                    {
                        label: 'Atlet Internasional',
                        backgroundColor: "#7FDBFF",
                        borderColor: "#7FDBFF",
                        data: jumInter,
                    },
                    {
                        label: 'Atlet Asean',
                        backgroundColor: "#B10DC9",
                        borderColor: "#B10DC9",
                        data: jumAsean,
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
                    display: true
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
                        barPercentage: 0.8
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.8
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

function GrafikTingkat() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_tingkat.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_tingkat_kecamatan.php"; }
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
            var jumKab = [];var jumProv = [];var jumNas = [];var jumInter = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push("Tahun "+jum.nmTahun);
                jumKab.push(jum.jumKab);jumProv.push(jum.jumProv);
                jumNas.push(jum.jumNas);jumInter.push(jum.jumInter);
            });
            
            var hitChartContent = document.getElementById('hitungTingkatChart');
            hitChartContent.innerHTML = '';
            $('#hitungTingkatChart').append('<canvas id="tingkatChart" height="300px"><canvas>');

            var salesChartCanvas = $('#tingkatChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    //["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                    {
                        label: 'Kabupaten',
                        backgroundColor: "#FF4136",
                        borderColor: "#FF4136",
                        data: jumKab,
                    },
                    {
                        label: 'Provinsi',
                        backgroundColor: "#2ECC40",
                        borderColor: "#2ECC40",
                        data: jumProv,
                    },
                    {
                        label: 'Nasional',
                        backgroundColor: "#FF851B",
                        borderColor: "#FF851B",
                        data: jumNas,
                    },
                    {
                        label: 'Internasional',
                        backgroundColor: "#7FDBFF",
                        borderColor: "#7FDBFF",
                        data: jumInter,
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
                    display: true
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

function GrafikPerolehanMedali() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_medali.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_medali_kecamatan.php"; }
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
            var jumEmas = [];
            var jumPerak = [];var jumPerunggu = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push("Tahun "+jum.nmTahun);
                jumEmas.push(jum.jumEmas);
                jumPerak.push(jum.jumPerak);
                jumPerunggu.push(jum.jumPerunggu);
            });
            
            var hitChartContent = document.getElementById('hitungMedaliChart');
            hitChartContent.innerHTML = '';
            $('#hitungMedaliChart').append('<canvas id="madaliChart" height="300px"><canvas>');

            var salesChartCanvas = $('#madaliChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    //["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                    {
                        label: 'Emas',
                        backgroundColor: "#FFD700",
                        borderColor: "#FFD700",
                        data: jumEmas,
                    },
                    {
                        label: 'Perak',
                        backgroundColor: "#C0C0C0",
                        borderColor: "#C0C0C0",
                        data: jumPerak,
                    },
                    {
                        label: 'Perunggu',
                        backgroundColor: "#CD7F32",
                        borderColor: "#CD7F32",
                        data: jumPerunggu,
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
                    display: true
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
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}


