(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/stations', {
        templateUrl: '/static/src/monitor/station/views/list/list.html'

      })
      .when('/station/add', {
        templateUrl: '/static/src/monitor/station/views/add/add.html',
        controller: 'stationAddController',
        controllerAs: 'add'

      })
      .when('/station/edit/:stationId', {
        templateUrl: '/static/src/monitor/station/views/add/add.html',
        controller: 'stationAddController',
        controllerAs: 'add'
      })
  }
  angular.module('ate.monitor')
    .config(['$routeProvider',routes])

}());
