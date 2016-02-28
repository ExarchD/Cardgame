var game = new Phaser.Game(800, 600, Phaser.AUTO, 'button-test', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
    game.load.image('background','assets/starfield.jpg');

}
var card_number = 5;
var button = new Array();
var background;

function create() {

    game.stage.backgroundColor = '#182d3b';

    background = game.add.tileSprite(0, 0, 800, 600, 'background');

    for (i=0; i < card_number; i++)
    {
	    var number = 45 + 40*i;
    button[i] = game.add.button(game.world.centerX - number, 400, 'button', actionOnClick, this, 2, 1, 0);
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
