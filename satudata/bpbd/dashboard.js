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
    function isiDataBencana() {

      $("#lbljumlahlaki").html("");$("#lbljumlahperempuan").html("");$("#lbljumlahpenduduk").html("");
      $("#lbljumlahrawan").html("");$("#lbljumlahpenerima").html("");
      $("#areastatistikSarana").html("");

      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_rincian_bencana.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_rincian_bencana_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_rincian_bencana_desa.php";}
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
                
                var jmllaki = 0;var jmlperempuan = 0;var jmlpenduduk = 0;var jmlrawan = 0; var jmlpenerima = 0;          
                var Pjmllaki = 0;var Pjmlperempuan = 0;var Pjmlrawan = 0;var Pjmlpenerima = 0;
                for (i = 0; i < data.length; i++) {

                  jmllaki = data[i].jmllaki;              
                  jmlperempuan = data[i].jmlperempuan;
                  jmlpenduduk = data[i].jmlpenduduk;
                  jmlrawan = data[i].jmlrawan;
                  jmlpenerima = data[i].jmlpenerima;
                 
                }
               
                Pjmllaki = ((jmllaki / jmlpenduduk)*(100)).toFixed(2);
                Pjmlperempuan =  ((jmlperempuan / jmlpenduduk)*(100)).toFixed(2);
                Pjmlrawan =  ((jmlrawan / jmlpenduduk)*(100)).toFixed(2);
                Pjmlpenerima =  ((jmlpenerima / jmlrawan)*(100)).toFixed(2);
 
                $("#lbljumlahlaki").html(formatRibuan(jmllaki.toString()));
                $("#lbljumlahperempuan").html(formatRibuan(jmlperempuan.toString()));
                $("#lbljumlahpenduduk").html(formatRibuan(jmlpenduduk.toString()));
                $("#lbljumlahrawan").html(formatRibuan(jmlrawan.toString()));
                $("#lbljumlahpenerima").html(formatRibuan(jmlpenerima.toString()));

                $("#areastatistikSarana").html(
            '<div class="overflow-visible progress-bar bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill"'+
                  'role="progressbar" style="width:33%" aria-valuenow="25%" aria-valuemin="0"'+
                  'aria-valuemax="100"><span class="mt-n4 text-900">Laki-laki : Penduduk = '+Pjmllaki+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-info border-end border-white border-2"'+
                'role="progressbar" style="width:34%" aria-valuenow="'+Pjmlperempuan+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Perempuan : Penduduk = '+Pjmlperempuan+' %</span></div>'+
              '<div class="overflow-visible progress-bar bg-danger border-end border-white border-2"'+
                'role="progressbar" style="width:34%" aria-valuenow="'+Pjmlrawan+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Penduduk : Rawan = '+Pjmlrawan+' %</span></div>'+
            '<div class="overflow-visible progress-bar bg-secondary rounded-start rounded-pill"'+
                'role="progressbar" style="width:33%" aria-valuenow="'+Pjmlpenerima+'" aria-valuemin="0"'+
                'aria-valuemax="100"><span class="mt-n4 text-900">Rawan : Penerima = '+Pjmlpenerima+' %</span></div>');

                $("#loading").fadeOut("slow");
            },
            error: function() {
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
        $(".lblkoppeta").text(nmwilayah);
        var keterangan = $(this).data('keterangan');
        $("#txttransketerangan").val(keterangan);
        //var koordinat = $(this).data('koordinat');
        //const words1 = koordinat.split(',');
        //map.setView([words1[0], words1[1]],10);
        $("#area-jadwal").css("display","block");
        isiDataBencana();isiTabelBencana();
        grafikTotalBencana();grafikGender();
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
        $(".lblkoppeta").text("Kecamatan "+nmwilayah);
        $("#txttransid").val(idkecamatan); $("#txttransketerangan").val(keterangan);
        isiDataBencana();isiTabelBencana();
        grafikTotalBencana();grafikGender();
        $("#area-jadwal").css("display","block");
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
        $(".lblkoppeta").text("Desa "+nmwilayah);
        $("#txttransid").val(iddesa); $("#txttransketerangan").val(keterangan);
        isiDataBencana();
        grafikTotalBencana();grafikGender();
        $("#area-jadwal").css("display","none");
    });

    	/*================ INSTANSI =================*/
	function isiTabelBencana(){
		$('#tabeljadwal').dataTable().fnDestroy();

    var keterangan =  $("#txttransketerangan").val();
    var idarea = $("#txttransid").val();
    if (keterangan == "kota"){var Urlnya = "aksi/isi_tabel_bencana.php";}
    else  if (keterangan == "kecamatan"){var Urlnya = "aksi/isi_tabel_bencana_kecamatan.php";}
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
						  '<td class="align-middle" width="25%">'+data[i].nmkecamatan+'</td>'+
						  '<td class="align-middle text-center" width="8%">'+data[i].jmllaki+'</td>'+
              '<td class="align-middle text-center" width="8%">'+data[i].jmlperempuan+'</td>'+
              '<td class="align-middle text-center text-primary" width="8%">'+data[i].jmlpenduduk+'</td>'+
              '<td class="align-middle text-center text-danger" width="8%">'+data[i].jmlrawan+'</td>'+
              '<td class="align-middle text-center" width="8%">'+data[i].jmlpenerima+'</td>'+
              '<td class="align-middle" width="35%">'+data[i].ancamanbahaya+'</td>'+
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
	

    Chart.defaults.global.defaultFontColor = "#fff";

    var ctx = document.getElementById('umurChart').getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)')
    gradient.addColorStop(0, '#b2d1f0')

    function grafikTotalBencana(){
      var keterangan =  $("#txttransketerangan").val();
      var idarea = $("#txttransid").val();
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_bencana.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_bencana_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_bencana_desa.php";}
        $.ajax({
            type:"POST",
            url : Urlnya,
            data: {idarea: idarea},
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
      if (keterangan == "kota"){var Urlnya = "aksi/ambil_grafik_gender.php";}
      else  if (keterangan == "kecamatan"){var Urlnya = "aksi/ambil_grafik_gender_kecamatan.php";}
      else  if (keterangan == "desa"){var Urlnya = "aksi/ambil_grafik_gender_desa.php";}
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
                myArray = data;
                $.each(myArray, function(index, jum) {                  
                  vallaki.push(jum.jumpenduduk);
                  valwanita.push(jum.jumrawan);
                });				
 
                datax=[valwanita,vallaki];
                legend=['Terdampak','Tidak Terdampak'];
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
