(function () {
  function ateTse(DevOpsService) {
    return {
      restrict: 'E',
      templateUrl: '/static/src/common/dev_ops/directives/ate_tse/ate_tse.html',
      link: function (scope, element, attr) {
        /**
         *update
         * @returns {string}
         */
        scope.updateTseSoftware = function (tse) {
          DevOpsService.updateTseSoftware(tse);
        };
      }
    }
  }

  angular.module('ate.tester')
    .directive('ateTse', ['DevOpsService', ateTse]);
}());