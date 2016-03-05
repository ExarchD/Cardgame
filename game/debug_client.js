var game = new Phaser.Game(800, 600, Phaser.AUTO, 'button-test', { preload: preload, create: create, update: update, render: render });

function preload() 
// Phaser runs preload() immediately when the page is loaded.  It should only be used for loading assets into the game
{
	game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	game.load.image('background','assets/starfield.jpg');
	game.load.spritesheet('cards', 'assets/52playingCardsSpriteSheet72x96.png', 72, 96)
}

// initliaze all variables here that will be used in both create() and update(), so the variables have the correct scope
var card_number = 6; // Number of cards on screen, will be buttons
var button = new Array(); //Array of butons for screen
var background; // back ground slide

function create() 
// create() is called immediately after preload is finished, and can be used to create any objects needed at the start of the game.
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
		xPixFromCenter = xPix_FirstCard + xPix_spacing*i; //spacing is 40 pixels

		//Button constructor, upFrame is left blank, not used
		button[i] = game.add.button(game.world.centerX + xPixFromCenter, yPix, 'cards', actionOnClick, this, 1, 0, 2);
		button[i].onInputOver.add(over, this);
		button[i].onInputOut.add(out, this);
		button[i].onInputUp.add(up, this);
	}
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


////// Other game-specific functions //////

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
