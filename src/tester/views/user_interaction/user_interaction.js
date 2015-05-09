(function () {

  function UserInteractionModalController($scope, $modalInstance, data) {
    var self = this;
    $scope.data = data.data;

    $scope.ok = function () {
      $modalInstance.close($scope.data);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss($scope.data);
    };
  }

  angular.module('ate.tester')
    .controller('UserInteractionModalController', ['$scope', '$modalInstance', UserInteractionModalController]);
}());