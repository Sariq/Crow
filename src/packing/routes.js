(function () {

  function routes($routeProvider) {
      $routeProvider
      .when('/box', {
        templateUrl: '/static/src/packing/views/box/box.html',
        controller: 'BoxController', controllerAs:'box'
      })
      .when('/', {
        templateUrl: '/static/src/packing/views/home/home.html',
        controller: 'HomeController', controllerAs:'home'
      })
      .when('/admin', {
        templateUrl: '/static/src/packing/views/admin/admin.html',
        controller: 'AdminController', controllerAs:'admin'
      })


      .otherwise({redirectTo: '/'})
  }
  angular.module('ate.packing')
    .config(['$routeProvider',routes])
}());
