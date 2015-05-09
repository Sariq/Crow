(function () {
  /**
   * Report service - requests reports after/during execution
   * @param $resource
   * @constructor
   */
  function ReportService($http) {

    var self = this;
    /**
     * Get a report for a single cavity
     * @param execution_id
     * @param cavity_id the cavity for the report number
     * @returns a $resource instance
     */
    self.cavityReport = function (execution_id,fixture_id,serial_number, cavity_id) {
      var cav_id = cavity_id+1;
      var cavity = {
        name:''+cav_id,
        horizontal: 0,
        vertical:0
      };
      var data = {

        execution_id:execution_id,
        fixture_id:fixture_id,
        cavity_id: cavity,
        serial_number:serial_number,
        mtype:'cavity_report'
      };
      //var url = '/tester/api/report?execution_id='+execution_id +'&fixture_id='+fixture_id +'&cavity_id='+cavity_id;
      return $http.post('/tester/api/report',data);
    };
    /**
     * Get a report for a full fixture
     * @param execution_id
     * @param fixture_id
     * @returns {*}
     */
    self.fixtureReport = function (execution_id,fixture_id){
      var data = {
        execution_id:execution_id,
        fixture_id:fixture_id,
        mtype:'fixture_report'
      };
      //var url = '/tester/api/report?execution_id='+execution_id +'&fixture_id='+fixture_id;
      return $http.post('/tester/api/report',data);
    };
  }

  angular.module('ate.tester')
    .service('ReportService', ['$http', ReportService]);
}());

