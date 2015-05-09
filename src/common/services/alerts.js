(function () {

    /**
     * AlertService collects alerts of system status
     *
     * @param WsClient
     * @returns  a service object
     * @constructor
     */
    function AlertService(WsClient) {

        var service = {
            WebSocketStatus: {
                status: WsClient.status,
                info: '',
                wsEvent: ''
            },
            serverStatuses: [
                {
                    'status': 'offline',
                    'info': '',
                    'name': 'rabbitmq',
                    'required': true

                },
                {
                    'status': 'offline',
                    'info': '',
                    'name': 'mongodb',
                    'required': true
                },
                {
                    'status': 'offline',
                    'info': '',
                    'name': 'celery',
                    'required': true
                },
                {
                    'status': 'offline',
                    'info': '',
                    'name': 'logger',
                    'required': false
                },
                {
                    'status': 'offline',
                    'info': '',
                    'name': 'redis',
                    'required': false
                }
            ]

        };
        /**
         * Can the TSE run with current servers status
         */
        service.canRunTse = function () {
            return true;
        };
        /**
         * onServerStatus
         * @param data
         */
        service.serverStatusCallback = function (data) {
            service.serverStatuses = data.data;
            console.log(data);
        };
        /**
         * Callback function alert open web socket
         */
        service.onOpenWs = function () {
            service.WebSocketStatus.status = 'online';
            service.WebSocketStatus.wsEvent = '';
        };
        /**
         * Callback function alert open web socket
         */
        service.onCloseWs = function (ev) {
            service.WebSocketStatus.status = 'offline';
            service.WebSocketStatus.wsEvent = ev;
            //console.log('onCloseWs status='+scope.wsStatus);
        };


        //WsClient.setOpenCallback(service.onOpenWs);
        //WsClient.setCloseCallback(service.onCloseWs);
        //WsClient.setCallback('server_alert', service.serverStatusCallback);

        return service;
    }


    angular.module('ate.common')
        .service('AlertService', ['WsClient', AlertService]);

}());
