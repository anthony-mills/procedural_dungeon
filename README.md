# Dungeon Generator PhaserJS Plugin

PhaserJS plugin to make the procedural generation of mazes and dungeons easy.

## Usage 

Usage of the plugin for the generation of a dungeon is fairly straight forward:

* Load the script into your [PhaserJS](https://phaser.io/) project
* Initialise the plugin i.e dungeonCreator = game.plugins.addPhaser.Plugin.DungeonCreator);
* Set up any required parameters for your dungeon by passing parameters the setupDungeon method.
* Call the createMap method to generate your dungeon e.g dungeonCreator.createMap();

Take a look at demo in the examples/folder for a basic implementation.

## Parameters

To configure the layout of your dungeon. Pass an object with your required parameters 
to the setupDungeon method.

* wall - The sprite cache key to use for the dungeon walls
* floor -  The sprite cache key to use for the dungeon floor
* max_rooms - The maximum number or rooms in the Dungeon
* room_max_size - The maximum size of a room in tiles
* room_min_size - The minimum size of a room in tiles
* map_size_x - The horizontal size of the map in pixels
* map_size_y - The vertical size of the map in pixels

## Example Usage

A working example of the plugin is included in the /examples folder of the repo.

![Example use of plugin](/screenshots/example_screenshot.png?raw=true "Plugin Demonstration")

## Licence

Copyright (C) 2017 [Anthony Mills](http://www.anthony-mills.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.