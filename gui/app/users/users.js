'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', ['$scope', '$http', function(scope, http) {

/*
	scope.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "userName": "cc",
            "email":  "cox@carney.se",
            "createdDate": "2014-01-01",
            "access": "true"
        },
        {
            "firstName": "Thomas",
            "lastName": "Bindzau",
            "userName": "tb",
            "email":  "thomas@bindzau.se",
            "createdDate": "2014-08-04",
            "access": "false"
        },
        {
            "firstName": "John",
            "lastName": "Doe",
            "userName": "jd",
            "email":  "john@doe.se",
            "createdDate": "2014-06-12",
            "access": "true"
        }];
*/

var loadUsers = function(){
 http({ method: 'GET', url: 'http://localhost:8080/users' }).
  success(function (data, status, headers, config) {
    scope.myData = data;
  }).
  error(function (data, status, headers, config) {
    alert("Data:" + data + ", Status" + status);
  });    
};

loadUsers();

        
}]);
