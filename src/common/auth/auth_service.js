(function () {
  /**
   * AuthService handles user permissions
   *
   * @param $http
   * @returns {AuthService}
   * @constructor
   */
  function AuthService($http, $cookies, $location, $rootScope) {
    var self = this;
    self.permissions = [];
    self.username = '';

    self.resolveLocation = function (action) {
      if (!action) {
        return true;
      } else {
        if (!self.isLoggedIn()) {
          $location.path("/login");
        } else if (!self.hasPermission(action)) {
          $location.path("/no_permission");
        } else {
          return true;
        }
      }
    };
    /**
     * Check if a page requires login
     * @returns {boolean}
     */
    self.requireLogin = function () {
      if (!self.isLoggedIn()) {
        console.log('requireLogin : Loggin is false');
        $location.path("/login");
      } else {
        return true;
      }
    };
    self.isLoggedIn = function () {
      if (self.username){
        return true;
      }else if ($cookies.ate_user) {
        //console.log('user is logged in');
        //console.log($cookies.ate_user);
        return true;
      } else {
        //console.log('user is logged out');
        return false;
      }
    };


    self.getUsername = function(){

      return $cookies.ate_user;

    };
    /**
     * can use perform a certain action
     *
     * @param action
     * @returns {boolean}
     */

    self.hasPermission = function (action) {
      if (self.permissions.indexOf(action) >= 0) {
        return true;
      } else {
        return false;
      }
    };
    /**
     * Add hasPermission to rootScope - so it can be access anywhere
     * @param action
     * @returns {boolean}
     */
    $rootScope.hasPermission = function(action){
      return self.hasPermission(action)
    };
    /**
     * sets user permissions
     * @param permissions
     */
    self.setPermissions = function (permissions) {
      self.permissions = angular.copy(permissions);
    };
    /**
     * set username
     *
     * @param username
     */
    self.setUsername = function (username) {
      self.username = username;

    };
    /**
     * set login status true or false
     * @param status
     */
    self.setLoggedIn = function (status) {
    };
    /**
     * logout a user and
     * @param next - a url to navigate after the logout
     */
    self.logout = function (next) {
      //self.username = '';
      if (!next) {
        next = '/login'
      }
      var data = {};

      $http.put('/accounts/api/login', data)
        .success(function (data, status, headers, config) {
          self.username = '';
          self.permissions = [];
          self.username = '';
          console.log(data);
          if (data.status == 0) {
            $location.path(next);
          } else {
            console.log(data)
          }
        }).error(function (data, status, headers, config) {
          self.username = '';
          console.log(data)
        });
    };

    self.getPermissions = function (username) {

      $http.get('/accounts/api/login?_id=' +username)
        .success(function (response) {
          if (response.status == 0) {
            console.log(response.data);
            self.permissions = response.data;
          } else {
            self.error = response.data
          }
        });
    };


    return self;
  }

  angular.module('ate.common')
    .service('AuthService', ['$http', '$cookies', '$location','$rootScope', AuthService])
}());