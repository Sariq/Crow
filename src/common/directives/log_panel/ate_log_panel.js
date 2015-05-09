(function () {
    function ateLogPanel(LoggerService) {
        return {
            restrict: 'E',
            templateUrl: '/static/src/common/directives/log_panel/ate_log_panel.html',
            link: function (scope, element, attr) {
                /**
                 *
                 * @returns {string}
                 */
                scope.logs = LoggerService.logs;

                scope.level = '';
                scope.search = {
                    level: 1,
                    entity: '',
                    txt: '',
                    duration: 0
                };
                scope.levels = LoggerService.levels;
                scope.example = {};
                scope.logExample = function () {
                    LoggerService.log(
                        scope.example.level,
                        scope.example.txt,
                        scope.example.entity,
                        {some: 'data'},
                        scope.example.duration
                    );
                };
                /**
                 * return css class for a log table line
                 * @param level
                 * @returns {string}
                 */
                scope.getLineClass = function (level) {
                    switch (level) {
                        case 1:
                            return '';
                        case 2:
                            return 'info';
                        case 3:
                            return 'warning';
                        case 4:
                            return 'danger';
                    }
                    return '';
                };
                /**
                 * Converts level code to name
                 *
                 * @param level
                 * @returns name of level
                 */
                scope.getLevelName = function (level) {
                    try{
                        return scope.levels[level - 1].name;
                    }catch(e){
                        return 'undefined';
                    }

                };

                scope.searchLog = function (item) {
                    if (item.level < scope.search.level) {
                        return false;
                    }
                    if (item.entity && item.entity.indexOf(scope.search.entity) == -1) {
                        return false;
                    }
                    if (item.txt && item.txt.indexOf(scope.search.txt) == -1) {
                        return false;
                    }
                    if(scope.search.duration > 0 && item.duration < scope.search.duration) {
                        return false;
                    }
                    if(scope.search.duration > 0 && !item.duration) {
                        return false;
                    }
                    return true;
                };
            }
        }
    }
    angular.module('ate.common')
        .directive('ateLogPanel', ['LoggerService', ateLogPanel]);
}());