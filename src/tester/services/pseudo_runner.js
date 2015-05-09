(function () {

  function PseudoRunnerService($http) {

    var self = this;
    self.run = function(fixture_id){
      var url = '/pseudo_runner/api/run?fixture_id='+fixture_id;
      return $http.get(url);
    };
    return self;
  }

  angular.module('ate.tester')
    .service('PseudoRunnerService', ['$http',PseudoRunnerService]);
}());