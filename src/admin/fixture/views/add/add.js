(function () {
  function FixtureAddController($route, $location, FixtureAdmin, StationAdmin, ProjectFamilyAdmin) {

    var self = this;
    self.error = '';
    self.debug = '';
    self.isNew = false;
    self.info = FixtureAdmin.info;

    self.stations = StationAdmin.listStations();
    self.projectFamilies = ProjectFamilyAdmin.query();
    self.projects = [];

    self.steps = [];
    self.fixtureLoaded = false;
    self.projectFamiliesLoaded = false;


    self.project_family_id = '';
    self.project_id = '';
    self.step_id = '';

    try{
      self.project_family_id = $route.current.params.projectFamilyId;
      self.project_id = parseInt($route.current.params.projectId);
      self.step_id = parseInt($route.current.params.stepId);
    }catch(e) {
      console.log('Missing project arguments');
    }


    self.setProjects = function(){
      if (self.fixtureLoaded && self.projectFamiliesLoaded){
        self.projectFamiliesChange(false);
        self.projectChange(false);
      }else{
        console.log('self.fixtureLoaded: ' +self.fixtureLoaded + ' self.projectFamiliesLoaded:'+self.projectFamiliesLoaded);
      }
    };

    if($route.current.params.fixtureId) {
      console.log($route.current.params);
      self.fixture = FixtureAdmin.get($route.current.params.fixtureId);
      console.log('Edit Mode');
      self.fixture.$promise.then(function (result) {
        self.fixtureLoaded = true;
        self.setProjects();
        self.project_family_id = self.fixture.project_family_id;
        self.project_id = self.fixture.project_id;
        self.step_id = self.fixture.step_id;
      });
    } else {
      console.log('fixtureId not define creating a new fixture');
      self.isNew = true;
      self.fixture = FixtureAdmin.create();
      self.fixture.project_family_id = self.project_family_id;
      self.fixture.project_id = self.project_id;
      self.fixture.step_id = self.step_id;
      self.fixtureLoaded = true;
      //self.setProjects();
    }


    self.projectFamilies.$promise.then(function (result) {
      self.projectFamiliesLoaded = true;
      self.setProjects();
    });


    self.addGuiConf = function(fixture){
      return FixtureAdmin.addGuiConf(fixture);
    };

    self.projectFamiliesChange = function (clean) {
      console.log('projectFamiliesChange');
      for (var i = 0; i < self.projectFamilies.length; i++) {
        if (self.projectFamilies[i]._id == self.fixture.project_family_id) {
          self.projects = self.projectFamilies[i].projects;
          if (clean) {
            self.fixture.step_id = '';
            self.fixture.project_id = '';
          }
        }
      }
    };

    self.projectChange = function (clean) {
      for (var i = 0; i < self.projectFamilies.length; i++) {
        if (self.projectFamilies[i]._id == self.fixture.project_family_id) {
          for (var j = 0; j < self.projectFamilies[i].projects.length; j++) {
            if (self.fixture.project_id == self.projectFamilies[i].projects[j].id) {
              self.steps = self.projectFamilies[i].projects[j].steps;
              if (clean) {
                self.fixture.step_id = '';
              }
            }
          }
        }
      }

    };


    console.log(self.fixture);

    self.isValid = function () {
      return true;
    };
    self.save = function () {
      if (!self.isValid()) {
        return false;
      }
      var success_url = '/fixtures';
      if (self.project_family_id && self.project_id && self.step_id){
         success_url = '/fixtures/'+self.project_family_id +'/'+self.project_id +'/'+self.step_id;
      }
      FixtureAdmin.setCavities(self.fixture);
      if (self.isNew) {
        self.fixture.$save(function (response) {
          console.log(response);
          if (response.status == 0) {
            $location.path(success_url);
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      } else {
        self.fixture.$update(function (response) {
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
    .controller('FixtureAddController', ['$route', '$location', 'FixtureAdmin', 'StationAdmin', 'ProjectFamilyAdmin', FixtureAddController]);
}());
