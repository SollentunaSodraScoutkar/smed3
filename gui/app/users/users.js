'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', ['$scope', '$http', function(scope, http) {

//Note: problem with Swedish chars
scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { name:'Förnamn', field: 'firstName' },
          { name:'Efternamn', field: 'lastName' },
          { name:'Anvaendarnamn', field: 'uesrName' },
          { name:'E-post', field: 'email' },
          { name:'Behörighet', field: 'access' }
        ],
        data : []
      };
 
var loadUsers = function(){
 http({ method: 'GET', url: 'http://localhost:8080/users' }).
  success(function (data, status, headers, config) {
    scope.gridOptions.data = data;
  }).
  error(function (data, status, headers, config) {
    alert("Data:" + data + ", Status" + status);
  });    
};

loadUsers();

        
}]);
