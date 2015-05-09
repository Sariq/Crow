(function () {
  /**
   * DevOpsService handles software updates and dev Ops operations
   *
   * @param $http
   * @returns {DevOpsService}
   * @constructor
   */
  function DevOpsService($http) {
    var self = this;

    /**
     * query TSE list
     * @param Container - an object containing the tseList
     * Returns a list of TSE with software versions
     *
     */
    self.queryTse = function (container) {

      //TODO: Make sure that the url returns a list of tse
      $http.get('/monitor/api/tse')
        .success(function (data, status, headers, config) {
          /**
           *

           TODO: make sure that server returns a disctionary with the following structure
           {status = 0 = ok any other numbe for error
           error : string to diplay to the user
           debug: debug time error
           data = a list of tse
           }
           */
          if (data.status == 0) {
            tse_container.tseList = data.data;
          } else {
            container.error = data.error;
            container.debug = data.debug;
          }
        }).error(function (data, status, headers, config) {
          container.debug = data;
          console.log(data)
        });
    };
    /**
     * updates a software for a given TSE
     * @param tse
     * @param container
     */
    self.updateTseSoftware = function (tse) {
      //TODO: Make sure that the POST url executes the update
      $http.put('/monitor/api/tse?tse_id='+tse.id)
        .success(function (data, status, headers, config) {
          /**
           *
           TODO: make sure that server returns a disctionary with the following structure
           {status = ok if process complete with success - otherwise error
           error : string to display to the user
           debug: debug time error
           data = a dictionary containing the update details
           }
           */
          if (data.status == 0) {
            tse.updateStatus = data.data;
          } else {
            tse.error = data.error;
            tse.debug = data.debug;
          }
        }).error(function (data, status, headers, config) {
          tse.debug = data;
          console.log(data)
        });
    };


    return self;
  }

  angular.module('ate.common')
    .service('DevOpsService', ['$http', DevOpsService])
}());