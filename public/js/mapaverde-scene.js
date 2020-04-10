
import Player from "./player.js";

export default class ShopScene extends Phaser.Scene {

    constructor ()
    {
        super('mapaverde-scene');
    }

    init(data){
        if(data !== null){
          this.lifesPlayer = data.vidas;
          this.coinsPlayer = data.monedas;
          this.buffsPlayer = data.buffs;
        }
        //else this.player = new Player(this, 0, 0);
      }
    preload(){
        this.load.image("heart", "../public/img/heart.png");
        this.load.spritesheet(
        "characters",
        "../public/assets/spritesheets/luigi-sprites.png","../public/assets/spritesheets/Cyclops Sprite Sheet.png","../public/assets/spritesheets/enemigo.png",
        {
            frameWidth: 28,
            frameHeight: 28
        }
        );
        this.load.image('mapaverdeTiles', '../public/assets/tilesets/mapaverde.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/mapaVerde.json');
        
        this.load.spritesheet('button', '../public/img/flixel-button.png', { frameWidth: 80, frameHeight: 20 });

        this.load.bitmapFont('nokia', '../public/assets/nokia16black.png', '../public/assets/nokia16black.xml');
        
    }
    create(){
        
        const map = this.make.tilemap({ key: "map" });
        let tileset = map.addTilesetImage('mapaverde', 'mapaverdeTiles');
        const escaleras = map.createStaticLayer("Escaleras", tileset, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tileset, 0, 0);
        const agua = map.createStaticLayer("Agua", tileset, 0, 0);
        const puentes = map.createStaticLayer("Puentes", tileset, 0, 0);
        const cielo = map.createStaticLayer("Cielo", tileset, 0, 0);
        
        //Faltaria añadir la estructura de los enemigos
        
        tierra.setCollisionByExclusion([-1, 0]);
        escaleras.setCollisionByExclusion([-1, 0]);
        puentes.setCollisionByExclusion([-1, 0]);
        this.player = new Player(this, 250, 290);
        
        if(this.lifesPlayer && (this.coinsPlayer || this.coinsPlayer === 0) && this.buffsPlayer){
            this.buffsPlayer.forEach(function (elem, i){
                if(elem.value) 
                this.player.buffs[i].value = elem.value;
            }, this);
            this.player.buffs = this.buffsPlayer;
            this.player.coins = this.coinsPlayer;
            this.player.life = this.lifesPlayer;
        }
        for(let i = 0; i < this.player.life; i++)
            this.add.image(32 * i + 16, 20, 'heart').setScrollFactor(0);
        
        

        this.physics.add.collider(this.player.sprite, tierra);
        this.physics.add.collider(this.player.sprite, puente);
        //this.physics.add.collider(this.player.sprite, escaleras);//Deberia de poderse usar y poder traspasar
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
                this.scene.start("mapaverde-scene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
            });
        }

        else this.player.update();
        
    }
    
}



