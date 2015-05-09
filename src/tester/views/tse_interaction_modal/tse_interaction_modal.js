(function () {

  angular.module('ate.tester').controller('TseModalInstanceCtrl', function ($scope, $modalInstance,$timeout, items) {

    $scope.items = items;
    console.log('TseModalInstanceCtrl');
    console.log(items);
    console.log(items.timeout);
    /**
     *
     * @param option
     */
    $scope.selectOption = function(option){
      var response = {value:option,
                timeout_triggered:false};

      $modalInstance.close(response);
    };

    $scope.closeModal = function(){
      var response = {timeout_triggered:false};
      $modalInstance.close(response);
    };

    /**
     * close this modal when timeout has reached
     * @param option
     */
    $scope.callTimeout = function(){
      var response = {value:null,
                timeout_triggered:true};
      $modalInstance.close(response);
    };
    $timeout($scope.callTimeout, items.timeout);

  });


}());