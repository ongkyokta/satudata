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
    $("#lblkopperbandinganarea").text("Tahun " + tahun + " : " + parseInt(tahun - 1) + " - " + nmwilayah);

    isiDataStatistikKB();
    grafikKBAktif();grafikTotalKBAktif();
    grafikKBBaru();grafikTotalKBBaru();

    isiDataStatistikPengaduan();
    GrafikPengaduanAnak();
    GrafikPengaduanPerempuan();

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
    $("#lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);

    isiDataStatistikKB();
    grafikKBAktif();grafikTotalKBAktif();
    grafikKBBaru();grafikTotalKBBaru();

    isiDataStatistikPengaduan();
    GrafikPengaduanAnak();
    GrafikPengaduanPerempuan();

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
    $("#lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);

    $("#halaman-area-pengaduan").fadeOut("slow");
    isiDataStatistikKB();
    grafikKBAktif();grafikTotalKBAktif();
    grafikKBBaru();grafikTotalKBBaru();
});

$(".lv_desa").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var idkecamatan = $(this).data('idkec'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nmkecamatan');
    var tahunakhir = $(this).data('tahun');
    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $("#lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);

    $("#halaman-area-pengaduan").fadeOut("slow");
    isiDataStatistikKB();
    grafikKBAktif();grafikTotalKBAktif();
    grafikKBBaru();grafikTotalKBBaru();
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

/*=================================
======== STATISTIK KB =============
=================================*/
function isiDataStatistikKB() {

    $("#lbljumlahKBAktif").html(""); $("#lbljumlahKBBaru").html("");
    $("#lbljumlahKekerasan").html("");
    $("#areastatistikKB").html("");

    var tahun = $("#txttranstahun").val();
    var keterangan = $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_data_statistik_desa.php"; }
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

            var JumKBBaru = 0; var JumKBAktif = 0; var jumtotalkekerasan = 0;
            var JumKBBaruT = 0; var JumKBAktifT = 0; var jumtotalkekerasanT = 0;
            for (i = 0; i < data.length; i++) {
                JumKBBaru = data[i].JumKBBaru;
                JumKBAktif = data[i].JumKBAktif;
                jumtotalkekerasan = data[i].jumtotalkekerasan;

                JumKBBaruT = data[i].JumKBBaruT;
                JumKBAktifT = data[i].JumKBAktifT;
                jumtotalkekerasanT = data[i].jumtotalkekerasanT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (JumKBBaruT >= JumKBBaru) {
                PJumKBBaru = ((JumKBBaru / JumKBBaruT) * (100)).toFixed(2);
                var tandaupdwnKBBaru = "fa-caret-up text-primary";
            } else if (JumKBBaruT <= JumKBBaru) {
                PJumKBBaru = ((JumKBBaruT / JumKBBaru) * (100)).toFixed(2);
                var tandaupdwnKBBaru = "fa-caret-down text-danger";
            }

            if (JumKBAktifT >= JumKBAktif) {
                PJumKBAktif = ((JumKBAktif / JumKBAktifT) * (100)).toFixed(2);
                var tandaupdwnKBAktif = "fa-caret-up text-primary";
            } else if (JumKBAktifT <= JumKBAktif) {
                PJumKBAktif = ((JumKBAktifT / JumKBAktif) * (100)).toFixed(2);
                var tandaupdwnKBAktif = "fa-caret-down text-danger";
            }

            if (jumtotalkekerasanT >= jumtotalkekerasan) {
                Pjumtotalkekerasan = ((jumtotalkekerasan / jumtotalkekerasanT) * (100)).toFixed(2);
                var tandaupdwnKeras = "fa-caret-up text-primary";
            } else if (jumtotalkekerasanT <= jumtotalkekerasan) {
                Pjumtotalkekerasan = ((jumtotalkekerasanT / jumtotalkekerasan) * (100)).toFixed(2);
                var tandaupdwnKeras = "fa-caret-down text-danger";
            }

            $("#lbljumlahKBAktif").html(formatRibuan(JumKBAktif.toString()));
            $("#lbljumlahKBBaru").html(formatRibuan(JumKBBaru.toString()));
            $("#lbljumlahKekerasan").html(formatRibuan(jumtotalkekerasan.toString()));

            $("#areastatistikKB").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:33%" aria-valuenow="33%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumKBAktif.toString()) + ' : ' + formatRibuan(JumKBAktifT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBAktif + ' me-2"></span>' + PJumKBAktif + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:34%" aria-valuenow="' + PJumKBBaru + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumKBBaru.toString()) + ' : ' + formatRibuan(JumKBBaruT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBBaru + ' me-2"></span>' + PJumKBBaru + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"' +
                'role="progressbar" style="width:33%" aria-valuenow="' + Pjumtotalkekerasan + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(jumtotalkekerasan.toString()) + ' : ' + formatRibuan(jumtotalkekerasanT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKeras + ' me-2"></span>' + Pjumtotalkekerasan + ' % </span></div>');
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

var ctx = document.getElementById('KBAktifChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function grafikTotalKBAktif() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_total_kb_aktif.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_total_kb_aktif_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_total_kb_aktif_tahun.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        async: false,
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var vallaki = []; var valwanita = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                vallaki.push(jum.jumAktifTotalSM);
                valwanita.push(jum.jumAktifTotalMKE);
            });

            datax = [vallaki, valwanita];
            legend = ['SM', 'MKE'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungKBAktifTotalPie');
            hitChartContent.innerHTML = '';
            $('#hitungKBAktifTotalPie').append('<canvas id="KBAktifTotalPie" height="250px"><canvas>');

            var salesChartCanvas = $('#KBAktifTotalPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah',
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
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function grafikKBAktif() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_kb_aktif.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_kb_aktif_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_kb_aktif_tahun.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        async: false,
        dataType: 'json',
        success: function (data) {
            var labels = []; var values = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                document.body.style.cursor = "default";
               
                labels.push('AKDR/IUD', 'MOP', 'MOW', 'SUSUK', 'SUNTIK', 'TABLET', 'KONDOM', 'OBAT');
                values.push(jum.jumAkdr, jum.jumMop, jum.jumMow, jum.jumSusuk, jum.jumSuntik, jum.jumTablet, jum.jumKondom, jum.jumObat);

                const allData = [];
                for (let i = 0; i < labels.length; ++i) {
                    allData.push({
                        label: labels[i],
                        data: values[i]
                    });
                }

                allData.sort((b, a) => a.data - b.data);

                const sortedLabels = allData.map(e => e.label);
                const sortedData = allData.map(e => e.data);

                var hitChartContent = document.getElementById('hitungKBAktifChart');
                hitChartContent.innerHTML = '';
                $('#hitungKBAktifChart').append('<canvas id="KBAktifChart" height="250px"><canvas>');

                var salesChartCanvas = $('#KBAktifChart').get(0).getContext('2d')
                var salesChartData = {
                    labels: sortedLabels,
                    datasets: [
                        {
                            label: 'Jumlah',
                            borderColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                            backgroundColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                            fill: true,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                            pointHoverBackgroundColor: 'rgb(54, 162, 235)',
                            pointHoverBorderColor: 'rgb(54, 162, 235)',
                            data: sortedData,
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
                            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                            gridLines: { display: false, color: "#0d6ecf" },
                            barPercentage: 0.4
                        }],
                        yAxes: [{
                            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                            gridLines: { display: true, color: "#0d6ecf" },
                            barPercentage: 0.4
                        }]
                    }

                }
                var salesChart = new Chart(salesChartCanvas, {
                    type: 'bar',
                    data: salesChartData,
                    options: salesChartOptions,
                })
            });
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function grafikTotalKBBaru() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_total_kb_baru.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_total_kb_baru_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_total_kb_baru_tahun.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        async: false,
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var vallaki = []; var valwanita = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                vallaki.push(jum.jumAktifTotalSM);
                valwanita.push(jum.jumAktifTotalMKE);
            });

            datax = [vallaki, valwanita];
            legend = ['SM', 'MKE'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungKBBaruTotalPie');
            hitChartContent.innerHTML = '';
            $('#hitungKBBaruTotalPie').append('<canvas id="KBBaruTotalPie" height="250px"><canvas>');

            var salesChartCanvas = $('#KBBaruTotalPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah',
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
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function grafikKBBaru() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_kb_baru.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_kb_baru_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_kb_baru_tahun.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun },
        async: false,
        dataType: 'json',
        success: function (data) {
            var labels = []; var values = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                document.body.style.cursor = "default";
                
                labels.push('AKDR/IUD', 'MOP', 'MOW', 'SUSUK', 'SUNTIK', 'TABLET', 'KONDOM', 'OBAT');
                values.push(jum.jumAkdr, jum.jumMop, jum.jumMow, jum.jumSusuk, jum.jumSuntik, jum.jumTablet, jum.jumKondom, jum.jumObat);

                const allData = [];
                for (let i = 0; i < labels.length; ++i) {
                    allData.push({
                        label: labels[i],
                        data: values[i]
                    });
                }

                allData.sort((b, a) => a.data - b.data);

                const sortedLabels = allData.map(e => e.label);
                const sortedData = allData.map(e => e.data);

                var hitChartContent = document.getElementById('hitungKBBaruChart');
                hitChartContent.innerHTML = '';
                $('#hitungKBBaruChart').append('<canvas id="KBBaruChart" height="250px"><canvas>');

                var salesChartCanvas = $('#KBBaruChart').get(0).getContext('2d')
                var salesChartData = {
                    labels: sortedLabels,
                    datasets: [
                        {
                            label: 'Jumlah',
                            borderColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                            backgroundColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                            fill: true,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                            pointHoverBackgroundColor: 'rgb(54, 162, 235)',
                            pointHoverBorderColor: 'rgb(54, 162, 235)',
                            data: sortedData,
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
                            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                            gridLines: { display: false, color: "#0d6ecf" },
                            barPercentage: 0.4
                        }],
                        yAxes: [{
                            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
                            gridLines: { display: true, color: "#0d6ecf" },
                            barPercentage: 0.4
                        }]
                    }

                }
                var salesChart = new Chart(salesChartCanvas, {
                    type: 'bar',
                    data: salesChartData,
                    options: salesChartOptions,
                })
            });
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function isiDataStatistikPengaduan() {
    $("#lbljumlahAduAnak").html(""); $("#lbljumlahSelesaiAnak").html("");
    $("#lbljumlahAduPerempuan").html(""); $("#lbljumlahSelesaiPerempuan").html("");
    $("#areastatistikPengaduan").html("");
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_data_statistik_pengaduan.php",
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

            var JumAduA = 0; var JumAduP = 0;
            var JumAduAT = 0; var JumAduPT = 0;

            var JumAduSelesaiA = 0; var JumAduSelesaiP = 0;
            var JumAduSelesaiAT = 0; var JumAduSelesaiPT = 0;
            for (i = 0; i < data.length; i++) {
                JumAduA = data[i].JumAduA;
                JumAduP = data[i].JumAduP;
                JumAduAT = data[i].JumAduAT;
                JumAduPT = data[i].JumAduPT;

                JumAduSelesaiA = data[i].JumAduSelesaiA;
                JumAduSelesaiP = data[i].JumAduSelesaiP;
                JumAduSelesaiAT = data[i].JumAduSelesaiAT;
                JumAduSelesaiPT = data[i].JumAduSelesaiPT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (JumAduAT >= JumAduA) {
                PJumAduA = ((JumAduA / JumAduAT) * (100)).toFixed(2);
                var tandaupdwnKBBaru = "fa-caret-up text-primary";
            } else if (JumAduAT <= JumAduA) {
                PJumAduA = ((JumAduAT / JumAduA) * (100)).toFixed(2);
                var tandaupdwnKBBaru = "fa-caret-down text-danger";
            }

            if (JumAduPT >= JumAduP) {
                PJumAduP = ((JumAduP / JumAduPT) * (100)).toFixed(2);
                var tandaupdwnKBAktif = "fa-caret-up text-primary";
            } else if (JumAduPT <= JumAduP) {
                PJumAduP = ((JumAduPT / JumAduP) * (100)).toFixed(2);
                var tandaupdwnKBAktif = "fa-caret-down text-danger";
            }

            if (JumAduSelesaiAT >= JumAduSelesaiA) {
                PJumAduSelesaiA = ((JumAduSelesaiA / JumAduSelesaiAT) * (100)).toFixed(2);
                var tandaupdwnKBBaruSelesai = "fa-caret-up text-primary";
            } else if (JumAduSelesaiAT <= JumAduSelesaiA) {
                PJumAduSelesaiA = ((JumAduSelesaiAT / JumAduSelesaiA) * (100)).toFixed(2);
                var tandaupdwnKBBaruSelesai = "fa-caret-down text-danger";
            }

            if (JumAduSelesaiPT >= JumAduSelesaiP) {
                PJumAduSelesaiP = ((JumAduSelesaiP / JumAduSelesaiPT) * (100)).toFixed(2);
                var tandaupdwnKBAktifSelesai = "fa-caret-up text-primary";
            } else if (JumAduSelesaiPT <= JumAduSelesaiP) {
                PJumAduSelesaiP = ((JumAduSelesaiPT / JumAduSelesaiP) * (100)).toFixed(2);
                var tandaupdwnKBAktifSelesai = "fa-caret-down text-danger";
            }

            $("#lbljumlahAduAnak").html(formatRibuan(JumAduA.toString()));
            $("#lbljumlahSelesaiAnak").html(formatRibuan(JumAduSelesaiA.toString()));
            $("#lbljumlahAduPerempuan").html(formatRibuan(JumAduP.toString()));
            $("#lbljumlahSelesaiPerempuan").html(formatRibuan(JumAduSelesaiP.toString()));

            $("#areastatistikPengaduan").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumAduA.toString()) + ' : ' + formatRibuan(JumAduAT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBBaru + ' me-2"></span>' + PJumAduA + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumAduSelesaiA + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumAduSelesaiA.toString()) + ' : ' + formatRibuan(JumAduSelesaiAT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBBaruSelesai + ' me-2"></span>' + PJumAduSelesaiA + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumAduP + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumAduP.toString()) + ' : ' + formatRibuan(JumAduPT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBAktif + ' me-2"></span>' + PJumAduP + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-danger rounded-start rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumAduSelesaiP + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumAduSelesaiP.toString()) + ' : ' + formatRibuan(JumAduSelesaiPT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKBAktifSelesai + ' me-2"></span>' + PJumAduSelesaiP + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPengaduanAnak() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_pengaduan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var valadu = []; var valselesai = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                valadu.push(jum.jumAduAnak);
                valselesai.push(jum.jumSelesaiAduAnak);
            });

            var hitChartContent = document.getElementById('hitungChartPengaduanAnak');
            hitChartContent.innerHTML = '';
            $('#hitungChartPengaduanAnak').append('<canvas id="pengaduanAnakChart" height="80px"><canvas>');

            var salesChartCanvas = $('#pengaduanAnakChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Pengaduan',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: valadu,
                    },
                    {
                        label: 'Penyelesaian',
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: valselesai,
                    },
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: true,
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

function GrafikPengaduanPerempuan() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_pengaduan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var valadu = []; var valselesai = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                valadu.push(jum.jumAduPerempuan);
                valselesai.push(jum.jumSelesaiAduPerempuan);
            });

            var hitChartContent = document.getElementById('hitungChartPengaduanPerempuan');
            hitChartContent.innerHTML = '';
            $('#hitungChartPengaduanPerempuan').append('<canvas id="pengaduanPerempuanChart" height="80px"><canvas>');

            var salesChartCanvas = $('#pengaduanPerempuanChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Pengaduan',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: valadu,
                    },
                    {
                        label: 'Penyelesaian',
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: valselesai,
                    },
                ]
            }

            var salesChartOptions = {
                maintainAspectRatio: true,
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