var game = new Phaser.Game(800, 600, Phaser.AUTO, 'button-test', { preload: preload, create: create });

////// Start Card class //////

// Member variables for Card class:
// suit 
// rank
// possible suits are c=clubs, s=spades, d=diamonds, h=hearts
// possible ranks are 2 through 14, where 11 = Jack, 12=Queen, 13=King, 14=Ace

var Card = function Card(suit, rank)
{
	this.suit = suit;
	this.rank = rank;
};

////// End Card class //////

////// Start Deck class //////
// A deck is an array of cards.
// The default constructor makes a deck with 52 cards
// There is also a constructor to make an empty deck
// Member variables for deck are:
// cardArray[] (array of Card)
// Member functions for deck are:
// fillDeck()--Erases previous deck state and fills with 52 cards in order
// fillDeck( totalSuit, totalRank)--Allows you to fill deck with custom numbers of suit and rank
// shuffleDeck()--Shuffles whatever cards are currently in the deck
// takeTopCard()--Returns the top card in the deck and removes it from the deck
// addOneCard()--Adds one card top of deck
// takeIndexCard( cardIndex )--Removes a card at the index given

//Default constuctor: Makes an empty deck of cards
var Deck = function Deck()
{
	var cardArray = new Array();
};

// fillDeck()
// Default is 4 suits and 2 through 14 (aka 2 through Ace)
Deck.prototype.fillDeck() = function()
{
	// Array for suit characters
	var suitArray = [c, s, d, h];

	//First For loop: cycles through the suits	
	//Second For loop: cycles through the ranks
	for (fillSuits=0; fillSuits < 3; fillSuits++)
	{
		for (fillRanks=2; fillRanks < 15; fillRanks++)
		{
			this.cardArray.add(new Card(suitArray[fillSuits], fillRanks));
		}
	}
};

// fillDeck( totalRank, totalSuit)
// Default is 4 suits and 2 through 14 (aka 2 through Ace)
// If more than 4 suits: 5 = cc, 6 = ss, 7 = dd, 8 = hh, 9 = ccc, 10 = sss, etc.
//
Deck.prototype.fillDeck(totalSuit, totalRank) = function()
{
	// Array for suit characters
	var suitArray = [c, s, d, h];

	var suitTemp; //Used to make suits with more than 1 character, ie if more than 4 suits

	//First For loop: cycles through the suits	
	//Second For loop: populates the "tempSuit" with the correct number and type of characters
	// The max number for charCount is basically an integer division, but I didn't know if .js had it
	//Third For loop: cycles through the ranks
	for (fillSuits=0; fillSuits < totalSuit; fillSuits++)
	{
		suitTemp=""; //Setting string to null each loop so can add correct chars for suit
		for (charCount=0; charCount < (totalSuit- 1 - (totalSuit-1)%4)/4 + 1; charCount++)
		{
			suitTemp = suitTemp + suitArray[(fillSuits -1)%4];				
		}

		//For loops to populate ranks
		for (fillRanks=2; fillRanks < totalRank + 2; fillRanks++)
		{
			this.cardArray.add(new Card( suitTemp, fillRanks));
		}
	}
};

// shuffleDeck()
// The shuffleDeck() function will shuffle the deck with however many cards it currently has in it
// The shuffle goes through each position in the deck and exchanges it with a the random at a
//      random position in the deck.
Deck.prototype.shuffleDeck() = function()
{
	// Makes a temp card so you can swap
	tempCard = new Card (0,0);
	// The randomly selected card in the deck that the current card will switch with
	var cardToSwitchWith;

	for (shuffleThisCard = 0; shuffleThisCard < cardArray.length; shuffleThisCard++)
	{
		//Giving random number between 1 and number of cards in deck
		cardToSwitchWith = Math.floor((Math.random() * cardArray.length) + 1);
		// Next 3 lines are swap
		tempCard = cardArray[shuffleThisCard];
		cardArray[shuffleThisCard] = cardArray[cardToSwitchWith - 1]; // The -1 switches from # to index
		cardArray[cardToSwitchWith - 1] = cardArray[shuffleThisCard];		
	}
};

// takeTopCard() 
// This removes the top card (last in array) from the deck
Deck.prototype.takeTopCard() = function()
{
	return cardArray.pop();
};

// addCard( cardToAdd) 
// This adds a card to the top of the deck (adds to last in array)
Deck.prototype.addCard( cardToAdd ) = function ()
{
	cardArray.push( cardToAdd );
};

// takeIndexCard( cardIndex ) 
// This removes a card at a particular index and returns it
Deck.prototype.takeIndexCard( deckCardIndex ) = function ()
{
	return cardArray.splice(cardIndex, 1);
};

////// End Deck class //////



////// Start Player class //////

// A player is an object that can receive cards and play cards from their hand (Deck). The board is 
// printed based on what the player can see
// Member variables for Player Class
// myHand = new Deck()--The cards in the player's hand
// myCardsWon = new Deck()--The cards from the tricks the player has won
// Member functions for Player Class
// receiveCard( cardToAdd ) 
// playCard()
// sortHand()
// printScreen()

//Default constuctor: Makes a player with an empty deck of cards
var Player = function Player()
{
	var myHand = new Deck();
};

// receiveCard( cardToAdd )
// Function used to give a player a card
Player.prototype.receiveCard( cardToAdd ) = function ()
{
	this.myHand.addCard( cardToAdd );
};

// playCard( handCardIndex )
// Function used to play a card, will be called by clicking on card button
// By clicking on the card button the index of the card clicked will be passed to this function
Player.prototype.playCard( handCardIndex ) = function ()
{
	return this.myHand.takeIndexCard( handCardIndex );
};

// sortHand()
// Function used to sort a hand, can be called by button on player screen
Player.prototype.sortHand() = function ()
{
	// Code that sorts hand, give deck a function that sorts???
};

Player.prototype.printScreen() = function ()
{
	// Code that prints screen, will likely need access to some data (score, round, trump) from game
	// SHOULD THIS BE IN PLAYER OR IN GAME?

};

////// End Player class //////

////// Start Game class //////



// The Game Function will have 4 main parts:
// 1) set up number of players, number of cards in deck,
// 2) See if a new round should start based on win conditions and set up that round 
//     (shuffle, deal, bidding, cardplay)
// 3) Check that all moves are legal during the round (trump, following suit)
// 4) Tablulate and update scores at the end of the round




////// End Game class //////




function preload() {

	game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	game.load.image('background','assets/starfield.jpg');

}

var card_number = 3; // Number of cards on screen, will be buttons
var button = new Array(); //Array of butons for screen
var background; // back ground slide

function create() {

	game.stage.backgroundColor = '#182d3b'; // Hex code color 


	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	// Variables X and Y locations for Your Cards

	var xPixFromCenter;
	var yPix = 400;
	var xPix_FirstCard = -120;
	var xPix_spacing = 120;

	for (i=0; i < card_number; i++)
	{
		var xPixFromCenter = xPix_FirstCard + xPix_spacing*i; //spacing is 40 pixels

		//Button constructor, upFrame is left blank, not used
		button[i] = game.add.button(game.world.centerX + xPixFromCenter, yPix, 'button', actionOnClick, this, 2, 1, 0);
		button[i].onInputOver.add(over, this);
		button[i].onInputOut.add(out, this);
		button[i].onInputUp.add(up, this);
	}
}


function up() {
	console.log('button up', arguments);
}

function over() {
	console.log('button over');
}

function out() {
	console.log('button out');
}

function actionOnClick () {

	background.visible =! background.visible;

}
