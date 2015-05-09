(function () {
  function UserAddController($location, $route, UserAdmin, GroupAdmin) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.info = UserAdmin.info;
    self.userId = $route.current.params.userId;
    self.groupsInfo = GroupAdmin.query();
    self.user = UserAdmin.create();

    self.isValid = function () {
      return true;
    };

    /**
     * Save or Update User Data
     * @returns {boolean}
     */

    self.save = function () {
      if (!self.isValid()) {
        return false;
      }
      var success_url = '/groups';
      if (self.isNew) {

        self.user.$save(function (response) {
          console.log(response);
          console.log($location.path('/users'));
          if (response.status == 0) {
            $location.path('/users');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      } else {
        self.user.$update(function (response) {
          console.log($location.path('/users'));
          if (response.status == 0) {
            $location.path('/users');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      }
    };

    /**
     * add the user group to temp user groups array(for show)
     * and the rest of the groups to more groups
     */
    self.get_add_groups = function () {
      var flag = false;
      self.ret = [];
      self.tempGroups = [];
      for (var i = 0; i < self.groupsInfo.length; i++) {
        for (var j = 0; j < self.user.groups.length; j++) {
          //   console.log(self.user.groups[j])
          if (self.user.groups[j] == self.groupsInfo[i]._id) {
            console.log(self.groupsInfo[i]._id);
            console.log(self.user.groups[j]);
            flag = true;
            self.tempGroups.push(self.groupsInfo[i]);
          }
        }
        if (!flag) {
          self.ret.push(self.groupsInfo[i]);
        }
        flag = false;
      }
    };

    /**
     * addGroup to user groups array
     * @param group
     */
    self.addGroup = function (group) {
      self.user.groups.push(group._id);
      self.get_add_groups();
    };
    /**
     * removeGroup from user groups array
     * @param group
     */
    self.removeGroup = function (group) {
      for (var key in self.user.groups)
        if (self.user.groups[key] == group._id) {
          delete self.user.groups[key];
        }
      ;
      self.user.groups = self.user.groups.filter(function (n) {
        return n != undefined
      });
      self.get_add_groups();
    };

    /*
     * check if Edit/Add clicked
     */
    if (self.userId) {
      self.user = UserAdmin.get(self.userId);
      self.groupsInfo.$promise.then(function () {
        self.user.$promise.then(function () {
          self.get_add_groups()
        });
      });
    } else {
      self.isNew = true;
      self.user = UserAdmin.create();
      self.user.configuration_id = self.userId;
      self.groupsInfo.$promise.then(function () {
        self.get_add_groups()
      });
    }
  };

  angular.module('ate.admin')
    .controller('UserAddController', ['$location', '$route', 'UserAdmin', 'GroupAdmin', UserAddController]);
}());
