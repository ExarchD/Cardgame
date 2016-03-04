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
		fs = require("fs");
var allclients = new Array(); //Array of clients
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);
require('./server/routes.js')(app, passport);
/* Express server set up. */

//The express server handles passing our content to the browser,
//As well as routing users where they need to go. This example is bare bones
//and will serve any file the user requests from the root of your web server (where you launch the script from)
//so keep this in mind - this is not a production script but a development teaching tool.

//Tell the server to listen for incoming connections
server.listen(gameport)
	var toType = function(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}

//Log something so we know that it succeeded.
console.log('\t :: Express :: Listening on port ' + gameport );

var clientid;
var clientname;

//app.get( '/*' , function( req, res, next ) {

//		//This is the current file they have requested
//		var file = req.params[0];

//		//For debugging, we can track what files are requested.
//		if(verbose) console.log('\t :: Express :: file requested : ' + file);


//		//For default version, you don't need to specify host and port, it will use default one


//		}); //app.get *


/* Socket.IO server set up. */

//Express and socket.io can work together to serve the socket.io client files for you.
//This way, when the client requests '/socket.io/' files, socket.io determines what the client needs.

//Create a socket.io instance using our express server
var sio = io.listen(server);

//Configure the socket.io connection settings.
//See http://socket.io/
sio.configure(function (){

	sio.set('log level', 3);

	sio.set('authorization', function (handshakeData, callback) {
		callback(null, true); // error first callback style
	});

});

	var users =  new Array();
sio.sockets.on('connection', function (client) {

	client.on('player_login', function (data) {

	client.userid = UUID();
	client.username = data;

	//tell the player they connected, giving them their id
	allclients.push(client.username);
	allclients.sort();

	// add username to list of connected clients
	// and push to all connected sockets. This keeps the current number of users updated
	});


	client.on('player_login', function (data) {
		console.log(data);
		console.log(data);
		console.log(data);
		console.log(data);
		console.log(data);
		console.log(data);
		console.log(data);
		console.log(data);
	users.push(client); // without .sessionId
	for (var u in users)    {
		users[u].emit('update_player_list', {
			all_connected: allclients
		});
	}
	});

	console.log('\t socket.io:: player ' + client.username + ' connected');

	//now we can find them a game to play with someone.
	//if no game exists with someone waiting, they create one and wait.
	// game_server.findGame(client);

	//Useful to know when someone connects
	console.log('\t socket.io:: player ' + client.userid + ' connected');


	//When this client disconnects, we want to tell the game server
	//about that as well, so it can remove them from the game they are
	//in, and make sure the other player knows that they left and so on.
	client.on('disconnect', function () {
		console.log('disconnecting');

		delete users[users.indexOf(sio.sockets)];
		//Useful to know when soomeone disconnects
		console.log('\t socket.io:: client disconnected ' + client.userid + ' ' + client.username);
		// Remove username from the list of connected clients
		var index = allclients.indexOf(client.username);
		if (index > -1) {
			allclients.splice(index, 1);
		}
		console.log(allclients);

		for (var u in users)    {
			users[u].emit('update_player_list', {
				message: 'new customer',
				customer: allclients
			});
		}

		//If the client was in a game, set by game_server.findGame,
		//we can tell the game server to update that game state.
		//if(client.game && client.game.id) {

		//	//player leaving a game should destroy that game


	}); //client.on disconnect

	}); //sio.sockets.on connection