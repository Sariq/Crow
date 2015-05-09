'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor')

.controller('MonitorController', ['$scope', 'WsClient',
        'MonitorStation','MonitorFixture','MonitorUser','MonitorServer',
    function ($scope, WsClient,MonitorStation,MonitorFixture,MonitorUser,MonitorServer) {
      //A list of stations to be monitored
      $scope.stations = MonitorStation.query();
      $scope.fixtures = MonitorFixture.query();
      $scope.users = MonitorUser.query();
      $scope.servers = MonitorServer.query();


      //a call back handle stations notifications
      $scope.stationCallback = function(data){
        //stations notifications
        for(var i=0;i<$scope.stations.lenght;i++){
          if (data.station._id == $scope.stations[i]._id){
            $scope.stations[i].status = data.station.status;
          }
        }
        //as the call is recieved from outside angular we have to update the scope manually
        $scope.$apply();
      };

      WsClient.setCallback('station',$scope.stationCallback);

    }
  ]
);