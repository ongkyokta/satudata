function ambilTotalStatistikDispendik() {
    $("#lbljmlsekolahDispendik").html("0");$("#lbljmlguruDispendik").html("0");$("#lbljmlsiswaDispendik").html("0");
    $.ajax({
        type: "POST",
        url: "api/dispendik/ambil-data-statistik.php",
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var html = '';
            var i;
            for (i = 0; i < data.length; i++) {
                $("#lbljmlsekolahDispendik").html(data[i].jumSekolah);
                $("#lbljmlguruDispendik").html(data[i].jumGuru);
                $("#lbljmlsiswaDispendik").html(data[i].jumSiswa);
            }
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function ambilTotalStatistikDispenduk() {
    $("#lbljmlpendudukDispenduk").html("0");$("#lbllakiDispenduk").html("0");$("#lblperempuanDispenduk").html("0");
    $.ajax({
        type: "POST",
        url: "api/dispenduk/penduduk_kecamatan.php",
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var html = '';
            var i;
            for (i = 0; i < data.length; i++) {
                $("#lbljmlpendudukDispenduk").html(data[i].jmltotal);
                $("#lbllakiDispenduk").html(data[i].jmllaki);
                $("#lblperempuanDispenduk").html(data[i].jmlperempuan);
            }
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function ambilUmurStatistikDispenduk() {
    $("#lblpendudukbalitaDispenduk").html("0");$("#lblpenduduk-5-17-Dispenduk").html("0");
    $("#lblpenduduk-17-25-Dispenduk").html("0");$("#lblpenduduk-25-55-Dispenduk").html("0");$("#lblpenduduklansiaDispenduk").html("0");
    $.ajax({
        type: "POST",
        url: "api/dispenduk/umur_kecamatan.php",
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var html = '';
            var i;
            for (i = 0; i < data.length; i++) {
                $("#lblpendudukbalitaDispenduk").html(data[i].balita);
                $("#lblpenduduk-5-17-Dispenduk").html(data[i].anak);
                $("#lblpenduduk-17-25-Dispenduk").html(data[i].remaja);
                $("#lblpenduduk-25-55-Dispenduk").html(data[i].dewasa);
                $("#lblpenduduklansiaDispenduk").html(data[i].lansia);
            }
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}

function ambilApiStatistikJTourism() {
    $("#lbljmlwisata").html("0");$("#lbljmlhotel").html("0");$("#lbljmlresto").html("0");
    $("#lbljmlekraf").html("0");$("#lbljmlkesenian").html("0");
    $.ajax({
        type: "POST",
        url: "api/jtourism/ambil-data-statistik.php",
        dataType: 'json',
        beforeSend: function (e) {
            $("#loading").fadeIn();
            document.body.style.cursor = "wait";
        },
        success: function (data) {
            document.body.style.cursor = "default";
            var html = '';
            var i;
            for (i = 0; i < data.length; i++) {
                $("#lbljmlwisata").html(data[i].jumwisata)
                $("#lbljmlhotel").html(data[i].jumhotel)
                $("#lbljmlresto").html(data[i].jumresto)
                $("#lbljmlekraf").html(data[i].jumekraf)
                $("#lbljmlkesenian").html(data[i].jumkesenian)
            }
            $("#loading").fadeOut("slow");
        },
        error: function () {
            $("#loading").fadeOut("slow");
            alert("Koneksi bermasalah periksa internet");
            document.body.style.cursor = "default";
        },
    });
}