/**
 * Created by davidl on 16/09/14.
 */
'use strict';

angular.module('ate.monitor').directive('ateFixture', function() {
  return {
    restrict: 'E',
    //scope: false,
    templateUrl: '/static/partials/directives/fixture.html'
  };
});