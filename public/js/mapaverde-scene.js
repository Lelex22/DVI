
import Player from "./player.js";

export default class GreenMapScene extends Phaser.Scene {

    constructor ()
    {
        super({
        key: 'GreenMapScene',
        physics: {
            default: 'arcade',
            arcade: { 
              gravity: { y: 300 }
            }
          }
        });
    }

    init(data){
        if(data !== null){
          this.lifesPlayer = data.vidas;
          this.coinsPlayer = data.monedas;
          this.buffsPlayer = data.buffs;
          this.mapa = data.mapa;
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
        //this.load.image('cielo', '../public/assets/tilesets/cielo.png');
        //this.load.image('mapaverde3', '../public/assets/tilesets/mapaverde3.png');
        //this.load.image('escaleras', '../public/assets/tilesets/escaleras.png');
        //this.load.image('puentes', '../public/assets/tilesets/puentes.png');
        this.load.image('mapaverde', '../public/assets/tilesets/genaric-cartoon-charactor-sprite-png-15-original.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/mapaVerde.json');
        
        this.load.spritesheet('button', '../public/img/flixel-button.png', { frameWidth: 80, frameHeight: 20 });

        this.load.bitmapFont('nokia', '../public/assets/nokia16black.png', '../public/assets/nokia16black.xml');
        
    }
    create(){
        
        const map = this.make.tilemap({ key: "map" });
        let tileset = map.addTilesetImage('genaric-cartoon-charactor-sprite-png-15-original', 'mapaverde');
        
        const cielo = map.createStaticLayer("Cielo", tileset, 0, 0);
        
        const agua = map.createStaticLayer("Agua", tileset, 0, 0);
        const escaleras = map.createStaticLayer("Escaleras", tileset, 0, 0);
        const puentes = map.createStaticLayer("Puentes", tileset, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tileset, 0, 0);
        
    
        
        
        //Faltaria añadir la estructura de los enemigos
        
        tierra.setCollisionByExclusion([-1]);
        escaleras.setCollisionByExclusion([-1]);
        puentes.setCollisionByExclusion([-1]);
        this.player = new Player(this, 10, 548, null, this.mapa);
        
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
        this.physics.add.collider(this.player.sprite, puentes);
        //this.physics.add.collider(this.player.sprite, escaleras);//Deberia de poderse usar y poder traspasar
        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player.sprite);
    }

    update(time, delta){
        if(this.player.sprite.x <= 9){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.start("DungeonScene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
            });
        }
        else this.player.update();
        
    }
    
}



