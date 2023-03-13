<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$kata= trim($_POST['kata']);
?>
<!------------------MODAL PENCARIAN ------------------>
<div class="modal-header px-5 position-relative modal-shape-header bg-shape">
                <div class="position-relative z-index-1 light">
                  <h5 class="mb-0 text-white">Pencarian Lokasi Sekolah</h5>
                  <p class="fs--1 mb-0 text-white">Silahkan cari untuk melihat data sekolah</p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body py-3">

                                    <div class="table-responsive scrollbar mb-3">
                                        <table id="data_nama"
                                            class="table table-sm table-striped mb-0 fs--1 w-100">
                                            <thead class="bg-200">
                                                <tr>
                                                    <th class="sort text-center">No</th>
                                                    <th class="sort">Nama Sekolah</th>
                                                    <th class="sort">Bentuk</th>
                                                    <th class="sort">Siswa</th>
                                                    <th class="sort">Guru</th>
                                                    <th class="sort"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white" id="list-pencarian">

                                            <?php
$sqlx = ("SELECT id,nama,alamat_jalan,guru,siswa,bentuk_pendidikan,lintang,bujur
      FROM tbl_api_dispendik
      WHERE nama like '%".$kata."%' OR kecamatan like '%".$kata."%' OR desa_kelurahan like '%".$kata."%' OR bentuk_pendidikan like '%".$kata."%'");
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
                        <td class='align-middle text-center' width='10%'>
                        <button class='btn btn-light btn-sm btnViewMapCari' data-nmobyek='$nmtempat' data-alamat='$alamat' data-bentukpendidikan='$bentukpendidikan' data-koordinat='$koordinat'><span class='fas fa-map-marker-alt'></span></button>
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
    
    var dataTable = $("#data_nama").dataTable({
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
                        $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
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

$('#list-pencarian').on('click', '.btnViewMapCari', function() {
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
</script>