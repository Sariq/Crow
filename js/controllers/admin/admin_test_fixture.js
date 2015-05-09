'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor').controller('AdminTestFixturesController',
  ['$scope', '$resource', 'TestFixtureAdmin',
    function ($scope, $resource, TestFixtureAdmin) {
      $scope.testFixtures = TestFixtureAdmin.query();

      $scope.remove = function (tf) {
        console.log(tf);
        console.log(tf._id);
        tf.$remove({_id: tf._id}, function () {
          $scope.testFixtures = TestFixtureAdmin.query();
        });
      };
    }
  ])

  .controller('AdminTestFixtureEditController',['$scope','$route', '$resource','$location',
    'TestFixtureAdmin','StationAdmin',
    function ($scope,$route, $resource, $location, TestFixtureAdmin,StationAdmin) {
      $scope.os = ['linux','windows'];
      $scope.stages = ['DOCS','TF', 'QL', 'Production'];
      $scope.locations = ['apc', 'afula'];
      $scope.stations = StationAdmin.query({list_for_fixtures:1});
      $scope.hasId = function(){
        if ($scope.testFixture){return true;}
        else{return false;}
      };
      console.log($route.current.params.testFixtureId);

      $scope.testFixture = TestFixtureAdmin.get({_id: $route.current.params.testFixtureId});
      $scope.save = function () {
        $scope.setCavities();
          $scope.testFixture.$update(function (response) {
            if (response.status == 0) {
              $location.path('admin/test_fixtures');
            } else {
              $scope.error = response.error;
              $scope.debug = response.debug;
            }
          });
      };
      $scope.setCavities = function(){
        $scope.testFixture.cavityInfo = [];
        for (var i=0;i<$scope.testFixture.cavities;i++){
          $scope.testFixture.cavityInfo.push({active:true,idx:i});
        }
      };
    }

  ])
  .controller('AdminTestFixtureAddController',['$scope', '$resource','$location', 'TestFixtureAdmin','StationAdmin',
    function ($scope, $resource, $location, TestFixtureAdmin,StationAdmin) {
      $scope.error = '';
      $scope.testFixture = {
        _id:'',
        name: '',
        ip_address: '',
        device: '',
        os: '',
        vertical_cavities: 4,
        horizontal_cavities: 1,
        cavities: 4,
        station:'',
        cavityInfo: []
      };
      $scope.hasId = function(){
        if ($scope.testFixture){return true;}
        else{return false;}
      };
      $scope.os = ['linux','windows'];
      $scope.stages = ['DOCS','TF', 'QL', 'Production'];
      $scope.locations = ['apc', 'afula'];
      $scope.stations = StationAdmin.query({list_for_fixtures:1});

      $scope.isValid = function(){

        if (!$scope.testFixture.ip_address){
          $scope.error= "ip_address Is mandatory";
          return false
        }
        return true;
      };
      $scope.setCavities = function(){
        $scope.testFixture.cavityInfo = [];
        for (var i=0;i<$scope.testFixture.cavities;i++){
          $scope.testFixture.cavityInfo.push({active:true,idx:i});
        }
      };

      $scope.save = function () {
        $scope.setCavities();
        var tf = new TestFixtureAdmin($scope.testFixture);
        tf.$save(function (response) {
          if (!$scope.isValid()){
            return false;
          }
          console.log(response);
          if (response.status == 0) {
            $location.path('admin/test_fixtures');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };

    }
  ]);
