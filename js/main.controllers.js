;(function(){
  'use strict';

  angular.module('todoApp')
    .controller('ChangePasswordController', function($scope, $location, authFactory){
      var vm = this;
      vm.changePassword = function(){
        authFactory.changePassword(vm.oldPassword, vm.newPassword, function(){
          $location.path('/logout');
          $scope.$apply();
        })
      };
    })
    .controller('LoginController', function(authFactory, $scope, $location){
      var vm = this;

      vm.login = function(){
        authFactory.login(vm.email, vm.password, function(){
          $location.path('/todos');
          $scope.$apply();
        });
      };

      vm.register = function(){
        authFactory.register(vm.email, vm.password, function(){
          vm.login();
        });
      };

      vm.forgotPassword = function(){
        authFactory.resetPassword(vm.email);
      };
    })
    .controller('LogoutController', function($scope, $location, authFactory){
      authFactory.logout(function(){
        $location.path('/login');
        $scope.$apply();
      });
    })
    .controller('ShowController', function($routeParams, todoFactory){
      var vm = this;
      var id = $routeParams.id;
      todoFactory.getTodo(id, function(data){
        vm.task = data;
      });
    })
    .controller('EditController', function($routeParams, todoFactory){
      var vm = this;
      var id = $routeParams.id;

      todoFactory.getTodo(id, function(data){
        vm.newTask = data;
      });

      vm.addNewTask = function(){
        todoFactory.editTodo(id, vm.newTask);
      };

      vm.priorityOptions = todoFactory.priorityOptions;

    })
    .controller('TodoController', function(todoFactory){
      var vm = this;

      todoFactory.getAllTodos(function(data){
        vm.tasks = data;
      });

      vm.addNewTask = function(){
        todoFactory.createTodo(vm.newTask, function(data){
          vm.tasks = vm.tasks || {};
          vm.tasks[data.name] = vm.newTask;
          vm.newTask = _freshTask();
        });
      };

      vm.removeTodo = function(todoId){
        todoFactory.deleteTodo(todoId, function(){
          delete vm.tasks[todoId];
        });
      };

      vm.newTask = _freshTask();

      vm.priorityOptions = todoFactory.priorityOptions;

      function _freshTask(){
        return {
          priority: 'low'
        };
      }

    });

}());
