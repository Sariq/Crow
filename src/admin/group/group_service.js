(function () {
    /**GroupAdmin service
     * Create, Add and Delete groups
     * @param $resource
     * @returns {GroupAdmin}
     * @constructor
     */
    function GroupAdmin($resource, $http) {
        var self = this;
        self.info = {
            actions: []
        };
        self.loadPermissionList = function () {
            $http.get('/admin/api/group?perm_list=1').success(function (data) {
                if (data.status == 0) {
                    self.info.actions = data.data;
                } else {
                    console.log(data)
                }
            }).error(function (data) {
                console.log(data)
            });
        };
        self.loadPermissionList();

        self.groupResource = $resource('/admin/api/group', {},
            {update: {method: 'PUT'}}
        );

        self.get = function (group_id) {
            return self.groupResource.get({_id: group_id});
        };

        /**
         * Create a new group
         * Use group.$save() to save on the server
         * @returns {GroupAdmin.groupResource}
         */
        self.create = function () {
            //var actions = angular.copy(self.info.actions);
            var group = {
                name: '',
                description: '',
                deleted: false,
                actions: []
            };
            return new self.groupResource(group);
        };

        self.query = function () {
            return self.groupResource.query();
        };
        return self;
    }

    angular.module('ate.admin')
        .service('GroupAdmin', ['$resource', '$http', GroupAdmin])
}());
