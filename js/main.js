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
          priority: 'high',
          image: 'http://i.imgur.com/IJMGmz8.png'
        },
        {
          name: 'Finish Tic Tac Toe',
          desc: 'Firebase Arrrrggggghhhhh!',
          due: 'Monday',
          priority: 'medium',
          image: 'http://i.imgur.com/4NPS39X.jpg'
        },
        {
          name: 'Get a job',
          desc: 'Profit!',
          due: 'April 2015',
          priority: 'medium',
          image: 'http://i.imgur.com/VDHV0KT.jpg'
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

      vm.priorityOptions = {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        whocares: 'Whatev'
      };

      function _freshTask(){
        return {
          priority: 'low'
        }
      }

    });

}());
