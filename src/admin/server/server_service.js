(function () {

  function ServerAdmin($resource) {


    var self = this;
    self.info ={
     service_type:['mongod', 'mongos', 'redis', 'ate_monitor',
        'rabbitmq', 'flower', 'celery_worker', 'ngnix', 'supervisor', 'nssm',
      'logstash','elastic search','kibana'],
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };

    self.serverResource = $resource('/admin/api/server',{},
      {update: {method: 'PUT'}}
    );

    self.get = function(server_id){
      return self.serverResource.get({_id:server_id });
    };


    self.addService = function (server) {
        server.services.push({type: '', version: '', instances: 1, port: '', monitor_url: '',log_url: '', comments: '', config: ''});
    };
    self.deleteService = function (server, idx) {
        server.services.splice(idx,1);
    };

    self.create = function(){
      var server = {ip: '',
        host: '',
        comments: '',
        os: '',
        deleted: false,
        location: '',
        active: true,
        services: [

    {type: '', version: '', instances: 1, port: '', monitor_url: '',log_url: '', comments: '', config: ''}
        //  {type: 'b', version: 'b', instances: 1, port: '', monitor_url: '',log_url: '', comments: '', config: ''}

        ]
      };
      return new self.serverResource(server);
    };

    self.query = function (){
      return self.serverResource.query();
    };

    return self;
  }

  angular.module('ate.admin')
    .service('ServerAdmin', ['$resource',ServerAdmin])
}());