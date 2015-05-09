(function () {
  function ProjectListController($route,ProjectAdmin) {
    var self = this;

    self.projects = ProjectAdmin.query();
    self.info = ProjectAdmin.info;
    self.projectFamilyId = '';
    self.projectFamily = false;
    try{
      self.projectFamilyId = $route.current.params.projectFamilyId;
      self.projectFamily = ProjectAdmin.getProjectFamily(self.projectFamilyId)
    }catch(e){
      console.log('no project Family in rout params')
    }

    self.remove = function (project) {
      console.log(project);
      console.log(project._id);
      project.$remove({_id: project._id}, function () {
        self.projects = ProjectAdmin.query();
      });
    };
  }

  angular.module('ate.admin')
    .controller('ProjectListController',
    ['$route','ProjectAdmin',ProjectListController]);
}());
