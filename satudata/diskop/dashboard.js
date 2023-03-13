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
    GrafikUsahaMikroPie();GrafikKondisiPie();GrafikAnggotaPie();
    GrafikModalUsaha();GrafikSHUPie();
   
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
    GrafikUsahaMikroPie();GrafikKondisiPie();GrafikAnggotaPie();
    GrafikModalUsaha();GrafikSHUPie();
    
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
    GrafikUsahaMikroPie();GrafikKondisiPie();GrafikAnggotaPie();
    GrafikModalUsaha();GrafikSHUPie();
});

$(".lv_desa").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var idkecamatan = $(this).data('idkec');var tahun = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nmkecamatan');

    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $(".lblkopperbandinganarea").text("Tahun " + tahun + " : " + parseInt(tahun - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahun);

    isiDataStatistik();
    GrafikUsahaMikroPie();GrafikKondisiPie();GrafikAnggotaPie();
    GrafikModalUsaha();GrafikSHUPie();
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

    $("#lbljumlahproduksi").html(""); $("#lbljumlahpelanggan").html("");
    $("#lbljumlahpenjualan").html(""); $("#lbljumlahperkembangancus").html("");
    $("#lbljumlahmodal").html(""); $("#lbljumlahvolusaha").html("");$("#lbljumlahshu").html("");
    $("#areastatistikdiskop").html("");
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
            var JumMikro = 0;var JumMikroT = 0;
            var JumKoperasi = 0;var JumKoperasiT = 0;
            var JumAnggota = 0;var JumAnggotaT = 0;
            var JumKary = 0;var JumKaryT = 0;
            var JumTotModal = 0;var JumTotModalT = 0;
            var JumVol = 0;var JumVolT = 0;
            var JumSHU = 0;var JumSHUT = 0;
            
            for (i = 0; i < data.length; i++) {
                JumMikro = data[i].JumMikro;JumMikroT = data[i].JumMikroT;
                JumKoperasi = data[i].JumKoperasi;JumKoperasiT = data[i].JumKoperasiT;

                JumAnggota = data[i].JumAnggota;JumAnggotaT = data[i].JumAnggotaT;
                JumKary = data[i].JumKary;JumKaryT = data[i].JumKaryT;

                JumTotModal = data[i].JumTotModal;JumTotModalT = data[i].JumTotModalT;
                JumVol = data[i].JumVol;JumVolT = data[i].JumVolT;
                JumSHU = data[i].JumSHU;JumSHUT = data[i].JumSHUT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            $("#lbljumlahproduksi").html(formatRibuan(JumMikro.toString()));
            $("#lbljumlahpelanggan").html(formatRibuan(JumKoperasi.toString()));
            $("#lbljumlahpenjualan").html(formatRibuan(JumAnggota.toString()));
            $("#lbljumlahperkembangancus").html(formatRibuan(JumKary.toString()));
            $("#lbljumlahmodal").html(formatRibuan(JumTotModal.toString())); 
            $("#lbljumlahvolusaha").html(formatRibuan(JumVol.toString()));
            $("#lbljumlahshu").html(formatRibuan(JumSHU.toString()));
  
            if (JumMikroT == 0){PJumMikro = 100;}else{PJumMikro = ((JumMikroT / JumMikro)).toFixed(1);}
            if (JumKoperasiT == 0){PJumKoperasi = 100;}else{PJumKoperasi = ((JumKoperasiT / JumKoperasi)).toFixed(1);}
            if (JumAnggotaT == 0){PJumAnggota = 100;}else{PJumAnggota = ((JumAnggotaT / JumAnggota)).toFixed(1);}
            if (JumKaryT == 0){PJumKary = 100;}else{PJumKary = ((JumKaryT / JumKary)).toFixed(1);}
            if (JumTotModalT == 0){PJumTotModal = 100;}else{PJumTotModal = ((JumTotModalT / JumTotModal)).toFixed(1);}
            if (JumVolT == 0){PJumVol = 100;}else{PJumVol = ((JumVolT / JumVol)).toFixed(1);}

            if (parseInt(JumMikroT) > parseInt(JumMikro)) {
                var tandaupdwnmikro = "fa-caret-down text-danger";
            } else {
                var tandaupdwnmikro = "fa-caret-up text-primary";
            }

            if (parseInt(JumKoperasiT) > parseInt(JumKoperasi)) {
                var tandaupdwnkoperasi = "fa-caret-down text-danger";
            } else {
                var tandaupdwnkoperasi = "fa-caret-up text-primary";
            }
            
            if (parseInt(JumAnggotaT) > parseInt(JumAnggota)) {
                var tandaupdwnanggota = "fa-caret-down text-danger";
            } else {
                var tandaupdwnanggota = "fa-caret-up text-primary";
            }

            if (parseInt(JumKaryT) > parseInt(JumKary)) {
                var tandaupdwnkary = "fa-caret-down text-danger";
            } else {
                var tandaupdwnkary = "fa-caret-up text-primary";
            }

            if (parseInt(JumTotModalT) > parseInt(JumTotModal)) {
                var tandaupdwnmodal = "fa-caret-down text-danger";
            } else {
                var tandaupdwnmodal = "fa-caret-up text-primary";
            }

            if (parseInt(JumVolT) > parseInt(JumVol)) {
                var tandaupdwnvol = "fa-caret-down text-danger";
            } else {
                var tandaupdwnvol = "fa-caret-up text-primary";
            }

            $("#areastatistikdiskop").html(
                '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:16%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumMikroT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnmikro + ' me-2"></span>' + PJumMikro + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-danger border-end border-white border-2"' +
                'role="progressbar" style="width:17%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumKoperasiT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnkoperasi + ' me-2"></span>' + PJumKoperasi + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
                'role="progressbar" style="width:17%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumAnggotaT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnanggota + ' me-2"></span>' + PJumAnggota + ' % </span></div>' +
                '<div class="overflow-visible progress-bar bg-success border-end border-white border-2"' +
                'role="progressbar" style="width:17%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumKaryT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnkary + ' me-2"></span>' + PJumKary + ' % </span></div>'+
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:17%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumTotModalT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnmodal + ' me-2"></span>' + PJumTotModal + ' % </span></div>'+
                '<div class="overflow-visible progress-bar bg-primary border-end border-white border-2"' +
                'role="progressbar" style="width:16%" aria-valuenow="25%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumVolT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnvol + ' me-2"></span>' + PJumVol + ' % </span></div>');
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikUsahaMikroPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_mikro_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_mikro_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_mikro_kecamatan_pie.php"; }
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
            var jumMikro = []; var jumKop = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumMikro.push(jum.jumMikro);
                jumKop.push(jum.jumKop);
            });

            datax = [jumMikro, jumKop];
            legend = ['Usaha Mikro', 'Koperasi'];
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

function GrafikKondisiPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_kondisi_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_kondisi_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_kondisi_kecamatan_pie.php"; }
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
            var jumAktif = []; var jumTdkAktif = [];var jumLapor = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumAktif.push(jum.jumAktif);
                jumTdkAktif.push(jum.jumTdkAktif);
                jumLapor.push(jum.jumLapor);
            });

            datax = [jumAktif, jumTdkAktif, jumLapor];
            legend = ['Aktif', 'Tidak Aktif', 'Lapor RAT'];
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

function GrafikAnggotaPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_anggota_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_anggota_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_anggota_kecamatan_pie.php"; }
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
            var jumAnggota = []; var jumKaryawan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumAnggota.push(jum.jumAnggota);
                jumKaryawan.push(jum.jumKaryawan);
            });

            datax = [jumAnggota, jumKaryawan];
            legend = ['Anggota', 'Karyawan'];
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

function GrafikModalUsaha() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_modal.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_modal_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_modal_kecamatan.php"; }
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
            var jumSendiri = [];
            var jumLuar = [];var jumAset = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumSendiri.push(jum.jumSendiri);
                jumLuar.push(jum.jumLuar);
                jumAset.push(jum.jumAset);
            });
            //jumSendiri,jumLuar,jumAset
            var hitChartContent = document.getElementById('hitungModalChart');
            hitChartContent.innerHTML = '';
            $('#hitungModalChart').append('<canvas id="ModalChart" height="250px"><canvas>');

            var salesChartCanvas = $('#ModalChart').get(0).getContext('2d')
            var salesChartData = {
                labels: ['Status Modal dan Aset'],
                datasets: [
                    {
                        label: 'Modal Sendiri',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumSendiri,
                    },
                    {
                        label: 'Modal Luar',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumLuar,
                    },
                    {
                        label: 'Aset',
                        backgroundColor: getRandomColor,
                        borderColor: getRandomColor,
                        data: jumAset,
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

function GrafikSHUPie() {
    var keterangan = $("#txttransketerangan").val();
    var tahun = $("#txttranstahun").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_shu_pie.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_shu_kecamatan_pie.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_shu_kecamatan_pie.php"; }
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
            var jumVol = []; var jumSHU = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumVol.push(jum.jumVol);
                jumSHU.push(jum.jumSHU);
            });

            datax = [jumVol, jumSHU];
            legend = ['Volume Usaha', 'SHU'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungSHUPie');
            hitChartContent.innerHTML = '';
            $('#hitungSHUPie').append('<canvas id="SHUPie" height="250px"><canvas>');

            var salesChartCanvas = $('#SHUPie').get(0).getContext('2d')
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
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}


