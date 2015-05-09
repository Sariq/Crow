(function () {

  function FixtureService($resource) {
    var self = this;
    self.fixtureResource = $resource('/monitor/api/test_fixture',{},
      {update: {method: 'PUT'}}
    );
    self.query =function(){
     return self.fixtureResource.query();
    };


  }

  angular.module('ate.monitor')
    .service('FixtureService', ['$resource',FixtureService])
}());