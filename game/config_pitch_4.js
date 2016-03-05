

// Code for running a game of 4 person Pitch

var CARDS_DEALT = 6; //This is a constant, don't change the value
var FOUR_PLAYER_GAME = 4; //This is a constant, don't change.
function config_pitch_4( playerArray )
{
	// Things to send to client
	// score_1, score_2, player's hand, cards in the middle, bids, whose turn it is
	
	// Overall Game variables
	var pitch4Deck = new Deck();
	var pitchTrickDeck = new Deck();
	var score = [];
	 

	
	//Bidding variables
	var bids = [];
	var iMaxBidPlayer = 0; // For keeping track of which player bids the most
	var tempMaxBid = 0;	
	var bidsAllowed = [1,1,1,1,1,1]; // bidsAllowed is an array of booleans corresponding to [0,1,2,3,4,11], use 1 for true, 0 for false

	//Game control and player tracking variables
	var currentDealer = 0; //Index of the current dealer
	var iPlayerToLead = 0;
	var leadSuit = "c";
	var tempCard = new Card( 0,0);
	var legalPlay = 0; // Variable that will not allow game to advance until player plays a legal card from their hand
	var iCardButtonClicked = 0; // Index of the button the player clicked, used to see if valid move, if valid will pop card
								// From player hand and put in center pile
	
	//Instand win and scoring control variables
	var instantPointTracker = []; //Used to tell if win with instant points
	var tempScore = []; //Used to count points at end of round (THIS IS DIFFERENT THAN INSTANT, INSTANT IS ONLY 2, ACE and JACK)
	var cardPoints = [];
	var iHighestCardPointTeam = 0;
	
	// Trump card variables 
	var firstRoundCardPlayed = 1; //There are special instructions concerning trump when the first card is played, 1 is true, 0 is false
	var trumpSuit = "c";
	var highCard = new Card(0,0);
	var lowCard = new Card(0,0);
	var iHighCardOwner = 0;
	var iLowCardOwner = 0;
	
	
	
	//******************Initializing game, checking that player array is set up correctly
		
	//Checking that the right number of players were passed in
	if( playerArray.length != FOUR_PLAYER_GAME)
	{
		//Return to lobby
	}
	
	//Score array initialization
	for( iScore = 0; iScore < playerArray.length/2; iScore++)
	{
		score.push(0);
	}
	//Initializing instandPointTracker
	for( iNumTeam = 0; iNumTeam < playerArray.legnth/2; iNumTeam++)
	{
		instantPointTracker.push(0);
	}
	//Initializing the tempScore for counting points at end of round
	for( iNumTeam = 0; iNumTeam < playerArray.legnth/2; iNumTeam++)
	{
		tempScore.push(0);
	}
	//Initializing the cardPoints array for counting cardPoints at end of round
	for( iNumTeam = 0; iNumTeam < playerArray.legnth/2; iNumTeam++)
	{
		cardPoints.push(0);
	}
	
		
	//Checking that all items in playerArray are of type Player ???
	for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)
	{
		//
	}
	
	//Checking that players alternate team1, team2
	for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)
	{
		if( playerArray[i].teamNum != (iPlayer + 1)%(playerArray.length/2) )
		{
			//Return to lobby
		}
	}
	
	
	//*********************Loop that controls rounds
	
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
		for( iDeal = 0; iDeal < CARDS_DEALT * playerArray.length; iDeal++)
		{
			//Takeing card from top of deck, putting in players hand, starting with perons left of dealer
			playerArray[(currentDealer + 1 + iDeal)%playerArray.length].receiveCardHand( pitch4Deck.takeTopCard() );
		}
		
		//Sorting everyone's hand for them
		for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)	
		{
			playerArray[i].sortHand();  //This function doesn't currently do anything.
		}
		
		//NEED TO START PRINTING EVERYONE'S HAND HERE!!!
		
		// False case is 0, someone had a pitch hand
		if ( no_pitch_hands( playerArray ) == 0 )
		{
			// ANNOUCEMENT THAT SOMEONE HAD A PITCH HAND
			// SHOW EVERYONES CARDS
			// HAVE EVERYONE CLICK BUTTON FOR REDEAL
		}
		else
		{
			//This is the case for no pitch hands... rest of round begins.
		
			//Bidding
			for( iBid = 0; iBid < playerArray.length; iBid++)
			{
				// Need special bidding screen printed for all players, has whose turn it is to bid
				//if( playerArray[ (currentDealer + 1 + iBid) % playerArray.length ].servUserID == ???.servUserID )
				//{
					// Call screen that can print pass, 1, 2, 3, 4, Shoot if it their turn to bid
					
				//}
				// record bid in 
				//bids[(currentDealer + 1 + iBid) % playerArray.length] = button result
				if ( bids[iBid] == 0 )
				{
					//Do nothing
				}	
				else if ( bids[iBid] == 1 )
				{
					// Also do nothing, but will display
				}
				else if ( bids[iBid] == 2 )
				{
					//Setting the bidAllowed at index 2 (which is also 2) to false
					bidsAllowed[2] = 0;
				}
				else if ( bids[iBid] == 3 )
				{
					//Setting the bidAllowed at index 2 (which is also 2) to false
					bidsAllowed[2] = 0;
					bidsAllowed[3] = 0;
				}
				else if ( bids[iBid] == 4 )
				{
					bidsAllowed[2] = 0;
					bidsAllowed[3] = 0;
					bidsAllowed[4] = 0;
				}
				else if (bids[iBid] == 11 )
				{
					bidsAllowed[2] = 0;
					bidsAllowed[3] = 0;
					bidsAllowed[4] = 0;
					bidsAllowed[5] = 0; //Index 5 has whether a shoot is allowed
				}
			
				// If you aren't the first person on your team to bid, you can't bid 1 any more
				// Is greater than 0 because if iBid = 1, the index=1 player has already bid and the allowed bids for the index=2
				//     player needs to be set
				if( iBid > 0 )
				{
					bidsAllowed[1] = 0;
				}
			
				//If iBid gets to playerArray.length - 2 (ie at the end of the 2nd to last player to bid) and no one has bid 2 or higher, allowed bid for 0 disappears
				if( iBid = playerArray.length - 2 )
				{
					bidsAllowed[0] = 0;
				}
			
			}

			//determining who won the bidding
			for( iBid = 0; iBid < playerArray.length; iBid++ )
			{
				if( bids[iBid] > tempMaxBid )
				{
					tempMaxBid = bids[iBid];
					iMaxBidPlayer = iBid;				
				}
			}
		
			// For initial setup, whoever took the bid leads the first round
			iPlayerToLead = iMaxBidPlayer;
		
			// ROUND LOOP, controls all tricks
			for( iTrickNum = 0; iTrickNum < CARDS_DEALT; iTrickNum++ )
			{
				// Collecteds the cards for each trick
				for( iTrickCard = 0; iTrickCard < playerArray.length; iTrickCard++)
				{
					// Setting legal play to 0, has to play a legal card to be able to exit this while loop
					legalPlay = 0;
					// WHILE LOOP TO GET VALID CARD TO PLAY
					while( legalPlay == 0)
					{
						//Getting card from whoever's turn it is, index of current player is "(iPlayerToLead+iTrickCard)%playerArray.length"
						// Gets feedback from buttons about which card is attempted to be played
						// The button clicked needs to return the INDEX of the card being attempted to play, iCardButtonClicked
						// tempCard = playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].myHand.cardArray[iCardButtonClicked];
						// need to split equals up into .suit and .rank for copying
			
						if( firstRoundCardPlayed == 1 )
						{
							//Assigning trump suit
							trumpSuit = tempCard.suit;
							
							//Default is first card played is both high and low, will sort through all cards to find out
							highCard.suit = tempCard.suit;
							highCard.rank = tempCard.rank;
							iHighCardOwner = iMaxBidPlayer;
							lowCard.suit = tempCard.suit;
							lowCard.rank = tempCard.rank;
							iLowCardOwner = iMaxBidPlayer;

							// for loops checks all hands of all players for which cards are high and low, 
							//      and recording WHO has them (otherwise info lost at end of round)
							for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)
							{
								for( iPlayerCard = 0; iPlayerCard < playerArray[iPlayer].myHand.cardArray.length; iPlayerCard++ )
								{
									//Checking to see if a player's card is higher than the previous high card, if so, setting that as the new high card
									if( playerArray[iPlayer].myHand.cardArray[iPlayerCard].suit == trumpSuit && playerArray[iPlayer].myHand.cardArray[iPlayerCard].rank > highCard.rank )
									{
										highCard.rank = playerArray[iPlayer].myHand.cardArray[iPlayerCard].rank;
										iHighCardOwner = iPlayer;										
									}
									
									//Checking to see if a player's card is lower than the previous low card, if so, setting that as the new low card
									if( playerArray[iPlayer].myHand.cardArray[iPlayerCard].suit == trumpSuit && playerArray[iPlayer].myHand.cardArray[iPlayerCard].rank < lowCard.rank )
									{
										lowCard.rank = playerArray[iPlayer].myHand.cardArray[iPlayerCard].rank;
										iLowCardOwner = iPlayer;	
									}
								}
							}
				
							//Turning off first card played so these events are trigged again this round
							firstRoundCardPlayed = 0;
						}
						
						//If first card played in trick, setting that suit as lead suit, and it is automatically legal
						
						if( iTrickCard == 0 )
						{
							leadSuit = tempCard.suit;
							legalPlay = 1;
						}			
						//Takes trump and lead suits and card attemped along with player hand to determine if legal play
						else if ( legalPitchCardPlay( trumpSuit, leadSuit, tempCard, playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].myHand ) == 1 )
						{
							legalPlay = 1;
						}
						else
						{
							// It is not a legal play and the player needs to be informed of this... will go back through loop waiting for button press
						}	
					}
					
					//Line that actually removes card from player's hand and puts it in the middle pile
					pitchTrickDeck.addCards( playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].playCardHand( iCardButtonClicked ) );
					// Update print view???
					
					//Updating the instant point tracker if the 2 of trump is played
					if( tempCard.suit == trumpSuit && tempCard.rank == 2)
					{
						//The -1 is for converting from team number to index of point tracking for that team
						instantPointTracker[ (playerArray[iLowCardOwner].teamNum - 1) ] = instantPointTracker[ (playerArray[iLowCardOwner].teamNum - 1) ] + 1;
					}
					//Updating the instant point tracker if the Ace of trump is played
					if( tempCard.suit == trumpSuit && tempCard.rank == 14 )
					{
						instantPointTracker[ (playerArray[iHighCardOwner].teamNum - 1) ] = instantPointTracker[ (playerArray[iHighCardOwner].teamNum - 1) ] + 1;
					}
					
					//Checking if a non-bidding team just won with instant points
					if( playerArray[iMaxBidPlayer].teamNum != playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum )
					{
						if( score[ playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum - 1 ] + instantPointTracker[ playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum - 1 ] >= 11 )
						{
							//The team "playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum" 
							//just won the game by instant points in the middle of a trick
							//Update scores and exit to lobby
						}
					}
					
					//Checking if a bidding team just won with instant points
					if( playerArray[iMaxBidPlayer].teamNum == playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum )
					{
						if( instantPointTracker[ playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum - 1 ] >= bids[iMaxBidPlayer] )
						{
							if( score[ playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum - 1 ] + instantPointTracker[ playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum - 1 ] >= 11 )
							{
								//The team "playerArray[(iPlayerToLead+iTrickCard)%playerArray.length].teamNum" 
								//just won the game by instant points in the middle of a trick
								//Update scores and exit to lobby
							}
						}
					}		
				}
				//*****MATT ENDED HERE********
				
				//Determine which player took the trick
				// Update instnat points with jack
				// Do the non-bidding team win check and bidding team win check (just need to change indexes)
				
				//Move all cards from trick into winning player's .myCardsWon with Player.receiveCardWin( cardToAdd )
				
				//Empty pitchTrickDeck with  
				pitchTrickDeck.cardArray.splice(0,pitchTrickDeck.cardArray.length);
			
			}
			
			// Use tempScore[] to count this round's game points
			//COUNT ALL CARD POINTS (probably in function that is given player and accesses myCardsWon), determine who gets that point
			//      Will use a loop to calculate each player's Card Points, add their card points to their team in cardPoints[]
			//      Use a loop to figure out which team had max card points, if tie need to check that as well
			// Determine which team took the jack, if any and give them a point
			// Use iHighCardOwner and iLowCardOwner to give those two points 
			
			//UPDATE FINAL SCORE OF ROUND:
			//       Give points to non-bidding team in score[]
			//       Check to see if bidding team made bid, if so give points, if not take away points
			
			//CHECK SCORE TO SEE IF CONTINUE
			//       Check to see if any teams won with the game points
			
			//If another round increase the index of hte current dealer (mod playerArray.length) so ready for the next round... this needs
			//    to NOT advance if there is a pitch hand, so needs to be inside pitchHand if...else
		
		}
		//END OF SECTION FOR NO PITCH HAND
		
		
		//*********************RESETTING round variables!
		
		//Clear all bids with bids.splice(0,bids.length);
		bids.splice(0,bids.length);
		
		//Resets all allowed bids to true (1), remember bidsAllowed[] corresponds to numbers [0,1,2,3,4,11]
		for( iBidAllowedReset = 0; iBidAllowedReset < bidsAllowed.length; iBidAllowedReset++)
		{
			bidsAllowed[i] = 1;
		}
		
		//Reset max bid to 0
		tempMaxBid = 0;
		//Reset first card played to 1
		firstRoundCardPlayed = 1;
		
		//Resetting the array that keeps track of instand points for the teams
		for( iNumTeam = 0; iNumTeam < playerArray.length/2; iNumTeam++)
		{
			instantPointTracker[iNumTeam] = 0;
		}
		
		//Resetting the array that keeps track of the tempScore
		for( iNumTeam = 0; iNumTeam < playerArray.length/2; iNumTeam++)
		{
			tempScore[iNumTeam] = 0;
		}
		
		//Resetting the array that keeps track of the cardPoints
		for( iNumTeam = 0; iNumTeam < playerArray.length/2; iNumTeam++)
		{
			cardPoints[iNumTeam] = 0;
		}
		
		//Resetting the highestCardPoints value
		highestCardPoints = 0;
		
		if( gameLoop == 200 )
		{
			// Game loop reached maximum number of rounds, draw, returning to lobby
		}
	}
		
	
}


//Will check to see if any of the players in the array has a pitch hand
//If no one has a pitch hand, will return 1
//If someone has a pitch hand, will return 0
function no_pitch_hands( playerArray )
{
	// 0 is false, 1 is true
	var hasNonPitchCard = 0;
	
	for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)
	{
		hasNonPitchCard = 0;
		
		for( iPlayerCard = 0; iPlayerCard < playerArray[iPlayer].myHand.cardArray.length; iPlayerCard++ )
		{
			//Case 1 of non pitch card, has a 2 of any suit
			if( playerArray[iPlayer].myHand.cardArray[iPlayerCard].rank == 2 )
			{
				hasNonPitchCard = 1;
			}
			//Case 2 of non pitch card, has a 10 or above
			if( playerArray[iPlayer].myHand.cardArray[iPlayerCard].rank > 9 )
			{
				hasNonPitchCard = 1;
			}
			
		}
		
		if( hasNonPitchCard == 0 )
		{
			//If this is still 0, someone has a pitch hand, returns 0 (false)
			return 0;
		}	
	
		
		
	}
	
	// To make it here, no one had a pitch hand, so this function returns true=1
	return 1;
	
}

//Recieves a trumpSuit, leadSuit, tempCard=cardAttempted, and a Deck (that is the player's hand)
// Returns 1 if the tempCard is a legal play, 0 if the tempCard is not a legal play
function legalPitchCardPlay( trumpSuit, leadSuit, tempCard, playerHandDeck )
{
	var numLeadSuit = 0;
	
	//The two easy cases.
	if ( tempCard.suit == trumpSuit || tempCard.suit == leadSuit )
	{
		return 1;
	}
	
	//Loop to check to see if player has any of the leadSuit
	//At this point we know tempCard is not trump or leadSuit, so if he has the leadSuit, this is an illegal play
	for( iPlayerHand = 0; iPlayerHand < playerHandDeck.cardArray.length; iPlayerHand++ )
	{
		if( playerHandDeck.cardArray[iPlayerHand].suit == leadSuit )
		{
			numLeadSuit++;
		}
	}

	if( numLeadSuit == 0 )
	{
		//If there are no other lead suits, this is legal
		return 1;
	}
	else
	{
		//If there is another leadSuit, this is an illegal play
		return 0;
	}
}

