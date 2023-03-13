<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die('Could not connect: ');
$kata = trim($_POST['kata']);
?>
<!------------------MODAL PENCARIAN ------------------>
<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
    <div class="position-relative z-index-1 light">
        <h5 class="mb-0 text-white">Pencarian Sekolah</h5>
        <p class="fs--1 mb-0 text-white">Hasil pencarian sekolah dengan keta kunci <?php echo $kata ?></p>
    </div>
    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body py-3">

    <input class="form-control" type="text" id="txtkatapencarian" value="<?php echo $kata ?>" autocomplete="off" style="font-size:13px;display:none;" />

    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <span class="fas fa-camera me-2 ms-2"></span> untuk <strong>non aktifkan upload video dan foto ruangan</strong> sekolah, tombol <span class="fas fa-map-marker-alt me-2 ms-2"></span> untuk <strong>menampilkan posisi sekolah di peta</strong>
                        , <span class="fas fa-book-reader me-2 ms-2"></span> untuk <strong>Menampilkan Detail </strong> sekolah<br />
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="table-responsive scrollbar mb-3">
        <table id="tblcari" class="table table-sm table-striped mb-0 fs--1 w-100">
            <thead class="bg-200">
                <tr>
                    <th class="sort text-center">No</th>
                    <th class="sort">Nama Sekolah</th>
                    <th class="sort">Bentuk</th>
                    <th class="sort text-center">Upload</th>
                    <th class="sort text-center"></th>
                    <th class="sort text-center"></th>
                    <th class="sort text-center"></th>
                </tr>
            </thead>
            <tbody class="bg-white" id="isitblcari"></tbody>
        </table>
    </div>

</div>

<script>
    $(document).ready(function() {
        isiTabelPencarian()
    });

    function isiTabelPencarian() {
        var kata = $('#txtkatapencarian').val();
        $.ajax({
            type: "POST",
            url: "aksi/isi_tabel_pencarian.php",
            data: {
                kata: kata
            },
            dataType: 'json',
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success: function(data) {
                document.body.style.cursor = "default";
                $('#tblcari').dataTable().fnDestroy();
                var html = '';
                var i;
                for (i = 0; i < data.length; i++) {

                    if (data[i].sttsupload == "OFF") {
                        var warnastts = "badge-soft-warning";
                    } else if (data[i].sttsupload == "ON") {
                        var warnastts = "badge-soft-primary";
                    }

                    html +=
                        '<tr class="btn-reveal-trigger">' +
                        '<td class="align-middle text-center" width="5%">' + data[i].no + '</td>' +
                        '<td class="align-middle" width="65%">' + data[i].nmtempat + '</td>' +
                        '<td class="align-middle" width="10%">' + data[i].bentukpendidikan + '</td>' +
                        '<td class="align-middle text-center" width="8%"><span class="badge ' + warnastts + '">' + data[i].sttsupload + '</span></td>' +
                        '<td class="align-middle text-center" width="4%">' +
                            '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnModeUploadCari" data-idsekolah="' + data[i].idtempat + '" data-nmsekolah="' + data[i].nmtempat + '" data-status="' + data[i].sttsupload + '" data-bs-toggle="tooltip" title="Mode upload"><span class="fa fa-camera"></span></button>' +
                        '</td>' +
                        '<td class="align-middle text-center" width="4%">' +
                            '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnViewMapCari" data-nmobyek="' + data[i].nmtempat + '" data-alamat="' + data[i].alamat + '" data-bentukpendidikan="' + data[i].bentukpendidikan + '" data-koordinat="' + data[i].koordinat + '" data-bs-toggle="tooltip" title="Tampilkan map"><span class="fas fa-map-marker-alt"></span></button>' +
                        '</td>' +
                        '<td class="align-middle text-center" width="4%">' +
                            '<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnViewDetailCari" data-id="' + data[i].idtempat + '" data-koordinat="' + data[i].koordinat + '" data-bs-toggle="tooltip" title="Detail sekolah"><span class="fas fa-book-reader"></span></button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#isitblcari').html(html);
                $("#tblcari").dataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "info": false,
                    "autoWidth": false,
                    "responsive": false,
                    "select": false,
                    "scrollX": false,
                    initComplete: function() {
                        $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
                    },
                    "searching": true,
                });
                $("#loading").fadeOut("slow");

            },
            error: function() {
                $("#loading").fadeOut("slow");
                alert("Koneksi bermasalah periksa internet");
                document.body.style.cursor = "default";
            },
        });
    }

    $('#isitblcari').on('click', '.btnModeUploadCari', function() {
       
        var idsekolah = $(this).data('idsekolah');var nmsekolah = $(this).data('nmsekolah');
        var status = $(this).data('status');
        if (status == "ON"){
            var ubahstts = "OFF";
        } else if (status == "OFF"){
            var ubahstts = "ON";
        }
        let text = "Yakin Anda merubah status upload file\n"+nmsekolah+"\n\nStatus "+status+" Menjadi "+ubahstts;
        if (confirm(text) == true) {
        $.ajax({
            type:"POST",		
            url :"aksi/status-server/aksi_ubah_status_sekolah.php",	
            data:{idsekolah:idsekolah,ubahstts:ubahstts},
            dataType : 'json',
            success:function(data){
               
                if (data.msg2 == "ok"){
                    isiTabelPencarian()	
                } else if (data.msg2 == "err"){
                    alert('Proses perubahan status gagal\nUlangi sekali lagi');	
                }
            },
            error: function() {alert('Koneksi bermasalah periksa internet');},
        });
        }  
    });

    $('#isitblcari').on('click', '.btnViewMapCari', function() {
        const koordinat = $(this).data('koordinat');
        var nmobyek = $(this).data('nmobyek');
        var alamat = $(this).data('alamat');
        var bentukpendidikan = $(this).data('bentukpendidikan');

        window.scrollTo(0, 0);
        setTimeout(function() {
            $('#modTambahDataLarge').modal('hide');
        }, 1000);
        const words1 = koordinat.split(',');

        map.setView([words1[0], words1[1]], 18);
        //var marker = L.marker([words1[0], words1[1]], {}).openPopup()
        //map.openPopup(words1[0], words1[1]);
        //layer.openPopup();
        //marker.openPopup();
    });

    $('#isitblcari').on('click', '.btnViewDetailCari', function() {
        $("#txttransiddetailsekolah").val("");
        var idsekolah = $(this).data('id');
        $("#txttransiddetailsekolah").val(idsekolah);

        window.scrollTo(0, 0);
        const koordinat = $(this).data('koordinat');
        const words1 = koordinat.split(',');
        map.setView([words1[0], words1[1]], 18);

        $.ajax({
            type: 'POST',
            url: "aksi/tampilkan/tampilkan-detail-dashboard.php",
            data: {
                idsekolah: idsekolah
            },
            beforeSend: function(e) {
                $("#loading").fadeIn();
                document.body.style.cursor = "wait";
            },
            success: function(resp) {
                $("#loading").fadeOut("slow");
                document.body.style.cursor = "default";
                $("#area-halaman-utama").fadeOut("slow");
                $("#area-halaman-operator").fadeOut("slow");
                $("#area-halaman-sekolah").fadeIn();
                $("#area-peta").fadeIn();

                $('#hal-detail-sekolah').html(resp);

                //let player = Plyr.setup('.popin__video-container');
                //player.restart();
                isiVideo()

                isiFotoKelas()
                isiFotoPerpustakaan()
                isiFotoKepsek()
                isiFotoGuru()
                isiFotoPembinaan()
                isiFotoMultimedia()
                isiFotoKomputer()
                isiFotoIPS()
                isiFotoIPA()
                isiFotoBahasa()
                isiFotoWCUmum()
                isiFotoWCSiswa()
                isiFotoWCGuru()
                isiFotoIbadah()
                isiFotoAsrama()

                $("#modTambahDataLarge").modal('hide');
            },
            error: function() {
                $("#loading").fadeOut("slow");
                document.body.style.cursor = "default";
                alert("Koneksi ke server terputus");
            },
        });
    });
</script>