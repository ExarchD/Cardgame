

// Code for running a game of 4 person Pitch

var CARDS_DEALT = 6; //This is a constant, don't change the value
var FOUR_PLAYER_GAME = 4; //This is a constant, don't change.


// Everywhere you see "// ***GAME STATE UPDATE***"
// is a place where we probably need to send and receive sockets
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
	var iCurrentDealer = 0; //Index of the current dealer
	var iPlayerToLead = 0;
	var iPlayerWonTrick = 0;
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
	var jackThisRound = 0; // 1 for true, 0 for false
	var iPlayerWonJack = 0;
	var iTeamWonCardPoints = 0;
	
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
	//Initializing bids
	for( iBid = 0; iBid < playerArray.length; iBid++ )
	{
		bids.push(-1);
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
			//Return to lobby... or write code to check that there are 2 on each team, then rearrange so in right positions
		}
	}
	
	
	//*********************Loop that controls rounds, one round is 6 tricks
	
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
			playerArray[(iCurrentDealer + 1 + iDeal)%playerArray.length].receiveCardHand( pitch4Deck.takeTopCard() );
		}
		
		//Sorting everyone's hand for them
		for( iPlayer = 0; iPlayer < playerArray.length; iPlayer++)	
		{
			playerArray[i].sortHand();  //This function doesn't currently do anything.
		}
		
		// ***GAME STATE UPDATE***
		//NEED TO START PRINTING EVERYONE'S HAND HERE!!!
		
		// False case is 0, someone had a pitch hand
		if ( no_pitch_hands( playerArray ) == 0 )
		{
			// ANNOUCEMENT THAT SOMEONE HAD A PITCH HAND
			// SHOW EVERYONES CARDS
			// ***GAME STATE UPDATE***
			// HAVE EVERYONE CLICK BUTTON FOR REDEAL
		}
		else
		{
			//This is the case for no pitch hands... rest of round begins.
		
			//Bidding
			for( iBid = 0; iBid < playerArray.length; iBid++)
			{
				// ***GAME STATE UPDATE***
				// Need special bidding screen printed for all players, has whose turn it is to bid
				//if( playerArray[ (iCurrentDealer + 1 + iBid) % playerArray.length ].servUserID == ???.servUserID )
				//{
					// Call screen that can print pass, 1, 2, 3, 4, Shoot if it their turn to bid
					
				//}
				// record bid in 
				//bids[(iCurrentDealer + 1 + iBid) % playerArray.length] = button result
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
					//Setting the bidAllowed at index 2 (which corresponds to a bid of 2) to false
					bidsAllowed[2] = 0;
				}
				else if ( bids[iBid] == 3 )
				{
					//Setting the bidAllowed at index 2 (which corresponds to a bid of 2) to false
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
			
				//If iBid gets to playerArray.length - 2 (ie at the end of the 2nd to last player to bid) AND no one has bid 2 or higher, allowed bid for 0 disappears
				if( iBid == playerArray.length - 2 && bidsAllowed[2] == 1 )
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
			// ***GAME STATE UPDATE***
		
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
							// ***GAME STATE UPDATE***
							
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
					// ***GAME STATE UPDATE***
					
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
							// ***GAME STATE UPDATE***
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
								// ***GAME STATE UPDATE***
							}
						}
					}		
				}
				
				//Determine which player took the trick
				iPlayerWonTrick = (iPlayerToLead + indexWinTrick( pitchTrickDeck, trumpSuit ) )%playerArray.length;
				
				// Update instant points with jack
				for( iPitchTrickDeck = 0; iPitchTrickDeck <  pitchTrickDeck.cardArray.length; iPitchTrickDeck++ )
				{
					if( pitchTrickDeck.cardArray[iPitchTrickDeck].suit == trumpSuit && pitchTrickDeck.cardArray[iPitchTrickDeck].rank == 11 )
					{
						//Someone took the Jack, update instant points, record who won it
						instantPointTracker[ (playerArray[iPlayerWonTrick].teamNum - 1) ] = instantPointTracker[ (playerArray[iPlayerWonTrick].teamNum - 1) ] + 1;
						jackThisRound = 1; // 1 for true, 0 for false
						iPlayerWonJack = iPlayerWonTrick;
					}
				}
				
				//Checking if a non-bidding team just won with instant points from jack
				if( playerArray[iMaxBidPlayer].teamNum != playerArray[iPlayerWonTrick].teamNum )
				{
					if( score[ playerArray[iPlayerWonTrick].teamNum - 1 ] + instantPointTracker[ playerArray[iPlayerWonTrick].teamNum - 1 ] >= 11 )
					{
						//The team "playerArray[iPlayerWonTrick].teamNum" 
						//just won the game by instant points by taking the jack in a trick
						//Update scores and exit to lobby
						// ***GAME STATE UPDATE***
					}
				}
				//Checking if a bidding team just won with instant points from jack
				if( playerArray[iMaxBidPlayer].teamNum == playerArray[iPlayerWonTrick].teamNum )
				{
					if( instantPointTracker[ playerArray[iPlayerWonTrick].teamNum - 1 ] >= bids[iMaxBidPlayer] )
					{
						if( score[ playerArray[iPlayerWonTrick].teamNum - 1 ] + instantPointTracker[ playerArray[iPlayerWonTrick].teamNum - 1 ] >= 11 )
						{
							//The team "playerArray[iPlayerWonTrick].teamNum" 
							//just won the game by instant points by taking the jack
							//Update scores and exit to lobby
							// ***GAME STATE UPDATE***
						}
					}
				}	
				
				//Adding the cards from the won trick to the player who won them, while at the same time emptying the trick pile
				playerArray[iPlayerWonTrick].receiveCardWin( pitchTrickDeck.cardArray.splice(0,pitchTrickDeck.cardArray.length) );
				// ***GAME STATE UPDATE*** (no cards in middle any more)
				
			}
			
			//********* Use tempScore[] to count this round's game points
			// High card point
			tempScore[ playerArray[iHighCardOwner].teamNum - 1] = tempScore[ playerArray[iHighCardOwner].teamNum - 1 ] + 1;
			//Low card point
			tempScore[ playerArray[iLowCardOwner].teamNum - 1] = tempScore[ playerArray[iLowCardOwner].teamNum - 1 ] + 1;
			iLowCardOwner
			//If there was a jack, jack points
			if( jackThisRound == 1 )
			{
				tempScore[ playerArray[iPlayerWonJack].teamNum - 1] = tempScore[ playerArray[iPlayerWonJack].teamNum - 1 ] + 1;
			}	
		
			// Card Points
			iTeamWonCardPoints = indexTeamCardPoints( playerArray );
			//Condition for tie and no points awarded
			if( iTeamWonCardPoints == playerArray.length )
			{
				//Do nothing, this is condition for tie of card points
			}
			else
			{
				tempScore[iTeamWonCardPoints] = tempScore[iTeamWonCardPoints] + 1;
			}
			
			//Loop to give all teams the points they won that round, determines if bidding team made bid and gives points appropriately
			for( iTeamNum = 0; iTeamNum < score.length; iTeamNum++)
			{
				// The + 1 is to change from index to teamNum, checking if team is bidding team
				if( iTeamNum + 1 == playerArray[iMaxBidPlayer].teamNum )
				{
					//Handling shooting case
					if( bids[iMaxBidPlayer] == 11 )
					{
						if( tempScore[iTeamNum] == 4 )
						{
							score[iTeamNum] = score[iTeamNum] + 11;
						}
					}
					//Other cases
					else if( tempScore[iTeamNum] >= bids[iMaxBidPlayer] )
					{
						score[iTeamNum] = score[iTeamNum] + tempScore[iTeamNum];
					}
					else
					{
						score[iTeamNum] = score[iTeamNum] - bids[iMaxBidPlayer];
					}
				}
				//All other teams just get however many points they got that round
				else
				{
					score[iTeamNum] = score[iTeamNum] + tempScore[iTeamNum];
				}
			}

			// ***GAME STATE UPDATE***
			
			// Check to see if any teams won with the game points
			for( iTeamNum = 0; iTeamNum < score.length; iTeamNum++)
			{
				if( score[iTeamNum] >= 11)
				{
					//VICTORY CONDITION, RETURN TO LOBBY!!!
				}
			}
			
			
			
			//If another round increase the index of hte current dealer (mod playerArray.length) so ready for the next round... this needs
			//    to NOT advance if there is a pitch hand, so needs to be inside pitchHand if...else
			iCurrentDealer = (iCurrentDealer + 1)%playerArray.length;		
		}
		//END OF SECTION FOR NO PITCH HAND
		
		
		//*********************RESETTING round variables!
		
		//Replace all bids with default bid of -1;
		for( iBid = 0; iBid < playerArray.length; iBid++ )
		{
			bids[iBid] = -1;
		}
		
		//Resets all allowed bids to true (1), remember bidsAllowed[] corresponds to numbers [0,1,2,3,4,11]
		for( iBidAllowedReset = 0; iBidAllowedReset < bidsAllowed.length; iBidAllowedReset++)
		{
			bidsAllowed[i] = 1;
		}
		
		//Reset max bid to 0
		tempMaxBid = 0;
		//Reset first card played to 1
		firstRoundCardPlayed = 1;
		//Reset jackThisRound to false = 0
		jackThisRound = 0;
		
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
		
		// ***GAME STATE UPDATE***
		
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

//Receives the current cards in middle and determines the index of the card that won the trick
function indexWinTrick( pitchTrickDeck, trumpSuit )
{
	var highestIndex = 0;
	var highestCard = new Card( pitchTrickDeck.cardArray[0].suit, pitchTrickDeck.cardArray[0].rank ); //Initial highest card is first in array
	var leadSuit = pitchTrickDeck.cardArray[0].suit; //Lead suit is suit of first card in array
	
	//For loop to go through all cards in pitchTrickDeck (the deck in the middle of the table)
	for( iPitchTrickDeck = 0; iPitchTrickDeck < pitchTrickDeck.cardArray.length; iPitchTrickDeck++)
	{
		//Cases for trump being lead
		if (leadSuit == trumpSuit )
		{
			if( pitchTrickDeck.cardArray[iPitchTrickDeck].suit==trumpSuit && pitchTrickDeck.cardArray[iPitchTrickDeck].rank > highestCard.rank  )
			{
				highestIndex = iPitchTrickDeck;
				highestCard = pitchTrickDeck.cardArray[iPitchTrickDeck];
			}
		}
		//Cases for trump not lead, and someone played trump
		else if( pitchTrickDeck.cardArray[iPitchTrickDeck].suit == trumpSuit )
		{
			if( highestCard.suit != trumpSuit )
			{
				highestIndex = iPitchTrickDeck; 
				highestCard = pitchTrickDeck.cardArray[iPitchTrickDeck];
			}
			//Here we know the current card is trump, the highest card is trump, so we need to see if we should replace based on rank 
			else if ( highestCard.rank < pitchTrickDeck.cardArray[iPitchTrickDeck].rank )
			{
				highestIndex = iPitchTrickDeck; 
				highestCard = pitchTrickDeck.cardArray[iPitchTrickDeck];
			}
		}
		// Cases for no trump involved
		else if( pitchTrickDeck.cardArray[iPitchTrickDeck].suit == leadSuit && highestCard.rank < pitchTrickDeck.cardArray[iPitchTrickDeck].rank   )
		{
				highestIndex = iPitchTrickDeck; 
				highestCard = pitchTrickDeck.cardArray[iPitchTrickDeck];
		}
	}
	
	return highestIndex;
	
}

//
 function indexTeamCardPoints( playerArray )
 {
	 //Temporary counter for team card points
	 var tempTeamCardPoints = [];
	 var indexCurrentTeamMax = 0;
	 var isTie = 0; // 0 for false, 1 for true
	 
	 // Initializing array based on number of players
	 for( iPlayerArray = 0; iPlayerArray < playerArray.length/2; iPlayerArray++)
	 {
		 tempTeamCardPoints.push(0);
	 }
	 
	 //Adding all points players have to their team's card points
	 for( iPlayerArray = 0; iPlayerArray < playerArray.length; iPlayerArray++)
	 {
		 for( iCardsWon = 0 ; iCardsWon < playerArray[iPlayerArray].myCardsWon.cardArray.length; iCardsWon++ )
		 {
			 //Ten
			 if( playerArray[iPlayerArray].myCardsWon.cardArray[iCardsWon].rank == 10 )
			 {
				 tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] = tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] + 10;
			 }
			 //Jack
			 if( playerArray[iPlayerArray].myCardsWon.cardArray[iCardsWon].rank == 11 )
			 {
				 tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] = tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] + 1;
			 }
			 //Queen
			 if( playerArray[iPlayerArray].myCardsWon.cardArray[iCardsWon].rank == 12 )
			 {
				 tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] = tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] + 2;
			 }
			 //King
			 if( playerArray[iPlayerArray].myCardsWon.cardArray[iCardsWon].rank == 13 )
			 {
				 tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] = tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] + 3;
			 }
			 //Ace
			 if( playerArray[iPlayerArray].myCardsWon.cardArray[iCardsWon].rank == 14 )
			 {
				 tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] = tempTeamCardPoints[playerArray[iPlayerArray].teamNum - 1] + 4;
			 }			 
		 }
	 }
	 
	 //Setting values for first team as initial max values
	 indexCurrentTeamMax = 0;

	 
	 //Loop starts at 2nd team
	 for( iTeamCardPoints = 1; iTeamCardPoints < tempTeamCardPoints.length; iTeamCardPoints++)
	 {
		 if( tempTeamCardPoints[iTeamCardPoints] > tempTeamCardPoints[indexCurrentTeamMax] )
		 {
			 indexCurrentTeamMax = iTeamCardPoints;
			 isTie = 0;
		 }
		 else if ( tempTeamCardPoints[iTeamCardPoints] == tempTeamCardPoints[indexCurrentTeamMax] )
		 {
			 isTie = 1;
		 }
	 }
	 
	 if( isTie == 1 )
	 {
		 //Null value is full length of playerArray.length
		 return playerArray.length;
	 }
	 else
	 {
		 return indexCurrentTeamMax;
	 }
 }


























