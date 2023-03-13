		
			<div class="modal-header px-5 position-relative modal-shape-header bg-shape">			  
			<div class="position-relative z-index-1 light">
                  <h4 class="mb-0 text-white">Tambah Operator</h4>
                  <p class="fs--1 mb-0 text-white">Silahkan menambahkan data operator</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3 px-4">

				<div class="mb-3">
                    <label class="form-label" for="txtnmoperator">Nama Operator</label>
                    <input class="form-control" type="text" id="txtnmoperator" maxlength="50" autocomplete="off" style="font-size:13px;"/>
                </div>

				<div class="mb-3">
                    <label class="form-label" for="cboakses">Hak Akses</label>
                    <select class="form-select js-choice" size="1" name="cboakses" id="cboakses" data-options='{"removeItemButton":true,"placeholder":true}' style="font-size:14px;">
						<option value=""></option>
						<option value="administrator">Administrator</option>
						<option value="operator">Operator</option>
					</select>
				  </div>

            </div>
			<div class="modal-footer">
				<button class="btn btn-sm btn-falcon-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
				<button class="btn btn-sm btn-falcon-primary" type="button" id="cmdSimpanOperator">Simpan data</button>
			</div>

<script type="text/javascript" charset="utf-8">
$(document).ready(function(){		
	$("#txtnmoperator").val("");$("#cboakses").val("");	
});

$("#cmdSimpanOperator").click(function(){
	var idinstansi = $('#lblidinstansi').val();
	var akses = $('#cboakses').val();
	var nmuser = $('#txtnmoperator').val();

	if(nmuser.length<=0){$('#txtnmoperator').focus();alert('Nama operator masih kosong')}
	else if(akses.length<=0){$('#cboakses').focus();alert('Akses masih kosong')}
	else{
	$.ajax({
		type:"POST",
		url:'aksi/operator/aksi_tambah.php',
		data:{nmuser:nmuser,akses:akses,idinstansi:idinstansi},
		dataType: "json",
		beforeSend: function(e) {
			$("#cmdSimpanOperator").attr("disabled","disabled");
		},		
		success:function(resp){
			if(resp.msg2 == 'ok'){
				setTimeout(function(){ $('#modTambahData').modal('hide');},1000);
				$("#ToastSukses").toast("show");
				isiMasterOperator();
			}else if(resp.msg2 == 'err_val'){
				alert(resp.msg1);
				$("#cmdSimpanOperator").removeAttr("disabled");							
			}else {
				alert('Ada sedikit masalah, silakan coba lagi.');
				$("#cmdSimpanOperator").removeAttr("disabled");
			}
		},
		error: function() {
			alert('Koneksi bermasalah periksa internet');
			$("#cmdSimpanOperator").removeAttr("disabled");
			$(".modal-body").css("opacity", "");},
	});	
	}; 	
});	
</script>	