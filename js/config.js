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
        controllerAs: 'todo'
      })
      .when('/todos/new', {
        templateUrl: 'views/form.html',
        controller: 'TodoController',
        controllerAs: 'todo'
      })
      .when('/todos/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .when('/todos/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'todo'
      })
      .otherwise({redirectTo: '/'});
    })
}());
