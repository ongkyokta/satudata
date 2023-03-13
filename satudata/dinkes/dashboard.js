function bersihkan() {
  $("#lblhalaman").val("");
  $("#txttransid").val(""); $("#txttransketerangan").val("");

  $("#lblkoppeta").text("");
  $("#lblkopgrafik1").text(""); $("#lblkopgrafik2").text("");
  $("#lblkopgrafik3").text(""); $("#lblkopgrafik4").text("");

  $("#area-halaman").css("display", "none");
}

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

  isiDataStatistik();
  grafikKematian(); grafikSaranaKesehatan(); grafikUrusanKesehatan();
  //isiKelahiran(); isiIndikator();
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
  grafikKematian(); grafikSaranaKesehatan(); grafikUrusanKesehatan();

  isiKelahiran(); isiIndikator();

  $("#lblhalaman").val("dashboard");
});

$(".lv_kecamatan").on("click", function () {
  $("#txttransid").val(""); $("#txttransketerangan").val("");
  $("#txttranstahun").val("");
  var idkecamatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
  var nmwilayah = $(this).data('nama');
  var tahunakhir = $("#lbltahunakhir").val();
  $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Puskesmas " + nmwilayah);
  $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahunakhir);

  isiDataStatistik();
  grafikKematian(); grafikSaranaKesehatan(); grafikUrusanKesehatan();
  //isiKelahiran(); isiIndikator();
});

$(".lv_desa").on("click", function () {
  $("#txttransid").val(""); $("#txttransketerangan").val("");
  $("#txttranstahun").val("");
  var idkecamatan = $(this).data('idkec'); var tahun = $(this).data('tahun'); var keterangan = $(this).data('keterangan');
  var nmwilayah = $(this).data('nmkecamatan');
  $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Puskesmas " + nmwilayah);
  $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan); $("#txttranstahun").val(tahun);

  isiDataStatistik();
  grafikKematian(); grafikSaranaKesehatan(); grafikUrusanKesehatan();
  //isiKelahiran(); isiIndikator();
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

function isiDataStatistik() {
  $("#lbljumlahnakes").html(""); $("#lbljumlahsaranakes").html("");
  $("#lbljumlahurusankes").html("");
  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  var tahun = $("#txttranstahun").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
  else if (keterangan == "desa") { var Urlnya = "aksi/ambil_data_statistik_kecamatan.php"; }
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
      var jmlnakes = 0; var jmlsarana = 0; var jmlurusan = 0;
      for (i = 0; i < data.length; i++) {
        jmlnakes = data[i].jmlnakes;
        jmlsarana = data[i].jmlsarana;
        jmlurusan = data[i].jmlurusan;
      }

      $("#lbljumlahnakes").html(formatRibuan(jmlnakes.toString()));
      $("#lbljumlahsaranakes").html(formatRibuan(jmlsarana.toString()));
      $("#lbljumlahurusankes").html(formatRibuan(jmlurusan.toString()));

      //$("#loading").fadeOut("slow");
    },
    error: function () {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";
    },
  });
}

Chart.defaults.global.defaultFontColor = "#fff";

var ctx = document.getElementById('kematianChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function grafikKematian() {
  var keterangan = $("#txttransketerangan").val();
  var id_puskesmas = $("#txttransid").val();
  var tahun = $("#txttranstahun").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_kematian.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_kematian_tahun.php"; }
  else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_kematian_kec_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { id_puskesmas: id_puskesmas, tahun: tahun },
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = []; var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push('Kematian Bayi', 'Kematian Ibu Melahirkan', 'Kematian Balita', 'Kunjungan Neonatus');
        values.push(jum.jumkematian_bayi, jum.jumkematian_ibu, jum.jumkematian_balita, jum.jumneonatus);

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

        var hitChartContent = document.getElementById('hitungChartKematian');
        hitChartContent.innerHTML = '';
        $('#hitungChartKematian').append('<canvas id="kematianChart" height="100px"><canvas>');

        var salesChartCanvas = $('#kematianChart').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
              fill: true,
              pointBorderColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(0, 0, 0, 0)',
              pointHoverBackgroundColor: 'rgb(54, 162, 235)',
              pointHoverBorderColor: 'rgb(54, 162, 235)',
              data: sortedData
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
              gridLines: { display: true, color: "#0d6ecf" },
              barPercentage: 0.4
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, },
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

function grafikSaranaKesehatan() {
  var keterangan = $("#txttransketerangan").val();
  var id_puskesmas = $("#txttransid").val();
  var tahun = $("#txttranstahun").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_sarana.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_sarana_tahun.php"; }
  else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_sarana_kec_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { id_puskesmas: id_puskesmas, tahun: tahun },
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = []; var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push('SOP', 'Ambulan', 'PSC', 'PONED', 'SIMKES', 'Pemutakhiran Data', 'Polindes/Ponkesdes', 'PKM Pembantu', 'Poskestren');
        values.push(jum.jumsop, jum.jumambulan, jum.jumpsc, jum.jumponed, jum.jumsimkes, jum.jumpemutakhiran, jum.jumpolindes, jum.jumpkm_pembantu, jum.jumposkestren);

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

        var hitChartContent = document.getElementById('hitungSaranaChart');
        hitChartContent.innerHTML = '';
        $('#hitungSaranaChart').append('<canvas id="saranaChart" height="100px"><canvas>');

        var salesChartCanvas = $('#saranaChart').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              //backgroundColor         : gradient,
              backgroundColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
              fill: true,
              pointBorderColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(0, 0, 0, 0)',
              pointHoverBackgroundColor: 'rgb(54, 162, 235)',
              pointHoverBorderColor: 'rgb(54, 162, 235)',
              data: sortedData
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
              gridLines: { display: true, color: "#0d6ecf" },
              barPercentage: 0.4
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, },
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

function grafikUrusanKesehatan() {
  var keterangan = $("#txttransketerangan").val();
  var id_puskesmas = $("#txttransid").val();
  var tahun = $("#txttranstahun").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_grafik_urusan.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_urusan_tahun.php"; }
  else if (keterangan == "desa") { var Urlnya = "aksi/ambil_grafik_urusan_kec_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { id_puskesmas: id_puskesmas, tahun: tahun },
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = []; var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push('Rawat Jalan', 'Rawat Inap', 'Rujukan Ke RS Kab/Kota', 'Pengolahan Limbah', 'Penggunaan SIMKES');
        values.push(jum.jumrwtjalan, jum.jumrwtinap, jum.jumrujukan, jum.jumlimbah, jum.jumaplikasi);

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

        var hitChartContent = document.getElementById('hitungUrusanChart');
        hitChartContent.innerHTML = '';
        $('#hitungUrusanChart').append('<canvas id="urusanChart" height="100px"><canvas>');

        var salesChartCanvas = $('#urusanChart').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              //backgroundColor         : gradient,
              backgroundColor: ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
              fill: true,
              pointBorderColor: 'rgba(0, 0, 0, 0)',
              pointBackgroundColor: 'rgba(0, 0, 0, 0)',
              pointHoverBackgroundColor: 'rgb(54, 162, 235)',
              pointHoverBorderColor: 'rgb(54, 162, 235)',
              data: sortedData
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
              gridLines: { display: true, color: "#0d6ecf" },
              barPercentage: 0.4
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, },
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

function isiKelahiran() {
  var keterangan = $("#txttransketerangan").val();
  var id_puskesmas = $("#txttransid").val();
  var tahun = $("#txttranstahun").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/isi_tabel_kelahiran.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/isi_tabel_kelahiran_tahun.php"; }
  else if (keterangan == "desa") { var Urlnya = "aksi/isi_tabel_kelahiran_kec_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { id_puskesmas: id_puskesmas, tahun: tahun },
    dataType: 'json',
    beforeSend: function (e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      $('#tabeljadwal').dataTable().fnDestroy();
      document.body.style.cursor = "default";
      var html = '';
      var i;
      for (i = 0; i < data.length; i++) {
        var tahun = data[i].tahun;
        var jmldr_umum = formatRibuan(data[i].jmldr_umum);
        var jmldr_spesialis = formatRibuan(data[i].jmldr_spesialis);
        var jmldr_gigi = formatRibuan(data[i].jmldr_gigi);
        var jmlbidan = formatRibuan(data[i].jmlbidan);
        var jmlperawat = formatRibuan(data[i].jmlperawat);
        var jmlas_apoteker = formatRibuan(data[i].jmlas_apoteker);
        var jmlapoteker = formatRibuan(data[i].jmlapoteker);
        var jmlpromkes = formatRibuan(data[i].jmlpromkes);
        var jmlepi_kesehatan = formatRibuan(data[i].jmlepi_kesehatan);
        var jmladm_kesehatan = formatRibuan(data[i].jmladm_kesehatan);
        var jmlsanitaria = formatRibuan(data[i].jmlsanitaria);
        var jmlgizi = formatRibuan(data[i].jmlgizi);
        var jmlanalis = formatRibuan(data[i].jmlanalis);
        var jmlradiografer = formatRibuan(data[i].jmlradiografer);
        var jmlfisio = formatRibuan(data[i].jmlfisio);
        var jmlelektro = formatRibuan(data[i].jmlelektro);
        var jmlperekam = formatRibuan(data[i].jmlperekam);
        var jmlpendukung = formatRibuan(data[i].jmlpendukung);

      }
      html +=
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">1</td>' +
        '<td class="align-middle" width="10%">Dokter Umum</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmldr_umum + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">2</td>' +
        '<td class="align-middle" width="10%">Dokter Spesialis</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmldr_spesialis + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">3</td>' +
        '<td class="align-middle" width="10%">Dokter Gigi</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmldr_gigi + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">4</td>' +
        '<td class="align-middle" width="10%">Bidan</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlbidan + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">5</td>' +
        '<td class="align-middle" width="10%">Perawat</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlperawat + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">6</td>' +
        '<td class="align-middle" width="10%">Assisten Apoteker</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlas_apoteker + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">7</td>' +
        '<td class="align-middle" width="10%">Apoteker</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlapoteker + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">8</td>' +
        '<td class="align-middle" width="10%">Promkesn</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlpromkes + '</td>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">9</td>' +
        '<td class="align-middle" width="10%">Epidemologi Kesehatan</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlepi_kesehatan + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">10</td>' +
        '<td class="align-middle" width="10%">Administrasi Kesehatan</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmladm_kesehatan + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">11</td>' +
        '<td class="align-middle" width="10%">Tenaga Sanitaria</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlsanitaria + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">12</td>' +
        '<td class="align-middle" width="10%">Tenaga Gizi</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlgizi + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">13</td>' +
        '<td class="align-middle" width="10%">Analis Kesehatan</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlanalis + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">14</td>' +
        '<td class="align-middle" width="10%">Radiografer</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlradiografer + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">15</td>' +
        '<td class="align-middle" width="10%">Fisioterapi</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlfisio + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">16</td>' +
        '<td class="align-middle" width="10%">Elektromedis</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlelektro + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">16</td>' +
        '<td class="align-middle" width="10%">Perekam Medis</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlperekam + '</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="3%">18</td>' +
        '<td class="align-middle" width="10%">Tenaga Pendukung</td>' +
        '<td class="align-middle text-center" width="10%">' + tahun + '</td>' +
        '<td class="align-middle text-center" width="10%">' + jmlpendukung + '</td>' +
        '</tr>';
      $('#isitabeljadwal').html(html);
      $("#tabeljadwal").dataTable({
        "paging": true, "lengthChange": false, "ordering": true, "info": false, "autoWidth": false, "responsive": false, "select": false, "scrollX": false,
        initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
      });
      //$("#loading").fadeOut("slow");
    },
    error: function () {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";
    },
  });
}

function isiIndikator() {
  var keterangan = $("#txttransketerangan").val();
  var id_puskesmas = $("#txttransid").val();
  var tahun = $("#txttranstahun").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/isi_tabel_indikator.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/isi_tabel_indikator_tahun.php"; }
  else if (keterangan == "desa") { var Urlnya = "aksi/isi_tabel_indikator_kec_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { id_puskesmas: id_puskesmas, tahun: tahun },
    dataType: 'json',
    beforeSend: function (e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      $('#tabelindikator').dataTable().fnDestroy();
      document.body.style.cursor = "default";
      var html = '';
      var i;
      for (i = 0; i < data.length; i++) {
        var no = data[i].no;
        var jumpus = data[i].jumpus;
        var tahun = data[i].tahun;
        var jmlbor = (data[i].jmlbor);
        var jmlaios = (data[i].jmlaios);
        var jmltoi = (data[i].jmltoi);
        var jmlbto = (data[i].jmlbto);
        var jmlndr = (data[i].jmlndr);
        var jmlgdr = (data[i].jmlgdr);
      }
      html +=
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="2%">1</td>' +
        '<td class="align-middle" width="15%">Bed Occupancy Rate (BOR) / Pemakian Tempat Tidur</td>' +
        '<td class="align-middle text-center" width="3%">' + tahun + '</td>' +
        '<td class="align-middle text-right" width="3%">' + jmlbor + ' %</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="2%">2</td>' +
        '<td class="align-middle" width="15%">Average Of Lenght Stay (AlOS)</td>' +
        '<td class="align-middle text-center" width="3%">' + tahun + '</td>' +
        '<td class="align-middle text-right" width="3%">' + jmlaios + ' %</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="2%">3</td>' +
        '<td class="align-middle" width="15%">Turn Over Internal (TOI)</td>' +
        '<td class="align-middle text-center" width="3">' + tahun + '</td>' +
        '<td class="align-middle text-right" width="3%">' + jmltoi + ' %</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="2%">4</td>' +
        '<td class="align-middle" width="15%">Bed Turn Over (BTO)</td>' +
        '<td class="align-middle text-center" width="3%">' + tahun + '</td>' +
        '<td class="align-middle text-right" width="3%">' + jmlbto + ' %</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="2%">5</td>' +
        '<td class="align-middle" width="15%">Net Death Rate (NDR)</td>' +
        '<td class="align-middle text-center" width="3%">' + tahun + '</td>' +
        '<td class="align-middle text-right" width="3%">' + jmlndr + ' %</td>' +
        '</tr>' +
        '<tr class="btn-reveal-trigger">' +
        '<td class="align-middle text-center" width="2%">6</td>' +
        '<td class="align-middle" width="15%">Gross Death Rate (GDR)</td>' +
        '<td class="align-middle text-center" width="3%">' + tahun + '</td>' +
        '<td class="align-middle text-right" width="3%">' + jmlgdr + ' %</td>' +
        '</tr>';
      $('#isitabelindikator').html(html);
      $("#tabelindikator").dataTable({
        "paging": true, "lengthChange": false, "ordering": true, "info": false, "autoWidth": false, "responsive": false, "select": false, "scrollX": false,
        initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
      });
      $("#loading").fadeOut("slow");
    },
    error: function () {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";
    },
  });
}