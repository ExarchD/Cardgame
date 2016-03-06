var game = new Phaser.Game(800, 600, Phaser.AUTO, 'debug_client', { preload: preload, create: create, update: update, render: render });

function preload() 
// Phaser runs preload() immediately when the page is loaded.  It should only be used for loading assets into the game
{
	//game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	//game.load.image('background','assets/starfield.jpg');
	game.load.spritesheet('cards', 'assets/52playingCardsSpriteSheet72x96.png', 72, 96);
}


// initliaze all variables here that will be used in both create() and update(), so the variables have the correct scope

var cardWidth = 72; // pixels
var cardHeight = 96; // pixels
var cardSeperation = 20; // pixel seperation when fanning out a hand of cards

//calculate cardMarin (for both x and y) based on card size and canvas size

//game.width = cardMargin.x*4 + Math.floor(cardMargin.x/2)*2 + cardHeight*4 + cardWidth
// e.g.  800 =      69     *4 +             34            *2 +     96    *4 +     72        
var cardMarginX = Math.ceil((game.width - 4*cardHeight - cardWidth) / 5);

//game.height = cardMargin.y*4 + Math.floor(cardMargin.y/2)*2 + cardHeight*4 + cardWidth
// e.g.  600 =       29     *4 +             14            *2 +     96    *4 +     72  
var cardMarginY = Math.ceil((game.height - 4*cardHeight - cardWidth) / 5);


//calculate locations of the centers of the hand locations where:
	//East: (x, 0)
	//South: (0, y)
	//West: (-x, 0)
	//North (0, -y)
var playerPositionX = 1.5 * (cardMarginX + cardHeight);
var playerPositionY = 1.5 * (cardMarginY + cardHeight);

var player1 = new LocalPlayer();
var player2 = new LocalPlayer();
var player3 = new LocalPlayer();
var player4 = new LocalPlayer();

var handSize = 6;


function create() 
// create() is called immediately after preload is finished, and can be used to create any objects needed at the start of the game.
{
	game.stage.backgroundColor = '#009900'; // Hex code color 

	// Initialize player's hands - these would normally use info given by the game_server via Sockets
	
	player1.hand.addCards
	(
		[  // Array of 6 Card objects
		 new LocalCard(-2.5*cardSeperation, playerPositionY, 0, true, 14, 'c'),
	  	 new LocalCard(-1.5*cardSeperation, playerPositionY, 0, true, 13, 'c'),
	  	 new LocalCard(-0.5*cardSeperation, playerPositionY, 0, true, 12, 'c'),
	  	 new LocalCard(+0.5*cardSeperation, playerPositionY, 0, true, 11, 'c'),
	  	 new LocalCard(+1.5*cardSeperation, playerPositionY, 0, true, 10, 'c'),
	  	 new LocalCard(+2.5*cardSeperation, playerPositionY, 0, true, 2, 'c')
		]
	);

	player2.hand.addCards
	(
		[  // Array of 6 Card objects
		 new LocalCard(-playerPositionX, -2.5*cardSeperation, 90, true, 14, 's'),
	  	 new LocalCard(-playerPositionX, -1.5*cardSeperation, 90, true, 13, 's'),
	  	 new LocalCard(-playerPositionX, -0.5*cardSeperation, 90, true, 12, 's'),
	  	 new LocalCard(-playerPositionX, +0.5*cardSeperation, 90, true, 11, 's'),
	  	 new LocalCard(-playerPositionX, +1.5*cardSeperation, 90, true, 10, 's'),
	  	 new LocalCard(-playerPositionX, +2.5*cardSeperation, 90, true, 2, 's')
		]
	);

	player3.hand.addCards
	(
		[  // Array of 6 Card objects
		 new LocalCard(+2.5*cardSeperation, -playerPositionY, 0, true, 14, 'h'),
	  	 new LocalCard(+1.5*cardSeperation, -playerPositionY, 0, true, 13, 'h'),
	  	 new LocalCard(+0.5*cardSeperation, -playerPositionY, 0, true, 12, 'h'),
	  	 new LocalCard(-0.5*cardSeperation, -playerPositionY, 0, true, 11, 'h'),
	  	 new LocalCard(-1.5*cardSeperation, -playerPositionY, 0, true, 10, 'h'),
	  	 new LocalCard(-2.5*cardSeperation, -playerPositionY, 0, true, 2, 'h')
		]
	);

	player4.hand.addCards
	(
		[  // Array of 6 Card objects
		 new LocalCard(playerPositionX, +2.5*cardSeperation, 90, true, 14, 'd'),
	  	 new LocalCard(playerPositionX, +1.5*cardSeperation, 90, true, 13, 'd'),
	  	 new LocalCard(playerPositionX, +0.5*cardSeperation, 90, true, 12, 'd'),
	  	 new LocalCard(playerPositionX, -0.5*cardSeperation, 90, true, 11, 'd'),
	  	 new LocalCard(playerPositionX, -1.5*cardSeperation, 90, true, 10, 'd'),
	  	 new LocalCard(playerPositionX, -2.5*cardSeperation, 90, true, 2, 'd')
		]
	);
}

function update()
// update() is called on every frame (roughly 60 times per second) 
// It can be used to check for user input, update animated objects, check for object collision, etc.
{
	// Listen for new socket info on every frame



}


function render()
// render() is called on every frame, but only after WebGL/canvas renders, and so post-render effects like de-bug overlays can be added here
// Once render has completed, the frame is over and update will be called next.
{

}


////// Class functions //////

function LocalCard(x, y, angle, isVisible, rank, suit)
// Card object to be drawn locally on the client's screen
{
	this.suit = suit; // c=clubs, s=spades, h=hearts, d=diamonds 
	this.rank = rank; // 2 through 14, where 11 = Jack, 12=Queen, 13=King, 14=Ace

	switch (suit)
	{
		case 'c' :
			this.suitNum = 0
			break;
		case 's' :
			this.suitNum = 1
			break;
		case 'h' :
			this.suitNum = 2
			break;
		case 'd' :
			this.suitNum = 3
			break;
		default :
			console.log("(DM) Error: Suit variable initialized to:", suit);
	}

	this.cardSpriteIndex = 13*this.suitNum + this.rank - 2; // location of this card in the spritesheet
	this.x = x || 0; // origin is at the center of the screen (default 0)
	this.y = y || 0; // origin is at the center of the screen (default 0)
	this.angle = angle || 0; // 0 is upright (default), 90 is tilted sideways clockwise (the center of the card always remains the same)
	
	// create Phaser button with correct sprite and location/tilt
	this.button = game.add.button(game.world.centerX + x, game.world.centerY + y, 'cards', actionOnClick, this, this.cardSpriteIndex, this.cardSpriteIndex);
	this.button.anchor.setTo(0.5, 0.5); // set card to rotate about its center
	this.button.angle = this.angle; // Phaser object angle set to input angle
}

function LocalHand() //input any number of cards to fill the hand with
{
	this.cardArray = [];
			this.addCards = function()
	{
		for (var cardIndex=0; cardIndex < arguments.length; cardIndex++)
		{
			this.cardArray.concat(arguments[cardIndex]); // add each card given in the input into the cardArray
		}
	};

	//use above function to fill the cardArray with arguments, if any
	this.addCards(arguments);

	this.length = this.cardArray.length;
}

function LocalPlayer(xCenter, yCenter)
{
	this.hand = new LocalHand();
}

function actionOnClick() 
{

}

