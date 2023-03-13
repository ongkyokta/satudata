		<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
		    <div class="position-relative z-index-1 light">
		        <h5 class="mb-0 text-white">Tambah Data Instansi</h5>
		        <p class="fs--1 mb-0 text-white">Silahkan menambahkan data instansi</p>
		    </div>
		    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
		        aria-label="Close"></button>
		</div>
		<div class="modal-body py-3 px-4">

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtnminstansi" value=""
		            placeholder="Nama instansi" maxlength="100" autocomplete="off">
		        <label for="txtnminstansi">Nama Instansi</label>
		    </div>

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtalamatinstansi" value=""
		            placeholder="Alamat Lengkap" maxlength="150" autocomplete="off">
		        <label for="txtalamatinstansi">Alamat Lengkap</label>
		    </div>

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtkotainstansi" value="" placeholder="Kota"
		            maxlength="50" autocomplete="off">
		        <label for="txtkotainstansi">Kota</label>
		    </div>

		    <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txtemailinstansi" value="" placeholder="Email"
		            maxlength="100" autocomplete="off">
		        <label for="txtemailinstansi">Email</label>
		    </div>

            <div class="form-floating mb-3">
		        <input type="text" class="form-control form-control-sm" id="txttelpinstansi" value="" placeholder="Telepon"
		            maxlength="15" autocomplete="off">
		        <label for="txttelpinstansi">Telepon</label>
		    </div>

		</div>
		<div class="modal-footer justify-content-between">
		    <button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
		    <button class="btn btn-sm btn-primary" type="button" id="cmdSimpanInstansi">Simpan data</button>
		</div>

		<script type="text/javascript" charset="utf-8">
$(document).ready(function() {
    $("#txtnminstansi").val("");
    $("#txtalamatinstansi").val("");
    $("#txtkotainstansi").val("");
    $("#txtemailinstansi").val("");
    $("#txttelpinstansi").val("");
});

$("#cmdSimpanInstansi").click(function() {
    var nminstansi = $('#txtnminstansi').val();
    var alamat = $('#txtalamatinstansi').val();
    var kota = $('#txtkotainstansi').val();
    var email = $('#txtemailinstansi').val();
    var telepon = $('#txttelpinstansi').val();

    if (nminstansi.length <= 0) {
        $('#txtnminstansi').focus();
        alert('Nama instansi masih kosong')
    } else if (alamat.length <= 0) {
        $('#txtalamatinstansi').focus();
        alert('Alamat instansi masih kosong')
    } else if (kota.length <= 0) {
        $('#txtkotainstansi').focus();
        alert('Kota instansi masih kosong')
    } else if (email.length <= 0) {
        $('#txtemailinstansi').focus();
        alert('Email instansi masih kosong')
    } else if (telepon.length <= 0) {
        $('#txttelpinstansi').focus();
        alert('Telepon instansi masih kosong')
    } else {
        $.ajax({
            type: "POST",
            url: "aksi/instansi/aksi_tambah.php",
            data: {
                nminstansi: nminstansi,
                alamat: alamat,
                kota: kota,
                email: email, telepon: telepon
            },
            dataType: "json",
            beforeSend: function(e) {
                $("#cmdSimpanInstansi").attr("disabled", "disabled");
            },
            success: function(resp) {
                if (resp.msg2 == 'ok') {
                    setTimeout(function() {
                        $('#modTambahData').modal('hide');
                    }, 1000);
                    $("#ToastSukses").toast("show");
                    isiMasterInstansi();
                } else if (resp.msg2 == 'err_val') {
                    alert(resp.msg1);
                    $("#cmdSimpanInstansi").removeAttr("disabled");
                } else {
                    alert('Ada sedikit masalah, silakan coba lagi.');
                    $("#cmdSimpanInstansi").removeAttr("disabled");
                }
            },
            error: function() {
                alert('Koneksi bermasalah periksa internet');
                $("#cmdSimpanInstansi").removeAttr("disabled");
                $(".modal-body").css("opacity", "");
            },
        });
    };
});
		</script>