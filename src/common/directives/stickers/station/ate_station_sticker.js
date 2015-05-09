(function () {
    function ateStationSticker() {
        return {
            restrict: 'E',
            templateUrl: '/static/src/common/directives/stickers/station/ate_station_sticker.html',
            link: function (scope, element, attr) {
                scope.devMode = true;
                /**
                 *
                 * @returns {string}
                 */
                scope.getCss = function () {
                    if (!scope.cavity.enabled) {
                        return 'cavity-disabled'
                    }
                    try {
                        return 'cavity-' + scope.cavity.status;
                    } catch (e) {
                        return 'cavity-idle'
                    }
                };
                    scope.getHostName = function () {
                    return location.hostname;
                }
            }
        }
    }

    angular.module('ate.common')
        .directive('ateStationSticker', [ateStationSticker]);
}());