(function () {
  function TestSequenceListController(TestSequenceAdmin) {
    var self = this;
    console.log(TestSequenceAdmin);
    self.testSequences = TestSequenceAdmin.query();
    self.projects =
     self.remove = function (testSequence) {
        console.log(testSequence);
        console.log(testSequence._id);
        testSequence.$remove({_id: testSequence._id}, function () {
          self.testSequences = TestSequenceAdmin.query();
        });
      };
  }

  angular.module('ate.admin')
    .controller('TestSequenceListController', ['TestSequenceAdmin',TestSequenceListController]);
}());
