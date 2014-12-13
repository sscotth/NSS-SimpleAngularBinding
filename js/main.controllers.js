;(function(){
  'use strict';

  angular.module('todoApp')
    .factory('authFactory', function($rootScope, $location, FIREBASE_URL){
      var factory = {},
          ref = new Firebase(FIREBASE_URL);

      $rootScope.user = ref.getAuth();

      factory.requireLogin = function(){
        if (!_isLoggedIn()) {
          $location.path('/login');
        } else if (_hasTemporaryPassword()) {
          $location.path('/changepassword');
        }
      };

      factory.disallowLogin = function(){
        if (_isLoggedIn()) {
          $location.path('/todos');
        }
      };

      function _isLoggedIn(){
        return Boolean(ref.getAuth());
      }

      function _hasTemporaryPassword(){
        return ref.getAuth().password.isTemporaryPassword;
      }

      factory.changePassword = function(oldPass, newPass, cb){
        ref.changePassword({
            email       : ref.getAuth().password.email,
            oldPassword : oldPass,
            newPassword : newPass,
          }, function(error) {
            if (error === null) {
              console.log('Password changed successfully');
              cb();
            } else {
              console.log('Error changing password:', error);
            }
          }
        );
      };

      factory.login = function(email, pass, cb){
        ref.authWithPassword({
            email    : email,
            password : pass
          }, function(error, authData) {
            if (error === null) {
              console.log('User logged in successfully', authData);
              $rootScope.user = authData;
              ref.child('users').child(authData.uid).child('authData').set(authData);
              cb();
            } else {
              console.log('Error logging in user:', error);
            }
          }
        );
      };

      factory.logout = function(cb){
        ref.unauth(function(){
          $rootScope.user = null;
          cb();
        });
      };

      factory.register = function(email, pass, cb){
        ref.createUser({
            email    : email,
            password : pass
          }, function(error, authData) {
            if (error === null) {
              console.log('User created successfully', authData);
              cb();
            } else {
              console.log('Error creating user:', error);
            }
          }
        );
      };

      factory.resetPassword = function(email){
        ref.resetPassword({
            email : email
          }, function(error) {
            if (error === null) {
              console.log('Password reset email sent successfully');
            } else {
              console.log('Error sending password reset email:', error);
            }
          }
        );
      };

      return factory;
    })
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