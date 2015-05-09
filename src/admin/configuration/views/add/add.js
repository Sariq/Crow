(function () {
  function ConfigurationAddController($route, $location, ConfigurationAdmin, StationAdmin, ProjectFamilyAdmin) {

    var self = this;

    self.error = '';
    self.debug = '';
    self.isNew = false;
    self.info = ConfigurationAdmin.info;

    self.stations = StationAdmin.listStations();
    self.projectFamilies = ProjectFamilyAdmin.query();
    console.log(self.projectFamilies)
    self.projects = [];

    self.steps = [];
    self.configurationLoaded = false;
    self.projectFamiliesLoaded = false;


    self.project_family_id = '';
    self.project_id = '';
    self.step_id = '';

    try{
      self.project_family_id = $route.current.params.projectFamilyId;
      self.project_id = parseInt($route.current.params.projectId);
      self.step_id = parseInt($route.current.params.stepId);

      console.log(self.step_id);
    }catch(e) {
      console.log('Missing project arguments');
    }


    self.setProjects = function(){
      if (self.configurationLoaded && self.projectFamiliesLoaded){
        self.projectFamiliesChange(false);
        self.projectChange(false);
      }else{
        console.log('self.configurationLoaded: ' +self.configurationLoaded + ' self.projectFamiliesLoaded:'+self.projectFamiliesLoaded);
      }
    };

    if($route.current.params.configurationId) {
      console.log($route.current.params);
      self.configuration = ConfigurationAdmin.get($route.current.params.configurationId);
      console.log('Edit Mode');
      self.configuration.$promise.then(function (result) {
        self.configurationLoaded = true;
        self.setProjects();
        self.project_family_id = self.configuration.project_family_id;
        self.project_id = self.configuration.project_id;
        self.step_id = self.configuration.step_id;
      });
    } else {
      console.log('configurationId not define creating a new configuration');
      self.isNew = true;
      self.configuration = ConfigurationAdmin.create();
      self.configuration.project_family_id = self.project_family_id;
      self.configuration.project_id = self.project_id;
      self.configuration.step_id = self.step_id;
      self.configurationLoaded = true;
      //self.setProjects();
    }


    self.projectFamilies.$promise.then(function (result) {
      self.projectFamiliesLoaded = true;
      self.setProjects();
    });

    self.projectFamiliesChange = function (clean) {
      console.log('projectFamiliesChange');
      for (var i = 0; i < self.projectFamilies.length; i++) {
        if (self.projectFamilies[i]._id == self.configuration.project_family_id) {
          self.projects = self.projectFamilies[i].projects;
          if (clean) {
            self.configuration.step_id = '';
            self.configuration.project_id = '';
          }
        }
      }
    };

    self.projectChange = function (clean) {
      for (var i = 0; i < self.projectFamilies.length; i++) {
        if (self.projectFamilies[i]._id == self.configuration.project_family_id) {
          for (var j = 0; j < self.projectFamilies[i].projects.length; j++) {
            if (self.configuration.project_id == self.projectFamilies[i].projects[j].id) {
              self.steps = self.projectFamilies[i].projects[j].steps;
              if (clean) {
                self.configuration.step_id = '';
              }
            }
          }
        }
      }
    };


    console.log(self.configuration);

    self.isValid = function () {
      return true;
    };
    self.save = function () {
      if (!self.isValid()) {
        return false;
      }
      var success_url = '/configurations';
      if (self.project_family_id && self.project_id && self.step_id){
         success_url = '/configurations/'+self.project_family_id +'/'+self.project_id +'/'+self.step_id;
        console.log(success_url)
      }
      if (self.isNew) {
        self.configuration.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path(success_url);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      } else {
        self.configuration.$update(function (response) {
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
    .controller('ConfigurationAddController', ['$route', '$location', 'ConfigurationAdmin', 'StationAdmin', 'ProjectFamilyAdmin', ConfigurationAddController]);
}());
