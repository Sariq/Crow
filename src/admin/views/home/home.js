(function () {

    function HomeController(AuthService,OperationLogService) {
        var self = this;
        self.operationLogs = [];
        self.adminOperationLogs = [];
        OperationLogService.loadOperationLog(self,0,20);
        OperationLogService.loadAdminOperationLog(self,0,20);

        self.log = function (info) {
            console.console.log(info);
        };
        self.icons={
            auth:'fa fa-tasks fa-1x'
        };
        self.panels = [
            {
                permission: 'admin_fixtures',
                page: 'fixtures',
                color: 'panel panel-primary',
                icon: 'fa fa-cogs fa-5x',
                name: 'Fixtures'
            },
            {
                permission: 'admin_stations',
                page: 'stations',
                color: 'panel panel-green',
                icon: 'fa fa-laptop fa-5x',
                name: 'Stations'
            },
            {
                permission: 'admin_servers',
                page: 'servers',
                color: 'panel panel-yellow',
                icon: 'fa fa-tasks fa-5x',
                name: 'Servers'
            },
            {
                permission: 'admin_project_family',
                page: 'projectEditor',
                color: 'panel panel-red',
                icon: 'fa fa-folder fa-5x',
                name: 'Project Families'
            },
            {
                permission: 'admin_users',
                page: 'users',
                color: 'panel panel-danger',
                icon: 'fa fa-user fa-5x',
                name: 'Users'
            },
            {
                permission: 'admin_groups',
                page: 'groups',
                color: 'panel panel-warning',
                icon: 'fa fa-group fa-5x',
                name: 'Groups'
            },
            {
                permission: 'admin_help',
                page: 'helps',
                color: 'panel panel-info',
                icon: 'fa fa-question fa-5x',
                name: 'Help'
            },
            {
                permission: 'celery_queue_admin',
                page: 'celery_queue',
                color: 'panel panel-success',
                icon: 'fa fa-file fa-5x',
                name: 'Celery Queues'
            }
        ];





        /**
         *@name hasPermission
         *@type function
         *@description checks if the user has a permission for
         * a specific action
         * @param action
         * @returns boolean
         */
        self.hasPermission = function (action) {
            return AuthService.hasPermission(action);
        };
    }


    angular.module('ate.admin')
        .controller('HomeController', ['AuthService','OperationLogService', HomeController]);
}());
