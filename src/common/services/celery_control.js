(function () {

  function CeleryControlService() {
    var service = {
      celery_queues:['default','deployment','debug','custom1'],
      workers:[
        {'host':'ate-tst-1',queues:['default']},
        {'host':'ate-tst-2',queues:['default']},
        {'host':'ate-tst-3',queues:['deployment']},
        {'host':'ate-tst-4',queues:['debug']},
        {'host':'ate-tst-5',queues:['custom1','debug']}
      ]
    };
    service.getQueues = function () {
      return service.celery_queues;

    };
    service.addQueue = function (container, name) {
      if (service.celery_queues.indexOf(name) >-1){
        container.error = 'queue name:['+name +'] already exists, queue names must be unique';
        return false;
      }

      service.celery_queues.push(name);
    };
    service.addWorkerQueue = function (worker,queue) {
      if (worker.queues.indexOf(queue) < 0){
        worker.queues.push(queue)
      }
    };
    service.removeWorkerQueue = function (worker,queue) {
      worker.queues.splice(worker.queues.indexOf(queue), 1);
    };
    service.getWorkersList = function () {
      return service.workers;
    };
    return service
  }


  angular.module('ate.common')
    .service('CeleryControlService', [ CeleryControlService]);

}());
