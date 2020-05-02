import Player from "./player.js";
import Enemy from "./enemy.js";

const stepLimit = 100;

export default class GreenMapScene extends Phaser.Scene {
    
    constructor ()
    {
        super({
        key: 'GreenMapScene',
        physics: {
            default: 'arcade',
            arcade: { 
              gravity: { y: 500 }
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
        "../public/assets/spritesheets/edit1.png",
        {
            frameWidth: 33,
            frameHeight: 24
        }
        );
        this.load.spritesheet("ciclopes","../public/assets/spritesheets/Cyclops Sprite Sheet.png",{frameWidth: 64,
            frameHeight: 64});
        this.load.image('escaleras', '../public/assets/tilesets/escaleras3.jpg');
        //this.load.image('escaleras2', '../public/assets/tilesets/escaleras2.jpg');
        //this.load.image('escaleras3', '../public/assets/tilesets/escaleras3.jpg');
        this.load.image('mapaverde', '../public/assets/tilesets/genaric-cartoon-charactor-sprite-png-15-original.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/mapaVerde.json');
    }
    create(){
        
        const map = this.make.tilemap({ key: "map" });
        let tileset = map.addTilesetImage('genaric-cartoon-charactor-sprite-png-15-original', 'mapaverde');
        
        const cielo = map.createStaticLayer("Cielo", tileset, 0, 0);
        
        const agua = map.createStaticLayer("Agua", tileset, 0, 0);
        //const escaleras = map.createStaticLayer("Escaleras", tileset, 0, 0);
        const puentes = map.createStaticLayer("Puentes", tileset, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tileset, 0, 0);
        let arrayCiclopes = [];
        let arrayEscaleras = map.createFromObjects('Escaleras', 10, {key: "escaleras"});
        this.ciclopsGroup = this.physics.add.group();
        let escalerasGroup = this.physics.add.group();
        for (const ciclope of map.getObjectLayer('Ciclopes').objects)
        {       
            let enemigo = this.add.existing(new Enemy(this, ciclope.x, ciclope.y, "verde", ciclope.type));
            enemigo.collideWorldBounds=true;
            enemigo.sprite.body.bounce.x = 1;    
            enemigo.sprite.body.immovable = true;  
            this.ciclopsGroup.add(enemigo.sprite);
                           
        }
        
        for (const escalera of map.getObjectLayer('Escaleras').objects) {
            this.physics.add.staticImage(escalera.x, escalera.y, "escaleras");
        }
        
        
        //Faltaria añadir la estructura de los enemigos
        
        tierra.setCollisionByExclusion([-1]);
        puentes.setCollisionByExclusion([-1]);
        this.player = this.add.existing(new Player(this, 10, 540, null, this.mapa) );
        
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
        this.physics.add.collider(this.ciclopsGroup, tierra);
        this.physics.add.collider(escalerasGroup, tierra);
        
        this.physics.add.collider(this.player.sprite, puentes);
        this.physics.add.collider(this.player.sprite, this.ciclopsGroup, onTouchEnemy, null, this);
        
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player.sprite);
    }

    update(){
        
        if(this.player.sprite.x <= 9){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.start("DungeonScene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
            });
        }
        else this.player.update();
        for(let enemy of this.ciclopsGroup.getChildren())
            enemy.update();
    }
    
    
}
function onTouchEnemy(player, enemy) {
    enemy.body.velocity.x *= -1;
    enemy.destroy();
    // can add other code - damage player, etc.
    }
