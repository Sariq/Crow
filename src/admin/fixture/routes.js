(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/fixtures', {
        templateUrl: '/static/src/admin/fixture/views/list/list.html',
        controller: 'FixtureListController',
        controllerAs: 'list',
        permission:'admin_fixtures'

      })
      .when('/fixtures/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/fixture/views/list/list.html',
        controller: 'FixtureListController',
        controllerAs: 'list',
        permission:'admin_fixtures'

      })
      .when('/fixtures/:stageId', {
        templateUrl: '/static/src/admin/fixture/views/list/list.html',
        controller: 'FixtureListController',
        controllerAs: 'list',
        permission:'admin_fixtures'

      })
      .when('/fixture/add', {
        templateUrl: '/static/src/admin/fixture/views/add/add.html',
        controller: 'FixtureAddController',
        controllerAs: 'add',
        permission:'admin_fixtures'

      })

      .when('/fixture/add/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/fixture/views/add/add.html',
        controller: 'FixtureAddController',
        controllerAs: 'add',
        permission:'admin_fixtures'

      })

      .when('/fixture/edit/:fixtureId', {
        templateUrl: '/static/src/admin/fixture/views/add/add.html',
        controller: 'FixtureAddController',
        controllerAs: 'add',
        permission:'admin_fixtures'
      })
      .when('/fixture/edit/:fixtureId/:projectFamilyId/:projectId/:stepId', {
        templateUrl: '/static/src/admin/fixture/views/add/add.html',
        controller: 'FixtureAddController',
        controllerAs: 'add',
        permission:'admin_fixtures'
      })

  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
