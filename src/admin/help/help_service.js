(function () {
    /**
     * Help Service -
     * depending on the following services
     * @param $resource
     * @param LanguageService
     * @returns {HelpAdmin}
     * @constructor
     */
    function HelpAdmin($resource, LanguageService) {


        var self = this;

        self.info = [{name: "English", code: 1}, {name: "Hebrew", code: 2}];


        self.helpResource = $resource('/admin/api/help', {},
            {update: {method: 'PUT'}}
        );
        /**
         *
         * @param help_id
         * @returns :  help object
         */
        self.get = function (help_id) {
            return self.helpResource.get({_id: help_id});
        };


        /**
         * Creates a new help document
         * @returns an help document object
         */
        self.create = function () {
            var help = {
                _id: '',
                title: '',
                deleted: false,
                languages: [{
                    title: '',
                    content: '',
                    language_code: LanguageService.getLanguages()[0]._id
                }, {
                    title: '',
                    content: '',
                    language_code: LanguageService.getLanguages()[1]._id
                }, {
                    title: '',
                    content: '',
                    language_code: LanguageService.getLanguages()[2]._id
                }]
            };
            return new self.helpResource(help);
        };


        /**
         *
         * @returns help List
         */
        self.query = function () {
            return self.helpResource.query();
        };

        return self;
    }

    angular.module('ate.admin')
        .service('HelpAdmin', ['$resource', 'LanguageService', HelpAdmin])
}());