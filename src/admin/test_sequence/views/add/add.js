(function () {
  function TestSequenceAddController($location,TestSequenceAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = TestSequenceAdmin.info;
    self.testSequence = TestSequenceAdmin.create();
    console.log(self.testSequence);

    self.isValid = function(){
      return true;
    };
    self.save = function () {
      if (!self.isValid()){
            return false;
       }
      self.testSequence.$save(function (response) {
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
    .controller('TestSequenceAddController', ['$location','TestSequenceAdmin',TestSequenceAddController]);
}());
