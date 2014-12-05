;(function(){
  'use strict';

  angular.module('todoApp', [])
    .controller('TodoController', function(){
      var vm = this;
      vm.tasks = [
        {
          name: 'Learn Angular',
          desc: 'If I could learn Angular I\'d be sooooo happy!',
          due: 'Today',
          priority: 'high'
        },
        {
          name: 'Finish Tic Tac Toe',
          desc: 'Firebase Arrrrggggghhhhh!',
          due: 'Monday',
          priority: 'medium'
        },
        {
          name: 'Get a job',
          desc: 'Profit!',
          due: 'April 2015',
          priority: 'medium'
        }
      ];

      vm.addNewTask = function(){
        vm.tasks.push(vm.newTask);
        vm.newTask = _freshTask();
      };

      vm.removeTodo = function(todo){
        var index = vm.tasks.indexOf(todo);
        vm.tasks.splice(index,1);
      };

      vm.newTask = _freshTask();

      function _freshTask(){
        return {
          priority: 'low'
        }
      }

    });

}());
