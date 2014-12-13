;(function(){
  'use strict';

  angular.module('todoApp')
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
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
      .otherwise({redirectTo: '/'});
    })
}());
