'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor')

  .controller('MonitorFixturesController', ['$scope', '$resource', '$http', '$location', 'Station','Fixture','WsClient',
    function ($scope, $resource, $http, $location, Station,Fixture,WsClient) {
      //A list of stations to be monitored
      $scope.fixtures = Fixture.query();
      //a call back handle stations notifications
      $scope.fixtureCallback = function(data){
        //stations notifications
        //TODO: do something with the updated info
        //as the call is recieved from outside angular we have to update the scope manually
        $scope.$apply();
      };
      WsClient.setCallback('fixture',$scope.fixtureCallback);
    }
  ]
);