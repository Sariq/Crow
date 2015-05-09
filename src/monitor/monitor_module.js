(function () {
  angular.module('ate.monitor',
    ['ngResource',
      'ngRoute',
      'ate.common',
      'ui.bootstrap',
      'ngPrettyJson',
      'ngTable'
    ]);
      angular.module('ate.monitor').run(function ($location, $cookies,AuthService) {
        if (!$cookies.ate_user) {
            $location.path("/login")
        } else {

            AuthService.getPermissions($cookies.ate_user);
            //$location.path($location.path())
        }
    })
    angular.module('ate.monitor').filter('orderObjectBy', function() {
      return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
          filtered.push(item);
        });
        filtered.sort(function (a, b) {
          return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
      };
    });
}());
