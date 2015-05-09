(function () {

  function DutConfigurationAdmin($resource, $route) {

    var self = this;

    try {
      self.project_family_id = $route.current.params.projectFamilyId;
      self.project_id = parseInt($route.current.params.projectId);
      self.step_id = parseInt($route.current.params.stepId);
    } catch (e) {
      console.log($route.current.params);
      console.log('Missing project arguments');
    }
    self.dutConfigurationResource = $resource('/admin/api/dut_configuration', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (dutConfigurationId) {
      return self.dutConfigurationResource.get({
        pn_cfg: dutConfiguration.pn_cfg,
        pn_cfg_rev: dutConfiguration.pn_cfg_rev
      });
    };

    /**
     * Creat dut_configuration Object
     * @returns {DutConfigurationAdmin.dutConfigurationResource}
     */
    self.create = function () {
      var dutConfiguration = {
        configuration_id: '',
        name: '',
        pn_cfg: '',
        pn_cfg_rev: '',
        deleted: false,
        limits: {},
        info: {}
      };
      return new self.dutConfigurationResource(dutConfiguration);
    };

    self.query = function () {
      return self.dutConfigurationResource.query();
    };

    return self;
  }

  angular.module('ate.admin')
    .service('DutConfigurationAdmin', ['$resource', '$route', DutConfigurationAdmin])
}());