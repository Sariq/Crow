(function () {
  function GroupAddController($location, GroupAdmin, $route) {
    var self = this;
    self.error = '';
    self.debug = '';
    self.groupId = $route.current.params.groupId;
    self.info = GroupAdmin.info;

    self.isValid = function () {
      return true;
    };
    /**
     *Save/Update Group data
     * @returns {boolean}
     */
    self.save = function () {
      if (!self.isValid()) {
        return false;
      }
      var success_url = '/groups';
      if (self.isNew) {
        self.group.$save(function (response) {
          console.log(response);
          console.log($location.path('/groups'));
          if (response.status == 0) {
            $location.path('/groups');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      } else {
        self.group.$update(function (response) {
          console.log($location.path('/groups'));
          if (response.status == 0) {
            $location.path('/groups');
          } else {
            self.error = response.error;
            self.debug = response.debug;
          }
        });
      }
    };
    /**
     * refresh the "group" actions array and the "rest" actions array
     */
    self.get_add_actions = function () {
      self.ret = [];
      for (var i = 0; i < GroupAdmin.info.actions.length; i++) {
        if (self.group.actions.indexOf(GroupAdmin.info.actions[i]) == -1) {
          self.ret.push(GroupAdmin.info.actions[i])
        }
      }

    };
    /**
     * addAction to actions array
     * @param action
     */
    self.addAction = function (action) {

      self.group.actions.push(action);
      self.get_add_actions();
    };

    /**
     * removeAction from actions array
     * @param action
     */
    self.removeAction = function (action) {
      for (var key in self.group.actions)
        if (self.group.actions[key] == action) {
          delete self.group.actions[key];
        }
      self.group.actions = self.group.actions.filter(function (n) {
        return n != undefined
      });
      self.get_add_actions();
    };

    /*
     * check if Edit/Add clicked
     */
    if (self.groupId) {
      self.group = GroupAdmin.get(self.groupId);
      self.group.$promise.then(function () {
        self.get_add_actions()
      });
      console.log(self.group)
    } else {
      self.isNew = true;
      self.group = GroupAdmin.create();
      self.group.configuration_id = self.groupId;
      self.get_add_actions();
    }
  }

  angular.module('ate.admin')
    .controller('GroupAddController', ['$location', 'GroupAdmin', '$route', GroupAddController]);
}());
