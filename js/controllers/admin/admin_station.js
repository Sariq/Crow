'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor').controller('AdminStationController',
  ['$scope', '$resource', 'StationAdmin',
    function ($scope, $resource, StationAdmin) {
      $scope.stations = StationAdmin.query();
      $scope.remove = function (station) {
        console.log(station);
        console.log(station._id);
        station.$remove({_id: station._id}, function () {
          $scope.station = StationAdmin.query();
        });
      };
    }
  ])

  .controller('AdminStationEditController', ['$scope', '$route', '$resource', '$location', 'StationAdmin',
    function ($scope, $route, $resource, $location, StationAdmin) {
      $scope.locations = ['apc', 'afula'];
      $scope.station = StationAdmin.get({ip_address: $route.current.params.ip_address});
      $scope.save = function () {
        $scope.station.$update(function (response) {
          if (response.status == 0) {
            $location.path('admin/test_fixtures');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };
    }
  ])
  .controller('AdminStationAddController', ['$scope', '$resource', '$location', 'StationAdmin',
    function ($scope, $resource, $location, StationAdmin) {
      $scope.error = '';
      $scope.station = {
        name: '',
        description: '',
        ip_address: '',
        location: '',
        department: ''
      };
      $scope.locations = ['apc', 'afula'];

      $scope.isValid = function () {
        if (!$scope.station.name) {
          $scope.error = "Name Is mandatory";
          return False
        }
        return true;
      };
      $scope.save = function () {
        var tf = new StationAdmin($scope.station);
        tf.$save(function (response) {
          if (!$scope.isValid()) {
            return false;
          }
          console.log(response);
          if (response.status == 0) {
            $location.path('admin/stations');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };
    }
  ]);
