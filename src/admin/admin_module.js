(function () {
    angular.module('ate.admin', [
        'ngRoute',
        'ngResource',
        'ate.common',
        'ui.bootstrap',
        'gettext',
        'textAngular',
        'ngCookies',
        'smart-table'
    ]);

    /**
     * Check permission whenever a rout is hanged
     */
    angular.module('ate.admin')
        .run(function ($rootScope, $location, $cookies, AuthService,OperationLogService) {
            //make sure user is logged in
            if (!$cookies.ate_user) {
                $location.path("/login")
            } else {
                AuthService.getPermissions($cookies.ate_user);
                $location.path($location.path())
            }
            //whenever a rout is changing - make user that user has permission for this page
            $rootScope.$on('$routeChangeStart', function (scope, next, current) {
                //in case of refresh - the current page is undefined
                if (typeof(current) == "undefined") {
                    $location.path($location.path())
                }
                else {
                    //accessing the permissions defined in routs
                    var action = next.$$route.permission;
                    console.log(AuthService.hasPermission(action));
                    //if page requires permission and user has no permission for this page.
                    if (!(action == '') && !AuthService.hasPermission(action)) {
                        $location.path('/unauthorized');
                        //report unauthorized rout to operation log
                        OperationLogService.createOperationLog('un-authorized-rout', 'auth_client', -10, next)
                    }
                }
            });
        })
}());
