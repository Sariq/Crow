'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor').controller('AdminUsersController', ['$scope', '$resource', 'User',
    function ($scope, $resource, User) {
      $scope.newUser = {username: '', admin: false, tech_support: false, dev: false};
      //var User = $resource('/users/admin');
      $scope.users = User.query();

      $scope.addUser = function () {
        var user = new User($scope.newUser);
        user.$save(function (response) {
          console.log(response);
          $scope.users = User.query();
        });
        $scope.newUser = {username: '', admin: false, tech_support: false, dev: false};
      };
      $scope.update = function (usr) {
        console.log(usr);
        console.log(usr.username);
        usr.$update({username: usr.username}, function () {
          $scope.users = User.query();
        });
      };
      $scope.remove = function (usr) {
        console.log(usr);
        console.log(usr.username);
        usr.$remove({username: usr.username}, function () {
          $scope.users = User.query();
        });
      };


    }]
);
