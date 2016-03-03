// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var crypto 	 = require('crypto');
var io = require('socket.io-client');

function hash(name) {
	return crypto.createHash('md5').update(name).digest('hex');
}

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'webapp',
	password : 'web12accese4s'
});

connection.query('USE cardgame_database');	

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		// console.log(user);
		done(null, user.user_id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		connection.query("select * from users_new where user_id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
	});


	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {
		var username = req.body.username;

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		connection.query("select * from users_new where user_email = '"+email+"'",function(err,rows){
			if (err)
				return done(err);
			if (rows.length) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {

				// if there is no user with that email
				// create the user
				var newUserMysql = new Object();

				newpass = hash(password);
				newUserMysql.user_email    = email;
				newUserMysql.user_pass = newpass; // use the generateHash function in our user model
				newUserMysql.user_name = username;

				var insertQuery = "INSERT INTO users_new ( user_name, user_email, user_pass ) values ('" + username +"','" + email +"','"+ newpass +"')";
				connection.query(insertQuery,function(err,rows){
					newUserMysql.user_id = rows.insertId;
					// var socket = io.connect('http://localhost:4004');
					// socket.emit("player_login", req.body.username);
					return done(null, newUserMysql);
				});	
			}	
		});
	}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) { // callback with email and password from our form

		connection.query("SELECT * FROM `users_new` WHERE `user_email` = '" + email + "'",function(err,rows){
			if (err)
				return done(err);
			if (!rows.length) {
				return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
			} 

			// if the user is found but the password is wrong
			// console.log(rows[0].user_pass);
			// console.log(hash(password));
			if (!( rows[0].user_pass == hash(password)))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

			connection.query("SELECT user_name FROM `users_new` WHERE `user_email` = '" + email + "'",function(err,rows2){
			if (err)
				return done(err);
			if (!rows2.length) {
				return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
			}
				// console.log(rows2[0].user_name);
				// var socket = io.connect('http://localhost:4004');
				// socket.emit("player_login", rows2[0].user_name);
			});	
			return done(null, rows[0]);			

		});



	}));

};
