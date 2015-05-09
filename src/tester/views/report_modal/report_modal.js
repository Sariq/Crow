(function () {
    angular.module('ate.tester').controller('ReportModalInstanceCtrl', function ($scope, $modalInstance, items) {

        $scope.items = items;
        console.log('ModalInstanceCtrl');
        console.log(items);
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.formatCell = function (cell, last) {
            if (!last) {
                return cell;
            }
        };
        $scope.getCss = function (cell, last) {
            if (!last) {
                return cell;
            }
        };
        /**
         * opens the report in a new blank page and
         * print it.
         * @param printModal - the modal div Id
         * @returns {boolean}
         */
        $scope.printReport = function (printModal) {
            var printContents = document.getElementById(printModal).innerHTML;
            var originalContents = document.body.innerHTML;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                var popupWin = window.open('', '', 'width=1200,height=1200,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWin.window.focus();
                popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<style>@media print { .printModal-body {font-size:11px;}} button{ display: none; }' +
                'table {border-collapse: collapse;}table, th, td {border: 1px solid black;}</style>' +
                '</head><body onload="window.print()"><div class="printModal-body">' + printContents + '</div></html>');
                popupWin.onabort = function (event) {
                    popupWin.document.close();
                    popupWin.close();
                }
            } else {
                var popupWin = window.open('', '_blank', 'width=1200,height=1200');
                popupWin.document.open();
                popupWin.document.write('<html><head> <style>@media print { .printModal-body {font-size:11px;}} button{ display: none; }' +
                'table {border-collapse: collapse;}table, th, td {border: 1px solid black;}</style>' +
                '</head><body onload="window.print()"><div class="printModal-body">' + printContents + '</div></html>');
                popupWin.document.close();
            }
            popupWin.document.close();
            return true;
        }
    });
}());