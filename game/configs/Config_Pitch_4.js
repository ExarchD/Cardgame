

// Code for running a game of 4 person Pitch

function config_Pitch4( playerArray )
{
	var score_1 = 0;
	var score_2 = 0;
	var pitch4Deck = new Deck();
	var currentDealer = 0; //Index of the current dealer
	var bids = [];
	var bidsAllowed = [];
	
	//Checking that the right number of players were passed in
	if( playerArray.length != 4)
	{
		//Return to lobby
	}
	
	//Checking that all items in playerArray are of type Player ???
	for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)
	{
		//
	}
	
	//Checking that players alternate team1, team2
	for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)
	{
		if( playerArray[i].teamNum != (iPlayer + 1)%2 )
		{
			//Return to lobby
		}
	}
	
	
	//Loop that controls rounds
	
	for( gameLoop=0; gameLoop<200; gameLoop++)
	{
		
		//Emptying all cards from all players
		for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)	
		{
			playerArray[i].emptyAllDecks();
		}
		
		//Populating cards in game deck and shuffling
		pitch4Deck.fillDeck();
		pitch4Deck.shuffleDeck();
		
		//Dealing cards
		for( iDeal = 0; iDeal < 6 * playerArray.length; iDeal++)
		{
			//Takeing card from top of deck, putting in players hand, starting with perons left of dealer
			playerArray[(currentDealer + 1 + iDeal)%playerArray.length].receiveCardHand( pitch4Deck.takeTopCard() );
		}
		
		//Sorting everyone's hand for them
		for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)	
		{
			playerArray[i].sortHand();
		}
		
		//NEED TO START PRINTING EVERYONE'S HAND HERE!!!
		
		//Bidding
		for( iBid = 0; iBid < playerArray.length; iBid++)
		{
			// Need special bidding screen printed for all players, has whose turn it is to bid
			//if( playerArray[ (currentDealer + 1 + iBid) % 4 ].servUserID == ???.servUserID )
			//{
				// Call screen that can print pass, 1, 2, 3, 4, Shoot if it their turn to bid
				
			//}
			// record bid in 
			//bids[(currentDealer + 1 + iBid) % 4] = button result
			//update the allowed bids, if iBid > 1 then the 1 bid is no longer allowed
			//If iBid gets to playerArray.length - 1 and no one has bid 2 or higher, allowed bid for 0 disappears			
		}


		//winner of bidding FIRST PLAYER PLAYS, SETS TRUMP
		
		//GAME DETERMINES WHICH CARDS ARE HIGH AND LOW, will record who has those (but not update score if not garenteed)
		
		//COUNT INSTANT POINTS IN EACH ROUND, IE ACE trump, 2 trump, and taking JAck of trump, otherwise,
		//ALL instant points trigger chekcing score, and if your team has bid, and if your team has made bid
		
		//COUNT ALL GAME POINTS
		//CHECK TO SEE IF ALL INSTANT POINTS WERE AWARDED, ie still high and low to give out, 
		
		//UPDATE FINAL SCORE OF ROUND
		
		//CHECK SCORE TO SEE IF CONTINUE
		
		//If another round increase the index of hte current dealer (mod 4) so ready for the next round
		//Clear all bids with bids.splice(0,bids.length);
		//Clear all allowed bids with bidsAllowed.splice(0,bidsAllowed.length);
		// Reset all bids to true, use 0 as false, 1 as true 
		
		if( gameLoop == 200 )
		{
			// Game loop reached maximum number of rounds, draw, returning to lobby
		}
	}
	
	
//function Card(s, r)
//{
//	this.suit = s;
//	this.rank = r;
//}
	
// Member variables for deck are:
//      cardArray[] (array of Card)
// Member functions for deck are:
//      fillDeck()--Erases previous deck state and fills with 52 cards in order
//      fillDeck( totalSuit, totalRank)--Allows you to fill deck with custom numbers of suit and rank
//      shuffleDeck()--Shuffles whatever cards are currently in the deck
//      takeTopCard()--Returns the top card in the deck and removes it from the deck
//      addCards()--Adds card top of deck, if array of cards will add all cards
//      takeIndexCard( cardIndex )--Removes a card at the index given	
	
// Member variables for Player Class
//	    teamNum--Which team number this player is on
//      ID--User name of the person
//   	screenName--Screen name in case we want to have user name and visible name seperate
//      myHand --The cards in the player's hand
//      myCardsWon = new Deck()--The cards from the tricks the player has won
//      myPiles = new Deck()-- In particular games a player might need more piles of cards, this is an array of decks
// Member functions for Player Class
//      receiveCardHand( cardToAdd ) 
//      receiveCardWin( cardToAdd )
//      playCardHand( handCardIndex)
//      emptyAllDecks()
//      sortHand()
	
	
	function Player(teamNumber, userID, alias)
{
	this.teamNum = teamNumber;
	this.servUserID = userID;
	
	if ( alias === undefined)
	{
		this.screenName = userID;
	}
	else
	{
	this.nickname = alias;
	}
	
	this.myHand = new Deck();
	this.myCardsWon = new Deck();
	this.myPiles = [];
}
	
	
	
	
}




// The two variables passed in are going to come from the server setting up the lobby.
function GameConfig( gameTypeID, playerArray)
{
	this.gameType = gameTypeID;
	this.players = playerArray;
	

	
	// Start of loop that actually runs game. This will call a function in the CONFIG file, 
	// This function will need ot have a part that does setting up round, checking moves are legal, check game win, and after
	// The game return the winners to the GameConfig.
	
	
	this.myHand = new Deck();
	this.myCardsWon = new Deck();
	this.myPiles = [];
}



// The Game Function will have 4 main parts:
// 1) set up number of players, number of cards in deck,
// 2) See if a new round should start based on win conditions and set up that round 
//     (shuffle, deal, bidding, cardplay)
// 3) Check that all moves are legal during the round (trump, following suit)
//      3a) Check that the game isn't instantly won after a trick, ie team with 10 gets a 2 of trump played
// 4) Tablulate and update scores at the end of the round






////// Start Card class //////

// Member variables for Card class:
//      suit 
//      rank
// possible suits are c=clubs, s=spades, d=diamonds, h=hearts
// possible ranks are 2 through 14, where 11 = Jack, 12=Queen, 13=King, 14=Ace

function Card(s, r)
{
	this.suit = s;
	this.rank = r;
}

////// End Card class //////

////// Start Deck class //////
// A deck is an array of cards.
// The default constructor makes a deck with 52 cards
// There is also a constructor to make an empty deck
// Member variables for deck are:
//      cardArray[] (array of Card)
// Member functions for deck are:
//      fillDeck()--Erases previous deck state and fills with 52 cards in order
//      fillDeck( totalSuit, totalRank)--Allows you to fill deck with custom numbers of suit and rank
//      shuffleDeck()--Shuffles whatever cards are currently in the deck
//      takeTopCard()--Returns the top card in the deck and removes it from the deck
//      addCards()--Adds card top of deck, if array of cards will add all cards
//      takeIndexCard( cardIndex )--Removes a card at the index given

//Default constuctor: Makes an empty deck of cards
function Deck()
{
	this.cardArray = [];
}

// fillDeck()
// Erases all cards in deck and fill with 4 suits and 2 through 14 (aka 2 through Ace)
Deck.prototype.fillDeck = function fillDeck()
{
	//Emptying the deck
	this.cardArray.splice(0,this.cardArray.length);
	// Array for suit characters
	// Default 0 = c    1 = s    2 = h    3 = d
	var suitArray = [c, s, h, d];
	var minRank = 2; //Minimum card is a 2
	var maxRank = 14; //Max rank is Ace = 14

	//First For loop: cycles through the suits	
	//Second For loop: cycles through the ranks
	for (fillSuits=0; fillSuits < 3; fillSuits++)
	{
		for (fillRanks=minRank; fillRanks < maxRank + 1; fillRanks++)
		{
			this.cardArray.add(new Card(suitArray[fillSuits], fillRanks));
		}
	}
};

// fillDeck( totalSuit, totalRank)
// Default is 4 suits and 2 through 14 (aka 2 through Ace)
// If more than 4 suits: 5 = cc, 6 = ss, 7 = dd, 8 = hh, 9 = ccc, 10 = sss, etc.
//
Deck.prototype.fillDeck = function fillDeck(totalSuit, totalRank)
{
	//Emptying the deck
	this.cardArray.splice(0,this.cardArray.length);
	
	// Array for suit characters
	var suitArray = [c, s, h, d];

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
Deck.prototype.shuffleDeck = function shuffleDeck()
{
	// Makes a temp card so you can swap
	var tempCard = new Card (0,0);
	// The randomly selected card in the deck that the current card will switch with
	var cardToSwitchWith;

	for (shuffleThisCard = 0; shuffleThisCard < this.cardArray.length; shuffleThisCard++)
	{
		//Giving random number between 1 and number of cards in deck
		cardToSwitchWith = Math.floor((Math.random() * this.cardArray.length) + 1);
		// Next 3 lines are swap
		tempCard = this.cardArray[shuffleThisCard];
		this.cardArray[shuffleThisCard] = this.cardArray[cardToSwitchWith - 1]; // The -1 switches from # to index
		this.cardArray[cardToSwitchWith - 1] = this.cardArray[shuffleThisCard];		
	}
};

// takeTopCard() 
// This removes the top card (last in array) from the deck
Deck.prototype.takeTopCard = function takeTopCard()
{
	return this.cardArray.pop();
};

// addCards( cardToAdd) 
// This adds a card(s) to the top of the deck (adds to last in array)
// NOTE: Will work if either single card or array of cards is added
Deck.prototype.addCards = function addCards( cardsToAdd )
{
	this.cardArray.concat( cardsToAdd );
};

// takeIndexCard( cardIndex ) 
// This removes a card at a particular index and returns it
Deck.prototype.takeIndexCard = function takeIndexCard( deckCardIndex )
{
	return this.cardArray.splice(cardIndex, 1);
};

////// End Deck class //////



////// Start Player class //////

// A player is an object that can receive cards and play cards from their hand (Deck). The board is 
// printed based on what the player can see
// Member variables for Player Class
//	    teamNum--Which team number this player is on
//      ID--User name of the person
//   	screenName--Screen name in case we want to have user name and visible name seperate
//      myHand --The cards in the player's hand
//      myCardsWon = new Deck()--The cards from the tricks the player has won
//      myPiles = new Deck()-- In particular games a player might need more piles of cards, this is an array of decks
// Member functions for Player Class
//      receiveCardHand( cardToAdd ) 
//      receiveCardWin( cardToAdd )
//      playCardHand( handCardIndex)
//      emptyAllDecks()
//      sortHand()

//Default constuctor: Makes a player with an empty deck of cards
function Player(teamNumber, userID, alias)
{
	this.teamNum = teamNumber;
	this.servUserID = userID;
	
	if ( alias === undefined)
	{
		this.screenName = userID;
	}
	else
	{
	this.nickname = alias;
	}
	
	this.myHand = new Deck();
	this.myCardsWon = new Deck();
	this.myPiles = [];
}

// receiveCardHand( cardToAdd )
// Function used to give a player a card or set of cards (this function will accept arrays)
Player.prototype.receiveCardHand = function receiveCardHand( cardToAdd )
{
	this.myHand.addCards( cardToAdd );
};

// receiveCardWin( cardToAdd )
// Function used to give a player a card or set of cards (this function will accept arrays)
Player.prototype.receiveCardWin = function receiveCardWin( cardToAdd )
{
	this.myCardsWon.addCards( cardToAdd );
};

// playCard( handCardIndex )
// Function used to play a card, will be called by clicking on card button
// By clicking on the card button the index of the card clicked will be passed to this function
Player.prototype.playCardHand = function playCardHand( handCardIndex )
{
	return this.myHand.takeIndexCard( handCardIndex );
};

// emptyAllDecks()
// Function used to get rid of all cards a player has
Player.prototype.emptyAllDecks = function emptyAllDecks()
{
	this.myHand.splice(0,this.myHand.length);
	this.myCardsWon.splice(0,this.myCardsWon.length);
	this.myPiles.splice(0,this.myPiles.length);
};


// sortHand()
// Function used to sort a hand, can be called by button on player screen
Player.prototype.sortHand = function sortHand()
{
	// Code that sorts hand, give deck a function that sorts???
};



////// End Player class //////

////// Start Game class //////

// The two variables passed in are going to come from the server setting up the lobby.
function GameConfig( gameTypeID, playerArray)
{
	this.gameType = gameTypeID;
	this.players = playerArray;
	
	// IF playerArray doesn't have the right number of players for the game, return to lobby.
	// if (this.players.length !=  CHECKING APPROPRIATE CONFIG FILE VARIABLE )
	// {
	//  	Returnt to lobby
	// }
	
	// Call function to set up the players. This function will load the CONFIG FILE FUNCTION and run it on each player.
	// For each player in this.players, it will set up the correct number of piles, and double check
	// the order based on teams is correct
	
	// Start of loop that actually runs game. This will call a function in the CONFIG file, 
	// This function will need ot have a part that does setting up round, checking moves are legal, check game win, and after
	// The game return the winners to the GameConfig.
	
	
	
	this.myHand = new Deck();
	this.myCardsWon = new Deck();
	this.myPiles = [];
}



// The Game Function will have 4 main parts:
// 1) set up number of players, number of cards in deck,
// 2) See if a new round should start based on win conditions and set up that round 
//     (shuffle, deal, bidding, cardplay)
// 3) Check that all moves are legal during the round (trump, following suit)
//      3a) Check that the game isn't instantly won after a trick, ie team with 10 gets a 2 of trump played
// 4) Tablulate and update scores at the end of the round




////// End Game class //////




function preload() 
{
	game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	game.load.image('background','assets/starfield.jpg');
	game.load.spritesheet('cards', 'assets/52playingCardsSpriteSheet72x96.png', 72, 96)
}

var card_number = 6; // Number of cards on screen, will be buttons
var button = new Array(); //Array of butons for screen
var background; // back ground slide

function create() 
{
	game.stage.backgroundColor = '#182d3b'; // Hex code color 

	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	// Variables X and Y locations for Your Cards

	var xPixFromCenter;
	var yPix = 400;
	var xPix_FirstCard = -325;
	var xPix_spacing = 100;

	for (i=0; i < card_number; i++)
	{
		var xPixFromCenter = xPix_FirstCard + xPix_spacing*i; //spacing is 40 pixels

		//Button constructor, upFrame is left blank, not used
		button[i] = game.add.button(game.world.centerX + xPixFromCenter, yPix, 'cards', actionOnClick, this, 1, 0, 2);
		button[i].onInputOver.add(over, this);
		button[i].onInputOut.add(out, this);
		button[i].onInputUp.add(up, this);
	}
}


function up() 
{
	console.log('button up', arguments);
}

function over() 
{
	console.log('button over');
}

function out() 
{
	console.log('button out');
}

function actionOnClick() 
{

	background.visible =! background.visible;

}
