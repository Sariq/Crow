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
      $scope.list = [
        {
          "id": 1,
          "title": "1. dragon-breath",
          "items": []
        },
        {
          "id": 2,
          "title": "2. moiré-vision",
          "items": [
            {
              "id": 21,
              "title": "2.1. tofu-animation",
              "items": [
                {
                  "id": 211,
                  "title": "2.1.1. spooky-giraffe",
                  "items": []
                },
                {
                  "id": 212,
                  "title": "2.1.2. bubble-burst",
                  "items": []
                }
              ],
            },
            {
              "id": 22,
              "title": "2.2. barehand-atomsplitting",
              "items": []
            }
          ],
        },
        {
          "id": 3,
          "title": "3. unicorn-zapper",
          "items": []
        },
        {
          "id": 4,
          "title": "4. romantic-transclusion",
          "items": []
        }
      ];


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

      $scope.newSubItem = function (item) {
        items.push({
          id: 'some id',
          title: 'new items',
          items: []
        });
      };

      $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
          ul: "a1",
          li: "a2",
          liSelected: "a7",
          iExpanded: "a3",
          iCollapsed: "a4",
          iLeaf: "a5",
          label: "a6",
          labelSelected: "a8"
        }
      }
      $scope.dataForTheTree =
        [
          { "name": "Joe", "age": "21", "children": [
            { "name": "Smith", "age": "42", "children": [] },
            { "name": "Gary", "age": "21", "children": [
              { "name": "Jenifer", "age": "23", "children": [
                { "name": "Dani", "age": "32", "children": [] },
                { "name": "Max", "age": "34", "children": [] }
              ]}
            ]}
          ]},
          { "name": "Albert", "age": "33", "children": [] },
          { "name": "Ron", "age": "29", "children": [] }
        ];

    }
  ]);
