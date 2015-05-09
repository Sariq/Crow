(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/stations', {
        templateUrl: '/static/src/admin/station/views/list/list.html',
        controller: 'StationListController',
        controllerAs: 'list',
        permission:'admin_stations'

      })

      .when('/station/add', {
        templateUrl: '/static/src/admin/station/views/add/add.html',
        controller: 'StationAddController',
        controllerAs: 'add',
        permission:'admin_stations'

      })
      .when('/station/edit/:stationId', {
        templateUrl: '/static/src/admin/station/views/add/add.html',
        controller: 'StationAddController',
        controllerAs: 'add',
        permission:'admin_stations'
      })
      .when('/station/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/station/views/list/list.html',
        controller: 'StationListController',
        controllerAs: 'list',
        permission:'admin_stations'

      })
      .when('/station/add/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/station/views/add/add.html',
        controller: 'StationAddController',
        controllerAs: 'add',
        permission:'admin_stations'

      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
