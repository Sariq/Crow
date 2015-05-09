(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/projectFamily/detail/:projectFamilyId', {
        templateUrl: '/static/src/admin/project_family/views/detail/detail.html',
        controller: 'ProjectFamilyDetailController',
        controllerAs: 'detail',
        permission:'admin_project_family'
      })
    .when('/projectEditor', {
        templateUrl: '/static/src/admin/project_family/views/editor/editor.html',
        controller: 'ProjectFamilyEditorController',
        controllerAs: 'editor',
        permission:'admin_project_family'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
