;(function(){
  'use strict';

  angular.module('todoApp', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/table.html',
        controller: 'TodoController',
        controllerAs: 'todoCtrl'
      })
      .when('/new', {
        templateUrl: 'views/form.html',
        controller: 'TodoController',
        controllerAs: 'todoCtrl'
      })
      .when('/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .otherwise({redirectTo: '/'});
    })
    .controller('ShowController', function($http, $routeParams){
      var vm = this;
      var id = $routeParams.id;
      $http.get('https://omgttt.firebaseio.com/list/' + id + '.json')
        .success(function(data){
          vm.task = data;
        })
        .error(function(err){
          console.log(err);
        });
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
