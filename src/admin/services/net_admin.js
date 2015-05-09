(function () {

  function FlexibleDoc($http) {

    var self = this;

    self.methodName = function () {
      return $http.get(url);
    };

  }

  angular.module('appName')
    .service('FlexibleDoc', ['$http',FlexibleDoc])
}());