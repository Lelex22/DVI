/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tileset, Michele "Buch" Bucelli (tileset artist) & Abram Connelly (tileset sponsor):
 *     https://opengameart.org/content/top-down-dungeon-tileset
 *  - Character, Michele "Buch" Bucelli:
 *      https://opengameart.org/content/a-platformer-in-the-forest
 */

import DungeonScene from "./dungeon-scene.js";
import ShopScene from "./ShopScene.js";
import GreenMapScene from "./mapaverde-scene.js";
import LavaMapScene from "./mapalava-scene.js";
import TitleScreenScene from "./titlescreen.js";
import GameOver from "./gameover.js";
import Preloads from "./preloads.js";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  backgroundColor: "#000",
  parent: "game-container",
  pixelArt: true,
  // scene: [ Preloads, TitleScreenScene, DungeonScene, ShopScene, GreenMapScene, GameOver ],
  scene: [Preloads, TitleScreenScene, DungeonScene, GreenMapScene, ShopScene, LavaMapScene, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);
