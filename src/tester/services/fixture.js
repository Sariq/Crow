(function () {

    function FixtureService($http, WsClient, StatisticsService) {

        var self = this;

        self.getStationFixtures = function (station) {
            return $http.get('/tester/api/fixture', {
                station_id: station._id,
                pn_cfg: station.pn_cfg,
                pn_cfg_rev: station.pn_cfg_rev
            });
        };
        self.getFixtures = function () {
            return $http.get('/tester/api/fixture');
        };


        self.loadFixtures = function (fixturesContainer, errorContainer, station, batch) {
            var url = '/tester/api/fixture';
            console.log('batch is:')
            console.log(batch);
            if (station._id) {
                url = url + '?station_id=' + station._id +'&pn_cfg='+ batch.pn_cfg +'&pn_cfg_rev='+ batch.pn_cfg_rev;
            }
            $http.get(url)
                .success(function (data, status, headers, config) {
                    if (data.status == 0) {
                        errorContainer.debug = data.debug;
                        fixturesContainer.fixtures = [];
                        for (var i = 0; i < data.fixtures.length; i++) {

                            var cavities = [];
                            var maxVertical = data.fixtures[i].cavities / data.fixtures[i].horizontal_cavities;
                            console.log(data.fixtures[i].cavities);
                            console.log(maxVertical);

                            for (var j = 0; j < data.fixtures[i].cavityInfo.length; j++) {
                                var cavity = {
                                    idx: data.fixtures[i].cavityInfo.idx,
                                    active: data.fixtures[i].cavityInfo[j].active,
                                    require_serial: data.fixtures[i].require_serial,
                                    percentage: 0,
                                    serial: '',
                                    enabled: data.fixtures[i].cavityInfo[j].active,
                                    status: 'idle',
                                    test: '',
                                    test_name: '',
                                    verdict: '',
                                    horizontal: parseInt(j / maxVertical),
                                    vertical: j % maxVertical
                                };
                                cavities.push(cavity);
                            }

                            fixturesContainer.fixtures.push({
                                pn: data.fixtures[i].pn,
                                config: data.fixtures[i],
                                status: 'idle',
                                lastStatusUpdate: false,
                                runStatus: {
                                    pre: 0,
                                    execution_id: '',
                                    cleanup: null,
                                    timeElapsed: 0,
                                    started: null,
                                    state: 'clear'
                                },
                                stats: {yield: 0, failed: 0, passed: 0},
                                cavities: cavities,
                                clearSerial: true,
                                devMode: true,
                                ready_for_run:false,
                                statusBar: {description: '', type: ''}
                            });

                        }
                        var filters = [];
                        for (var i = 0; i < data.fixtures.length; i++) {
                            console.log(data.fixtures[i].pn);
                            filters.push({entity: data.fixtures[i].pn, message_types: ['all']});
                        }
                        WsClient.addFilters(filters);
                    } else {
                        errorContainer.debug = data.debug;
                        errorContainer.error = data.error;
                    }
                    for (var j = 0; j < fixturesContainer.fixtures.length; j++) {
                        StatisticsService.fixtureStats(fixturesContainer.fixtures[j], batch);
                    }

                }).error(function (data, status, headers, config) {
                    errorContainer.debug = data;
                });

        };

        self.runTse = function (fixture, batch_conf) {
            fixture.status = 'running';
            fixture.runStatus.state = 'running';
            fixture.runStatus.tornado = 'start';
            var rmt_srv = {
                ip_address: fixture.config.ip_address,
                host: fixture.config.host,
                pn: fixture.config.pn,
                os: fixture.config.os,
                location: fixture.config.location
            };
            var data = {
                fixture_id: fixture.config.pn, cavity: {},
                configuration: batch_conf,
                rmt_srv: rmt_srv
            };
            console.log('FixtureService runTse');
            console.log(data);
            //console.log(fixture);
            var idx = 0;
            var state = true;
            var serial = '';

            /**
             * Reformat the serial numbers cavity object
             */
            for (var i = 0; i < fixture.cavities.length; i++) {
                idx = i + 1;
                if (fixture.cavities[i].enabled) {
                    state = true;
                } else {
                    state = false;
                }
                if (fixture.cavities[i].serial) {
                    serial = fixture.cavities[i].serial;
                } else {
                    serial = '';
                }
                data.cavity[idx.toString()] = {serial: serial, state: state}
            }
            var date = new Date();
            fixture.status = 'running';
            fixture.runStatus.started = date.getTime();
            fixture.error = '';
            console.log(data);
            $http.put('/tester/api/station', data).
                success(function (data, status) {
                    console.log(data);

                    if (data.status == 0) {
                        fixture.debug = data.debug;
                        fixture.runStatus.tornado = 'complete';
                        fixture.runStatus.taskId = data.data.task_id;
                    } else {
                        fixture.runStatus.tornado = 'error';
                        fixture.debug = data.debug;
                        fixture.error = data.error;
                    }
                }).
                error(function (data, status) {
                    fixture.runStatus.tornado = 'error';
                    console.log("Request failed");
                    console.log(data);
                });
        };
        /**
         * Stop a running tasks
         * @param fixture
         * @param force - stop run by force
         * @type boolean
         */
        self.stopTse = function (fixture, force) {
            fixture.runStatus.state = 'stopping';
            if (force == false) {
                var data = {
                    task_id: fixture.runStatus.taskId,
                    data: {
                        'type': 'STOP',
                        'message': 'TSE please, stop'
                    }
                };
            } else {
                var data = {
                    task_id: fixture.runStatus.taskId,
                };
            }
            $http.post('/tester/api/station', data).success(function (data, status) {
                console.log(data);
                if (data.status == 0) {
                    fixture.statusBar.description = data.debug;
                    fixture.statusBar.type = 'warning';
                    fixture.runStatus.tornado = 'complete';
                    fixture.runStatus.state = 'stop';
                    fixture.runStatus.taskId = data.data.task_id;
                } else {
                    fixture.runStatus.tornado = 'error';
                    fixture.statusBar.description = data.error;
                    fixture.statusBar.type = 'error'
                }
            }).
                error(function (data, status) {
                    fixture.runStatus.tornado = 'error';
                    console.log("Request failed");
                    console.log(data);
                });
        };


        self.forceStopTse = function (fixture, force) {
            fixture.runStatus.state = 'stopping';
            var data = {task_id: fixture.runStatus.taskId};
            $http.post('/tester/api/station', data).success(function (data, status) {
                console.log(data);
                if (data.status == 0) {
                    fixture.statusBar.description = data.debug;
                    fixture.statusBar.type = 'warning';
                    fixture.runStatus.tornado = 'complete';
                    fixture.runStatus.state = 'stop';
                    fixture.runStatus.taskId = data.data.task_id;
                } else {
                    fixture.runStatus.tornado = 'error';
                    fixture.statusBar.description = data.error;
                    fixture.statusBar.type = 'error'
                }
            }).
                error(function (data, status) {
                    fixture.runStatus.tornado = 'error';
                    console.log("Request failed");
                    console.log(data);
                });
        };


        /**
         * calcFixtureProgress
         * Calculate the overall fixture progress based on each cavity/device progress
         * @param fixture
         * @param cavities
         */
        self.calcFixtureProgress = function (fixture) {
            var progress = 0;
            var activeCavities = 0;
            for (var i = 0; i < fixture.cavities.length; i++) {
                if (fixture.cavities[i].enabled) {
                    activeCavities++;
                    if (fixture.cavities[i].status == 'failed') {
                        progress = progress + 100;
                    } else {
                        progress = progress + fixture.cavities[i].percentage;
                    }
                }
            }
            console.log(progress);
            fixture.runStatus.percentage = progress / activeCavities;
            var date = new Date();
            fixture.runStatus.timeElapsed = date.getTime() - fixture.runStatus.started;
            //fixture.runStatus.timeElapsed = 9;
            console.log(fixture.progress);
        };

        /**
         * clearFixture
         * Clears a fixture after run is completed
         * @param fixture
         * @param cavities
         */
        self.clearFixture = function (fixture) {
            for (var i = 0; i < fixture.cavities.length; i++) {
                if (!fixture.devMode) {
                    fixture.cavities[i].serial = '';
                }
                fixture.cavities[i].status = 'idle';
                fixture.cavities[i].percentage = 0;
                fixture.cavities[i].test = '';
            }
            fixture.status = 'idle';
            fixture.runStatus.percentage = 0;
            fixture.runStatus.started = 0;
            fixture.runStatus.timeElapsed = 0;
            fixture.runStatus.cleanup = '';
            fixture.runStatus.tornado = '';
            fixture.runStatus.tasks = '';
            fixture.runStatus.tse = '';
            fixture.runStatus.state = 'clear';

        };

        //Retuning self as a service object
        return self;
    }

    angular.module('ate.tester')
        .service('FixtureService', ['$http', 'WsClient', 'StatisticsService', FixtureService])
}());