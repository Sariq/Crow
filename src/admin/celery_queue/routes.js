(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/celery_queue', {
        templateUrl: '/static/src/admin/celery_queue/celery_queue.html',
        controller: 'CeleryQueueAdmin',
        controllerAs: 'celery' ,
        permission:'celery_queue_admin'

      })

  }
  angular.module('ate.admin')
    .config(['$routeProvider',routes])

}());
