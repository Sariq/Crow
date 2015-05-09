/*

 Service handling fixture for directive

 Get info


 */

(function () {
    function ateFixture($rootScope, BarcodeReaderService) {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/fixture/ate_fixture.html',
            link: function (scope, element, attr) {
                scope.passedBar = {
                    value: null,
                    max: 100,
                    type: 'success'
                };
                scope.failedBar = {
                    value: null,
                    max: 100,
                    type: 'danger'
                };

                scope.cavityIndex = 0;

                /**
                 * jumps to the next cavity
                 */
                scope.$on('right', function (e, fixtureIndex) {
                    if (scope.$index == fixtureIndex) {
                        if ((scope.cavity_array[0].length - 1) == ( scope.cavityIndex)) {
                            scope.cavityIndex = -1;
                        }
                        (scope.cavityIndex)++;
                        if(BarcodeReaderService.fixturesArr[fixtureIndex].cavities[scope.cavityIndex].enabled==false){
                        BarcodeReaderService.disabledCavity=true;}
                        $rootScope.$broadcast('cavityFocus', fixtureIndex);

                    }
                });
                  /**
                 * jumps to the prev cavity
                 */
                scope.$on('left', function (e, fixtureIndex) {
                    if (scope.$index == fixtureIndex) {
                        if (0 == ( scope.cavityIndex)) {
                            scope.cavityIndex = (scope.cavity_array[0].length)
                        }
                        scope.cavityIndex--;
                        if(BarcodeReaderService.fixturesArr[fixtureIndex].cavities[scope.cavityIndex].enabled==false){
                        BarcodeReaderService.disabledCavity=true;}
                        $rootScope.$broadcast('cavityFocus', fixtureIndex);

                    }
                });
                /**
                 * Get Fixture container CSS
                 * Fixture container width should be set by number of vertical cavities
                 * @returns {string}
                 */
                scope.cavity_array = [];
                scope.getContainerCss = function () {

                    console.log('setting fixture by fixture count' + scope.fixture.config.cavities);

                    //return 'col-lg-'+scope.fixture.config.cavities;
                    return '';
                };
                /**
                 * Ger css class for fixture panel
                 * @returns {string}
                 */
                scope.getPanelCss = function () {
                    switch (scope.fixture.status) {
                        case 'idle':
                            return 'panel-info';
                        case 'running':
                            return 'panel-primary';
                        case 'failed':
                            return 'panel-danger';
                        case 'success':
                            return 'panel-success';
                        case 'end':
                            return 'panel-success';
                        case 'tasks':
                            return 'panel-primary';
                        case 'cleanup':
                            return 'panel-info';
                        case 'starting':
                            return 'panel-info';
                    }
                    return 'panel-info'
                };

                scope.getYieldCss = function () {
                    if (scope.fixture.stats.yield < 92) {
                        //console.log('danger');
                        return 'danger';
                    }
                    if (scope.fixture.stats.yield < 95) {
                        //console.log('warning');
                        return 'warning';
                    }
                    if (scope.fixture.stats.yield >= 95) {
                        //console.log('success');
                        return 'success';
                    }
                    return ''
                };

                scope.disableClear = function () {
                    if (scope.fixture.status == 'success') {
                        return false;
                    } else {
                        return true;
                    }
                };
                scope.disableStop = function () {
                    if (scope.fixture.status == 'running') {
                        return false;
                    } else {
                        return true;
                    }
                };
                scope.disableRun = function () {
                    if (scope.fixture.status == 'running' || scope.fixture.status == 'success') {
                        return true;
                    } else {
                        return false;
                    }
                };
                scope.disableReport = function () {
                    if (scope.fixture.status != 'success') {
                        return true;
                    } else {
                        return false;
                    }
                };
                /**
                 * Show debug alert
                 * To be used only for debugging
                 */
                scope.showDebug = function () {
                    if (scope.fixture.devMode) {
                        return true;
                    } else {
                        return false;
                    }
                };

                scope.getCavitiesInRow = function () {
                    return scope.fixture.config.cavities / scope.fixture.config.horizontal_cavities;
                };

                /**
                 * changes the border color in
                 * the current fixture
                 * @returns {string}
                 */
                scope.getFixtureFocusCss = function () {
                    if (BarcodeReaderService.currentFixture == scope.$index) {
                        return 'ate-fixture-focus';
                    }
                }

                scope.getFixtureCss = function () {
                    if ((scope.getCavitiesInRow() > 0) && (scope.getCavitiesInRow() <= 6)) {
                        return 'ate-fixture-1-6' + ' ' + scope.getPanelCss();
                    }
                    if ((scope.getCavitiesInRow() > 6) && (scope.getCavitiesInRow() <= 12)) {
                        return 'ate-fixture-7-12' + ' ' + scope.getPanelCss();
                    }
                    if ((scope.getCavitiesInRow() > 12) && (scope.getCavitiesInRow() <= 20)) {
                        return 'ate-fixture-13-19' + ' ' + scope.getPanelCss();
                    }
                    if (scope.getCavitiesInRow() > 19) {
                        return 'ate-fixture-20' + ' ' + scope.getPanelCss();
                    }
                    return "Not working";
                };

                scope.getStatusBar = function () {
                    if (scope.fixture.statusBar.type == 'warning') {
                        return 'alert-warning';
                    }
                    if (scope.fixture.statusBar.type == 'success') {
                        return 'alert-success';
                    }
                    if (scope.fixture.statusBar.type == 'info') {
                        return 'alert-info';
                    }
                    if (scope.fixture.statusBar.type == 'error') {
                        return 'alert-danger';
                    }
                    return 'alert-info';
                };

                /**
                 * getCavityRow
                 *
                 */
                scope.getCavityRow = function () {
                    var start = 0;
                    var end = 0;
                    var cavity_per_line = scope.getCavitiesInRow();
                    for (var i = 0; i < scope.fixture.config.horizontal_cavities; i++) {
                        start = i * cavity_per_line;
                        end = ((i + 1) * cavity_per_line);
                        scope.cavity_array.push(scope.fixture.cavities.slice(start, end))
                    }
                };
                scope.getCavityRow();
            }
        }
    }

    angular.module('ate.tester')
        .directive('ateFixture', ['$rootScope', 'BarcodeReaderService', ateFixture]);
}());