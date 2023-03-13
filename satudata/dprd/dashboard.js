$("#lv_kota").on("click", function () {
    $("#txttransketerangan").val("kota");
    var periode = $("#txttransperiode").val();
    var tahunakhir = $("#lbltahunakhir").val();
    $("#txttranstahun").val(tahunakhir);

    var nmwilayah = "Kabupaten Jember";
    $("#lblkoppeta").text(nmwilayah);
    $(".lblkoparea").text("Periode " + periode + " - " + nmwilayah);
    $("#lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);

    isiDataStatistikJumlah();
    grafikAnggotaPartai();
    grafikPieAnggotaGender();
    grafikPieAnggotaPendidikan()

    GrafikProdukPerda(); GrafikProdukSuratKeputusan();GrafikKunjungan();GrafikKegiatan();GrafikParipurna();

    $("#lblhalaman").val("dashboard");
});

$(".lv_kecamatan").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");$("#txttransidperiode").val("");
    var idkecamatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nama');
    var tahunakhir = $("#lbltahunakhir").val();
    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $("#lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);
    $("#txttransidperiode").val(idkecamatan);
    isiDataStatistikJumlah();
    GrafikProdukPerda(); GrafikProdukSuratKeputusan();GrafikKunjungan();GrafikKegiatan();GrafikParipurna();
});

$(".lv_desa").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    $("#txttransidperiode").val("");
    var idkecamatan = $(this).data('idkec'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nmkecamatan');
    var tahunakhir = $(this).data('tahun');
    $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan " + nmwilayah);
    $("#lblkopperbandinganarea").text("Tahun " + tahunakhir + " : " + parseInt(tahunakhir - 1) + " - " + nmwilayah);
    $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);
    $("#txttransidperiode").val(idkecamatan);

    isiDataStatistikJumlah();
    GrafikProdukPerda(); GrafikProdukSuratKeputusan();GrafikKunjungan();GrafikKegiatan();GrafikParipurna();
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
function isiDataStatistikJumlah() {

    $("#lbljumlahAnggota").html(""); 
    $("#lbljumlahProduk").html("");
    $("#lbljumlahKunjungan").html("");
    $("#lbljumlahKegiatan").html("");
    $("#lbljumlahParipurna").html("");
    $("#areastatistikJumlah").html("");

    var tahun = $("#txttranstahun").val();
    var idperiode = $("#txttransidperiode").val();
    var keterangan = $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_data_statistik_desa.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, idperiode: idperiode },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var i;
            var html = "";
           
            var jumTotAnggota = 0; var jumTotProduk = 0; var jumTotKunjungan = 0;
            var JumTayang = 0; var JumParipurna = 0; 
            var jumTotProdukT = 0; var jumTotKunjunganT = 0;
            var JumTayangT = 0; var JumParipurnaT = 0; 
            for (i = 0; i < data.length; i++) {
                jumTotAnggota = data[i].jumTotAnggota;
                jumTotProduk = data[i].jumTotProduk;
                jumTotKunjungan = data[i].jumTotKunjungan;
                JumTayang = data[i].JumTayang;
                JumParipurna = data[i].JumParipurna;

                jumTotProdukT = data[i].jumTotProdukT;
                jumTotKunjunganT = data[i].jumTotKunjunganT;
                JumTayangT = data[i].JumTayangT;
                JumParipurnaT = data[i].JumParipurnaT;

                thnskrg = data[i].thnskrg; thnsblm = data[i].thnsblm;
            }

            if (jumTotProdukT >= jumTotProduk) {
                PjumTotProduk = ((jumTotProduk / jumTotProdukT) * (100)).toFixed(2);
                var tandaupdwnProduk = "fa-caret-up text-primary";
            } else if (jumTotProdukT <= jumTotProduk) {
                PjumTotProduk = ((jumTotProdukT / jumTotProduk) * (100)).toFixed(2);
                var tandaupdwnProduk = "fa-caret-down text-danger";
            }

            if (jumTotKunjunganT >= jumTotKunjungan) {
                PjumTotKunjungan = ((jumTotKunjungan / jumTotKunjunganT) * (100)).toFixed(2);
                var tandaupdwnKunjungan = "fa-caret-up text-primary";
            } else if (jumTotKunjunganT <= jumTotKunjungan) {
                PjumTotKunjungan = ((jumTotKunjunganT / jumTotKunjungan) * (100)).toFixed(2);
                var tandaupdwnKunjungan = "fa-caret-down text-danger";
            }

            if (JumTayangT >= JumTayang) {
                PJumTayang = ((JumTayang / JumTayangT) * (100)).toFixed(2);
                var tandaupdwnTayang = "fa-caret-up text-primary";
            } else if (JumTayangT <= JumTayang) {
                PJumTayang = ((JumTayangT / JumTayang) * (100)).toFixed(2);
                var tandaupdwnTayang = "fa-caret-down text-danger";
            }

            if (JumParipurnaT >= JumParipurna) {
                PJumParipurna = ((JumParipurna / JumParipurnaT) * (100)).toFixed(2);
                var tandaupdwnParipurna = "fa-caret-up text-primary";
            } else if (JumParipurnaT <= JumParipurna) {
                PJumParipurna = ((JumParipurnaT / JumParipurna) * (100)).toFixed(2);
                var tandaupdwnParipurna = "fa-caret-down text-danger";
            }

            $("#lbljumlahAnggota").html(formatRibuan(jumTotAnggota.toString()));
            $("#lbljumlahProduk").html(formatRibuan(jumTotProduk.toString()));
            $("#lbljumlahKunjungan").html(formatRibuan(jumTotKunjungan.toString()));
            $("#lbljumlahKegiatan").html(formatRibuan(JumTayang.toString()));
            $("#lbljumlahParipurna").html(formatRibuan(JumParipurna.toString()));

            $("#areastatistikJumlah").html(
                '<div class="overflow-visible progress-bar bg-white border-end border-white border-2 rounded-end rounded-pill"' +
                'role="progressbar" style="width:16%" aria-valuenow="33%" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900"></span></div>' +
                
                '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
                'role="progressbar" style="width:17%" aria-valuenow="' + PjumTotProduk + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(jumTotProduk.toString()) + ' : ' + formatRibuan(jumTotProdukT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnProduk + ' me-2"></span>' + PjumTotProduk + ' % </span></div>' +
                
                '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"' +
                'role="progressbar" style="width:26%" aria-valuenow="' + PjumTotKunjungan + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(jumTotKunjungan.toString()) + ' : ' + formatRibuan(jumTotKunjunganT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnKunjungan + ' me-2"></span>' + PjumTotKunjungan + ' % </span></div>' +
                
                '<div class="overflow-visible progress-bar bg-primary border-end border-white border-2"' +
                'role="progressbar" style="width:26%" aria-valuenow="' + PJumTayang + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumTayang.toString()) + ' : ' + formatRibuan(JumTayangT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnTayang + ' me-2"></span>' + PJumTayang + ' % </span></div>' +

                '<div class="overflow-visible progress-bar bg-danger border-end border-white border-2"' +
                'role="progressbar" style="width:16%" aria-valuenow="' + PJumParipurna + '" aria-valuemin="0"' +
                'aria-valuemax="100"><span class="mt-n4 text-900">' + formatRibuan(JumParipurna.toString()) + ' : ' + formatRibuan(JumParipurnaT.toString()) + ' &nbsp;&nbsp; &nbsp;&nbsp;<span class="fas ' + tandaupdwnParipurna + ' me-2"></span>' + PJumParipurna + ' % </span></div>');
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

var ctx = document.getElementById('AnggotaPartaiChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function grafikPieAnggotaGender() {
    var tahun = $("#txttranstahun").val();
    var idperiode = $("#txttransidperiode").val();
    var keterangan = $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();

    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_pie_anggota_gender.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_pie_anggota_gender_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_pie_anggota_gender_desa.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, idperiode: idperiode },
        async: false,
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumLaki = []; var jumPerempuan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumLaki.push(jum.jumLaki);
                jumPerempuan.push(jum.jumPerempuan);
            });

            datax = [jumLaki, jumPerempuan];
            legend = ['Laki-Laki', 'Perempuan'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungAnggotaPartaiPie');
            hitChartContent.innerHTML = '';
            $('#hitungAnggotaPartaiPie').append('<canvas id="AnggotaPartaiPie" height="250px"><canvas>');

            var salesChartCanvas = $('#AnggotaPartaiPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    //"#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE"
                    {
                        label: 'Jumlah',
                        data: datax,
                        backgroundColor: ['#2ECC40', '#FF851B'],
                        borderColor: ['#2ECC40', '#FF851B']
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

function grafikPieAnggotaPendidikan() {
    var tahun = $("#txttranstahun").val();
    var idperiode = $("#txttransidperiode").val();
    var keterangan = $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();

    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_pie_anggota_pendidikan.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_pie_anggota_pendidikan_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_pie_anggota_pendidikan_desa.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, idperiode: idperiode },
        async: false,
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var jumSMP = []; var jumSMA = [];var jumD3 = [];var jumS1 = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                jumSMP.push(jum.jumSMP);
                jumSMA.push(jum.jumSMA);
                jumD3.push(jum.jumD3);
                jumS1.push(jum.jumS1);
            });

            datax = [jumSMP, jumSMA,jumD3, jumS1];
            legend = ['SLTP', 'SLTA', 'D3', 'S1-S2'];
            total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
            labelsvalues = datax.map(function (value, i) {
                let p = Math.round((value / total) * 100) + '%';
                return legend[i] + ' ' + p;
            });

            var hitChartContent = document.getElementById('hitungAnggotaPendidikanPie');
            hitChartContent.innerHTML = '';
            $('#hitungAnggotaPendidikanPie').append('<canvas id="AnggotaPendidikanPie" height="250px"><canvas>');
            
            //"#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE"
            var salesChartCanvas = $('#AnggotaPendidikanPie').get(0).getContext('2d')
            var salesChartData = {
                labels: labelsvalues,
                datasets: [
                    {
                        label: 'Jumlah',
                        data: datax,
                        backgroundColor: ['#FF4136', '#2ECC40', '#FF851B', '#39CCCC'],
                        borderColor: ['#FF4136', '#2ECC40', '#FF851B', '#39CCCC']
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

function grafikAnggotaPartai() {
    var tahun = $("#txttranstahun").val();
    var idperiode = $("#txttransidperiode").val();
    var keterangan = $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();

    if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_anggota_partai.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_anggota_partai_kecamatan.php"; }
    else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_anggota_partai_desa.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { idarea: idarea, tahun: tahun, idperiode: idperiode },
        async: false,
        dataType: 'json',
        success: function (data) {
            var labels = []; var values = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                document.body.style.cursor = "default";
               
                labels.push(jum.nmpartai);
                values.push(jum.jumTotal);

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

                var hitChartContent = document.getElementById('hitungAnggotaPartaiChart');
                hitChartContent.innerHTML = '';
                $('#hitungAnggotaPartaiChart').append('<canvas id="AnggotaPartaiChart" height="250px"><canvas>');

                var salesChartCanvas = $('#AnggotaPartaiChart').get(0).getContext('2d')
                var salesChartData = {
                    labels: sortedLabels,
                    datasets: [
                        {
                            label: 'Jumlah',
                            borderColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                            backgroundColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
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

function GrafikProdukPerda() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_produk_perda.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var perda = []; var perdausulan = [];var perdainisiatif = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                perda.push(jum.perda);
                perdausulan.push(jum.perdausulan);
                perdainisiatif.push(jum.perdainisiatif);
            });

            var hitChartContent = document.getElementById('hitungChartProdukPerda');
            hitChartContent.innerHTML = '';
            $('#hitungChartProdukPerda').append('<canvas id="ProdukPerdaChart" height="80px"><canvas>');

            var salesChartCanvas = $('#ProdukPerdaChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Peraturan Daerah',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: perda,
                    },
                    {
                        label: 'Perda Usulan Eksekutif',
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: perdausulan,
                    },
                    {
                        label: 'Perda Inisiatif DPRD',
                        backgroundColor: '#39CCCC',
                        borderColor: '#39CCCC',
                        data: perdainisiatif,
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

function GrafikProdukSuratKeputusan() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_produk_keputusan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var internal = []; var eksternal = [];var pimpinan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                internal.push(jum.internal);
                eksternal.push(jum.eksternal);
                pimpinan.push(jum.pimpinan);
            });

            var hitChartContent = document.getElementById('hitungChartProdukKeputusan');
            hitChartContent.innerHTML = '';
            $('#hitungChartProdukKeputusan').append('<canvas id="ProdukKeputusanChart" height="80px"><canvas>');

            var salesChartCanvas = $('#ProdukKeputusanChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Keputusan Internal',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: internal,
                    },
                    {
                        label: 'Keputusan Eksternal',
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: eksternal,
                    },
                    {
                        label: 'Keputusan Pimpinan DPRD',
                        backgroundColor: '#39CCCC',
                        borderColor: '#39CCCC',
                        data: pimpinan,
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

function GrafikKunjungan() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_kunjungan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var kunjungan = []; var terimakunjungan = [];var pengaduan = [];
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                kunjungan.push(jum.kunjungan);
                terimakunjungan.push(jum.terimakunjungan);
                pengaduan.push(jum.pengaduan);
            });

            var hitChartContent = document.getElementById('hitungChartKunjungan');
            hitChartContent.innerHTML = '';
            $('#hitungChartKunjungan').append('<canvas id="KunjunganChart" height="80px"><canvas>');

            var salesChartCanvas = $('#KunjunganChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Kunjungan Kerja (Komisi)',
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        data: kunjungan,
                    },
                    {
                        label: 'Penerimaan Kunjungan Kerja',
                        backgroundColor: '#00FF00',
                        borderColor: '#00FF00',
                        data: terimakunjungan,
                    },
                    {
                        label: 'Pengaduan',
                        backgroundColor: '#39CCCC',
                        borderColor: '#39CCCC',
                        data: pengaduan,
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

function GrafikKegiatan() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_hasil_kegiatan.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var tayangan = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                tayangan.push(jum.tayangan);
            });

            var hitChartContent = document.getElementById('hitungChartHasil');
            hitChartContent.innerHTML = '';
            $('#hitungChartHasil').append('<canvas id="HasilChart" height="80px"><canvas>');

            var salesChartCanvas = $('#HasilChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Penayangan Kegiatan & Kinerja',
                        backgroundColor: '#39CCCC',
                        borderColor: '#39CCCC',
                        data: tayangan,
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

function GrafikParipurna() {
    var tahun = $("#txttranstahun").val();
    $.ajax({
        type: "POST",
        url: "aksi/ambil_grafik_paripurna.php",
        data: { tahun: tahun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var paripurna = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push(jum.nmBulan);
                paripurna.push(jum.paripurna);
            });

            var hitChartContent = document.getElementById('hitungChartParipurna');
            hitChartContent.innerHTML = '';
            $('#hitungChartParipurna').append('<canvas id="ParipurnaChart" height="80px"><canvas>');

            var salesChartCanvas = $('#ParipurnaChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Rapat Paripurna',
                        backgroundColor: '#39CCCC',
                        borderColor: '#39CCCC',
                        data: paripurna,
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
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
        },
    });
}
