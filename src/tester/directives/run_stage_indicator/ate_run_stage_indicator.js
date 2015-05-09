(function () {

    function ateRunStageIndicator() {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/run_stage_indicator/ate_run_stage_indicator.html',
            link: function (scope, element, attr) {

            }
        }
    }
    angular.module('ate.tester')
        .directive('ateRunStageIndicator', [ateRunStageIndicator]);
}());