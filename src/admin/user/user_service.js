(function () {

    function UserAdmin($resource) {

        var self = this;

        self.info = {
            locations: ['apc', 'afula']
        };


        self.info = {
            os: ['linux', 'windows'],
            stages: ['DOCS', 'TF', 'QL', 'Production'],
            locations: ['apc', 'afula']
        };

        self.userResource = $resource('/admin/api/user', {},
            {update: {method: 'PUT'}}
        );

        self.get = function (user_id) {
            return self.userResource.get({_id: user_id});
        };

        self.save = function (user) {
            return self.userResource.save();
        };

        self.create = function () {
            user = {username: '',
                groups: [],
                location: '',
                deleted: false};
            return new self.userResource(user);
        };

        self.query = function () {
            return self.userResource.query();
        };

        return self;


    }

    angular.module('ate.admin')
        .service('UserAdmin', ['$resource', UserAdmin])
}());