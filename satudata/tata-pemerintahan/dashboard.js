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

    isiDataStatistikKategori();
    GrafikKesehatan();GrafikPendidikan();GrafikSosial();
    GrafikTrantibhumlinmas();GrafikPU();GrafikPR();

   // $("#loading").fadeOut("slow");
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

    isiDataStatistikKategori();
    GrafikKesehatan();GrafikPendidikan();GrafikSosial();
    GrafikTrantibhumlinmas();GrafikPU();GrafikPR();

    //$("#loading").fadeOut("slow");
    $("#lblhalaman").val("dashboard");
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

var ctx = document.getElementById('LakaLintasChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function isiDataStatistikKategori() {
    $("#lbljumlahkesehatan").html(""); $("#lbljumlahpendidikan").html("");
    $("#lbljumlahsosial").html(""); $("#lbljumlahtrantib").html("");
    $("#lbljumlahPU").html(""); $("#lbljumlahPR").html("");
    $("#areastatistikKategori").html("");
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_data_statistik_kategori.php",
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
            
            var JumKesehatan = 0;var JumKesehatanT = 0;
            var JumPendidikan = 0;var JumPendidikanT = 0; 
            var JumSosial = 0;var JumSosialT = 0;
            var JumTrantibhumlinmas = 0;var JumTrantibhumlinmasT = 0;
            var JumPU = 0;var JumPUT = 0;
            var JumPR = 0;var JumPRT = 0;

            for (i = 0; i < data.length; i++) {
                JumKesehatan = data[i].JumKesehatan;JumKesehatanT = data[i].JumKesehatanT;
                JumPendidikan = data[i].JumPendidikan;JumPendidikanT = data[i].JumPendidikanT;

                JumSosial = data[i].JumSosial;JumSosialT = data[i].JumSosialT;
                JumTrantibhumlinmas = data[i].JumTrantibhumlinmas;JumTrantibhumlinmasT = data[i].JumTrantibhumlinmasT;

                JumPU = data[i].JumPU;JumPUT = data[i].JumPUT;
                JumPR = data[i].JumPR;JumPRT = data[i].JumPRT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (JumKesehatanT >= JumKesehatan) {
                PJumKesehatan = ((JumKesehatan / JumKesehatanT) * (100)).toFixed(2);
                var tandaupdwnKIR = "fa-caret-up text-primary";
            } else if (JumKesehatanT <= JumKesehatan) {
                PJumKesehatan = ((JumKesehatanT / JumKesehatan) * (100)).toFixed(2);
                var tandaupdwnKIR = "fa-caret-down text-danger";
            }

            if (JumPendidikanT >= JumPendidikan) {
                PJumPendidikan = ((JumPendidikan / JumPendidikanT) * (100)).toFixed(2);
                var tandaupdwnLaka = "fa-caret-up text-primary";
            } else if (JumPendidikanT <= JumPendidikan) {
                PJumPendidikan = ((JumPendidikanT / JumPendidikan) * (100)).toFixed(2);
                var tandaupdwnLaka = "fa-caret-down text-danger";
            }

            if (JumSosialT >= JumSosial) {
                PJumSosial = ((JumSosial / JumSosialT) * (100)).toFixed(2);
                var tandaupdwnsarana = "fa-caret-up text-primary";
            } else if (JumSosialT <= JumSosial) {
                PJumSosial = ((JumSosialT / JumSosial) * (100)).toFixed(2);
                var tandaupdwnsarana = "fa-caret-down text-danger";
            }

            if (JumTrantibhumlinmasT >= JumTrantibhumlinmas) {
                PJumTrantibhumlinmas = ((JumTrantibhumlinmas / JumTrantibhumlinmasT) * (100)).toFixed(2);
                var tandaupdwnTrayek = "fa-caret-up text-primary";
            } else if (JumTrantibhumlinmasT <= JumTrantibhumlinmas) {
                PJumTrantibhumlinmas = ((JumTrantibhumlinmasT / JumTrantibhumlinmas) * (100)).toFixed(2);
                var tandaupdwnTrayek = "fa-caret-down text-danger";
            }

            if (JumPUT >= JumPU) {
                PJumPU = ((JumPU / JumPUT) * (100)).toFixed(2);
                var tandaupdwnPenumpang = "fa-caret-up text-primary";
            } else if (JumPUT <= JumPU) {
                PJumPU = ((JumPUT / JumPU) * (100)).toFixed(2);
                var tandaupdwnPenumpang = "fa-caret-down text-danger";
            }

            if (JumPRT >= JumPR) {
                PJumPR = ((JumPR / JumPRT) * (100)).toFixed(2);
                var tandaupdwnArmada = "fa-caret-up text-primary";
            } else if (JumPRT <= JumPR) {
                PJumPR = ((JumPRT / JumPR) * (100)).toFixed(2);
                var tandaupdwnArmada = "fa-caret-down text-danger";
            }

            $("#lbljumlahkesehatan").html(JumKesehatan);
            $("#lbljumlahpendidikan").html(JumPendidikan);
            $("#lbljumlahsosial").html(JumSosial);
            $("#lbljumlahtrantib").html(JumTrantibhumlinmas);
            $("#lbljumlahPU").html(JumPU); 
            $("#lbljumlahPR").html(JumPR);

            $("#areastatistikKategori").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + JumKesehatan + ' : ' + JumKesehatanT + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKIR + ' me-2"></span>' + PJumKesehatan + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumPendidikan + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + JumPendidikan + ' : ' + JumPendidikanT + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnLaka + ' me-2"></span>' + PJumPendidikan + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumSosial + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + JumSosial + ' : ' + JumSosialT + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnsarana + ' me-2"></span>' + PJumSosial + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-success border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumTrantibhumlinmas + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + JumTrantibhumlinmas + ' : ' + JumTrantibhumlinmasT + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnTrayek + ' me-2"></span>' + PJumTrantibhumlinmas + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumPU + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + JumPU + ' : ' + JumPUT + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnPenumpang + ' me-2"></span>' + PJumPU + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-primary rounded-start rounded-pill"' +
                'role="progressbar" style="width:25%" aria-valuenow="' + PJumPR + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + JumPR + ' : ' + JumPRT + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnArmada + ' me-2"></span>' + PJumPR + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikKesehatan() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_kesehatan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var capaian = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.indikator);
                capaian.push(jum.capaian);
            });

            var hitChartContent = document.getElementById('hitungChartKesehatan');
            hitChartContent.innerHTML = '';
            $('#hitungChartKesehatan').append('<canvas id="kesehatanChart" height="250px"><canvas>');

            var salesChartCanvas = $('#kesehatanChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Pencapaian",
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: capaian,
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
                        ticks: { display: false, fontColor: 'rgb(255, 255, 255,0.6)' },
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

function GrafikPendidikan() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_pendidikan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var capaian = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.indikator);
                capaian.push(jum.capaian);
            });

            var hitChartContent = document.getElementById('hitungChartPendidikan');
            hitChartContent.innerHTML = '';
            $('#hitungChartPendidikan').append('<canvas id="pendidikanChart" height="250px"><canvas>');

            var salesChartCanvas = $('#pendidikanChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Pencapaian",
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: capaian,
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
                        ticks: { display: false, fontColor: 'rgb(255, 255, 255,0.6)' },
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
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikSosial() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_sosial.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var capaian = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.indikator);
                capaian.push(jum.capaian);
            });

            var hitChartContent = document.getElementById('hitungChartSosial');
            hitChartContent.innerHTML = '';
            $('#hitungChartSosial').append('<canvas id="sosialChart" height="250px"><canvas>');

            var salesChartCanvas = $('#sosialChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Pencapaian",
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: capaian,
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
                        ticks: { display: false, fontColor: 'rgb(255, 255, 255,0.6)' },
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
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikTrantibhumlinmas() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_trantibhumlinmas.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var capaian = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.indikator);
                capaian.push(jum.capaian);
            });

            var hitChartContent = document.getElementById('hitungChartTrantibhumlinmas');
            hitChartContent.innerHTML = '';
            $('#hitungChartTrantibhumlinmas').append('<canvas id="TrantibhumlinmasChart" height="250px"><canvas>');

            var salesChartCanvas = $('#TrantibhumlinmasChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Pencapaian",
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: capaian,
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
                        ticks: { display: false, fontColor: 'rgb(255, 255, 255,0.6)' },
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
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPU() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_pu.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var capaian = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.indikator);
                capaian.push(jum.capaian);
            });

            var hitChartContent = document.getElementById('hitungChartPU');
            hitChartContent.innerHTML = '';
            $('#hitungChartPU').append('<canvas id="PUChart" height="250px"><canvas>');

            var salesChartCanvas = $('#PUChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Pencapaian",
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: capaian,
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
                        ticks: { display: false, fontColor: 'rgb(255, 255, 255,0.6)' },
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
            document.body.style.cursor = "default";
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikPR() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_pr.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var capaian = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.indikator);
                capaian.push(jum.capaian);
            });

            var hitChartContent = document.getElementById('hitungChartPR');
            hitChartContent.innerHTML = '';
            $('#hitungChartPR').append('<canvas id="PRChart" height="250px"><canvas>');

            var salesChartCanvas = $('#PRChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Pencapaian",
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: capaian,
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
                        ticks: { display: false, fontColor: 'rgb(255, 255, 255,0.6)' },
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
            document.body.style.cursor = "default";
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}



