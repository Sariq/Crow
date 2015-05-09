(function () {

  function routes($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: '/static/src/common/views/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/', {
        templateUrl: '/static/src/monitor/views/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/report', {
        templateUrl: '/static/src/monitor/views/report/report.html',
        controller: 'ReportController',
        controllerAs: 'report'
      })
        .when('/report_serial/:serialNumber', {
        templateUrl: '/static/src/monitor/views/report_serial/report_serial.html',
        controller: 'SerialReportController',
        controllerAs: 'report_serial'
      })
        .when('/report_serial', {
        templateUrl: '/static/src/monitor/views/report_serial/report_serial.html',
        controller: 'SerialReportController',
        controllerAs: 'report_serial'
      })
      .when('/report_serial_detail/:executionId/:cavityId/:serialNumber', {
        templateUrl: '/static/src/monitor/views/report_serial_detail/report_serial_detail.html',
        controller: 'SerialDetailReportController',
        controllerAs: 'report_serial_detail'
      })
      .when('/report_serial_detail', {
        templateUrl: '/static/src/monitor/views/report_serial_detail/report_serial_detail.html',
        controller: 'SerialDetailReportController',
        controllerAs: 'report_serial_detail'
      })
      .when('/stats', {
        templateUrl: '/static/src/monitor/views/stats/stats.html',
        controller: 'StatsController',
        controllerAs: 'stats'
      })
      .when('/dashboard', {
        templateUrl: '/static/src/monitor/views/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      })
        .when('/monitor_fixture', {
        templateUrl: '/static/src/monitor/views/test_fixture/test_fixture.html',
        controller: 'MonitorTestFixtureController',
        controllerAs: 'monitorFixture'
      })
      .otherwise({redirectTo: '/'})
  }

  angular.module('ate.monitor')
    .config(['$routeProvider',routes])
}());
