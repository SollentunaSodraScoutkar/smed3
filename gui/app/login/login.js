'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', ['$scope', '$http', '$window', function(scope, http, win) {

if (win.sessionStorage.token){
	scope.loggedIn = true;
}
else {
	scope.loggedIn = false;	
}

	scope.login = function (){
		var username = scope.username;
		var password = scope.password;

		var data = { password: password, username: username};

		http({ 
			method: 'POST', 
			url: 'http://localhost:8080/login', 
			data: data,
			contentType: "application/json",
    		dataType: "json"
		}).
		 	success(function (data, status, headers, config) {
		    	scope.loggedIn = true;
		    	win.sessionStorage.token = data.token;
		    	alert('Logged in with data: ' + JSON.stringify(data));
		}).
		  	error(function (data, status, headers, config) {
		    	alert("Inloggning misslyckades! , Status;" + status);
		});    
	};

	scope.logout = function () {
		    	scope.loggedIn = false;
		    	win.sessionStorage.token = null;

	};
}]);