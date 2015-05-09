/******************************
 * this code has the PFdirective - this directive might be neded somewhere else
 *
 ************************************/

(function () {
    /** Station Controller
     *
     * @param $location:
     * @param StationAdmin: Service
     * @constructor
     */
    function StationAddController($location, $scope, StationAdmin, $route, ProjectFamilyAdmin) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = StationAdmin.info;
        self.projectFamilies = ProjectFamilyAdmin.query();
        self.station = StationAdmin.create();
        self.projects = [];
        self.stationId = $route.current.params.stationId;
        self.steps = [];

        /**
         *
         * @param station
         * @returns {*}
         */
        self.addCconfiguration = function (station) {
            return StationAdmin.addCconfiguration(station);

        };


        self.isValid = function () {
            return true;
        };

        if (self.stationId) {
            self.station = StationAdmin.get($route.current.params.stationId);
            self.station.$promise.then(function (result) {
            });

        } else {
            self.isNew = true;
            self.station = StationAdmin.create();
        }

        self.save = function () {
            if (!self.isValid()) {
                return false;
            }

        };
        self.deleteConf = function (idx, station) {

            StationAdmin.deleteConf(idx, station);
            $scope.$apply()

        };

        self.save = function () {
            if (!self.isValid()) {
                return false;
            }
            var success_url = '/stations';
            if (self.configurationId) {
                success_url = success_url + '/' + self.station;

                console.log(success_url);
            }
            if (self.isNew) {
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
        .controller('StationAddController', ['$location', '$scope', 'StationAdmin', '$route', 'ProjectFamilyAdmin', StationAddController]);
}());

(function () {

    function PFdirective(ProjectFamilyAdmin) {
        return {
            restrict: 'AE',

            conf: {}
            ,
            station: {},
            template: '<td size="4" ><select style="width: 150px" ng-model="conf.project_family"' +
            ' ng-change="station.project_family_id=conf.project_family;projectFamiliesChange(true)">' +
            '<option ng-selected="conf.project_family==pf._id" ng-repeat="pf in projectFamilies" value="{{ pf._id }}">{{ pf.name }}</option>' +
            '</select></td>' +
            '<td size="4"><select style="width: 150px" ng-model="conf.project"' +
            '       ng-change="station.project_id=conf.project;projectChange(true)">' +
            '  <option ng-selected="conf.project==prj.id" ng-repeat="prj in projects" value="{{ prj.id }}">{{prj.name}}</option>' +
            ' </select></td>' +
            '<td size="4"><select style="width: 150px" ng-model="conf.step"' +
            ' ng-change="station.step_id=conf.step">' +
            '<option ng-selected="conf.step==step.id" ng-repeat="step in steps" value="{{ step.id }}">{{ step.name }}</option>' +
            '</select></td>' +
            '    <td>' +
            '<i object-name="Server" confirm-action="add.deleteConf($index,add.station)"  class="btn btn-xs btn-danger glyphicon glyphicon-trash"></i>' +
            ' </td>'
            ,
            controller: function ($scope, StationAdmin, $route) {
                $scope.projectFamilies = ProjectFamilyAdmin.query();
                $scope.steps = [];
                $scope.projects = [];
                $scope.stationLoaded = false;
                $scope.projectFamiliesLoaded = false;

                $scope.setProjects = function () {
                    if ($scope.stationLoaded && $scope.projectFamiliesLoaded) {
                        $scope.projectFamiliesChange(false);
                        $scope.projectChange(false);
                    } else {
                        console.log('$scope.stationLoaded: ' + $scope.stationLoaded + ' $scope.projectFamiliesLoaded:' + $scope.projectFamiliesLoaded);
                    }
                };


                $scope.projectFamiliesChange = function (clean) {
                    for (var i = 0; i < $scope.projectFamilies.length; i++) {
                        if ($scope.projectFamilies[i]._id == $scope.conf.project_family) {
                            $scope.projects = $scope.projectFamilies[i].projects;
                            if (clean) {
                                $scope.conf.step = '';
                                $scope.station.project_id = '';
                            }
                        }
                    }

                };
                $scope.projectFamilies.$promise.then(function (result) {
                    $scope.projectFamiliesLoaded = true;
                    $scope.stationLoaded = true;
                    $scope.setProjects();

                });


                $scope.projectChange = function (clean) {

                    for (var i = 0; i < $scope.projectFamilies.length; i++) {

                        if ($scope.projectFamilies[i]._id == $scope.conf.project_family) {
                            for (var j = 0; j < $scope.projectFamilies[i].projects.length; j++) {
                                if ($scope.conf.project == $scope.projectFamilies[i].projects[j].id) {
                                    $scope.steps = $scope.projectFamilies[i].projects[j].steps;
                                    if (clean) {
                                        $scope.conf.step_id = '';
                                    }
                                }
                            }
                        }
                    }
                };


            }
        };

    }

    angular.module('ate.admin')
        .directive('pfDirective', PFdirective);
}());








