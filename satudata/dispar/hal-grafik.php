<div id="area-halaman-grafik" style="display:none">

    <div class="row mb-3 g-3">
        <div class="col">
            <div class="card h-100">
                <div class="card-header d-flex flex-between-center">
                    <h6 class="mb-0">Statistik Pariwisata  <span id="lblkopstatistik"></h6>
                </div>
                <div class="card-body bg-light pt-0">
                    <div class="row mt-3 mb-2">
                        <div class="col-2 border-end border-200">
                            <h4 class="mb-0" id="lbljumtotal"></h4>
                            <p class="fs--1 text-600 mb-0">Jumlah Total</p>
                        </div>
                        <div class="col-2 border-end border-200">
                            <h4 class="mb-0" id="lbljumwisata"></h4>
                            <p class="fs--1 text-600 mb-0">Tempat Wisata</p>
                        </div>
                        <div class="col-2 border-end border-200">
                            <h4 class="mb-0" id="lbljumhotel"></h4>
                            <p class="fs--1 text-600 mb-0">Hotel</p>
                        </div>
                        <div class="col-2 border-end border-200">
                            <h4 class="mb-0" id="lbljumresto"></h4>
                            <p class="fs--1 text-600 mb-0">Resto & Cafe</p>
                        </div>
                        <div class="col-2 border-end border-200">
                            <h4 class="mb-0" id="lbljumekraf"></h4>
                            <p class="fs--1 text-600 mb-0">Ekonomi Kreatif</p>
                        </div>
                        <div class="col-2 border-end border-200">
                            <h4 class="mb-0" id="lbljumseni"></h4>
                            <p class="fs--1 text-600 mb-0">Seni Budaya</p>
                        </div>
                    </div>
                    <h6 class="fs--1 mb-3 mt-3">Prosentase</h6>
                    <div class="overflow-visible progress mt-4 mb-2 rounded-3" id="areastatistikSarana" style="height: 6px;">
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!---------------- GRAFIK JUMLAH ------------------>
    <!------------------------------------------------->
    <div class="row mb-3 g-3">
        <div class="col-lg-6 ps-lg-2">
            <div class="card bg-line-chart-gradient h-lg-100">
                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                    <div class="col light">
                        <p class="fs--1 fw-semi-bold">Grafik Total Pariwisata <span id="lblkopgrafik1"></span></p>
                    </div>
                    <div class="chart h-100" id="hitungTotalChart" data-echart-responsive="true">
                        <canvas id="totalChart" height="300px"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-6 ps-lg-2">
            <div class="card bg-line-chart-gradient h-lg-100">
                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                    <div class="col light">
                        <p class="fs--1 fw-semi-bold">Grafik Kunjungan <span id="lblkopgrafik2"></span></p>
                    </div>
                    <div class="chart h-100" id="hitungChartKunjungan" data-echart-responsive="true">
                        <canvas id="KunjunganChart" height="300px"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3 g-3">
        <div class="col-xxl-6 px-xxl-2">
            <div class="card bg-line-chart-gradient h-lg-100">
                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                    <div class="col light">
                        <p class="fs--1 fw-semi-bold">Grafik Jenis Tempat Wisata <span id="lblkopgrafik4"></span></p>
                    </div>
                    <div class="chart h-100" id="hitungChartJenisWisata" data-echart-responsive="true">
                        <canvas id="ChartJenisWisata" height="300px"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3 g-3">
        <div class="col-xxl-6 px-xxl-2">
            <div class="card bg-line-chart-gradient h-lg-100">
                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                    <div class="col light">
                        <p class="fs--1 fw-semi-bold">Grafik Kelas Hotel
                            <span id="lblkopgrafik3"></span>
                        </p>
                    </div>
                    <div class="chart h-100" id="hitungChartKelasHotel" data-echart-responsive="true">
                        <canvas id="ChartKelasHotel" height="300px"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mb-3 g-3">
        <div class="col-xxl-6 px-xxl-2">
            <div class="card bg-line-chart-gradient h-lg-100">
                <div class="card-body text-white d-flex flex-column justify-content-between h-100 pe-3">
                    <div class="col light">
                        <p class="fs--1 fw-semi-bold">Grafik Jenis Kesenian & Kebudayaan Kabupaten Jember</p>
                    </div>
                    <div class="chart h-100" id="hitungChartKesenian" data-echart-responsive="true">
                        <canvas id="ChartKesenian" height="300px"></canvas>
                    </div>
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
                            <h6 class="mb-0">Tabel Jumlah Jenis Ekonomi Kreatif</h6>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-light px-3 py-3">
                    <div class="table-responsive scrollbar">
                        <table id="tabelgrafikekraf" class="table table-sm table-striped mb-0 fs--1 w-100">
                            <thead class="bg-200">
                                <tr>
                                    <th class="sort text-center">No</th>
                                    <th class="sort">Nama Bidang</th>
                                    <th class="sort text-center">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="isitabelgrafikekraf"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div><!--halaman-->