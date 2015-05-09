(function () {
    function ateRunTimer() {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/run_timer/ate_run_timer.html',
            link: function (scope, element, attr) {


            }
        }
    }
    angular.module('ate.tester')
        .directive('ateRunTimer', [ateRunTimer]);
}());