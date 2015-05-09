(function () {
  function DutConfigurationListController($route, DutConfigurationAdmin, ConfigurationAdmin) {
    var self = this;

    self.configurations = ConfigurationAdmin.query();
    self.dutConfigurations = DutConfigurationAdmin.query();
    console.log(self.dutConfigurations);
    self.configurationId = '';

    try {
      self.configurationId = $route.current.params.configurationId;
    } catch (e) {
      console.log($route.current.params);
      console.log('Missing project arguments');
    }
    /**
     * removes dut Configuration from DB
     * @param dutConfiguration
     */
    self.remove = function (dutConfiguration) {
      console.log(dutConfiguration);
      console.log(dutConfiguration._id);
      dutConfiguration.$remove({
        pn_cfg: dutConfiguration.pn_cfg,
        pn_cfg_rev: dutConfiguration.pn_cfg_rev
      }, function () {
        self.dutConfigurations = DutConfigurationAdmin.query();
      });
    };
  }

  angular.module('ate.admin')
    .controller('DutConfigurationListController', ['$route',
      'DutConfigurationAdmin', 'ConfigurationAdmin', DutConfigurationListController]);
}());
