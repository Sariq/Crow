(function () {

  function UserService($resource) {
    var self = this;
    self.userResource = $resource('/monitor/api/user', {},
      {update: {method: 'GET'}}
    );
    self.query = function () {
      return self.userResource.query();
    };
  }
  angular.module('ate.monitor')
    .service('UserService', ['$resource',UserService])
}());