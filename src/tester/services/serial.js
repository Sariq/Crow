(function () {
    /**
     * Serial service - handles serial number validation
     * @constructor
     * @param $http
     */
    function SerialService($http, LoggerService) {


        /**
         * Evaluate serial number with the server
         * @param fixture
         * @param batch - batch configuration
         * @returns {*}
         */
        self.evaluateSerial = function (fixture, batch) {
            var data = {cavities: [], setup: batch};
            var focus = false;
            for (var i = 0; i < fixture.cavities.length; i++) {
                if (i == 0) {
                    focus = true;
                } else {
                    focus = false;
                }

                data.cavities.push(
                    {
                        id: (i + 1).toString(),
                        serial: fixture.cavities[i].serial,
                        state: fixture.cavities[i].enabled,
                        valid: false,
                        focus: focus
                    }
                )

            }
            LoggerService.debug('Sending serial number to server', 'SerialService', data);
            $http.post('/tester/api/serial', data)
                .success(function (data, status) {
                    console.log(data);
                    fixture.debug = data.debug;
                    if (data.status == 0) {
                        LoggerService.debug('Validation sucess', 'SerialService', data.data, data.duration);
                        fixture.ready_for_run = data.data.ready_for_run;
                        if (data.data.ready_for_run) {
                            fixture.runStatus.state = 'ready';
                            LoggerService.debug('Ready to Run', 'SerialService');
                        }
                        for (var i = 0; i < data.data.cavities.length; i++) {
                            fixture.cavities[i].valid = data.data.cavities[i].valid;
                            fixture.cavities[i].rejection = data.data.cavities[i].rejection;
                            fixture.error = data.data.cavities[i].rejection;
                        }
                    } else {
                        LoggerService.debug("validation error"+ data.error + "|"+ data.debug, 'SerialService', data.data, data.duration);
                        fixture.error = data.error;
                    }
                }).
                error(function (data, status) {
                    fixture.error = 'error in serial number validation';
                    console.log("Request failed");
                    console.log(data);
                    LoggerService.critical('Server call failed' + data, 'SerialService');
                });
        };
        return self;
    }

    angular.module('ate.tester')
        .service('SerialService', ['$http', 'LoggerService', SerialService]);
}());

