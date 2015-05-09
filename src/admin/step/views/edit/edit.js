(function () {
  function StepEditController($route,$location,StepAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = StepAdmin.info;
    console.log($route.current.params.stepId);

    self.step = StepAdmin.get($route.current.params.stepId);

    console.log(self.step);

    self.isValid = function(){
      return true;
    };

    self.save = function () {
      if (!self.isValid()){
            return false;
       }
      self.step.$update(function (response) {
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
    .controller('StepEditController', ['$route','$location','StepAdmin',StepEditController]);
}());
