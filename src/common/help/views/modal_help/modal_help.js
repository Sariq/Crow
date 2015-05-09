(function () {
    'use strict';
    /**
     * Modal help controller
     * @param $scope
     * @param $modalInstance
     * @param helpInfo
     * @constructor
     */
    function ModalHelpController($sce, $http, $scope, $modalInstance, helpInfo, LanguageService) {
        var self = this;
        console.log(helpInfo);
        $scope.helpInfo = helpInfo;
        $scope.help = {};
        $scope.uiLanguage = LanguageService.getuiLanguage();

        $scope.loadHelp = function () {
            //load exercise help from database

            $http.get('/api/help?help_id=' + helpInfo.help_id).success(function (data) {
                if (data.status == -1) {
                    $scope.error = data.error;
                } else {
                  if (data.languages){
                    for (var i = 0; i < data.languages.length ; i++) {
                        if (data.languages[i].language_code == LanguageService.getuiLanguage()) {
                            $scope.helpInfo.title = data.languages[i].title;
                            $scope.helpInfo.content = $sce.trustAsHtml(data.languages[i].content);
                            break;
                        }
                    }
                  }else{
                    $scope.helpInfo.title = 'missing help';
                    $scope.helpInfo.content = 'no help for ' +helpInfo.help_id ;
                  }


                }

            }).error(function (data) {
                $scope.error = data.error;
            });

        };
        $scope.loadHelp();
        $scope.ok = function () {
            $modalInstance.close();
        };

    }

    /**
     * ModalHelpService
     * A simple service that opens modal help
     * @param $modal
     * @constructor
     */
    function ModalHelpService($modal) {
        var self = this;
        self.info = {};

        /**
         * Load exercise help modal
         *
         */

        self.modalHelp = function (help_id) {
            //todo: get help from database - based on current language

            console.log("help Id - " + help_id);
            var helpInfo = {
                title: '',
                content: '',
                help_id: help_id
            };
            console.log(self.info);
            var modalInstance = $modal.open({
                templateUrl: '/static/src/common/help/views/modal_help/modal_help.html',
                controller: 'ModalHelpController',
                size: 'lg',
                resolve: {
                    helpInfo: function () {
                        return helpInfo;
                    }
                }
            });
            modalInstance.result.then(function () {
                console.log('help closed');
            });
        }
    }

    angular.module('ate.common')
        .controller('ModalHelpController',
        ['$sce', '$http', '$scope', '$modalInstance', 'helpInfo', 'LanguageService', ModalHelpController]);

    angular.module('ate.common')
        .service('ModalHelpService',
        ['$modal', ModalHelpService]);
}());