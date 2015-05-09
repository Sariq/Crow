(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/users', {
        templateUrl: '/static/src/monitor/user/views/list/list.html'

      })
      .when('/user/add', {
        templateUrl: '/static/src/monitor/user/views/add/add.html',
        controller: 'UserAddController',
        controllerAs: 'add'

      })
      .when('/user/edit/:userId', {
        templateUrl: '/static/src/monitor/user/views/add/add.html',
        controller: 'UserAddController',
        controllerAs: 'add'
      })
  }
  angular.module('ate.monitor')
    .config(['$routeProvider',routes])

}());
