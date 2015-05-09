(function () {

  function FlexibleDoc($http) {

    return function ($http, meta, base_url) {
      var self = this;

      self.query = function(){

      };
      self.get = function(id){

      };
      self.create = function(){

      };
      self.save = function(obj){

      };
      self.delete = function(obj){

      };

    };
  }


  angular.module('app.admin')
    .factory('FlexibleDoc',['$http',FlexibleDoc])
}());