;(function(){
  'use strict';

  angular.module('todoApp', ['ngRoute', 'mgcrea.ngStrap'])
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/table.html',
        controller: 'TodoController',
        controllerAs: 'todo'
      })
      .when('/new', {
        templateUrl: 'views/form.html',
        controller: 'TodoController',
        controllerAs: 'todo'
      })
      .when('/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .when('/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'todo'
      })
      .otherwise({redirectTo: '/'});
    })
    .factory('todoFactory', function($http){

      function showTodo(id, cb){
        $http.get('https://omgttt.firebaseio.com/list/' + id + '.json')
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      return {
        showTodo: showTodo
      };
    })
    .controller('ShowController', function($routeParams, todoFactory){
      var vm = this;
      var id = $routeParams.id;
      todoFactory.showTodo(id, function(data){
        vm.task = data;
      });
    })
    .controller('EditController', function($http, $routeParams, $location){
      var vm = this;
      var id = $routeParams.id;
      var url = 'https://omgttt.firebaseio.com/list/' + id + '.json'
      $http.get(url)
      .success(function(data){
        vm.newTask = data;
      })
      .error(function(err){
        console.log(err);
      });

      vm.addNewTask = function(){
        $http.put(url, vm.newTask)
          .success(function(data){
            $location.path('/')
          })
          .error(function(err){
            console.log(err);
          });
      };


      vm.priorityOptions = {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        whocares: 'Whatev'
      };

    })
    .controller('TodoController', function($http){
      var vm = this;

      $http.get('https://omgttt.firebaseio.com/list.json')
        .success(function(data){
           vm.tasks = data;
        })
        .error(function(err){
          console.log(err);
        });

      vm.addNewTask = function(){
        $http.post('https://omgttt.firebaseio.com/list.json', vm.newTask)
          .success(function(data){
            vm.tasks[data.name] = vm.newTask;
            vm.newTask = _freshTask();
          })
          .error(function(err){
            console.log(err);
          });
      };

      vm.removeTodo = function(todoId){
        var url = 'https://omgttt.firebaseio.com/list/' + todoId + '.json';
        $http.delete(url)
          .success(function(){
            delete vm.tasks[todo];
          })
          .error(function(err){
            console.log(err);
          });
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
