(function () {
  function ServerAddController($location,ServerAdmin,$route ) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.isNew=false;
    self.info = ServerAdmin.info;
    //self.server = ServerAdmin.create();
    console.log(self.server);
    self.serverId = $route.current.params.serverId;
    self.isValid = function(){
      return true;
    };
    
 if (self.serverId){

        self.server = ServerAdmin.get(self.serverId);
       console.log(self.server)
      }else{

        self.isNew= true;
        self.server = ServerAdmin.create();
        self.server.configuration_id = self.serverId;
      }
    
    
    
    
    self.save = function () {
      if (!self.isValid()){
            return false;
       }

       var success_url = '/servers';
      if (self.serverId){
       //  success_url = success_url+ '/'+self.serverId;

        console.log(success_url);
      }
      if (self.isNew) {

self.server.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path(success_url);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      }else {
         self.server.$update(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path(success_url);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      }
    };
    self.addService = function(){
      console.log("addService");
      console.log(self.server);
      return ServerAdmin.addService(self.server,self.service);
    };
    self.deleteService = function(idx){
      return ServerAdmin.deleteService(self.server,idx);
    };

  }
  angular.module('ate.admin')
    .controller('ServerAddController', ['$location','ServerAdmin','$route',ServerAddController]);
}());
