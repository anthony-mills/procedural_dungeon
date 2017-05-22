/**
 * @author Anthony Mills <https://www.anthony-mills.com>
 * @copyright 2017 Anthony Mills
 * @license GPLV3
 */

Phaser.Plugin.DungeonCreator = function (game, parent) {
  Phaser.Plugin.call(this, game, parent);

  Phaser.Plugin.DungeonCreator = Object.create(Phaser.Plugin.prototype);
};

Phaser.Plugin.DungeonCreator.prototype = {

    /**
    * Set the parameters of the dungeon
    *
    */
    init: function( mapParams ) {

      this.wallKey = mapParams.wall || 'wall';
      this.floorKey = mapParams.floor || 'floor';

      dungeonCreator.levelMap = {};

      this.roomMaxSize = mapParams.room_max_size || 5;
      this.roomMinSize = mapParams.room_min_size || 2;
      this.maxRooms = 15;
      
      this.lastRoomCenter = {x: 0, y: 0};
      this.numRooms = 0;
      this.numTiles = 0;
      this.tileSize = 128;

      this.floorCount = 0;

      this.mapSize = { x: 3072, y: 3072 }

      this.mapLocations = {};
    },

    /**
    * Set the size of the map
    *
    * @param object mapSize
    */
    setMapSize: function ( mapSize )
    {
      this.mapSize = mapSize;
    }, 

    /**
    * Get the size of the map
    */
    getMapSize: function ()
    {
      return this.mapSize;
    },

    /**
    * Create the level map
    *
    */
    createMap: function()
    {

      dungeonCreator.levelMap.walls = game.add.group();
      dungeonCreator.levelMap.walls.enableBody = true;
            
      dungeonCreator.levelMap.floors = game.add.group();      

      for (var y=0; y<this.mapSize.y; y+= this.tileSize) {
          for (var x=0; x<this.mapSize.x; x+=this.tileSize) {
              var wall = dungeonCreator.levelMap.walls.create(x, y, this.wallKey);
              wall.body.immovable = true;
          }
      }
      
      this.lastRoomCoords = { x: 128, y: 128 };

      for (var r=0; r<this.maxRooms; r++) {
          var w = this.getRandom(this.roomMinSize, this.roomMaxSize) * this.tileSize;
          var h = this.getRandom(this.roomMinSize, this.roomMaxSize) * this.tileSize;
          
          x = this.getRandom(1, ((this.mapSize.x) / this.tileSize) - (w/this.tileSize + 1)) * this.tileSize;
          y = this.getRandom(1, ((this.mapSize.y) / this.tileSize) - (w/this.tileSize + 1)) * this.tileSize;
                          
          this.createRoom(x, x+w, y, y+h);
          
          var spawnX = x + (w/2);
          var spawnY = y + (h/2); 

          var newX = game.math.snapToFloor(x + (w/2), this.tileSize);
          var newY = game.math.snapToFloor(y + (h/2), this.tileSize);
          
          var prevX = game.math.snapToFloor(this.lastRoomCoords.x, this.tileSize);
          var prevY = game.math.snapToFloor(this.lastRoomCoords.y, this.tileSize);

          this.createHTunnel(prevX, newX, prevY, prevY);
          this.createVTunnel(prevY, newY, newX);

          this.lastRoomCoords = { x: x + (w/2), y: y + (h/2) };
          this.numRooms++;
      }

      game.physics.game.world.setBounds(0,0,this.mapSize.x,this.mapSize.y);;

      return this.mapLocations;     
    },

    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    Room: function(x, y, w, h) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;
        
        var center_x = (this.x1 + this.x2) / 2;
        var center_y = (this.y1 + this.y2) / 2;
        this.center_coords = {x: center_x, y: center_y};
    },
    
    createFloor: function(x, y) {
        fl = dungeonCreator.levelMap.floors.create(x, y, this.floorKey);
        game.physics.arcade.enable(fl);

        game.physics.arcade.overlap(fl, dungeonCreator.levelMap.walls, function(floor, wall) {
            wall.destroy();
        });

        this.floorCount++;

        fl.destroy();
    },
    
    createRoom: function(x1, x2, y1, y2) {
        for (var x = x1; x<x2; x+=this.tileSize) {
            for (var y = y1; y<y2; y+=this.tileSize) {
                this.createFloor(x, y);
            }
        }
    },
    
    createHTunnel: function(x1, x2, y) {
        var min = Math.min(x1, x2);
        var max = Math.max(x1, x2);
        for (var x = min; x<max+8; x+=8) {
            this.createFloor(x, y);
        }
    },
    
    createVTunnel: function(y1, y2, x) {
        var min = Math.min(y1, y2);
        var max = Math.max(y1, y2);
        for (var y = min; y<max+8; y+=8) {
            this.createFloor(x, y);
        }
    }   
};
