(function () {
    /** Station Controller
     *
     * @param $location:
     * @param StationAdmin: Service
     * @constructor
     */
    function StationAddController($location, $scope, StationAdmin, $route) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = StationAdmin.info;

        /**
         * controller initialization
         */
        self.init = function () {
            self.stationId = $route.current.params.stationId;
            if (self.stationId) {
                self.station = StationAdmin.get($route.current.params.stationId);
                self.station.$promise.then(function (result) {
                    self.isNew = false;
                });

            } else {
                self.isNew = true;
                self.station = StationAdmin.create();
            }
        };
        self.init();

        /**
         * test if station can be saved
         * TODO: add functionality to this function
         * @returns {boolean}
         */
        self.isValid = function () {
            return true;
        };


        /**
         *Adding configuration for station
         * @param station
         * @returns {*}
         */

        self.addConfiguration = function () {
            return StationAdmin.addConfiguration(self.station);
        };

        /**
         * deletes a configuration from a station
         * @param idx
         * @param station
         */
        self.deleteConfiguration = function (idx) {
            StationAdmin.deleteConfiguration(idx, self.station);
        };
        /**
         * save function - saves current station
         * different functionality for new (add)station and existing (edit) station
         * @returns {boolean}
         */
        self.save = function () {
            if (!self.isValid()) {
                //TODO: add readable error to the user
                return false;
            }
            var success_url = '/stations';
            if (self.configurationId) {
                success_url = success_url + '/' + self.station;
                console.log(success_url);
            }
            //are we adding a  new station document or editing an existing one
            if (self.isNew) {
                //use $save for new station
                self.station.$save(function (response) {
                    console.log(response);
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            } else {
                //use $update for existing station
                self.station.$update(function (response) {
                    console.log(response);
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
        .controller('StationAddController', ['$location', '$scope', 'StationAdmin', '$route', StationAddController]);
}());







