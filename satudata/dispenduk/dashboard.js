function bersihkan() {
  $("#lblhalaman").val("");
  $("#txttransid").val(""); $("#txttransketerangan").val("");

  $("#lblkoppeta").text("");
  
  $("#area-halaman").css("display", "none");
  $("#area-grafik").css("display", "none");
}

/*================ TABELDASHBOARD =================*/
function isiDataSarana() {

  $("#lbljumlahpenduduk").html(""); $("#lbljumlahlaki").html("");
  $("#lbljumlahPerempuan").html("");
  $("#areastatistikSarana").html("");

  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  $.ajax({
    type: "POST",
    url: "aksi/api/api-total-penduduk.php",
    data: { keterangan: keterangan, idarea: idarea },
    dataType: 'json',
    beforeSend: function (e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      document.body.style.cursor = "default";
      var i;
      var html = "";

      var jmllaki = 0; var jmlperempuan = 0; var jmlpenduduk = 0;
      var Pjmllaki = 0; var Pjmlperempuan = 0;
      for (i = 0; i < data.length; i++) {

        jmllaki = data[i].jmllaki;
        jmlperempuan = data[i].jmlperempuan;
        jmlpenduduk = data[i].jmlpenduduk;

      }


      Pjmllaki = ((jmllaki / jmlpenduduk) * (100)).toFixed(2);
      Pjmlperempuan = ((jmlperempuan / jmlpenduduk) * (100)).toFixed(2);

      $("#lbljumlahpenduduk").html(formatRibuan(jmlpenduduk.toString()));
      $("#lbljumlahlaki").html(formatRibuan(jmllaki.toString()));
      $("#lbljumlahPerempuan").html(formatRibuan(jmlperempuan.toString()));

      $("#areastatistikSarana").html(
        '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
        'role="progressbar" style="width:50%" aria-valuenow="25%" aria-valuemin="0"' +
        'aria-valuemax="100"><span class="mt-n4 text-900">Laki-laki - ' + Pjmllaki + ' %</span></div>' +
        '<div class="overflow-visible progress-bar bg-danger rounded-start rounded-pill"' +
        'role="progressbar" style="width:50%" aria-valuenow="' + Pjmlperempuan + '" aria-valuemin="0"' +
        'aria-valuemax="100"><span class="mt-n4 text-900">Perempuan - ' + Pjmlperempuan + ' %</span></div>');

     // $("#loading").fadeOut("slow");
    },
    error: function () {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";
    },
  });
}

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

$('#txtcarilokasi').keydown(function (e) {
  if (e.keyCode == 13) {
    var kata = $("#txtcarilokasi").val();
    if (kata.length >= 2) {
      $.ajax({
        type: 'POST',
        url: 'aksi/cari_lokasi.php',
        data: {
          kata: kata
        },
        dataType: 'json',
        beforeSend: function (e) {
          $("#loading").fadeIn();
          document.body.style.cursor = "wait";
        },
        success: function (resp) {
          $("#loading").fadeOut("slow");
          document.body.style.cursor = "default";
          if (resp.length >= 1) {
            pencarianLokasi();
          } else if (resp.length <= 0) {
            alert("Data tidak diketemukan");
            $("#txtcarilokasi").val("");
            $("#txtcarilokasi").focus();
          } else {
            alert("Data tidak diketemukan");
            $("#txtcarilokasi").val("");
            $("#txtcarilokasi").focus();
          }
        },
        error: function () {
          $("#loading").fadeOut("slow");
          document.body.style.cursor = "default";
          alert("Koneksi ke server terputus");
        },
      });

    } else {
      alert("Kata kunci pencarian kosong")
    }
  }
});

function pencarianLokasi() {
  var kata = $("#txtcarilokasi").val();
  $.ajax({
    type: 'POST',
    url: "aksi/isi_pencarian.php",
    data: {
      kata: kata
    },
    success: function (resp) {
      $("#loading").fadeOut("slow");
      $("#isianModTambahDataLarge").html(resp);
      $("#isianModTambahDataLarge").fadeIn(1000);
      $("#modTambahDataLarge").modal('show');
      $("#txtcarilokasi").val("");
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

$("#lv_kota").on("click",function () {
  $("#loading").fadeIn();
  $("#txttransid").val(""); $("#txttransketerangan").val("");
  map.closePopup();
  var nmwilayah = $(this).data('nama');
  $("#lblkoppeta").text(nmwilayah);
  var keterangan = $(this).data('keterangan');
  $("#txttransid").val(""); $("#txttransketerangan").val(keterangan);
  
  $("#area-grafik").css("display", "block");
  isiDataSarana(); GrafikUmur(); GrafikPekerjaan();GrafikStatus(); GrafikPendidikan(); GrafikAgama();
});

$(".lv_kecamatan").on("click",function () {
  $("#loading").fadeIn();
  $("#txttransid").val(""); $("#txttransketerangan").val("");
  var idkecamatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
  var nmwilayah = $(this).data('nama');
  $("#lblkoppeta").text(nmwilayah);
  $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan);
  isiDataSarana(); GrafikUmur(); GrafikPekerjaan();GrafikStatus(); GrafikPendidikan(); GrafikAgama();
  $("#area-grafik").css("display", "none");
});

$(".lv_desa").on("click",function () {
  $("#loading").fadeIn();
  $("#txttransid").val(""); $("#txttransketerangan").val("");
  var iddesa = $(this).data('id'); var keterangan = $(this).data('keterangan');
  var nmwilayah = $(this).data('nama');
  $("#lblkoppeta").text(nmwilayah);
  $("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan);
  isiDataSarana();
  GrafikUmur(); GrafikPekerjaan();GrafikStatus(); GrafikPendidikan(); GrafikAgama();
  $("#area-grafik").css("display", "none");
});


Chart.defaults.global.defaultFontColor = "#fff";

var ctx = document.getElementById('umurChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function GrafikUmur() {
  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  $.ajax({
    type: "POST",
    url: "aksi/api/api-umur-desa.php",
    data: { keterangan: keterangan, idarea: idarea },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var labels = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59',
        '60-64', '65-69', '70-74', '>=75'];
      var vallaki = [];
      var valnperempuan = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        vallaki.push(jum.jum_0_4_L, jum.jum_05_09_L, jum.jum_10_14_L, jum.jum_15_19_L, jum.jum_20_24_L, jum.jum_25_29_L, jum.jum_30_34_L, jum.jum_35_39_L, jum.jum_40_44_L,
          jum.jum_45_49_L, jum.jum_50_54_L, jum.jum_55_59_L, jum.jum_60_64_L, jum.jum_65_69_L, jum.jum_70_74_L, jum.jum_75_L);

        valnperempuan.push(jum.jum_0_4_P, jum.jum_05_09_P, jum.jum_10_14_P, jum.jum_15_19_P, jum.jum_20_24_P, jum.jum_25_29_P, jum.jum_30_34_P, jum.jum_35_39_P, jum.jum_40_44_P,
          jum.jum_45_49_P, jum.jum_50_54_P, jum.jum_55_59_P, jum.jum_60_64_P, jum.jum_65_69_P, jum.jum_70_74_P, jum.jum_75_P);
      });

      var hitChartContent = document.getElementById('hitungUmurChart');
      hitChartContent.innerHTML = '';
      $('#hitungUmurChart').append('<canvas id="umurChart" style="height:300px;"><canvas>');

      var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
      var salesChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Laki-laki',
            backgroundColor: '#2ECC40',
            borderColor: '#2ECC40',
            data: vallaki,
          },
          {
            label: 'Perempuan',
            backgroundColor: 'rgb(255, 105, 180)',
            borderColor: 'rgb(255, 105, 180)',
            data: valnperempuan,
          },
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
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'rgb(255, 255, 255,0.6)' },
            gridLines: { display: false },
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
            gridLines: { display: true, color: "#0d6ecf" }
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
      }
      )

      //////////////////////////////////////////////////////////////////// 				
      //$("#loading").fadeOut("slow");
      document.body.style.cursor = "default";

    },
    error: function () {
      $("#loading").fadeOut("slow");
      //toastr.error('Koneksi bermasalah periksa internet');
      document.body.style.cursor = "default";
    },
  });
}

function GrafikStatus() {
  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  $.ajax({
    type: "POST",
    url: "aksi/api/api-status-desa.php",
    data: { keterangan: keterangan, idarea: idarea },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var labels = [];
      var valuesL = [];
      var valuesP = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        labels.push('Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati');
        valuesL.push(jum.totBlmKwn_L, jum.totKawin_L, jum.totCeraiHidup_L, jum.totCeraiMati_L);
        valuesP.push(jum.totBlmKwn_P, jum.totKawin_P, jum.totCeraiHidup_P, jum.totCeraiMati_P);
      });

      var hitChartContent = document.getElementById('hitungStatusChart');
      hitChartContent.innerHTML = '';
      $('#hitungStatusChart').append('<canvas id="StatusChart" style="height:300px;"><canvas>');

      var salesChartCanvas = $('#StatusChart').get(0).getContext('2d')
      var salesChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Laki-laki',
            backgroundColor: '#2ECC40',
            borderColor: '#2ECC40',
            data: valuesL,
          },
          {
            label: 'Perempuan',
            backgroundColor: 'rgb(255, 105, 180)',
            borderColor: 'rgb(255, 105, 180)',
            data: valuesP,
          },
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
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'rgb(255, 255, 255,0.6)' },
            gridLines: { display: false },
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
            gridLines: { display: true, color: "#0d6ecf" }
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
      }
      )

      //////////////////////////////////////////////////////////////////// 				
      //$("#loading").fadeOut("slow");
      document.body.style.cursor = "default";

    },
    error: function () {
      $("#loading").fadeOut("slow");
      //toastr.error('Koneksi bermasalah periksa internet');
      document.body.style.cursor = "default";
    },
  });
}

function GrafikPekerjaan() {
  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  $.ajax({
    type: "POST",
    url: "aksi/api/api-pekerjaan-desa.php",
    data: { keterangan: keterangan, idarea: idarea },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var labels = []; var valuesL = []; var valuesP = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        labels.push('Tidak Bekerja', 'Aparatur', 'Pengajar', 'Wiraswasta', 'Petani', 'Nelayan', 'Keagamaan', 'Pelajar', 'Tenaga Kesehatan', 'Pensiunan', 'Lainnya');
        valuesL.push(jum.totTDK_KRJ_L, jum.totAPARATUR_L, jum.totPENGAJAR_L, jum.totWIRASWASTA_L, jum.totPETANI_L, jum.totNELAYAN_L, jum.totAGAMA_L, jum.totPELAJAR_L, jum.totNAKES_L, jum.totPENSIUNAN_L, jum.totLAINNYA_L);
        valuesP.push(jum.totTDK_KRJ_P, jum.totAPARATUR_P, jum.totPENGAJAR_P, jum.totWIRASWASTA_P, jum.totPETANI_P, jum.totNELAYAN_P, jum.totAGAMA_P, jum.totPELAJAR_P, jum.totNAKES_P, jum.totPENSIUNAN_P, jum.totLAINNYA_P);
      });

      var hitChartContent = document.getElementById('hitungPekerjaanChart');
      hitChartContent.innerHTML = '';
      $('#hitungPekerjaanChart').append('<canvas id="PekerjaanChart" style="height:300px;"><canvas>');

      var salesChartCanvas = $('#PekerjaanChart').get(0).getContext('2d')
      var salesChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Laki-laki',
            backgroundColor: '#2ECC40',
            borderColor: '#2ECC40',
            data: valuesL,
          },
          {
            label: 'Perempuan',
            backgroundColor: 'rgb(255, 105, 180)',
            borderColor: 'rgb(255, 105, 180)',
            data: valuesP,
          },
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
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'rgb(255, 255, 255,0.6)' },
            gridLines: { display: false },
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
            gridLines: { display: true, color: "#0d6ecf" }
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
      }
      )

      //////////////////////////////////////////////////////////////////// 				
      //$("#loading").fadeOut("slow");
      document.body.style.cursor = "default";

    },
    error: function () {
      $("#loading").fadeOut("slow");
      document.body.style.cursor = "default";
    },
  });
}

function GrafikPendidikan() {
  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  $.ajax({
    type: "POST",
    url: "aksi/api/api-pendidikan-desa.php",
    data: { keterangan: keterangan, idarea: idarea },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var labels = []; var valuesL = []; var valuesP = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        labels.push('Belum Sekolah', 'Belum Tamat SD', 'Tamat SD', 'SMP', 'SMA', 'D1/D2', 'D3', 'S1', 'S2', 'S3');
        valuesL.push(jum.totBS_L, jum.totBLMSD_L, jum.totSD_L, jum.totSMP_L, jum.totSMA_L, jum.totD1_L, jum.totD3_L, jum.totS1_L, jum.totS2_L, jum.totS3_L);
        valuesP.push(jum.totBS_P, jum.totBLMSD_P, jum.totSD_P, jum.totSMP_P, jum.totSMA_P, jum.totD1_P, jum.totD3_P, jum.totS1_P, jum.totS2_P, jum.totS3_P);
      });

      var hitChartContent = document.getElementById('hitungPendidikanChart');
      hitChartContent.innerHTML = '';
      $('#hitungPendidikanChart').append('<canvas id="PendidikanChart" style="height:300px;"><canvas>');

      var salesChartCanvas = $('#PendidikanChart').get(0).getContext('2d')
      var salesChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Laki-laki',
            backgroundColor: '#2ECC40',
            borderColor: '#2ECC40',
            data: valuesL,
          },
          {
            label: 'Perempuan',
            backgroundColor: 'rgb(255, 105, 180)',
            borderColor: 'rgb(255, 105, 180)',
            data: valuesP,
          },
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
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'rgb(255, 255, 255,0.6)' },
            gridLines: { display: false },
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
            gridLines: { display: true, color: "#0d6ecf" }
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
      }
      )

      //////////////////////////////////////////////////////////////////// 				
      //$("#loading").fadeOut("slow");
      document.body.style.cursor = "default";

    },
    error: function () {
      $("#loading").fadeOut("slow");
      document.body.style.cursor = "default";
    },
  });
}

function GrafikAgama() {
  var keterangan = $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  $.ajax({
    type: "POST",
    url: "aksi/api/api-agama-desa.php",
    data: { keterangan: keterangan, idarea: idarea },
    async: false,
    dataType: 'json',
    beforeSend: function (e) {
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var labels = []; var valuesL = []; var valuesP = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        labels.push('Islam', 'Kristen', 'Khatolik', 'Hindu', 'Budha', 'Khonghucu', 'Kepercayaan');
        valuesL.push(jum.totIslam_L, jum.totKristen_L, jum.totKatholik_L, jum.totHindu_L, jum.totBudha_L, jum.totKhonghucu_L, jum.totKepercayaan_L);
        valuesP.push(jum.totIslam_P, jum.totKristen_P, jum.totKatholik_P, jum.totHindu_P, jum.totBudha_P, jum.totKhonghucu_P, jum.totKepercayaan_P);
      });

      var hitChartContent = document.getElementById('hitungAgamaChart');
      hitChartContent.innerHTML = '';
      $('#hitungAgamaChart').append('<canvas id="AgamaChart" style="height:300px;"><canvas>');

      var salesChartCanvas = $('#AgamaChart').get(0).getContext('2d')
      var salesChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Laki-laki',
            backgroundColor: '#2ECC40',
            borderColor: '#2ECC40',
            data: valuesL,
          },
          {
            label: 'Perempuan',
            backgroundColor: 'rgb(255, 105, 180)',
            borderColor: 'rgb(255, 105, 180)',
            data: valuesP,
          },
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
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'rgb(255, 255, 255,0.6)' },
            gridLines: { display: false },
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
            gridLines: { display: true, color: "#0d6ecf" }
          }]
        }
      }
      var salesChart = new Chart(salesChartCanvas, {
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
      }
      )

      //////////////////////////////////////////////////////////////////// 				
      $("#loading").fadeOut("slow");
      document.body.style.cursor = "default";

    },
    error: function () {
      $("#loading").fadeOut("slow");
      //toastr.error('Koneksi bermasalah periksa internet');
      document.body.style.cursor = "default";
    },
  });
}
