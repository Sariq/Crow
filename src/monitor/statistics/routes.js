(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/statistics', {
        templateUrl: '/static/src/monitor/statistics/views/list/list.html'

      })
      .when('/statistics/add', {
        templateUrl: '/static/src/monitor/statistics/views/add/add.html',
        controller: 'statisticsAddController',
        controllerAs: 'add'

      })
      .when('/statistics/edit/:statisticsId', {
        templateUrl: '/static/src/monitor/statistics/views/add/add.html',
        controller: 'statisticsAddController',
        controllerAs: 'add'
      })
  }
  angular.module('ate.monitor')
    .config(['$routeProvider',routes])

}());
