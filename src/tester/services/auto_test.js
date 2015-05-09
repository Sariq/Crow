(function () {

  function AutoTest($timeout) {

    var self = this;

    self.generateSerial = function () {
      //8 digit number
      return Math.floor((Math.random() * 100000000) + 1);
    };
    self.runTest = function () {
      if (countContainer.times <= 0) {
        return;
      }
      for (i = 0; i < self.fixtures.length; i++) {
        if (self.fixtures[i].run_status == 'end') {
          for (j = 0; j < fixtures.cavity.length; j++) {
            fixtures.cavity[j].serial = self.generateSerial();
          }
          self.fixtures[i].runTse();
        }

      }
    };
    self.startText = function (fixtures, countContainer) {
      self.fixtures = fixtures;
      self.countContainer = countContainer;
      while (countContainer.times > 0) {
        $timeout(self.runTest, 100);
      }
    }

  }

  angular.module('ate.tester')
    .service('AutoTest', ['$timeout',AutoTest]);
}());