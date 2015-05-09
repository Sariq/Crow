(function () {
  /**
   *
   * TODO: load information from profile.
   * @returns {{restrict: string, templateUrl: string, link: Function}}
   */

  function ateStickerContainer() {
    return {
      restrict: 'E',
      templateUrl: '/static/src/common/directives/stickers/container/sticker_container.html',
      link: function (scope, element, attr) {

        /**
         *
         * @returns {string}
         */

      }
    }
  }
  angular.module('ate.common')
    .directive('ateStickerContainer', [ ateStickerContainer]);
}());