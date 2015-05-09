(function () {
  function UserListController(UserAdmin) {
    var self = this;
    console.log(UserAdmin);
    self.users = UserAdmin.query();

     self.remove = function (user) {
        console.log(user);
        console.log(user._id);
        user.$remove({_id: user._id}, function () {
          self.users = UserAdmin.query();
        });
      };
  }

  angular.module('ate.monitor')
    .controller('UserListController', ['UserAdmin',UserListController]);
}());
