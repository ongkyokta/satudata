<?php
error_reporting(0);
require_once '../../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$idinstansi= trim($_POST['idinstansi']);

$qri = ("SELECT nm_instansi,alamat,kota,email,telepon FROM m_instansi WHERE id_instansi='".$idinstansi."'");
$dbquery = mysqli_query($dbconn,$qri);$c= mysqli_fetch_assoc($dbquery);
$nminstansi = strtoupper($c['nm_instansi']);
$alamat = $c['alamat'];$kota = strtoupper($c['kota']);$email = $c['email'];$telepon = $c['telepon'];
mysqli_free_result($dbquery);mysqli_close($dbconn);
?>    				
			<div class="modal-header px-4 position-relative modal-shape-header bg-shape">			  
			<div class="position-relative z-index-1 light">
                  <h5 class="mb-0 text-white">Edit Data Instansi</h5>
                  <p class="fs--1 mb-0 text-white">Silahkan edit data instansi</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3 px-4">
				
			<input class="form-control" type="text" id="txtidinstansiE" value="<?php echo $idinstansi;?>" style="display:none;"/>

			<div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtnminstansiE" value="<?php echo $nminstansi;?>"
		            placeholder="Nama instansi" maxlength="100" autocomplete="off">
		        <label for="txtnminstansiE">Nama Instansi</label>
		    </div>

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtalamatinstansiE" value="<?php echo $alamat;?>"
		            placeholder="Alamat Lengkap" maxlength="150" autocomplete="off">
		        <label for="txtalamatinstansiE">Alamat Lengkap</label>
		    </div>

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtkotainstansiE" value="<?php echo $kota;?>"
		            placeholder="Kota" maxlength="50" autocomplete="off">
		        <label for="txtkotainstansiE">Kota</label>
		    </div>

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtemailinstansiE" value="<?php echo $email;?>"
		            placeholder="Email" maxlength="100" autocomplete="off">
		        <label for="txtemailinstansiE">Email</label>
		    </div>

			<div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txttelpinstansiE" value="<?php echo $telepon;?>"
		            placeholder="Telepon" maxlength="15" autocomplete="off">
		        <label for="txttelpinstansiE">Telepon</label>
		    </div>

            </div>
			<div class="modal-footer justify-content-between">
				<button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
				<button class="btn btn-sm btn-primary" type="button" id="cmdSimpanInstansiE">Simpan data</button>
			</div>

<script type="text/javascript" charset="utf-8">
$("#cmdSimpanInstansiE").click(function(){
	var idinstansi = $('#txtidinstansiE').val();
    var nminstansi = $('#txtnminstansiE').val();
    var alamat = $('#txtalamatinstansiE').val();
    var kota = $('#txtkotainstansiE').val();
    var email = $('#txtemailinstansiE').val();
	var telepon = $('#txttelpinstansiE').val();

    if (nminstansi.length <= 0) {$('#txtnminstansiE').focus();alert('Nama instansi masih kosong')}
    else if (alamat.length <= 0) {$('#txtalamatinstansiE').focus();alert('Alamat instansi masih kosong')}
    else if (kota.length <= 0) {$('#txtkotainstansiE').focus();alert('Kota instansi masih kosong')}
    else if (email.length <= 0) {$('#txtemailinstansiE').focus();alert('Email instansi masih kosong')}
	else if (telepon.length <= 0) {$('#txttelpinstansiE').focus();alert('Telepon instansi masih kosong')}
    else {
        $.ajax({
        type: "POST",
        url: 'aksi/instansi/aksi_edit.php',
        data: {idinstansi: idinstansi,nminstansi: nminstansi,alamat: alamat,kota: kota,email: email,telepon: telepon},
		dataType: "json",
		beforeSend: function(e) {
			$("#cmdSimpanInstansiE").attr("disabled","disabled");
		},		
		success:function(resp){
			if(resp.msg2 == 'ok'){
				setTimeout(function(){ $('#modEditData').modal('hide');},1000);
				$("#ToastSukses").toast("show");
				isiMasterInstansi();
			}else if(resp.msg2 == 'err_val'){
				alert(resp.msg1);
				$("#cmdSimpanInstansiE").removeAttr("disabled");							
			}else {
				alert('Ada sedikit masalah, silakan coba lagi.');
				$("#cmdSimpanInstansiE").removeAttr("disabled");
			}
		},
		error: function() {
			alert('Koneksi bermasalah periksa internet');
			$("#cmdSimpanInstansiE").removeAttr("disabled");
			$(".modal-body").css("opacity", "");},
	});	
	}; 	
});	
</script>	