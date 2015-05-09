(function () {

  function StationService($resource) {

    var self = this;
    self.stationResource = $resource('/monitor/api/station',{},
      {update: {method: 'PUT'}}
    );
    self.query =function(){
     return self.stationResource.query(); 
    };
    

  }

  angular.module('ate.monitor')
    .service('StationService', ['$resource',StationService])
}());