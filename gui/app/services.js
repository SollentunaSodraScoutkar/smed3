'use strict';

var services = angular.module('myApp.services', []);

services.factory('AuthenticationService', function (){
	var auth = {
		isAuthenticated: false
	};
	return auth;
});

services.factory('TokenInterceptor', ['$q', '$window', 'AuthenticationService', function(q, win, AuthenticationService){
	return {
		request: function(config){
			config.headers = config.headers || {};
			if (win.sessionStorage.token){
				config.headers.Authorization = win.sessionStorage.token;
			}
			return config;
		},
		requestError: function (rejection){
			return q.reject(rejection);
		},
		response: function (response){
			if (response != null && response.status == 200 && win.sessionStorage.token && !AuthenticationService.isAuthenticated){
				AuthenticationService.isAuthenticated = true;
			}
			return response || q.when(response);
		},
		responseError: function (rejection) {
			if (rejection != null && rejection.status == 401 && (win.sessionStorage.token || AuthenticationService.isAuthenticated)){
				AuthenticationService.isAuthenticated = false;
				delete win.sessionStorage.token;
			}
			return q.reject(rejection);
		}
	};
}]);