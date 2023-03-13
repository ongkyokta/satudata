		
			<div class="modal-header px-4 position-relative modal-shape-header bg-shape">			  
				<div class="position-relative z-index-1 light">
                  <h5 class="mb-0 text-white">Sinkron Data Media</h5>
                  <p class="fs--1 mb-0 text-white">Update database data media (video & foto ruangan) </p>
                </div>
                <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3 px-4">
				<div class="mb-3">
					
					<p class="fs--1 text-600" id="lblketsinkronmedia"></p>
                  <div class="progress mb-1 rounded-pill" style="height: 6px;">
                    <div class="progress-bar bg-progress-gradient progress-bar-striped rounded-pill" id="lblprogressbarmedia" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p class="mb-0">
				  <button class="btn btn-success btn-sm mt-2" type="button" id="cmdSinkronMedia">Sinkron data media </button>
				  </p>
                 
            	</div>

<script type="text/javascript" charset="utf-8">
$(document).ready(function(){		
	$("#lblketsinkronmedia").html("Silahkan tekan tombol <strong>Sinkron data media</strong><br/>Untuk sinkronisasi data media video dan foto ruangan");
});

$("#cmdSinkronMedia").click(function(){
	$.ajax({
		type:'POST',
		url:'aksi/list-file/aksi_sinkron_file.php',
		dataType : 'json',
		beforeSend: function(e) {
			document.body.style.cursor = "wait";
			$("#cmdSinkronMedia").attr("disabled","disabled");
		},		
		success:function(data){
			document.body.style.cursor = "default";
			if(data.msg2 == 'ok'){
				$("#lblketsinkronmedia").html("Proses sinkron <strong>Data Media</strong> sukses!");
				move()
				setTimeout(function(){ 
					$('#modTambahData').modal('hide');
					$("#ToastSukses").toast("show");
					window.location.reload();
				},3000);						
			}else {
				alert('Ada sedikit masalah, silakan coba lagi.');
				$("#cmdSinkronMedia").removeAttr("disabled");
			}
		},
		error: function() {
			document.body.style.cursor = "default";
			alert('Koneksi bermasalah periksa internet');
			$("#cmdSinkronMedia").removeAttr("disabled");
			$(".modal-body").css("opacity", "");},
	});	
});

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("lblprogressbarmedia");
    var width = 1;
    var id = setInterval(frame, 20);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 99;
		//setTimeout(function(){ $('#modTambahData').modal('hide');$("#ToastSukses").toast("show");},1000);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}


</script>	