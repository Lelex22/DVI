import DungeonScene from "./dungeon-scene.js";
import ShopScene from "./ShopScene.js";
import GreenMapScene from "./mapaverde-scene.js";
import LavaMapScene from "./mapalava-scene.js";
import TitleScreenScene from "./titlescreen.js";
import GameOver from "./gameover.js";
import Preloads from "./preloads.js";
import MoonMapScene from "./mapanuevo-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  backgroundColor: "#000",
  parent: "game-container",
  pixelArt: true,
  scene: [Preloads, TitleScreenScene, DungeonScene, GreenMapScene, ShopScene, LavaMapScene, MoonMapScene, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);
