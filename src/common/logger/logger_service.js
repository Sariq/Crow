(function () {
    /**
     * Collect logs from all
     *
     * @returns {{}}
     * @constructor
     */
    function LoggerService() {


        var service = {
            logs: [],
            entities: [],
            levels: [
                {id: 1, name: 'debug'},
                {id: 2, name: 'info'},
                {id: 3, name: 'error'},
                {id: 4, name: 'critical'}
            ]
        };
        /**
         * entity such station,fixture, cavity
         * @param entity
         */
        service.addEntity = function (entity) {

        };
        /**
         * Report a new log
         * @param entity
         * @param txt - text of the log
         * @param level
         * @param data information in any format
         *
         */
        service.log = function (level, txt, entity, data, duration) {

            service.logs.unshift({
                level: level,
                txt: txt,
                time: new Date(),
                entity: entity,
                data: data,
                duration: duration
            });
            if (service.entities.indexOf(entity) < 0) {
                service.entities.push(entity);
            }
        };
        /**
         * Shortcut for log('debug'...)
         */
        service.debug = function (txt, entity, data, duration) {
            return service.log(1, txt, entity, data, duration);
        };
        /**
         * Shortcut for log('info'...)
         */
        service.info = function (txt, entity, data, duration) {
            return service.log(2, txt, entity, data, duration)
        };
        /**
         * Shortcut for log('error'...)
         */
        service.error = function (txt, entity, data, duration) {
            return service.log(3, txt, entity, data, duration);
        };
        /**
         * Shortcut for log('critical'...)
         */
        service.critical = function (txt, entity, data, duration) {
            return service.log(4, txt, entity, data, duration);
        };

        return service
    }


    angular.module('ate.common')
        .service('LoggerService', [LoggerService]);
}());
