(function () {
  function ConfigurationListController($route, ConfigurationAdmin, ProjectFamilyAdmin) {
    var self = this;

 console.log(ConfigurationAdmin);
    self.configurations = ConfigurationAdmin.query();
    self.projectFamilies = ProjectFamilyAdmin.query();
    self.projects = [];
    self.steps = [];
    self.project_family_id = '';
    self.project_id = '';
    self.step_id = '';

    try {
      self.project_family_id = $route.current.params.projectFamilyId;
      self.project_id = parseInt($route.current.params.projectId);
      self.step_id = parseInt($route.current.params.stepId);
    } catch (e) {
      console.log($route.current.params);
      console.log('Missing project arguments');
    }

    self.projectFamilies.$promise.then(function (result) {
      self.projectFamiliesChange(false);
      self.projectChange(false);
    });


    self.projectFamiliesChange = function (clean) {
      console.log('projectFamiliesChange');
      for (var i = 0; i < self.projectFamilies.length; i++) {
        if (self.projectFamilies[i]._id == self.project_family_id) {
          self.projects = self.projectFamilies[i].projects;
          if (clean) {
            self.step_id = '';
            self.project_id = '';
          }
        }
      }
    };

    self.projectChange = function (clean) {
      for (var i = 0; i < self.projectFamilies.length; i++) {
        if (self.projectFamilies[i]._id == self.project_family_id) {
          for (var j = 0; j < self.projectFamilies[i].projects.length; j++) {
            if (self.project_id == self.projectFamilies[i].projects[j].id) {
              self.steps = self.projectFamilies[i].projects[j].steps;
              if (clean) {
                self.step_id = '';
              }
            }
          }
        }
      }
    };


    self.remove = function (configuration) {
      console.log(configuration);
      console.log(configuration._id);
      configuration.$remove({_id: configuration._id}, function () {
        self.configurations = ConfigurationAdmin.query();
      });
    };

    self.newConfigurationFamily = ConfigurationAdmin.create(self.project_family_id,
      self.project_id, self.step_id);
    self.addConfigurationFamily = function () {
      self.newConfigurationFamily.$save(function (response) {
        console.log(response);
        if (response.status == 0) {
          self.newConfigurationFamily = ConfigurationAdmin.create(self.project_family_id,
            self.project_id, self.step_id);
          self.configurations = ConfigurationAdmin.query();
        } else {
          self.error = response.error;
          self.debug = response.debug;
        }
      });
    };


  }


  angular.module('ate.admin')
    .controller('ConfigurationListController', ['$route', 'ConfigurationAdmin',
      'ProjectFamilyAdmin', ConfigurationListController]);
}());
