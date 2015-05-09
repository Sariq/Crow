(function () {
  /**
   * A batch dialog controller
   * @param BatchService: evaluates batch and returns setup object
   * @constructor
   */
  function BatchController($location, BatchService) {
    var self = this;
    self.batch = BatchService.batch;

    self.error = '';
    self.debug = '';

    /**
     * Evaluate the batch number entered by the user
     */
    self.evaluateBatch = function () {
      //delete previous batch_conf
      delete self.batch.batch_conf;
      var req = BatchService.evaluateBatch(self.batch.batch_number,
        self.batch.pn_cfg,
        self.batch.pn_cfg_rev);
      req.$promise.then(function (response) {
        self.debug = response.debug;
        if (response.status == 0) {
          self.batch.batch_conf = response.data;
          self.batch.batch_eval = true;
          BatchService.setBatchCookies(self.batch.batch_number, self.batch.pn_cfg, self.batch.pn_cfg_rev);
          $location.path('/station');
        } else {
          self.error = response.error;
        }
      });
    };
  }

  angular.module('ate.tester')
    .controller('BatchController', ['$location', 'BatchService', BatchController]);
}());
