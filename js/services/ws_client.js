'use strict';
/**
 * Created by davidl on 07/09/14.
 */
angular.module('ate.monitor').service('WsClient',
  ['$q','$rootScope','$http','$location',
    function($q, $rootScope, $http, $location) {
    // We return this object to anything injecting our service

    var Service = {
      callbacks:[]
    };
    //sets callback for a key
    Service.setCallback = function(key,callback) {
      this.callbacks[key] = callback;
    };
    console.log('web_socket_url:' + web_socket_url);

    //var ws = new WebSocket(web_socket_url);
    var sock = new SockJS(web_socket_url);
    console.log('timson test');
    console.log(sock);
    //var ws = new WebSocket(web_socket_url);
    //var ws = new WebSocket('ws://'+ window.location.host +'/ws');
    ws.onopen = function(){
        Service.status='Open';
        //$rootScope.$apply();
    };

    ws.onmessage = function(ev) {
      var data = JSON.parse(ev.data);
      //console.log(data);
      //console.log(data.msg_type);
      //console.log(Service.callbacks);

      if (Service.callbacks[data.msg_type]) {
          //calling the right callback
          Service.callbacks[data.msg_type](data);
      }
    };
    ws.onclose = function(ev){
        Service.status = 'Closed';
        console.log('web socket has been closed');
        //TODO: Try reconnecting every 2 seconds until connected again.
        //$rootScope.$apply();
    };
    ws.onerror = function(ev){
      Service.status = 'Error';
      //$rootScope.$apply();
      console.log('ws.onerror');
    };
    Service.addFilters = function(filters) {
      var message = {type:'add_entity_filters',filters:filters};
      ws.send(angular.toJson(message));
    };
    Service.removeFilters = function(filters) {
      var message = {type:'remove_entity_filters',filters:filters};
      ws.send(angular.toJson(message));
    };
    Service.clearFilters = function() {
      var message = {type:'clear_filters'};
      ws.send(angular.toJson(message));
    };
    Service.sendMessage = function(message) {
      ws.send(angular.toJson(message));
    };
    return Service;
}]);