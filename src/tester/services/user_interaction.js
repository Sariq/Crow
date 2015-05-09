(function () {

  function UserInteractionService($modal, WsClient, UserInteractionModalController) {

    var self = this;

    self.openModal = function (data) {
        var modalInstance = $modal.open({
          templateUrl: '/static/src/tester/views/user_interaction/user_interaction.html',
          controller: 'UserInteractionModalController',
          resolve: {
            data: function () {
              return {data: data};
            }
          }
        });

        modalInstance.result.then(function (data) {
          var resp = angular.copy(data);
          console.log(resp);
          resp.method = 'response';
          resp.msg.value = true;
          resp.type = 'private_message';
          WsClient.sendMessage(resp);
          console.log('Selected True');
        }, function (data) {
          var resp = angular.copy(data);
          resp.method = 'response';
          resp.msg.value = true;
          resp.type = 'private_message';
          WsClient.sendMessage(resp);
          console.log('Selected false');
        });
      };

  }

  angular.module('ate.tester')
    .service('UserInteractionService', ['$modal', 'WsClient',
      'UserInteractionModalController',UserInteractionService]);
}());