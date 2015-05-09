(function () {
  function ateBox() {
    return {
      restrict: 'E',
      templateUrl: '/static/src/tester/directives/box/ate_box.html',
      link: function (scope, element, attr) {

      }
    };
  }

  angular.module('ate.packing')
    .directive('ateBox', [ateBox]);
}());