(function () {

    /**
     * This Controllers manages the tester page
     *
     * using the following services
     * @param $http
     * @param WsClient
     * @param StationService
     * @param FixtureService
     * @param BatchService
     * @constructor
     */
    function StationController($http, $scope, $rootScope, $modal, WsClient, StationService, FixtureService,
                               BatchService, RunnerService, StatisticsService, ReportService,
                               SerialService, ModalHelpService, LanguageService, LoggerService, AlertService,
                               BarcodeReaderService) {

        var self = this;
        self.error = '';
        self.debug = '';
        self.devMode = true;
        self.showDebug = false;
        self.datetimeFormat = 'HH:mm:ss';
        self.uiLanguage = LanguageService.getuiLanguage();
        self.station = false;
        self.fixtures = [];
        self.userStats = {yield: 0, passed: 0, failed: 0};
        self.batchStats = {yield: 0, passed: 0, failed: 0};
        self.btnPrimFlag = true;
        self.btnDefaulFlag = true;
        self.btnActiveFlag = true;
        self.stationFlag = true;

        self.batch = BatchService.batch;

        /**
         *
         * @param bool
         */
        self.barcodeReader = function (bool) {
            BarcodeReaderService.barcodMode = bool;
            self.btnPrimFlag = !self.btnPrimFlag;
            self.btnDefaulFlag = !self.btnDefaulFlag;
            self.btnActiveFlag = !self.btnActiveFlag;
        };
        /**
         * switching between devMode and testerMode
         * @param mode
         */
        self.setDevMode = function (mode) {
            self.batch.batch_conf.launcher.develop = mode;
            for (var i = 0; i < self.fixtures.length; i++) {
                self.fixtures[i].devMode = mode;
            }
        };
        /**
         * open modal help window
         * @param help_id
         */
        self.help = function (help_id) {
            ModalHelpService.modalHelp(help_id);
        };


        /**
         * Get a report for a cavity during/afer execution
         * @param fixture
         * @param cavity
         */
        self.cavityReport = function (fixture, serial_number, cavity_id) {
            var report = ReportService.cavityReport(fixture.runStatus.execution_id, fixture.config.pn, serial_number, cavity_id);
            report.success(function (data, status, headers, config) {
                //self.error = data;
                //self.reportData = data;
                LoggerService.debug('Loading cavity report','StationController',data.data, data.duration);
                self.openModal(data);
                fixture.debug = data.debug;
            }).error(function (data, status, headers, config) {
                console.log(data);
                fixture.debug = data.debug;
                fixture.error = data.error;
            });
        };
        /**
         * get a report for the whole fixture during/after execution
         * @param fixture
         * @param cavity
         */
        self.fixtureReport = function (fixture) {
            if (!fixture.runStatus.execution_id) {
                fixture.debug = 'No Execution Id';
                return;
            }
            report = ReportService.fixtureReport(fixture.runStatus.execution_id, fixture.config.pn);
            report.success(function (data, status, headers, config) {
                //self.error = data;
                //self.reportData = data;
                self.openModal(data);
            }).error(function (data, status, headers, config) {
                console.log(data);
                fixture.debug = data.debug;
                fixture.error = data.error;
            });
        };
        /**
         * Open a modal window
         */
        self.openModal = function (items) {
            var modalInstance = $modal.open({
                templateUrl: '/static/src/tester/views/report_modal/report_modal.html',
                controller: 'ReportModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return items;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                console.log('Selected True');
            }, function (data) {
                var resp = angular.copy(data);
                console.log('Selected false');
            });
        };
        /**
         * before loading fixtures we must make sure that station is loaded and batch is loaded
         *
         */

        self.loadFixtures = function () {
            if (self.batch.batch_eval) {
                if (self.station) {
                    FixtureService.loadFixtures(self, self, self.station, self.batch);
                } else {
                    console.log('station is not yet loaded, can not load fixtures');
                }
            } else {
                console.log('batch is not yet loaded, can not load fixtures');
            }
        };
        /**
         * Evaluate the batch number entered by the user
         */
        self.evaluateBatch = function () {
            //delete previous batch_conf
            delete self.batch.batch_conf;
            req = BatchService.evaluateBatch(self.batch.batch_number,
                self.batch.pn_cfg,
                self.batch.pn_cfg_rev);
            req.$promise.then(function (response) {
                if (response.status == 0) {
                    self.batch.batch_conf = response.data;
                    self.batch.batch_eval = true;
                    //Load user and batch statistics statistics
                    self.loadFixtures();
                    StatisticsService.batchStats(self, self.batch);
                    StatisticsService.userStats(self, self.batch);
                } else {
                    self.batch.error = response.error;
                }
            });
        };
        /**
         * Init the page - Load stations id based on client IP
         */
        self.init = function () {
            LoggerService.debug('init start', 'StationController');
            BatchService.getBatchFromCookies();
            self.evaluateBatch();
            var req = StationService.getStation();
            req.$promise.then(function (response) {
                if (response.status == 0) {
                    self.station = response.station;
                    //FixtureService.loadFixtures(self, self, self.station._id);
                    self.loadFixtures();
                } else {
                    self.error = response.error;
                }
            });
            LoggerService.debug('init completed', 'StationController');
        };
        /**
         * Call init function
         * TODO: call this function after batch is evaluated
         */
        self.init();

        /**
         * evaluate cavities
         * @param fixture
         */
        self.evaluateSerial = function (fixture) {
            LoggerService.info('Evaluating serial number', 'Station', fixture);
            SerialService.evaluateSerial(fixture, self.batch)
        };
        /**
         * Ask the server to run a TSE
         * @param fixture
         */
        self.runTse = function (fixture) {
            /*
             * We have issues with alert service
             if (!AlertService.canRunTse()){
             self.error = 'Can not run Test Sequence - one of the essential services ore offline';
             return false;
             }
             */
            if (fixture.ready_for_run) {
                return FixtureService.runTse(fixture, self.batch);
            } else {
                fixture.error = 'Fixture is not ready make sure all serial number are valid';
            }

        };
        /**
         * Ask the server to stop a runing  TSE
         * @param fixture
         * @returns {*}
         */
        self.stopTse = function (fixture) {
            return FixtureService.stopTse(fixture, false);
        };

        /**
         * Clears Fixture run data
         * @param fixture
         * @returns {*}
         */
        self.forceStopTse = function (fixture) {
            return FixtureService.stopTse(fixture, true);
        };

        self.clearFixture = function (fixture) {
            return FixtureService.clearFixture(fixture);
        };

        /**
         * When there are notification from a currently running TSE - this callback function will be called
         * Use the notification data to change user indication and fixture status
         * @param data: Data of the WebSocket call
         */
        self.tseCallback = function (data) {
            //return false;
            console.log('in tse callback');
            console.log(data);
            var fixture = false;

            for (var j = 0; j < self.fixtures.length; j++) {
                if (self.fixtures[j].pn == data.info.fixture_id) {
                    fixture = self.fixtures[j];
                    break;
                }
            }
            if (!fixture) {
                console.log('fixture not found:' + data.info.fixture_id);
                return;
            }

            fixture.status = data.info.stage;
            if (data.info.stage == 'start') {
                //fixture.execution_id = data.info.execution_id.mongod;
                fixture.runStatus.execution_id = data.info.execution_id;
                fixture.runStatus.tse = 'start';
            }

            if (data.info.stage == 'running') {
                fixture.runStatus.state = 'running';
                for (var i = 0; i < data.info.cavities.length; i++) {
                    if (fixture.cavities[i].status == 'failed' || !fixture.cavities[i].enabled) {
                        //todo when receiving new data for already failed cavity
                    } else {
                        fixture.cavities[i].test_name = data.info.cavities[i].test_name;
                        fixture.cavities[i].percentage = data.info.cavities[i].percentage;
                        if (!data.info.cavities[i].running) {
                            if (data.info.cavities[i].verdict) {
                                fixture.cavities[i].status = 'success';
                            } else {
                                fixture.cavities[i].status = 'failed';
                                //fixture.cavities[i].atp_code = data.info.cavities[i].atp_code;
                                fixture.cavities[i].atp_code = "010";
                            }
                        }
                    }
                }

            }

            FixtureService.calcFixtureProgress(fixture);
            if (data.info.stage == 'end') {
                fixture.runStatus.tse = 'end';
                console.log('stage=end');
            }
            if (data.info.stage == 'cleanup') {
                console.log(data);
                LoggerService.debug('clean was sent', 'tse', {});
                //TODO: set cleanup in cavity
                fixture.runStatus.cleanup = data.info.status;
                console.log('stage=cleanup');
            }
            if (data.info.stage == 'tasks') {
                if (data.info.action == 'start') {
                    LoggerService.info('tasks start', 'StationController');
                    fixture.runStatus.tasks = 'start';
                }
                if (data.info.action == 'exception') {
                    LoggerService.critical('exception in tasks', 'StationController', data);
                    console.log('stage=exception');
                    fixture.runStatus.tasks = 'start';
                    fixture.testCompleted = true;
                    fixture.status = 'failed';
                    fixture.debug = data.info.action.error;
                    fixture.runStatus.tasks = 'error';
                    fixture.runStatus.state = 'stop';
                    fixture.statusBar.description = data.info.action.error;
                    fixture.statusBar.type = 'error';
                }
                if (data.info.action == 'end') {
                    LoggerService.info('tasks end', 'StationController');
                    fixture.runStatus.percentage = 100;
                    fixture.runStatus.state = 'stop';
                    fixture.testCompleted = true;
                    fixture.status = 'success';
                    fixture.runStatus.tasks = 'complete';
                    StatisticsService.fixtureStats(fixture, self.batch);
                    StatisticsService.batchStats(self, self.batch);
                    StatisticsService.userStats(self, self.batch);
                }
            }

            $scope.$apply();
        };

        /**
         * Open a modal window
         */
        self.openTfTesterInteractionModal = function (items) {
            console.log(items);
            var modalInstance = $modal.open({
                templateUrl: '/static/src/tester/views/tse_interaction_modal/tse_interaction_modal.html',
                controller: 'TseModalInstanceCtrl',
                windowClass: 'center-modal',
                size: 'lg',
                resolve: {
                    items: function () {
                        return items;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                var resp = angular.copy(data);
                angular.extend(resp, items);
                resp.method = 'response';
                //resp.msg.value = true;
                resp.type = 'private_message';
                WsClient.sendMessage(resp);
                console.log('Selected True');
            }, function (data) {
                var resp = angular.copy(data);
                angular.extend(resp, items);
                resp.method = 'response';
                //resp.msg.value = true;
                resp.type = 'private_message';
                WsClient.sendMessage(resp);
                console.log('Selected false');
            });
        };
        /**
         * Websocket callback for tf tester interaction
         *
         * Opens a modal window with selection for the user
         * The modal window will be closed if user did not respond.
         *
         * @param data
         */
        self.tfTesterInteractionCallback = function (data) {
            LoggerService.info('userInteractionCallback', 'StationController', data);
            $scope.openTfTesterInteractionModal(data);
            $scope.$apply();
        };

        //register the tseCallback to WsClient service
        self.tmpOpenInteraction = function () {
            var items = {
                data: {
                    title: 'Example tmpOpenInteraction',
                    msg: 'Some message',
                    options: [1, 2, 3, 4, 5, 6]
                }, timeout: 10000
            };
            self.openTfTesterInteractionModal(items);
        };


        WsClient.setCallback('tse', self.tseCallback);
        WsClient.setCallback('tf_tester_interaction', self.openTfTesterInteractionModal);


        /**
         * calls Barcode Handler Directive
         * @param event
         */
        $rootScope.checkSpecialInput = function (event) {
            BarcodeReaderService.barcodeBarHandller(event, self.fixtures)
        };
    }

    angular.module('ate.tester')
        .controller('StationController', ['$http', '$scope', '$rootScope', '$modal', 'WsClient',
            'StationService', 'FixtureService', 'BatchService', 'RunnerService',
            'StatisticsService', 'ReportService', 'SerialService', 'ModalHelpService', 'LanguageService',
            'LoggerService', 'AlertService', 'BarcodeReaderService', StationController]);
}());
/**
 * auto focus
 */




