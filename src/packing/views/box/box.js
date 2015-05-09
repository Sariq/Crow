(function () {

  function BoxController() {
    var self = this;
    self.boxes =  [
      {name:'small',content:{box:'',product:true,quantity:30}},
      {name:'medium',content:{box:'small',product:true,quantity:30}},
      {name:'small',product:true,quantity:30},
      {name:'small',product:true,quantity:30},
    ]

  }

  angular.module('ate.packing')
    .controller('BoxController', [BoxController]);
}());
