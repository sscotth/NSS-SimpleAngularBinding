;(function(){
  'use strict';

  angular.module('todoApp')
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
      .otherwise({redirectTo: '/'});
    })
}());
