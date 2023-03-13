<!---------------- area operator ------------------>
<div class="col-xxl-12" id="area-halaman-operator" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Operator</strong> untuk menambahkan data operator.<br />
                        Tombol <strong>Ikon Blokir, Ikon Edit, Ikon Hapus</strong> untuk memblokir, edit data dan hapus data <strong>Operator</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Operator</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahOperator"><span class="d-none d-sm-inline-block ms-1">Tambah
                                        Operator</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshOperator"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelOperatorAdm" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Username</th>
                                    <th class="sort text-center">Instansi</th>
                                    <th class="sort text-center">Hak Akses</th>
                                    <th class="sort text-center">Status</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelOperatorAdm" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!---------------- area user mobile ------------------>
<div class="col-xxl-12" id="area-halaman-user-mobile" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah User Mobile</strong> untuk menambahkan data user mobile.<br />
                        Tombol <strong>Ikon Aktive/NonAktif, Ikon Edit, Ikon Hapus</strong> untuk aktivasi mobile (HP), edit data dan hapus data <strong>User Mobile</strong>
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
                            <h6 class="fs-0 mb-0">Master Data User Mobile</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahUserMobile"><span class="d-none d-sm-inline-block ms-1">Tambah
                                        User Mobile</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshUserMobile"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelUserMobile" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Username</th>
                                    <th class="sort text-center">Instansi</th>
                                    <th class="sort text-center">Akses</th>
                                    <th class="sort text-center">Validator</th>
                                    <th class="sort text-center">Status</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelUserMobile" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!---------------- area opd  ------------------>
<div class="col-xxl-12" id="area-halaman-opd" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah OPD</strong> untuk menambahkan OPD.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>OPD</strong>
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
                            <h6 class="fs-0 mb-0">Master Data OPD</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahOPD"><span class="d-none d-sm-inline-block ms-1">Tambah
                                        OPD</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshOPD"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelopd" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama OPD</th>
                                    <th class="sort text-center">Alamat</th>
                                    <th class="sort text-center">Telepon</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelopd" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!---------------- area lembaga ------------------>
<div class="col-xxl-12" id="area-halaman-lembaga" style="display:none">
    <div class="row mb-3 g-3">
        <div class="col-xxl-12">
            <div class="card bg-light h-lg-100">
                <div class="card-body d-flex align-items-center">
                    <p class="fs--1 mt-0 mb-0">
                        Tombol <strong>Tambah Lembaga</strong> untuk menambahkan lembaga.
                        Tombol <strong>Ikon Edit, Ikon Hapus</strong> untuk edit data dan hapus data <strong>Lembaga</strong>
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
                            <h6 class="fs-0 mb-0">Master Data Lembaga</h6>
                        </div>
                        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                            <div id="table-purchases-replace-element">
                                <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahLembaga"><span class="d-none d-sm-inline-block ms-1">Tambah
                                        Lembaga</span></button>
                                <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshLembaga"><span class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabellembaga" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No.</th>
                                    <th class="sort text-center">Nama Lembaga</th>
                                    <th class="sort text-center">Alamat</th>
                                    <th class="sort text-center">Telepon</th>
                                    <th class="sort text-center"></th>
                                    <th class="sort text-center"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabellembaga" />
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
