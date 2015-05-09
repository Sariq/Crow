(function () {

    function StationAdmin($resource) {

        var self = this;
        self.info = {
            os: ['linux', 'windows'],
            stages: ['DOCS', 'TF', 'QL', 'Production'],
            locations: ['apc', 'afula']
        };


        self.stationResource = $resource('/admin/api/station', {},
            {update: {method: 'PUT'}}
        );

        self.get = function (station_id) {
            return self.stationResource.get({_id: station_id});
        };

        self.save = function (station) {
            return self.stationResource.save();
        };

        self.create = function () {
            var station = {
                name: '',
                description: '',
                ip_address: '',
                location: '',
                deleted: false,
                department: '',
                configurations: []
            };
            return new self.stationResource(station);
        };
        /**
         * Delete a configuration
         * @param idx
         * @param station
         */
        self.deleteConfiguration = function (idx, station) {
            station.configurations.splice(idx, 1);
        };
        /**
         *
         * @param station
         */
        self.addConfiguration = function (station) {
            if (!station.configurations) {
                station.configurations = [];
            }
            station.configurations.push({
                pn_cfg: '',
                pn_cfg_rev: ''
            });
        };

        self.query = function () {
            return self.stationResource.query();
        };

        self.listStations = function () {
            return self.stationResource.query()
        };


        return self;


    }

    angular.module('ate.admin')
        .service('StationAdmin', ['$resource', StationAdmin])
}());