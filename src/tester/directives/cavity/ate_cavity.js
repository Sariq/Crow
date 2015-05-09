(function () {
    function ateCavity($rootScope, BarcodeReaderService, $timeout) {
        return {

            restrict: 'E',

            templateUrl: '/static/src/tester/directives/cavity/ate_cavity.html',
            link: function (scope, element, attr) {
                /**
                 *
                 * @returns {string}
                 */

                    //sariTest
                scope.focusStatus = false;
                scope.getCss = function () {
                    if (!scope.cavity.enabled) {
                        return 'alert-default'
                    }
                    if (scope.cavity.status == "running") {
                        return 'alert-warning'
                    }
                    if (scope.cavity.status == "idle") {
                        return 'alert-info'
                    }
                    if (scope.cavity.status == "failed") {
                        return 'alert-danger'
                    }
                    if (scope.cavity.status == "success") {
                        return 'alert-success'
                    }
                    if (scope.cavity.status == "active") {
                        return 'alert-info'
                    }
                    return 'info'
                };

                scope.getSerialCss = function () {
                    if (!scope.cavity.enabled) {
                        return '';
                    }
                    if (!scope.cavity.valid && !scope.cavity.serial) {
                        scope.fixture.statusBar.description = 'Need to fill all serial numbers in cavities';
                        scope.fixture.statusBar.type = 'warning';
                        return 'has-warning';
                    }
                    if (!scope.cavity.valid) {
                        scope.fixture.statusBar.description = 'Entered wrong serial number';
                        scope.fixture.statusBar.type = 'error';
                        return 'has-error';
                    }
                    if (scope.cavity.valid) {
                        scope.fixture.statusBar.description = 'Serial number valid';
                        scope.fixture.statusBar.type = 'info';
                        return 'has-success';
                    }

                };

                scope.getSerialGlyphCss = function () {
                    if (!scope.cavity.enabled) {
                        return '';
                    }
                    if (!scope.cavity.valid && !scope.cavity.serial) {
                        return 'glyphicon-warning-sign';
                    }
                    if (!scope.cavity.valid) {
                        return 'glyphicon-remove';
                    }
                    if (scope.cavity.valid) {
                        return 'glyphicon-ok';
                    }
                    return ''
                };

                /**
                 *
                 * @param serial
                 * @returns {boolean}
                 */
                scope.validate_serial = function (serial) {
                    return true;
                };

                /**
                 * enable or disable a cavity
                 */
                scope.toggleEnabled = function () {
                    if (scope.fixture.runStatus.state == 'running'){
                        return;
                    }
                    if ((scope.fixture.runStatus.state == 'clear') || (scope.fixture.runStatus.state == 'ready')) {
                        if (scope.cavity.enabled) {
                            scope.cavity.enabled = false;
                        } else {
                            scope.cavity.enabled = true;
                        }
                    }
                    else {
                        return;
                    }
                    scope.station.evaluateSerial(scope.fixture);
                };
                /**
                 *
                 * @returns {boolean}
                 */
                scope.disableSerialInput = function () {
                    if (scope.cavity.status == 'idle' && scope.cavity.enabled) {
                        return false;
                    } else {
                        return true;
                    }
                };
                /**
                 *
                 * @returns {boolean}
                 */
                scope.enableReport = function () {
                    if ((scope.fixture.runStatus.state == 'stop') && (scope.cavity.enabled == true)) {
                        return true;
                        /*
                        if ((scope.cavity.status == 'success') ||
                            (scope.cavity.status == 'failed')) {
                            return true;
                        } else {
                            return false;
                        }
                        */
                    } else {
                        return false;
                    }
                };
                /**
                 * open a modal window with cavity report
                 */
                scope.cavityReport = function () {

                };
                /**
                 * Evaluate fixture
                 */
                scope.evaluateLocalSerial = function(serial,fixture){
                    //alert(serial);
                    //console.log(scope.station.batch.batch_conf.configuration.info.rules.serial_regex);
                    //rule = scope.station.batch.batch_conf.configuration.info.rules.serial_regex;
                    //because rule was not compliant with javascript - we create it temporary one
                    //TODO: make sure that the rule is compliant with javascript
                    rule = '^(' + scope.station.batch.batch_conf.configuration.info.rules.serial_regex + ')$';
                    var re = new RegExp(rule);
                    //var re = /^((\d{6})|(\d{7})|(\d{8}))$/;
                    if (serial.match(re)){
                        //console.log('Serial Is matching rule'+serial);
                        scope.station.evaluateSerial(fixture);
                    }else{
                        scope.cavity.valid = false;
                        scope.fixture.ready_for_run = false;
                    }
                };
                
                /**
                 * on focus change saves the
                 * cavity+fixture index
                 */
                scope.changeFocusStatus = function () {
                    scope.focusStatus = true;
                    scope.$parent.$parent.cavityIndex = scope.$index;
                    scope.fixtureIdxKeyBoard = scope.$parent.$parent.$index;
                    BarcodeReaderService.currentFixture = scope.$parent.$parent.$index;
                }
                /**
                 * on Blur turn cavity focus to false
                 * and checks if the next cavity is
                 * not disabled then remove focus from
                 * fixture(border color) and update
                 * that the next cavity is not disabled
                 * (the "if" is for focus issue)
                 */
                scope.onBlur = function () {
                    scope.focusStatus = false;
                    if (!BarcodeReaderService.disabledCavity) {
                        BarcodeReaderService.currentFixture = -1;
                        BarcodeReaderService.disabledCavity = false;
                    }

                }


                /**
                 * disable the current cavity
                 */
                scope.$on('disable', function (e, fixtureNumber) {
                    if (scope.$parent.$parent.$index == fixtureNumber && scope.$index == scope.$parent.$parent.cavityIndex) {
                        scope.toggleEnabled()
                    }
                });
                /**
                 * enable the current cavity
                 * (timeout for focus issue)
                 */
                scope.$on('enable', function (e, fixtureNumber) {
                    if (scope.$parent.$parent.$index == fixtureNumber && scope.$index == scope.$parent.$parent.cavityIndex) {
                        scope.toggleEnabled()
                        scope.focusStatus = false;
                        $timeout(function () {
                            scope.focusStatus = true;
                        });
                    }
                });

                /**
                 * checks which cavity to
                 * focus on
                 * (the cavity enabled "if" is for
                 * focus issue)
                 */
                scope.$on('cavityFocus', function (e, fixtureNumber) {
                    scope.focusStatus = false;
                    if (scope.$parent.$parent.$index == fixtureNumber && scope.$index == scope.$parent.$parent.cavityIndex) {
                        if (scope.cavity.enabled == false) {
                            BarcodeReaderService.currentFixture = BarcodeReaderService.currentFixtureDis;
                        }
                        scope.focusStatus = true;
                    }
                });
                /**
                 * insert the input from the barcode Reader
                 */
                scope.$on('insertInput', function (e, fixtureNumber, input) {
                    if (scope.$parent.$parent.$index == fixtureNumber) {
                        if (scope.$index == scope.$parent.$parent.cavityIndex) {
                            scope.cavity.serial = input;
                        }
                        if ((scope.$parent.$parent.cavity_array[0].length - 1) == (scope.$index) && scope.focusStatus == true) {
                            scope.$parent.$parent.cavityIndex = 0;
                            scope.focusStatus = false;
                            event.preventDefault()

                        }
                    }
                })
                /**
                 * delete text from the current cavity
                 */
                scope.$on('delete', function (e, fixtureNumber, input) {
                    if (scope.$parent.$parent.$index == fixtureNumber && scope.$index == scope.$parent.$parent.cavityIndex) {
                        scope.cavity.serial = '';
                    }
                })
            }
        }
    }

    angular.module('ate.tester')
        .directive('ateCavity', ['$rootScope', 'BarcodeReaderService', '$timeout', ateCavity]);
}());