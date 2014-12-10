;(function(){
  'use strict';

  angular.module('todoApp')
    .factory('todoFactory', function($http, $location){

      function getTodo(id, cb){
        var url = 'https://omgttt.firebaseio.com/list/' + id + '.json';

        $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function editTodo(id, todo){
        var url = 'https://omgttt.firebaseio.com/list/' + id + '.json';
        $http.put(url, todo)
        .success(function(data){
          $location.path('/');
        })
        .error(function(err){
          console.log(err);
        });
      }

      function getAllTodos(cb){
        $http.get('https://omgttt.firebaseio.com/list.json')
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function createTodo(task, cb){
        $http.post('https://omgttt.firebaseio.com/list.json', task)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function deleteTodo(todoId, cb){
        var url = 'https://omgttt.firebaseio.com/list/' + todoId + '.json';
        $http.delete(url)
        .success(function(){
          cb();
        })
        .error(function(err){
          console.log(err);
        });
      }

      var priorityOptions = {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        whocares: 'Whatev'
      };

      return {
        getTodo: getTodo,
        editTodo: editTodo,
        getAllTodos: getAllTodos,
        createTodo: createTodo,
        deleteTodo: deleteTodo,
        priorityOptions: priorityOptions
      };
    })
}());
