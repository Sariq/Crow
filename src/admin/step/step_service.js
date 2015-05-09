(function () {

  function StepAdmin($resource,ProjectFamilyAdmin,ProjectAdmin) {

    var self = this;
    self.info = {
      project:{},
      projectFamily:{}
    };


    self.getProject = function(id){
      self.info.project =  ProjectAdmin.get(id);
      self.info.project.$promise.then(function (result) {
        self.info.projectFamily = ProjectFamilyAdmin.get(self.info.project.project_family_id);
      });
    };



    self.stepResource = $resource('/admin/api/step', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (step_id) {
      return self.stepResource.get({_id: step_id });
    };

    self.save = function (step) {
      return self.stepResource.save();
    };

    self.create = function () {
      var step = {
        project__id: '',
        project_id: '',
        name: '',
        deleted: false,
        description: '',
        test_set_path: '',
        test_set_class: ''
      };
      return new self.stepResource(step);
    };

    self.query = function () {
      return self.stepResource.query();
    };


    self.listSteps = function () {
      return self.stepResource.query({list_for_fixtures: 1})
    };

    return self;


  }

  angular.module('ate.admin')
    .service('StepAdmin', ['$resource','ProjectFamilyAdmin','ProjectAdmin', StepAdmin])
}());