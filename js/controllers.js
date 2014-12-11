;(function(){
  'use strict';

  angular.module('todoApp')
    .factory('authFactory', function(FIREBASE_URL){
      var factory = {},
          ref = new Firebase(FIREBASE_URL);

      factory.login = function(email, pass, cb){
        ref.authWithPassword({
            email    : email,
            password : pass
          }, function(error, authData) {
            if (error === null) {
              console.log('User logged in successfully', authData);
              cb();
            } else {
              console.log('Error logging in user:', error);
            }
          }
        );
      };

      factory.logout = function(cb){
        ref.unauth(function(){
          cb();
        });
      };

      return factory;
    })
    .controller('LoginController', function(authFactory, $scope, $location){
      var vm = this;

      vm.login = function(){
        authFactory.login(vm.email, vm.password, function(){
          $location.path('/');
          $scope.$apply();
        });
      };

      vm.register = function(){
        var ref = new Firebase('https://omgttt.firebaseio.com')

        ref.createUser({
          email    : vm.email,
          password : vm.password
        }, function(error, authData) {
          if (error === null) {
            console.log('User created successfully', authData);
            vm.login();
          } else {
            console.log('Error creating user:', error);
          }
        });
      }

      vm.forgotPassword = function(){
        var ref = new Firebase('https://omgttt.firebaseio.com');

        ref.resetPassword({
            email : vm.email
          }, function(error) {
          if (error === null) {
            console.log("Password reset email sent successfully");
          } else {
            console.log("Error sending password reset email:", error);
          }
        });
      };
    })
    .controller('LogoutController', function($scope, $location, authFactory){
      authFactory.logout(function(){
        $location.path('/');
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
    .controller('TodoController', function($http, todoFactory){
      var vm = this;

      todoFactory.getAllTodos(function(data){
        vm.tasks = data;
      });

      vm.addNewTask = function(){
        todoFactory.createTodo(vm.newTask, function(data){
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
