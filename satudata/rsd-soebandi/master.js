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
