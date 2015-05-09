(function () {

  function StationService($resource) {

    var self = this;
    self.stationResource = $resource('/tester/api/station',{},
      {update: {method: 'PUT'}}
    );
    self.getStation = function () {
      return self.stationResource.get();
    };

  }

  angular.module('ate.tester')
    .service('StationService', ['$resource',StationService]);
}());