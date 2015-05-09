(function () {

  function currentTimeSticker($location) {
    return {
      restrict: 'E',
      templateUrl: '/static/src/common/directives/stickers/current_time/current_time_sticker.html',
      link: function (scope, element, attr) {
        /**
         *
         * @returns {string}
         */
        scope.getCss = function () {
          if(!scope.cavity.enabled){
            return 'cavity-disabled'
          }
          try {
            return 'cavity-' + scope.cavity.status;
          } catch (e) {
            return 'cavity-idle'
          }
        };
        scope.changeBatch = function(){
          $location.path('/batch');
        };
      }
    }
  }

  angular.module('ate.common')
    .directive('currentTimeSticker', ['$location', currentTimeSticker]);
}());