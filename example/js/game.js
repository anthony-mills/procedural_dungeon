var game = new Phaser.Game(800, 450, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.time.advancedTiming = true;
    game.load.image('wall', 'img/wall.png');
    game.load.image('floor', 'img/floor.png');
}


function create() {
    cursors = game.input.keyboard.createCursorKeys();
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  

    game.stage.backgroundColor = '#000';

    // Initialise the Dungeon Creation Plugin
    dungeonCreator = game.plugins.add(Phaser.Plugin.DungeonCreator);

    // Set some parameters for your required Dungeon

    // At minimum set the sprite keys you would like to use for the walls and the floor
    var dungeonParams = {
        'wall' : 'wall',
        'floor' : 'floor'       
    };

    dungeonCreator.setupDungeon( dungeonParams );

    // Create the Dungeon
    dungeonCreator.createMap();
}

function update() {
    if ( space.isDown ) {

        dungeonCreator.destroyMap();
        dungeonCreator.createMap();
    }

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