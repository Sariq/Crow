(function () {
  function DutConfigurationAddController($route, $location,
                                         DutConfigurationAdmin, ConfigurationAdmin) {

    var self = this;
    self.error = '';
    self.debug = '';
    self.isNew = false;
    self.infoStr = '';
    self.limitsStr = '';
    self.infoStrError = '';
    self.limitsStrError = '';

    self.configurations = ConfigurationAdmin.query();

    self.configurationId = '';

    try {
      self.configurationId = $route.current.params.configurationId;
      self.dutConfigurationId = $route.current.params.dutConfigurationId;
      if (self.dutConfigurationId) {
        self.dutConfiguration = DutConfigurationAdmin.get(self.dutConfigurationId);
        self.dutConfiguration.$promise.then(function (response) {
          self.infoStr = JSON.stringify(self.dutConfiguration.info);
          self.limitsStr = JSON.stringify(self.dutConfiguration.limits);
        });

      } else {
        self.isNew = true;
        self.dutConfiguration = DutConfigurationAdmin.create();
        self.dutConfiguration.configuration_id = self.configurationId;
      }
    } catch (e) {
      console.log($route.current.params);
      console.log('Missing project arguments');
    }

    console.log(self.dutConfiguration);

    /**
     * check if limitsStr+infoStr are Json format
     *
     * @returns {boolean}
     */
    self.isValid = function () {
      try {
        eval("(" + self.limitsStr + ")");
      } catch (exception) {
        self.limitsStrError = "Please insert Json Object - LIMITS - ";
        return false;
      }
      self.limitsStrError = '';
      self.dutConfiguration.limits = eval("(" + self.limitsStr + ")");
      try {
        eval("(" + self.infoStr + ")");
      } catch (exception) {

        self.infoStrError = "Please insert Json Object - INFO - ";
        return false;
      }
      self.infoStrError = '';
      self.dutConfiguration.info = eval("(" + self.infoStr + ")");
      return true;
    };

    /**
     * save Dut Configuration in DB
     * @returns {boolean}
     */
    self.save = function () {
      if (!self.isValid()) {
        return false;
      }
      var success_url = '/dut_configurations';
      if (self.configurationId) {
        success_url = success_url + '/' + self.configurationId;

        console.log(success_url);
      }
      if (self.isNew) {
        console.log(self.dutConfiguration);
        self.dutConfiguration.$save(function (response) {
          console.log(response);
          if (response.status == 0) {

            $location.path(success_url);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      } else {
        self.dutConfiguration.$update(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path(success_url);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      }
    };
  }

  angular.module('ate.admin')
    .controller('DutConfigurationAddController', ['$route', '$location',
      'DutConfigurationAdmin', 'ConfigurationAdmin', DutConfigurationAddController]);
}());
