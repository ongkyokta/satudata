		<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
		    <div class="position-relative z-index-1 light">
		        <h5 class="mb-0 text-white">Tambah Data OPD</h5>
		        <p class="fs--1 mb-0 text-white">Silahkan menambahkan data OPD</p>
		    </div>
		    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
		        aria-label="Close"></button>
		</div>
		<div class="modal-body py-3 px-4">

		    <div class="mb-3">
		        <label class="form-label" for="txtnmopd">Nama OPD</label>
		        <input class="form-control" type="text" id="txtnmopd" maxlength="50" autocomplete="off"
		            style="font-size:13px;" />
		    </div>

		</div>
		<div class="modal-footer justify-content-between">
		    <button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">Batalkan</button>
		    <button class="btn btn-sm btn-primary" type="button" id="cmdSimpanOPD">Simpan data</button>
		</div>

		<script type="text/javascript" charset="utf-8">
$(document).ready(function() {
    $("#txtnmopd").val("");
});

$("#cmdSimpanOPD").click(function() {
    var idinstansi = $('#lblidinstansi').val();
    var nmopd = $('#txtnmopd').val();

    if (nmopd.length <= 0) {
        $('#txtnmopd').focus();
        alert('Nama OPD masih kosong')
    } else {
        $.ajax({
            type: "POST",
            url: 'aksi/opd/aksi_tambah.php',
            data: {
                nmopd: nmopd,
                idinstansi: idinstansi
            },
            dataType: "json",
            beforeSend: function(e) {
                $("#cmdSimpanOPD").attr("disabled", "disabled");
            },
            success: function(resp) {
                if (resp.msg2 == 'ok') {
                    setTimeout(function() {
                        $('#modTambahData').modal('hide');
                    }, 1000);
                    $("#ToastSukses").toast("show");
                    isiMasterOPD();
                } else if (resp.msg2 == 'err_val') {
                    alert(resp.msg1);
                    $("#cmdSimpanOPD").removeAttr("disabled");
                } else {
                    alert('Ada sedikit masalah, silakan coba lagi.');
                    $("#cmdSimpanOPD").removeAttr("disabled");
                }
            },
            error: function() {
                alert('Koneksi bermasalah periksa internet');
                $("#cmdSimpanOPD").removeAttr("disabled");
                $(".modal-body").css("opacity", "");
            },
        });
    };
});
		</script>