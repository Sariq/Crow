(function () {
  'use strict';
  /**
   * Preference Modal controller
   * @param $scope
   * @param $modalInstance
   * @constructor
   */
  function PreferenceModalController($scope, $modalInstance, ThemeService, LanguageService) {
    var self = this;
    $scope.devMode = false;
    $scope.language = LanguageService.getuiLanguage();
    //we get theme from rootScope
    //$scope.theme = false;
    $scope.loadExerciseHelp = function () {
      //load exercise help from database
    };

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.getThemes = function () {
      return ThemeService.getThemes();
    };
    $scope.setTheme = function (theme) {
      return ThemeService.setTheme(theme);
    };
    $scope.toggleDevMode = function () {
      //$scope.devMode = !$scope.devMode;
    };
    $scope.getLanguages = function () {
      return LanguageService.getLanguages();
    };
    $scope.setUiLanguage = function () {
      console.log('setUiLanguage:' + $scope.language);
      return LanguageService.setUiLanguage($scope.language);
    };
    $scope.printModal = function(){
      print();
    }


  }

  /**
   * ModalHelpService
   * A simple service that opens modal help
   * @param $modal
   * @constructor
   */
  function PreferenceModalService($modal) {
    var self = this;


    /**
     * preference - open preference modal
     * @param help_id
     */
    self.preference = function () {
      //console.log(self.info);
      var modalInstance = $modal.open({
        templateUrl: '/static/src/common/preference/preference.html',
        controller: 'PreferenceModalController',
        controllerAs: 'pref',
        size: 'lg'
      });
      modalInstance.result.then(function () {
        console.log('preference modal closed');
      });
    };
  }

  angular.module('ate.common')
    .controller('PreferenceModalController',
    ['$scope', '$modalInstance', 'ThemeService', 'LanguageService', PreferenceModalController]);

  angular.module('ate.common')
    .service('PreferenceModalService',
    ['$modal', PreferenceModalService]);
}());