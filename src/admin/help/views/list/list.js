(function () {
    function HelpListController($http, HelpAdmin) {
        var self = this;
        console.log(HelpAdmin);
        self.info = HelpAdmin.info;

        /**
         * updates help list
         */
        self.query = function () {
            $http.get('/admin/api/help').success(function (response) {
                if (response.status == 0) {
                    self.helps = response.data;

                } else {
                    self.error = response.data
                }
            });
        }
        self.query();
        /**
         * deletes help from db
         * @param help
         */
        self.remove = function (help) {
            $http.delete('/admin/api/help?_id=' + help._id).success(function (response) {
                if (response.status == 0) {
                    self.query();
                } else {
                    alert(angular.toJson(response))
                    self.error = response.data
                }
            });
        };
    }

    angular.module('ate.admin')
        .controller('HelpListController', ['$http', 'HelpAdmin', HelpListController]);
}());
