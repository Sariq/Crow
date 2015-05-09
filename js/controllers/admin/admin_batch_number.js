'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor').controller('AdminBatchNumberController',
  ['$scope', '$resource', 'BatchNumberAdmin',
    function ($scope, $resource, BatchNumberAdmin) {
      $scope.q = '';
      $scope.batch_numbers = BatchNumberAdmin.query();
    }
  ]);

