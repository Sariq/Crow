(function () {

  function ProjectAdmin($resource,ProjectFamilyAdmin) {


    var self = this;
    self.info ={
      projectFamilies:ProjectFamilyAdmin.query()
    };

    self.getProjectFamily = function(id){
      return ProjectFamilyAdmin.get(id);
    };



    self.projectResource = $resource('/admin/api/project',{},
      {update: {method: 'PUT'}}
    );

    self.get = function(project_id){
      return self.projectResource.get({_id:project_id });
    };

    self.save = function (project) {
      return self.projectResource.save();
    };

    self.create = function(){
      var project = {
        project_family_id:'',
        name: '',
        deleted: false,
        part_number: ''
      };
      return new self.projectResource(project);
    };

    self.query = function (){
      return self.projectResource.query();
    };

    self.listProjects = function(){
      return self.projectResource.query({list_for_fixtures:1})
    };


    return self;



  }

  angular.module('ate.admin')
    .service('ProjectAdmin', ['$resource','ProjectFamilyAdmin',ProjectAdmin])
}());