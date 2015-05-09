(function () {
  function ProjectFamilyEditorController($route, $location, ProjectEditorAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.projectFamilies = ProjectEditorAdmin.query();
    self.newPf = ProjectEditorAdmin.create();

    /**
     * add Project Family to DB
     */
    self.addPf = function () {
      self.newPf.$save(function (response) {
        console.log(response);
        if (response.status == 0) {
          self.newPf = ProjectEditorAdmin.create();
          self.projectFamilies = ProjectEditorAdmin.query();
        } else {
          self.error = response.error;
          self.debug = response.debug;
        }
      });
    };

    /**
     * addProject to DB
     * @param pf
     */
    self.addProject = function (pf) {
      pf.lastProjectID++;
      pf.projects.push({
        id:pf.lastProjectID,
        name: pf.newProject.name,
        description: pf.newProject.description,
        steps: [],
        lastStepID:0,
        newStep: {name: ''}});
      pf.newProject.name = '';
      pf.newProject.description = '';
      self.save(angular.copy(pf));
    };

    /**
     * add step to DB
     * @param project
     * @param pf
     */
    self.addStep = function (project,pf) {
      project.lastStepID++;
      project.steps.push({
        id:project.lastStepID,
        name: project.newStep.name,
        newStep: {name: ''}});
      project.newStep.name = '';
      self.save(angular.copy(pf));
    };

    /**
     * Save data(Project Family,Project,Step) in DB
     * @param pf
     */
    self.save = function (pf) {
      pf.$update(function (response) {
        console.log(response);
        if (response.status == 0) {

          console.log(response);
        } else {
          self.error = response.error;
          self.debug = response.debug;
        }
      });
    };
    /**
     * delete Project Family from DB
     * @param pf
     */
        self.remove = function (pf) {
          console.log(pf);
          console.log(pf._id);
          pf.$remove({_id: pf._id}, function () {
          self.projectFamilies = ProjectEditorAdmin.query();
      });
    };
  }

  angular.module('ate.admin')
    .controller('ProjectFamilyEditorController',
    ['$route', '$location', 'ProjectEditorAdmin',
      ProjectFamilyEditorController]);
}());
