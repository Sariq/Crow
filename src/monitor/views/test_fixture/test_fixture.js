(function () {

    function MonitorTestFixtureController($scope, $http, $filter, $timeout, ngTableParams) {
        var self = this;
        self.fixtures = [];
        self.fetch = function () {
            $http.get('/monitor/api/test_fixture').success(function (data) {
                self.fixtures = data;
                $scope.tableParams.reload();
            });
        };

        self.fetch();

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                timestamp: 'asc'     // initial sorting
            }
        }, {
            total: self.fixtures.length, // length of data
            getData: function ($defer, params) {
                params.total(self.fixtures.length);
                var orderedRecentResults = params.sorting() ? $filter('orderBy')(self.fixtures, params.orderBy()) : self.fixtures;
                $scope.fixtures = orderedRecentResults;
                params.total(orderedRecentResults.length);
                $defer.resolve(orderedRecentResults.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        self.periodicUpdate = function () {
            $timeout(function () {
                self.fetch();
                self.periodicUpdate();
            }, 5000)
        };

        self.periodicUpdate();

    }

    angular.module('ate.monitor')
        .controller('MonitorTestFixtureController', ['$scope', '$http', '$filter', '$timeout', 'ngTableParams', MonitorTestFixtureController]);
}());
