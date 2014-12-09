'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'users/users.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', ['$scope', '$http', '$modal', function(scope, http, modal) {

//Note: problem with Swedish chars
scope.gridScope = scope;
scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
          { name:'Namn', field: 'firstName' },
          { name:'Efternamn', field: 'lastName' },
          { name:'Anv.namn', field: 'userName' },
          { name:'Epost', field: 'email' },
          { name:'Behörighet', field: 'access' },
          { name: 'Ändra', cellTemplate: '<button  class="btn btn-info" ng-click="getExternalScopes().editUser(row.entity)" >Ändra</button>' }
        ],
        data : []
      };

var saveUser = function(user){
 http({ method: 'POST', url: 'http://localhost:8080/saveuser', data: user }).
  success(function (data, status, headers, config) {
    alert('user saved!');
  }).
  error(function (data, status, headers, config) {
    alert("Failed to save user, Status" + status);
  });    
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

scope.editUser = function(rowEntity) {
    var modalWindow = modal.open({
        templateUrl: "users/editUserModal.html",
        controller: "UserModalController",
        resolve:  {
            selectedUser : function(){
                return rowEntity;
            }
        }
    });

    modalWindow.result.then(function(user){
        saveUser(user);
    })
}; 

loadUsers();

        
}]).controller('UserModalController', function ($scope, $modalInstance, selectedUser) {

  $scope.selectedUser = selectedUser;

  $scope.ok = function () {
    $modalInstance.close($scope.selectedUser);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});