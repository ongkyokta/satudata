function isiDataStatistik() {

  $("#lbljumlahkepbup").html(""); $("#lbljumlahperaturanbup").html("");
  $("#lbljumlahperda").html(""); $("#lbljumlahkinerjalainnya").html("");
  
  var tahun = $("#txttranstahun").val();
  var keterangan = $("#txttransketerangan").val();
  if (keterangan == "kota" || keterangan == "tahun") { var Urlnya = "aksi/ambil_data_statistik.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_data_statistik_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { tahun: tahun },
    dataType: 'json',
    beforeSend: function (e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      document.body.style.cursor = "default";
      var i;
      var jumkeputusan = 0;
      var jumperaturan = 0; var jumperda = 0; var jumkinerja = 0; 
      for (i = 0; i < data.length; i++) {
        jumkeputusan = data[i].jumkeputusan;
        jumperaturan = data[i].jumperaturan;
        jumperda = data[i].jumperda;
        jumkinerja = data[i].jumkinerja;
      }

      $("#lbljumlahkepbup").html(formatRibuan(jumkeputusan.toString()));
      $("#lbljumlahperaturanbup").html(formatRibuan(jumperaturan.toString()));
      $("#lbljumlahperda").html(formatRibuan(jumperda.toString()));
      $("#lbljumlahkinerjalainnya").html(formatRibuan(jumkinerja.toString()));

      $("#loading").fadeOut("slow");
    },
    error: function () {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";
    },
  });
}

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

$("#lv_kota").click(function () {
  $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttranstahun").val("");
  var keterangan = $(this).data('keterangan');
  var tahun = $("#lbltahunakhir").val();
  $("#txttransketerangan").val(keterangan);$("#txttranstahun").val(tahun);
  isiDataStatistik();
  grafikKeputusanBupati();grafikPeraturanBupati();grafikPeraturanDaerah();
  grafikKinerja();
});

$(".lv_kecamatan").on("click", function () {
  $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttranstahun").val("");
  var tahun = $(this).data('id'); var keterangan = $(this).data('keterangan');
  $("#txttransid").val(tahun); $("#txttransketerangan").val(keterangan);$("#txttranstahun").val(tahun);
  isiDataStatistik();
  grafikKeputusanBupati();grafikPeraturanBupati();grafikPeraturanDaerah();
  grafikKinerja();
});

Chart.defaults.global.defaultFontColor = "#fff";

var ctx = document.getElementById('KinerjaLainnyaChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function grafikKeputusanBupati() {
  var keterangan = $("#txttransketerangan").val();
  var tahun = $("#txttransid").val();
  if (keterangan == "kota") { var Urlnya = "aksi/ambil_grafik_keputusan_bupati.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_keputusan_bupati_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { tahun: tahun },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var valya = []; var valtidak = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        valya.push(jum.jumYa);
        valtidak.push(jum.jumTidak);
      });

      var hitChartContent = document.getElementById('hitungChartKepBup');
      hitChartContent.innerHTML = '';
      $('#hitungChartKepBup').append('<canvas id="KepBupChart" height="250px"><canvas>');

      var salesChartCanvas = $('#KepBupChart').get(0).getContext('2d')
      var salesChartData = {
        labels: ['Kep. Bupati Publish', 'Kep. Bupati Tidak Publish'],
        datasets: [
          {
            label: 'Jumlah',
            data: [valya, valtidak],
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

    },
    error: function () {
      $("#loading").fadeOut("slow");
      document.body.style.cursor = "default";
    },
  });
}

function grafikPeraturanBupati() {
  var keterangan = $("#txttransketerangan").val();
  var tahun = $("#txttransid").val();
  if (keterangan == "kota") { var Urlnya = "aksi/ambil_grafik_perbup.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_perbup_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { tahun: tahun },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var valya = []; var valtidak = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        valya.push(jum.jumYa);
        valtidak.push(jum.jumTidak);
      });

      var hitChartContent = document.getElementById('hitungChartPerBup');
      hitChartContent.innerHTML = '';
      $('#hitungChartPerBup').append('<canvas id="PerBupChart" height="250px"><canvas>');

      var salesChartCanvas = $('#PerBupChart').get(0).getContext('2d')
      var salesChartData = {
        labels: ['Perbup Publish', 'Perbup Tidak Publish'],
        datasets: [
          {
            label: 'Jumlah',
            data: [valya, valtidak],
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

    },
    error: function () {
      $("#loading").fadeOut("slow");
      document.body.style.cursor = "default";
    },
  });
}

function grafikPeraturanDaerah() {
  var keterangan = $("#txttransketerangan").val();
  var tahun = $("#txttransid").val();
  if (keterangan == "kota") { var Urlnya = "aksi/ambil_grafik_perda.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_perda_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { tahun: tahun },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var valya = []; var valtidak = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        valya.push(jum.jumYa);
        valtidak.push(jum.jumTidak);
      });

      var hitChartContent = document.getElementById('hitungChartPerda');
      hitChartContent.innerHTML = '';
      $('#hitungChartPerda').append('<canvas id="PerdaChart" height="250px"><canvas>');

      var salesChartCanvas = $('#PerdaChart').get(0).getContext('2d')
      var salesChartData = {
        labels: ['Perda Publish', 'Perda Tidak Publish'],
        datasets: [
          {
            label: 'Jumlah',
            data: [valya, valtidak],
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

    },
    error: function () {
      $("#loading").fadeOut("slow");
      document.body.style.cursor = "default";
    },
  });
}

function grafikKinerja() {
  var keterangan = $("#txttransketerangan").val();
  var tahun = $("#txttransid").val();
  if (keterangan == "kota") { var Urlnya = "aksi/ambil_grafik_kinerja.php"; }
  else if (keterangan == "kecamatan") { var Urlnya = "aksi/ambil_grafik_kinerja_tahun.php"; }
  $.ajax({
    type: "POST",
    url: Urlnya,
    data: { tahun: tahun },
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = []; var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push('Sosialisasi', 'Penyuluhan', 'Pengurusan Perkara', 'Kelompok Kadarkum', 'Pengurusan Perkara', 'Bimtek');
        values.push(jum.jumsosialisasi, jum.jumpenyuluhan, jum.jumperkara, jum.jumkadarkum, jum.jumbimtek);

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

        var hitChartContent = document.getElementById('hitungKinerjaLainnyaChart');
        hitChartContent.innerHTML = '';
        $('#hitungKinerjaLainnyaChart').append('<canvas id="KinerjaLainnyaChart" height="250px"><canvas>');

        var salesChartCanvas = $('#KinerjaLainnyaChart').get(0).getContext('2d')
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