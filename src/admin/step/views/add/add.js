(function () {
  function StepAddController($location,StepAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = StepAdmin.info;
    self.step = StepAdmin.create();
    console.log(self.step);

    self.info = StepAdmin.info;

    try{
      self.projectId = $route.current.params.projectId;
      StepAdmin.getProject(self.projectId);
      self.step.project_id= self.projectId;
    }catch(e){
      console.log('no project in rout params')
    }



    self.isValid = function(){
      return true;
    };
    self.save = function () {
      if (!self.isValid()){
            return false;
       }
      self.step.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path('/steps');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
    };
  }
  angular.module('ate.admin')
    .controller('StepAddController', ['$location','StepAdmin',StepAddController]);
}());
