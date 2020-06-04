
//import Dungeon from "@mikewesthad/dungeon";

// Codigo utilizado desde https://github.com/mikewesthad/phaser-3-tilemap-blog-posts/blob/master/posts/post-3/demo/js/tile-mapping.js
import Player from "./player.js";
import TILES from "./tile-mapping.js";
import TilemapVisibility from "./tilemap-visibility.js";

/**
 * Scene that generates a new dungeon
 */
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super('DungeonScene');

  }
  init(data) {
    if (data !== null) {
      this.lifesPlayer = data.vidas;
      this.coinsPlayer = data.monedas;
      this.buffsPlayer = data.buffs;
      this.maxLife = data.maxLife;
    }
  }


  preload() { }

  create() {
    this.carga = this.scene.get("Preloads");
    //Audio
    const config = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };
    if (this.backgroundsong === null || this.backgroundsong === undefined)
      this.backgroundsong = this.sound.add("mazmorra", config);
    if (this.backgroundsong !== null && this.backgroundsong !== undefined && !this.backgroundsong.isPlaying)
      this.backgroundsong.play();
    this.hasPlayerReachedShop = false;
    let audio = this.sound.add("letsgo", {
      volume: 0.3,
    });

    // Generate a random world with a few extra options:
    //  - Rooms should only have odd number dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, so that we can place a corner tile on
    //    either side of the door location
    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      doorPadding: 2,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true }
      }
    });

    // Creating a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: this.dungeon.width,
      height: this.dungeon.height
    });
    const tileset = map.addTilesetImage("tiles", null, 32, 32, 0, 0); // 1px margin, 2px spacing
    this.groundLayer = map.createBlankDynamicLayer("Ground", tileset).fill(TILES.BLANK);
    this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);
    const shadowLayer = map.createBlankDynamicLayer("Shadow", tileset).fill(TILES.BLANK);

    this.tilemapVisibility = new TilemapVisibility(shadowLayer);

    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles, but occasionally place a dirty tile
      // See "Weighted Randomize" example for more information on how to use weightedRandomize.
      this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, TILES.FLOOR);

      // Place the room corners tiles
      this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
      this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

      // Fill the walls with mostly clean tiles, but occasionally place a dirty tile
      this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
      this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.BOTTOM);
      this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.LEFT);
      this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.RIGHT);

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location
      let doors = room.getDoorLocations();
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
        } else if (doors[i].y === room.height - 1) {
          this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
        } else if (doors[i].x === 0) {
          this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
        } else if (doors[i].x === room.width - 1) {
          this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
        }
      }
    });

    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    const rooms = this.dungeon.rooms.slice();
    const startRoom = rooms.shift();
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const mapRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const lavaRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const blueRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
    // Place the shop
    this.stuffLayer.putTileAt(TILES.SHOP, endRoom.centerX, endRoom.centerY);
    this.stuffLayer.putTileAt(TILES.MAPAVERDE, mapRoom.centerX, mapRoom.centerY);
    this.stuffLayer.putTileAt(TILES.MAPALAVA, lavaRoom.centerX, lavaRoom.centerY);
    this.stuffLayer.putTileAt(TILES.BLUE, blueRoom.centerX, blueRoom.centerY);
    // Place stuff in the 90% "otherRooms"
    otherRooms.forEach(room => {
      let rand = Math.random();
      if (rand <= 0.25) {
        // 25% chance of chest
        this.stuffLayer.weightedRandomize(room.centerX, room.centerY, 1, 1, TILES.CHEST);
      } else if (rand <= 0.375) {
        // 50% chance of a pot in the room... except don't block a door!
        this.stuffLayer.weightedRandomize(room.centerX - 1, room.centerY - 1, 1, 1, TILES.POT);
        this.stuffLayer.weightedRandomize(room.centerX + 1, room.centerY + 1, 1, 1, TILES.POT);
      }
      else if (rand <= 0.5) {
        // 50% chance of a pot anywhere in the room... except don't block a door!
        if (room.height >= 9) {
          this.stuffLayer.weightedRandomize(room.centerX - 1, room.centerY + 1, 1, 1, TILES.EXTR);
          this.stuffLayer.weightedRandomize(room.centerX + 1, room.centerY + 1, 1, 1, TILES.EXTR);
          this.stuffLayer.weightedRandomize(room.centerX - 1, room.centerY - 2, 1, 1, TILES.EXTR);
          this.stuffLayer.weightedRandomize(room.centerX + 1, room.centerY - 2, 1, 1, TILES.EXTR);
        } else {
          this.stuffLayer.weightedRandomize(room.centerX - 1, room.centerY - 1, 1, 1, TILES.EXTR);
          this.stuffLayer.weightedRandomize(room.centerX + 1, room.centerY + 1, 1, 1, TILES.EXTR);
        }
      }
      else {
        // 25% of either 2 or 4 towers, depending on the room size
        if (room.height >= 9) {
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
        } else {
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
          this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
        }
      }
    });

    // Not exactly correct for the tileset since there are more possible floor tiles, but this will
    // do for the example.
    this.groundLayer.setCollisionByExclusion([-1, 4, 12]);
    this.stuffLayer.setCollisionByExclusion([-1, 4, 12]);

    this.stuffLayer.setTileIndexCallback(TILES.SHOP, () => {
      audio.play();
      this.stuffLayer.setTileIndexCallback(TILES.SHOP, null);
      this.hasPlayerReachedShop = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.scene.start("ShopScene", { vidas: this.player.life, monedas: 1250, buffs: this.player.buffs, mapa: "tienda", maxLife: this.player.maxLife });
        this.scene.stop();
      });
    });

    this.stuffLayer.setTileIndexCallback(TILES.MAPAVERDE, () => {
      audio.play();
      this.stuffLayer.setTileIndexCallback(TILES.MAPAVERDE, null);
      this.hasPlayerReachedShop = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.scene.start("GreenMapScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, mapa: "verde", maxLife: this.player.maxLife });
        this.sound.removeByKey("mazmorra");
        this.backgroundsong = null;
        this.scene.stop();
      });
    });
    this.stuffLayer.setTileIndexCallback(TILES.MAPALAVA, () => {
      audio.play();
      this.stuffLayer.setTileIndexCallback(TILES.MAPALAVA, null);
      this.hasPlayerReachedShop = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.scene.start("LavaMapScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, mapa: "verde", maxLife: this.player.maxLife });
        this.sound.removeByKey("mazmorra");
        this.backgroundsong = null;
        this.scene.stop();
      });
    });
    this.stuffLayer.setTileIndexCallback(TILES.BLUE, () => {
      audio.play();
      this.stuffLayer.setTileIndexCallback(TILES.BLUE, null);
      this.hasPlayerReachedShop = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.scene.start("MoonMapScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, mapa: "verde", maxLife: this.player.maxLife });
        this.sound.removeByKey("mazmorra");
        this.backgroundsong = null;
        this.scene.stop();
      });
    });

    // Place the player in the first room
    const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y, this.buffsPlayer, "no_definido", this.lifesPlayer, this.coinsPlayer, this.maxLife);
    // Watch the player and tilemap layers for collisions, for the duration of the scene:
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.stuffLayer);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player);
    /* Vidas: Se supone que ese this.life = 5 no va a ser necesario, sino que vamos
    a obtener las vidas restantes */
    this.vidas = this.carga.dibujaVidas(this, this.player.life);
    this.textMonedas = this.carga.dibujaMonedas(this);
    // Help text that has a "fixed" position on the screen
    this.add.text(3, 535, 'Busca la tienda o los niveles\nUsa las flechas para moverte.', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    this.add.text(3,535, 'Nivel Azul(Fácil) ',{
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 40 },
      backgroundColor: "#ffffff",
      color:'#0000FF'
    })
    this.add.text(3,535, 'Nivel Verde(Medio) ',{
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 30},
      backgroundColor: "#ffffff",
      color:'#2d572c'
    })
    this.add.text(3,535, 'Nivel Naranja(Dificil) ',{
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 20 },
      backgroundColor: "#ffffff",
      color:'#FF0000'
    })
      .setScrollFactor(0);
    ;
  }

  update(time, delta) {
    if (this.hasPlayerReachedShop) return;

    this.player.update();

    // Find the player's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room object
    const playerTileX = this.groundLayer.worldToTileX(this.player.x);
    const playerTileY = this.groundLayer.worldToTileY(this.player.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

    this.tilemapVisibility.setActiveRoom(playerRoom);
  }
}