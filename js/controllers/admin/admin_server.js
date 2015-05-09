'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor').controller('AdminServerController',
  ['$scope', '$resource', 'ServerAdmin',
    function ($scope, $resource, ServerAdmin) {
      $scope.servers = ServerAdmin.query();

      $scope.remove = function (server) {
        console.log(server);
        console.log(server._id);
        server.$remove({_id: server._id}, function () {
          $scope.servers = ServerAdmin.query();
        });
      };
    }
  ])

  .controller('AdminServerEditController', ['$scope', '$route', '$resource', '$location',
    'ServerAdmin',
    function ($scope, $route, $resource, $location, ServerAdmin) {
      $scope.server = ServerAdmin.get({hostname: $route.current.params.hostname});
      $scope.save = function () {
        $scope.server.$update(function (response) {
          if (response.status == 0) {
            $location.path('admin/server');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };

      $scope.os = ['linux', 'windows'];
      $scope.service_type = ['mongod', 'mongos', 'redis', 'ate_monitor',
        'rabbitmq', 'flower', 'celery_worker', 'ngnix', 'supervisor', 'nssm',
      'logstash','elastic search','kibana'];
      $scope.locations = ['apc', 'afula'];

      $scope.addService = function () {
        $scope.server.services.push({type: '', version: '', instances: 1, port: '', monitor_url: '', comments: '', config: ''});
      };
      $scope.deleteService = function (idx) {
        $scope.server.services.splice(idx,1);
      };

      $scope.save = function () {
        $scope.server.$update(function (response) {
          if (response.status == 0) {
            $location.path('admin/server');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };

    }

  ])
  .controller('AdminServerAddController', ['$scope', '$resource', '$location',
    'ServerAdmin',
    function ($scope, $resource, $location, ServerAdmin) {
      $scope.error = '';
      $scope.server = {ip: '',
        host: '',
        comments: '',
        os: '',
        location: '',
        active: true,
        services: [
          {type: '', version: '', instances: 1, port: '', monitor_url: '',log_url: '', comments: '', config: ''}
        ]
      };

      $scope.os = ['linux', 'windows'];
      $scope.service_type = ['mongod', 'mongos', 'redis', 'ate_monitor',
        'rabbitmq', 'flower', 'celery_worker', 'ngnix', 'supervisor', 'nssm',
      'logstash','elastic search','kibana'];
      $scope.locations = ['apc', 'afula'];

      $scope.addService = function () {
        $scope.server.services.push({type: '', version: '', instances: 1, port: '', monitor_url: '', comments: '', config: ''});
      };
      $scope.deleteService = function (idx) {
        $scope.server.services.splice(idx,1);
      };

      $scope.isValid = function () {
        return true;
      };
      $scope.save = function () {

        var server = new ServerAdmin($scope.server);
        server.$save(function (response) {
          if (!$scope.isValid()) {
            return false;
          }
          console.log(response);
          if (response.status == 0) {
            $location.path('admin/server');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };

    }
  ]);
