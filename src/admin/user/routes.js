(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/users', {
        templateUrl: '/static/src/admin/user/views/list/list.html',
        controller: 'UserListController',
        controllerAs: 'list',
        permission:'admin_users'

      })
      .when('/user/add', {
        templateUrl: '/static/src/admin/user/views/add/add.html',
        controller: 'UserAddController',
        controllerAs: 'add',
        permission:'admin_users'

      })
      .when('/user/edit/:userId', {
        templateUrl: '/static/src/admin/user/views/add/add.html',
        controller: 'UserAddController',
        controllerAs: 'add',
        permission:'admin_users'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
