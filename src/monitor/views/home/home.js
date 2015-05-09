(function () {
    function HomeController(AuthService) {
        var self = this;
        self.log = function (info) {
            console.console.log(info);
        };

        self.panels = [
            {
                permission: 'reports',
                page: 'report',
                color: 'panel panel-primary',
                icon: 'fa fa-cogs fa-5x',
                name: 'Reports'
            },
            {
                permission: 'statistics',
                page: 'statistics',
                color: 'panel panel-green',
                icon: 'fa fa-laptop fa-5x',
                name: 'Statistics'
            },
            {
                permission: 'admin_users',
                page: 'users',
                color: 'panel panel-red',
                icon: 'fa fa-user fa-5x',
                name: 'Users'
            },
            {
                permission: 'admin_servers',
                page: 'stations',
                color: 'panel panel-yellow',
                icon: 'fa fa-tasks fa-5x',
                name: 'Stations'
            },
            {
                permission: 'monitor_test_fixture',
                page: 'monitor_fixture',
                color: 'panel panel-warning',
                icon: 'fa fa-group fa-5x',
                name: 'Test Fixture'
            },
            {
                permission: 'admin_projectEditor',
                page: 'servers',
                color: 'panel panel-danger',
                icon: 'fa fa-folder fa-5x',
                name: 'Servers'
            },
            {
                permission: 'admin_groups',
                page: '',
                color: 'panel panel-success',
                icon: 'fa fa-file fa-5x',
                name: 'Documentation'
            }
        ];

        /**
         *checks if the user has a permission for
         * a specific action
         * @param action
         * @returns boolean
         */
        self.hasPermission = function (action) {
            console.log(AuthService.hasPermission(action));
            return AuthService.hasPermission(action);
        };
    }

    angular.module('ate.monitor')
        .controller('HomeController', ['AuthService', HomeController]);
}());
