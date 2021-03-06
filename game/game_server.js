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
// Default is 4 suits and 2 through 14 (aka 2 through Ace)
Deck.prototype.fillDeck = function fillDeck()
{
	// Array for suit characters
	// Default 0 = c    1 = s    2 = h    3 = d
	var suitArray = ["c", "s", "h", "d"];
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
	// Array for suit characters
	var suitArray = ["c", "s", "h", "d"];

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
	this.myHand.cardArray.splice(0,myHand.cardArray.length);
	this.myCardsWon.cardArray.splice(0,myCardsWon.cardArray.length);
	this.myPiles.cardArray.splice(0,myPiles.cardArray.length);
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