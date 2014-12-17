;(function(){
  'use strict';

  angular.module('todoApp')
    .config(function($routeProvider){
      $routeProvider
      .when('/todos', {
        templateUrl: 'views/table.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        private: true
      })
      .when('/todos/new', {
        templateUrl: 'views/form.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        private: true
      })
      .when('/todos/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show',
        private: true
      })
      .when('/todos/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'todo',
        private: true
      })
      .when('/todos/:id/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadController',
        controllerAs: 'todo',
        private: true
      })
    })
}());
