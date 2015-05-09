'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor')

  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, data) {
    $scope.data = data.data;
    $scope.ok = function () {
      $modalInstance.close($scope.data);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss($scope.data);
    };
  })


  .controller('DeveloperController',
  ['$scope', '$timeout', '$resource', '$http', '$location', 'DevStation', 'Fixture', 'WsClient', 'BatchValidate', '$modal', '$log',
    function ($scope, $timeout, $resource, $http, $location, DevStation, Fixture, WsClient, BatchValidate, $modal, $log) {
      $scope.error = '';
      $scope.station = '';
      $scope.fixtures = [];
      $scope.q = '';
      $scope.batch_eval = true;
      $scope.batch_error = '';
      $scope.batch_number = '';
      $scope.cfg_pn = '';
      $scope.cfg_pn_rev = '';
      $scope.taskLocation = 0;
      $scope.taskLocations = [0, 1, 2, 3, 4, 5];
      $scope.batchConf = {};

      $scope.open = function (data) {

        var modalInstance = $modal.open({
          templateUrl: 'modal.html',
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

      $scope.sendBatch = function () {
        //reset batchConf
        $scope.batchConf = {};
        var url = '/api/batch/validate?batch_number='+$scope.batch_number +
          '&cfg_pn='+$scope.cfg_pn +'&cfg_pn_rev='+$scope.cfg_pn_rev;
        $http.get(url)
          //,
          //cfg_pn: $scope.cfg_pn, cfg_pn_rev: $scope.cfg_pn_rev})

          .success(function (data, status, headers, config) {
            console.log($scope.batch_number);
            console.log(data);
            if (data.status != 0){
              $scope.batch_eval = false;
              $scope.batch_error = data.error;
            }
            $scope.batchConf = data.batch_conf;
            if (data.status == 0) {
              $scope.batch_eval = true;
              $scope.batch_error = '';
            } else {
              $scope.batch_eval = false;
              $scope.batch_error = data.error;
            }

          }).error(function (data, status, headers, config) {
            console.log(data);
            $scope.batch_error = 'Server is not responding';
          });

      };

      $scope.changeBatch = function () {
        $scope.batch_number = '';
        $scope.batch_eval = false;
      };


      $scope.fixtureCallback = function (data) {
        console.log('TODO: fixtureCallback ');
      };

      $scope.calcFixtureProggess = function (fixture, cavities) {
        var progress = 0;
        for (var i = 0; i < cavities.length; i++) {
          if (cavities[i].verdict == 'fail') {
            progress = progress + 100;
          } else {
            progress = progress + cavities[i].pre;
          }
        }
        console.log(progress);
        fixture.progress = progress / fixture.cavityInfo.length;
        console.log(fixture.progress);
      };

      $scope.tseCallback = function (data) {
        console.log('in tse callback');
        console.log(data);
        var fixture = false;

        for (var j = 0; j < $scope.fixtures.length; j++) {
          if ($scope.fixtures[j]._id == data.info.fixture_id) {
            fixture = $scope.fixtures[j];
            break;
          }
        }
        if (!fixture) {
          console.log('fixture not found:' + data.info.fixture_id);
          return;
        }

        fixture.run_status = data.info.stage;
        if (data.info.stage == 'start') {
          fixture.execution_id = data.info.execution_id.mongod;
        }


        if (data.info.stage == 'running') {
          for (var i = 0; i < data.info.cavities.length; i++) {
            if (fixture.cavityInfo[i]) {
              fixture.cavityInfo[i].runStatus = data.info.cavities[i];
            }
          }
          $scope.calcFixtureProggess(fixture, data.info.cavities);
        }

        $scope.$apply();
      };

      $scope.fixtureStatsCallback = function (data) {
        console.log('fixtureStatsCallback');
        console.log(data);
        var fixture = false;

        for (var j = 0; j < $scope.fixtures.length; j++) {
          if ($scope.fixtures[j]._id == data.info.fixture_id) {
            fixture = $scope.fixtures[j];
            break;
          }
        }
        if (!fixture) {
          console.log('fixture not found:' + data.info.fixture_id);
          return;
        }
        fixture.stats = data;
        $scope.$apply();
      };

      $scope.userStatsCallback = function (data) {
        console.log('userStatsCallback');
        console.log(data);
        $scope.$apply();
      };

      $scope.tfTesterInteractionCallback = function (data) {
        console.log('in userInteractionCallback');
        //console.log(data);
        $scope.open(data);
        $scope.$apply();
      };

      $http.get('/fixture')
        .success(function (data, status, headers, config) {
          console.log('we have fixtures');
          var filters = [];
          for (var i = 0; i < data.length; i++) {
            console.log(data[i]._id);
            filters.push({entity: data[i]._id, message_types: ['all']});
          }
          WsClient.addFilters(filters);
          $scope.fixtures = data;
        }).
        error(function (data, status, headers, config) {
          console.log(data);
        });

      //$scope.fixtures = Fixture.query();
      /*
       $scope.fixtures = Fixture.query().$promise.then(function(data) {
       //console.log($scope.fixtures);
       console.log('we have fixtures');
       console.log(data);
       });
       */


      //WsClient.setCallback('list', $scope.fixtureCallback);
      WsClient.setCallback('tse', $scope.tseCallback);
      WsClient.setCallback('tf_tester_interaction', $scope.tfTesterInteractionCallback);
      WsClient.setCallback('user_stats', $scope.userStatsCallback);
      WsClient.setCallback('fixture_stats', $scope.fixtureStatsCallback);

      $scope.getRunInfo = function (fixture) {
        return {};
      };

      $scope.clearFixture = function (fixture) {
        for (var i = 0; i < fixture.cavityInfo.length; i++) {
          fixture.cavityInfo[i].serial = '';
          fixture.cavityInfo[i].runStatus = {};
        }
        fixture.run_status = false;
        fixture.progress = 0;
      };

      $scope.runTse = function (fixture) {
        //fixture.success = false;

        var data = {fixture_id: fixture._id, cavity: {}, dev_station: $scope.taskLocation};
        console.log('runTse');
        console.log(fixture);
        var idx = 0;
        var state = true;
        var serial = '';
        for (var i = 0; i < fixture.cavityInfo.length; i++) {
          idx = i + 1;
          if (fixture.cavityInfo[i].active) {
            state = true;
          } else {
            state = false;
          }
          if (fixture.cavityInfo[i].serial) {
            serial = fixture.cavityInfo[i].serial;
          } else {
            serial = '';
          }
          data.cavity[idx.toString()] = {serial: serial, state: state}
        }
        fixture.run_status = 'running';
        $scope.error = '';
        console.log(data);
        $http.put('/station', data).
          success(function (data, status) {
            console.log(data);

          }).
          error(function (data, status) {
            console.log("Request failed");
            console.log(data);
          });
      };
      $scope.getCavityStatus = function () {
        return Math.floor((Math.random() * 10) + 1);
      };

      $scope.focusNext = function () {
        SendKeys.Send("{tab}");
      };
      $scope.nextCavity = function (cavity, fixture) {
        //TODO: check valid number
        //check next cavity
        //check if it is ready to run
        return cavity + 1;
      };
      $scope.checkRunKey = function (event, fixture) {
        console.log('checkRunKey' + event.which);
        if (!(event.which == 9)) {
          console.log('Tab was selected');
          $scope.runTse(fixture);
        }
      };
      $scope.checkKey = function (event, fixture, cavity, serial) {
        return;
        console.log(event.which);
        if (event.which === 13) {
          var nextc = $scope.nextCavity(cavity, fixture);
          $timeout(function () {
            //console.log('cavity_'+fixture._id+'_'+nextc);
            var elem = document.getElementById('cavity_' + fixture._id + '_' + nextc);
            elem.focus();
          }, 200);
        }
      };
    }
  ]
);

