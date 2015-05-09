(function () {
  function ProjectFamilyDetailController($scope, $route, $location, ProjectEditorAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.projectFamily = ProjectEditorAdmin.get($route.current.params.projectFamilyId);
    self.newProject = {name: '', description: ''};
    self.editMode = false;

    /**
     * addProject to DB
     */
    self.addProject = function () {
      self.projectFamily.lastProjectID++;
      self.projectFamily.projects.push({
        id: self.projectFamily.lastProjectID,
        name: self.newProject.name,
        description: self.newProject.description,
        steps: [],
        lastStepID: 0,
        newStep: {name: '', description: ''}
      });
      self.newProject.name = '';
      self.newProject.description = '';
      console.log(self.projectFamily);
      self.save("step");
      //self.save();
    };

    /**
     * add a new step to the project
     * and save in DB
     * @param project
     */
    self.addStep = function (project) {
      project.lastStepID++;
      project.steps.push({
        id: project.lastStepID,
        name: project.newStep.name,
        description: project.newStep.description
      });
      project.newStep.name = '';
      project.newStep.description = '';
      self.save("step");

    };

    /**
     * save data(project,step) in DB
     * @param flag
     */
    self.save = function (flag) {
      console.log(flag)
      var pf = angular.copy(self.projectFamily);
      pf.$update(function (response) {
        console.log(response);
        if (response.status == 0 && flag !== "step") {
          $location.path('/projectEditor');
          console.log(response);
        } else {
          self.error = response.error;
          self.debug = response.debug;
        }
      });
    };


  }

  angular.module('ate.admin')
    .controller('ProjectFamilyDetailController',
    ['$scope', '$route', '$location', 'ProjectEditorAdmin',
      ProjectFamilyDetailController]);
}());
