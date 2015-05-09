(function () {
  /**
   * TseListController tse list page
   * @param DevOpsService
   * @constructor
   */
  function TseListController(DevOpsService) {
    var self = this;
    self.tseList = [];
    DevOpsService.queryTse();
  }
  angular.module('ate.common')
    .controller('TseListController', ['DevOpsService',TseListController]);
}());
