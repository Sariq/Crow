(function () {
    function HelpAddController($http, $location, HelpAdmin, $route, LanguageService) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = LanguageService.getLanguages();

        self.helpId = $route.current.params.helpId;
        self.isValid = function () {
            return true;
        };
        /*
         * check if Edit/Add clicked
         */
        if (self.helpId) {
            $http.get('/admin/api/help?help_id=' + self.helpId).success(function (response) {
                if (response.status == 0) {
                    self.help = response.data;
                } else {
                    self.error = response.data
                }
            });

        } else {

            self.isNew = true;
            self.help = HelpAdmin.create();
        }
        /**
         *Save/Update Help data
         */
        self.save = function () {
            if (!self.isValid()) {
                return false;
            }
            var success_url = '/helps';
            if (self.helpId) {
                console.log(success_url);
            }
            if (self.isNew) {
                $http.post('/admin/api/help', self.help).success(function (response) {
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            } else {
                $http.put('/admin/api/help', self.help).success(function (response) {
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            }
        };

    }

    angular.module('ate.admin')
        .controller('HelpAddController', ['$http', '$location', 'HelpAdmin', '$route', 'LanguageService', HelpAddController]);
}());
