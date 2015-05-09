(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/configurations', {
        templateUrl: '/static/src/admin/configuration/views/list/list.html',
        controller: 'ConfigurationListController',
        controllerAs: 'list',
        permission:'admin_configuration'

      })
      .when('/configurations/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/configuration/views/list/list.html',
        controller: 'ConfigurationListController',
        controllerAs: 'list',
        permission:'admin_configuration'

      })
      .when('/configuration/:stageId', {
        templateUrl: '/static/src/admin/configuration/views/list/list.html',
        controller: 'ConfigurationListController',
        controllerAs: 'list',
        permission:'admin_configuration'

      })
      .when('/configuration/add', {
        templateUrl: '/static/src/admin/configuration/views/add/add.html',
        controller: 'ConfigurationAddController',
        controllerAs: 'add',
        permission:'admin_configuration'

      })

      .when('/configuration/add/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/configuration/views/add/add.html',
        controller: 'ConfigurationAddController',
        controllerAs: 'add',
        permission:'admin_configuration'

      })

      .when('/configuration/edit/:configurationId', {
        templateUrl: '/static/src/admin/configuration/views/add/add.html',
        controller: 'ConfigurationAddController',
        controllerAs: 'add',
        permission:'admin_configuration'
      })
      .when('/configuration/edit/:configurationId/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/configuration/views/add/add.html',
        controller: 'ConfigurationAddController',
        controllerAs: 'add',
        permission:'admin_configuration'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
