function bersihkan(){
	$("#lblhalaman").val("");
	$("#txttransid").val(""); $("#txttransketerangan").val("");

	$("#lblkoppeta").text("");
	$("#lblkoparea").text("");
	//$("#lblkopgrafik2").text("");
	//$("#lblkopgrafik3").text("");$("#lblkopgrafik4").text("");
	
	$("#area-halaman").css("display","none");
	$("#area-dashboard").css("display","none");	
	$("#area-pengunjung").css("display","none");	
	$("#area-operator").css("display","none");

	$("#area-tabel-dtks").css("display","none");

	// IKM //
	$("#area-soal").css("display","none");$("#area-unsur").css("display","none");
	$("#area-pekerjaan").css("display","none");$("#area-pendidikan").css("display","none");
	// WISATA //
	$("#area-wisata").css("display","none");$("#area-hotel").css("display","none");
	$("#area-resto").css("display","none");$("#area-travel").css("display","none");
	// IKM //
	$("#area-olahraga").css("display","none");
  }

  /* ============== IMPORT DATA =============== */
  $("#lv_import").click(function(){
	var idinstansi=$('#lblidinstansi').val();
	$.ajax({
	  type:"POST",
	  url :"aksi/sinkronisasi/import-file.php",			
	  data:{idinstansi:idinstansi},
	  success:function(resp){
		$("#isianModTambahData").html(resp);
		$("#isianModTambahData").fadeIn(1000);
		$("#modTambahData").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahData").modal('show');
	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

  $("#lv_sinkron").click(function(){
	var idinstansi=$('#lblidinstansi').val();
	$.ajax({
	  type:"POST",
	 // url :"aksi/sinkronisasi/timeline-sinkron.php",	
	  url :"../aksi-import/import_dinsos.php",			
	  data:{idinstansi:idinstansi},
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(resp){
		/*$("#isianModTambahDataLarge").html(resp);
		$("#isianModTambahDataLarge").fadeIn(1000);
		$("#modTambahDataLarge").modal({backdrop: 'static', keyboard: false}) 
		$("#modTambahDataLarge").modal('show');
		*/

	  },
	  error: function() {alert('Koneksi bermasalah periksa internet');},
	});
  });

   /*================ PENGUNJUNG =================*/
   var hasilApiSekolah;
   function isiMasterPengunjung(){
	$('#tabelpengunjung').dataTable().fnDestroy();
	//var idinstansi=$('#lblidinstansi').val();
	$.ajax({
	  type:"POST",
	  url : "aksi/ambil_api_sekolah.php",
	  //data:{idinstansi:idinstansi},
	  dataType : 'json',
	  beforeSend: function(e) {
		$("#loading").fadeIn();
		document.body.style.cursor = "wait";
	  },
	  success:function(data){
		console.log(data)
		hasilApiSekolah = data;
		document.body.style.cursor = "default";

		/*
			  var html = '';
			  var i;
			  for(i=0; i<data.length; i++){
				html += 
				'<tr class="btn-reveal-trigger">'+
				  '<td class="align-middle text-center" width="5%">'+data[i].no+'</td>'+
				  '<td class="align-middle" width="25%">'+data[i].nmwisata+'</td>'+
				  '<td class="align-middle" width="40%">'+data[i].diskripsi+'</td>'+
				  '<td class="align-middle" width="10%">'+data[i].jenis+'</td>'+
				  '<td class="align-middle text-center" width="10%">'+data[i].jumPengunjung+'</td>'+
				  '<td class="d-flex align-middle text-center" width="10%">'+
					  '<a href="https://www.google.com/maps/?q='+data[i].koordinat+'" target="_blank" class="btn btn-light icon-item rounded-3 me-2 fs--2 icon-item-sm"><span class="fas fa-map-marker-alt"></span></a> '+
					  '<button class="btn btn-light icon-item rounded-3 me-2 fs--2 icon-item-sm btnEditPengunjung" data-id="'+data[i].idwisata+'" data-nmwisata="'+data[i].nmwisata+'" data-jenis="'+data[i].jenis+'"><span class="fas fa-pencil-alt"></span></button> '+
				  '</td>'+
				'</tr>';
				}			
				$('#isitabelpengunjung').html(html);
				$("#tabelpengunjung").dataTable({"paging": false,"lengthChange": false,"ordering": true,"info": false,"autoWidth": false,"responsive": true,"select": false,"scrollX": false,
					language: {'paginate': {'previous': '<<','next': '>>'}},
					  initComplete: function() {$(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');},"searching": true,});
			*/		  
					  $("#loading").fadeOut("slow");						
	  },
	  error: function() {
		$("#loading").fadeOut("slow");
		alert("Koneksi bermasalah periksa internet");
		document.body.style.cursor = "default";					
	  },
	});	
	
  }

  $("#cmdRefreshPengunjung").click(function(){
	//isiMasterPengunjung();
	console.log(hasilApiSekolah)
  });

  arridproduk = [];
  function carikecamatanreg(){
		$.ajax({
			url         : "aksi/hasilapi.json",
			type        : "GET",
			dataType    : "json",
			//data        : {get_param : 'value'},	
			error  : function() {
				alert("Koneksi ke server terputus")	
			},
			success     : function(resp){
				//
				
				myArray = resp['data'];
				//console.log(myArray)
				//var groupedPeople=groupArrayOfObjects(resp,"kecamatan");
				//$.each(groupedPeople, function(index, hd) {	
				//	arridproduk.push(hd);
				//});
				//console.log(arridproduk);
				//myArray = resp;
				//var grupkecamatan = groupArrayOfObjects(myArray,"kecamatan");
				//	console.log(grupkecamatan);	
					//$("#nyobak").text(JSON.stringify(grupkecamatan))
					//$("#nyobak").html(grupkecamatan.nama)

				$.each(resp, function(index, hd) {	
					console.log(hd.nama)
					$("#nyobak").html(hd.kecamatan)
					//arridproduk.push(groupedPeople);		
				});	
				//console.log(JSON.stringify(arridproduk))
				//caridetail();
			}
		});		
	}	

	function caridetail(){
		//$.each(arridproduk, function(index, hd) {	
		//	console.log(hd)
		//	$("#nyobak").text(hd.kecamatan)
			//arridproduk.push(hd);
		//});
		//var data = JSON.parse(arridproduk);
		
		console.log(arridproduk['nama'])
		var i;
		for(i=0; i<arridproduk.length; i++){
			//console.log(arridproduk[i].nama)
			//$("#nyobak").text(arridproduk[i].nama)	
			//if (data[i].sttsrenbut == "belum"){var warnabad = "bg-blue";}else if (data[i].sttsrenbut == "tolak"){var warnabad = "bg-pink";}

		}
	}
	

	function groupArrayOfObjects(list, key) {
		return list.reduce(function(rv, x) {
		  (rv[x[key]] = rv[x[key]] || []).push(x);
		  return rv;
		}, {});
	  };

  /*================ OPERATOR =================*/
  function isiMasterOperator(){
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
					  html += 
					  '<tr class="btn-reveal-trigger">'+
						'<td class="align-middle nmoperator">'+data[i].nmoperator+'</td>'+
						'<td class="align-middle username">'+data[i].username+'</td>'+
						'<td class="align-middle akses">'+data[i].akses+'</td>'+
						'<td class="lign-middle fs-0 blokir"><span class="badge badge rounded-pill badge-soft-'+data[i].warna+'">'+data[i].nmblokir+'</span></td>'+
						'<td class="d-flex">'+
						  '<button class="btn btn-light icon-item rounded-3 me-2 fs--2 icon-item-sm btnBlokirOperator" data-id="'+data[i].idoperator+'" data-nmoperator="'+data[i].nmoperator+'" data-blokir="'+data[i].blokir+'"><span class="fas fa-user-times"></span></button> '+
						  '<button class="btn btn-light icon-item rounded-3 me-2 fs--2 icon-item-sm btnEditOperator" data-id="'+data[i].idoperator+'"><span class="fas fa-pencil-alt"></span></button> '+
						  '<button class="btn btn-light icon-item rounded-3 me-2 fs--2 icon-item-sm btnHapusOperator" data-id="'+data[i].idoperator+'" data-nmoperator="'+data[i].nmoperator+'"><span class="fas fa-trash-alt"></span></button>'+
						'</td>'+
					  '</tr>';
				  }				
		  $('#list-operator').html(html);
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
	var idoperator = $(this).data('id');var nmoperator = $(this).data('nmoperator');
	let text = "Yakin menghapus data operator\n"+nmoperator;
	if (confirm(text) == true) {
	  $.ajax({
		type:"POST",		
		url :"aksi/operator/aksi_hapus.php",	
		data:{idoperator:idoperator},
		success:function(resp){
		  alert(resp);
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
		  alert(resp);
		  isiMasterOperator();	
		},
		error: function() {alert('Koneksi bermasalah periksa internet');},
	  });
	}  
  });


  /* ============== IDENTITAS SKPD =============== */
  $("#cmdIdentitasSKPD").click(function(){
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

