<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
    <div class="position-relative z-index-1 light">
        <h5 class="mb-0 text-white">Import Data</h5>
        <p class="fs--1 mb-0 text-white">Silahkan import /upload data (excel *.xlsx)</p>
    </div>
    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
        aria-label="Close"></button>
</div>
<div class="modal-body bg-light py-3 px-4">

    <label for="btnUploadSurat">Upload File Excel</label>
    <div class="form-floating">
        <input class="form-control form-control-sm px-4" id="btnUploadSurat" type="file" accept=".xlsx" />
    </div>

</div>
<div class="modal-footer justify-content-between">
    <button class="btn btn-sm btn-danger" type="button" id="cmdbatalSurat" data-bs-dismiss="modal">Batalkan</button>
    <button class="btn btn-sm btn-primary" type="button" id="cmdsimpanSurat">Import data</button>
</div>

<script type="text/javascript" charset="utf-8">
$(document).ready(function() {
    $("#btnUploadSurat").val('');
});

$('#btnUploadSurat').bind('change', function() {
    var extensinya = $('#btnUploadSurat').val().toLowerCase();
    var regex = new RegExp("(.*?)\.(xlsx)$");
    if (!(regex.test(extensinya))) {
        alert("File upload harus file documen excel");
        $('#btnUploadSurat').val(null);
    }
});

$("#cmdsimpanSurat").click(function() {
    var idinstansi = $('#lblidinstansi').val();
    var nmfile = $('#btnUploadSurat').val();

    var data = new FormData();
    data.append('upSurat', $("#btnUploadSurat")[0].files[0]);
    data.append('idinstansi', idinstansi);

    if (nmfile.length <= 0) {
        $('#btnUploadSurat').focus();
        alert('File import masih kosong')
    } else {
        $.ajax({
            type: "POST",
            url: 'aksi/sinkronisasi/aksi_import.php',
            data: data,
            dataType: "json",
            processData: false,
            contentType: false,
            beforeSend: function(e) {
                $("#cmdsimpanSurat").attr("disabled", "disabled");
                $("#cmdbatalSurat").attr("disabled", "disabled");
            },
            success: function(resp) {
                    setTimeout(function() {
                        $('#modTambahData').modal('hide');
                    }, 1000);
                    //$("#ToastSukses").toast("show");
                    alert("Proses upload file data berhasil");
            },
            error: function() {
                alert('Koneksi bermasalah periksa internet');
                $("#cmdsimpanSurat").removeAttr("disabled");
                $("#cmdbatalSurat").removeAttr("disabled");
                $(".modal-body").css("opacity", "");
            },
        });
    };
});
</script>