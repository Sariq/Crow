'use strict';
/**
 * Created by davidl on 07/09/14.
 *
 * This file is is an experiment how to generate barcode reader based commands
 * the ide is that evey command will be in a square brackets like [command]
 */

angular.module('ate.monitor')

.controller('BarcodeController', ['$scope', '$timeout', '$resource', '$http', '$location',
    function ($scope,$timeout, $resource, $http, $location) {

      $scope.commands = [];
      $scope.cmd = '';
      $scope.cmdStart = false;
      $scope.checkKey = function (event) {
        console.log(event);
        if (event.which === 91) {
          console.log('Command started');
          $scope.cmdStart = true;
        }
        else if (event.which === 93){
          console.log('Command Ended');
          $scope.commands.push($scope.cmd);
          $scope.cmd ='';
          $scope.cmdStart = false;

        }
        else if ($scope.cmdStart){
          $scope.cmd += String.fromCharCode(event.which);
        }
      };

    }
  ]
);