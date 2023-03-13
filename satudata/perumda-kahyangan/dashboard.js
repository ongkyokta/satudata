$("#lv_kota").on("click", function () {
    bersihkan();
    $("#area-halaman").fadeIn();

    $("#txttransketerangan").val("kota");
    var tahunakhir = $("#lbltahunakhir").val();
    $("#txttranstahun").val(tahunakhir);

    var nmwilayah = "Kabupaten Jember";
    $(".lblkoparea").text(nmwilayah);
    
    isiDataStatistik();
    GrafikProduksi();

    $("#lblhalaman").val("dashboard");
});

$(".lv_kecamatan").on("click", function () {
    $("#txttransid").val(""); $("#txttransketerangan").val("");
    $("#txttranstahun").val("");
    var kebun = $(this).data('id'); var keterangan = $(this).data('keterangan');
    var nmwilayah = $(this).data('nama');
    var tahunakhir = $("#lbltahunakhir").val();
    $(".lblkoparea").text(nmwilayah);
    $("#txttransid").val(kebun); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);
    isiDataStatistik();
    GrafikProduksi();
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
    var kebun = $("#txttransid").val();
    if (keterangan == "kota") { var Urlnya = "aksi/ambil_data_statistik.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
    $("#lbljumlahproduksi").html(""); $("#lbljumlahpelanggan").html("");
    $("#lbljumlahpenjualan").html(""); 
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { kebun: kebun},
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var i;
            var JumKaret = 0;var JumKopi = 0;
            var JumCengkeh = 0;
            for (i = 0; i < data.length; i++) {
                JumKaret = data[i].JumKaret;JumKopi = data[i].JumKopi;
                JumCengkeh = data[i].JumCengkeh;
            }

            $("#lbljumlahproduksi").html(formatRibuan(JumKaret.toString()));
            $("#lbljumlahpelanggan").html(formatRibuan(JumKopi.toString()));
            $("#lbljumlahpenjualan").html(formatRibuan(JumCengkeh.toString()));
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function GrafikProduksi() {
    var keterangan = $("#txttransketerangan").val();
    var kebun = $("#txttransid").val();
    if (keterangan == "kota") { var Urlnya = "aksi/ambil_grafik_produksi.php"; }
    else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_produksi_kecamatan.php"; }
    $.ajax({
        type: "POST",
        url: Urlnya,
        data: { kebun: kebun },
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            var labels = [];
            var JumKaret = []; var JumKopi = []; var Jumcengkeh = []; 
            myArray = data;
            $.each(myArray, function (index, jum) {
                labels.push("Tahun "+jum.nmTahun);
                JumKaret.push(jum.JumKaret);JumKopi.push(jum.JumKopi);Jumcengkeh.push(jum.Jumcengkeh);
            });

            var hitChartContent = document.getElementById('hitungChartProduksi');
            hitChartContent.innerHTML = '';
            $('#hitungChartProduksi').append('<canvas id="produksiChart" height="250px"><canvas>');

            var salesChartCanvas = $('#produksiChart').get(0).getContext('2d')
            var salesChartData = {
                labels: labels,
                datasets: [
                    //["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                    {
                        label: 'Karet',
                        backgroundColor: "#F012BE",
                        borderColor: "#F012BE",
                        data: JumKaret,
                    },
                    {
                        label: 'Kopi',
                        backgroundColor: "#1E90FF",
                        borderColor: "#1E90FF",
                        data: JumKopi,
                    },
                    {
                        label: 'Cengkeh',
                        backgroundColor: "#FFD700",
                        borderColor: "#FFD700",
                        data: Jumcengkeh,
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
