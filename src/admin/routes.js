(function () {

    var isLoggedIn = function (AuthService) {
        return AuthService.requireLogin();
    };

    function routes($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/static/src/admin/views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'home',
                permission: ''
                /*,
                resolve: {
                    factory: isLoggedIn
                }*/
            })
            .when('/unauthorized', {
                templateUrl: '/static/src/common/auth/views/unauthorized.html',
                permission: ''
            })
            .when('/login', {
                templateUrl: '/static/src/common/auth/views/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                permission: ''

            })

            .otherwise({redirectTo: '/home'})
    }

    angular.module('ate.admin')
        .config(['$routeProvider', routes])
}());
