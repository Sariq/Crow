/**
 * Created by davidl on 27/11/2014.
 */
console.log();

console.log();

//iife
(function () {
  /* Add your code here*/

}());


//angm
(function () {
  angular.module('MODULE_NAME', []);
}());


//angc - angular controller

(function () {
  function MyController($route) {
    console.log('MyController');
  }

  angular.module('ate.admin')
    .controller('MyController', ['$route', MyController]);
}());

