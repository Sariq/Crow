(function () {
    angular.module('ate.tester',
        ['ngResource',
            'ngRoute',
            'ui.bootstrap',
            'ate.common',
            'gettext',
            'ngPrettyJson',
            'ngSanitize',
            'ngCookies',
            'angular-progress-arc'
        ]);


    angular.module('ate.tester').run(function ($location, $cookies,AuthService,ProfileService) {

        if (!$cookies.ate_user) {
            $location.path("/login")
        } else {
            AuthService.getPermissions($cookies.ate_user);
            ProfileService.loadProfile($cookies.ate_user);
            $location.path("/station")
        }
    })



}());
