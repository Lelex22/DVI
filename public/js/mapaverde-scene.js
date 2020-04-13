
import Player from "./player.js";

export default class GreenMapScene extends Phaser.Scene {

    constructor ()
    {
        super('GreenMapScene');
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
        this.load.image('cielo', '../public/assets/tilesets/cielo.png');
        this.load.image('mapaverde3', '../public/assets/tilesets/mapaverde3.png');
        this.load.image('escaleras', '../public/assets/tilesets/escaleras.png');
        this.load.image('puentes', '../public/assets/tilesets/puentes.png');
        this.load.image('agua', '../public/assets/tilesets/agua.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/mapaVerdeFin.json');
        
        this.load.spritesheet('button', '../public/img/flixel-button.png', { frameWidth: 80, frameHeight: 20 });

        this.load.bitmapFont('nokia', '../public/assets/nokia16black.png', '../public/assets/nokia16black.xml');
        
    }
    create(){
        
        const map = this.make.tilemap({ key: "map" });
        let tilesagua = map.addTilesetImage('agua');
        let tilescielo = map.addTilesetImage('cielo');
        let tilestierra = map.addTilesetImage('mapaverde3');
        let tilesescaleras = map.addTilesetImage('escaleras');
        let tilespuentes = map.addTilesetImage('puentes');
        const escaleras = map.createStaticLayer("Escaleras", tilesescaleras, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tilestierra, 0, 0);
        const agua = map.createStaticLayer("Agua", tilesagua, 0, 0);
        const puentes = map.createStaticLayer("Puentes", tilespuentes, 0, 0);
        const cielo = map.createStaticLayer("Cielo", tilescielo, 0, 0);
        
        //Faltaria añadir la estructura de los enemigos
        
        //tierra.setCollisionByExclusion([-1, 0]);
        //escaleras.setCollisionByExclusion([-1, 0]);
        //puentes.setCollisionByExclusion([-1, 0]);
        this.player = new Player(this, 10, 565);
        
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
        this.player.update();
        
    }
    
}



