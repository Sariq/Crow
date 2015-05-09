(function () {
  /**
   * GroupListController group list page
   * using following services
   * @param GroupAdmin
   * @constructor
   */
  function GroupListController(GroupAdmin) {
    var self = this;
    console.log(GroupAdmin);
    self.groups = GroupAdmin.query();
    self.groups.$promise.then(function(response){
         console.log(response)
        });
    /**
     *Delete group data
      * @param group
     */
    self.remove = function (group) {
        console.log(group);
        console.log(group._id);
        group.$remove({_id: group._id}, function () {
          self.groups = GroupAdmin.query();
        });
      };
  }

  angular.module('ate.admin')
    .controller('GroupListController', ['GroupAdmin',GroupListController]);
}());
