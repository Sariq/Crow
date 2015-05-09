(function () {

    function ateBarcodeReaderSticker($location, BarcodeReaderService) {
        return {
            restrict: 'E',
            templateUrl: '/static/src/common/directives/stickers/barcode_reader/barcode_reader_sticker.html',
            link: function (scope, element, attr) {

                /**
                 * toggle barcode/keyboar mode
                 */
                scope.toggleReaderMode = function () {
                    BarcodeReaderService.toggleReaderMode();
                };
                /**
                 * get service current value.
                 *
                 * @returns {*}
                 */
                scope.getReaderMode = function () {
                    return BarcodeReaderService.getReaderMode();
                };
            }
        }
    }

    angular.module('ate.common')
        .directive('ateBarcodeReaderSticker', ['$location', 'BarcodeReaderService', ateBarcodeReaderSticker]);
}());