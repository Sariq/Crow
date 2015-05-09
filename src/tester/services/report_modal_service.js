(function () {
  /**
   * Creates a modal window with the report
   * @param $modal
   * @param ReportModalController
   * @constructor
   */
  function ReportModalService($modal) {

    var self = this;
    
    self.openModal = function (data) {
      console.log('ReportModalService.openModal');

      console.log(data);
        var modalInstance = $modal.open({
          templateUrl: '/static/src/tester/views/report_modal/report_modal.html',
          controller: 'ReportModalController',
          resolve: {
            data: function () {
              return {data: angular.copy(data)};
            }
          }
        });

        modalInstance.result.then(function (data) {
          console.log('Selected True');
        }, function (data) {
          var resp = angular.copy(data);
          console.log('Selected false');
        });
      };

  }

  angular.module('ate.tester')
    .service('ReportModalService', ['$modal',ReportModalService]);
}());




