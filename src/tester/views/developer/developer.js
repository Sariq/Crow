(function () {


  angular.module('ate.tester').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    console.log('ModalInstanceCtrl');
    console.log(items);
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });


  /**
   * DeveloperController:
   * Runs tests during development of a TestFixture/TestSequence
   *
   * This controller uses the following services:
   * @param $scope
   * @param $http
   * @param RunnerService
   * @param FixtureService
   * @param BatchService
   * @param WsClient
   * @param AutoTest
   * @param PseudoRunnerService
   * @constructor
   */
  function DeveloperController($scope, $http, $modal,
                               RunnerService,
                               FixtureService,
                               BatchService,
                               WsClient,
                               AutoTest,
                               PseudoRunnerService,
                               SerialService,
                               ReportService,
                               ReportModalService) {
    var self = this;

    self.error = '';
    self.debug = '';
    self.reportData = 'sfdgsdfgsdfg';
    self.fixtures = [];
    self.batch = {
      batch_number: '',
      //batch_number: '082011966',
      pn_cfg: 'test_b03',
      pn_cfg_rev: 'A',
      batch_eval: false
    };
    $scope.items = ['item1', 'item2', 'item3'];
    self.autoCount = {times: 6};

    /**
     * Generate auto tests for all fixtures in the page
     * TODO:
     * 1. The test should generate random serial numbers
     * 2. Check of a fixture is in completed state- if so clear it and start running again
     * 3. Check if we passed the number of test to run if restart the process
     *
     */
    self.startAutoTest = function () {
      AutoTest.startAutoTest(self.fixtures, self.autoCount);
    };

    self.validate_serial = function (serial, cavity) {
      if (!serial) {
        return;
      }
      console.log('validate_serial:' + serial + ':' + cavity);
      var req = SerialService.evaluateSerial(serial, cavity, self.batch.batch_conf);
      req.$save(function (response) {
        self.debug = response.debug;
        if (response.status == 0) {
          console.log(response);
        } else {
          self.error = response.error;

        }
      })
    };

    /**stopAutoTest
     * Stop currently running auto tests
     */
    self.stopAutoTest = function () {
      self.autoCount.times = 0;
    };
    /**
     * Loads fixtures tht matches current project configuration
     */
    self.loadFixtures = function () {

      $http.get('/tester/api/fixture')
        .success(function (data, status, headers, config) {
          console.log('we have fixtures');
          var filters = [];
          for (var i = 0; i < data.fixtures.length; i++) {
            console.log(data.fixtures[i].pn);
            filters.push({entity: data.fixtures[i].pn, message_types: ['all']});
          }
          WsClient.addFilters(filters);
          //console.log(data.fixtures);
          self.fixtures = data.fixtures;
        }).
        error(function (data, status, headers, config) {
          console.log(data);
          self.debug = data;
        });
    };
    //load fixtures
    self.loadFixtures();
    /**
     * Run Asks the server to run Test Sequence Executor
     * @param fixture
     */
    self.runTse = function (fixture) {
      //PseudoRunnerService.run(fixture.pn);
      console.log(self.batch);
      fixture.executionTime = 0;
      return RunnerService.runTse(fixture, self.batch);
    };
    /**
     * Check if batch number/project configuration is correct
     * Get setup info needed to run TSE
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
        } else {
          self.batch.error = response.error;
        }
      });
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

      fixture.run_status = data.info.stage;
      if (data.info.stage == 'start') {
        //fixture.execution_id = data.info.execution_id.mongod;
        fixture.execution_id = data.info.execution_id;
      }

      if (data.info.stage == 'running') {
        for (var i = 0; i < data.info.cavities.length; i++) {
          if (fixture.cavityInfo[i]) {
            fixture.cavityInfo[i].runStatus = data.info.cavities[i];
          }
        }
        RunnerService.calcFixtureProgress(fixture, data.info.cavities);
      }

      if (data.info.stage == 'end') {
        //TODO:Set Timer value
        //fixture.time=x
        console.log('stage=stop');
      }
      if (data.info.stage == 'cleanup') {
        console.log(data);
        console.log('stage=cleanup');
      }
      $scope.$apply();
    };
    //register the tseCallback to WsClient service
    WsClient.setCallback('tse', self.tseCallback);

    /**
     * Clears fixture after run process has completed
     * @param fixture
     */
    self.clearFixture = function (fixture) {
      for (var i = 0; i < fixture.cavityInfo.length; i++) {
        fixture.cavityInfo[i].serial = '';
        fixture.cavityInfo[i].runStatus = {};
      }
      fixture.run_status = false;
      fixture.progress = 0;
      fixture.execution_id = '';
    };
    /**
     * Get a report for a cavity during/afer execution
     * @param fixture
     * @param cavity
     */
    self.cavityReport = function (fixture,serial_number,cavity_id) {
      report = ReportService.cavityReport(fixture.execution_id, fixture.pn, serial_number , cavity_id);
      report.success(function (data, status, headers, config) {
        //self.error = data;
        self.reportData = data;
        self.openModal();
      }).error(function (data, status, headers, config) {
        console.log(data);
        self.debug = data.debug;
        self.error = data.error;
      });
    };
    /**
     * get a report for the whole fixture during/after execution
     * @param fixture
     * @param cavity
     */
    self.fixtureReport = function (fixture) {
      if (!fixture.execution_id) {
        return;
      }
      report = ReportService.fixtureReport(fixture.execution_id, fixture.pn);
      report.success(function (data, status, headers, config) {
        //self.error = data;
        self.reportData = data;
        self.openModal();
      }).error(function (data, status, headers, config) {
        console.log(data);
        self.debug = data.debug;
        self.error = data.error;
      });
    };

    self.openModal = function () {
      var modalInstance = $modal.open({
        templateUrl: '/static/src/tester/views/report_modal/report_modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function () {
            return self.reportData;
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
    self.fixtureContainer = {};
    self.errorContainer = {};
    FixtureService.loadFixtures(self.fixtureContainer, self.errorContainer, false );


    self.open = function (data) {

      var modalInstance = $modal.open({
        templateUrl: '/static/src/tester/views/report_modal/report_modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          data: function () {
            return {data: data};
            //return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (data) {
        var resp = angular.copy(data);
        console.log(resp);
        resp.method = 'response';
        resp.msg.value = true;
        resp.type = 'private_message';
        WsClient.sendMessage(resp);
        console.log('Selected True');
      }, function (data) {
        var resp = angular.copy(data);
        resp.method = 'response';
        resp.msg.value = true;
        resp.type = 'private_message';
        WsClient.sendMessage(resp);
        console.log('Selected false');
      });
    };
    self.tfTesterInteractionCallback = function (data) {
      console.log('in userInteractionCallback');

      console.log(data);
      //swal(data.msg.title, data.msg.message, "OK");
      alert(data.msg.message);
      //self.open(data);
      var resp = angular.copy(data);

      resp.method = 'response';
      resp.msg.value = true;
      resp.type = 'private_message';
      console.log(resp);
      WsClient.sendMessage(resp);
      //$scope.$apply();
    };
    WsClient.setCallback('tf_tester_interaction', self.tfTesterInteractionCallback);

  }

  angular.module('ate.tester')
    .controller('DeveloperController', ['$scope', '$http', '$modal', 'RunnerService', 'FixtureService',
      'BatchService', 'WsClient', 'AutoTest', 'PseudoRunnerService', 'SerialService',
      'ReportService', 'ReportModalService', DeveloperController]);
}());
