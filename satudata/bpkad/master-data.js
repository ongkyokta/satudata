  function bersihkan(){
	$("#lblhalaman").val("");
	$("#txttransid").val("");$("#txttransketerangan").val("");$("#txttransnmwilayah").val("");
	
	$("#txttransiddetailsekolah").val("");//// dashboard ////

	$("#lblkoppeta").text("");
	$("#lblkopgrafik1").text("");$("#lblkopgrafik2").text("");
	$("#lblkopgrafik3").text("");$("#lblkopgrafik4").text("");
	
	$("#area-peta").css("display","none");
	$("#area-halaman-utama").css("display","none");
	$("#area-halaman-sekolah").css("display","none");
	//$('#hal-detail-sekolah').html(resp);

	/////// master ////////
	$("#area-kib-tanah-bangunan").css("display","none");
	$("#area-kib-mesin").css("display","none");
	$("#area-kib-jalan").css("display","none");
	$("#area-kib-lahan").css("display","none");

	/////// transaksi ////////
	$("#area-sewa").css("display","none");
	$("#area-pinjam-pakai").css("display","none");

	/////// laporan ////////
	$("#area-laporan-sewa").css("display","none");

	/////// master ////////
	$("#area-halaman-lembaga").css("display","none");
	$("#area-halaman-operator").css("display","none");
	$("#area-halaman-user-mobile").css("display","none");
	$("#area-halaman-opd").css("display","none");

	/////// master aset ////////
	$("#area-aset").css("display","none");
	$("#area-aset-kategori").css("display","none");
	$("#area-aset-sub-kategori").css("display","none");
	$("#area-aset-golongan").css("display","none");
	$("#area-aset-asal").css("display","none");
	$("#area-aset-tingkat").css("display","none");
	$("#area-aset-beton").css("display","none");
  }

  $('#cmdGantiPassword').on('click', function() {
	var idoperator = $('#lbleditor').val();
	$.ajax({
		type:"POST",		
		url :"../services/reset_password.php",	
		data:{idoperator:idoperator},
		success:function(resp){
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
			$("#modTambahData").modal('show');
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	}); 
  });

  function ambilJumlahMenu() {
	$("#lblnavjmloperator").html("0")
	$("#lblnavjmlusermobile").html("0")
	$("#lblnavjmlopd").html("0")
	$("#lblnavjmllembaga").html("0")
	$.ajax({
		type: "POST",
		url: "aksi/ambil_jumlah_menu.php",
		dataType : 'json',
		success: function(data) {
			var i;
			for(i=0; i<data.length; i++){
				$("#lblnavjmloperator").html(data[i].jmloperator);
				$("#lblnavjmlusermobile").html(data[i].jumuser);
				$("#lblnavjmlopd").html(data[i].jumopd);
				$("#lblnavjmllembaga").html(data[i].jumlembaga);
			}
		},
		error: function() {
			console.log('error');
		},
	});
  }

  $("#lv_lembaga").on("click", function () {
	bersihkan();
	$("#area-halaman-lembaga").fadeIn();
	isiMasterLembaga();
	$("#lblhalaman").val("lembaga");
	$("#loading").fadeOut("slow");
  });

  $("#lv_operator").on("click",function(){
	bersihkan();
	$("#area-halaman-operator").fadeIn();
	isiMasterOperator();
	$("#lblhalaman").val("operator");
	$("#loading").fadeOut("slow");
  });

  $("#lv_user_mobile").on("click",function(){
	bersihkan();
	$("#area-halaman-user-mobile").fadeIn();
	isiMasterUserMobile();
	$("#lblhalaman").val("user-mobile");
	$("#loading").fadeOut("slow");
  });

  $("#lv_opd").on("click", function () {
	bersihkan();
	$("#area-halaman-opd").fadeIn();
	isiMasterOPD();
	$("#lblhalaman").val("opd");
	$("#loading").fadeOut("slow");
  });

  /*================ OPERATOR =================*/
  function isiMasterOperator(){
	$.ajax({
	  type:"POST",
	  url : "aksi/isi_tabel_operator.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelOperatorAdm').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
  
				  if(data[i].akses == "ADMINISTRATOR"){
					var warna = "badge-soft-light";
				  } else if(data[i].akses == "LEMBAGA"){
					var warna = "badge-soft-primary";
				  }  else if(data[i].akses == "OPD"){
					var warna = "badge-soft-success";
				  } 
  
				  if(data[i].blokir == "Y"){
					  var warnablokir = "badge-soft-warning";
				  } else if(data[i].blokir == "N"){
					  var warnablokir = "badge-soft-primary";
				  }
  
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%"><span class="badge '+warna+'">'+data[i].no+'</span></td>'+
					'<td class="align-middle" width="20%">'+data[i].username+'</td>'+
					'<td class="align-middle text-truncate" width="42%" style="max-width:200px;">'+data[i].nminstansi+'</td>'+
					'<td class="align-middle" width="12%"><span class="badge '+warna+' rounded-pill">'+data[i].akses+'</span></td>'+
					'<td class="align-middle text-center" width="10%"><span class="badge '+warnablokir+'">'+data[i].nmblokir+'</span></td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnBlokirOptAdm" data-idoperator="'+data[i].idoperator+'" data-username="'+data[i].username+'" data-nminstansi="'+data[i].nminstansi+'" data-blokir="'+data[i].blokir+'" data-bs-toggle="tooltip" title="Blokir"><span class="fas fa-ban"></span></button>'+
					'</td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditOptAdm" data-idoperator="'+data[i].idoperator+'" data-username="'+data[i].username+'" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>'+
					'</td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusOptAdm" data-idoperator="'+data[i].idoperator+'" data-username="'+data[i].username+'" data-nminstansi="'+data[i].nminstansi+'" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelOperatorAdm').html(html);
				  $("#tabelOperatorAdm").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

  $("#cmdRefreshOperator").on('click',function(){
	isiMasterOperator();
  });

  $("#cmdTambahOperator").on('click',function(){
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

  $('#isitabelOperatorAdm').on('click','.btnEditOptAdm',function(){
	var idoperator = $(this).data('idoperator');
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

  $('#isitabelOperatorAdm').on('click','.btnHapusOptAdm',function(){
	var idoperator = $(this).data('idoperator');var nmoperator = $(this).data('username');
	var nminstansi = $(this).data('nminstansi');
	let text = "Yakin Anda menghapus data operator\n\n"+nmoperator+"\n"+nminstansi;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/operator/aksi_hapus.php",	
		data:{idoperator:idoperator},
		success:function(resp){
		  $("#ToastSukses").toast("show");
		  isiMasterOperator();	
		  ambilJumlahMenu();
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });

  $('#isitabelOperatorAdm').on('click','.btnBlokirOptAdm',function(){
	var idoperator = $(this).data('idoperator');var nmoperator = $(this).data('username');
	var blokir = $(this).data('blokir');var nminstansi = $(this).data('nminstansi');
	if (blokir=="Y"){var ubahstatus ="Membuka Blokir";var status ="N";} else {var ubahstatus ="Memblokir";var status ="Y";}
	let text = "Yakin Anda "+ubahstatus+" data operator\n\n"+nmoperator+"\n"+nminstansi;
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
	$.ajax({
	  type:"POST",
	  url : "aksi/isi_tabel_opd.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelopd').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="40%" style="max-width:200px;">'+data[i].nmopd+'<br/><span class="text-primary">'+data[i].nmlembaga+'</span></td>'+
					'<td class="align-middle text-truncate" width="38%" style="max-width:200px;">'+data[i].alamat+'</td>'+
					'<td class="align-middle" width="10%"><span class="badge badge-soft-info">'+data[i].telepon+'</span></td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditOPD" data-idopd="'+data[i].idopd+'" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>'+
					'</td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusOPD" data-idopd="'+data[i].idopd+'" data-nmopd="'+data[i].nmopd+'" data-nmlembaga="'+data[i].nmlembaga+'" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelopd').html(html);
				  $("#tabelopd").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

  $("#cmdRefreshOPD").on('click',function(){
	isiMasterOPD();
  });

  $("#cmdTambahOPD").on('click',function(){
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

  $('#isitabelopd').on('click','.btnEditOPD',function(){
	var idopd = $(this).data('idopd');
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

  $('#isitabelopd').on('click','.btnHapusOPD',function(){
	var idopd = $(this).data('idopd');var nmopd = $(this).data('nmopd');var nmlembaga = $(this).data('nmlembaga');
	let text = "Yakin Anda menghapus data OPD\n"+nmopd+"\n"+nmlembaga;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/opd/aksi_hapus.php",	
		data:{idopd:idopd},
		success:function(resp){
		  $("#ToastSukses").toast("show");
		  isiMasterOPD();	
		  ambilJumlahMenu();
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });

 /*================ LEMBAGA =================*/
 function isiMasterLembaga(){
	$.ajax({
	  type:"POST",
	  url : "aksi/isi_tabel_lembaga.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabellembaga').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle" width="36%">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-truncate" width="40%" style="max-width:200px;">'+data[i].alamat+'</td>'+
					'<td class="align-middle" width="12%"><span class="badge badge-soft-info">'+data[i].telepon+'</span></td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditLembaga" data-idlembaga="'+data[i].idlembaga+'" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>'+
					'</td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusLembaga" data-idlembaga="'+data[i].idlembaga+'" data-nmlembaga="'+data[i].nmlembaga+'" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabellembaga').html(html);
				  $("#tabellembaga").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

  $("#cmdRefreshLembaga").on('click',function(){
	isiMasterLembaga();
  });

  $("#cmdTambahLembaga").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/lembaga/tambah_lembaga.php",			
	  success:function(resp){
		$("#isianModTambahData").html(resp);
		$("#isianModTambahData").fadeIn(1000);
		$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $('#isitabellembaga').on('click','.btnEditLembaga',function(){
	var idlembaga = $(this).data('idlembaga');
	$.ajax({
	  type:"POST",		
	  url :"aksi/lembaga/edit_lembaga.php",	
	  data:{idlembaga:idlembaga},
	  success:function(resp){
		$("#isianModEditData").html(resp);
		$("#isianModEditData").fadeIn(1000);
		$("#modEditData").modal({backdrop: 'static', keyboard: false}) 
		$("#modEditData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $('#isitabellembaga').on('click','.btnHapusLembaga',function(){
	var idlembaga = $(this).data('idlembaga');var nmlembaga = $(this).data('nmlembaga');
	let text = "Yakin Anda menghapus data lembaga\n"+nmlembaga;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/lembaga/aksi_hapus.php",	
		data:{idlembaga:idlembaga},
		success:function(resp){
		  $("#ToastSukses").toast("show");
		  isiMasterLembaga();	
		  ambilJumlahMenu();
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });

  /* ============== IDENTITAS SKPD =============== */
  $("#cmdIdentitasSKPD").on('click',function(){
	var idinstansi=$('#lblidinstansi').val();
	$.ajax({
	  type:"POST",
	  url :"aksi/identitas-instansi/edit_identitas_instansi.php",			
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

 /*================ USER MOBILE =================*/
 function isiMasterUserMobile(){
	$.ajax({
	  type:"POST",
	  url : "aksi/isi_tabel_user_mobile.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelUserMobile').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
  
				  if(data[i].akses == "ADMINISTRATOR"){
					var warna = "badge-soft-light";
				  } else if(data[i].akses == "LEMBAGA"){
					var warna = "badge-soft-primary";
				  }  else if(data[i].akses == "OPD"){
					var warna = "badge-soft-success";
				  } 

				  if(data[i].validator == "Y"){
					var warnavalidator = "badge-soft-primary";
				  } else if(data[i].validator == "N"){
					var warnavalidator = "badge-soft-light";
				  }
  
				  if(data[i].sttsvalidator == "AKTIF"){
					var warnastts = "badge-soft-primary";var iconstatus = "fas fa-ban";
					var hidstatus = "";
				  } else if(data[i].sttsvalidator == "MENUNGGU AKTIVASI"){
					var warnastts = "badge-soft-warning";var iconstatus = "fas fa-check";
					var hidstatus = "";
				  }  else if(data[i].sttsvalidator == "TIDAK AKTIF"){
					var warnastts = "badge-soft-secondary";var iconstatus = "fas fa-check";
					var hidstatus = "display:none";
				  } 

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%"><span class="badge '+warna+'">'+data[i].no+'</span></td>'+
					'<td class="align-middle text-truncate" width="15%" style="max-width:80px;">'+data[i].username+'</td>'+
					'<td class="align-middle text-truncate" width="30%" style="max-width:150px;">'+data[i].nminstansi+'</td>'+
					'<td class="align-middle" width="12%"><span class="badge '+warna+' rounded-pill">'+data[i].akses+'</span></td>'+
					'<td class="align-middle text-center" width="10%"><span class="badge '+warnavalidator+'">'+data[i].nmvalidator+'</span></td>'+
					'<td class="align-middle text-center" width="17%"><span class="badge '+warnastts+'">'+data[i].sttsvalidator+'</span></td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnAktivasiUserMb" data-iduser="'+data[i].iduser+'" data-username="'+data[i].username+'" data-nminstansi="'+data[i].nminstansi+'" data-aktivasi="'+data[i].sttsvalidator+'" data-bs-toggle="tooltip" title="Aktivasi user" style="'+hidstatus+'"><span class="'+iconstatus+'"></span></button>'+
					'</td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditUserMb" data-iduser="'+data[i].iduser+'" data-username="'+data[i].username+'" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>'+
					'</td>'+
					'<td class="align-middle" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusUserMb" data-iduser="'+data[i].iduser+'" data-username="'+data[i].username+'" data-nminstansi="'+data[i].nminstansi+'" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelUserMobile').html(html);
				  $("#tabelUserMobile").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

  $("#cmdRefreshUserMobile").on('click',function(){
	isiMasterUserMobile();
  });

  $("#cmdTambahUserMobile").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/user-mobile/tambah_user.php",			
	  success:function(resp){
		$("#isianModTambahData").html(resp);
		$("#isianModTambahData").fadeIn(1000);
		$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $('#isitabelUserMobile').on('click','.btnEditUserMb',function(){
	var iduser = $(this).data('iduser');
	$.ajax({
	  type:"POST",		
	  url :"aksi/user-mobile/edit_user.php",	
	  data:{iduser:iduser},
	  success:function(resp){
		$("#isianModEditData").html(resp);
		$("#isianModEditData").fadeIn(1000);
		$("#modEditData").modal({backdrop: 'static', keyboard: false}) 
		$("#modEditData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $('#isitabelUserMobile').on('click','.btnHapusUserMb',function(){
	var iduser = $(this).data('iduser');var nmoperator = $(this).data('username');
	var nminstansi = $(this).data('nminstansi');
	let text = "Yakin Anda menghapus data user mobile\n\n"+nmoperator+"\n"+nminstansi;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/user-mobile/aksi_hapus.php",	
		data:{iduser:iduser},
		success:function(resp){
		  $("#ToastSukses").toast("show");
		  isiMasterUserMobile();	
		  ambilJumlahMenu();
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });

  $('#isitabelUserMobile').on('click','.btnAktivasiUserMb',function(){
	var iduser = $(this).data('iduser');var nmoperator = $(this).data('username');
	var aktivasi = $(this).data('aktivasi');var nminstansi = $(this).data('nminstansi');
	
	if (aktivasi=="MENUNGGU AKTIVASI"){var ubahstatus ="Aktifkan";var status ="AKTIF";
	} else if (aktivasi=="AKTIF") {var ubahstatus ="Me Non-Aktifkan";var status ="TIDAK AKTIF";}

	let text = "Yakin Anda "+ubahstatus+" data user mobile\n\n"+nmoperator+"\n"+nminstansi;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/user-mobile/aksi_aktivasi.php",	
		data:{iduser:iduser,status:status},
		success:function(resp){
		  $("#ToastSukses").toast("show");
		  isiMasterUserMobile();	
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });
