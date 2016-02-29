var game = new Phaser.Game(800, 600, Phaser.AUTO, 'button-test', { preload: preload, create: create });

////// Start Card class //////

	// Has variables suit and rank
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
	// Member functions for deck are:
		// fillDeck()--Erases previous deck state and fills with 52 cards in order
		// shuffleDeck()--Shuffles whatever cards are currently in the deck
		// takeTopCard()--Returns the top card in the deck and removes it from the deck
		// addOneCard()--Adds one card top of deck

var Deck = function Deck()
{
	var cardArray = Card[];
	this.fillDeck();
};

Deck.prototype.fillDeck() = function()
{
	// Array for suit characters
	var suitArray = [c, s, d, h];

	
	for( int fillSuits = 0; fillSuits < 3; fillSuits++)
	{
		for( int fillRanks = 2; fillRanks < 15; fillSuits++)
		{
			this.cardArray.add(new Card(suitArray[fillSuits], fillRanks));
		}
	}
};

Deck.prototype.shuffleDeck() = function()
{
	new Card = tempCard(0,0);
	
	for (int shuffleThisCard = 0; shuffleThisCard < cardArray.length; shuffleThisCard++)
	{
		var cardToSwitchWith = Math.floor((Math.random() * cardArray.length) + 1);
		tempCard = cardArray[shuffleThisCard];
		cardArray[shuffleThisCard] = cardArray[cardToSwitchWith - 1];
		cardArray[cardToSwitchWith - 1] = cardArray[shuffleThisCard];		
	}
};

Deck.prototype.takeTopCard() = function()
{
	return cardArray.pop();
};

Deck.prototype.addCard( cardToAdd ) = function ()
{
	cardArray.push( cardToAdd );
};

////// End Deck class //////


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
