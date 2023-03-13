
/*============================================================*/
/*=====================  TRANSAKSI SEWA    ===================*/
/*============================================================*/
$("#lv_trans_sewa").on("click", function () {
	bersihkan();
	$("#area-sewa").fadeIn();

	isiTransaksiSewa();
	
	$("#lblhalaman").val("sewa");
	$("#loading").fadeOut("slow");
});

function isiTransaksiSewa(){
	var urlserver = $("#lblurlqrcode").val();
	$.ajax({
	  type:"POST",
	  url : "aksi/TRANSAKSI/isi_tabel_transaksi_sewa.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelTransSewa').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
					if (data[i].sttstransaksi == "Terima"){var hidterima = "";}
					else {var hidterima = "display:none;";}
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-center" width="12%">'+data[i].tglpengajuan+'</td>'+
					'<td class="align-middle" width="18%">'+data[i].nmpenyewa+'<br/><span class="badge badge-soft-light">'+data[i].nik+'</span></td>'+
					'<td class="align-middle text-truncate" width="48%" style="max-width:200px;">'+data[i].nmbarang+'<br/>'+data[i].alamat+'</td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-primary">'+data[i].totluas+'</span></td>'+
					'<td class="align-middle text-center" width="8%">'+data[i].totpenawaran+'</td>'+
					'<td class="align-middle" width="8%">'+
						'<a href="' + urlserver + 'administrator/cetak-pengajuan-sewa-' + data[i].mdiddetail+'.html" target="_blank" class="btn btn-light btn-sm shadow-none d-inline-flex align-items-center fs--1 me-1" type="button"><img class="cursor-pointer" src="../assets/img/icons/spot-illustrations/calendar.svg" width="12" alt="" />'+
						'<span class="ms-2 d-none d-md-inline-block fs--2">Pengajuan</span></a><br/>'+
						'<a href="' + urlserver + 'administrator/cetak-surat-perjanjian-' + data[i].mdiddetail+'.html" target="_blank" class="btn btn-light btn-sm text-primary shadow-none d-inline-flex align-items-center fs--1 me-1 mt-1" type="button" style="'+ hidterima +'"><img class="cursor-pointer" src="../assets/img/icons/spot-illustrations/calendar.svg" width="12" alt="" />'+
						'<span class="ms-2 d-none d-md-inline-block fs--2">Cetak SP</span></a>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnInputTranSewa" data-idtranssewa="'+data[i].idtranssewa+'" data-bs-toggle="tooltip" title="Input Baru"><span class="fas fa-pen text-primary"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditTranSewa" data-iddetail="'+data[i].iddetail+'" data-idtranssewa="'+data[i].idtranssewa+'" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusTransSewa" data-idtranssewa="'+data[i].idtranssewa+'" data-tglpengajuan="'+data[i].tglpengajuan+'" data-nmpenyewa="'+data[i].nmpenyewa+'" data-nmbarang="'+data[i].nmbarang+'" data-alamat="'+data[i].alamat+'" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt text-danger"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnViewMapTransSewa" data-idtanah="'+data[i].iddetail+'" data-bs-toggle="tooltip" title="Tampilkan peta"><span class="fas fa-map-marker-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelTransSewa').html(html);
				  $("#tabelTransSewa").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$("#cmdRefreshTransSewa").on('click',function(){
	isiTransaksiSewa()
});

$("#cmdTambahTransSewa").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/TRANSAKSI/tambah_transaksi_sewa.php",			
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransSewa').on('click','.btnViewMapTransSewa',function(){
	var idtanah = $(this).data('idtanah');
	$.ajax({
	  type:"POST",		
	  url : "aksi/TRANSAKSI/tampil_map_tanah.php",	
	  data:{idtanah:idtanah},
	  success:function(resp){
		$("#isianmodMapTransLarge").html(resp);
		$("#isianmodMapTransLarge").fadeIn(1000);
		$("#modMapTransLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modMapTransLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransSewa').on('click','.btnInputTranSewa',function(){
	var idtranssewa = $(this).data('idtranssewa');
	$.ajax({
	  type:"POST",		
	  url : "aksi/TRANSAKSI/input_baru_detail_sewa.php",	
	  data:{idtranssewa:idtranssewa},
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransSewa').on('click','.btnEditTranSewa',function(){
	var idtranssewa = $(this).data('idtranssewa');var iddetail = $(this).data('iddetail');
	$.ajax({
	  type:"POST",		
	  url : "aksi/TRANSAKSI/edit_transaksi_sewa.php",	
	  data:{iddetail:iddetail,idtranssewa:idtranssewa},
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransSewa').on('click','.btnHapusTransSewa',function(){
	var idtranssewa = $(this).data('idtranssewa');
	var tglpengajuan = $(this).data('tglpengajuan');var nmpenyewa = $(this).data('nmpenyewa');
	var nmbarang = $(this).data('nmbarang');var alamat = $(this).data('alamat');
	let text = "Yakin Anda menghapus data pengajuan sewa\n\n"+tglpengajuan+"\n"+nmpenyewa+"\n"+nmbarang+"\n"+alamat;
	if (confirm(text) == true) {
		$.ajax({
			type:"POST",		
			url :"aksi/TRANSAKSI/aksi_hapus.php",	
			data:{idtranssewa:idtranssewa},
			success:function(resp){
			$("#ToastSukses").toast("show");
			isiTransaksiSewa();
			},
			error: function() {alert('Koneksi bermasalah periksa internet');},
		});
	}  
});




/*============================================================*/
/*=====================  LAPORAN SEWA    ===================*/
/*============================================================*/
$("#lv_lap_sewa").on("click", function () {
	bersihkan();
	$("#area-laporan-sewa").fadeIn();
	isiLaporanSewa();
	$("#lblhalaman").val("laporan-sewa");
	$("#loading").fadeOut("slow");
});

function isiLaporanSewa(){
	$.ajax({
	  type:"POST",
	  url : "aksi/LAPORAN/isi_tabel_laporan_sewa.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelLapSewa').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
				  if (data[i].jmlsewa <= 0){var wrnsewa = "danger";} else if (data[i].jmlsewa >= 1){var wrnsewa = "success";}
				  if (data[i].jmlpengajuan <= 0){var wrnajuan = "warning";} else if (data[i].jmlpengajuan >= 1){var wrnajuan = "info";}
				  if (data[i].jmldisewa <= 0){var wrndisewa = "warning";} else if (data[i].jmldisewa >= 1){var wrndisewa = "info";}
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle text-truncate" width="60%" style="max-width:200px;">'+data[i].nmlembaga+'</td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-primary">'+data[i].jmlkiba+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-'+wrnsewa+'">'+data[i].jmlsewa+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-'+wrnajuan+'">'+data[i].jmlpengajuan+'</span></td>'+
					'<td class="align-middle text-center" width="8%"><span class="badge badge-soft-'+wrndisewa+'">'+data[i].jmldisewa+'</span></td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnDetailLapSewa" data-idlembaga="'+data[i].idlembaga+'" data-ketlembaga="lembaga" data-bs-toggle="tooltip" title="Tampilkan Inventaris"><span class="fas fa-align-justify"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnViewMapLapSewa" data-idlembaga="'+data[i].idlembaga+'" data-nmlembaga="'+data[i].nmlembaga+'" data-koordinat="'+data[i].koordinat+'" data-bs-toggle="tooltip" title="Tampilkan peta"><span class="fas fa-map-marker-alt"></span></button>'+
					'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelLapSewa').html(html);
				  $("#tabelLapSewa").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$('#isitabelLapSewa').on('click','.btnViewMapLapSewa',function(){
	var idlembaga = $(this).data('idlembaga');var nmlembaga = $(this).data('nmlembaga');
	var koordinat = $(this).data('koordinat');
	$.ajax({
	  type:"POST",		
	  url : "aksi/LAPORAN/tampil_map.php",	
	  data:{idlembaga:idlembaga,nmlembaga:nmlembaga,koordinat:koordinat},
	  success:function(resp){
		$("#isianmodMapLapLarge").html(resp);
		$("#isianmodMapLapLarge").fadeIn(1000);
		$("#modMapLapLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modMapLapLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelLapSewa').on('click','.btnDetailLapSewa',function(){
	var idlembaga = $(this).data('idlembaga');
	var ketlembaga = $(this).data('ketlembaga');
	$.ajax({
	  type:"POST",		
	  url : "aksi/LAPORAN/tabel-mod-kartu-laporan.php",	
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
/*============== TRANSAKSI PINJAM PAKAI    ===================*/
/*============================================================*/
$("#lv_trans_pinjam").on("click", function () {
	bersihkan();
	$("#area-pinjam-pakai").fadeIn();

	isiTransaksiPinjamPakai();
	
	$("#lblhalaman").val("pinjam-pakai");
	$("#loading").fadeOut("slow");
});

function isiTransaksiPinjamPakai(){
	var urlserver = $("#lblurlqrcode").val();
	$.ajax({
	  type:"POST",
	  url : "aksi/PINJAM-PAKAI/isi_tabel_transaksi_pinjam.php",
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		document.body.style.cursor = "default";
		  $('#tabelTransPinjam').dataTable().fnDestroy();
				var html = '';
				var i;
				for(i=0; i<data.length; i++){
				  html += 
				  '<tr class="btn-reveal-trigger">'+
					'<td class="align-middle text-center" width="4%">'+data[i].no+'</td>'+
					'<td class="align-middle" width="12%"><span class="badge badge-soft-primary">'+data[i].nosurat+'</span><br/>'+data[i].tglpinjam+'</td>'+
					'<td class="align-middle" width="30%">'+data[i].nmpeminjam+'</td>'+
					'<td class="align-middle text-truncate" width="40%" style="max-width:200px;">'+data[i].alamat+'<br/>'+data[i].peruntukan+'</td>'+
					'<td class="align-middle" width="28%">'+
						'<a href="' + urlserver + 'administrator/cetak-perjanjian-' + data[i].mdidtranspinjam+'.html" target="_blank" class="btn btn-light btn-sm shadow-none d-inline-flex align-items-center fs--1 me-1" type="button"><img class="cursor-pointer" src="../assets/img/icons/spot-illustrations/calendar.svg" width="12" alt="" />'+
						'<span class="ms-2 d-none d-md-inline-block fs--2">Perjanjian</span></a>'+
						//'<a href="' + urlserver + 'administrator/cetak-berita-acara-' + data[i].mdidtranspinjam+'.html" target="_blank" class="btn btn-light btn-sm text-primary shadow-none d-inline-flex align-items-center fs--1 me-1 mt-1" type="button"><img class="cursor-pointer" src="../assets/img/icons/spot-illustrations/calendar.svg" width="12" alt="" />'+
						//'<span class="ms-2 d-none d-md-inline-block fs--2">Berita Acara</span></a>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditTranPinjam" data-idtranspinjam="'+data[i].idtranspinjam+'" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>'+
					'</td>'+
					'<td class="align-middle text-center" width="4%">'+
					  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusTransPinjam" data-idtranspinjam="'+data[i].idtranspinjam+'" data-nosurat="'+data[i].nosurat+'" data-peruntukan="'+data[i].peruntukan+'" data-alamat="'+data[i].alamat+'" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt text-danger"></span></button>'+
					'</td>'+
					//'<td class="align-middle text-center" width="4%">'+
					//  '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnViewMapTransPinjam" data-idtranspinjam="'+data[i].idtranspinjam+'" data-bs-toggle="tooltip" title="Tampilkan peta"><span class="fas fa-map-marker-alt"></span></button>'+
					//'</td>'+
				  '</tr>';
				  }			
				  $('#isitabelTransPinjam').html(html);
				  $("#tabelTransPinjam").dataTable({"paging": true, "lengthChange": false,"ordering": true,"info": false,"autoWidth": true,"responsive": true,"select": false,"scrollX": true,
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

$("#cmdRefreshTransPinjam").on('click',function(){
	isiTransaksiPinjamPakai()
});

$("#cmdTambahTransPinjam").on('click',function(){
	$.ajax({
	  type:"POST",
	  url :"aksi/PINJAM-PAKAI/tambah_transaksi_pinjam.php",			
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransPinjam').on('click','.btnViewMapTransPinjam',function(){
	var idtanah = $(this).data('idtanah');
	$.ajax({
	  type:"POST",		
	  url : "aksi/PINJAM-PAKAI/tampil_map_tanah.php",	
	  data:{idtanah:idtanah},
	  success:function(resp){
		$("#isianmodMapTransLarge").html(resp);
		$("#isianmodMapTransLarge").fadeIn(1000);
		$("#modMapTransLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modMapTransLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransPinjam').on('click','.btnEditTranPinjam',function(){
	var idtranssewa = $(this).data('idtranssewa');var iddetail = $(this).data('iddetail');
	$.ajax({
	  type:"POST",		
	  url : "aksi/PINJAM-PAKAI/edit_transaksi_pinjam.php",	
	  data:{iddetail:iddetail,idtranssewa:idtranssewa},
	  success:function(resp){
		$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
});

$('#isitabelTransPinjam').on('click','.btnHapusTransPinjam',function(){
	var idtranspinjam = $(this).data('idtranspinjam');
	var nosurat = $(this).data('nosurat');var alamat = $(this).data('alamat');
	var peruntukan = $(this).data('peruntukan');
	let text = "Yakin Anda menghapus data pinjam pakai gedung\n\nNo. Surat : "+nosurat+"\n"+alamat+"\n"+peruntukan;
	if (confirm(text) == true) {
		$.ajax({
			type:"POST",		
			url :"aksi/PINJAM-PAKAI/aksi_hapus_pinjam.php",	
			data:{idtranspinjam:idtranspinjam},
			success:function(resp){
			$("#ToastSukses").toast("show");
			isiTransaksiPinjamPakai();
			},
			error: function() {alert('Koneksi bermasalah periksa internet');},
		});
	}  
});