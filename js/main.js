;(function(){
  'use strict';

  angular.module('todoApp', [])
    .controller('TodoController', function(){
      var vm = this;
      vm.tasks = [
        {
          name: 'Learn Angular',
          desc: 'If I could learn Angular I\'d be sooooo happy!',
          due: 'Today'
        },
        {
          name: 'Finish Tic Tac Toe',
          desc: 'Firebase Arrrrggggghhhhh!',
          due: 'Monday'
        },
        {
          name: 'Get a job',
          desc: 'Profit!',
          due: 'April 2015'
        }
      ];

      vm.addNewTask = function(){
        vm.tasks.push(vm.newTask);
        vm.newTask = null;
      };

    });

}());
