(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/servers', {
        templateUrl: '/static/src/admin/server/views/list/list.html',
        controller: 'ServerListController',
        controllerAs: 'list',
        permission:'admin_servers'

      })
      .when('/server/add', {
        templateUrl: '/static/src/admin/server/views/add/add.html',
        controller: 'ServerAddController',
        controllerAs: 'add',
        permission:'admin_servers'

      })
      .when('/server/edit/:serverId', {
        templateUrl: '/static/src/admin/server/views/add/add.html',
        controller: 'ServerAddController',
        controllerAs: 'add',
        permission:'admin_servers'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
