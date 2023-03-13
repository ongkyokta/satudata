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

var wisatalayer = L.layerGroup();
var travellayer = L.layerGroup();
var hotellayer = L.layerGroup();
var restolayer = L.layerGroup();
var ekraflayer = L.layerGroup();
var kesenianlayer = L.layerGroup();

var map = L.map("map", {
  center: [-8.16884, 113.70224],
  zoom: 10,
  layers: [peta1, wisatalayer, hotellayer, restolayer, ekraflayer, kesenianlayer],
});

    var marker = L.circleMarker([-8.16884, 113.70224], {
      color: '#3388ff', weight: 2, fillOpacity: 0.4
    }).addTo(map).bindPopup("Pusat Kota");
    marker.setRadius(20);
 
    var iconApiKey = "bba6ae273e4e475c912d5392d064391b";
 
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

    ambilmarkertempat();
    ambilmarkerkesenian();
 
    function ambilmarkertempat() {
        $.ajax({
            url: "aksi/ambil_marker_tempat.php",
            dataType: "json",
            method: "POST",
            success: function(data) {
                const pusatXY = "-8.16884, 113.70224";
                const pusat = pusatXY.split(',');
                var pusatX = pusat[0];
                var pusatY = pusat[1];

                var posisiX = $("#lbllatitude").val();
                var posisiY = $("#lbllongitude").val();

                for (var i = 0; i < data.length; i++) {
                    const str2 = data[i].koordinat;
                    const words2 = str2.split(',');

                    var markerFromKota = L.circleMarker([pusatX, pusatY]);
                    var markerTo2 =  L.circleMarker([words2[0], words2[1]]);
                    var fromkota = markerFromKota.getLatLng();
                    var to2 = markerTo2.getLatLng();
                    var jarakkota = fromkota.distanceTo(to2).toFixed(0)/1000;
 
                    if (data[i].jenis == "Wisata"){
                        var marker = L.circleMarker([words2[0], words2[1]], {
                          color: '#3388ff', weight: 2, fillOpacity: 0.1
                        }).bindPopup(
                          '<table>'+
                            '<tr>'+
                              '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].nmkecamatan +'</td>'+
                              '</tr>'+
                              '<tr>'+
                              '<td style="vertical-align: top;font-weight:bold;">Jenis</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;font-weight:bold;">' + data[i].jenis +'</td>'+
                              '</tr>'+
                          '</table>'+
                          '<br><span class="btext-xs" style="color:gray"><b>Diskripsi</b><br>' + data[i].diskripsi +
                          '</span>' +
                          '<br><br>'+
                          '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                          '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                          '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill cmdMapDetail" type="button" data-id = '+ data[i].idtempat + ' hidden >Tampilkan Detail '+ data[i].jenis + '</button></center>'                       
                            ).addTo(wisatalayer)
                        marker.setRadius(8);
                    } else if (data[i].jenis == "Hotel"){
                      var marker = L.circleMarker([words2[0], words2[1]], {
                        color: '#FF0000', weight: 2, fillOpacity: 0.1
                      }).bindPopup(
                        '<table>'+
                          '<tr>'+
                            '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].nmkecamatan +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;font-weight:bold;">Jenis</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;font-weight:bold;">' + data[i].jenis +'</td>'+
                            '</tr>'+
                        '</table>'+
                        '<br><span class="btext-xs" style="color:gray"><b>Diskripsi</b><br>' + data[i].diskripsi +
                        '</span>' +
                        '<br><br>'+
                        '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                        '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                        '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill cmdMapDetail" type="button" data-id = '+ data[i].idtempat + ' hidden >Tampilkan Detail '+ data[i].jenis + '</button></center>'                       
                          ).addTo(hotellayer)
                      marker.setRadius(8);
                  } else if (data[i].jenis == "Kuliner"){
                    var marker = L.circleMarker([words2[0], words2[1]], {
                      color: '#008080', weight: 2, fillOpacity: 0.1
                    }).bindPopup(
                      '<table>'+
                        '<tr>'+
                          '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                          '</tr>'+
                          '<tr>'+
                          '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                          '</tr>'+
                          '<tr>'+
                          '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].nmkecamatan +'</td>'+
                          '</tr>'+
                          '<tr>'+
                          '<td style="vertical-align: top;font-weight:bold;">Jenis</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;font-weight:bold;">' + data[i].jenis +'</td>'+
                          '</tr>'+
                      '</table>'+
                      '<br><span class="btext-xs" style="color:gray"><b>Diskripsi</b><br>' + data[i].diskripsi +
                      '</span>' +
                      '<br><br>'+
                      '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                      '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                      '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill cmdMapDetail" type="button" data-id = '+ data[i].idtempat + ' hidden >Tampilkan Detail '+ data[i].jenis + '</button></center>'                       
                        ).addTo(restolayer)
                    marker.setRadius(8);
                } else if (data[i].jenis == "Ekraf"){
                  var marker = L.circleMarker([words2[0], words2[1]], {
                    color: '#FFA500', weight: 2, fillOpacity: 0.1
                  }).bindPopup(
                    '<table>'+
                      '<tr>'+
                        '<td style="vertical-align: top;">Nama</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmtempat +'</b></td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].nmkecamatan +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td style="vertical-align: top;font-weight:bold;">Jenis</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;font-weight:bold;">' + data[i].jenis +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td style="vertical-align: top;">Keterangan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].diskripsi +'</td>'+
                        '</tr>'+
                    '</table>'+
                    '<br>'+
                    '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                    '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                           
                    '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill cmdMapDetail" type="button" data-id = '+ data[i].idtempat + ' hidden >Tampilkan Detail '+ data[i].jenis + '</button></center>'                       
                      ).addTo(ekraflayer)
                  marker.setRadius(8);
              } 

                }
            },
        });
    }

    function ambilmarkerkesenian() {
      $.ajax({
          url: "aksi/ambil_marker_kesenian.php",
          dataType: "json",
          method: "POST",
          success: function(data) {
              const pusatXY = "-8.16884, 113.70224";
              const pusat = pusatXY.split(',');
              var pusatX = pusat[0];
              var pusatY = pusat[1];

              var posisiX = $("#lbllatitude").val();
              var posisiY = $("#lbllongitude").val();

              for (var i = 0; i < data.length; i++) {
                  const str2 = data[i].koordinat;
                  const words2 = str2.split(',');

                  var markerFromKota = L.circleMarker([pusatX, pusatY]);
                  var markerTo2 =  L.circleMarker([words2[0], words2[1]]);
                  var fromkota = markerFromKota.getLatLng();
                  var to2 = markerTo2.getLatLng();
                  var jarakkota = fromkota.distanceTo(to2).toFixed(0)/1000;

                      var marker = L.circleMarker([words2[0], words2[1]], {
                        color: '#000000', weight: 2, fillOpacity: 0.1
                      }).bindPopup(
                        '<table>'+
                          '<tr>'+
                            '<td style="vertical-align: top;">Organisasi</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;"><b>' + data[i].nmorganisasi +'</b></td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Jenis</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;font-weight:bold;">' + data[i].nmjenis +' / ' + data[i].nmsub +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">No. Induk</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;font-weight:bold;">' + data[i].noinduk +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].alamat +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Kecamatan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].nmkecamatan +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Desa</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].nmdesa +'</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td style="vertical-align: top;">Pimpinan</td><td style="vertical-align: top;">&nbsp;&nbsp;:&nbsp;&nbsp;</td><td style="vertical-align: top;">' + data[i].pimpinan +'</td>'+
                            '</tr>'+
                        '</table>'+
                        '<br><span class="btext-xs" style="color:gray"><b>Diskripsi</b><br>' + data[i].diskripsi +
                        '</span>' +
                        '<br><br>'+
                        '<a role="row" class="text-xs even" data-keterangan="wisata" data-ketjarak="kota" data-koordinat="' + data[i].koordinat +
                        '" style="color:blue;cursor: pointer;"><span class="fas fa-map-marker"></span>&nbsp;&nbsp;&nbsp;' + jarakkota + ' Km dengan pusat kota</a>'+                         
                        '<br><br><center><button class="btn btn-sm btn-falcon-default rounded-pill cmdMapDetail" type="button" data-id = '+ data[i].idkesenian + ' hidden >Tampilkan Detail Kesenian</button></center>'                       
                          ).addTo(kesenianlayer)
                      marker.setRadius(8);
                  } 
              }
      });
  }

    $('#map').on('click', 'a', function() {

        const pusatXY = "-8.16884, 113.70224";
        const pusat = pusatXY.split(',');
        var pusatX = pusat[0];
        var pusatY = pusat[1];

        var posisiX = $("#lbllatitude").val();
        var posisiY = $("#lbllongitude").val();

        const koordinat = $(this).data("koordinat");
        const poss = koordinat.split(',');
        var koordinatX = poss[0];var koordinatY = poss[1];

        var keterangan = $(this).data("keterangan");
        var ketjarak = $(this).data("ketjarak");
        
        map.closePopup();
       
        if (ketjarak == "user"){
            var control = L.Routing.control({
                createMarker: function() { return null; },// menghilangkan marker tambahan						
                waypoints: [
                    L.latLng(koordinatX, koordinatY),
                    L.latLng(posisiX, posisiY)
                ],
                routeWhileDragging: false,
                reverseWaypoints: false,
                fitSelectedRoutes: true,
            }).addTo(map)
            //map.closePopup();
            control.hide();
            //control.spliceWaypoints(0, 1); // <-- removes your route
        } else if (ketjarak == "kota"){
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
        }
    });

    $('#map').on('click', '.cmdMapDetail', function() {
      var idsekolah = $(this).data('id');
      $.ajax({
        type: 'POST',
        url: "aksi/tampilkan/tampilkan-detail.php",
        data: {idsekolah: idsekolah},
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

