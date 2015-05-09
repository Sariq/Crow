(function () {

  function AdminController() {
    var self = this;

    self.info = [{type: "box", name: "Xlarge"},
      {type: "box", name: "Large"},
      {
      type: "box",
      name: "small"
    }, {type: "box", name: "Xsmall"}, {type: "product", name: "product1"}];
    self.infoBox = [{type: "box", name: "Xlarge"}, {type: "box", name: "Large"}, {
      type: "box",
      name: "small"
    }, {type: "box", name: "Xsmall"}];

    self.boxes = [];

    self.addBox = function () {
      self.boxes.push({name: '', content: []});
    };
    self.addBoxContent = function (box) {
      box.content.push({box_type: '', cnt: 1});
    };

    self.log = function (info) {
      console.console.log(info);
    };
  }

  angular.module('ate.packing')
    .controller('AdminController', [AdminController]);
}());
