function sinkronJson(){
	$.ajax({
	  type:"GET",
	  url : "aksi/ambil_api_sekolah_json.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
      console.log(data)
      if(data.msg2 == 'OK'){
        sinkronTabel();     
      }	else {
        $("#loading").fadeOut("slow");
        alert("Sinkronisasi data gagal, ulangi lagi\n"+data.msg2);
        document.body.style.cursor = "default";	
      }				
	  },
	  error: function() {
      $("#loading").fadeOut("slow");
      alert("Koneksi bermasalah periksa internet");
      document.body.style.cursor = "default";					
	  },
	});	
	
  }
    
  function sinkronTabel(){
    $.ajax({
      type:"POST",
      url : "aksi/ambil_api_sekolah.php",
      dataType : 'json',
      beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
      },
      success:function(data){
        console.log(data)
        if(data.msg2 == 'ok'){
          sinkronKecamatan();           
        }	else {
          $("#loading").fadeOut("slow");
          alert("Sinkronisasi data tabel gagal, ulangi lagi");
          document.body.style.cursor = "default";	
        }	
      },
      error: function() {
        $("#loading").fadeOut("slow");
        alert("Koneksi bermasalah periksa internet");
        document.body.style.cursor = "default";					
      },
    });	    
  }

  function sinkronKecamatan(){
    $.ajax({
      type:"POST",
      url : "aksi/aksi_sinkron_area.php",
      dataType : 'json',
      beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
      },
      success:function(data){
        console.log(data)
        if(data.msg2 == 'ok'){     
          sinkronDesa();     
        }	else {
          $("#loading").fadeOut("slow");
          alert("Sinkronisasi data kecamatan, ulangi lagi");
          document.body.style.cursor = "default";	
        }				
      },
      error: function() {
        $("#loading").fadeOut("slow");
        alert("Koneksi bermasalah periksa internet");
        document.body.style.cursor = "default";					
      },
    });	    
  }

  function sinkronDesa(){
    $.ajax({
      type:"POST",
      url : "aksi/aksi_sinkron_area_desa.php",
      dataType : 'json',
      beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
      },
      success:function(data){
        console.log(data)
        if(data.msg2 == 'ok'){     
          location.reload()       
        }	else {
          $("#loading").fadeOut("slow");
          alert("Sinkronisasi data desa gagal, ulangi lagi");
          document.body.style.cursor = "default";	
        }					
      },
      error: function() {
        $("#loading").fadeOut("slow");
        alert("Koneksi bermasalah periksa internet");
        document.body.style.cursor = "default";					
      },
    });	    
  }

    /*================ TABELDASHBOARD =================*/
    function isiDataSarana() {

      $("#lbljumlahpenduduk").html("");$("#lbljumlahbansos").html("");
      $("#lbljumlahbnpt").html("");$("#lbljumlahpkh").html("");
      $("#lbljumlahppkm").html("");$("#lbljumlahjkn").html("");
      $("#areastatistikSarana").html("");

      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_rincian_sarana.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_rincian_sarana_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_rincian_sarana_desa.php";}

        $.ajax({
            type: "POST",
            url: Urlnya,
            data: {idarea: idarea},
            dataType: 'json',
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success: function(data) {
                document.body.style.cursor = "default";
                var i;
                var html = "";
                var jmlpenduduk = 0;var jmlbansos = 0;var jmlbnpt = 0;var jmlpkh = 0;var jmlppkm = 0;var jmljkn = 0;
                var Pjmlbnpt = 0;var Pjmlpkh = 0;var Pjmlppkm = 0;
                var Pjmljkn = 0;var Pjmlbansos = 0;var Pjmlpenduduk = 0;
                for (i = 0; i < data.length; i++) {

                  jmlbnpt = data[i].jmlbnpt;              
                  jmlpkh = data[i].jmlpkh;
                  jmlppkm = data[i].jmlppkm;
                  jmljkn = data[i].jmljkn;
                  jmlbansos = data[i].jmlbansos;
                  jmlpenduduk = data[i].jmlpenduduk;
                 
                }
               

                  Pjmlbnpt = ((jmlbnpt / jmlpenduduk)*(100)).toFixed(2);
                  Pjmlpkh =  ((jmlpkh / jmlpenduduk)*(100)).toFixed(2);
                  Pjmlppkm =  ((jmlppkm / jmlpenduduk)*(100)).toFixed(2);
                  Pjmljkn =  ((jmljkn / jmlpenduduk)*(100)).toFixed(2);
                  Pjmlbansos =  ((jmlbansos / jmlpenduduk)*(100)).toFixed(2);
                  Pjmlpenduduk =  ((jmlbansos / jmlpenduduk)*(100)).toFixed(2);
               
                $("#lbljumlahpenduduk").html(formatRibuan(jmlpenduduk.toString()));
                $("#lbljumlahbansos").html(formatRibuan(jmlbansos.toString()));
                $("#lbljumlahbnpt").html(formatRibuan(jmlbnpt.toString()));
                $("#lbljumlahpkh").html(formatRibuan(jmlpkh.toString()));
                $("#lbljumlahppkm").html(formatRibuan(jmlppkm.toString()));
                $("#lbljumlahjkn").html(formatRibuan(jmljkn.toString()));

                $("#areastatistikSarana").html(
            '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"'+
                  'role="progressbar" style="width:25%" aria-valuenow="25%" aria-valuemin="0"'+
                  'aria-valuemax="100"><span class="mt-n4 text-900">Penerima Bansos - '+Pjmlpenduduk+' %</span></div>'+
                  '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"'+
                'role="progressbar" style="width:25%" aria-valuenow="25%" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Bansos BNPT - '+Pjmlbnpt+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-secondary border-end border-white border-2"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+Pjmlpkh+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Bansos PKH - '+Pjmlpkh+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-warning border-end border-white border-2"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+Pjmlppkm+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Bansos PPKM - '+Pjmlppkm+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-danger rounded-start rounded-pill"'+
                'role="progressbar" style="width:25%" aria-valuenow="'+Pjmljkn+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Bansos JKN - '+Pjmljkn+' %</span></div>');

                $("#loading").fadeOut("slow");
            },
            error: function() {
                $("#loading").fadeOut("slow");
                alert("Koneksi bermasalah periksa internet");
                document.body.style.cursor = "default";
            },
        });
    }

    function isiTabelDTKS(){
      $('#tabeljadwal').dataTable().fnDestroy();

      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/isi_tabel_dtks.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/isi_tabel_dtks_kecamatan.php";}
        $.ajax({
            type: "POST",
            url: Urlnya,
            data: {idarea: idarea},
        dataType : 'json',
        beforeSend: function(e) {
        $("#loading").fadeIn();
        document.body.style.cursor = "wait";
        },
        success:function(data){
        document.body.style.cursor = "default";
            var html = '';
            var i;
              for(i=0; i<data.length; i++){
              html += 
              '<tr class="btn-reveal-trigger">'+
                '<td class="align-middle text-center" width="5%">'+data[i].no+'</td>'+
                '<td class="align-middle" width="35%">'+data[i].nmkecamatan+'</td>'+
                '<td class="align-middle text-center" width="10%">'+data[i].jmlpenduduk+'</td>'+
                '<td class="align-middle text-center" width="10%">'+data[i].jumBNPT+'</td>'+
                '<td class="align-middle text-center" width="10%">'+data[i].jumPKH+'</td>'+
                '<td class="align-middle text-center" width="10%">'+data[i].jumPPKM+'</td>'+
                '<td class="align-middle text-center" width="10%">'+data[i].jumJKN+'</td>'+
                '<td class="align-middle text-center" width="10%">'+data[i].jmlbansos+'</td>'+
              '</tr>';
              }			
              $('#isitabeljadwal').html(html);
             $("#tabeljadwal").dataTable({"paging": false, "lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
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

      function isiTabelPekerjaan(){
        $('#tabelpekerjaan').dataTable().fnDestroy();
  
        var keterangan =  $("#txttransketerangan").val();
        var idarea = $("#txttransid").val();
        if (keterangan == "kota"){var Urlnya = "aksi/isi_tabel_dtks_pekerjaan.php";}
        else  if (keterangan == "kecamatan"){var Urlnya = "aksi/isi_tabel_dtks_pekerjaan_kecamatan.php";}
        else  if (keterangan == "desa"){var Urlnya = "aksi/isi_tabel_dtks_pekerjaan_desa.php";}
          $.ajax({
              type: "POST",
              url: Urlnya,
              data: {idarea: idarea},
          dataType : 'json',
          beforeSend: function(e) {
          $("#loading").fadeIn();
          document.body.style.cursor = "wait";
          },
          success:function(data){
          document.body.style.cursor = "default";
              var html = '';
              var i;
                for(i=0; i<data.length; i++){
                html += 
                '<tr class="btn-reveal-trigger">'+
                  '<td class="align-middle text-center" width="5%">'+data[i].no+'</td>'+
                  '<td class="align-middle" width="45%">'+data[i].nmpekerjaan+'</td>'+
                  '<td class="align-middle text-center" width="10%">'+data[i].jumBNPT+'</td>'+
                  '<td class="align-middle text-center" width="10%">'+data[i].jumPKH+'</td>'+
                  '<td class="align-middle text-center" width="10%">'+data[i].jumPPKM+'</td>'+
                  '<td class="align-middle text-center" width="10%">'+data[i].jumJKN+'</td>'+
                  '<td class="align-middle text-center" width="10%">'+data[i].jmlbansos+'</td>'+
                '</tr>';
                }			
                $('#isitabelpekerjaan').html(html);
                $("#tabelpekerjaan").dataTable({"paging": false, "lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
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
      success: function(data) {
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

    var ctx = document.getElementById('umurChart').getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.4)')
    gradient.addColorStop(1, '#FFFFFF')

    function hitungGrafikTotalSekolah(){
        $.ajax({
            type:"POST",
            url :"aksi/ambil_grafik_total_sekolah.php",
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
                
                    var hitChartContent = document.getElementById('hitungUmurChart');
                    hitChartContent.innerHTML = '';
                    $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
      
                    var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                    var salesChartData = {
                        labels: labels,
                            datasets: [
                                {
                                label                   : 'Jumlah',
                                borderColor             : 'rgb(54, 162, 235)',
                                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                                fill                    : true,
                                pointBorderColor        : 'rgba(0, 0, 0, 0)',
                                pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                                pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                                pointHoverBorderColor   : 'rgb(54, 162, 235)',
                                data                    : values,
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
                            }
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
                                ticks: {display: true},
                                gridLines : {display : false,},
                                barPercentage: 0.6
                            }],
                            yAxes: [{
                                ticks: {display: true,beginAtZero: true},
                                gridLines : {display : true,}
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
  
    
    function isiGrafikBPNT(){
      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_bpnt.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_bpnt_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_bpnt_desa.php";}

        $.ajax({
            type:"POST",
            url : Urlnya,
            data: {
              idarea: idarea
            },
            dataType : 'json',			
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){			
                var labels = [];
                var valsw = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    labels.push(jum.nmbentuksekolah);
                    valsw.push(jum.jumSwasta);
                });				
                        
       var hitChartContent = document.getElementById('hitungChartContentADMIN');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN" style="height:400px"><canvas>');
     
      var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
      var salesChartData = {
        labels  : labels,
        datasets: [
          {
            label               : 'BANSOS BPNT',
            backgroundColor		: '#4169E1',
            borderColor         : '#4169E1',
            data                : valsw,
          },
        ]
      }
    
      var salesChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
          display: true
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
            gridLines : {display : false,},
            barPercentage: 0.6
          }],
          yAxes: [{
            ticks: {display: true,beginAtZero: true},
            gridLines : {display : true,}
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

    function isiGrafikPKH(){
      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_pkh.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_pkh_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_pkh_desa.php";}

      $.ajax({
          type:"POST",
          url : Urlnya,
          data: {
            idarea: idarea
          },
          dataType : 'json',			
          beforeSend: function(e) {
              $("#loading").fadeIn();
              document.body.style.cursor = "wait";
          },
          success:function(data){			
              var labels = [];
              var valsw = [];
              myArray = data;
              $.each(myArray, function(index, jum) {
                  labels.push(jum.nmbentuksekolah);
                  valsw.push(jum.jumSwasta);
              });				
                      
     var hitChartContent = document.getElementById('hitungChartContentPKH');
    hitChartContent.innerHTML = '';
    $('#hitungChartContentPKH').append('<canvas id="hitungChartPKH" style="height:400px"><canvas>');
   
    var salesChartCanvas = $('#hitungChartPKH').get(0).getContext('2d')
    var salesChartData = {
      labels  : labels,
      datasets: [
        {
          label               : 'BANSOS PKH',
          backgroundColor		: '#87CEFA',
          borderColor         : '#87CEFA',
          data                : valsw,
        },
      ]
    }
  
    var salesChartOptions = {
      maintainAspectRatio : false,
      responsive : true,
      legend: {
        display: true
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
          gridLines : {display : false,},
          barPercentage: 0.6
        }],
        yAxes: [{
          ticks: {display: true,beginAtZero: true},
          gridLines : {display : true,}
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

  function isiGrafikPPKM(){
    var keterangan =  $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_ppkm.php";}
    else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_ppkm_kecamatan.php";}
    else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_ppkm_desa.php";}
    $.ajax({
        type:"POST",
        url : Urlnya,
          data: {
            idarea: idarea
          },
        dataType : 'json',			
        beforeSend: function(e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success:function(data){			
            var labels = [];
            var valsw = [];
            myArray = data;
            $.each(myArray, function(index, jum) {
                labels.push(jum.nmbentuksekolah);
                valsw.push(jum.jumSwasta);
            });				
                    
   var hitChartContent = document.getElementById('hitungChartContentPPKM');
  hitChartContent.innerHTML = '';
  $('#hitungChartContentPPKM').append('<canvas id="hitungChartPPKM" style="height:400px"><canvas>');
 
  var salesChartCanvas = $('#hitungChartPPKM').get(0).getContext('2d')
  var salesChartData = {
    labels  : labels,
    datasets: [
      {
        label               : 'BANSOS PPKM',
        backgroundColor		: '#EEE8AA',
        borderColor         : '#EEE8AA',
        data                : valsw,
      },
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: true
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
        gridLines : {display : false,},
        barPercentage: 0.6
      }],
      yAxes: [{
        ticks: {display: true,beginAtZero: true},
        gridLines : {display : true,}
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

function isiGrafikJKN(){
  var keterangan =  $("#txttransketerangan").val();
  var idarea = $("#txttransid").val();
  if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_jkn.php";}
  else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_jkn_kecamatan.php";}
  else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_jkn_desa.php";}

  $.ajax({
      type:"POST",
      url : Urlnya,
        data: {
          idarea: idarea
        },
      dataType : 'json',			
      beforeSend: function(e) {
          $("#loading").fadeIn();
          document.body.style.cursor = "wait";
      },
      success:function(data){			
          var labels = [];
          var valsw = [];
          myArray = data;
          $.each(myArray, function(index, jum) {
              labels.push(jum.nmbentuksekolah);
              valsw.push(jum.jumSwasta);
          });				
                  
 var hitChartContent = document.getElementById('hitungChartContentJKN');
hitChartContent.innerHTML = '';
$('#hitungChartContentJKN').append('<canvas id="hitungChartJKN" style="height:400px"><canvas>');

var salesChartCanvas = $('#hitungChartJKN').get(0).getContext('2d')
var salesChartData = {
  labels  : labels,
  datasets: [
    {
      label               : 'BANSOS JKN',
      backgroundColor		: '#FFA500',
      borderColor         : '#FFA500',
      data                : valsw,
    },
  ]
}

var salesChartOptions = {
  maintainAspectRatio : false,
  responsive : true,
  legend: {
    display: true
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
      gridLines : {display : false,},
      barPercentage: 0.6
    }],
    yAxes: [{
      ticks: {display: true,beginAtZero: true},
      gridLines : {display : true,}
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
              
                  var hitChartContent = document.getElementById('hitungUmurChart');
                  hitChartContent.innerHTML = '';
                  $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
    
                  var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                  var salesChartData = {
                      labels: labels,
                          datasets: [
                              {
                              label                   : 'Jumlah',
                              borderColor             : 'rgb(54, 162, 235)',
                              backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                              fill                    : true,
                              pointBorderColor        : 'rgba(0, 0, 0, 0)',
                              pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                              pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                              pointHoverBorderColor   : 'rgb(54, 162, 235)',
                              data                    : values,
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
                          }
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
                              ticks: {display: true},
                              gridLines : {display : false,},
                              barPercentage: 0.6
                          }],
                          yAxes: [{
                              ticks: {display: true,beginAtZero: true},
                              gridLines : {display : true,}
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
              
                  var hitChartContent = document.getElementById('hitungUmurChart');
                  hitChartContent.innerHTML = '';
                  $('#hitungUmurChart').append('<canvas id="umurChart"><canvas>');
    
                  var salesChartCanvas = $('#umurChart').get(0).getContext('2d')
                  var salesChartData = {
                      labels: labels,
                          datasets: [
                              {
                              label                   : 'Jumlah',
                              borderColor             : 'rgb(54, 162, 235)',
                              backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
                              fill                    : true,
                              pointBorderColor        : 'rgba(0, 0, 0, 0)',
                              pointBackgroundColor    : 'rgba(0, 0, 0, 0)',
                              pointHoverBackgroundColor: 'rgb(54, 162, 235)',                                   
                              pointHoverBorderColor   : 'rgb(54, 162, 235)',
                              data                    : values,
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
                          }
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
                              ticks: {display: true},
                              gridLines : {display : false,},
                              barPercentage: 0.6
                          }],
                          yAxes: [{
                              ticks: {display: true,beginAtZero: true},
                              gridLines : {display : true,}
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
    
    $("#lv_kota").click(function(){
        $("#txttransid").val(""); $("#txttransketerangan").val("");
        //map.closePopup();
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text(nmwilayah);
       // $("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
        //$("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
        var keterangan = $(this).data('keterangan');
        $("#txttransketerangan").val(keterangan);
        //var koordinat = $(this).data('koordinat');
        //const words1 = koordinat.split(',');
        //map.setView([words1[0], words1[1]],10);
        /*hitungGrafikTotalSekolah();
        isiGrafikBPNT();
        isiGrafikPKH();
        isiGrafikPPKM();
        isiGrafikJKN();*/
        $("#area-tabel-dtks").fadeIn();
        isiDataSarana();isiTabelDTKS();isiTabelPekerjaan();
        grafikTotalBansos();
        grafikGender();
        
    });

  //$("#lv_sinkron").click(function(){
  //    map.closePopup();
  //    sinkronJson();
  //});

    $(".lv_kecamatan").click(function(){
        $("#txttransid").val(""); $("#txttransketerangan").val("");
       /* map.closePopup();    
        var koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]],16);   
 */
        var idkecamatan = $(this).data('id'); var keterangan = $(this).data('keterangan');
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah); $(".lblkoparea").text("Kecamatan "+nmwilayah);
        //$("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
        //$("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
        $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan);
        $("#area-tabel-dtks").fadeIn();
        isiDataSarana();isiTabelDTKS();isiTabelPekerjaan();
        grafikTotalBansos();
        grafikGender();

/*        hitungGrafikTotalSekolahKec();
        isiGrafikBPNT();
        isiGrafikPKH();
        isiGrafikPPKM();
        isiGrafikJKN();
        isiDataSarana();*/
    });
    
    $(".lv_desa").click(function(){
        $("#txttransid").val(""); $("#txttransketerangan").val("");
        /*map.closePopup();
        var koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]],18);
        //hitungdesa();	
        */
        var iddesa = $(this).data('id'); var keterangan = $(this).data('keterangan');
        var nmwilayah = $(this).data('nama');
        $("#lblkoppeta").text(nmwilayah);$(".lblkoparea").text("Desa "+nmwilayah);
        //$("#lblkopgrafik1").text(nmwilayah);$("#lblkopgrafik2").text(nmwilayah);
        //$("#lblkopgrafik3").text(nmwilayah);$("#lblkopgrafik4").text(nmwilayah);
        $("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan);
        $("#area-tabel-dtks").fadeOut("slow");
        isiDataSarana();isiTabelPekerjaan();
        grafikTotalBansos();
        grafikGender();

   /*     hitungGrafikTotalSekolahDesa();
        isiGrafikBPNT();
        isiGrafikPKH();
        isiGrafikPPKM();
        isiGrafikJKN();
        isiDataSarana();*/
    });


    Chart.defaults.global.defaultFontColor = "#fff";

    var ctx = document.getElementById('umurChart').getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
    gradient.addColorStop(0, '#b2d1f0')

    function grafikTotalBansos(){
      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_bansos.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_bansos_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_bansos_desa.php";}
        $.ajax({
            type:"POST",
            url : Urlnya,
            data: {idarea: idarea},
            async : false,
            dataType : 'json',			
            success:function(data){	
                //var jumbnpt = [];var jumpkh = [];
                //var jumppkm = [];var jumjkn = [];
                var labels = [];var values = [];
                myArray = data;
                $.each(myArray, function(index, jum) {
                    document.body.style.cursor = "default";	
                    $("#loading").fadeOut("slow");
 
                    labels.push('BNPT','PKH','PPKM','PBI JKN');
                    values.push(jum.jumbnpt,jum.jumpkh,jum.jumppkm,jum.jumjkn);

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
                                //backgroundColor         : gradient,
                                backgroundColor         : ["#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE","#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00"],
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
                                gridLines : {display : true,color:"#0d6ecf"},
                                barPercentage: 0.4
                            }],
                            yAxes: [{
                                ticks: {display: true,fontColor: 'rgb(255, 255, 255,0.6)',beginAtZero: true},
                                gridLines : {display : false,},
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
            error: function() {
                $("#loading").fadeOut("slow");
                document.body.style.cursor = "default";				
            },				
        });		
    }	
     
    function grafikGender(){
      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_penduduk_bansos.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_penduduk_bansos_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_penduduk_bansos_desa.php";}
        $.ajax({
            type:"POST",
            url : Urlnya,
            data: {idarea: idarea},
            async : false,
            dataType : 'json',
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success:function(data){	 
                //var labels = [];
                var vallaki = [];var valwanita = [];
                //var labelslaki = [];var labelswanita = [];
                myArray = data;
                $.each(myArray, function(index, jum) {                  
                  vallaki.push(jum.jumtidakterima);
                  valwanita.push(jum.jumtotal);
                });				

                datax=[vallaki,valwanita];
                legend=['Tidak Terima Bansos','Bansos'];
                total = datax.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));
                labelsvalues = datax.map(function(value,i){
                let p= Math.round((value / total) * 100) + '%';
                return legend[i]+' '+p;
                });

      var hitChartContent = document.getElementById('hitungChartContentADMIN');
      hitChartContent.innerHTML = '';
      $('#hitungChartContentADMIN').append('<canvas id="hitungChartADMIN"><canvas>');
      
      var salesChartCanvas = $('#hitungChartADMIN').get(0).getContext('2d')
      var salesChartData = {
        labels  : labelsvalues,
        datasets: [
          {
            label               : 'Jumlah',
            data                : datax,
            backgroundColor		  : ['rgb(255, 99, 132)','rgb(75, 192, 192)'],
            borderColor         : ['rgb(255, 99, 132)','rgb(75, 192, 192)']           
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
