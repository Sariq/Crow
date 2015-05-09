'use strict';
/**
 * Created by davidl on 07/09/14.
 */

angular.module('ate.monitor').controller('AdminProductConfigController',
  ['$scope', '$resource', 'ProductConfig',
    function ($scope, $resource, ProductConfig) {
      $scope.productConfigs = ProductConfig.query();
      $scope.remove = function (ProductConfig) {
        console.log(ProductConfig);
        console.log(ProductConfig._id);
        ProductConfig.$remove({_id: ProductConfig._id}, function () {
          $scope.ProductConfig = ProductConfig.query();
        });
      };
    }
  ])

  .controller('AdminProductConfigEditController', ['$scope', '$route', '$resource', '$location', 'ProductConfig',
    function ($scope, $route, $resource, $location, ProductConfig) {
      $scope.locations = ['apc', 'afula'];
      $scope.productConfig = ProductConfig.get({_id: $route.current.params.ProductConfigId});
      $scope.save = function () {
        $scope.productConfig.$update(function (response) {
          if (response.status == 0) {
            $location.path('admin/test_fixtures');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };
    }
  ])
  .controller('AdminProductConfigAddController', ['$scope', '$resource', '$location', 'ProductConfig',
    function ($scope, $resource, $location, ProductConfig) {
      $scope.error = '';
      $scope.productConfig = {
        pn_cfg:'',
        pn_cfg_rev:'',
        tse:'',
        info:''
      };
      $scope.isValid = function () {
        return true;
      };
      $scope.save = function () {
        var tf = new ProductConfig($scope.ProductConfig);
        tf.$save(function (response) {
          if (!$scope.isValid()) {
            return false;
          }
          console.log(response);
          if (response.status == 0) {
            $location.path('admin/ProductConfigs');
          } else {
            $scope.error = response.error;
            $scope.debug = response.debug;
          }
        });
      };
    }
  ]);
