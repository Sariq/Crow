(function () {

    function ateFixtureButtons() {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/fixture_buttons/ate_fixture_buttons.html',
            link: function (scope, element, attr) {
                /**
                 *
                 * @type {string}
                 */
                scope.status = 'ready';
                scope.focusStatus = false;
                scope.setStatus = function (status) {
                    scope.status = status;
                    console.log(status);
                };

                scope.getRunCss = function(fixture){
                    if (scope.fixture.ready_for_run){
                        return 'btn-success';
                    }else{
                        return 'btn-default';
                    }
                }

                scope.changeFocusStatus = function () {
                    scope.focusStatus = true;
                }
                /**
                 * runs the current Fixture
                 */
                scope.$on('run', function (e, fixtureNumber) {
                    scope.focusStatus = false;
                    if (scope.$index == fixtureNumber) {
                        scope.focusStatus = true;
                        scope.station.runTse(scope.fixture);
                    }
                });
                /**
                 * stops the current Fixture
                 */
                scope.$on('stop', function (e, fixtureNumber) {
                    scope.focusStatus = false;
                    if (scope.$index == fixtureNumber) {
                        scope.focusStatus = true;
                        scope.station.stopTse(scope.fixture);
                    }
                });
            }
        }
    }
    angular.module('ate.tester')
        .directive('ateFixtureButtons', [ateFixtureButtons]);
}());