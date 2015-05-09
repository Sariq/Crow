(function () {
  function StepListController($route,StepAdmin) {
    var self = this;

    self.projectId = '';
    self.project = false;
    self.info = StepAdmin.info;

    try{
      self.projectId = $route.current.params.projectId;
      StepAdmin.getProject(self.projectId)
    }catch(e){
      console.log('no project in rout params')
    }

    
    
    self.steps = StepAdmin.query();


    
     self.remove = function (step) {
        console.log(step);
        console.log(step._id);
        step.$remove({_id: step._id}, function () {
          self.steps = StepAdmin.query();
        });
      };
  }

  angular.module('ate.admin')
    .controller('StepListController', ['$route','StepAdmin',StepListController]);
}());
