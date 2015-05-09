(function () {
  function TestSequenceEditController($route,TestSequenceAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = TestSequenceAdmin.info;
    console.log($route.current.params.testSequenceId);

    self.testSequence = TestSequenceAdmin.get($route.current.params.testSequenceId);

    console.log(self.testSequence);

    self.isValid = function(){
      return true;
    };

    self.save = function () {
      if (!self.isValid()){
            return false;
       }
      self.testSequence.$update(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path('/testSequences');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
    };
  }


  angular.module('ate.admin')
    .controller('TestSequenceEditController', ['$route','TestSequenceAdmin',TestSequenceEditController]);
}());
