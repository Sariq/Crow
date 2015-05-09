(function () {

  function ateStatisticPanel($location) {
    return {
      restrict: 'E',
      templateUrl: '/static/src/tester/directives/statistic_panel/ate_statistic_panel.html',
      link: function (scope, element, attr) {
        /**
         *
         * @returns {string}
         */
        scope.getCss = function () {
          if(!scope.cavity.enabled){
            return 'cavity-disabled'
          }
          try {
            return 'cavity-' + scope.cavity.status;
          } catch (e) {
            return 'cavity-idle'
          }
        };
        scope.changeBatch = function(){
          $location.path('/batch');
        };
      }
    }
  }

  angular.module('ate.tester')
    .directive('ateStatisticPanel', ['$location', ateStatisticPanel]);
}());