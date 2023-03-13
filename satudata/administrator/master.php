<!---------------- tabel operator ------------------>
<!------------------------------------------------->
<div class="col-xxl-12" id="area-master-operator" style="display:none">

    <div class="card z-index-1 mb-3">
        <div class="card-header">
            <div class="row flex-between-center">
                <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                    <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">Master Data Operator </h5>
                </div>
                <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                    <div id="table-purchases-replace-element">
                        <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahOperator"><span
                                class="d-none d-sm-inline-block ms-1">Tambah
                                Data</span></button>
                        <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshOperator"><span
                                class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body bg-light px-3 py-3">

            <div class="table-responsive scrollbar">
                <table id="tableOperator" class="table table-sm mb-0 fs--1 w-100">
                    <thead class="bg-200">
                        <tr>
                            <th class="sort text-center">No.</th>
                            <th class="sort text-center">Nama Operator</th>
                            <th class="sort text-center">Instansi</th>
                            <th class="sort text-center">Username</th>
                            <th class="sort text-center">Akses</th>
                            <th class="sort text-center">Blokir</th>
                            <th class="sort text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white" id="list-operator"></tbody>
                </table>
            </div>

        </div>
    </div>

</div>
<!---------------- akhir operator ------------------>
<!------------------------------------------------->

<!---------------- tabel opd ------------------>
<!------------------------------------------------->
<div class="col-xxl-12" id="area-master-opd" style="display:none">

    <div class="card z-index-1 mb-3">
        <div class="card-header">
            <div class="row flex-between-center">
                <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                    <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">Master Data OPD </h5>
                </div>
                <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                    <div id="table-purchases-replace-element">
                        <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahOPD" style="display:none"><span
                                class="d-none d-sm-inline-block ms-1">Tambah
                                Data</span></button>
                        <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshOPD"><span
                                class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body bg-light px-3 py-3">

            <div class="table-responsive scrollbar">
                <table id="tableOPD" class="table table-sm mb-0 fs--1 w-100">
                    <thead class="bg-200">
                        <tr>
                            <th class="sort text-center">No.</th>
                            <th class="sort text-center">Nama OPD</th>
                            <th class="sort text-center">Kategori</th>
                            <th class="sort text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white" id="isitableOPD"></tbody>
                </table>
            </div>

        </div>
    </div>

</div>
<!---------------- akhir OPD ------------------>
<!------------------------------------------------->

<!---------------- tabel INSTANSI ------------------>
<!------------------------------------------------->
<div class="col-xxl-12" id="area-master-instansi" style="display:none">

    <div class="card z-index-1 mb-3">
        <div class="card-header">
            <div class="row flex-between-center">
                <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                    <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">Master Data Instansi </h5>
                </div>
                <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                    <div id="table-purchases-replace-element">
                        <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="cmdTambahInstansi"><span
                                class="d-none d-sm-inline-block ms-1">Tambah
                                Data</span></button>
                        <button class="btn btn-falcon-default btn-sm" type="button" id="cmdRefreshInstansi"><span
                                class="d-none d-sm-inline-block ms-1">Refresh</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body bg-light px-3 py-3">

            <div class="table-responsive scrollbar">
                <table id="tableInstansi" class="table table-sm mb-0 fs--1 w-100">
                    <thead class="bg-200">
                        <tr>
                            <th class="sort text-center">No.</th>
                            <th class="sort text-center">Nama Instansi</th>
                            <th class="sort text-center">Alamat</th>
                            <th class="sort text-center">Email / Telepon</th>
                            <th class="sort text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white" id="isitableInstansi"></tbody>
                </table>
            </div>

        </div>
    </div>

</div>
<!---------------- akhir INSTANSI ------------------>
<!------------------------------------------------->