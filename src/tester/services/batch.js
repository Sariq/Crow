(function () {
  /**
   * Batch service - handles batch validation and configuration
   * @param $resource
   * @constructor
   */
  function BatchService($resource, $cookies, $location) {


    var self = this;
    self.batch = {
      batch_number: '',
      pn_cfg: '',
      pn_cfg_rev: '',
      batch_eval: false,
      batch_conf: {}
    };

    self.setBatchCookies = function (batch_number, pn_cfg, pn_cfg_rev) {
      $cookies.batch_number = batch_number;
      $cookies.pn_cfg = pn_cfg;
      $cookies.pn_cfg_rev = pn_cfg_rev;
    };

    self.getBatchFromCookies = function () {
      if (($cookies.batch_number) || ($cookies.pn_cfg && $cookies.pn_cfg_rev)) {
        self.batch.batch_number = $cookies.batch_number;
        self.batch.pn_cfg = $cookies.pn_cfg;
        self.batch.pn_cfg_rev = $cookies.pn_cfg_rev;
      }else {
        $location.path('/batch');
      }
       if (true){
        var req = self.evaluateBatch($cookies.batch_number,
          $cookies.pn_cfg,
          $cookies.pn_cfg_rev);
        req.$promise.then(function (response) {
          if (response.status == 0) {
            self.batch.batch_conf = response.data;
            self.batch.batch_eval = true;
          } else {
            $location.path('/batch');
          }
        });
      } else {
        $location.path('/batch');
      }

    };


    self.batchResource = $resource('/tester/api/batch', {},
      {update: {method: 'PUT'}}
    );
    /**
     * Evaluate batch number or a configuration (pn_cfg, pn_cfg_rev) with the server
     * @param batch_number
     * @param pn_cfg
     * @param pn_cfg_rev
     * @returns {*}
     */
    self.evaluateBatch = function (batch_number, pn_cfg, pn_cfg_rev) {
      return self.batchResource.get({batch_number: batch_number, pn_cfg: pn_cfg, pn_cfg_rev: pn_cfg_rev});
    };
    return self;
  }

  angular.module('ate.tester')
    .service('BatchService', ['$resource', '$cookies', '$location', BatchService]);
}());
