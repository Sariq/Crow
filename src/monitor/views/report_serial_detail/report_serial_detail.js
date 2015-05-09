(function () {

    function SerialDetailReportController($scope, $filter, $resource, $routeParams, ngTableParams) {
        var self = this;
        $scope.data = [];
        $scope.serialNumber = $routeParams.serialNumber;
        $scope.query = {
            'limit': '10'
        };

        $scope.ReportResource = $resource('/monitor/api/serial_details', {},
            {fetch: {method: 'POST'}}
        );

        $scope.doSearch = function() {
            var query = {};
            if ($routeParams.executionId) {
                query['execution_id'] = $routeParams.executionId;
            }
            if ($routeParams.cavityId) {
                query['cavity_id'] = $routeParams.cavityId;
            }
            if ($routeParams.serialNumber) {
                query['serial'] = $routeParams.serialNumber;
            }
            if ($routeParams.execution_id) {
                query['execution_id'] = $routeParams.execution_id;
            }
            if ($scope.query.start_date)
            {
                query['start_date'] = $scope.query.start_date;
            }
            if ($scope.query.end_date)
            {
                query['end_date'] = $scope.query.end_date;
            }
            if ($scope.query.serial)
            {
                query['serial'] = $scope.query.serial;
            }
            if ($scope.query.pn_cfg)
            {
                query['batch'] = $scope.query.batch;
            }
            if ($scope.query.pn_cfg)
            {
                query['pn_cfg'] = $scope.query.pn_cfg;
            }
            if ($scope.query.batch)
            {
                query['pn_cfg_rev'] = $scope.query.pn_cfg_rev;
            }
            if ($scope.query.limit)
            {
                query['limit'] = parseInt($scope.query.limit);
            }
            $scope.ReportResource.fetch(query, function (results) {
                $scope.data = results.result;
                console.log($scope.data);
            });
        };
        $scope.doSearch();

    };
    angular.module('ate.monitor')
        .controller('SerialDetailReportController', [
            '$scope', '$filter', '$resource', '$routeParams', 'ngTableParams', SerialDetailReportController
        ]);
}());
