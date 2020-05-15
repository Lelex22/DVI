import Player from "./player.js";
import Enemy from "./enemy.js";
import Coin from "./coins.js";

const stepLimit = 15;

export default class GreenMapScene extends Phaser.Scene {

    constructor() {
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

    init(data) {
        if (data !== null) {
            this.lifesPlayer = data.vidas;
            this.coinsPlayer = data.monedas;
            this.buffsPlayer = data.buffs;
            this.mapa = data.mapa;
        }
        //else this.player = new Player(this, 0, 0);
    }
    preload() {
        this.load.image("5vidas", "../public/assets/imagenes/5vidas.png");
        this.load.image("4vidas", "../public/assets/imagenes/4vidas.png");
        this.load.image("3vidas", "../public/assets/imagenes/3vidas.png");
        this.load.image("2vidas", "../public/assets/imagenes/2vidas.png");
        this.load.image("1vida", "../public/assets/imagenes/1vida.png");
        this.load.image("piedra", "../public/assets/imagenes/piedra.png");
        this.load.spritesheet(
            "player",
            "../public/assets/spritesheets/edit1.png",
            {
                frameWidth: 33,
                frameHeight: 24
            }
        );
        this.load.spritesheet("ciclope", "../public/assets/spritesheets/Cyclops Sprite Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("coin", "../public/assets/imagenes/coins.png", {
            frameWidth: 22.8333,
            frameHeight: 29
        });
        this.load.spritesheet("fregona", "../public/assets/spritesheets/fregona.png", {
            frameWidth: 26,
            frameHeight: 14
        });
        this.load.spritesheet("fregonaiz", "../public/assets/spritesheets/fregonaiz.png", {
            frameWidth: 26,
            frameHeight: 14
        });
        this.load.image('escaleras1', '../public/assets/tilesets/pruebanewtiles2.png');
        this.load.image('escaleras2', '../public/assets/tilesets/pruebanewtiles3.png');
        this.load.image('escaleras3', '../public/assets/tilesets/pruebanewtiles.png');
        this.load.image('mapaverde', '../public/assets/tilesets/genaric-cartoon-charactor-sprite-png-15-original.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/mapaVerde.json');
    }
    create() {

        const map = this.make.tilemap({ key: "map" });
        let tileset = map.addTilesetImage('genaric-cartoon-charactor-sprite-png-15-original', 'mapaverde');

        const cielo = map.createStaticLayer("Cielo", tileset, 0, 0);

        const agua = map.createStaticLayer("Agua", tileset, 0, 0);
        const puentes = map.createStaticLayer("Puentes", tileset, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tileset, 0, 0);
        this.ciclopsGroup = this.physics.add.group();
        this.lifeGroup = this.physics.add.group();
        this.coinsGroup = this.physics.add.group();
        for(let i = 1; i <= 20; i++){
            let coin = new Coin(this, Phaser.Math.RND.integerInRange(475*(i - 1), 475*i), 100);
            coin.body.bounce.x = 1; 
            this.coinsGroup.add(coin);
        }
   
        //this.escalerasGroup = this.physics.add.group();
        for (const objeto of map.getObjectLayer('Objects').objects) {
            if (objeto.type.localeCompare("ciclope") === 0) {
                let enemigo = new Enemy(this, objeto.x, objeto.y, "verde", objeto.type);
                enemigo.body.bounce.x = 1;
                this.ciclopsGroup.add(enemigo);
            }
        }

        //Faltaria añadir la estructura de los enemigos
        tierra.setCollisionByExclusion([-1]);
        puentes.setCollisionByExclusion([-1]);
        
        this.player = new Player(this, 10, 540, [{name: "Escudo", value: false}, {name: "Espada", value: true}, {name: "Capa", value: false}], this.lifesPlayer);
        this.armas = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.armasEnemigos = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        for (const objeto of map.getObjectLayer('Objects').objects) {
            if(objeto.type.localeCompare("ciclope") !== 0) {
                //let escalera = new Escaleras(this, objeto.x, objeto.y, objeto.name);
                if(objeto.name.localeCompare("escaleras1") === 0){
                    this.escaleras1 = this.add.image(objeto.x, objeto.y, objeto.name);
                    console.log(this.escaleras1);
                }
                else if(objeto.name.localeCompare("escaleras2") === 0){
                    this.escaleras2 = this.add.image(objeto.x, objeto.y, objeto.name);
                }
                else if(objeto.name.localeCompare("escaleras3") === 0){
                    this.escaleras3 = this.add.image(objeto.x, objeto.y, objeto.name);
                }
            }
        }
        if (this.lifesPlayer && (this.coinsPlayer || this.coinsPlayer === 0) && this.buffsPlayer) {
            this.buffsPlayer.forEach(function (elem, i) {
                if (elem.value)
                    this.player.buffs[i].value = elem.value;
            }, this);
            this.player.buffs = this.buffsPlayer;
            this.player.coins = this.coinsPlayer;
            this.player.life = this.lifesPlayer;
        }
        // for (let i = 0; i < this.player.life; i++)
        //     this.add.image(32 * i + 16, 20, 'heart')
        this.vidas = this.add.sprite(16, 20, "5vidas").setOrigin(0).setScrollFactor(0);
        this.vidas.setTexture("5vidas");
        this.monedas = this.add.sprite(650, 20, "coin").setOrigin(0).setScrollFactor(0).setScale(1.5);
        this.text = this.add.text(690, 27, "X " + this.player.coins, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "30px" }).setOrigin(0).setScrollFactor(0);
        this.physics.add.collider(this.player, tierra);
        this.physics.add.collider(this.ciclopsGroup, tierra);
        this.physics.add.collider(this.ciclopsGroup, this.ciclopsGroup);
        this.physics.add.collider(this.coinsGroup, tierra);        
        this.physics.add.collider(this.player, puentes);
        this.physics.add.collider(this.armasEnemigos, tierra, colisiona, null, this);
        this.physics.add.overlap(this.player, this.ciclopsGroup, onTouchEnemy, null, this);
        this.physics.add.overlap(this.player, this.coinsGroup, getCoin, null, this);
        this.physics.add.overlap(this.armas, this.ciclopsGroup, attackEnemy, null, this);
        this.physics.add.overlap(this.armasEnemigos, this.player, attackPlayer, null, this);
        this.physics.add.overlap(this.player, agua, gameOverPorAgua, null, this);
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player);
    }

    update() {
        if(this.player.x >= this.escaleras1.x - 25 && this.player.x <= this.escaleras1.x + 25 && this.player.y > this.escaleras1.y/2)
            onTouchEscalera(this.player, this.escaleras1);
        if(this.player.x >= this.escaleras2.x - 16 && this.player.x <= this.escaleras2.x + 16 && this.player.y > this.escaleras2.y/2)
            onTouchEscalera(this.player, this.escaleras2);
        if(this.player.x >= this.escaleras3.x - 16 && this.player.x <= this.escaleras3.x + 16 && this.player.y > this.escaleras3.y/2)
            onTouchEscalera(this.player, this.escaleras3);
        if (this.player.x <= 9) {
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.scene.start("DungeonScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs });
                this.player.destroy();
            });
        }
        else this.player.update();
        updateLife(this.vidas, this.player.life);
    }


}
function colisiona(arma){
    arma.destroy();
}
function attackEnemy(player, enemy){
    if(!enemy.atacado){
        enemy.atacado = true;
        enemy.life -= 1;
        enemy.tint = 0xff0000;
        this.time.addEvent({ delay: 500, callback: function(){
            enemy.atacado = false;
            enemy.tint = 0xffffff;
            },
        });
    }
}
function attackPlayer(player, arma){
    if(!player.atacado){
        player.atacado = true;
        player.life -= 1;
        player.tint = 0xff0000;
        this.time.addEvent({ delay: 500, callback: function(){
            player.atacado = false;
            player.tint = 0xffffff;
            },
        });
    }
}
function onTouchEnemy(player) {
    if(!this.player.enemyTouch && !this.player.atacado){
        this.player.enemyTouch = true;
        this.player.tint = 0xff0000;
        if (this.player.body.touching.down) {
            this.player.body.setVelocityY(-200);
            this.player.body.setVelocityX(200);
        }
        else if (this.player.body.touching.right) {
            this.player.body.setVelocityY(-200);
            this.player.body.setVelocityX(200);
        }
        else if (this.player.body.touching.left) {
            this.player.body.setVelocityY(-200);
            this.player.body.setVelocityX(-200);
        }
        else {
            this.player.body.setVelocityY(-200);
        }
        if(this.player.enemyTouch){
            player.life -= 1;
            this.time.addEvent({ delay: 2000, callback: function(){
                    player.tint = 0xffffff;
                    player.enemyTouch = false;
                },
            });
            
        }
    }
}
function onTouchEscalera(player,escalera) {
    if(player.y <= escalera.y/2){
        player.body.setVelocityY(player.speed);
    }
    else player.body.setVelocityY(-player.speed);
}
function getCoin(player, coin){
    this.coinsGroup.killAndHide(coin);
    coin.body.enable = false;
    player.coins += 1;
    this.text.setText("X " + player.coins);
}

function updateLife(vidas, life){
    switch (life) {
        case 5:
            vidas.setTexture("5vidas");
            break;
        case 4:
            vidas.setTexture("4vidas");
            break;
        case 3:
            vidas.setTexture("3vidas");
            break;
        case 2:
            vidas.setTexture("2vidas");
            break;
        case 1:
            vidas.setTexture("1vida");
            break;
        default:
            break;
    }
}
//No descomentar hasta que la capa de tierra no tenga debajo la de agua
function gameOverPorAgua(player){
    if(player.body.y >= 585){
        console.log("Fin");
        this.scene.pause(this);
    }
}
