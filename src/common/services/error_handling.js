(function () {
  /**
   * The error handling service - collects errors from a variety of systems
   * Errors of different levels should be reported to this service.
   *
   * @returns {{}}
   * @constructor
   */
  function ErrorHandlingService() {


    var service = {
      entities: []
    };
    /**
     * entity such station,fixture, cavity
     * @param entity
     */
    service.addEntity = function (entity) {

    };
    /**
     * Report a new
     * @param entity
     * @param error
     * @param level
     * @param blocking
     * @param expiration time
     */
    service.reportError = function (entity, error, level, blocking, expiration) {

    };
    service.getEntityError = function (entity, error, level, blocking, expiration) {

    };
    service.getError = function (level, blocking) {

    };
    service.getErrors =function(){

    };

    return service
  }


  angular.module('ate.common')
    .service('ErrorHandlingService', [ErrorHandlingService]);
}());
