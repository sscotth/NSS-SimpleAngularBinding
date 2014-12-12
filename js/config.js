;(function(){
  'use strict';

  angular.module('todoApp')
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/logout', {
        template: '',
        controller: 'LogoutController'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'ChangePasswordController',
        controllerAs: 'changepw'
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
