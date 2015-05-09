(function () {

    function ateAlertPanel(WsClient) {
        return {
            restrict: 'E',
            templateUrl: '/static/src/tester/directives/alert_panel/ate_alert_panel.html',
            link: function (scope, element, attr) {
                /**
                 *
                 * @returns {string}
                 */
                scope.wsStatus = WsClient.status;
                scope.serverStatuses =[];

                scope.getWsCss = function () {
                    switch (scope.wsStatus) {
                        case 'Open':
                            return 'btn-success';
                        case 'Closed':
                            return 'btn-danger';
                        default :
                            return 'btn-warning';
                    }
                };

                /**
                 * onServerStatus
                 * @param data
                 */
                scope.serverStatusCallback = function (data) {
                    scope.serverStatuses = data.data;
                    //console.log(scope.serverStatuses);
                };
                /**
                 * Callback function alert open web socket
                 */
                scope.onOpenWs = function () {
                    scope.wsStatus = 'Open';

                };
                /**
                 * Callback function alert open web socket
                 */
                scope.onCloseWs = function (ev) {
                    scope.wsStatus = 'Closed';
                    scope.wsEvent = ev;
                    //console.log('onCloseWs status='+scope.wsStatus);
                    scope.$apply();
                };

                scope.getInfo = function (srv){
                    //return srv;
                    return "name:"+srv.name +'<br/> timestamp' + srv.timestamp
                };
                scope.getSrvIcon = function (srv) {
                    switch (srv) {
                        case 'rabbitmq':
                            return 'glyphicon-bookmark';
                        case 'mongodb':
                            return 'glyphicon-leaf';
                        case 'celery':
                            return 'glyphicon-bookmark';
                        case 'redis':
                            return 'glyphicon-compressed';
                    }
                    return 'glyphicon-tree-deciduous';
                };

                WsClient.setOpenCallback(scope.onOpenWs);
                WsClient.setCloseCallback(scope.onCloseWs);
                WsClient.setCallback('server_alert', scope.serverStatusCallback);
            }
        }
    }

    angular.module('ate.tester')
        .directive('ateAlertPanel', ['WsClient', ateAlertPanel]);
}());