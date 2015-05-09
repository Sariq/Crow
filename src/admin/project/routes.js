(function () {

  function routes($routeProvider) {
    $routeProvider
      .when('/projects', {
        templateUrl: '/static/src/admin/project/views/list/list.html',
        controller: 'ProjectListController',
        controllerAs: 'list'

      })
      .when('/projects/:projectFamilyId', {
        templateUrl: '/static/src/admin/project/views/list/list.html',
        controller: 'ProjectListController',
        controllerAs: 'list'
      })
      .when('/project/add/:projectFamilyId', {
        templateUrl: '/static/src/admin/project/views/add/add.html',
        controller: 'ProjectAddController',
        controllerAs: 'add'

      })
      .when('/project/edit/:projectId', {
        templateUrl: '/static/src/admin/project/views/edit/edit.html',
        controller: 'ProjectEditController',
        controllerAs: 'edit'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider', routes])

}());
