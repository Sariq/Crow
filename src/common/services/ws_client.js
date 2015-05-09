'use strict';
/**
 * Created by davidl on 07/09/14.
 */

(function () {


    function WsClient($timeout) {
        // We return this object to anything injecting our service

    var Service = {
      callbacks: [],
      openCallbacks: [],
      closeCallbacks: [],
      waitingMessages: []
    };

    //sets callback for a key
    Service.setCallback = function (key, callback) {
      console.log('setCallback for ' + key);
      this.callbacks[key] = callback;
    };

    /**
     * Set a callback for close event
     * @param callback
     */
    Service.setCloseCallback = function (callback) {
      console.log('setCloseCallback ');
      this.closeCallbacks.push(callback);
    };
    /**
     * Sets a callback for open event
     * @param callback
     */
    Service.setOpenCallback = function (callback) {
      console.log('setOpenCallback');
      this.openCallbacks.push(callback);
    };

    console.log('web_socket_url:' + web_socket_url);

    //Using low level WebSocket
    //var ws = new WebSocket(web_socket_url);
    //using SockJS
    var ws = new SockJS(web_socket_url);
    //var ws = new WebSocket('ws://'+ window.location.host +'/ws');
    ws.onopen = function () {
      console.log('Open websocket with protocol ' + ws.protocol);

      Service.status = 'Open';
      console.log(Service.waitingMessages);
      for (var i = 0; i < Service.waitingMessages.length; i++) {
        Service.sendMessage(Service.waitingMessages[i]);
      }
      for (var i = 0; i < Service.openCallbacks.length; i++) {
        Service.openCallbacks[i]();
      }
    };

    ws.onmessage = function (ev) {
      var data = JSON.parse(ev.data);
      //console.log(data);
      //console.log(data.msg_type);
      //console.log(Service.callbacks);

      if (Service.callbacks[data.msg_type]) {
        //calling the right callback
        Service.callbacks[data.msg_type](data);
      }
    };
    ws.onclose = function (ev) {
      var t = new Date();
      console.log(t.getTime());
      Service.status = 'Closed';
      console.log(ev);
      console.log('web socket has been closed');

      for (var i = 0; i < Service.closeCallbacks.length; i++) {
        console.log('calling closeCallbacks :'+i);
        Service.closeCallbacks[i](ev);
      }
      //TODO: Try reconnecting every 2 seconds until connected again.
      //$rootScope.$apply();
    };
    ws.onerror = function (ev) {
      Service.status = 'Error';
      //$rootScope.$apply();
      console.log(ev);
    };
    Service.addFilters = function (filters) {
      var message = {type: 'add_entity_filters', filters: filters};
      console.log('adding filters' + angular.toJson(message));
      Service.sendMessage(message);
    };
    Service.removeFilters = function (filters) {
      var message = {type: 'remove_entity_filters', filters: filters};
      Service.sendMessage(message);
    };
    Service.clearFilters = function () {
      var message = {type: 'clear_filters'};
      Service.sendMessage(message);
    };
    Service.sendMessage = function (message) {
      if (Service.status != 'Open') {
        console.log('I try to write ' + angular.toJson(message) + ' , but web socket is closed');
        Service.waitingMessages.push(message);
        return false;
      }
      try {
        ws.send(angular.toJson(message));
        //ws.send(message);
      } catch (e) {
        console.log(e);
        console.log(ws);
//        $timeout(function() {
//          ws.send(angular.toJson(message));
//          }, 4000);
      }
    };

    return Service;
  }

  angular.module('ate.common').service('WsClient', ['$timeout', WsClient]);

}());