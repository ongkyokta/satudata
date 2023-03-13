<!---------------- aset ------------------>
<div class="col-xxl-12" id="area-aset" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Aset</strong> untuk menambahkan aset.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Aset</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Aset</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahAset"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Aset</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshAset"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelaset" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Kode Aset</th>
                                    <th class="sort text-center">Nama Aset</th>
                                    <th class="sort text-center">Golongan</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelaset" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!---------------- kategori ------------------>
<div class="col-xxl-12" id="area-aset-kategori" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Kategori</strong> untuk menambahkan kategori aset.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Kategori</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Kategori</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahKategori"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Kategori</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshKategori"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelkategori" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Kategori</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelkategori" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!---------------- sub kategori ------------------>
<div class="col-xxl-12" id="area-aset-sub-kategori" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Sub Kategori</strong> untuk menambahkan sub kategori aset.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Sub Kategori</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Sub Kategori</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahSubKategori"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Sub Kategori</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshSubKategori"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelsubkategori" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Sub Kategori</th>
                                    <th class="sort text-center">Kategori</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelsubkategori" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!---------------- golongan ------------------>
<div class="col-xxl-12" id="area-aset-golongan" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Golongan</strong> untuk menambahkan golongan.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Golongan</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Golongan</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahGolongan"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Golongan</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshGolongan"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelgolongan" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Golongan</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelgolongan" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!---------------- asal usul ------------------>
<div class="col-xxl-12" id="area-aset-asal" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Asal Aset</strong> untuk menambahkan asal aset.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Asal Aset</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Asal Aset</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahAsal"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Asal Aset</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshAsal"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelasal" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Asal Usul</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelasal" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!---------------- konstruksi tingkat ------------------>
<div class="col-xxl-12" id="area-aset-tingkat" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Konstruksi Tingkat</strong> untuk menambahkan konstruksi tingkat.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Konstruksi Tingkat</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Konstruksi Tingkat</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahTingkat"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Konstruksi Tingkat</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshTingkat"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabeltingkat" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Konstruksi Tingkat</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabeltingkat" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!---------------- konstruksi beton ------------------>
<div class="col-xxl-12" id="area-aset-beton" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Konstruksi Beton</strong> untuk menambahkan konstruksi beton.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Konstruksi Beton</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Konstruksi Beton</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahBeton"><span class="d-none d-sm-inline-block ms-1">Tambah
                                Konstruksi Beton</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshBeton"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelbeton" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Konstruksi Beton</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelbeton" />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


