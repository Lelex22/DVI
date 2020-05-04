import Player from "./player.js";
import Enemy from "./enemy.js";
import Escaleras from "./escaleras.js";

const stepLimit = 15;

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
        "player",
        "../public/assets/spritesheets/edit1.png",
        {
            frameWidth: 33,
            frameHeight: 24
        }
        );
        this.load.spritesheet("ciclope","../public/assets/spritesheets/Cyclops Sprite Sheet.png",{frameWidth: 64,
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
        const puentes = map.createStaticLayer("Puentes", tileset, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tileset, 0, 0);
        
        this.escaleras = [];
        this.ciclopsGroup = this.physics.add.group();
        this.escalerasGroup = this.physics.add.group();
        for (const objeto of map.getObjectLayer('Objects').objects)
        {       
            if(objeto.type.localeCompare("ciclope") === 0){
            let enemigo = new Enemy(this, objeto.x, objeto.y, "verde", objeto.type);
            enemigo.body.bounce.x = 1;    
            this.ciclopsGroup.add(enemigo);
            }
            else {
                let escalera = new Escaleras(this, objeto.x, objeto.y);
                this.escaleras.push(escalera);
            }                           
        }
        
        
        //Faltaria añadir la estructura de los enemigos
        this.physics.world.addOverlap(this.escaleras[0], this.player, () => {
            console.log("Overlap???");
        });
        tierra.setCollisionByExclusion([-1]);
        puentes.setCollisionByExclusion([-1]);
        
        this.player = new Player(this, 10, 540, null, this.mapa, this.lifesPlayer);
        
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
        
        
        
        this.physics.add.collider(this.player, tierra);
        //this.physics.add.collider(this.ciclopsGroup, tierra);
        for(const escalera of this.escaleras)
            this.physics.world.addOverlap(escalera, this.player, () => {
                console.log("Overlap");
            });
       
        this.physics.add.collider(this.player, puentes);
        this.physics.add.collider(this.player, this.ciclopsGroup, onTouchEnemy, null, this);
        this.physics.add.collider(this.ciclopsGroup, tierra);


        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player);
    }

    update(){
        if(this.player.x <= 9){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.start("DungeonScene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
            });
        }
            
            
    }
    
    
}
function onTouchEnemy(player, enemy) {
    enemy.body.velocity.x *= -1;
    }
