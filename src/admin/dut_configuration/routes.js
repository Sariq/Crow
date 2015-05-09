(function () {

  function routes($routeProvider) {
    $routeProvider
      .when('/dut_configurations/:configurationId', {
        templateUrl: '/static/src/admin/dut_configuration/views/list/list.html',
        controller: 'DutConfigurationListController',
        controllerAs: 'list',
        permission:'admin_dut_configuration'

      })
      .when('/dut_configuration/add/:configurationId', {
        templateUrl: '/static/src/admin/dut_configuration/views/add/add.html',
        controller: 'DutConfigurationAddController',
        controllerAs: 'add',
        permission:'admin_dut_configuration'

      })
      .when('/dut_configuration/edit/:dutConfigurationId/:configurationId', {
        templateUrl: '/static/src/admin/dut_configuration/views/add/add.html',
        controller: 'DutConfigurationAddController',
        controllerAs: 'add',
        permission:'admin_dut_configuration'
      })
      .when('/dut_configurations/:projectFamilyId/:projectId/:stepId/:configurationId', {
        templateUrl: '/static/src/admin/dut_configuration/views/list/list.html',
        controller: 'DutConfigurationListController',
        controllerAs: 'list',
        permission:'admin_dut_configuration'

      })
  }

  angular.module('ate.admin')
    .config(['$routeProvider', routes])

}());
