(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/servers', {
        templateUrl: '/static/src/monitor/server/views/list/list.html'

      })
      .when('/server/add', {
        templateUrl: '/static/src/monitor/server/views/add/add.html',
        controller: 'serverAddController',
        controllerAs: 'add'

      })
      .when('/server/edit/:serverId', {
        templateUrl: '/static/src/monitor/server/views/add/add.html',
        controller: 'serverAddController',
        controllerAs: 'add'
      })
  }
  angular.module('ate.monitor')
    .config(['$routeProvider',routes])

}());
