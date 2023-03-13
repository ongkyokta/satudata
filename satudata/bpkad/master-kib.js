/*================ KIB C Tanah & Bangunan =================*/
$("#lv_kib_tanah_bangunan").on("click", function () {
	bersihkan();
	$("#area-kib-tanah-bangunan").fadeIn();

	isiLembagaKIBC();
	$("#spanFilterLembagaKIBC").removeClass("text-200").addClass("text-primary")
	$("#spanFilterOpdKIBC").removeClass("text-primary").addClass("text-200")
	$("#txtketlembagaKIB").val("lembaga")

	$("#lblhalaman").val("KIBC");
	$("#loading").fadeOut("slow");
});

function isiLembagaKIBC(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-C/isi_lembaga_KIB_C.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBC').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="76%" style="max-width:200px;">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-center" width="12%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputKIBC" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pencil-alt"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBC" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBC').html(html);
				  $("#tabelKIBC").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

function isiOpdKIBC(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-C/isi_opd_KIB_C.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBC').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="76%" style="max-width:200px;">'+data[i].nmopd+'<br/><span class="text-primary">'+data[i].nmlembaga+'</span></td>'+
					'<td class="align-middle text-center" width="12%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputKIBC" data-idlembaga="'+data[i].idopd+'" data-ketlembaga="opd" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pencil-alt"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBC" data-idlembaga="'+data[i].idopd+'" data-ketlembaga="opd" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBC').html(html);
				  $("#tabelKIBC").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$("#cmdFilterLembagaKIBC").on('click',function(){
	$("#spanFilterLembagaKIBC").removeClass("text-200").addClass("text-primary")
	$("#spanFilterOpdKIBC").removeClass("text-primary").addClass("text-200")
	$("#txtketlembagaKIB").val("lembaga")
	isiLembagaKIBC()
});

$("#cmdFilterOpdKIBC").on('click',function(){
	$("#spanFilterLembagaKIBC").removeClass("text-primary").addClass("text-200")
	$("#spanFilterOpdKIBC").removeClass("text-200").addClass("text-primary")
	$("#txtketlembagaKIB").val("opd")
	isiOpdKIBC()
});

$("#cmdTambahKIBC").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/KIB-C/tambah_kibc.php",			
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBC').on('click','.btnInputKIBC',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	if (ketlembaga == "lembaga"){var Urlnya = "aksi/KIB-C/tambah_kibc_lembaga.php";}
	else if (ketlembaga == "opd"){var Urlnya = "aksi/KIB-C/tambah_kibc_opd.php";}
	$.ajax({
	  type:"POST",		
	  url : Urlnya,	
	  data:{idlembaga:idlembaga},
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBC').on('click','.btnDetailKIBC',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	$.ajax({
	  type:"POST",		
	  url : "aksi/KIB-C/tabel-mod-detail-kibc.php",	
	  data:{idlembaga:idlembaga,ketlembaga:ketlembaga},
	  success:function(resp){
		$("#isianModdetailLarge").html(resp);
		$("#isianModdetailLarge").fadeIn(1000);
		$("#modDetailLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modDetailLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

/*============================================================*/
/*================ KIB B PERALATAN DAN MESIN =================*/
/*============================================================*/
$("#lv_mesin").on("click", function () {
	bersihkan();
	$("#area-kib-mesin").fadeIn();

	isiLembagaKIBB();
	$("#spanFilterLembagaKIBB").removeClass("text-200").addClass("text-primary")
	$("#spanFilterOpdKIBB").removeClass("text-primary").addClass("text-200")
	$("#txtketlembagaKIBB").val("lembaga")

	$("#lblhalaman").val("KIBB");
	$("#loading").fadeOut("slow");
});

function isiLembagaKIBB(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-B/isi_lembaga_KIB_B.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBB').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="76%" style="max-width:200px;">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-center" width="12%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputKIBB" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pencil-alt"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBB" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBB').html(html);
				  $("#tabelKIBB").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

function isiOpdKIBB(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-B/isi_opd_KIB_B.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBB').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="76%" style="max-width:200px;">'+data[i].nmopd+'<br/><span class="text-primary">'+data[i].nmlembaga+'</span></td>'+
					'<td class="align-middle text-center" width="12%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputKIBB" data-idlembaga="'+data[i].idopd+'" data-ketlembaga="opd" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pencil-alt"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBB" data-idlembaga="'+data[i].idopd+'" data-ketlembaga="opd" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBB').html(html);
				  $("#tabelKIBB").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$("#cmdFilterLembagaKIBB").on('click',function(){
	$("#spanFilterLembagaKIBB").removeClass("text-200").addClass("text-primary")
	$("#spanFilterOpdKIBB").removeClass("text-primary").addClass("text-200")
	$("#txtketlembagaKIBB").val("lembaga")
	isiLembagaKIBB()
});

$("#cmdFilterOpdKIBB").on('click',function(){
	$("#spanFilterLembagaKIBB").removeClass("text-primary").addClass("text-200")
	$("#spanFilterOpdKIBB").removeClass("text-200").addClass("text-primary")
	$("#txtketlembagaKIBB").val("opd")
	isiOpdKIBB()
});

$("#cmdTambahKIBB").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/KIB-B/tambah_kibb.php",			
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBB').on('click','.btnInputKIBB',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	if (ketlembaga == "lembaga"){var Urlnya = "aksi/KIB-B/tambah_kibb_lembaga.php";}
	else if (ketlembaga == "opd"){var Urlnya = "aksi/KIB-B/tambah_kibb_opd.php";}
	$.ajax({
	  type:"POST",		
	  url : Urlnya,	
	  data:{idlembaga:idlembaga},
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBB').on('click','.btnDetailKIBB',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	$.ajax({
	  type:"POST",		
	  url : "aksi/KIB-B/tabel-mod-detail-kibb.php",	
	  data:{idlembaga:idlembaga,ketlembaga:ketlembaga},
	  success:function(resp){
		$("#isianModdetailLarge").html(resp);
		$("#isianModdetailLarge").fadeIn(1000);
		$("#modDetailLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modDetailLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});


/*============================================================*/
/*============= KIB D JALAN, IRIGASI & JARINGAN  =============*/
/*============================================================*/
$("#lv_jalan_irigasi").on("click", function () {
	bersihkan();
	$("#area-kib-jalan").fadeIn();

	isiLembagaKIBD();
	$("#spanFilterLembagaKIBD").removeClass("text-200").addClass("text-primary")
	$("#spanFilterOpdKIBD").removeClass("text-primary").addClass("text-200")
	$("#txtketlembagaKIBD").val("lembaga")

	$("#lblhalaman").val("KIBD");
	$("#loading").fadeOut("slow");
});

function isiLembagaKIBD(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-D/isi_lembaga_KIB_D.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBD').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="76%" style="max-width:200px;">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-center" width="12%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputKIBD" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pencil-alt"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBD" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBD').html(html);
				  $("#tabelKIBD").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

function isiOpdKIBD(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-D/isi_opd_KIB_D.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBD').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="76%" style="max-width:200px;">'+data[i].nmopd+'<br/><span class="text-primary">'+data[i].nmlembaga+'</span></td>'+
					'<td class="align-middle text-center" width="12%"><span class="badge badge-soft-info">'+data[i].jmlkibc+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputKIBD" data-idlembaga="'+data[i].idopd+'" data-ketlembaga="opd" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pencil-alt"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBD" data-idlembaga="'+data[i].idopd+'" data-ketlembaga="opd" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBD').html(html);
				  $("#tabelKIBD").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$("#cmdFilterLembagaKIBD").on('click',function(){
	$("#spanFilterLembagaKIBD").removeClass("text-200").addClass("text-primary")
	$("#spanFilterOpdKIBD").removeClass("text-primary").addClass("text-200")
	$("#txtketlembagaKIBD").val("lembaga")
	isiLembagaKIBD()
});

$("#cmdFilterOpdKIBD").on('click',function(){
	$("#spanFilterLembagaKIBD").removeClass("text-primary").addClass("text-200")
	$("#spanFilterOpdKIBD").removeClass("text-200").addClass("text-primary")
	$("#txtketlembagaKIBD").val("opd")
	isiOpdKIBD()
});

$("#cmdTambahKIBD").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/KIB-D/tambah_kibd.php",			
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBD').on('click','.btnInputKIBD',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	if (ketlembaga == "lembaga"){var Urlnya = "aksi/KIB-D/tambah_kibd_lembaga.php";}
	else if (ketlembaga == "opd"){var Urlnya = "aksi/KIB-D/tambah_kibd_opd.php";}
	$.ajax({
	  type:"POST",		
	  url : Urlnya,	
	  data:{idlembaga:idlembaga},
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBD').on('click','.btnDetailKIBD',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	$.ajax({
	  type:"POST",		
	  url : "aksi/KIB-D/tabel-mod-detail-kibd.php",	
	  data:{idlembaga:idlembaga,ketlembaga:ketlembaga},
	  success:function(resp){
		$("#isianModdetailLarge").html(resp);
		$("#isianModdetailLarge").fadeIn(1000);
		$("#modDetailLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modDetailLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

/*============================================================*/
/*=============   KIB A LAHAN, TANAH & GEDUNG    =============*/
/*============================================================*/
$("#lv_lahan").on("click", function () {
	bersihkan();
	$("#area-kib-lahan").fadeIn();

	isiLembagaKIBA();
	$("#txtketlembagaKIBA").val("lembaga")

	$("#lblhalaman").val("KIBA");
	$("#loading").fadeOut("slow");
});

function isiLembagaKIBA(){
	$.ajax({
	  type:"POST",
	  url : "aksi/KIB-A/isi_lembaga_KIB_A.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelKIBA').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){

				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="68%" style="max-width:250px;">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-primary">'+data[i].jmlkiba+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-success">'+data[i].jmlsewa+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-info">'+data[i].jmlsertifikat+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailKIBA" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnViewMapKIBA" data-idlembaga="'+data[i].idlembaga+'" data-nmlembaga="'+data[i].nmlembaga+'" data-koordinat="'+data[i].koordinat+'" data-bs-toggle="tooltip" title="Tampilkan peta"><span class="fas fa-map-marker-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelKIBA').html(html);
				  $("#tabelKIBA").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$("#cmdTambahKIBA").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/KIB-A/tambah_kiba.php",			
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBA').on('click','.btnViewMapKIBA',function(){
	var idlembaga = $(this).data('idlembaga');var nmlembaga = $(this).data('nmlembaga');
	var koordinat = $(this).data('koordinat');
	$.ajax({
	  type:"POST",		
	  url : "aksi/KIB-A/tampil_map.php",	
	  data:{idlembaga:idlembaga,nmlembaga:nmlembaga,koordinat:koordinat},
	  success:function(resp){
		$("#isianmodKartuLarge").html(resp);
		$("#isianmodKartuLarge").fadeIn(1000);
		$("#modKartuLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modKartuLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelKIBA').on('click','.btnDetailKIBA',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	$.ajax({
	  type:"POST",		
	  url : "aksi/KIB-A/tabel-mod-kartu-kiba.php",	
	  data:{idlembaga:idlembaga,ketlembaga:ketlembaga},
	  success:function(resp){
		$("#isianModdetailLarge").html(resp);
		$("#isianModdetailLarge").fadeIn(1000);
		$("#modDetailLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modDetailLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

