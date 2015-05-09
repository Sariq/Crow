'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor')

.controller('BatchNumberController', ['$scope', '$http',
    function ($scope,$http) {
      $scope.batch = '';
      $scope.sendBatch = function(){
        $http.post('/batch/',{batch_number:$scope.batch}).succsess(function(response){

        }).error(function(response){

        })
      };
    }])

.controller('StationController', ['$scope', '$timeout', '$resource', '$http', '$location', 'Station','Fixture','WsClient',
    function ($scope,$timeout, $resource, $http, $location, Station,Fixture,WsClient) {
      $scope.error = '';
      $scope.station = '';
      $scope.fixtures =[];

      $scope.stationCallback = function(data){
        $scope.station.status = data.station.status;
      };
      $scope.fixtureCallback = function(data){
        console.log('in callback');
        console.log(data);

        /*
        for (var i = 0;i<$scope.fixtures.length;i++){
          for (var j = 0;j<$scope.fixtures.length;j++){
            console.log();
            $scope.fixtures[i].cavities[0][j].status = data.list[i].cavities[j];
            $scope.$apply();
          }
        }
        */
      };
      $scope.calcFixtureProggess = function(fixture,cavities){
        var progress = 0;
        for (var i = 0; i < cavities.length; i++) {
            if (cavities[i].verdict == 'fail'){
              progress = progress+100;
            }else{
              progress = progress + cavities[i].pre;
            }
        }
        console.log(progress);
        fixture.progress = progress / fixture.cavityInfo.length;
        console.log(fixture.progress);
      };
      $scope.tseCallback = function(data){
        console.log('in tse callback');
        console.log(data);
        var fixture = false;

        for (var j = 0;j< $scope.fixtures.length;j++){
          if ($scope.fixtures[j]._id == data.info.fixture_id){
            //console.log(data.list.fixture_id);
            //console.log($scope.fixtures[j]);
            fixture = $scope.fixtures[j];
            break;
          }
        }
        fixture.run_status = data.info.stage;
        if(data.info.stage == 'start'){
          fixture.execution_id = data.info.execution_id.mongod;
        }

        if(data.info.stage=='running') {
          for (var i = 0; i < data.info.cavities.length; i++) {
            if (fixture.cavityInfo[i]) {
              fixture.cavityInfo[i].runStatus = data.info.cavities[i];
            }
          }
          $scope.calcFixtureProggess(fixture,data.info.cavities);
        }

        $scope.$apply();
      };

      $scope.getStation = function () {
        console.log('get station host:');
        console.log($location.host());
        Station.get({station_id: $location.host()},
          function (response) {
            if (response.status == 0) {
              $scope.station = response.station;
              $scope.fixtures = Fixture.query({station_id: $scope.station._id});
              //$scope.getFixtures($scope.station_id)
            } else {
              $scope.error = response.error;
            }
          }
        )
      };

      $scope.getFixtures = function (station_id) {
        Fixture.get({station_id: station_id},
          function (response) {
            if (response.status == 0) {
              console.log(response);
              $scope.fixtures = response;
              /*
              for (var i = 0;i<$scope.fixtures.length;i++){
                for (var j = 0;j<$scope.fixtures[i].cavities.length;j++){
                  for (var k =0;k<$scope.fixtures[i].cavities[j].length;k++ ){
                    $scope.fixtures[i].cavities[j][k].status = true;
                  }
                }
              }
              */
            } else {
              $scope.error = response.error;
            }
          }
        )
      };


      $scope.getStation();
      WsClient.setCallback('station',$scope.stationCallback);
      WsClient.setCallback('list',$scope.fixtureCallback);
      WsClient.setCallback('tse',$scope.tseCallback);
      $scope.getRunInfo = function(fixture){
        return {};
      };
      $scope.clearFixture = function(fixture){
        for(var i = 0;i<fixture.cavityInfo.length;i++){
          fixture.cavityInfo[i].serial  ='';
          fixture.cavityInfo[i].runStatus  ={};
        }
        fixture.run_status = false;
        fixture.progress = 0;
      };
      $scope.runTse = function(fixture){
        //fixture.success = false;

        var data = {fixture_id:fixture._id,cavity:{}};
        console.log('runTse');
        console.log(fixture);
        var idx=0;
        var state='';

        for(var i = 0;i<fixture.cavityInfo.length;i++){
          idx = i+1;
          if(fixture.cavityInfo[i].active) {
            state  = 'enabled';
          }else {
            state  = 'disabled';
          }
          data.cavity[idx.toString()] = {serial:fixture.cavityInfo[i].serial, state:state}
        }
        fixture.run_status='running';
        $scope.error = '';
        console.log(data);
        $http.put('/station',data).
        success(function(data, status) {
          console.log(data);

        }).
        error(function(data, status) {
            console.log("Request failed");
            console.log(data);
      });
      };
      $scope.getCavityStatus = function(){
        return Math.floor((Math.random() * 10) + 1);
      };

      $scope.focusNext = function () {
        SendKeys.Send("{tab}");
      };
      $scope.nextCavity = function(cavity,fixture){
        //TODO: check valid number
        //check next cavity
        //check if it is ready to run
        return cavity+1;

        /*
         console.log(fixture);
          console.log(serial);
          console.log(fixture.cavities);
          var has_next = false;
          var nextc = 0;

          for (var i=cavity+1;i<fixture.cavities;i++){
            if (fixture.cavityInfo[i].active){
              var nextc = i;
              has_next= true;
              break;
            }
          }

          if (!has_next){
            return;
          }
         */
      };
      $scope.checkRunKey = function (event,fixture) {
        console.log('checkRunKey'+event.which);
        if (!(event.which == 9)) {
          console.log('Tab was selected');
          $scope.runTse(fixture);
        }
      };
      $scope.checkKey = function (event,fixture,cavity,serial) {
        return ;
        console.log(event.which);
        if (event.which === 13) {
          var nextc = $scope.nextCavity(cavity,fixture);
          $timeout(function ()
                  {
                    //console.log('cavity_'+fixture._id+'_'+nextc);
                    var elem = document.getElementById('cavity_'+fixture._id+'_'+nextc);
                      elem.focus();
          }, 200);
        }
      };
    }
  ]
);