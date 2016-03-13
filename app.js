/*  Copyright 2012-2016 Sven "underscorediscovery" Bergström

    written by : http://underscorediscovery.ca
    written for : http://buildnewgames.com/real-time-multiplayer/

    MIT Licensed.

    Usage : node app.js
    */

var
gameport        = process.env.PORT || 4004,

		express         = require('express'),
		UUID            = require('node-uuid'),

		verbose         = false,
		app             = require('express')(),
		server          = require('http').createServer(app),
		io              = require('socket.io')(server),
		fs 		= require("fs");

var allclients =[]; //Array of clients
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname));
app.set('view engine', 'ejs');

var fs = require('fs');
var path = __dirname + '/game/configs';
var game_configs=[];
var raw_configs=fs.readdirSync(path);
raw_configs.forEach(function(entry) {
	var res = entry.split(/[._]/);
	var key1 = "game";
	var key2 = "players";
	var obj = {};
	obj[key1] = res[1];
	obj[key2] = res[2];
	game_configs.push(obj);
});

// var sio = io.listen(server);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);



require('./server/routes.js')(app, passport, game_configs);
/* Express server set up. */
app.post('/general_lobby', function(req, res) {
	console.log(req.body.name);
	res.redirect('/game_lobby');
	//});
	// sio.emit("hi");
});

//The express server handles passing our content to the browser,
//As well as routing users where they need to go. This example is bare bones
//and will serve any file the user requests from the root of your web server (where you launch the script from)
//so keep this in mind - this is not a production script but a development teaching tool.

//Tell the server to listen for incoming connections
server.listen(gameport);
var toType = function(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

//Log something so we know that it succeeded.
console.log('\t :: Express :: Listening on port ' + gameport );

var clientid;
var clientname;


/* Socket.IO server set up. */

//Express and socket.io can work together to serve the socket.io client files for you.
//This way, when the client requests '/socket.io/' files, socket.io determines what the client needs.

//Create a socket.io instance using our express server

//Configure the socket.io connection settings.
//See http://socket.io/

var users =[];
var activegames =[];
game_server = require('./game/game_server.js');
io.sockets.on('connection', function (client) {

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


	client.on('get uuid', function() { 
		var gameid=UUID();
		client.emit('send uuid', gameid);
	});

	// consolidate 'new game' and 'launch game' into one function
	client.on('new game', function(data) { 
		var key1 = "gameid";
		var key2 = "players";
		var key3 = "gametype";
		var key4 = "playing";
		var obj = {};
		if (data == "debug")
		{
			var gameid=UUID();
			obj[key1] = gameid;
			obj[key2] = 1;
			obj[key3] = gametype;
			obj[key4] = 0;
			activegames.push(obj);
		}
		else
		{
			obj[key1] = data.gameid;
			obj[key2] = game_configs[data.gametype].players;
			obj[key3] = game_configs[data.gametype].game;
			obj[key4] = 0;
			activegames.push(obj);
		}
		console.log(obj);
	});

	// log into room
	client.on('subscribe', function(data) {
		console.log("joining room: " + data.room);
		client.room=data.room;
		client.join(data.room); });

	client.on('join game', function(data) {
		game_server.findGame(client, data);
		});


	// log out of room
	client.on('unsubscribe', function(data) { client.leave(data.room); });

	client.on('find players', function() {
		console.log("the room of the client is: " + client.root);
		// client.emit('list of players',io.sockets.rooms[client.room]);
	
	});


	client.on('chat message', function(msg){
		console.log('\t socket.io::chat message ' + msg);
		io.emit('chat message', msg);
	});
	//When this client disconnects, we want to tell the game server
	//about that as well, so it can remove them from the game they are
	//in, and make sure the other player knows that they left and so on.
	client.on('disconnect', function () {
		console.log('disconnecting');

		delete users[users.indexOf(io.sockets)];
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
