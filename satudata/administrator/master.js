function bersihkan(){
	$("#lblhalaman").val("");
	$("#area-halaman").css("display","none");

	$("#area-dashboard").css("display","none");	
	$("#area-kop-dashboard").css("display","none");	

	$("#area-master-operator").css("display","none");
	$("#area-master-opd").css("display","none");
	$("#area-master-instansi").css("display","none");
  }

  ///////////////////////////////////////////////
  //////// pencarian tanggal DASHBOARD //////////
  ///////////////////////////////////////////////
  var setTanggal = $("#txtTransDashboardJadwal").val();
  xarrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  arrbulan = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  xarrtanggal = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14",
	  "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
	  "31"
  ];
  function CariTglDashboard(){
	var x = new Date(setTanggal);
	//x.setDate(0); // 0 will result in the last day of the previous month
	x.setDate(1); // 1 will result in the first day of the month
	xTanggal = x.getDate();
    xBulan = x.getMonth();
    xTahun = x.getFullYear();

	var kriteria = $("#dashboard-select-jadwal").val();
	if (kriteria == "bulan"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrbulan[xBulan] + '-' + xTahun);
	} else if (kriteria == "minggu"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrtanggal[xTanggal] + '-' + xarrbulan[xBulan] + '-' + xTahun);
	} else if (kriteria == "hari"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrtanggal[xTanggal] + '-' + xarrbulan[xBulan] + '-' + xTahun);
	}
  }

  $("#cmdprev").click(function(){
	var kriteria = $("#dashboard-select-jadwal").val();
	if (kriteria == "bulan"){
		var x = new Date($("#txtTransDashboardJadwal").val());
		xTanggal = 1;//x.getDate();
		xBulan = x.getMonth()-1;
		xTahun = x.getFullYear();
		if (xBulan < 0){
			xBulan = xBulan+12;
			xTahun = xTahun-1
		} else {
			xBulan = xBulan;
			xTahun = xTahun;
		}
		$("#dashboard-lbltanggal-jadwal").text(xarrbulan[xBulan] + '-' + xTahun);
		$("#txtTransDashboardJadwal").val(xTahun + '-' + arrbulan[xBulan] + '-' + xarrtanggal[xTanggal]);
	} else if (kriteria == "minggu"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrtanggal[xTanggal] + '-' + xarrbulan[xBulan] + '-' + xTahun);
	} else if (kriteria == "hari"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrtanggal[xTanggal] + '-' + xarrbulan[xBulan] + '-' + xTahun);
	}
  });

  $("#cmdnext").click(function(){
	var kriteria = $("#dashboard-select-jadwal").val();
	if (kriteria == "bulan"){
		var x = new Date($("#txtTransDashboardJadwal").val());
		xTanggal = 1;//x.getDate();
		xBulan = x.getMonth()+1;
		xTahun = x.getFullYear();
		if (xBulan >= 12){
			xBulan = x.getMonth()-11;
			xTahun = xTahun+1
		} else {
			xBulan = xBulan;
			xTahun = xTahun;
		}
		$("#dashboard-lbltanggal-jadwal").text(xarrbulan[xBulan] + '-' + xTahun);
		$("#txtTransDashboardJadwal").val(xTahun + '-' + arrbulan[xBulan] + '-' + xarrtanggal[xTanggal]);
	} else if (kriteria == "minggu"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrtanggal[xTanggal] + '-' + xarrbulan[xBulan] + '-' + xTahun);
	} else if (kriteria == "hari"){
    	$("#dashboard-lbltanggal-jadwal").text(xarrtanggal[xTanggal] + '-' + xarrbulan[xBulan] + '-' + xTahun);
	}
  });

  function tanggalHariIni(){
    var tglserver = $("#lbltglserver").val();
    arrbulan = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    arrtanggal = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14",
        "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
        "31"
    ];
    mydate = new Date(tglserver);

    tanggal = mydate.getDate();
    bulan = mydate.getMonth();
    tahun = mydate.getFullYear();

    $("#txttglterimaL").val(arrtanggal[tanggal] + '-' + arrbulan[bulan] + '-' + tahun);
    $("#txttglsuratL").val(arrtanggal[tanggal] + '-' + arrbulan[bulan] + '-' + tahun);
  }

  function awalTglJadwal(){
    var tglserver = $("#lbltglserver").val();
    arrbulan = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    arrtanggal = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14",
        "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
        "31"
    ];
    mydate = new Date(tglserver);

	tanggal = mydate.getDate();
    bulan = mydate.getMonth();
    tahun = mydate.getFullYear();

	var newdate = new Date(mydate);
	newdate.setDate(newdate.getDate() + 1); 
	var nd = new Date(newdate);
	
    tanggal2 = nd.getDate();
    bulan2 = nd.getMonth();
    tahun2 = nd.getFullYear();

	$("#txttanggaljadwal").val(arrtanggal[tanggal] + '-' + arrbulan[bulan] + '-' + tahun + ' to ' + arrtanggal[tanggal2] + '-' + arrbulan[bulan2] + '-' + tahun2);
  }

  $("#cmdDashboard").click(function(){
	bersihkan();           
	$("#area-halaman").fadeIn();
	//isiMasterPengunjung();
	$("#area-dashboard").fadeIn();
	$("#area-kop-dashboard").fadeIn();
	$("#lblhalaman").val("dashboard");
  });

  $("#cmdInstansiPengguna").click(function(){
	bersihkan();           
	$("#area-halaman").fadeIn();
	isiMasterInstansi();
	$("#area-master-instansi").fadeIn();
	$("#lblhalaman").val("masterinstansi");
  });

  $("#cmdMasterOPD").click(function(){
	bersihkan();           
	$("#area-halaman").fadeIn();
	isiMasterOPD();
	$("#area-master-opd").fadeIn();
	$("#lblhalaman").val("masteropd");
  });

  $("#cmdMasterOperator").click(function(){
	bersihkan();           
	$("#area-halaman").fadeIn();
	isiMasterOperator();
	$("#area-master-operator").fadeIn();
	$("#lblhalaman").val("masteroperator");
  });

  /*================ OPERATOR =================*/
  function isiMasterOperator(){
	$('#tableOperator').dataTable().fnDestroy();
	var idinstansi=$('#lblidinstansi').val();
	$.ajax({
	  type:"POST",
	  url : "aksi/isi_tabel_operator.php",
	  data:{idinstansi:idinstansi},
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
					if (data[i].blokir=="Y"){var nmblokir ="Blokir";var warnablok = "badge-soft-danger";} else if (data[i].blokir=="N"){var nmblokir ="Tidak";var warnablok = "badge-soft-primary";}
					html += 
					'<tr class="btn-reveal-trigger">'+
					  '<td class="align-middle" width="5%">'+data[i].no+'</td>'+
					  '<td class="align-middle" width="20%">'+data[i].nmuser+'</td>'+
					  '<td class="align-middle" width="25%">'+data[i].nminstansi+'</td>'+
					  '<td class="align-middle" width="20%">'+data[i].username+'</td>'+
					  '<td class="align-middle" width="10%">'+data[i].akses+'</td>'+
					  '<td class="align-middle text-center" width="6%">'+
					  	'<span class="badge rounded-pill '+warnablok+'">'+nmblokir+'</span>'+	
					  '</td>'+
					  '<td class="d-flex align-middle" width="14%">'+
					  	'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm me-2 btnBlokirOperator" data-id="'+data[i].iduser+'" data-nmoperator="'+data[i].nmuser+'" data-blokir="'+data[i].blokir+'"><span class="fas fa-ban"></span></button> '+
						'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm me-2 btnEditOperator" data-id="'+data[i].iduser+'"><span class="fas fa-edit"></span></button> '+
						'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm btnHapusOperator" data-id="'+data[i].iduser+'" data-nmuser="'+data[i].nmuser+'"><span class="fas fa-trash"></span></button>'+
					  '</td>'+
					'</tr>';
					}			
					$('#list-operator').html(html);
					$("#tableOperator").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
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

  $("#cmdRefreshOperator").click(function(){
	isiMasterOperator();
  });

  $("#cmdTambahOperator").click(function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/operator/tambah_operator.php",			
	  success:function(resp){
		$("#isianModTambahData").html(resp);
		$("#isianModTambahData").fadeIn(1000);
		$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $('#list-operator').on('click','.btnEditOperator',function(){
	var idoperator = $(this).data('id');
	$.ajax({
	  type:"POST",		
	  url :"aksi/operator/edit_operator.php",	
	  data:{idoperator:idoperator},
	  success:function(resp){
		$("#isianModEditData").html(resp);
		$("#isianModEditData").fadeIn(1000);
		$("#modEditData").modal({backdrop: 'static', keyboard: false}) 
		$("#modEditData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $('#list-operator').on('click','.btnHapusOperator',function(){
	var idoperator = $(this).data('id');var nmoperator = $(this).data('nmuser');
	let text = "Yakin menghapus data operator\n"+nmoperator;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/operator/aksi_hapus.php",	
		data:{idoperator:idoperator},
		success:function(resp){
		  $("#ToastHapus").toast("show");
		  isiMasterOperator();	
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });

  $('#list-operator').on('click','.btnBlokirOperator',function(){
	var idoperator = $(this).data('id');var nmoperator = $(this).data('nmoperator');var blokir = $(this).data('blokir');
	if (blokir=="Y"){var ubahstatus ="Membuka Blokir";var status ="N";} else {var ubahstatus ="Memblokir";var status ="Y";}
	let text = "Yakin Anda "+ubahstatus+" data operator\n"+nmoperator;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/operator/aksi_blokir.php",	
		data:{idoperator:idoperator,status:status},
		success:function(resp){
			$("#ToastSukses").toast("show");
		  	isiMasterOperator();	
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });


    /*================ OPD =================*/
	function isiMasterOPD(){
		$('#tableOPD').dataTable().fnDestroy();
		var idinstansi=$('#lblidinstansi').val();
		$.ajax({
		  type:"POST",
		  url : "aksi/isi_tabel_opd.php",
		  data:{idinstansi:idinstansi},
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
						  '<td class="align-middle" width="5%">'+data[i].no+'</td>'+
						  '<td class="align-middle" width="75%">'+data[i].nmopd+'</td>'+
						  '<td class="align-middle" width="15%">'+data[i].kategori+'</td>'+
						  '<td class="d-flex-inline align-middle text-center" width="5%">'+
							'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm me-2 btnEditOPD" data-id="'+data[i].idopd+'"><span class="fas fa-edit"></span></button> '+
							//'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm btnHapusOPD" data-id="'+data[i].idopd+'" data-nmopd="'+data[i].nmopd+'"><span class="fas fa-trash"></span></button>'+
						  '</td>'+
						'</tr>';
						}			
						$('#isitableOPD').html(html);
						$("#tableOPD").dataTable({"paging": false, "lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
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
	
	  $("#cmdRefreshOPD").click(function(){
		isiMasterOPD();
	  });
	
	  $("#cmdTambahOPD").click(function(){
		$.ajax({
		  type:"POST",
		  url :"aksi/opd/tambah_opd.php",			
		  success:function(resp){
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
			$("#modTambahData").modal('show');
		  },
		  error: function() {alert('Koneksi bermasalah periksa internet');},
		});
	  });
	
	  $('#isitableOPD').on('click','.btnEditOPD',function(){
		var idopd = $(this).data('id');
		$.ajax({
		  type:"POST",		
		  url :"aksi/opd/edit_opd.php",	
		  data:{idopd:idopd},
		  success:function(resp){
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({backdrop: 'static', keyboard: false}) 
			$("#modEditData").modal('show');
		  },
		  error: function() {alert('Koneksi bermasalah periksa internet');},
		});
	  });
	
	  $('#isitableOPD').on('click','.btnHapusOPD',function(){
		var idopd = $(this).data('id');var nmopd = $(this).data('nmopd');
		let text = "Yakin menghapus data OPD\n"+nmopd;
		if (confirm(text) == true) {
		  $.ajax({
			type:"POST",		
			url :"aksi/opd/aksi_hapus.php",	
			data:{idopd:idopd},
			success:function(resp){
			  $("#ToastHapus").toast("show");
			  isiMasterOPD();	
			},
			error: function() {alert('Koneksi bermasalah periksa internet');},
		  });
		}  
	  });


	/*================ INSTANSI =================*/
	function isiMasterInstansi(){
		$('#tableInstansi').dataTable().fnDestroy();
		var idinstansi=$('#lblidinstansi').val();
		$.ajax({
		  type:"POST",
		  url : "aksi/isi_tabel_instansi.php",
		  data:{idinstansi:idinstansi},
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
						  '<td class="align-middle" width="5%">'+data[i].no+'</td>'+
						  '<td class="align-middle" width="25%">'+data[i].nminstansi+'</td>'+
						  '<td class="align-middle" width="40%">'+data[i].alamat+' - '+data[i].kota+'</td>'+
						  '<td class="align-middle" width="20%">'+data[i].email+'<br>'+data[i].telepon+'</td>'+
						  '<td class="d-flex align-middle" width="10%">'+
							'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm me-2 btnEditInstansi" data-id="'+data[i].idinstansi+'"><span class="fas fa-edit"></span></button> '+
							'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm btnHapusInstansi" data-id="'+data[i].idinstansi+'" data-nminstansi="'+data[i].nminstansi+'"><span class="fas fa-trash"></span></button>'+
						  '</td>'+
						'</tr>';
						}			
						$('#isitableInstansi').html(html);
						$("#tableInstansi").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
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
	
	  $("#cmdRefreshInstansi").click(function(){
		isiMasterInstansi();
	  });
	
	  $("#cmdTambahInstansi").click(function(){
		$.ajax({
		  type:"POST",
		  url :"aksi/instansi/tambah_instansi.php",			
		  success:function(resp){
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
			$("#modTambahData").modal('show');
		  },
		  error: function() {alert('Koneksi bermasalah periksa internet');},
		});
	  });
	
	  $('#isitableInstansi').on('click','.btnEditInstansi',function(){
		var idinstansi = $(this).data('id');
		$.ajax({
		  type:"POST",		
		  url :"aksi/instansi/edit_instansi.php",	
		  data:{idinstansi:idinstansi},
		  success:function(resp){
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({backdrop: 'static', keyboard: false}) 
			$("#modEditData").modal('show');
		  },
		  error: function() {alert('Koneksi bermasalah periksa internet');},
		});
	  });
	
	  $('#isitableInstansi').on('click','.btnHapusInstansi',function(){
		var idinstansi = $(this).data('id');var nminstansi = $(this).data('nminstansi');
		let text = "Yakin menghapus data instansi\n"+nminstansi;
		if (confirm(text) == true) {
		  $.ajax({
			type:"POST",		
			url :"aksi/instansi/aksi_hapus.php",	
			data:{idinstansi:idinstansi},
			success:function(resp){
				$("#ToastHapus").toast("show");
			  isiMasterInstansi();	
			},
			error: function() {alert('Koneksi bermasalah periksa internet');},
		  });
		}  
	  });