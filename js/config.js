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
        controllerAs: 'changepw',
        resolve: {
          data: function(authFactory){
            authFactory.requireLogin();
          }
        }
      })
      .when('/todos', {
        templateUrl: 'views/table.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        resolve: {
          data: function(authFactory){
            authFactory.requireLogin();
          }
        }
      })
      .when('/todos/new', {
        templateUrl: 'views/form.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        resolve: {
          data: function(authFactory){
            authFactory.requireLogin();
          }
        }
      })
      .when('/todos/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show',
        resolve: {
          data: function(authFactory){
            authFactory.requireLogin();
          }
        }
      })
      .when('/todos/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'todo',
        resolve: {
          data: function(authFactory){
            authFactory.requireLogin();
          }
        }
      })
      .otherwise({redirectTo: '/'});
    })
}());
