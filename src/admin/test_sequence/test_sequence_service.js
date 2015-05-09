(function () {

  function TestSequenceAdmin($resource) {


    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };

    self.testSequenceResource = $resource('/admin/api/test_sequence',{},
      {update: {method: 'PUT'}}
    );

    self.get = function(testSequence_id){
      return self.testSequenceResource.get({_id:testSequence_id });
    };

    self.save = function (testSequence) {
      return self.testSequenceResource.save();
    };

    self.create = function(){
      var testSequence = {
        _id: '',
        name: '',
        project_id: '',
        tse_path:'',
        class: '',
        deleted: false,
        user_interface:false,
        local_results_path:''
      };
      return new self.testSequenceResource(testSequence);
    };

    self.query = function (){
      return self.testSequenceResource.query();
    };

    self.listTestSequences = function(){
      return self.testSequenceResource.query({list_for_fixtures:1})
    };


    return self;



  }

  angular.module('ate.admin')
    .service('TestSequenceAdmin', ['$resource',TestSequenceAdmin])
}());