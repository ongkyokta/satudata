<!---------------- area kib C tanah & bangunan ------------------>
<div class="col-xxl-12" id="area-kib-tanah-bangunan" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Inventaris</strong> untuk menambahkan <strong>Kartu Inventaris Tanah & Bangunan</strong><br />
                        Tombol<span class="fas fa-pencil-alt fs--2 ms-2 me-2"></span><strong>Input Baru</strong> untuk input KIB C baru Lembaga / OPD, 
                        Tombol<span class="fas fa-align-justify fs--2 ms-2 me-2"></span><strong>Detail Inventaris</strong> untuk menampilkan data KIB C Lembaga / OPD
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
                            <h6 class="fs--1 mb-0">Kartu Inventaris Barang Tanah & Bangunan</h6>
                            <input class="form-control" type="text" id="txtketlembagaKIB" value="" style="font-size:13px;" hidden />
                            <div class="btn btn-sm btn-text align-items-center p-0 shadow-none fs--2 me-3" id="cmdFilterLembagaKIBC"><span class="fas fa-circle text-primary fs--2 me-2" id="spanFilterLembagaKIBC"></span>Lembaga </div>
                            <div class="btn btn-sm btn-text align-items-center p-0 shadow-none fs--2" id="cmdFilterOpdKIBC"><span class="fas fa-circle text-200 fs--2 me-2" id="spanFilterOpdKIBC"></span>OPD </div>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdTambahKIBC"><span class="d-none d-sm-inline-block">Tambah
                                        Inventaris</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdExcelKIBC"><span class="d-none d-sm-inline-block">Export Excel</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelKIBC" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Lembaga</th>
                                    <th class="sort text-center">KIB-C</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelKIBC" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!---------------- area kib B peralatan & mesin ------------------>
<div class="col-xxl-12" id="area-kib-mesin" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Inventaris</strong> untuk menambahkan <strong>Kartu Inventaris Peralatan & Mesin</strong><br />
                        Tombol<span class="fas fa-pencil-alt fs--2 ms-2 me-2"></span><strong>Input Baru</strong> untuk input KIB B baru Lembaga / OPD, 
                        Tombol<span class="fas fa-align-justify fs--2 ms-2 me-2"></span><strong>Detail Inventaris</strong> untuk menampilkan data KIB B Lembaga / OPD
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
                            <h6 class="fs--1 mb-0">Kartu Inventaris Barang Peralatan & Mesin</h6>
                            <input class="form-control" type="text" id="txtketlembagaKIBB" value="" style="font-size:13px;" hidden />
                            <div class="btn btn-sm btn-text align-items-center p-0 shadow-none fs--2 me-3" id="cmdFilterLembagaKIBB"><span class="fas fa-circle text-primary fs--2 me-2" id="spanFilterLembagaKIBB"></span>Lembaga </div>
                            <div class="btn btn-sm btn-text align-items-center p-0 shadow-none fs--2" id="cmdFilterOpdKIBB"><span class="fas fa-circle text-200 fs--2 me-2" id="spanFilterOpdKIBB"></span>OPD </div>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdTambahKIBB"><span class="d-none d-sm-inline-block">Tambah
                                        Inventaris</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdExcelKIBB"><span class="d-none d-sm-inline-block">Export Excel</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelKIBB" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Lembaga</th>
                                    <th class="sort text-center">KIB-B</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelKIBB" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!---------------- area kib D jalan, jaringan & irigasi ------------------>
<div class="col-xxl-12" id="area-kib-jalan" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Inventaris</strong> untuk menambahkan <strong>Kartu Inventaris Jalan, Irigasi & Jaringan</strong><br />
                        Tombol<span class="fas fa-pencil-alt fs--2 ms-2 me-2"></span><strong>Input Baru</strong> untuk input KIB D baru Lembaga / OPD, 
                        Tombol<span class="fas fa-align-justify fs--2 ms-2 me-2"></span><strong>Detail Inventaris</strong> untuk menampilkan data KIB D Lembaga / OPD
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
                            <h6 class="fs--1 mb-0">Kartu Inventaris Jalan, Irigasi & Jaringan</h6>
                            <input class="form-control" type="text" id="txtketlembagaKIBD" value="" style="font-size:13px;" hidden />
                            <div class="btn btn-sm btn-text align-items-center p-0 shadow-none fs--2 me-3" id="cmdFilterLembagaKIBD"><span class="fas fa-circle text-primary fs--2 me-2" id="spanFilterLembagaKIBD"></span>Lembaga </div>
                            <div class="btn btn-sm btn-text align-items-center p-0 shadow-none fs--2" id="cmdFilterOpdKIBD"><span class="fas fa-circle text-200 fs--2 me-2" id="spanFilterOpdKIBD"></span>OPD </div>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdTambahKIBD"><span class="d-none d-sm-inline-block">Tambah
                                        Inventaris</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdExcelKIBD"><span class="d-none d-sm-inline-block">Export Excel</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelKIBD" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Lembaga</th>
                                    <th class="sort text-center">KIB-D</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelKIBD" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!---------------- area kib A lahan, gedung & tanah ------------------>
<div class="col-xxl-12" id="area-kib-lahan" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Inventaris</strong> untuk menambahkan <strong>Kartu Inventaris Lahan, Tanah & Gedung</strong><br />
                        Tombol<span class="fas fa-align-justify fs--2 ms-2 me-2"></span><strong>Detail Inventaris</strong> untuk menampilkan data KIB A Lembaga, 
                        Tombol<span class="fas fa-map-marker-alt fs--2 ms-2 me-2"></span><strong>Peta Lokasi</strong> untuk menampilkan peta lokasi Lembaga
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
                            <h6 class="fs-0 mb-0">Kartu Inventaris Lahan, Tanah & Gedung</h6>
                            <input class="form-control" type="text" id="txtketlembagaKIBA" value="" style="font-size:13px;" hidden />
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-1" type="button" id="cmdTambahKIBA"><span class="d-none d-sm-inline-block">Tambah
                                        Inventaris</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdExcelKIBA"><span class="d-none d-sm-inline-block">Export Excel</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelKIBA" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Lembaga</th>
                                    <th class="sort text-center">KIB-A</th>
                                    <th class="sort text-center">Disewakan</th>
                                    <th class="sort text-center">Sertifikat</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelKIBA" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
