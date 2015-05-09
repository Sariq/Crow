/*

 */

(function () {

    function ateAutoFocus($timeout) {
        return {
            link: function (scope, element, attrs) {
                attrs.$observe("ateAutoFocus", function (newValue) {
                    if (newValue == 'true') {
                        $timeout(function () {
                            element[0].focus()
                        });
                    }
                });
            }
        }
    }

    angular.module('ate.tester')
        .directive('ateAutoFocus', ['$timeout', ateAutoFocus]);
}());

