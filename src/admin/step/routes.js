(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/steps/:projectId', {
        templateUrl: '/static/src/admin/step/views/list/list.html',
        controller: 'StepListController',
        controllerAs: 'list'

      })
      .when('/step/add/:projectId', {
        templateUrl: '/static/src/admin/step/views/add/add.html',
        controller: 'StepAddController',
        controllerAs: 'add'

      })
      .when('/step/edit/:stepId', {
        templateUrl: '/static/src/admin/step/views/edit/edit.html',
        controller: 'StepEditController',
        controllerAs: 'edit'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
