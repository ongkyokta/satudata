<div class="row mb-3" id="area-kop-dashboard">
    <div class="col">
        <div class="card bg-100 shadow-none border">
            <div class="row gx-0 flex-between-center">
                <div class="col-sm-auto d-flex align-items-center"><img class="ms-n2"
                        src="../assets/img/illustrations/crm-bar-chart.png" alt="" width="90" />
                    <div>
                        <h6 class="text-primary fs--1 mb-0">Dashboard Administrator </h6>
                        <h4 class="text-primary fw-bold mb-0">Jember Big Data</h4>
                    </div><img class="ms-n4 d-md-none d-lg-block" src="../assets/img/illustrations/crm-line-chart.png"
                        alt="" width="150" />
                </div>
            </div>
        </div>
    </div>
</div>

<!---------------- DASHBOARD ------------------>
<!------------------------------------------------->
<div class="row mb-3" id="area-dashboard" style="display:block">
    <div class="col-xxl-12">

        <div class="card z-index-1 mb-3">
            <div class="card-header">
                <div class="row gx-0 align-items-center">

                    <div class="col-auto d-flex justify-content-end order-md-1">
                        <button class="btn icon-item icon-item-sm shadow-none p-0 me-1 ms-md-2" type="button"
                            id="cmdprev" data-bs-toggle="tooltip" title="Sebelumnya"><span
                                class="fas fa-arrow-left"></span></button>
                        <button class="btn icon-item icon-item-sm shadow-none p-0 me-1 me-lg-2" type="button"
                            id="cmdnext" data-bs-toggle="tooltip" title="Selanjutnya"><span
                                class="fas fa-arrow-right"></span></button>
                    </div>

                    <div class="col-auto col-md-auto order-md-2">
                        <h4 class="fs-0 mb-0 text-nowrap py-2 py-xl-0" id="dashboard-lbltanggal-jadwal"></h4>
                    </div>

                    <div class="col col-md-auto d-flex justify-content-end order-md-3">
                        <button class="btn btn-falcon-default btn-sm" type="button" id="dashboard-cmdToday">Hari
                            ini</button>
                    </div>
                    <div class="col d-flex justify-content-end order-md-2">
                        <div class="dropdown font-sans-serif me-md-2">
                            <select class="form-select form-select-sm" id="dashboard-select-jadwal">
                                <option value="bulan" selected="selected">Bulanan</option>
                                <option value="minggu">Mingguan</option>
                                <option value="hari">Harian</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body bg-light p-0">
            <!--div class="calendar-outline" id="appCalendar"></!--div-->
        </div>
    </div>
</div>
</div>
<!---------------- DASHBOARD ------------------>
<!------------------------------------------------->