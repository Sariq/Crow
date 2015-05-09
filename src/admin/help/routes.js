(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/helps', {
        templateUrl: '/static/src/admin/help/views/list/list.html',
        controller: 'HelpListController',
        controllerAs: 'list',
        permission:'admin_help'

      })
      .when('/help/add', {
        templateUrl: '/static/src/admin/help/views/add/add.html',
        controller: 'HelpAddController',
        controllerAs: 'add',
        permission:'admin_help'

      })
      .when('/help/edit/:helpId', {
        templateUrl: '/static/src/admin/help/views/add/add.html',
        controller: 'HelpAddController',
        controllerAs: 'add',
        permission:'admin_help'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
