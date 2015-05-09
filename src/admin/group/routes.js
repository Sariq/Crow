(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/groups', {
        templateUrl: '/static/src/admin/group/views/list/list.html',
        controller: 'GroupListController',
        controllerAs: 'list',
        permission:'admin_groups'

      })
      .when('/group/add', {
        templateUrl: '/static/src/admin/group/views/add/add.html',
        controller: 'GroupAddController',
        controllerAs: 'add',
        permission:'admin_groups'

      })
      .when('/group/edit/:groupId', {
        templateUrl: '/static/src/admin/group/views/add/add.html',
        controller: 'GroupAddController',
        controllerAs: 'add',
        permission:'admin_groups'

      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
