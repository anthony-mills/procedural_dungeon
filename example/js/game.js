var game = new Phaser.Game(800, 350, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.time.advancedTiming = true;
    game.load.image('wall', 'img/wall.png');
    game.load.image('floor', 'img/floor.png');
}


function create() {
    cursors = game.input.keyboard.createCursorKeys();
    
    game.stage.backgroundColor = '#000';

    // Initialise the Dungeon Creation Plugin
    var dungeonCreator = game.plugins.add(Phaser.Plugin.DungeonCreator);

    // Create the Dungeon
    dungeonCreator.createMap();
}

function update() {

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

}

function render() {
	game.debug.text('FPS: ' + game.time.fps, 2, 14, "#00ff00");
}