(function () {

  function ProjectEditorAdmin($resource) {


    var self = this;
    self.info ={

    };

    self.projectFamilyResource = $resource('/admin/api/project_family',{},
      {update: {method: 'PUT'}}
    );

    self.get = function(projectFamily_id){
      return self.projectFamilyResource.get({_id:projectFamily_id });
    };

    self.save = function (projectFamily) {
      return self.projectFamilyResource.save();
    };

    self.createProject = function(){

    };

    self.create = function(){
      var projectFamily = {
        name: '',
        part_number: '',
        projects:[],
        lastProjectID:0,
        deleted:false
      };
      return new self.projectFamilyResource(projectFamily);
    };

    self.query = function (){
      return self.projectFamilyResource.query();
    };

    self.listProjectFamilys = function(){
      return self.projectFamilyResource.query({list_for_fixtures:1})
    };

    return self;

  }

  angular.module('ate.admin')
    .service('ProjectEditorAdmin', ['$resource',ProjectEditorAdmin])
}());