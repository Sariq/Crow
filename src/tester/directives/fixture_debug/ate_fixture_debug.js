(function () {

  function ateFixtureDebug() {
    return {
      restrict: 'E',
      templateUrl: '/static/src/tester/directives/fixture_debug/ate_fixture_debug.html',
      link: function (scope, element, attr) {
        scope.runStatuses = ['idle', 'running', 'failed', 'success', 'active'];
        scope.cavityStatuses = ['idle', 'running', 'failed', 'success'];
      }
    }
  }
  angular.module('ate.tester')
    .directive('ateFixtureDebug', [ateFixtureDebug]);
}());