;(function(){
  'use strict';

  angular.module('todoApp')
    .constant('FIREBASE_URL', 'https://omgttt.firebaseio.com')
    .factory('todoFactory', function(FIREBASE_URL, $http, $location){

      function getTodo(id, cb){
        var url = FIREBASE_URL + '/list/' + id + '.json';

        $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function editTodo(id, todo){
        var url = FIREBASE_URL + '/list/' + id + '.json';
        $http.put(url, todo)
        .success(function(data){
          $location.path('/');
        })
        .error(function(err){
          console.log(err);
        });
      }

      function getAllTodos(cb){
        $http.get(FIREBASE_URL + '/list.json')
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function createTodo(task, cb){
        $http.post(FIREBASE_URL + '/list.json', task)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
      }

      function deleteTodo(todoId, cb){
        var url = FIREBASE_URL + '/list/' + todoId + '.json';
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
