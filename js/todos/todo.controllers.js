;(function(){
  'use strict';

  angular.module('todoApp')
    .controller('UploadController', function($rootScope, $scope, $upload, $routeParams, $location){
      var vm = this,
          id = $routeParams.id;

      vm.fileSelected = function(event){
        _setThumbnail();
      };

      vm.uploadFiles = function(){
        var file = vm.files[0];
        $upload.upload({
          url: 'https://omgttt-sscotth-io-images.s3.amazonaws.com',
          method: 'POST',
          data : {
            'Content-Type' : file.type,
            key: $rootScope.user.uid + '/' + id + '.jpg',
            acl: 'public-read',
            awsaccesskeyid: 'AKIAIGWKSR63NF7ZSRTA',
            policy: 'eyJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwiY29uZGl0aW9ucyI6IFt7ImJ1Y2tldCI6ICJvbWd0dHQtc3Njb3R0aC1pby1pbWFnZXMifSx7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIiXV19',
            signature: 'DsyFn+Gddc908PttZoeCYAxyrtg='
          },
          file: file
        })
        .success(function(){
          $location.path('/todos')
        });
      };

      function _setThumbnail () {
        _imageToBase64(vm.files[0], function(base64){
          vm.files[0].dataUrl = base64;
          $scope.$apply();
        });
      }

      function _imageToBase64 (file, cb) {
        if (file && file.type.indexOf('image') > -1) {
          var fr = new FileReader();
          fr.readAsDataURL(file);
          fr.onload = function(e) {
            cb(e.target.result);
          }
        }
      }
    })
    .controller('ShowController', function($routeParams, todoFactory){
      var vm = this;
      var id = $routeParams.id;
      todoFactory.getTodo(id, function(data){
        vm.task = data;
      });
    })
    .controller('EditController', function($routeParams, todoFactory){
      var vm = this;
      var id = $routeParams.id;

      todoFactory.getTodo(id, function(data){
        vm.newTask = data;
      });

      vm.addNewTask = function(){
        todoFactory.editTodo(id, vm.newTask);
      };

      vm.priorityOptions = todoFactory.priorityOptions;

    })
    .controller('TodoController', function(todoFactory){
      var vm = this;

      todoFactory.getAllTodos(function(data){
        vm.tasks = data;
      });

      vm.addNewTask = function(){
        todoFactory.createTodo(vm.newTask, function(data){
          vm.tasks = vm.tasks || {};
          vm.tasks[data.name] = vm.newTask;
          vm.newTask = _freshTask();
        });
      };

      vm.removeTodo = function(todoId){
        todoFactory.deleteTodo(todoId, function(){
          delete vm.tasks[todoId];
        });
      };

      vm.newTask = _freshTask();

      vm.priorityOptions = todoFactory.priorityOptions;

      function _freshTask(){
        return {
          priority: 'low'
        };
      }

    });

}());
