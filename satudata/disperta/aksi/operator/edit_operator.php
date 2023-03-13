<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idoperator= trim($_POST['idoperator']);

$qri = ("SELECT nm_operator,akses FROM m_operator WHERE id_operator='".$idoperator."'");
$dbquery = mysqli_query($dbconn,$qri);$c= mysqli_fetch_assoc($dbquery);
$nmoperator = strtoupper($c['nm_operator']);$akses =$c['akses'];
mysqli_free_result($dbquery);mysqli_close($dbconn);
?>    				
			<div class="modal-header px-5 position-relative modal-shape-header bg-shape">			  
			<div class="position-relative z-index-1 light">
                  <h4 class="mb-0 text-white">Edit Operator</h4>
                  <p class="fs--1 mb-0 text-white">Silahkan edit data operator</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3 px-4">
				
				<input class="form-control" type="text" id="txtidoperatorE" value="<?php echo $idoperator;?>" style="display:none;"/>
				<div class="mb-3">
                    <label class="form-label" for="txtnmoperatorE">Nama Operator</label>
                    <input class="form-control" type="text" id="txtnmoperatorE" value="<?php echo $nmoperator;?>" maxlength="50" autocomplete="off" style="font-size:13px;"/>
                </div>

				<div class="mb-3">
                    <label class="form-label" for="cboaksesE">Hak Akses</label>
                    <select class="form-select js-choice" size="1" name="cboaksesE" id="cboaksesE" data-options='{"removeItemButton":true,"placeholder":true}' style="font-size:14px;">
						<option value=""></option>
						<?php
							if ($akses == "administrator"){$plhadm = "selected";} else {$plhadm = "";}
							if ($akses == "operator"){$plhopt = "selected";} else {$plhopt = "";}
							echo "<option value='administrator' $plhadm >Administrator</option>";
							echo "<option value='operator' $plhopt >Operator</option>";
						?>	
						<option value="administrator">Administrator</option>
						<option value="operator">Operator</option>
					</select>
				  </div>

            </div>
			<div class="modal-footer">
				<button class="btn btn-sm btn-falcon-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
				<button class="btn btn-sm btn-falcon-primary" type="button" id="cmdSimpanOperatorE">Simpan data</button>
			</div>

<script type="text/javascript" charset="utf-8">
$("#cmdSimpanOperatorE").click(function(){
	var idoperator = $('#txtidoperatorE').val();
	var akses = $('#cboaksesE').val();
	var nmuser = $('#txtnmoperatorE').val();

	if(idoperator.length<=0){alert('Data operator tidak terdeteksi')}
	else if(nmuser.length<=0){$('#txtnmoperatorE').focus();alert('Nama operator masih kosong')}
	else if(akses.length<=0){$('#cboaksesE').focus();alert('Akses masih kosong')}
	else{
	$.ajax({
		type:"POST",
		url:'aksi/operator/aksi_edit.php',
		data:{nmuser:nmuser,akses:akses,idoperator:idoperator},
		dataType: "json",
		beforeSend: function(e) {
			$("#cmdSimpanOperatorE").attr("disabled","disabled");
		},		
		success:function(resp){
			if(resp.msg2 == 'ok'){
				setTimeout(function(){ $('#modEditData').modal('hide');},1000);
				$("#ToastSukses").toast("show");
				isiMasterOperator();
			}else if(resp.msg2 == 'err_val'){
				alert(resp.msg1);
				$("#cmdSimpanOperatorE").removeAttr("disabled");							
			}else {
				alert('Ada sedikit masalah, silakan coba lagi.');
				$("#cmdSimpanOperatorE").removeAttr("disabled");
			}
		},
		error: function() {
			alert('Koneksi bermasalah periksa internet');
			$("#cmdSimpanOperatorE").removeAttr("disabled");
			$(".modal-body").css("opacity", "");},
	});	
	}; 	
});	
</script>	