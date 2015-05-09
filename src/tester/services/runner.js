(function () {

  function RunnerService($http) {
    var self = this;

    /**
     * Asks the  server to Test Sequence
     * @param fixture
     * @param batch_conf
     */
    self.runTse = function (fixture, batch_conf) {
      var rmt_srv = {
        ip_address: fixture.ip_address,
        host: fixture.host,
        pn: fixture.pn,
        os: fixture.os,
        location: fixture.location
      };
      var data = {
        fixture_id: fixture.pn, cavity: {},
        configuration: batch_conf,
        rmt_srv: rmt_srv
      };
      console.log('runTse');
      console.log(data);
      //console.log(fixture);
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
      fixture.error = '';
      console.log(data);
      $http.put('/tester/api/station', data).
        success(function (data, status) {
          console.log(data);
        }).
        error(function (data, status) {
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
    self.calcFixtureProgress = function (fixture, cavities) {
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

    return self;

  }

  angular.module('ate.tester')
    .service('RunnerService', ['$http', RunnerService])
}());
