module.exports = function(app, passport, game_configs) {
	console.log(game_configs);

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	// process the login form
	// app.post('/login', do all our passport stuff here);

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/general_lobby', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/general_lobby', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the signup form
	// app.post('/signup', do all our passport stuff here);

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// Generate a uuid for the game, update the game list on the general lobby, redirect to 
	// game lobby with an id. 
	var tempvalue;
	app.post('/general_lobby', function(req, res) {
		tempvalue=req.body;
		res.redirect('/game_lobby');
	});

	app.get('/general_lobby', isLoggedIn, function(req, res) {
		res.render('general_lobby.ejs', {
			user : req.user, // get the user out of session and pass to template
			games : game_configs // get the user out of session and pass to template
		});
	});

	// also pass the uuid, when people login, they should be connected to the appropriate room
	app.get('/game_lobby', isLoggedIn, function(req, res) {
		console.log(tempvalue);
		res.render('game_lobby.ejs', {
			user : req.user, // get the user out of session and pass to template
			gameid : tempvalue
		});
	});
	tempvalue=0;

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
