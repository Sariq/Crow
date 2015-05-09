(function () {
    function StationListController(StationAdmin, $route, ProjectFamilyAdmin) {
        var self = this;
        console.log(StationAdmin);
        self.stations = StationAdmin.query();


        self.projectFamilies = ProjectFamilyAdmin.query();
        self.projectFamilies.$promise.then(function (arr) {
        });
        self.projects = [];
        self.steps = [];
        self.project_family_id = '';
        self.project_id = '';
        self.step_id = '';

        try {
            self.project_family_id = $route.current.params.projectFamilyId;
            self.project_id = parseInt($route.current.params.projectId);
            self.step_id = parseInt($route.current.params.stepId);

        } catch (e) {
            console.log($route.current.params);
            console.log('Missing project arguments');
        }

        self.projectFamilies.$promise.then(function (result) {
            self.projectFamiliesChange(false);
            self.projectChange(false);
        });


        self.projectFamiliesChange = function (clean) {

            console.log('projectFamiliesChange');
            for (var i = 0; i < self.projectFamilies.length; i++) {
                if (self.projectFamilies[i]._id == self.project_family_id) {
                    self.projects = self.projectFamilies[i].projects;
                    if (clean) {
                        self.step_id = '';
                        self.project_id = '';
                    }
                }
            }
        };

        self.projectChange = function (clean) {

            for (var i = 0; i < self.projectFamilies.length; i++) {

                if (self.projectFamilies[i]._id == self.project_family_id) {
                    if (self.projectFamilies[i].length != 0) {
                        for (var j = 0; j < self.projectFamilies[i].projects.length; j++) {
                            if (self.project_id == self.projectFamilies[i].projects[j].id) {
                                self.steps = self.projectFamilies[i].projects[j].steps;
                                if (clean) {
                                    self.step_id = '';
                                }
                            }
                        }
                    }
                }
                if (self.project_id == null) {
                    self.project_id = '';
                }
            }
        };

        self.stepChange = function (clean) {
            if (self.step_id == null) {
                self.step_id = '';
            }

        };


        self.remove = function (station) {
            console.log(station);
            console.log(station._id);
            station.$remove({_id: station._id}, function () {
                self.stations = StationAdmin.query();
            });
        };
    }

    angular.module('ate.admin')
        .controller('StationListController', ['StationAdmin', '$route', 'ProjectFamilyAdmin', StationListController]);
}());
















