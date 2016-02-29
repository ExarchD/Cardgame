var game = new Phaser.Game(800, 600, Phaser.AUTO, 'button-test', { preload: preload, create: create });

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
