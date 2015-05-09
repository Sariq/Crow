(function () {

  function HomeController() {
    var self = this;
    self.log = function (info) {
      console.console.log(info);
    };

    self.box = {x: 10, y: 10, z: 10};
    self.boxes = [
      {x: 10, y: 10, z: 10},
      {x: 10, y: 10, z: 10},
      {x: 10, y: 10, z: 10},
      {x: 10, y: 10, z: 10}
    ];

    self.boxesHir = [
      {name: 'Big Box', content: [{'Medium Box': {x: 2, y: 3, z: 2}}]},
      {name: 'Medium Box', content: [{'Small Box': {x: 2, y: 2, z: 1}}]},
      {name: 'Small Box', content: [{'product': {x: 10, y: 10, z: 2}}]}
    ];

    self.boxBottomUp = [
      {boxId:'Small', content:[{boxId:'',product:true,quantity:{x:2,y:2,x:5}}]},
      {boxId:'Medium', content:[{boxId:'Small',product:false,quantity:{x:2,y:2,x:5}}]},
      {boxId:'Big', content:[{boxId:'Medium',product:false,quantity:{x:2,y:2,x:5}}]}
    ];


    //self.hir = {name:'bix', contains:[{name:'medium',quantity:10,contains:[{name:'small',]}]}]};




  }
  angular.module('ate.packing')
    .controller('HomeController', [HomeController]);
}());
