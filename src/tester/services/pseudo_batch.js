(function () {
  /**
   * A pseudo batch validator
   * @constructor
   */
  function PseudoBatchService() {

    var self = this;
    /**
     * Validates batch - only '8888' is accepted as valid
     * @param batchNumber
     * @returns {boolean}
     */
    self.validateBatch = function(batchNumber){
      if (batchNumber == '8888'){
        return true;
      }else{
        return false;
      }
    };


  }

  angular.module('ate.tester')
    .service('PseudoBatchService', [PseudoBatchService]);
}());