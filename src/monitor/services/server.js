(function () {

  function ServerService($resource) {

    var self = this;
    self.serverResource = $resource('/monitor/api/server',{},
      {update: {method: 'PUT'}}
    );
    self.query =function(){
     return self.serverResource.query(); 
    };
    

  }

  angular.module('ate.monitor')
    .service('ServerService', ['$resource',ServerService])
}());