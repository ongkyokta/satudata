////////////// MASTER ASET //////////////
$("#lv_aset").on("click", function () {
	bersihkan();
	$("#area-aset").fadeIn();
	isiMasterAset();
	$("#lblhalaman").val("aset");
	$("#loading").fadeOut("slow");
});

$("#lv_kategori").on("click", function () {
	bersihkan();
	$("#area-aset-kategori").fadeIn();
	isiMasterKategori();
	$("#lblhalaman").val("kategori");
	$("#loading").fadeOut("slow");
});

$("#lv_sub_kategori").on("click", function () {
	bersihkan();
	$("#area-aset-sub-kategori").fadeIn();
	isiMasterSubKategori();
	$("#lblhalaman").val("sub-kategori");
	$("#loading").fadeOut("slow");
});

$("#lv_golongan").on("click", function () {
	bersihkan();
	$("#area-aset-golongan").fadeIn();
	isiMasterGolongan();
	$("#lblhalaman").val("golongan");
	$("#loading").fadeOut("slow");
});

$("#lv_asal").on("click", function () {
	bersihkan();
	$("#area-aset-asal").fadeIn();
	isiMasterAsal();
	$("#lblhalaman").val("asal");
	$("#loading").fadeOut("slow");
});

$("#lv_tingkat").on("click", function () {
	bersihkan();
	$("#area-aset-tingkat").fadeIn();
	isiMasterTingkat();
	$("#lblhalaman").val("konstruksi-tingkat");
	$("#loading").fadeOut("slow");
});

$("#lv_beton").on("click", function () {
	bersihkan();
	$("#area-aset-beton").fadeIn();
	isiMasterBeton();
	$("#lblhalaman").val("konstruksi-beton");
	$("#loading").fadeOut("slow");
});

/*================ MASTER KATEGORI =================*/
function isiMasterKategori() {
	$.ajax({
		type: "POST",
		url: "aksi/master-kategori/isi_tabel_kategori.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabelkategori').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle" width="88%">' + data[i].nmkategori + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditMKategori" data-idkategori="' + data[i].idkategori + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusMKategori" data-idkategori="' + data[i].idkategori + '" data-nmkategori="' + data[i].nmkategori + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabelkategori').html(html);
			$("#tabelkategori").dataTable({
				"paging": false, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshKategori").on('click',function () {
	isiMasterKategori();
});

$("#cmdTambahKategori").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-kategori/tambah_kategori.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelkategori').on('click', '.btnEditMKategori', function () {
	var idkategori = $(this).data('idkategori');
	$.ajax({
		type: "POST",
		url: "aksi/master-kategori/edit_kategori.php",
		data: { idkategori: idkategori },
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelkategori').on('click', '.btnHapusMKategori', function () {
	var idkategori = $(this).data('idkategori');
	var nmkategori = $(this).data('nmkategori');
	let text = "Yakin Anda menghapus data kategori\n" + nmkategori;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-kategori/aksi_hapus.php",
			data: { idkategori: idkategori },
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterKategori();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});

/*================ MASTER SUB KATEGORI =================*/
function isiMasterSubKategori() {
	$.ajax({
		type: "POST",
		url: "aksi/master-sub-kategori/isi_tabel_sub_kategori.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabelsubkategori').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle" width="53%">' + data[i].nmsubkategori + '</td>' +
					'<td class="align-middle" width="35%">' + data[i].nmkategori + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditSubKategori" data-idsubkategori="' + data[i].idsubkategori + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusSubKategori" data-idsubkategori="' + data[i].idsubkategori + '" data-nmsubkategori="' + data[i].nmsubkategori + '" data-nmkategori="' + data[i].nmkategori + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabelsubkategori').html(html);
			$("#tabelsubkategori").dataTable({
				"paging": false, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshSubKategori").on('click',function () {
	isiMasterSubKategori();
});

$("#cmdTambahSubKategori").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-sub-kategori/tambah_sub_kategori.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelsubkategori').on('click', '.btnEditSubKategori', function () {
	var idsubkategori = $(this).data('idsubkategori');
	$.ajax({
		type: "POST",
		url: "aksi/master-sub-kategori/edit_sub_kategori.php",
		data: { idsubkategori: idsubkategori },
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelsubkategori').on('click', '.btnHapusSubKategori', function () {
	var idsubkategori = $(this).data('idsubkategori');
	var nmsubkategori = $(this).data('nmsubkategori');
	var nmkategori = $(this).data('nmkategori');
	let text = "Yakin Anda menghapus data sub kategori\n\n" + nmsubkategori + "\n" +nmkategori;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-sub-kategori/aksi_hapus.php",
			data: { idsubkategori: idsubkategori },
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterSubKategori();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});

/*================ MASTER GOLONGAN =================*/
function isiMasterGolongan() {
	$.ajax({
		type: "POST",
		url: "aksi/master-golongan/isi_tabel_golongan.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabelgolongan').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle" width="88%">' + data[i].nmgolongan + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditGolongan" data-idgolongan="' + data[i].idgolongan + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusGolongan" data-idgolongan="' + data[i].idgolongan + '" data-nmgolongan="' + data[i].nmgolongan + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabelgolongan').html(html);
			$("#tabelgolongan").dataTable({
				"paging": true, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshGolongan").on('click',function () {
	isiMasterGolongan();
});

$("#cmdTambahGolongan").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-golongan/tambah_golongan.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelgolongan').on('click', '.btnEditGolongan', function () {
	var idgolongan = $(this).data('idgolongan');
	$.ajax({
		type: "POST",
		url: "aksi/master-golongan/edit_golongan.php",
		data: { idgolongan: idgolongan },
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelgolongan').on('click', '.btnHapusGolongan', function () {
	var idgolongan = $(this).data('idgolongan');
	var nmgolongan = $(this).data('nmgolongan');
	let text = "Yakin Anda menghapus data golongan aset\n" + nmgolongan;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-golongan/aksi_hapus.php",
			data: { idgolongan: idgolongan },
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterGolongan();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});

/*================ MASTER ASET =================*/
function isiMasterAset() {
	$.ajax({
		type: "POST",
		url: "aksi/master-aset/isi_tabel_aset.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabelaset').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle text-center" width="18%">' + data[i].kode + '</td>' +
					'<td class="align-middle text-truncate" width="40%" style="max-width:200px;">' + data[i].nmaset + '</td>' +
					'<td class="align-middle text-truncate" width="30%" style="max-width:150px;">' + data[i].nmgolongan + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditAset" data-idaset="' + data[i].idaset + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusAset" data-idaset="' + data[i].idaset + '" data-kode="' + data[i].kode + '" data-nmaset="' + data[i].nmaset + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabelaset').html(html);
			$("#tabelaset").dataTable({
				"paging": true, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshAset").on('click',function () {
	isiMasterAset();
});

$("#cmdTambahAset").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-aset/tambah_aset.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelaset').on('click', '.btnEditAset', function () {
	var idaset = $(this).data('idaset');
	$.ajax({
		type: "POST",
		url: "aksi/master-aset/edit_aset.php",
		data: { idaset: idaset },
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelaset').on('click', '.btnHapusAset', function () {
	var idaset = $(this).data('idaset');
	var kode = $(this).data('kode');
	var nmaset = $(this).data('nmaset');
	let text = "Yakin Anda menghapus data aset\n" + nmaset + "\n" + kode;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-aset/aksi_hapus.php",
			data: { idaset: idaset },
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterAset();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});


/*================ MASTER ASAL =================*/
function isiMasterAsal() {
	$.ajax({
		type: "POST",
		url: "aksi/master-asal/isi_tabel_asal.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabelasal').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle" width="88%">' + data[i].nmasal + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditAsal" data-idasal="' + data[i].idasal + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusAsal" data-idasal="' + data[i].idasal + '" data-nmasal="' + data[i].nmasal + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabelasal').html(html);
			$("#tabelasal").dataTable({
				"paging": true, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshAsal").on('click',function () {
	isiMasterAsal();
});

$("#cmdTambahAsal").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-asal/tambah_asal.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelasal').on('click', '.btnEditAsal', function () {
	var idasal = $(this).data('idasal');
	$.ajax({
		type: "POST",
		url: "aksi/master-asal/edit_asal.php",
		data: { idasal: idasal },
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelasal').on('click', '.btnHapusAsal', function () {
	var idasal = $(this).data('idasal');
	var nmasal = $(this).data('nmasal');
	let text = "Yakin Anda menghapus data asal aset\n" + nmasal;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-asal/aksi_hapus.php",
			data: { idasal: idasal },
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterAsal();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});

/*================ MASTER KONSTRUKSI TINGKAT =================*/
function isiMasterTingkat() {
	$.ajax({
		type: "POST",
		url: "aksi/master-tingkat/isi_tabel_tingkat.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabeltingkat').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle" width="88%">' + data[i].nmtingkat + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditTingkat" data-idtingkat="' + data[i].idtingkat + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusTingkat" data-idtingkat="' + data[i].idtingkat + '" data-nmtingkat="' + data[i].nmtingkat + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabeltingkat').html(html);
			$("#tabeltingkat").dataTable({
				"paging": false, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshTingkat").on('click',function () {
	isiMasterTingkat();
});

$("#cmdTambahTingkat").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-tingkat/tambah_tingkat.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabeltingkat').on('click', '.btnEditTingkat', function () {
	var idtingkat = $(this).data('idtingkat');
	$.ajax({
		type: "POST",
		url: "aksi/master-tingkat/edit_tingkat.php",
		data: {idtingkat: idtingkat},
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabeltingkat').on('click', '.btnHapusTingkat', function () {
	var idtingkat = $(this).data('idtingkat');
	var nmtingkat = $(this).data('nmtingkat');
	let text = "Yakin Anda menghapus data konstruksi tingkat\n" + nmtingkat;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-tingkat/aksi_hapus.php",
			data: {idtingkat: idtingkat},
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterTingkat();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});

/*================ MASTER KONSTRUKSI BETON =================*/
function isiMasterBeton() {
	$.ajax({
		type: "POST",
		url: "aksi/master-beton/isi_tabel_beton.php",
		dataType: 'json',
		beforeSend: function (e) {
			$("#loading").fadeIn();
			document.body.style.cursor = "wait";
		},
		success: function (data) {
			document.body.style.cursor = "default";
			$('#tabelbeton').dataTable().fnDestroy();
			var html = '';
			var i;
			for (i = 0; i < data.length; i++) {

				html +=
					'<tr class="btn-reveal-trigger">' +
					'<td class="align-middle text-center" width="4%">' + data[i].no + '</td>' +
					'<td class="align-middle" width="88%">' + data[i].nmbeton + '</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnEditBeton" data-idbeton="' + data[i].idbeton + '" data-bs-toggle="tooltip" title="Edit"><span class="fas fa-edit"></span></button>' +
					'</td>' +
					'<td class="align-middle" width="4%">' +
					'<button class="btn btn-light icon-item rounded-3 fs--2 icon-item-sm mb-1 btnHapusBeton" data-idbeton="' + data[i].idbeton + '" data-nmbeton="' + data[i].nmbeton + '" data-bs-toggle="tooltip" title="Hapus"><span class="fas fa-trash-alt"></span></button>' +
					'</td>' +
					'</tr>';
			}
			$('#isitabelbeton').html(html);
			$("#tabelbeton").dataTable({
				"paging": false, "lengthChange": false, "ordering": true, "info": false, "autoWidth": true, "responsive": true, "select": false, "scrollX": true,
				initComplete: function () { $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off'); }, "searching": true,
			});
			$("#loading").fadeOut("slow");

		},
		error: function () {
			$("#loading").fadeOut("slow");
			alert("Koneksi bermasalah periksa internet");
			document.body.style.cursor = "default";
		},
	});
}

$("#cmdRefreshBeton").on('click',function () {
	isiMasterBeton();
});

$("#cmdTambahBeton").on('click',function () {
	$.ajax({
		type: "POST",
		url: "aksi/master-beton/tambah_beton.php",
		success: function (resp) {
			$("#isianModTambahData").html(resp);
			$("#isianModTambahData").fadeIn(1000);
			$("#modTambahData").modal({ backdrop: 'static', keyboard: false })
			$("#modTambahData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelbeton').on('click', '.btnEditBeton', function () {
	var idbeton = $(this).data('idbeton');
	$.ajax({
		type: "POST",
		url: "aksi/master-beton/edit_beton.php",
		data: {idbeton: idbeton},
		success: function (resp) {
			$("#isianModEditData").html(resp);
			$("#isianModEditData").fadeIn(1000);
			$("#modEditData").modal({ backdrop: 'static', keyboard: false })
			$("#modEditData").modal('show');
		},
		error: function () { alert('Koneksi bermasalah periksa internet'); },
	});
});

$('#isitabelbeton').on('click', '.btnHapusBeton', function () {
	var idbeton = $(this).data('idbeton');
	var nmbeton = $(this).data('nmbeton');
	let text = "Yakin Anda menghapus data konstruksi beton\n" + nmbeton;
	if (confirm(text) == true) {
		$.ajax({
			type: "POST",
			url: "aksi/master-beton/aksi_hapus.php",
			data: {idbeton: idbeton},
			success: function (resp) {
				$("#ToastSukses").toast("show");
				isiMasterBeton();
			},
			error: function () { alert('Koneksi bermasalah periksa internet'); },
		});
	}
});

