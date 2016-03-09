var app = angular.module('sampleApp', ['ngRoute']);
var socket = io.connect();

app.config(['$httpProvider',function ($httpProvider) {
	var sessionId = "{!$Api.Session_ID}";

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["content-type"] = "application/json";
	$httpProvider.defaults.headers.common['Authorization'] = "OAuth " + sessionId ;
	$httpProvider.defaults.headers.common['X-User-Agent'] = "MyClient" ;
}]) ; 

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '/views/general_lobby.ejs'
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
			for (i=0; i < data.all_connected.length; i++)
				$scope.newCustomers.push(data.all_connected[i]);
		});
	});

	socket.on('ondisconnected', function(data) {
		$scope.$apply(function () {
			for (i=0; i < data.all_connected.length; i++)
				$scope.newCustomers.push(data.all_connected[i]);
		});
	});
});


function logout () {

	socket.emit('disconnect');

};
