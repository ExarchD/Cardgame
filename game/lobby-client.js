
function addTable_Games() {

	var myTableDiv = document.getElementById("metric_results")
		var table = document.createElement('TABLE')
		var tableBody = document.createElement('TBODY')

		table.border = '1'
		table.appendChild(tableBody);

	var heading = new Array();
	heading[0] = "Name"
		heading[1] = "Game"
		heading[2] = "# of Players"
		heading[3] = "# of Players"
		heading[4] = "# of Players"

		var stock = new Array()
		stock[0] = new Array("Cars", "88.625", "85.50", "85.81", "987")
		stock[1] = new Array("Veggies", "88.625", "85.50", "85.81", "988")
		stock[2] = new Array("Colors", "88.625", "85.50", "85.81", "989")
		stock[3] = new Array("Numbers", "88.625", "85.50", "85.81", "990")
		stock[4] = new Array("Requests", "88.625", "85.50", "85.81", "991")

		//TABLE COLUMNS
		var tr = document.createElement('TR');
	tableBody.appendChild(tr);
	for (i = 0; i < heading.length; i++) {
		var th = document.createElement('TH')
			th.width = '75';
		th.appendChild(document.createTextNode(heading[i]));
		tr.appendChild(th);

	}
	//TABLE ROWS
	for (i = 0; i < stock.length; i++) {
		var tr = document.createElement('TR');
		for (j = 0; j < stock[i].length; j++) {
			var td = document.createElement('TD')
				td.appendChild(document.createTextNode(stock[i][j]));
			tr.appendChild(td)
		}
		tableBody.appendChild(tr);
	}

	myTableDiv.appendChild(table)

}


function connection() {
	var socket = io.connect()

		var app = angular.module('myApp', ['ngRoute']);
		// var fenixApp = angular.module('MyApp', ['ngRoute']);
	// fenixApp.controller('mainController', function($scope, socket) {
	socket.on("onconnected", function(data){
		console.log(data[0]);
		// $scope.names = data;
	});
	// });


}


