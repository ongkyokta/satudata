   /*================ TABELDASHBOARD =================*/
function isiDataSarana() {

  $("#lbljumsekolahSarana").html("");
  $("#lbljumruangSarana").html("");
  $("#areastatistikSarana").html("");

  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();

  $.ajax({
    type: "POST",
    url: "aksi/ambil_rincian_sarana.php",
    data:{idarea:idarea,keterangan:keterangan},
    dataType: 'json',
    beforeSend: function (e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
    success: function (data) {
      document.body.style.cursor = "default";
      var i;
      var html = "";
      for (i = 0; i < data.length; i++) {

        var TotKIB = data[i].TotKIB; 
        var jumkibA = data[i].jumkibA; 
        var jumkibB = data[i].jumkibB;
        var jumkibC = data[i].jumkibC; 
        var jumkibD = data[i].jumkibD;
      }

 
      if (TotKIB >= 1) {
        var PKibA = ((jumkibA / TotKIB) * (100)).toFixed(2);
        var PKibB = ((jumkibB / TotKIB) * (100)).toFixed(2);
        var PKibC = ((jumkibC / TotKIB) * (100)).toFixed(2);
        var PKibD = ((jumkibD / TotKIB) * (100)).toFixed(2);
      } else if (TotKIB == 0) {
        var PKibA = 0;
        var PKibB = 0;
        var PKibC = 0;
        var PKibD = 0;
      }

      $("#lbljumKIBA").html(formatRibuan(jumkibA));
      $("#lbljumKIBB").html(formatRibuan(jumkibB.toString()));
      $("#lbljumKIBC").html(formatRibuan(jumkibC));
      $("#lbljumKIBD").html(formatRibuan(jumkibD.toString()));

      $("#areastatistikSarana").html(
        '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"' +
        'role="progressbar" style="width:25%" aria-valuenow="' + PKibA + '" aria-valuemin="0"' +
        'aria-valuemax="100"><span class="mt-n4 text-900">KIB A : ' + formatRibuan(jumkibA.toString()) + ' - ' + PKibA + ' %</span></div>' +
        '<div class="overflow-visible progress-bar bg-success border-end border-white border-2"' +
        'role="progressbar" style="width:25%" aria-valuenow="' + PKibB + '" aria-valuemin="0"' +
        'aria-valuemax="100"><span class="mt-n4 text-900">KIB B : ' + formatRibuan(jumkibB.toString()) + ' - ' + PKibB + ' %</span></div>' +
        '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"' +
        'role="progressbar" style="width:25%" aria-valuenow="' + PKibC + '" aria-valuemin="0"' +
        'aria-valuemax="100"><span class="mt-n4 text-900">KIB C : ' + formatRibuan(jumkibC.toString()) + ' - ' + PKibC + ' %</span></div>' +
        '<div class="overflow-visible progress-bar bg-danger rounded-start rounded-pill"' +
        'role="progressbar" style="width:25%" aria-valuenow="' + PKibD + '" aria-valuemin="0"' +
        'aria-valuemax="100"><span class="mt-n4 text-900">KIB D : ' + formatRibuan(jumkibD.toString()) + ' - ' + PKibD + ' %</span></div>');

      $("#loading").fadeOut("slow");
    },
    error: function () {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";
    },
  });
}

//googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
//googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
//googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
//googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
//L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{

var peta1 = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
})
//var vector_kecamatan = L.layerGroup();
var wisatalayer = L.layerGroup();
var travellayer = L.layerGroup();
var hotellayer = L.layerGroup();
var restolayer = L.layerGroup();
    // DEKLARASI LAYERGROUP
/*
    // LOOPING UNTUK GET VECTOR KECAMATAN, MEMANGGIL GEOJSON YG DI DATABASE
    $.ajax({
        type: "GET",
        url: "../operator/aksi/ambil_vektor_kecamatan.php",
        dataType: "json",
        method: "GET",
        success: function(data) {
            var i;
            for (i = 0; i < data.length; i++) {
                L.geoJSON(data[i], {
                    style: {
                        color: 'gray',
                        fillColor: getRandomColor(),
                        fillOpacity: 0,
                        weight: 1,
                    },
                }).addTo(vector_kecamatan)
            }
        },
        error: function() {
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
*/
var map = L.map("map", {
  center: [-8.16884, 113.70224],
  zoom: 10,
  layers: [peta1, wisatalayer, hotellayer, restolayer],
});

    ////POSISI ALUN2 JEMBER ////
    var marker = L.circleMarker([-8.16884, 113.70224], {
      color: '#3388ff', weight: 2, fillOpacity: 0.4
    }).addTo(map).bindPopup("Pusat Kota");
    marker.setRadius(20);
   

    // API UNTUK MARKER
    //var iconApiKey = "a6bdace0ef044b63b68223c23362f463";
    var iconApiKey = "bba6ae273e4e475c912d5392d064391b";
    // API UNTUK MARKER

    // CUSTOM MARKER/PIN
    var userIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
       // iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=lightgreen&icon=user&apiKey=${iconApiKey}`,
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=lightgreen&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var travelIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=green&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var blueIconSM = new L.Icon({
      iconUrl: 'https://api.geoapify.com/v1/icon?type=awesome&color=%2352b74c&size=x-large&icon=tree&noWhiteCircle=true&scaleFactor=2&apiKey=bba6ae273e4e475c912d5392d064391b',
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
       // iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=blue&icon=house-damage&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [10,10],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
    });
    var redIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=building&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
       
    });
    var goldIconSM = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=gold&icon=house-user&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });

    var userIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=lightgreen&icon=user&apiKey=${iconApiKey}`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var travelIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=green&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var blueIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        //iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=blue&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconUrl: 'https://api.geoapify.com/v1/icon?type=awesome&color=%2352b74c&size=x-large&icon=tree&noWhiteCircle=true&scaleFactor=2&apiKey=bba6ae273e4e475c912d5392d064391b',
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var redIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=house-building&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });
    var goldIcon = new L.Icon({
        //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=gold&icon=map-marker-alt&iconType=awesome&strokeColor=%23514424&apiKey=a6bdace0ef044b63b68223c23362f463`,
        iconSize: [4, 6],
        iconAnchor: [8,10],
        popupAnchor: [1, -18],
        shadowSize: [10,14]
    });

  ambilmarkeraset()
	function ambilmarkeraset() {
        $.ajax({
            method: "POST",
            url: "aksi/ambil_marker_aset.php",
            dataType: "json",
            success: function(data) {
                const pusatXY = "-8.16884, 113.70224";
                const pusat = pusatXY.split(',');
                var pusatX = pusat[0];
                var pusatY = pusat[1];

                for (var i = 0; i < data.length; i++) {
                    const str2 = data[i].koordinat;
                    const words2 = str2.split(',');
 
                    //// menghitung jarak kota
                    var markerFromKota = L.circleMarker([pusatX, pusatY]);
                    var markerTo2 =  L.circleMarker([words2[0], words2[1]]);
                    var fromkota = markerFromKota.getLatLng();
                    var to2 = markerTo2.getLatLng();
                    var jarakkota = fromkota.distanceTo(to2).toFixed(0)/1000;

                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#3388ff', weight: 4, fillOpacity: 0.2
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td width="80" style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmbarang +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Luas</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].luas +' Meter</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Perolehan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">Rp. ' + data[i].hpo +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">penggunaan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].penggunaan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status Sewa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].sttssewa +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Sertifikat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].sttssertifikat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Status</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].sttstanah +'</td>'+
                              '</tr>'+
                          '</table>'+
                          '<br>'+
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill cmdMapDetail" type="button" data-id = "'+ data[i].idtanah + '" data-nama = "'+ data[i].nmbarang + '" data-alamat = "'+ data[i].alamat + '">Tampilkan Detail Aset</button></center>' 
                            ).addTo(wisatalayer)
                        marker.setRadius(8);

                    
                }
            },
        });
    }

    $('#map').on('click', 'a', function() {

        const pusatXY = "-8.16884, 113.70224";
        const pusat = pusatXY.split(',');
        var pusatX = pusat[0];
        var pusatY = pusat[1];

        const koordinat = $(this).data("koordinat");
        const poss = koordinat.split(',');
        var koordinatX = poss[0];var koordinatY = poss[1];

        var keterangan = $(this).data("keterangan");
        var ketjarak = $(this).data("ketjarak");
        
        map.closePopup();
       
            var control = L.Routing.control({
                createMarker: function() { return null; },	// menghilangkan marker tambahan					
                waypoints: [
                    L.latLng(koordinatX, koordinatY),
                    L.latLng(pusatX, pusatY)
                ],
                routeWhileDragging: false,
                reverseWaypoints: false,
                fitSelectedRoutes: true,
            }).addTo(map)
            control.hide();
    });

    $('#map').on('click', '.cmdMapDetail', function() {
      var idtanah = $(this).data('id');var nmbarang = $(this).data('nama');var alamat = $(this).data('alamat');
      $.ajax({
        type: 'POST',
        url: "aksi/tampilkan/tampilkan-detail.php",
        data: {idtanah: idtanah,nmbarang: nmbarang,alamat: alamat},
        beforeSend: function(e) {
          $("#loading").fadeIn();
          document.body.style.cursor = "wait";
        },
        success: function(resp) {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
            $("#isianModEditDataLarge").html(resp);
            $("#isianModEditDataLarge").fadeIn(1000);
            $("#modEditDataLarge").modal('show');
        },
        error: function() {
          $("#loading").fadeOut("slow");
          document.body.style.cursor = "default";
          alert("Koneksi ke server terputus");
        },
      });
    });

  $('#txtcarilokasi').keydown(function(e) {
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
                    beforeSend: function(e) {
                        $("#loading").fadeIn();
                        document.body.style.cursor = "wait";
                    },
                    success: function(resp) {
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
                    error: function() {
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
            success: function(resp) {
                $("#loading").fadeOut("slow");
                $("#isianModTambahDataLarge").html(resp);
                $("#isianModTambahDataLarge").fadeIn(1000);
                $("#modTambahDataLarge").modal('show');
                $("#txtcarilokasi").val("");
            },
        });
    }

    Chart.defaults.global.defaultFontColor = "#fff";

    var ctx = document.getElementById('umurChart').getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
    gradient.addColorStop(0, '#b2d1f0')

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function hitungGrafikTotalSekolah(){
      var idarea = $("#txttransid").val(); 
      var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
        $.ajax({
            type:"POST",
            url :"aksi/ambil_grafik_total_sekolah.php",
            data:{idarea:idarea,keterangan:keterangan},
            async : false,
            dataType : 'json',			
            success:function(data){	
                var labels = [];
                var values = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    document.body.style.cursor = "default";	
                    $("#loading").fadeOut("slow");
 
                    labels.push(jum.nmbentuksekolah);
                    values.push(jum.jumDetSekolah);

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
 
                    var hitChartContent = document.getElementById('hitungUmurChart');
                    hitChartContent.innerHTML = '';
                    $('#hitungUmurChart').append('<canvas id="umurChart" height="300px"><canvas>');
      
                    var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                    var salesChartData = {
                        labels: sortedLabels,
                            datasets: [
                                {
                                label                   : 'Jumlah',
                                borderColor             : 'rgb(255, 255, 255,0.6)',
                                backgroundColor         : gradient,
                                fill                    : true,
                                pointBorderColor        : 'rgba(0, 0, 0, 0)',
                                pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                                pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                                pointHoverBorderColor   : 'rgb(54, 162, 235)',
                                data                    : sortedData,
                                },
                            ]
                    }
                    
                    var salesChartOptions = {
                        maintainAspectRatio : false,
                        responsive : true,
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
                                ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
                                gridLines : {display : true,color:"#0d6ecf"}
                            }],
                            yAxes: [{
                                ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
                                gridLines : {display : false,}
                            }]
                        }
                        
                    }
                    var salesChart = new Chart(salesChartCanvas, { 
                        type: 'line', 
                        data: salesChartData, 
                        options: salesChartOptions,
                    })
                }); 
            },
            error: function() {
                $("#loading").fadeOut("slow");
                document.body.style.cursor = "default";				
            },				
        });		
    }	
  
    function isiGrafikKategori(){
      var idarea = $("#txttransid").val(); 
      var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
      $.ajax({
          type:"POST",
          url :"aksi/ambil_grafik_kategori_aset.php",
          data:{idarea:idarea,keterangan:keterangan},
          async : false,
          dataType : 'json',			
          success:function(data){	
              var labels = [];
              var values = [];
              myArray = data;
              $.each(myArray, function(index, jum) {
                  document.body.style.cursor = "default";	
                  $("#loading").fadeOut("slow");

                  labels.push(jum.nmkategori);
                  values.push(jum.jumAset);

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

                  var hitChartContent = document.getElementById('hitungKategoriChart');
                  hitChartContent.innerHTML = '';
                  $('#hitungKategoriChart').append('<canvas id="kategoriChart" height="300px"><canvas>');
    
                  var salesChartCanvas = $('#kategoriChart').get(0).getContext('2d')
                  var salesChartData = {
                      labels: sortedLabels,
                          datasets: [
                              {
                              label                   : 'Jumlah',
                              borderColor             : 'rgb(255, 255, 255,0.6)',
                              backgroundColor         : getRandomColor,
                              fill                    : true,
                              pointBorderColor        : 'rgba(0, 0, 0, 0)',
                              pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                              pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                              pointHoverBorderColor   : 'rgb(54, 162, 235)',
                              data                    : sortedData,
                              },
                          ]
                  }
                  
                  var salesChartOptions = {
                      maintainAspectRatio : false,
                      responsive : true,
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
                              ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
                              gridLines : {display : true,color:"#0d6ecf"}
                          }],
                          yAxes: [{
                              ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
                              gridLines : {display : false,}
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
          error: function() {
              $("#loading").fadeOut("slow");
              document.body.style.cursor = "default";				
          },				
      });		
  }	

  function isiGrafikSertifikat(){
    var idarea = $("#txttransid").val(); 
      var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
      $.ajax({
          type:"POST",
          url :"aksi/ambil_grafik_sertifikat.php",
          data:{idarea:idarea,keterangan:keterangan},
          async : false,
          dataType : 'json',
          success:function(data){	 
              //var labels = [];
              var valhasil = [];var vallabel = [];
              myArray = data;
              $.each(myArray, function(index, jum) {                  
                valhasil.push(jum.jumAset);
                vallabel.push(jum.nmbentuk);
              });				

              datax=valhasil;
              legend=vallabel;
              total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
              labelsvalues = datax.map(function(value,i){
              let p= Math.round((value / total) * 100) + '%';
              return legend[i]+' '+p;
              });

    var hitChartContent = document.getElementById('hitungSertifikatChart');
    hitChartContent.innerHTML = '';
    $('#hitungSertifikatChart').append('<canvas id="sertifikatChart" style="height:300px;"><canvas>');
    
    var salesChartCanvas = $('#sertifikatChart').get(0).getContext('2d')
    var salesChartData = {
      labels  : labelsvalues,
      datasets: [
        {
          label               : 'Jumlah',
          data                : datax,
          backgroundColor		  : ["#FF851B", "#F012BE", "#2ECC40"],
          borderColor         : ["#FF851B", "#F012BE", "#2ECC40"]           
        }
      ]
    }
  
    var salesChartOptions = {
      maintainAspectRatio : false,
      responsive : true,
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
  
  //////////////////////////////////////////////////////////////////// 				
                  $("#loading").fadeOut("slow");	
                  document.body.style.cursor = "default";
  
          },
          error: function() {
              $("#loading").fadeOut("slow");	
              //toastr.error('Koneksi bermasalah periksa internet');
              document.body.style.cursor = "default";					
          },
      });		
  }

    function isiGrafikStatus(){
      var idarea = $("#txttransid").val(); 
      var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_status_sekolah.php",
            data:{idarea:idarea,keterangan:keterangan},
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valsw = [];var valneg = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuksekolah);
                    valsw.push(jum.jumSwasta);
                    valneg.push(jum.jumNegeri);
                });				
                        
      var hitChartContent = document.getElementById('hitungChartContentADMIN');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN" height="300px"><canvas>');
      
      var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'Pinjam Pakai',
            backgroundColor		  : 'rgb(0, 255, 255)',
            borderColor         : 'rgb(0, 255, 255)',
            data                : valneg,
          },
          {
            label               : 'Disewakan',
            backgroundColor		  : 'rgb(255, 105, 180)',
            borderColor         : 'rgb(255, 105, 180)',
            data                : valsw,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
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
            ticks: {fontColor: 'rgb(255, 255, 255,0.6)'},
            gridLines : {display : false},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
            gridLines : {display : true,color:"#0d6ecf"}
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
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

    function isiGrafikDisewa(){
      var idarea = $("#txttransid").val(); 
      var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
      $.ajax({
          type:"POST",
          url : "aksi/ambil_grafik_sedang_disewa.php",
          data:{idarea:idarea,keterangan:keterangan},
          dataType : 'json',			
          beforeSend: function(e) {
              $("#loading").fadeIn();
              document.body.style.cursor = "wait";
          },
          success:function(data){			
              var labels = [];
              var valsw = [];var valneg = [];
              myArray = data;
              $.each(myArray, function(index, jum) {
                  labels.push(jum.nmbentuksekolah);
                  valsw.push(jum.jumDisewa);
                  valneg.push(jum.jumTidak);
              });				
                      
    var hitChartContent = document.getElementById('hitungDisewakanChart');
    hitChartContent.innerHTML = '';
    $('#hitungDisewakanChart').append('<canvas id="sewaChart" height="300px"><canvas>');
    
    var salesChartCanvas = $('#sewaChart').get(0).getContext('2d')
    var salesChartData = {
      labels  : labels,
      datasets: [
        {
          label               : 'Tidak Disewa',
          backgroundColor		  : 'rgb(255, 105, 180)',
          borderColor         : 'rgb(255, 105, 180)',
          data                : valneg,
        },
        {
          label               : 'Disewa',
          backgroundColor		  : 'rgb(0, 255, 255)',
          borderColor         : 'rgb(0, 255, 255)',
          data                : valsw,
        },
      ]
    }
  
    var salesChartOptions = {
      maintainAspectRatio : false,
      responsive : true,
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
          ticks: {fontColor: 'rgb(255, 255, 255,0.6)'},
          gridLines : {display : false},
          barPercentage: 0.6
        }],
        yAxes: [{
          ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
          gridLines : {display : true,color:"#0d6ecf"}
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
          error: function() {
              $("#loading").fadeOut("slow");	
              //toastr.error('Koneksi bermasalah periksa internet');
              document.body.style.cursor = "default";					
          },
      });		
  }

  function isiGrafikDipinjam(){
    var idarea = $("#txttransid").val(); 
      var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
    $.ajax({
        type:"POST",
        url : "aksi/ambil_grafik_sedang_dipinjam.php",
        data:{idarea:idarea,keterangan:keterangan},
        dataType : 'json',			
        beforeSend: function(e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success:function(data){			
            var labels = [];
            var valsw = [];var valneg = [];
            myArray = data;
            $.each(myArray, function(index, jum) {
                labels.push(jum.nmbentuksekolah);
                valsw.push(jum.jumDisewa);
                valneg.push(jum.jumTidak);
            });				
                    
  var hitChartContent = document.getElementById('hitungPinjamChart');
  hitChartContent.innerHTML = '';
  $('#hitungPinjamChart').append('<canvas id="pinjamChart" height="300px"><canvas>');
  
  var salesChartCanvas = $('#pinjamChart').get(0).getContext('2d')
  var salesChartData = {
    labels  : labels,
    datasets: [
      {
        label               : 'Tidak Dipinjam Pakai',
        backgroundColor		  : 'rgb(255, 105, 180)',
        borderColor         : 'rgb(255, 105, 180)',
        data                : valneg,
      },
      {
        label               : 'Dipinjam Pakai',
        backgroundColor		  : 'rgb(0, 255, 255)',
        borderColor         : 'rgb(0, 255, 255)',
        data                : valsw,
      },
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
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
        ticks: {fontColor: 'rgb(255, 255, 255,0.6)'},
        gridLines : {display : false},
        barPercentage: 0.6
      }],
      yAxes: [{
        ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
        gridLines : {display : true,color:"#0d6ecf"}
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
        error: function() {
            $("#loading").fadeOut("slow");	
            //toastr.error('Koneksi bermasalah periksa internet');
            document.body.style.cursor = "default";					
        },
    });		
}

function isiLapAsetLembaga(){
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
	$.ajax({
	  type:"POST",
	  url : "aksi/ambil_aset_lembaga.php",
    data:{idarea:idarea,keterangan:keterangan},
	  dataType : 'json',
    beforeSend: function(e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelAsetStatistikLembaga').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
					if (data[i].sttstransaksi == "Terima"){var hidterima = "";}
					else {var hidterima = "display:none;";}
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="56%" style="max-width:250px;">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-primary">'+data[i].jmlkiba+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-success">'+data[i].jmlkibb+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-warning">'+data[i].jmlkibd+'</span></td>'+
          '<td class="align-middle text-center" width="8%"><span class="badge badge-soft-secondary">'+data[i].jmltotal+'</span></td>'+
				  '</tr>';
				  }			
				  $('#isitabelAsetStatistikLembaga').html(html);
				  $("#tabelAsetStatistikLembaga").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$('#cmdRefreshStatLembaga').on('click', function () {
  isiLapAsetLembaga()
})

function isiTabelPotensiSewa(){
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
  $.ajax({
      type: "POST",
      url: "aksi/ambil_potensi_sewa.php",
      data:{idarea:idarea,keterangan:keterangan},
      dataType: 'json',
      beforeSend: function(e) {
          $("#loading").fadeIn();
          document.body.style.cursor = "wait";
      },
      success: function(data) {
          document.body.style.cursor = "default";
          $('#tabelPotensiSewa').dataTable().fnDestroy();
          var html = '';
          var i;
          for (i = 0; i < data.length; i++) {

              if ( data[i].sttssewa == "DISEWAKAN"){var warna = "info";}
              else if ( data[i].sttssewa == "TIDAK DISEWAKAN"){var warna = "warning";}

              if ( data[i].sttssertifikat == "SERTIFIKAT"){var warnaserf = "primary";}
              else if ( data[i].sttssertifikat == "BELUM SERTIFIKAT"){var warnaserf = "warning";}

              html +=
                  '<tr class="btn-reveal-trigger">' +
                  '<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
                  '<td class="align-middle text-truncate" width="25%" style="max-width:200px;">' + data[i].nmbarang + '</td>' +
                  '<td class="align-middle text-truncate" width="39%" style="max-width:250px;">' + data[i].alamat + '</td>' +
                  '<td class="align-middle text-center" width="8%">' + data[i].luas + '</td>' +
                  '<td class="align-middle text-center" width="12%">'+ data[i].hrgsewa + '</span>'+
                  '</td>' +
                  '<td class="align-middle text-center" width="12%">' + data[i].hrgpotensi + '</td>' +
                  '</tr>';
          }
          $('#isitabelPotensiSewa').html(html);
          $("#tabelPotensiSewa").dataTable({
              "paging": true,
              "lengthChange": false,
              "ordering": true,
              "info": false,
              "autoWidth": true,
              "responsive": true,
              "select": false,
              "scrollX": false,
              initComplete: function() {
                  $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
              },
              "searching": true,
          });
          $("#loading").fadeOut("slow");

      },
      error: function() {
          $("#loading").fadeOut("slow");
          alert("Koneksi bermasalah periksa internet");
          document.body.style.cursor = "default";
      },
  });
}

$('#cmdRefreshPotensiSewa').on('click', function () {
  isiTabelPotensiSewa()
})

function isiLapPengajuanSewa(){
  var idarea = $("#txttransid").val(); 
  var keterangan = $("#txttransketerangan").val();//data:{idarea:idarea,keterangan:keterangan},
	$.ajax({
	  type:"POST",
	  url : "aksi/ambil_tabel_pengajuan_sewa.php",
    data:{idarea:idarea,keterangan:keterangan},
	  dataType : 'json',
    beforeSend: function(e) {
      $("#loading").fadeIn();
      document.body.style.cursor = "wait";
    },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelPengajuanStatistikSewa').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
					if (data[i].sttstransaksi == "Terima"){var hidterima = "";}
					else {var hidterima = "display:none;";}
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-center" width="12%">'+data[i].tglpengajuan+'</td>'+
					'<td class="align-middle" width="28%">'+data[i].nmpenyewa+'<br/>'+data[i].nik+'</td>'+
					'<td class="align-middle text-truncate" width="58%" style="max-width:200px;">'+data[i].nmbarang+'<br/>'+data[i].alamat+'</td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-primary">'+data[i].totluas+'</span></td>'+
					'<td class="align-middle text-center" width="8%">'+data[i].totpenawaran+'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelPengajuanStatistikSewa').html(html);
				  $("#tabelPengajuanStatistikSewa").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$('#cmdRefreshPengajuanSewa').on('click', function () {
  isiLapPengajuanSewa()
})

/*
    function isiGrafikAkreditasi(){
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_akreditasi.php",
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valA = [];var valB = [];var valC = [];var valBelum = [];var valTidak = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuk);
                    valA.push(jum.jumA);valB.push(jum.jumB);valC.push(jum.jumC);
                    valBelum.push(jum.jumBelum);valTidak.push(jum.jumTidak);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentAkreditasi');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentAkreditasi').append('<canvas id="hitungChartAkreditasi" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartAkreditasi').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'A',
            backgroundColor		  : '#00FF00',
            borderColor         : '#00FF00',
            data                : valA,
          },
          {
            label               : 'B',
            backgroundColor		  : 'rgb(0, 255, 255)',
            borderColor         : 'rgb(0, 255, 255)',
            data                : valB,
          },
          {
            label               : 'C',
            backgroundColor		  : '#EEE8AA',
            borderColor         : '#EEE8AA',
            data                : valC,
          },
          {
            label               : 'Belum Terakreditasi',
            backgroundColor		  : '#FFA500',
            borderColor         : '#FFA500',
            data                : valBelum,
          },
          {
            label               : 'Tidak Terakreditasi',
            backgroundColor		  : 'rgb(255, 0, 0)',
            borderColor         : 'rgb(255, 0, 0)',
            data                : valTidak,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
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
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
            gridLines : {display : true,color:"#0d6ecf"}
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
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

    function isiGrafikBandingGuruSiswa(){
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_perbandingan_guru.php",
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valsw = [];var valgu = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuksekolah);
                    valsw.push(jum.jumSiswa);
                    valgu.push(jum.jumGuru);
                });				
                        
      var hitChartContent = document.getElementById('hitungChartContentGuru');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentGuru').append('<canvas id="hitungChartGuru" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartGuru').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'Guru',
            backgroundColor		  : 'rgb(255,255,26)',
            borderColor         : 'rgb(255,255,26)',
            data                : valgu,
          },
          {
            label               : 'Siswa',
            backgroundColor		  : 'rgb(255, 105, 180)',
            borderColor         : 'rgb(255, 105, 180)',
            data                : valsw,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
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
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
            gridLines : {display : true,color:"#0d6ecf"}
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
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

    //////////////////////////////////////////
    //////////////// KECAMATAN ///////////////
    //////////////////////////////////////////
    
    function hitungGrafikTotalSekolahKec(){
        var idkecamatan = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url :"aksi/ambil_grafik_total_sekolah_kecamatan.php",
             data:{idkecamatan:idkecamatan},
             async : false,
             dataType : 'json',			
             success:function(data){	
                 var labels = [];
                 var values = [];		
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                  document.body.style.cursor = "default";	
                  $("#loading").fadeOut("slow");

                  labels.push(jum.nmbentuksekolah);
                  values.push(jum.jumDetSekolah);

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

                  var hitChartContent = document.getElementById('hitungUmurChart');
                  hitChartContent.innerHTML = '';
                  $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
    
                  var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                  var salesChartData = {
                      labels: sortedLabels,
                          datasets: [
                              {
                              label                   : 'Jumlah',
                              borderColor             : 'rgb(255, 255, 255,0.6)',
                              backgroundColor         : gradient,
                              fill                    : true,
                              pointBorderColor        : 'rgba(0, 0, 0, 0)',
                              pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                              pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                              pointHoverBorderColor   : 'rgb(54, 162, 235)',
                              data                    : sortedData,
                              },
                          ]
                  }
                  
                  var salesChartOptions = {
                      maintainAspectRatio : true,
                      responsive : true,
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
                              ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
                              gridLines : {display : true,color:"#0d6ecf"}
                          }],
                          yAxes: [{
                              ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
                              gridLines : {display : false,}
                          }]
                      }
                      
                  }
                  var salesChart = new Chart(salesChartCanvas, { 
                      type: 'line', 
                      data: salesChartData, 
                      options: salesChartOptions,
                  })
                 }); 
             },
             error: function() {
                 $("#loading").fadeOut("slow");
                 document.body.style.cursor = "default";				
             },				
         });						
     }	
    
     function isiGrafikStatusKec(){
        var idkecamatan = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_status_sekolah_kecamatan.php",
             data:{idkecamatan:idkecamatan},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valneg = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSwasta);
                     valneg.push(jum.jumNegeri);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentADMIN');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN"><canvas>');
      
       var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Negeri',
             backgroundColor		  : 'rgb(0, 255, 255)',
             borderColor         : 'rgb(0, 255, 255)',
             data                : valneg,
           },
           {
             label               : 'Swasta',
             backgroundColor		  : 'rgb(255, 105, 180)',
             borderColor         : 'rgb(255, 105, 180)',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
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
             ticks: {fontColor: 'rgb(255, 255, 255,0.6)'},
             gridLines : {display : false},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
             gridLines : {display : true,color:"#0d6ecf"}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )			
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }
 
     function isiGrafikAkreditasiKec(){
        var idkecamatan = $("#txttransid").val();
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_akreditasi_kecamatan.php",
            data:{idkecamatan:idkecamatan},
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valA = [];var valB = [];var valC = [];var valBelum = [];var valTidak = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuk);
                    valA.push(jum.jumA);valB.push(jum.jumB);valC.push(jum.jumC);
                    valBelum.push(jum.jumBelum);valTidak.push(jum.jumTidak);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentAkreditasi');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentAkreditasi').append('<canvas id="hitungChartAkreditasi" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartAkreditasi').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'A',
            backgroundColor		  : '#00FF00',
            borderColor         : '#00FF00',
            data                : valA,
          },
          {
            label               : 'B',
            backgroundColor		  : 'rgb(0, 255, 255)',
            borderColor         : 'rgb(0, 255, 255)',
            data                : valB,
          },
          {
            label               : 'C',
            backgroundColor		  : '#EEE8AA',
            borderColor         : '#EEE8AA',
            data                : valC,
          },
          {
            label               : 'Belum Terakreditasi',
            backgroundColor		  : '#FFA500',
            borderColor         : '#FFA500',
            data                : valBelum,
          },
          {
            label               : 'Tidak Terakreditasi',
            backgroundColor		  : 'rgb(255, 0, 0)',
            borderColor         : 'rgb(255, 0, 0)',
            data                : valTidak,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
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
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
            gridLines : {display : true,color:"#0d6ecf"}
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
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

     function isiGrafikBandingGuruSiswaKec(){
        var idkecamatan = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_perbandingan_guru_kecamatan.php",
             data:{idkecamatan:idkecamatan},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valgu = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSiswa);
                     valgu.push(jum.jumGuru);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentGuru');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentGuru').append('<canvas id="hitungChartGuru" height="300px"><canvas>');
      
       var salesChartCanvas = $('#hitungChartGuru').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Guru',
             backgroundColor		  : 'rgb(0, 255, 255)',
             borderColor         : 'rgb(0, 255, 255)',
             data                : valgu,
           },
           {
             label               : 'Siswa',
             backgroundColor		  : 'rgb(255, 105, 180)',
             borderColor         : 'rgb(255, 105, 180)',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
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
             ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
             gridLines : {display : false,},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
             gridLines : {display : true,color:"#0d6ecf"}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )
 		
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }

    //////////////////////////////////////////
    //////////////// DESA ///////////////
    //////////////////////////////////////////
    
    function hitungGrafikTotalSekolahDesa(){
        var iddesa = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url :"aksi/ambil_grafik_total_sekolah_desa.php",
             data:{iddesa:iddesa},
             async : false,
             dataType : 'json',			
             success:function(data){	
                 var labels = [];
                 var values = [];		
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                  document.body.style.cursor = "default";	
                  $("#loading").fadeOut("slow");

                  labels.push(jum.nmbentuksekolah);
                  values.push(jum.jumDetSekolah);

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

                  var hitChartContent = document.getElementById('hitungUmurChart');
                  hitChartContent.innerHTML = '';
                  $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
    
                  var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                  var salesChartData = {
                      labels: sortedLabels,
                          datasets: [
                              {
                              label                   : 'Jumlah',
                              borderColor             : 'rgb(255, 255, 255,0.6)',
                              backgroundColor         : gradient,
                              fill                    : true,
                              pointBorderColor        : 'rgba(0, 0, 0, 0)',
                              pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                              pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                              pointHoverBorderColor   : 'rgb(54, 162, 235)',
                              data                    : sortedData,
                              },
                          ]
                  }
                  
                  var salesChartOptions = {
                      maintainAspectRatio : true,
                      responsive : true,
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
                              ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
                              gridLines : {display : true,color:"#0d6ecf"}
                          }],
                          yAxes: [{
                              ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
                              gridLines : {display : false,}
                          }]
                      }
                      
                  }
                  var salesChart = new Chart(salesChartCanvas, { 
                      type: 'line', 
                      data: salesChartData, 
                      options: salesChartOptions,
                  })
              }); 
            },
             error: function() {
                 $("#loading").fadeOut("slow");
                 document.body.style.cursor = "default";				
             },				
         });						
     }	
    
     function isiGrafikStatusDesa(){
        var iddesa = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_status_sekolah_desa.php",
             data:{iddesa:iddesa},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valneg = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSwasta);
                     valneg.push(jum.jumNegeri);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentADMIN');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN"><canvas>');
      
       var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Negeri',
             backgroundColor		  : 'rgb(0, 255, 255)',
             borderColor         : 'rgb(0, 255, 255)',
             data                : valneg,
           },
           {
             label               : 'Swasta',
             backgroundColor		  : 'rgb(255, 105, 180)',
             borderColor         : 'rgb(255, 105, 180)',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
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
             ticks: {fontColor: 'rgb(255, 255, 255,0.6)'},
             gridLines : {display : false},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
             gridLines : {display : true,color:"#0d6ecf"}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )			
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }
 
     function isiGrafikAkreditasiDesa(){
        var iddesa = $("#txttransid").val();
        $.ajax({
            type:"POST",
            url : "aksi/ambil_grafik_akreditasi_desa.php",
            data:{iddesa:iddesa},
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valA = [];var valB = [];var valC = [];var valBelum = [];var valTidak = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuk);
                    valA.push(jum.jumA);valB.push(jum.jumB);valC.push(jum.jumC);
                    valBelum.push(jum.jumBelum);valTidak.push(jum.jumTidak);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentAkreditasi');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentAkreditasi').append('<canvas id="hitungChartAkreditasi" height="300px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartAkreditasi').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'A',
            backgroundColor		  : '#00FF00',
            borderColor         : '#00FF00',
            data                : valA,
          },
          {
            label               : 'B',
            backgroundColor		  : 'rgb(0, 255, 255)',
            borderColor         : 'rgb(0, 255, 255)',
            data                : valB,
          },
          {
            label               : 'C',
            backgroundColor		  : '#EEE8AA',
            borderColor         : '#EEE8AA',
            data                : valC,
          },
          {
            label               : 'Belum Terakreditasi',
            backgroundColor		  : '#FFA500',
            borderColor         : '#FFA500',
            data                : valBelum,
          },
          {
            label               : 'Tidak Terakreditasi',
            backgroundColor		  : 'rgb(255, 0, 0)',
            borderColor         : 'rgb(255, 0, 0)',
            data                : valTidak,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
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
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
            gridLines : {display : true,color:"#0d6ecf"}
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
            error: function() {
                $("#loading").fadeOut("slow");	
                //toastr.error('Koneksi bermasalah periksa internet');
                document.body.style.cursor = "default";					
            },
        });		
    }

     function isiGrafikBandingGuruSiswaDesa(){
        var iddesa = $("#txttransid").val();
         $.ajax({
             type:"POST",
             url : "aksi/ambil_grafik_perbandingan_guru_desa.php",
             data:{iddesa:iddesa},
             dataType : 'json',			
             beforeSend: function(e) {
                 $("#loading").fadeIn();
                 document.body.style.cursor = "wait";
             },
             success:function(data){			
                 var labels = [];
                 var valsw = [];var valgu = [];
                 myArray = data;
                 $.each(myArray, function(index, jum) {
                     labels.push(jum.nmbentuksekolah);
                     valsw.push(jum.jumSiswa);
                     valgu.push(jum.jumGuru);
                 });				
                         
        var hitChartContent = document.getElementById('hitungChartContentGuru');
       hitChartContent.innerHTML = '';
       $('#hitungChartContentGuru').append('<canvas id="hitungChartGuru" height="300px"><canvas>');
      
       var salesChartCanvas = $('#hitungChartGuru').get(0).getContext('2d')
       var salesChartData = {
         labels  : labels,
         datasets: [
           {
             label               : 'Guru',
             backgroundColor		  : 'rgb(0, 255, 255)',
             borderColor         : 'rgb(0, 255, 255)',
             data                : valgu,
           },
           {
             label               : 'Siswa',
             backgroundColor		  : 'rgb(255, 105, 180)',
             borderColor         : 'rgb(255, 105, 180)',
             data                : valsw,
           },
         ]
       }
     
       var salesChartOptions = {
         maintainAspectRatio : false,
         responsive : true,
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
             ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)'},
             gridLines : {display : false,},
             barPercentage: 0.6
           }],
           yAxes: [{
             ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
             gridLines : {display : true,color:"#0d6ecf"}
           }]
         }
       }
       var salesChart = new Chart(salesChartCanvas, { 
           type: 'bar', 
           data: salesChartData, 
           options: salesChartOptions
         }
       )
 		
                     $("#loading").fadeOut("slow");	
                     document.body.style.cursor = "default";
     
             },
             error: function() {
                 $("#loading").fadeOut("slow");	
                 document.body.style.cursor = "default";					
             },
         });		
     }
*/
    function formatRibuan(angka, prefix){
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split   		= number_string.split(','),
        sisa     		= split[0].length % 3,
        rupiah     		= split[0].substr(0, sisa),
        ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
     
        if(ribuan){
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
     
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
    }
    
    $("#lv_dashboard").click(function(){
        bersihkan()
        //$("#area-halaman-utama").fadeIn();
        $("#area-peta").fadeIn();
        $("#area-halaman-sekolah").fadeOut("slow");
        $("#area-halaman-operator").fadeOut("slow");
        $('#hal-detail-sekolah').html("");$("#div-video").html("")

        $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
        map.closePopup();
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah);
        var keterangan = $(this).data('keterangan');
        $("#txttransketerangan").val(keterangan);$("#txttransnmwilayah").val(nmwilayah);
        var koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]],10);
    });

    $("#lv_statistik").click(function(){
      bersihkan()
      $("#area-halaman-utama").fadeIn();

      $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
      map.closePopup();
      var iddesa = $(this).data('id');
      var nmwilayah = $(this).data('nama');
      $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
      $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
      var keterangan = $(this).data('keterangan');
      $("#txttransid").val(iddesa);$("#txttransketerangan").val(keterangan);$("#txttransnmwilayah").val(nmwilayah);

      isiDataSarana()
      isiLapAsetLembaga();
      hitungGrafikTotalSekolah();
      isiGrafikKategori();
      isiGrafikSertifikat();
      isiGrafikStatus();
      isiGrafikDisewa();
      isiGrafikDipinjam();
      isiTabelPotensiSewa();
      isiLapPengajuanSewa();
  });

  $(".lv_desa").click(function(){
    bersihkan()
      $("#area-halaman-utama").fadeIn();

      $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
      map.closePopup();
      var iddesa = $(this).data('id');
      var nmwilayah = $(this).data('nama');
      $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
      $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
      var keterangan = $(this).data('keterangan');
      $("#txttransid").val(iddesa);$("#txttransketerangan").val(keterangan);$("#txttransnmwilayah").val(nmwilayah);

      isiDataSarana()
      isiLapAsetLembaga();
      hitungGrafikTotalSekolah();
      isiGrafikKategori();
      isiGrafikSertifikat();
      isiGrafikStatus();
      isiGrafikDisewa();
      isiGrafikDipinjam();
      isiTabelPotensiSewa();
      isiLapPengajuanSewa();
  });
  
  $(".lv_kecamatan").click(function(){
    bersihkan()
      $("#area-halaman-utama").fadeIn();

      $("#txttransid").val(""); $("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
      map.closePopup();
      var iddesa = $(this).data('id');
      var nmwilayah = $(this).data('nama');
      $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
      $("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
      var keterangan = $(this).data('keterangan');
      $("#txttransid").val(iddesa);$("#txttransketerangan").val(keterangan);$("#txttransnmwilayah").val(nmwilayah);

      isiDataSarana()
      isiLapAsetLembaga();
      hitungGrafikTotalSekolah();
      isiGrafikKategori();
      isiGrafikSertifikat();
      isiGrafikStatus();
      isiGrafikDisewa();
      isiGrafikDipinjam();
      isiTabelPotensiSewa();
      isiLapPengajuanSewa();
  });

    $("#lv_sinkron").click(function(){
      map.closePopup();
      sinkronJson();
  });


    $("#cmdTampilBaik").click(function(){     
      var ketwilayah = $("#txttransketerangan").val();
      var idwilayah = $("#txttransid").val(); var nmwilayah = $("#txttransnmwilayah").val();
        $.ajax({
          type: 'POST',
          url: "aksi/tampilkan/tampilkan-total-baik.php",
          data: {ketwilayah: ketwilayah,idwilayah: idwilayah,nmwilayah: nmwilayah},
          beforeSend: function(e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
          },
          success: function(resp) {
              $("#loading").fadeOut("slow");
              document.body.style.cursor = "default";
              $("#isianModEditDataLarge").html(resp);
              $("#isianModEditDataLarge").fadeIn(1000);
              $("#modEditDataLarge").modal('show');
          },
          error: function() {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
            alert("Koneksi ke server terputus");
          },
        });
    });

    $("#cmdTampilRingan").click(function(){     
      var ketwilayah = $("#txttransketerangan").val();
      var idwilayah = $("#txttransid").val(); var nmwilayah = $("#txttransnmwilayah").val();
        $.ajax({
          type: 'POST',
          url: "aksi/tampilkan/tampilkan-total-ringan.php",
          data: {ketwilayah: ketwilayah,idwilayah: idwilayah,nmwilayah: nmwilayah},
          beforeSend: function(e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
          },
          success: function(resp) {
              $("#loading").fadeOut("slow");
              document.body.style.cursor = "default";
              $("#isianModEditDataLarge").html(resp);
              $("#isianModEditDataLarge").fadeIn(1000);
              $("#modEditDataLarge").modal('show');
          },
          error: function() {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
            alert("Koneksi ke server terputus");
          },
        });
    });

    $("#cmdTampilSedang").click(function(){     
      var ketwilayah = $("#txttransketerangan").val();
      var idwilayah = $("#txttransid").val(); var nmwilayah = $("#txttransnmwilayah").val();
        $.ajax({
          type: 'POST',
          url: "aksi/tampilkan/tampilkan-total-sedang.php",
          data: {ketwilayah: ketwilayah,idwilayah: idwilayah,nmwilayah: nmwilayah},
          beforeSend: function(e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
          },
          success: function(resp) {
              $("#loading").fadeOut("slow");
              document.body.style.cursor = "default";
              $("#isianModEditDataLarge").html(resp);
              $("#isianModEditDataLarge").fadeIn(1000);
              $("#modEditDataLarge").modal('show');
          },
          error: function() {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
            alert("Koneksi ke server terputus");
          },
        });
    });

    $("#cmdTampilBerat").click(function(){     
      var ketwilayah = $("#txttransketerangan").val();
      var idwilayah = $("#txttransid").val(); var nmwilayah = $("#txttransnmwilayah").val();
        $.ajax({
          type: 'POST',
          url: "aksi/tampilkan/tampilkan-total-berat.php",
          data: {ketwilayah: ketwilayah,idwilayah: idwilayah,nmwilayah: nmwilayah},
          beforeSend: function(e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
          },
          success: function(resp) {
              $("#loading").fadeOut("slow");
              document.body.style.cursor = "default";
              $("#isianModEditDataLarge").html(resp);
              $("#isianModEditDataLarge").fadeIn(1000);
              $("#modEditDataLarge").modal('show');
          },
          error: function() {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
            alert("Koneksi ke server terputus");
          },
        });
    });

    function isiVideo() {
      //let player = Plyr.setup('.popin__video-container');
      //player.pause();
      $("#div-video").html("")
      var idsekolah = $("#txttransiddetailsekolah").val();
      $("#div-video").html('<source src="../data-media/video/' + idsekolah + '.mp4" type="video/mp4" size="576">')
  }
 
  function isiFotoKelas() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "kelas";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery1"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-kelas').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoPerpustakaan() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "perpustakaan";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery2"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-perpustakaan').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoKepsek() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "kepsek";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery3"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-kepsek').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoGuru() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "guru";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery4"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-guru').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }
  
  function isiFotoPembinaan() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "pembinaan";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery5"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-pembinaan').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoMultimedia() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "multimedia";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery6"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-multimedia').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoKomputer() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "komputer";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery7"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-komputer').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoIPS() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "ips";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery8"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-ips').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoIPA() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "ipa";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery9"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-ipa').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoBahasa() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "bahasa";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery10"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-bahasa').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoWCUmum() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "wcumum";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery11"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-wcumum').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoWCSiswa() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "wcsiswa";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery12"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-wcsiswa').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoWCGuru() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "wcguru";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery13"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-wcguru').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoIbadah() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "ibadah";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery14"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-ibadah').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

  function isiFotoAsrama() {
      var idsekolah = $("#txttransiddetailsekolah").val();
      var ruang = "asrama";
      $.ajax({
          type: "POST",
          url: "aksi/list-file/kelas.php",
          data: {idsekolah: idsekolah,ruang: ruang},
          dataType: 'json',
          success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                  html +=
                      '<div class="col-3 p-1"><a class="glightbox" href="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" data-gallery="gallery15"><img class="img-fluid rounded" src="../data-media/foto/'+idsekolah+'/'+ruang+'/' + data[i].nmfile + '" alt="" /></a></div>'
              }
              $('#div-asrama').html(html);
              var lightbox = GLightbox();
              lightbox.on('open', (target) => {
                  console.log('lightbox opened');
              });
              var lightboxDescription = GLightbox({
                  selector: '.glightbox'
              });
          },
          error: function() {
              console.log('error');
          },
      });
  }

