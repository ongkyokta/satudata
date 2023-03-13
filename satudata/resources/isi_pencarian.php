<?php
error_reporting(0);
include '../operator/services/config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$kata= trim($_POST['kata']);
?>
<!------------------MODAL PENCARIAN ------------------>
<div class="modal-header">
    <h5 class="modal-title" id="searchModalLabel">
        Hasil Pencarian Lokasi
    </h5>
    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</div>
<div class="modal-body">
    <a class="card small-card glightbox2 mb-3" href="./assets/img/background.jpg"
        data-glightbox="title:nama objek wisata; description: deskripsi objek wisata" style="display:none">
        <img class="dashboard-img" src="./assets/img/background.jpg" alt="" />
    </a>
    <div class="card mb-3">
        <div class="card-body">
            <div class="datatable table-responsive">
                <table class="table table-striped table-bordered table-sm" id="data_nama" cellspacing="0">
                    <thead>
                        <tr>
                            <th style="color:#fff">
                                <center>Hasil Pencarian</center>
                            </th>
                            <th style="color:#fff">
                                <center>View</center>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-dark" id="list-pencarian">
                        <?php
$sqlx = ("SELECT p.id_tempat,p.nm_tempat,p.alamat,p.diskripsi,p.koordinat,p.id_jenis
      FROM m_tempat p
      WHERE p.nm_tempat like '%".$kata."%'");
$result = mysqli_query($dbconn,$sqlx);
$no=0;
while($sm=mysqli_fetch_array($result)){
	$no++;
	$idtempat = $sm['id_tempat'];$nmtempat = ucwords(strtolower($sm['nm_tempat']));$koordinat = $sm['koordinat'];
    $alamat = $sm['alamat'];$diskripsi = $sm['diskripsi'];
    $idjenis = $sm['id_jenis'];
    if ($idjenis == "1"){$jenisfoto = "wisata";}
    else if ($idjenis == "2"){$jenisfoto = "hotel";}
    else if ($idjenis == "3"){$jenisfoto = "resto";}
    else if ($idjenis == "4"){$jenisfoto = "travel";}

	echo"				<tr>
						<td style='vertical-align:middle;' width='80%'>$nmtempat</td>
                        <td style='vertical-align:middle;' width='20%'>
                        <button class='btn btn-light btn-xs btnViewMapCari' data-nmobyek='$nmtempat' data-alamat='$alamat' data-diskripsi='$diskripsi' data-koordinat='$koordinat'><span class='fas fa-map-marker-alt'></span></button>                  
                        <a class='btn btn-light btn-xs glightbox2' href='operator/data-foto/$jenisfoto/$idtempat/$idtempat.jpg'
                            data-glightbox='title:$nmtempat; description: $diskripsi'>       
                            <img class='dashboard-img' src='operator/data-foto/$jenisfoto/$idtempat/$idtempat.jpg' alt='' style='display:none'/>
                            <span class='fas fa-image'></span>
                        </a>
                        </td>
					</tr>";		
}mysqli_free_result($result);
mysqli_close($dbconn);
?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
$(document).ready(function() {

    var dataTable = $("#data_nama").DataTable({
        lengthChange: false,
        paging: true,
        ordering: true,
        info: false,
        searching: true,
    });

    var lightboxDescription = GLightbox({
        selector: ".glightbox2",
    });
    $("#txtcarilokasi").val("");
});

$('#list-pencarian').on('click', '.btnViewMapCari', function() {
    const koordinat = $(this).data('koordinat');
    var nmobyek = $(this).data('nmobyek');
    var alamat = $(this).data('alamat');
    var diskripsi = $(this).data('diskripsi');

    window.scrollTo(0, 0);
    setTimeout(function() {
        $('#ModPencarian').modal('hide');
    }, 1000);
    const words1 = koordinat.split(',');

    map.setView([words1[0], words1[1]], 18);
    //var marker = L.marker([words1[0], words1[1]], {}).openPopup()
    //map.openPopup(words1[0], words1[1]);
    //layer.openPopup();
    //marker.openPopup();
});
</script>