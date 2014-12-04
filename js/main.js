;(function(){
  'use strict';

  angular.module('myApp', [])
    .controller('SimpleController', function(){
      var vm = this;
      vm.name = 'Scott';
      vm.friends = ['Ashley', 'Bob', 'Carley', 'Dave'];
    });

}());
