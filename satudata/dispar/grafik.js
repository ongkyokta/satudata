function isiDataStatistik() {
  $('#lbljumtotal').html("0");
  $('#lbljumwisata').html("0");$('#lbljumhotel').html("0");
  $('#lbljumresto').html("0");$('#lbljumekraf').html("0");$('#lbljumseni').html("0");
  $("#areastatistikSarana").html("")

  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_data_statistik.php",
    data:{idarea:idarea,keterangan:keterangan},
    dataType: 'json',
    beforeSend: function(e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      var i;
      for (i = 0; i < data.length; i++) {

        if (data[i].jumwisata >= 1) {
          var Pwisata = ((data[i].jumwisata / data[i].jumtotal) * (100)).toFixed(2);
        } else if (data[i].jumwisata == 0) {
          var Pwisata = 0;
        }

        if (data[i].jumhotel >= 1) {
          var PHotel = ((data[i].jumhotel / data[i].jumtotal) * (100)).toFixed(2);
        } else if (data[i].jumhotel == 0) {
          var PHotel = 0;
        }

        if (data[i].jumresto >= 1) {
          var Presto = ((data[i].jumresto / data[i].jumtotal) * (100)).toFixed(2);
        } else if (data[i].jumresto == 0) {
          var Presto = 0;
        }

        if (data[i].jumekraf >= 1) {
          var Pekraf = ((data[i].jumekraf / data[i].jumtotal) * (100)).toFixed(2);
        } else if (data[i].jumekraf == 0) {
          var Pekraf = 0;
        }

        if (data[i].jumkesenian >= 1) {
          var PKesenian = ((data[i].jumkesenian / data[i].jumtotal) * (100)).toFixed(2);
        } else if (data[i].jumkesenian == 0) {
          var PKesenian = 0;
        }

        $("#areastatistikSarana").html(
          '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
          'role="progressbar" style="width:20%" aria-valuenow="' + Pwisata + '" aria-valuemin="0"' +
          'aria-valuemax="100"><span class="mt-n4 text-900">Tempat Wisata - ' + Pwisata + ' %</span></div>' +
          '<div class="overflow-visible progress-bar bg-success border-end border-white border-2"' +
          'role="progressbar" style="width:20%" aria-valuenow="' + PHotel + '" aria-valuemin="0"' +
          'aria-valuemax="100"><span class="mt-n4 text-900">Hotel - ' + PHotel + ' %</span></div>' +
          '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"' +
          'role="progressbar" style="width:20%" aria-valuenow="' + Presto + '" aria-valuemin="0"' +
          'aria-valuemax="100"><span class="mt-n4 text-900">Resto - ' + Presto + ' %</span></div>' +
          '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"' +
          'role="progressbar" style="width:20%" aria-valuenow="' + Pekraf + '" aria-valuemin="0"' +
          'aria-valuemax="100"><span class="mt-n4 text-900">Ekraf - ' + Pekraf + ' %</span></div>' +
          '<div class="overflow-visible progress-bar bg-danger rounded-start rounded-pill"' +
          'role="progressbar" style="width:20%" aria-valuenow="' + PKesenian + '" aria-valuemin="0"' +
          'aria-valuemax="100"><span class="mt-n4 text-900">Seni Budaya - ' + PKesenian + ' %</span></div>');

        $('#lbljumtotal').html(data[i].jumlahtotalrp);
        $('#lbljumwisata').html(data[i].jumwisata);$('#lbljumhotel').html(data[i].jumhotel);
        $('#lbljumresto').html(data[i].jumresto);$('#lbljumekraf').html(data[i].jumekraf);$('#lbljumseni').html(data[i].jumkesenian);
      }
      document.body.style.cursor = "default";
      $("#loading").fadeOut("slow");
    },
    error: function () {
      document.body.style.cursor = "default";
      $("#loading").fadeOut("slow");
      console.log('error');
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

Chart.defaults.global.defaultFontColor = "#fff";

var ctx = document.getElementById('totalChart').getContext("2d")
var gradient = ctx.createLinearGradient(0, 0, 0, 200)
gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
gradient.addColorStop(0, '#b2d1f0')

function hitungGrafikTotal() {
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_grafik_total.php",
    data:{idarea:idarea,keterangan:keterangan},
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = [];
      var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push(jum.nmjenis);
        values.push(jum.jumTempat);

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

        var hitChartContent = document.getElementById('hitungTotalChart');
        hitChartContent.innerHTML = '';
        $('#hitungTotalChart').append('<canvas id="totalChart" height="300px"><canvas>');

        var salesChartCanvas = $('#totalChart').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: getRandomColor,
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
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
              gridLines: { display: true, color: "#0d6ecf" }
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, }
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

function isiGrafikKunjungan() {
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_grafik_kunjungan.php",
    data:{idarea:idarea,keterangan:keterangan},
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = [];
      var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push(jum.nmjenis);
        values.push(jum.jumPengunjung);

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

        var hitChartContent = document.getElementById('hitungChartKunjungan');
        hitChartContent.innerHTML = '';
        $('#hitungChartKunjungan').append('<canvas id="KunjunganChart" height="300px"><canvas>');

        var salesChartCanvas = $('#KunjunganChart').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: getRandomColor,
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
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
              gridLines: { display: true, color: "#0d6ecf" }
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, }
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

function hitungGrafikJenisWisata() {
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_grafik_jenis_wisata.php",
    data:{idarea:idarea,keterangan:keterangan},
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = [];
      var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push(jum.nmjenis);
        values.push(jum.jumTempat);

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

        var hitChartContent = document.getElementById('hitungChartJenisWisata');
        hitChartContent.innerHTML = '';
        $('#hitungChartJenisWisata').append('<canvas id="ChartJenisWisata" height="300px"><canvas>');

        var salesChartCanvas = $('#ChartJenisWisata').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: getRandomColor,
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
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
              gridLines: { display: true, color: "#0d6ecf" }
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, }
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

function hitungGrafikKelasHOtel() {
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_grafik_kelas_hotel.php",
    data:{idarea:idarea,keterangan:keterangan},
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = [];
      var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push(jum.nmjenis);
        values.push(jum.jumTempat);

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

        var hitChartContent = document.getElementById('hitungChartKelasHotel');
        hitChartContent.innerHTML = '';
        $('#hitungChartKelasHotel').append('<canvas id="ChartKelasHotel" height="300px"><canvas>');

        var salesChartCanvas = $('#ChartKelasHotel').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: getRandomColor,
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
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
              gridLines: { display: true, color: "#0d6ecf" }
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, }
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

function hitungGrafikKuliner() {
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_grafik_kuliner.php",
    data:{idarea:idarea,keterangan:keterangan},
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = [];
      var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push(jum.nmjenis);
        values.push(jum.jumTempat);

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

        var hitChartContent = document.getElementById('hitungChartKuliner');
        hitChartContent.innerHTML = '';
        $('#hitungChartKuliner').append('<canvas id="ChartKuliner" height="300px"><canvas>');

        var salesChartCanvas = $('#ChartKuliner').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: getRandomColor,
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
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
              gridLines: { display: true, color: "#0d6ecf" }
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, }
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

function hitungGrafikKesenian() {
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type: "POST",
    url: "aksi/ambil_grafik_kesenian.php",
    data:{idarea:idarea,keterangan:keterangan},
    async: false,
    dataType: 'json',
    success: function (data) {
      var labels = [];
      var values = [];
      myArray = data;
      $.each(myArray, function (index, jum) {
        document.body.style.cursor = "default";
        $("#loading").fadeOut("slow");

        labels.push(jum.nmjenis);
        values.push(jum.jumTempat);

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

        var hitChartContent = document.getElementById('hitungChartKesenian');
        hitChartContent.innerHTML = '';
        $('#hitungChartKesenian').append('<canvas id="ChartKesenian" height="300px"><canvas>');

        var salesChartCanvas = $('#ChartKesenian').get(0).getContext('2d')
        var salesChartData = {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Jumlah',
              borderColor: 'rgb(255, 255, 255,0.6)',
              backgroundColor: getRandomColor,
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
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)' },
              gridLines: { display: true, color: "#0d6ecf" }
            }],
            yAxes: [{
              ticks: { display: true, fontColor: 'rgb(255, 255, 255,0.6)', beginAtZero: true },
              gridLines: { display: false, }
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

function hitungTabelGrafikEkraf(){
  var idinstansi=$('#lblidinstansi').val();
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();
  $.ajax({
    type:"POST",
    url : "aksi/ambil_grafik_tabel_ekraf.php",
    data:{idinstansi:idinstansi,idarea:idarea,keterangan:keterangan},
    dataType : 'json',
    beforeSend: function(e) {
    $("#loading").fadeIn();
    document.body.style.cursor = "wait";
    },
    success:function(data){
    document.body.style.cursor = "default";
    $('#tabelgrafikekraf').dataTable().fnDestroy();
        var html = '';
        var i;
          for(i=0; i<data.length; i++){
            html += 
            '<tr class="btn-reveal-trigger">'+
            '<td class="align-middle text-center" width="5%">'+data[i].no+'</td>'+
            '<td class="align-middle" width="85%">'+data[i].nmjenis+'</td>'+
            '<td class="align-middle text-center" width="10%">'+data[i].jumTempat+'</td>'+
            '</tr>';
          }				
      $('#isitabelgrafikekraf').html(html);
      $("#tabelgrafikekraf").dataTable({"paging": true,"lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
        initComplete: function() {$(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');},"searching": true,});
        $("#loading").fadeOut("slow");								
    },
    error: function() {
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
