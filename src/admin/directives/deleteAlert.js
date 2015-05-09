(function () {

  function deleteAlert() {
   return {
            restrict: 'A',
            scope: {
                objectName: '@',
                confirmAction: '&'
            },
            link: function (scope, element, attrs) {
                    element.bind('click', function (e) {
                         swal({title: "Are you sure?",text: "You will not be able to recover this "+ scope.objectName,   type: "warning",
                         showCancelButton: true,   objectButtonColor: "#DD6B55",   objectButtonText: "Yes, delete it!",
                         cancelButtonText: "No, cancel Please!",   closeOnobject: false,   closeOnCancel: false },
                  function(isobject){   if (isobject) {
                         swal({title: "Deleted!",   text: "Your Project Family has been deleted.",type:"success" , timer: 1000 });

                         scope.confirmAction();

                  }
                  else {swal({title: "Cancelled",   text: "Your " +scope.objectName+"  is safe.",type:"error" ,objectButton:false, timer: 1000 });}
                  });
                    });
            }
        };

  }

  angular.module('ate.admin')
    .directive('objectName', deleteAlert);
}());
