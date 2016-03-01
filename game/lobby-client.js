var app = angular.module('sampleApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/index.html'
	});
}]);

app.factory('socket', ['$rootScope', function($rootScope) {
	var socket = io.connect();

	return {
		on: function(eventName, callback){
			socket.on(eventName, callback);
		},
		emit: function(eventName, data) {
			socket.emit(eventName, data);
		}
	};
}]);

app.controller('IndexController', function($scope, socket) {
	$scope.newCustomers = [];
	$scope.currentCustomer = {};

	$scope.join = function() {
		socket.emit('add-customer', $scope.currentCustomer);
	};

	socket.on('onconnected', function(data) {
		$scope.$apply(function () {
	for (i=0; i < data.customer.length; i++)
			$scope.newCustomers.push(data.customer[i]);
		});
	});
});


