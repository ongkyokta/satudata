
<!-------------- area transaksi sewa gedung & tanah ------------------>
<div class="col-xxl-12" id="area-sewa" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Pengajuan Sewa</strong> untuk menambahkan <strong>Transaksi Sewa</strong> lahan dan tanah<br />
                        Tombol<span class="fas fa-pen text-primary fs--2 ms-2 me-2"></span> untuk input data baru, 
                        Tombol<span class="fas fa-edit fs--2 ms-2 me-2"></span> untuk edit data, 
                        Tombol<span class="fas fa-trash-alt text-danger fs--2 ms-2 me-2"></span> untuk hapus data, 
                        Tombol<span class="fas fa-map-marker-alt fs--2 ms-2 me-2"></span> untuk menampilkan peta lokasi
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card z-index-1 mb-3">
                <div class="card-header">
                    <div class="row flex-between-center g-0">
                        <div class="col-auto">
                            <h6 class="fs-0 mb-0">Transaksi Sewa Lahan dan Tanah</h6>
                            <input class="form-control" type="text" id="txtketlembagaTrans" value="" style="font-size:13px;" hidden />
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdTambahTransSewa"><span class="d-none d-sm-inline-block">Pengajuan Sewa</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshTransSewa"><span class="d-none d-sm-inline-block">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelTransSewa" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Tanggal</th>
                                    <th class="sort text-center">Penyewa</th>
                                    <th class="sort text-center">Identitas Aset</th>
                                    <th class="sort text-center">Luas</th>
                                    <th class="sort text-center">Penawaran</th>
                                    <th class="sort text-center">Cetak</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelTransSewa" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-------------- area laporan sewa gedung & tanah ------------------>
<div class="col-xxl-12" id="area-laporan-sewa" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Pengajuan Sewa</strong> untuk menambahkan <strong>Transaksi Sewa</strong> lahan dan tanah<br />
                        Tombol<span class="fas fa-align-justify fs--2 ms-2 me-2"></span><strong>Detail Aset</strong> untuk menampilkan data lahan dan tanah, 
                        Tombol<span class="fas fa-map-marker-alt fs--2 ms-2 me-2"></span><strong>Peta Lokasi</strong> untuk menampilkan peta lokasi <strong>Aset Lembaga</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card z-index-1 mb-3">
                <div class="card-header">
                    <div class="row flex-between-center g-0">
                        <div class="col-auto">
                            <h6 class="fs-0 mb-0">Laporan Sewa Lahan dan Tanah</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdRefreshLapSewa"><span class="d-none d-sm-inline-block">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelLapSewa" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Lembaga</th>
                                    <th class="sort text-center">KIB-A</th>
                                    <th class="sort text-center">Disewakan</th>
                                    <th class="sort text-center">Pengajuan</th>
                                    <th class="sort text-center">Disewa</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelLapSewa" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-------------- area transaksi pinjam pakai gedung ------------------>
<div class="col-xxl-12" id="area-pinjam-pakai" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Pinjam Pakai Gedung</strong> untuk menambahkan <strong>Transaksi Pinjam Pakai</strong> gedung<br />
                        Tombol<span class="fas fa-edit fs--2 ms-2 me-2"></span> untuk edit data, 
                        Tombol<span class="fas fa-trash-alt text-danger fs--2 ms-2 me-2"></span> untuk hapus data, 
                        Tombol<span class="fas fa-map-marker-alt fs--2 ms-2 me-2"></span> untuk menampilkan peta lokasi
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card z-index-1 mb-3">
                <div class="card-header">
                    <div class="row flex-between-center g-0">
                        <div class="col-auto">
                            <h6 class="fs-0 mb-0">Transaksi Pinjam Pakai Gedung</h6>
                            <input class="form-control" type="text" id="txtketlembagaTrans" value="" style="font-size:13px;" hidden />
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdTambahTransPinjam"><span class="d-none d-sm-inline-block">Tambah Pinjam Pakai</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshTransPinjam"><span class="d-none d-sm-inline-block">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelTransPinjam" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Surat</th>
                                    <th class="sort text-center">Peminjam</th>
                                    <th class="sort text-center">Alamat Aset / Peruntukan</th>
                                    <th class="sort text-center">Cetak</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                    <!--th class="sort text-center"></!--th-->
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelTransPinjam" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
