(function () {

  var isLoggedIn = function (AuthService) {
    return AuthService.requireLogin();
  };


  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/src/tester/views/station/station.html',
        controller: 'StationController',
        controllerAs: 'station'
      })
      .when('/login', {
        templateUrl: '/static/src/common/auth/views/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'

      })
      .when('/help', {
        templateUrl: '/static/src/tester/views/help/help.html',
        controller: 'HelpController',
        controllerAs: 'help'
      })
      .when('/developer', {
        templateUrl: '/static/src/tester/views/developer/developer.html',
        controller: 'DeveloperController',
        controllerAs: 'developer',
        resolve: {
          factory: isLoggedIn
        }
      })
      .when('/station', {
        templateUrl: '/static/src/tester/views/station/station.html',
        controller: 'StationController',
        controllerAs: 'station',
        resolve: {
          factory: isLoggedIn
        }

      })
      .when('/pseudo_station', {
        templateUrl: '/static/src/tester/views/pseudo_station/pseudo_station.html',
        controller: 'PseudoStationController',
        controllerAs: 'station',
        resolve: {
          factory: isLoggedIn
        }

      })
      .when('/batch', {
        templateUrl: '/static/src/tester/views/batch/batch.html',
        controller: 'BatchController',
        controllerAs: 'batch',
        resolve: {
          factory: isLoggedIn
        }

      })
      .otherwise({redirectTo: '/station'});
  }


  angular.module('ate.tester')
    .config(['$routeProvider', routes]);
}());
