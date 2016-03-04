var app = angular.module('sampleApp', ['ngRoute']);
var socket = io.connect();

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/index.html'
	});
}]);

app.factory('socket', ['$rootScope', function($rootScope) {

	return {
		on: function(eventName, callback){
			socket.on(eventName, callback);
		},
		emit: function(eventName, data) {
			socket.emit(eventName, data);
		}
	};
}]);


app.controller('IndexController', function($route, $scope, socket) {
	$scope.newCustomers = [];
	$scope.currentCustomer = {};

	$scope.join = function() {
		socket.emit('add-customer', $scope.currentCustomer);
	};

	socket.on('update_player_list', function(data) {
		console.log("connected a new client");
		$scope.$apply(function () {
			$scope.newCustomers = [];
			for (i=0; i < data.customer.length; i++)
				$scope.newCustomers.push(data.customer[i]);
		});
	});

	socket.on('ondisconnected', function(data) {
		$scope.$apply(function () {
			for (i=0; i < data.customer.length; i++)
				$scope.newCustomers.push(data.customer[i]);
		});
	});
});


function logout () {

	socket.emit('disconnect');

	};