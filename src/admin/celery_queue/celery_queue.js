(function () {
    function CeleryQueueAdmin(CeleryControlService) {

        var self = this;
        self.queues = CeleryControlService.getQueues();
        self.workers = CeleryControlService.getWorkersList();
        self.error = '';
        self.debug = '';
        self.newQueue = '';

        /**
         * Add a queue to the system
         * @param name
         * @returns {*}
         */
        self.addQueue = function () {

            CeleryControlService.addQueue(self, self.newQueue);
            self.newQueue = '';
        };
        /**
         * Add a queue to a worker
         * @param worker
         * @param queue
         * @returns {*}
         */
        self.addWorkerQueue = function (worker, queue) {
            return CeleryControlService.addWorkerQueue(worker, queue);
        };
        /**
         * Removes a queue from a worker
         * @param worker
         * @param queue
         * @returns {*}
         */
        self.removeWorkerQueue = function (worker, queue) {
            return CeleryControlService.removeWorkerQueue(worker, queue);
        };

        self.notInQueue = function (worker) {
            ret = [];
            for (var i = 0; i < self.queues.length; i++) {
                if (worker.queues.indexOf(self.queues[i]) < 0) {
                    ret.push(self.queues[i]);
                }
            }
            return ret;

        }

    }

    angular.module('ate.admin')
        .controller('CeleryQueueAdmin', ['CeleryControlService', CeleryQueueAdmin]);
}());
