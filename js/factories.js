;(function(){
  'use strict';

  angular.module('todoApp')
    .factory('todoFactory', function($rootScope, FIREBASE_URL, $http, $location){

      function _todosUrl(id){
        if (id) {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid + '/tasks/' + id + '.json';
        } else {
          return FIREBASE_URL + '/users/' + $rootScope.user.uid + '/tasks.json';
        }

      }

      function getTodo(id, cb){
        $http.get(_todosUrl(id))
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function editTodo(id, todo){
        $http.put(_todosUrl(id), todo)
        .success(function(data){
          $location.path('/');
        })
        .error(function(err){
          console.log(err);
        });
      }

      function getAllTodos(cb){
        $http.get(_todosUrl())
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function createTodo(task, cb){
        $http.post(_todosUrl(), task)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function deleteTodo(todoId, cb){
        $http.delete(_todosUrl(todoId))
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
