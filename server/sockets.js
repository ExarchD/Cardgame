module.exports = function(server,app, game_configs) {
	var io              = require('socket.io')(server);
	var UUID            = require('node-uuid');
	var allclients =[]; //Array of clients
	var users =[];
	game_server = require('./game_server.js');
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
			console.log(gameid);
			console.log(gameid);
			console.log(gameid);
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
				obj[key3] = Pitch;
				obj[key4] = 0;
			}
			else
			{
				obj[key1] = data.gameid;
				obj[key2] = game_configs[data.gametype].players;
				obj[key3] = game_configs[data.gametype].game;
				obj[key4] = 0;
			}
                        game_server.createGame(client, obj);
		});

		// log into room
		client.on('subscribe', function(data) {
			console.log("joining room: " + data.room);
			client.room=data.room;
			client.join(data.room); });

		client.on('join game', function(data) {
                    console.log(data);
			game_server.findGame(client, data);
		});


		// log out of room
		client.on('unsubscribe', function(data) { client.leave(data.room); });

		client.on('find players', function() {
			console.log("the room of the client is: " + client.root);
			// client.emit('list of players',io.sockets.rooms[client.room]);

		});


		// client 'send(s) gamestate' from the client(dan's code)
		client.on('send gamestate', function(msg) {
			// the intended move is processed by the game_core(matts code)
			// the process function should return a complex object
			// it will contain the majority of the gamestate on a valid move 
			var result = game_core.process(msg);
			// if valid, we loop through all the players and send them their new state
			// in many cases, this just means an additional visual card via phaser
			if (result.type == "valid")
			{
				for ( i=0; i < result.player.length(); i++ )
				{
					io.sockets[i].emit('next play', result.player[i]);
				}
			}
			// if invalid, the sender is told to change his response.
			if (result.type == "invalid")
				client.emit('invalid', result);
		});


		client.on('list games', function(){
                    game_server.listGames();
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
	};
