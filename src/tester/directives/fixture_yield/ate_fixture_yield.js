(function () {

    function ateFixtureYield() {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/fixture_yield/ate_fixture_yield.html',
            link: function (scope, element, attr) {
                scope.getProgressBarPass = function () {
                    return (scope.fixture.stats.passed /
                        (scope.fixture.stats.passed + scope.fixture.stats.failed)) * 100.0;
                };
                scope.getProgressBarFail = function () {
                    return (scope.fixture.stats.failed /
                        (scope.fixture.stats.passed + scope.fixture.stats.failed)) * 100.0;
                };

                scope.getCircleProgressBarYield = function () {
                    scope.size = 40;
                    scope.progress = (scope.fixture.stats.passed /
                        (scope.fixture.stats.passed + scope.fixture.stats.failed));
                    scope.strokeWidth = 10;
                    if (scope.progress <= 0.90) {
                        scope.stroke = '#FF0000';
                    }
                    if ((scope.progress > 0.90) && (scope.progress < 0.95)) {
                        scope.stroke = '#FF8F00';
                    }
                    if (scope.progress >= 0.95) {
                        scope.stroke = '#12FF00';
                    }

                    scope.counterClockwise = '';
                }
            }
        }
    }
    angular.module('ate.tester')
        .directive('ateFixtureYield', [ateFixtureYield]);
}());