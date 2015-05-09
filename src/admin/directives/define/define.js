(function () {

  function ateDynamicFormDefine() {
    return {
      templateUrl: 'static/admin/directives/define/define.html',
      link: function (scope, elem, attrs) {
        var self = this;

        scope.name = '';
        scope.type = '';

        console.console.log('my_directive');
      }
    }

  }

  angular.module('ate.admin')
    .directive('myController', MyController);
}());
