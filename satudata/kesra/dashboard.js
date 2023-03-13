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
    GrafikHibahPie();GrafikGuruPie();GrafikMudinPie();
    
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
    GrafikHibahPie();GrafikGuruPie();GrafikMudinPie();
    
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
    GrafikHibahPie();GrafikGuruPie();GrafikMudinPie();
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

    isiDataStatistik();
    GrafikHibahPie();GrafikGuruPie();GrafikMudinPie();
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
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_data_statistik_desa.php"; }

    $("#lbljumlahhibah").html(""); $("#lbljumlahgurungaji").html("");
    $("#lbljumlahmudin").html(""); 
    $("#areastatistikkesra").html("");
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
            var JumHibah = 0;var JumHibahT = 0;
            var JumGuru = 0;var JumGuruT = 0;
            var JumMudin = 0;var JumMudinT = 0;
            
            for (i = 0; i < data.length; i++) {
                JumHibah = data[i].JumHibah;JumHibahT = data[i].JumHibahT;
                JumGuru = data[i].JumGuru;JumGuruT = data[i].JumGuruT;
                JumMudin = data[i].JumMudin;JumMudinT = data[i].JumMudin;
                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            $("#lbljumlahhibah").html(formatRibuan(JumHibah.toString()));
            $("#lbljumlahgurungaji").html(formatRibuan(JumGuru.toString()));
            $("#lbljumlahmudin").html(formatRibuan(JumMudin.toString()));
  
            if (JumHibahT == 0){PJumHibah = 100;}else{PJumHibah = ((JumHibahT / JumHibah)).toFixed(1);}
            if (JumGuruT == 0){PJumGuru = 100;}else{PJumGuru = ((JumGuruT / JumGuru)).toFixed(1);}
            if (JumMudinT == 0){PJumMudin = 100;}else{PJumMudin = ((JumMudinT / JumMudin)).toFixed(1);}
 
            if (parseInt(JumHibahT) > parseInt(JumHibah)) {
                var tandaupdwnhibah = "fa-caret-down text-danger";
            } else {
                var tandaupdwnhibah = "fa-caret-up text-primary";
            }

            if (parseInt(JumGuruT) > parseInt(JumGuru)) {
                var tandaupdwnguru = "fa-caret-down text-danger";
            } else {
                var tandaupdwnguru = "fa-caret-up text-primary";
            }

            if (parseInt(JumMudinT) > parseInt(JumMudin)) {
                var tandaupdwnmudin = "fa-caret-down text-danger";
            } else {
                var tandaupdwnmudin = "fa-caret-up text-primary";
            }

            $("#areastatistikkesra").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:33%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumHibahT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnhibah + ' me-2"></span>' + PJumHibah + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
                'role="progressbar" style="width:34%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumGuruT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnguru + ' me-2"></span>' + PJumGuru + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:33%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumMudinT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnmudin + ' me-2"></span>' + PJumMudin + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikHibahPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    var ketbansos = "hibah";
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_hibah_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_hibah_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_hibah_desa_pie.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, ketbansos: ketbansos },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumInstansi = []; var jumLaki = [];var jumPerempuan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumInstansi.push(jum.jumInstansi);
                jumLaki.push(jum.jumLaki);jumPerempuan.push(jum.jumPerempuan);
            });

            datax = [jumInstansi, jumLaki, jumPerempuan];
            legend = ['Instansi', 'Laki-laki', 'Perempuan'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungHibahPie');
            hitChartContent.innerHTML = '';
            $('#hitungHibahPie').append('<canvas id="hibahPie" height="250px"><canvas>');

            var salesChartCanvas = $('#hibahPie').get(0).getContext('2d')
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

function GrafikGuruPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    var ketbansos = "guru";
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_hibah_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_hibah_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_hibah_desa_pie.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, ketbansos: ketbansos },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumInstansi = []; var jumLaki = [];var jumPerempuan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumInstansi.push(jum.jumInstansi);
                jumLaki.push(jum.jumLaki);jumPerempuan.push(jum.jumPerempuan);
            });

            datax = [jumInstansi, jumLaki, jumPerempuan];
            legend = ['Instansi', 'Laki-laki', 'Perempuan'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungGuruPie');
            hitChartContent.innerHTML = '';
            $('#hitungGuruPie').append('<canvas id="guruPie" height="250px"><canvas>');

            var salesChartCanvas = $('#guruPie').get(0).getContext('2d')
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

function GrafikMudinPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    var ketbansos = "mudin";
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_hibah_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_hibah_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_hibah_desa_pie.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, ketbansos: ketbansos },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumInstansi = []; var jumLaki = [];var jumPerempuan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumInstansi.push(jum.jumInstansi);
                jumLaki.push(jum.jumLaki);
                jumPerempuan.push(jum.jumPerempuan);
            });
            
            var hitChartContent = document.getElementById('hitungMudinPie');
            hitChartContent.innerHTML = '';
            $('#hitungMudinPie').append('<canvas id="mudinPie" height="250px"><canvas>');

            var salesChartCanvas = $('#mudinPie').get(0).getContext('2d')
            var salesChartData = {
                labels: ['Penerima Bansos P3n (Mudin)'],
                datasets: [
                    {
                        label: 'Organisasi',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumInstansi,
                    },
                    {
                        label: 'Laki-laki',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumLaki,
                    },
                    {
                        label: 'Perempuan',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumPerempuan,
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
                        barPercentage: 0.2
                    }],
                    yAxes: [{
                        ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                        gridLines: { display: true, color: "#0d6ecf" },
                        barPercentage: 0.2
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


