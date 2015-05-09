(function () {
  function ServerListController(ServerAdmin) {
    var self = this;
    console.log(ServerAdmin);
    self.servers = ServerAdmin.query();

     self.remove = function (station) {
        console.log(station);
        console.log(station._id);
        station.$remove({_id: station._id}, function () {
          self.servers = ServerAdmin.query();
        });
      };
  }

  angular.module('ate.admin')
    .controller('ServerListController', ['ServerAdmin',ServerListController]);
}());
