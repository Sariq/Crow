(function () {
  function PseudoSerialService() {
    var self = this;
    self.validate = function(serial){
      if (serial.length ==8){
        return true;
      }else{
        return false;
      }
    };
  }
  angular.module('ate.tester')
    .service('PseudoSerialService', [PseudoSerialService]);
}());
