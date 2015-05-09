(function () {
  function ProjectAddController($route, $location, ProjectAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = ProjectAdmin.info;
    self.project = ProjectAdmin.create();
    self.projectFamilyId = '';
    self.projectFamily = false;
    try{
      self.projectFamilyId = $route.current.params.projectFamilyId;
      self.project.project_family_id = self.projectFamilyId;
      console.log(self.projectFamilyId );
      self.projectFamily = ProjectAdmin.getProjectFamily(self.projectFamilyId)
    }catch(e){
      console.log('no project Family in rout params')
    }

    console.log(self.project);

    self.isValid = function(){
      return true;
    };
    self.save = function () {
      if (!self.isValid()){
            return false;
       }
      self.project.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path('/projects/'+self.projectFamilyId);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
    };
  }
  angular.module('ate.admin')
    .controller('ProjectAddController', ['$route','$location','ProjectAdmin',ProjectAddController]);
}());
