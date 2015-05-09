(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/reports', {
        templateUrl: '/static/src/monitor/report/views/list/list.html'

      })
      .when('/report/add', {
        templateUrl: '/static/src/monitor/report/views/add/add.html',
        controller: 'reportAddController',
        controllerAs: 'add'

      })
      .when('/report/edit/:reportId', {
        templateUrl: '/static/src/monitor/report/views/add/add.html',
        controller: 'reportAddController',
        controllerAs: 'add'
      })
  }
  angular.module('ate.monitor')
    .config(['$routeProvider',routes])

}());
