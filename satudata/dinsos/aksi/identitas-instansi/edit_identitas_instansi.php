<?php
error_reporting(0);
require_once '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idinstansi = trim($_POST['idinstansi']);
$sqlins = ("SELECT nm_instansi,alamat,kota,email,telepon,koordinat FROM m_instansi WHERE id_instansi='".$idinstansi."'");
$restps = mysqli_query($dbconn,$sqlins);$sm= mysqli_fetch_assoc($restps);
$nminstansi = $sm['nm_instansi'];
$alamat = $sm['alamat'];$kota = $sm['kota'];$email = $sm['email'];$telepon = $sm['telepon'];
$koordinat = $sm['koordinat'];
mysqli_free_result($restps);mysqli_close($dbconn);
?>      

			<div class="modal-header px-5 position-relative modal-shape-header bg-shape">
                <div class="position-relative z-index-1 light">
                  <h4 class="mb-0 text-white">Identitas Instansi</h4>
                  <p class="fs--1 mb-0 text-white">Silahkan mengubah data identitas instansi</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body py-3 px-4">
   
				  <div class="mb-3">
                    <label class="form-label" for="txtnmskpd">Nama Instansi</label>
                    <input class="form-control" type="text" id="txtnmskpd" value="<?php echo $nminstansi?>" maxlength="100" autocomplete="off" style="font-size:13px;"/>
                  </div>

                  <div class="mb-3">
                    <label class="form-label" for="txtalamatskpd">Alamat Lengkap</label>
                    <input class="form-control" type="text" id="txtalamatskpd" value="<?php echo $alamat?>" maxlength="150" autocomplete="off" style="font-size:13px;"/>
                  </div>
				  <div class="mb-3">
                    <label class="form-label" for="txtkotaskpd">Kota</label>
                    <input class="form-control" type="text" id="txtkotaskpd" value="<?php echo $kota?>" maxlength="50" autocomplete="off" style="font-size:13px;"/>
                  </div>
				  <div class="mb-3">
                    <label class="form-label" for="txtteleponskpd">No. Telepon</label>
                    <input class="form-control" type="text" id="txtteleponskpd" value="<?php echo $telepon?>" maxlength="25" autocomplete="off" style="font-size:13px;"/>
                  </div>
				  <div class="mb-3">
                    <label class="form-label" for="txtemailskpd">Email</label>
                    <input class="form-control" type="text" id="txtemailskpd" value="<?php echo $email?>" maxlength="100" autocomplete="off" style="font-size:13px;"/>
                  </div>

				  <div class="mb-3">
					<label class="form-label" for="txtkoordinatinstansi"><a href="https://www.google.co.id/maps" target="_blank">Koordinat Lokasi</a></label>
                    <input class="form-control" type="text" id="txtkoordinatinstansi"  value="<?php echo $koordinat;?>" style="font-size:13px;"/>
                  </div>

              </div>
			  <div class="modal-footer">
				<button class="btn btn-sm btn-falcon-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
				<button class="btn btn-sm btn-falcon-primary" type="button" id="cmdSimpanIdentitasSKPD">Simpan data</button>
			  </div>

<script type="text/javascript" charset="utf-8">
$(document).ready(function(){
	$("#txtnmskpd").focus();
});

$("#cmdSimpanIdentitasSKPD").click(function(){
	var idinstansi=$('#lblidinstansi').val();
	var nmskpd = $('#txtnmskpd').val();
	var alamat = $('#txtalamatskpd').val();
	var kota = $('#txtkotaskpd').val();
	var telepon = $('#txtteleponskpd').val();
	var email = $('#txtemailskpd').val();
	var koordinat = $('#txtkoordinatinstansi').val();

	var data = new FormData();
	data.append('idinstansi', idinstansi);
	data.append('nmskpd', nmskpd);
	data.append('alamat', alamat);data.append('kota', kota);
	data.append('telepon', telepon);data.append('email', email);
	data.append('koordinat', koordinat);

	if(nmskpd.length<=0){$('#txtnmskpd').focus();alert('Nama instansi SKPD masih kosong')}
	else if(alamat.length<=0){$('#txtalamatskpd').focus();alert('Alamat masih kosong')}
	else if(kota.length<=0){$('#txtkotaskpd').focus();alert('Kota masih kosong')}
	else if(telepon.length<=0){$('#txtteleponskpd').focus();alert('Telepon masih kosong')}
	else if(email.length<=0){$('#txtemailskpd').focus();alert('Email masih kosong')}
	else if(koordinat.length<=0){$('#txtkoordinatinstansi').focus();alert('Koordinat masih kosong')}
	else{
	$.ajax({
		type:"POST",
		url:'aksi/identitas-instansi/aksi_edit_instansi.php',
		data:data,
		dataType: "json",
		processData: false,
		contentType: false,
		beforeSend: function(e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
			//$("#ToastSukses").hide();
			$("#cmdSimpanIdentitasSKPD").attr("disabled","disabled");
		},			
		success:function(resp){
			document.body.style.cursor = "default";
			if(resp.msg2 == 'ok'){
				$("#loading").fadeOut("slow");
				$("#cmdSimpanIdentitasSKPD").removeAttr("disabled");	
				$("#ToastSukses").toast("show");			
				setTimeout(function(){ $('#modEditData').modal('hide'); },1000);		
			}else if(resp.msg2 == 'err_val'){
				$("#loading").fadeOut("slow");
				alert(resp.msg1);
				$("#cmdSimpanIdentitasSKPD").removeAttr("disabled");
			}else {
				$("#loading").fadeOut("slow");
				alert('Ada sedikit masalah, silakan coba lagi.');
				$("#cmdSimpanIdentitasSKPD").removeAttr("disabled");
			}
		},
		error: function() {
			document.body.style.cursor = "default";$("#loading").fadeOut("slow");
			alert('Koneksi bermasalah periksa internet');
			$("#cmdSimpanIdentitasSKPD").removeAttr("disabled");
			$(".modal-body").css("opacity", "");},
	});	
	}; 	
});	
</script>	