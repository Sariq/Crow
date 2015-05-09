(function () {
    function OperationLogService($http, LoggerService) {
        var service = {};
        service.loadOperationLog = function (container, start, cnt) {
            $http.get('/admin/api/operation_log?start='+start+'&cnt='+cnt).success(function (data) {
                if (data.status == 0) {
                    console.log(data);
                    container.operationLogs = data.data;
                } else {
                    container.error = data.error;
                    LoggerService.error('OperationLogService failed to load logs:' + data.debug, 'oplog', data);
                }
            }).error(function (data) {
                LoggerService.error('http call failed', 'oplog', data);
                container.error = data;
            })
        };

        service.loadAdminOperationLog = function (container, start, cnt) {
            $http.get('/admin/api/operation_log?admin=1&start='+start+'&cnt='+cnt).success(function (data) {
                if (data.status == 0) {
                    console.log(data);
                    container.adminOperationLogs = data.data;
                } else {
                    container.error = data.error;
                    LoggerService.error('OperationLogService failed to load logs:' + data.debug, 'oplog', data);
                }
            }).error(function (data) {
                LoggerService.error('http call failed', 'oplog', data);
                container.error = data;
            })
        };
        service.createOperationLog = function (action, entity, status, comments) {
            log = {
                entity: entity,
                action: action,
                comments: comments,
                status:status
            };
            $http.post('admin/api/operation_log', log).success(function (data) {
                if (data.status == 0) {
                    container.operationLogs = data.data;
                } else {
                    container.error = data.error;
                    LoggerService.error('OperationLogService failed to create log:' + data.debug, 'oplog', log);
                }
            }).error(function (data) {
                LoggerService.error(data, 'oplog', log);
                container.error = data.error;
            })
        };
        return service
    }

    angular.module('ate.common')
        .service('OperationLogService', ['$http', 'LoggerService', OperationLogService]);
}());
