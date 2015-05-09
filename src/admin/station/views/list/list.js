(function () {
    function StationListController(StationAdmin, $route, ProjectFamilyAdmin) {
        var self = this;
        self.q = '';
        self.stations = StationAdmin.query();


        self.remove = function (station) {
            console.log(station._id);
            station.$remove({_id: station._id}, function () {
                self.stations = StationAdmin.query();
            });
        };
    }

    angular.module('ate.admin')
        .controller('StationListController', ['StationAdmin', '$route', 'ProjectFamilyAdmin', StationListController]);
}());
















