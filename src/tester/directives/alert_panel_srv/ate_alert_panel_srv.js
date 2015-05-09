(function () {

  function ateAlertPanelSrv(AlertService) {
    return {
      restrict: 'E',
      templateUrl: '/static/src/tester/directives/alert_panel_srv/ate_alert_panel_srv.html',
      link: function (scope, element, attr) {
        /**
         *
         * @returns {string}
         */

        scope.serverStatuses = AlertService.serverStatuses;
        scope.WebSocketStatus = AlertService.WebSocketStatus;

        scope.getSrvIcon = function(srv){
          switch(srv){
            case 'rabbitmq':
                  return 'glyphicon-bookmark';
            case 'mongodb':
                  return 'glyphicon-leaf';
            case 'celery':
                  return 'glyphicon-bookmark';
            case 'rabbitmq':
                  return 'glyphicon-tree-deciduous';
            case 'redis':
                  return 'glyphicon-compressed';

          }
          return 'glyphicon-tree-deciduous';
        };



      }
    }
  }
  angular.module('ate.tester')
    .directive('ateAlertPanelSrv', ['AlertService',ateAlertPanelSrv]);
}());