(function () {

    function SerialReportController($scope, $filter, $resource,$routeParams, ngTableParams) {
        var self = this;
        var data = {};
        $scope.query = {
            'limit': '1000'
        };

        $scope.ReportResource = $resource('/monitor/api/serial', {},
            {fetch: {method: 'POST', isArray:true}}
        );

        $scope.doSearch = function () {
            var query = {};
            if ($routeParams.serialNumber)
            {
                query['serial'] = $routeParams.serialNumber;
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
                data = results;
                $scope.tableParams.reload();
            });
        };

        $scope.doClear = function() {
            $scope.query.pn_cfg = '';
            $scope.query.pn_cfg_rev = '';
            $scope.query.batch = '';
            $scope.query.serial = '';
            $scope.query.end_date = '';
            $scope.query.start_date = '';
            $routeParams.serialNumber = '';
            $scope.query.limit = '1000';
            $scope.doSearch();
        };


        $scope.openStart = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedStart = true;
        };

        $scope.openEnd = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedEnd = true;
        };

        $scope.doSearch();

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 15,          // count per page
            sorting: {
                timestamp: 'dsc'     // initial sorting
            }
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                    params.total(data.length);
                    var orderedRecentResults = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                    $scope.data = orderedRecentResults;
                    params.total(orderedRecentResults.length);
                    $defer.resolve(orderedRecentResults.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    }
    angular.module('ate.monitor')
        .controller('SerialReportController', ['$scope', '$filter', '$resource','$routeParams', 'ngTableParams', SerialReportController]);
}());
