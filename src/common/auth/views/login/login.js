(function () {
    /**
     * Login Controller using the following services:
     * @param $http
     * @param $location
     * @param AuthService
     * @constructor
     */
    function LoginController($scope, $cookieStore, $http, $location, $cookies, $timeout, AuthService) {
        var self = this;
        self.username = '';
        self.password = '';
        self.error = '';
        self.debug = '';
        self.next = '';
        self.afterLogin = function () {
            $location.path('/');
        };
        /**
         * Login with username password & load user's permissions
         *
         * User permissions are stored in AuthService so they are accessible to all other contollers
         */
        self.login = function () {

            var data = {username: self.username, password: self.password};
            $http.post('/accounts/api/login', data).success(function (data, status, headers, config) {
                console.log(data);
                if (data.status == 0) {

                    self.error = '';
                    self.debug = '';
                    //Store permission and username in the  AuthService
                    AuthService.setPermissions(data.permission);
                    AuthService.setUsername(self.username);

                    //AuthService.setLoggedIn(true);
                    console.log('login success');
                    //console.log(document.cookie);
                    //$timeout(self.afterLogin,1000);
                    //$cookieStore.put("ate_user",self.username)
                    //AuthService.setLoginSuccess();
                    $location.path('/home');

                } else {

                    //self.error = data.error;
                    self.error = 'Server Error - please contact a technician';
                    self.debug = data.debug;
                    self.username = '';
                    self.password = '';
                    console.log('login fail');
                }
            }).error(function (data, status, headers, config) {
                self.error = 'Server Error - please contact a technician';
                self.debug = data;
            });
        };
        self.logout = function () {
            console.log('logout');
            var data = {};
            $http.put('/accounts/api/login', data).success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                console.log(data);
                if (data.status == 0) {
                    //delete $rootScope.userProfile;
                    //console.log($cookieStore.get('ate_user_prof'));
                    $cookieStore.remove('myFavorite');
                    $location.path('/login');
                    //console.log(document.cookie);
                } else {
                    console.log(data)
                }

            }).error(function (data, status, headers, config) {
                console.log(data)
            });
        };

        self.isLoggedIn = function () {
            return AuthService.isLoggedIn();
        }
    }

    angular.module('ate.common')
        .controller('LoginController', ['$scope', '$cookieStore', '$http', '$location', '$cookies', '$timeout', 'AuthService', LoginController]);
}());