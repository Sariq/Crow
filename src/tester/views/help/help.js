(function () {

  function HelpController() {
    var self = this;
    self.log = function (info) {
      console.console.log(info);
    };
  }
  angular.module('ate.tester')
    .controller('HelpController', [HelpController]);
}());
