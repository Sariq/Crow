(function () {

  function StatisticsService($http) {

    var self = this;
    /**
     * get fixture statistics
     * @param execution_id
     */
    self.fixtureStats = function (fixture, batch) {
      $http.get('/tester/api/stats?fixture_pn=' + fixture.config.pn +
        '&batch_number=' + batch.batch_number +
        '&pn_cfg=' + batch.pn_cfg +
        '&pn_cfg_rev=' + batch.pn_cfg_rev+
        '&stats_type=fixture'
      ).success(function (data, status, headers, config) {
          fixture.debug = data.debug;
          if (data.status ==0){
            console.log(data.data.statistics);
            fixture.stats = data.data.statistics;
          }else{
            fixture.error = data.error;
          }
        }).
        error(function (data, status, headers, config) {
          console.log(data);
          fixture.error = 'failed to load statistics for fixture';
        });
    };
    /**
     * get user statistics for today
     * @param user_id
     */
    self.userStats = function (station, batch) {
      $http.get('/tester/api/stats?batch_number=' + batch.batch_number +
        '&pn_cfg=' + batch.pn_cfg +
        '&pn_cfg_rev=' + batch.pn_cfg_rev+
        '&stats_type=user'
      ).success(function (data, status, headers, config) {
          station.debug = data.debug;
          if (data.status ==0){
            console.log(data.data.statistics);
            station.userStats = data.data.statistics;
          }else{
            station.error = data.error;
          }
        }).
        error(function (data, status, headers, config) {
          console.log(data);
          station.error = 'failed to load statistics for current user';
        });
    };
    /**
     * get batch statistics
     * @param user_id
     */
    self.batchStats = function (station, batch) {
      //batch statistics is not yet implemented on server
      station.batchStats = {yield: 100, passed: 100, failed: 0};
      $http.get('/tester/api/stats?batch_number=' + batch.batch_number +
        '&pn_cfg=' + batch.pn_cfg +
        '&pn_cfg_rev=' + batch.pn_cfg_rev+
        '&stats_type=batch'
      ).success(function (data, status, headers, config) {
          station.debug = data.debug;
          if (data.status ==0){
            console.log(data.data.statistics);
            station.batchStats = data.data.statistics;
          }else{
            station.error = data.error;
          }
        }).
        error(function (data, status, headers, config) {
          console.log(data);
          station.error = 'failed to load statistics for current user';
        });
    };

    return self;
  }

  angular.module('ate.tester')
    .service('StatisticsService', ['$http', StatisticsService]);
}());