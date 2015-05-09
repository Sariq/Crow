'use strict';

angular.module('ate.monitor').directive('testFixture', function() {
  return {
    restrict: 'E',
    //scope: false,
    templateUrl: '/static/partials/directives/test_fixture.html'
  };
});