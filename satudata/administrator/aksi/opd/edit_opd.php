<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idopd= trim($_POST['idopd']);

$qri = ("SELECT nm_opd,kategori FROM m_opd WHERE id_opd='".$idopd."'");
$dbquery = mysqli_query($dbconn,$qri);$c= mysqli_fetch_assoc($dbquery);
$nmopd = $c['nm_opd'];$kategori = strtoupper($c['kategori']);
mysqli_free_result($dbquery);mysqli_close($dbconn);
?>    				
			<div class="modal-header px-4 position-relative modal-shape-header bg-shape">			  
			<div class="position-relative z-index-1 light">
                  <h5 class="mb-0 text-white">Edit OPD</h5>
                  <p class="fs--1 mb-0 text-white">Silahkan edit data OPD</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3 px-4">
				
				<input class="form-control" type="text" id="txtidopdE" value="<?php echo $idopd;?>" style="display:none;"/>

				<div class="form-floating mb-3">
                    <input class="form-control" type="text" id="txtnmopdE" value="<?php echo $nmopd;?>" maxlength="100" autocomplete="off" style="font-size:13px;"/>
					<label class="form-label" for="txtnmopdE">Nama OPD</label>
				</div>

				<div class="form-floating mb-3">
					<select class="form-select form-select-sm js-choice px-3" id="cboKategoriOPDE" size="1" required="required"
						data-options='{"removeItemButton":true,"placeholder":true}'>
						<option value="">Pilih kategori OPD</option>
						<?php
						if ($kategori == "ASISTEN I"){$plhas1 = "selected";}
						if ($kategori == "ASISTEN II"){$plhas2 = "selected";}
						if ($kategori == "ASISTEN III"){$plhas3 = "selected";}
						if ($kategori == "WAKIL BUPATI"){$plhas4 = "selected";}
						if ($kategori == "SEKDA"){$plhas5 = "selected";}
							echo "<option value='WAKIL BUPATI' $plhas4 >WAKIL BUPATI</option>";
							echo "<option value='SEKDA' $plhas5 >SEKDA</option>";
							echo "<option value='ASISTEN I' $plhas1 >ASISTEN I</option>";
							echo "<option value='ASISTEN II' $plhas2 >ASISTEN II</option>";
							echo "<option value='ASISTEN III' $plhas3 >ASISTEN III</option>";
						?>
					</select>
					<label for="cboKategoriOPDE">Kategori OPD</label>
				</div>

            </div>
			<div class="modal-footer justify-content-between">
				<button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
				<button class="btn btn-sm btn-primary" type="button" id="cmdSimpanOPDE">Simpan data</button>
			</div>

<script type="text/javascript" charset="utf-8">
$("#cmdSimpanOPDE").click(function(){
	var idopd = $('#txtidopdE').val();
	var nmopd = $('#txtnmopdE').val();
	var kategori = $('#cboKategoriOPDE').val();

	if(idopd.length<=0){alert('Data OPD tidak terdeteksi')}
	else if(nmopd.length<=0){$('#txtnmopdE').focus();alert('Nama OPD masih kosong')}
	else if(kategori.length<=0){$('#cboKategoriOPDE').focus();alert('Kategori OPD masih kosong')}
	else{
	$.ajax({
		type:"POST",
		url:'aksi/opd/aksi_edit.php',
		data:{nmopd:nmopd,idopd:idopd,kategori:kategori},
		dataType: "json",
		beforeSend: function(e) {
			$("#cmdSimpanOPDE").attr("disabled","disabled");
		},		
		success:function(resp){
			if(resp.msg2 == 'ok'){
				setTimeout(function(){ $('#modEditData').modal('hide');},1000);
				$("#ToastSukses").toast("show");
				isiMasterOPD();
			}else if(resp.msg2 == 'err_val'){
				alert(resp.msg1);
				$("#cmdSimpanOPDE").removeAttr("disabled");							
			}else {
				alert('Ada sedikit masalah, silakan coba lagi.');
				$("#cmdSimpanOPDE").removeAttr("disabled");
			}
		},
		error: function() {
			alert('Koneksi bermasalah periksa internet');
			$("#cmdSimpanOPDE").removeAttr("disabled");
			$(".modal-body").css("opacity", "");},
	});	
	}; 	
});	
</script>	