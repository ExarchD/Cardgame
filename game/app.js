/*  Copyright 2012-2016 Sven "underscorediscovery" Bergström

    written by : http://underscorediscovery.ca
    written for : http://buildnewgames.com/real-time-multiplayer/

    MIT Licensed.

    Usage : node app.js
    */

var
gameport        = process.env.PORT || 4004,

		io              = require('socket.io'),
		express         = require('express'),
		UUID            = require('node-uuid'),

		verbose         = false,
		http            = require('http'),
		app             = express(),
		server          = http.createServer(app),
		fs = require("fs"),
		redis = require("redis"),
		co = require("./cookie.js");
		var allclients = new Array(); //Array of clients

/* Express server set up. */

//The express server handles passing our content to the browser,
//As well as routing users where they need to go. This example is bare bones
//and will serve any file the user requests from the root of your web server (where you launch the script from)
//so keep this in mind - this is not a production script but a development teaching tool.

//Tell the server to listen for incoming connections
server.listen(gameport)

	//Log something so we know that it succeeded.
	console.log('\t :: Express :: Listening on port ' + gameport );

    //app.get( '/', function( req, res ){
    //    console.log('trying to load %s', __dirname + '/index.html');
    //    res.sendfile( '/index.html' , { root:__dirname });
    //});


    //    //This handler will listen for requests on /*, any file from the root of our server.
    //    //See expressjs documentation for more info on routing.

    //app.get( '/*' , function( req, res, next ) {

    //        //This is the current file they have requested
    //    var file = req.params[0];

    //        //For debugging, we can track what files are requested.
    //    if(verbose) console.log('\t :: Express :: file requested : ' + file);

    //        //Send the requesting client the file.
    //    res.sendfile( __dirname + '/' + file );

    //}); //app.get *

	//By default, we forward the / path to index.html automatically.
	// app.get( '/', function( req, res ){
	// 	console.log('trying to load %s', __dirname + '/index.html');
	// 	res.sendfile( '/index.html' , { root:__dirname });
	// });


	//This handler will listen for requests on /*, any file from the root of our server.
	//See expressjs documentation for more info on routing.
	var clientid;

	app.get( '/*' , function( req, res, next ) {

			//This is the current file they have requested
			var file = req.params[0];

			//For debugging, we can track what files are requested.
			if(verbose) console.log('\t :: Express :: file requested : ' + file);

			//Send the requesting client the file.
			// res.sendfile( __dirname + '/' + file );

			var cookieManager = new co.cookie(req.headers.cookie);

			//Note : to specify host and port : new redis.createClient(HOST, PORT, options)
			//For default version, you don't need to specify host and port, it will use default one
			var clientSession = new redis.createClient();

			clientSession.get("sessions/"+cookieManager.get("PHPSESSID"), function(error, result){
			if(error){
			console.log("error : "+error);
			}
			try {
			clientid = JSON.parse(result).user_session[0];
			console.log("result exist");
			console.log(clientid);
			app.get( '/game_lobby', function( req, res ){
			console.log('trying to load %s', __dirname + '/game_lobby.html');
			res.sendfile( '/game_lobby.html' , { root:__dirname });
			});
			app.get( '/', function( req, res ){
			console.log('trying to load %s', __dirname + '/index.html');
			res.sendfile( '/index.html' , { root:__dirname });
			});
        		res.sendfile( __dirname + '/' + file );
			}
			catch(err) {
			console.log("session does not exist");
			res.statusCode = 302; 
			res.setHeader("Location", "127.0.0.1:80/cardgame/login.php");
			res.end();
			}
			});

			}); //app.get *


	/* Socket.IO server set up. */

	//Express and socket.io can work together to serve the socket.io client files for you.
	//This way, when the client requests '/socket.io/' files, socket.io determines what the client needs.

	//Create a socket.io instance using our express server
	var sio = io.listen(server);

	//Configure the socket.io connection settings.
	//See http://socket.io/
	sio.configure(function (){

		sio.set('log level', 0);

		sio.set('authorization', function (handshakeData, callback) {
			callback(null, true); // error first callback style
		});

	});

//Enter the game server code. The game server handles
//client connections looking for a game, creating games,
//leaving games, joining games and ending games when they leave.
// game_server = require('./game.server.js');
lobby = require('./lobby-client.js');

//Socket.io will call this function when a client connects,
//So we can send that client looking for a game to play,
//as well as give that client a unique ID to use so we can
//maintain the list if players.
var username = "Hello";
sio.sockets.on('connection', function (client) {

	//Generate a new UUID, looks something like
	//5b2ca132-64bd-4513-99da-90e838ca47d1
	//and store this on their socket/connection
	client.userid = clientid;
	client.username = username;

	//tell the player they connected, giving them their id
	allclients.push(client.username);
	allclients.sort();
	client.emit('onconnected', { allclients } );

	// add username to list of connected clients
	
	console.log('\t socket.io:: player ' + client.username + ' connected');

	//now we can find them a game to play with someone.
	//if no game exists with someone waiting, they create one and wait.
	// game_server.findGame(client);

	//Useful to know when someone connects
	console.log('\t socket.io:: player ' + client.userid + ' connected');


	//Now we want to handle some of the messages that clients will send.
	//They send messages here, and we send them to the game_server to handle.
	// client.on('message', function(m) {

	// 	game_server.onMessage(client, m);

	// }); //client.on message

	//When this client disconnects, we want to tell the game server
	//about that as well, so it can remove them from the game they are
	//in, and make sure the other player knows that they left and so on.
	client.on('disconnect', function () {

		//Useful to know when soomeone disconnects
		console.log('\t socket.io:: client disconnected ' + client.userid + ' ' + client.game_id);
		// Remove username from the list of connected clients
		var index = allclients.indexOf(client.username);
		if (index > -1) {
			    allclients.splice(index, 1);
		}

		//If the client was in a game, set by game_server.findGame,
		//we can tell the game server to update that game state.
		//if(client.game && client.game.id) {

		//	//player leaving a game should destroy that game
		//	game_server.endGame(client.game.id, client.userid);

		//} //client.game_id

	}); //client.on disconnect

}); //sio.sockets.on connection
