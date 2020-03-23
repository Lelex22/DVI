import Player from "./player.js";

export default class ShopScene extends Phaser.Scene {

    constructor ()
    {
        super('ShopScene');
    }
    preload(){
        this.load.image("heart", "../public/img/heart.png");
        this.load.spritesheet(
        "characters",
        "../public/assets/spritesheets/luigi-sprites.png",
        {
            frameWidth: 28,
            frameHeight: 28
        }
        );
        this.load.image('tiendaTiles', '../public/assets/tilesets/tienda.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/tienda.json');
    }
    create(){
        const map = this.make.tilemap({ key: "map" });
        var tileset = map.addTilesetImage('tienda', 'tiendaTiles');
        const fondo = map.createStaticLayer("Capa de patrones 1", tileset, 0, 0);
        const borde = map.createStaticLayer("borde", tileset, 0, 0);
        const floor = map.createStaticLayer("floor", tileset, 0, 0);
        const pared = map.createStaticLayer("pared", tileset, 0, 0);
        const colisiones = map.createStaticLayer("objetoscoli", tileset, 0, 0);

        colisiones.setCollisionByExclusion([-1, 0]);
        borde.setCollisionByExclusion([-1, 0]);
        pared.setCollisionByExclusion([-1, 0]);
        this.player = new Player(this, 250, 290);

        this.physics.add.collider(this.player.sprite, borde);
        this.physics.add.collider(this.player.sprite, pared);
        this.physics.add.collider(this.player.sprite, colisiones);
        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player.sprite);
    }
    update(time, delta){
        if(this.player.sprite.x <= 250 && this.player.sprite.x >= 240 && this.player.sprite.y > 290){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.start("DungeonScene");
            });
        }

        else this.player.update();
    }
}