(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/test_sequences', {
        templateUrl: '/static/src/admin/test_sequence/views/list/list.html',
        controller: 'TestSequenceListController',
        controllerAs: 'list'

      })
      .when('/test_sequences/:projectId', {
        templateUrl: '/static/src/admin/test_sequence/views/list/list.html',
        controller: 'TestSequenceListController',
        controllerAs: 'list'

      })
      .when('/test_sequence/add', {
        templateUrl: '/static/src/admin/test_sequence/views/add/add.html',
        controller: 'TestSequenceAddController',
        controllerAs: 'add'

      })
      .when('/test_sequence/edit/:test_sequenceId', {
        templateUrl: '/static/src/admin/test_sequence/views/edit/edit.html',
        controller: 'TestSequenceEditController',
        controllerAs: 'edit'
      })
  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
