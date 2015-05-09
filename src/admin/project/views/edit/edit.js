(function () {
  function ProjectEditController($route,$location,ProjectAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = ProjectAdmin.info;
    console.log($route.current.params.projectId);

    self.project = ProjectAdmin.get($route.current.params.projectId);

    console.log(self.project);

    self.isValid = function(){
      return true;
    };

    self.save = function () {
      if (!self.isValid()){
            return false;
       }
      self.project.$update(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path('/projects');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
    };
  }


  angular.module('ate.admin')
    .controller('ProjectEditController', ['$route','$location','ProjectAdmin',ProjectEditController]);
}());
