<?php
error_reporting(0);
include '../../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$ketwilayah= trim($_POST['ketwilayah']);$idwilayah= trim($_POST['idwilayah']);$nmwilayah= trim($_POST['nmwilayah']);
if ($ketwilayah=="kota"){$namawilayah = "Kabupaten Jember";}
else if ($ketwilayah=="kecamatan"){$namawilayah = "Kecamatan ".$nmwilayah;}
else if ($ketwilayah=="desa"){$namawilayah ="Desa ". $nmwilayah;}
?>
<!------------------MODAL PENCARIAN ------------------>
<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
    <div class="position-relative z-index-1 light">
        <h5 class="mb-0 text-white">Sekolah Kondisi Rusak Ringan</h5>
        <p class="fs--1 mb-0 text-white">Data Sekolah Sarana dan Ruang Kondisi Rusak Ringan <?php echo $namawilayah ?></p>
    </div>
    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
        aria-label="Close"></button>
</div>
<div class="modal-body py-3">

    <div class="table-responsive scrollbar mb-3">
        <table id="tabel-total-ringan" class="table table-sm table-striped mb-0 fs--1 w-100">
            <thead class="bg-200">
                <tr>
                    <th class="sort text-center">No</th>
                    <th class="sort">Nama Sekolah</th>
                    <th class="sort">Bentuk</th>
                    <th class="sort">Siswa</th>
                    <th class="sort">Guru</th>
                    <th class="sort">Map</th>
                    <th class="sort">Detail</th>
                </tr>
            </thead>
            <tbody class="bg-white" id="list-tabel-total-ringan">

                <?php
if ($ketwilayah == "kota"){
    $sqlx = ("SELECT id,nama,alamat_jalan,guru,siswa,bentuk_pendidikan,lintang,bujur
      FROM tbl_api_dispendik
      WHERE 
      asrama_siswa_rusak_ringan>0
		OR tempat_ibadah_rusak_ringan>0
		OR wc_guru_rusak_ringan>0
		OR wc_siswa_rusak_ringan>0
		OR wc_umum_rusak_ringan>0
		OR laboratorium_bahasa_rusak_ringan>0
		OR laboratorium_ipa_rusak_ringan>0
		OR laboratorium_ips_rusak_ringan>0
		OR laboratorium_komputer_rusak_ringan>0
		OR laboratorium_multimedia_rusak_ringan>0
		OR ruang_bina_rusak_ringan>0
		OR ruang_guru_rusak_ringan>0
		OR ruang_kepala_sekolah_rusak_ringan>0
		OR ruang_perpustakaan_rusak_ringan>0
		OR ruang_kelas_rusak_ringan>0");
} else if ($ketwilayah == "kecamatan"){
    $sqlx = ("SELECT id,nama,alamat_jalan,guru,siswa,bentuk_pendidikan,lintang,bujur
      FROM tbl_api_dispendik
      WHERE asrama_siswa_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR tempat_ibadah_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR wc_guru_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR wc_siswa_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR wc_umum_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR laboratorium_bahasa_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR laboratorium_ipa_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR laboratorium_ips_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR laboratorium_komputer_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR laboratorium_multimedia_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR ruang_bina_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR ruang_guru_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR ruang_kepala_sekolah_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR ruang_perpustakaan_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'
		OR ruang_kelas_rusak_ringan>0 AND id_kecamatan = '".$idwilayah."'");
} else if ($ketwilayah == "desa"){
    $sqlx = ("SELECT id,nama,alamat_jalan,guru,siswa,bentuk_pendidikan,lintang,bujur
      FROM tbl_api_dispendik
      WHERE 
      asrama_siswa_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR tempat_ibadah_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR wc_guru_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR wc_siswa_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR wc_umum_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR laboratorium_bahasa_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR laboratorium_ipa_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR laboratorium_ips_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR laboratorium_komputer_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR laboratorium_multimedia_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR ruang_bina_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR ruang_guru_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR ruang_kepala_sekolah_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR ruang_perpustakaan_rusak_ringan>0 AND id_desa = '".$idwilayah."'
		OR ruang_kelas_rusak_ringan>0
        AND id_desa = '".$idwilayah."'");
}

$result = mysqli_query($dbconn,$sqlx);
$no=0;
while($sm=mysqli_fetch_array($result)){
	$no++;
	$idtempat = $sm['id'];$nmtempat = $sm['nama'];$koordinat = $sm['lintang'].",".$sm['bujur'];
    $alamat = $sm['alamat_jalan'];$bentukpendidikan = $sm['bentuk_pendidikan'];
    $guru = $sm['guru']; $siswa = $sm['siswa'];

	echo"				<tr>
                        <td class='align-middle text-center' width='5%'>$no</td>
						<td class='align-middle' width='55%'>$nmtempat</td>
                        <td class='align-middle text-center' width='10%'>$bentukpendidikan</td>
                        <td class='align-middle text-center' width='10%'>$siswa</td>
                        <td class='align-middle text-center' width='10%'>$guru</td>
                        <td class='align-middle text-center' width='5%'>
                            <button class='btn btn-light btn-sm btnTampilMapCari' data-nmsekolah='$nmtempat' data-alamat='$alamat' data-bentukpendidikan='$bentukpendidikan' data-koordinat='$koordinat'><span class='fas fa-map-marker-alt'></span></button>
                        </td>
                        <td class='align-middle text-center' width='5%'>
                            <button class='btn btn-light btn-sm btnTampilDetailCari' data-id='$idtempat'><span class='fas fa-book-reader'></span></button>
                        </td>
					</tr>";		
}mysqli_free_result($result);
mysqli_close($dbconn);
?>


            </tbody>
        </table>
    </div>

</div>

<script>
$(document).ready(function() {

    var dataTable = $("#tabel-total-ringan").dataTable({
        "paging": true,
        "pagingType": 'first_last_numbers',
        "lengthChange": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "responsive": true,
        "select": false,
        "scrollX": false,
        initComplete: function() {
            $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr(
                'autocomplete', 'off');
        },
        "searching": true,
        language: {
            'paginate': {
                'previous': '<<',
                'next': '>>'
            }
        }
    });
});

$('#list-tabel-total-ringan').on('click', '.btnTampilMapCari', function() {
    const koordinat = $(this).data('koordinat');
    var nmsekolah = $(this).data('nmsekolah');
    var alamat = $(this).data('alamat');
    var bentukpendidikan = $(this).data('bentukpendidikan');

    window.scrollTo(0, 0);
    setTimeout(function() {
        $('#modEditDataLarge').modal('hide');
    }, 1000);
    const words1 = koordinat.split(',');

    map.setView([words1[0], words1[1]], 18);
    //var marker = L.marker([words1[0], words1[1]], {}).openPopup()
    //map.openPopup(words1[0], words1[1]);
    //layer.openPopup();
    //marker.openPopup();
});

$('#list-tabel-total-ringan').on('click', '.btnTampilDetailCari', function() {
    var idsekolah = $(this).data('id');
    $.ajax({
        type: 'POST',
        url: "aksi/tampilkan/tampilkan-detail.php",
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
            $("#isianModdetailLarge").html(resp);
            $("#isianModdetailLarge").fadeIn(1000);
            $("#modDetailLarge").modal('show');
        },
        error: function() {
            $("#loading").fadeOut("slow");
            document.body.style.cursor = "default";
            alert("Koneksi ke server terputus");
        },
    });
});
</script>