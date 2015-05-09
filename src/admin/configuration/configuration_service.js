(function () {
  /**
   * Configuration Admin Service
   * @param $resource
   * @returns {ConfigurationAdmin}
   * @constructor
   */
  function ConfigurationAdmin($resource) {

    var self = this;
    self.info = {};


    self.configurationResource = $resource('/admin/api/configuration', {},
      {update: {method: 'PUT'}}
    );


    self.get = function (configuration_id) {
      return self.configurationResource.get({_id: configuration_id});
    };


    self.create = function (projectFamilyId, projectId, stepId) {
      var configuration = {
        project_family_id: projectFamilyId,
        project_id: projectId,
        step_id: stepId,
        name: '',
        description: '',
        deleted: false,
        dut_configurations: []
      };
      return new self.configurationResource(configuration);
    };

    self.query = function () {
      return self.configurationResource.query();
    };

    return self;
  }

  angular.module('ate.admin')
    .service('ConfigurationAdmin', ['$resource', ConfigurationAdmin])
}());