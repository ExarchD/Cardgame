/*  Copyright 2012-2016 Sven "underscorediscovery" Bergström

    written by : http://underscorediscovery.ca
    written for : http://buildnewgames.com/real-time-multiplayer/

    MIT Licensed.

    Usage : node app.js
    */

var
gameport        = process.env.PORT || 4004,

		express         = require('express'),
		verbose         = false,
		app             = require('express')(),
		server          = require('http').createServer(app),
		fs 		= require("fs");

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
require('./server/sockets')(server, app, game_configs);
