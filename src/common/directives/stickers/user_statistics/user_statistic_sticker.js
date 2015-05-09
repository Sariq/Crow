(function () {

    function userStatisticSticker($location) {
        return {
            restrict: 'E',
            templateUrl: '/static/src/common/directives/stickers/user_statistics/user_statistic_sticker.html',
            link: function (scope, element, attr) {
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
                scope.changeBatch = function () {
                    $location.path('/batch');
                };

                scope.yieldColors = function () {
                    if (scope.station.userStats.yield > 95) {
                        return 'label-success'
                    }
                    if (scope.station.userStats.yield < 95 && scope.station.userStats.yield >= 92)  {
                        return 'label-warning'
                    }
                    if (scope.station.userStats.yield < 92) {
                        return 'label-danger'
                    }
                    return 'label-info'
                }
            }
        }
    }

    angular.module('ate.common')
        .directive('userStatisticSticker', ['$location', userStatisticSticker]);
}());