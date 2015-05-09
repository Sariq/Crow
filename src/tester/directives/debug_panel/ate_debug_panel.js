/*

 */

(function () {

    function ateDebugPanel() {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/debug_panel/ate_debug_panel.html',
            link: function (scope, element, attr) {
                scope.showDebug = true;
            }
        }
    }
    angular.module('ate.tester')
        .directive('ateDebugPanel', [ateDebugPanel]);
}());