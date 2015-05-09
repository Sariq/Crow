(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/test_fixtures', {
        templateUrl: '/static/src/monitor/test_fixture/views/list/list.html'

      })
      .when('/test_fixture/add', {
        templateUrl: '/static/src/monitor/test_fixture/views/add/add.html',
        controller: 'test_fixtureAddController',
        controllerAs: 'add'

      })
      .when('/test_fixture/edit/:test_fixtureId', {
        templateUrl: '/static/src/monitor/test_fixture/views/add/add.html',
        controller: 'test_fixtureAddController',
        controllerAs: 'add'
      })
  }
  angular.module('ate.monitor')
    .config(['$routeProvider',routes])

}());
