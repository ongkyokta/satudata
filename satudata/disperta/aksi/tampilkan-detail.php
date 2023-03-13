<?php
error_reporting(0);
include '../services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 

$idkomoditas= trim($_POST['idkomoditas']);$nmkomoditas= trim($_POST['nmkomoditas']);
?>
<div class="modal-header px-4 position-relative modal-shape-header bg-shape">
    <div class="position-relative z-index-1 light">
        <h5 class="mb-0 text-white">Komoditas <?php echo $nmkomoditas ?></h5>
        <p class="fs--1 mb-0 text-white">Data Wilayah Sentra Komoditas <?php echo $nmkomoditas ?></p>
    </div>
    <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal"
        aria-label="Close"></button>
</div>
<div class="modal-body py-3">

    <div class="table-responsive scrollbar mb-3">
        <table id="tabel-total-sekolah" class="table table-sm table-striped mb-0 fs--1 w-100">
            <thead class="bg-200">
                <tr>
                    <th class="sort text-center">No</th>
                    <th class="sort">Wilayah Kecamatan</th>
                    <th class="sort">Tanam (Ha)</th>
                    <th class="sort">Panen (Ha)</th>
                    <th class="sort">Hasil (Ton)</th>
                </tr>
            </thead>
            <tbody class="bg-white" id="list-tabel-total-sekolah">

                <?php
$sqlx = ("SELECT DISTINCT nm_kecamatan FROM tbl_api_disperta WHERE id_komoditas='".$idkomoditas."'");
$result = mysqli_query($dbconn,$sqlx);
$no=0;
while($sm=mysqli_fetch_array($result)){
	$no++;
	$nmkecamatan = $sm['nm_kecamatan'];

    $sqlx2 = ("SELECT SUM(luas_tanam) AS jumtanam,SUM(luas_panen) AS jumpanen,SUM(hasil) AS jumhasil FROM tbl_api_disperta 
            WHERE id_komoditas='".$idkomoditas."' AND nm_kecamatan='".$nmkecamatan."'");
    $result2 = mysqli_query($dbconn,$sqlx2);$c= mysqli_fetch_assoc($result2);
    $luastanam = number_format($c['jumtanam'],0,",",".");
    $luaspanen = number_format($c['jumpanen'],0,",",".");
    $hasil = number_format($c['jumhasil'],0,",",".");

	echo"				<tr>
                        <td class='align-middle text-center' width='5%'>$no</td>
						<td class='align-middle' width='65%'>$nmkecamatan</td>
                        <td class='align-middle text-center' width='10%'>$luastanam</td>
                        <td class='align-middle text-center' width='10%'>$luaspanen</td>
                        <td class='align-middle text-center' width='10%'>$hasil</td>
					</tr>";		
}mysqli_free_result($result);mysqli_free_result($result2);
mysqli_close($dbconn);
?>


            </tbody>
        </table>
    </div>

</div>

<script>
$(document).ready(function() {

    var dataTable = $("#tabel-total-sekolah").dataTable({
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

</script>