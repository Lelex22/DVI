export default class Preloads extends Phaser.Scene {
    constructor(){
        super('Preloads');
    }
    preload(){
        this.load.bitmapFont('nokia', '../public/assets/nokia16.png', '../public/assets/nokia16.xml');
        this.load.image("background", '../public/assets/title/title3.png');
        this.load.image("background2", '../public/assets/title/title4.png');
        this.load.image("luigi", '../public/assets/title/title2.png');
        //Dungeon preloads
        this.load.audio("mazmorra", "../public/assets/audio/dungeon.mp3");
        this.load.audio("letsgo", "../public/assets/audio/letsgo.wav");
        this.load.image("tiles", "../public/assets/tilesets/prueba2.png");
        this.load.image("10vidas", "../public/assets/imagenes/10vidas.png");
        this.load.image("9vidas", "../public/assets/imagenes/9vidas.png");
        this.load.image("8vidas", "../public/assets/imagenes/8vidas.png");
        this.load.image("7vidas", "../public/assets/imagenes/7vidas.png");
        this.load.image("6vidas", "../public/assets/imagenes/6vidas.png");
        this.load.image("5vidas", "../public/assets/imagenes/5vidas.png");
        this.load.image("4vidas", "../public/assets/imagenes/4vidas.png");
        this.load.image("3vidas", "../public/assets/imagenes/3vidas.png");
        this.load.image("2vidas", "../public/assets/imagenes/2vidas.png");
        this.load.image("1vida", "../public/assets/imagenes/1vida.png");
        this.load.image("lavabackground", "../public/assets/tilesets/Background (5).png");
        this.load.spritesheet("coin", "../public/assets/imagenes/coins.png", {
        frameWidth: 22.8333,
        frameHeight: 29
        });
        this.load.spritesheet(
        "player",
        "../public/assets/spritesheets/edit1.png",
        {
            frameWidth: 33,
            frameHeight: 24
        }
        );
        this.load.spritesheet(
            "tendera",
            "../public/assets/spritesheets/tendera.png",
            {
                frameWidth: 104,
                frameHeight: 104
            });
        //Tienda preloads
        this.load.image('tiendaTiles', '../public/assets/tilesets/tienda.png');
        this.load.tilemapTiledJSON('tiendaMap', '../public/assets/tilesets/tienda.json');        
        this.load.spritesheet('button', '../public/assets/title/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
        //GameOver preloads
        this.load.image("gameover", "../public/assets/imagenes/gameover.png");
        this.load.image("click", "../public/assets/imagenes/subimagengameover.png");
        this.load.image("click2", "../public/assets/imagenes/volveraempezar.png");
        this.load.audio("bye", "../public/assets/audio/despedida.wav");
        //Mapa verde preloads
        //Audio mapa verde
        this.load.audio("audio_mapaverde", "../public/assets/audio/mapaverde.mp3");
        //Audio mapa lava
        this.load.audio("audio_mapalava", "../public/assets/audio/mapalava.mp3");
        //Audios 
        this.load.audio("atacaplayer", "../public/assets/audio/atacaplayer.mp3");
        this.load.audio("defiendeplayer", "../public/assets/audio/defiendeplayer.mp3");
        this.load.audio("atacaciclope", "../public/assets/audio/atacaciclope.wav");
        this.load.audio("luigiatacado", "../public/assets/audio/luigiatacado.wav");
        this.load.audio("menufin", "../public/assets/audio/menufin.mp3");
        this.load.audio("fin", "../public/assets/audio/fin.wav");
        this.load.audio("firesound", "../public/assets/audio/fireball.wav");
        this.load.audio("boom1", "../public/assets/audio/boom1.wav");
        this.load.audio("boom7", "../public/assets/audio/boom7.wav");
        this.load.audio("coin3", "../public/assets/audio/coin3.wav");
        this.load.image("piedra", "../public/assets/imagenes/piedra.png");
        this.load.image("smash", "../public/assets/imagenes/smash1.png");

        this.load.spritesheet("mago","../public/assets/spritesheets/imageedit_13_7724971945.png",{
            frameWidth: 83,
            frameHeight: 80
        });
        this.load.spritesheet("fireballdrcha","../public/assets/spritesheets/fireballdrch.png",{
            frameWidth: 37,
            frameHeight: 47
        });
        this.load.spritesheet("fireballizda","../public/assets/spritesheets/fireballizda.png",{
            frameWidth: 37,
            frameHeight: 47
        });
        this.load.image("fireball", "../public/assets/imagenes/fireball.png");
        this.load.spritesheet("ciclope", "../public/assets/spritesheets/Cyclops Sprite Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("vikingos", "../public/assets/spritesheets/enemigo1.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image("fregona", "../public/assets/imagenes/fregona.png");
        this.load.image("fregonaiz", "../public/assets/imagenes/fregonaiz.png");
        this.load.image("escudo", "../public/assets/imagenes/escudo.png");
        this.load.image("escudoiz", "../public/assets/imagenes/escudoiz.png");
        this.load.image('escaleras1', '../public/assets/tilesets/pruebanewtiles2.png');
        this.load.image('escaleras2', '../public/assets/tilesets/pruebanewtiles3.png');
        this.load.image('escaleras3', '../public/assets/tilesets/pruebanewtiles.png');
        this.load.image('mapaverde', '../public/assets/tilesets/genaric-cartoon-charactor-sprite-png-15-original.png');
        this.load.image('mapalava', '../public/assets/tilesets/Spritesheet_tileset.png');
        this.load.tilemapTiledJSON('map1', '../public/assets/tilesets/mapaVerde.json');
        this.load.tilemapTiledJSON('map2', '../public/assets/tilesets/nivel2.json');
    }
    create(){
        this.scene.start("TitleScreenScene");
    }
    //Funciones mapas
    colisiona(arma){
        arma.destroy();
    }
    defiende(escudo, arma){
        let audio_defensa = this.sound.add("defiendeplayer", {
            volume: 2,
        });
        audio_defensa.play();
        arma.destroy();
    }
    defiende2(escudo, arma){
        let audio_defensa = this.sound.add("boom7", {
            volume: 2,
        });
        audio_defensa.play();
        arma.destroy();
    }
    attackEnemy(player, enemy){
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
    attackPlayer(player, arma){
        if(!player.atacado && !player.enemyTouch){
            player.atacado = true;
            player.life -= 1;
            player.tint = 0xff0000;
            if(player.life >= 1){
                let audio_atacado = this.sound.add("luigiatacado", {
                    volume: 1.5,
                });
                audio_atacado.play();
                }
            this.time.addEvent({ delay: 1000, callback: function(){
                player.atacado = false;
                player.tint = 0xffffff;
                },
            });
            arma.destroy();
        }
    }
    onTouchEnemy(player) {
        if (player.body.touching.down) {
            player.body.setVelocityY(-200);
            player.body.setVelocityX(200);
        }
        else if (player.body.touching.right) {
            player.body.setVelocityY(-200);
            player.body.setVelocityX(200);
        }
        else if (player.body.touching.left) {
            player.body.setVelocityY(-200);
            player.body.setVelocityX(-200);
        }
        else {
            player.body.setVelocityY(-200);
        }
        if(!player.buffs[2]["value"]){
            if(!player.enemyTouch && !player.atacado){
                player.enemyTouch = true;
                player.tint = 0xff0000;
                
                if(player.enemyTouch){
                    this.sound.add("luigiatacado", {
                        volume: 1.5,
                    }).play();
                    player.life -= 1;
                    this.time.addEvent({ delay: 2000, callback: function(){
                            player.tint = 0xffffff;
                            player.enemyTouch = false;
                        },
                    });
                    
                }
            }
        }
    }
    onTouchEscalera(player,escalera) {
        player.escaleras = true;
        player.yEscalera = escalera.y;
        player.xEscalera = escalera.x;
    }
    getCoin(player, coin){
        this.coinsGroup.killAndHide(coin);
        coin.body.enable = false;
        player.coins += 1;
        this.text.setText("X " + player.coins);
        this.sound.add("coin3", {
            volume: 1,
        }).play();
    }
    coinsDestruct(coin){
        if(coin.y >= 560)
            coin.destroy();
    }
    dibujaVidas(scene, vidasPlayer){
        switch (vidasPlayer) {
            case 10:
                return scene.add.sprite(16, 20, "10vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 9:
                return scene.add.sprite(16, 20, "9vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 8:
                return scene.add.sprite(16, 20, "8vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 7:
                return scene.add.sprite(16, 20, "7vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 6:
                return scene.add.sprite(16, 20, "6vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 5:
                return scene.add.sprite(16, 20, "5vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 4:
                return scene.add.sprite(16, 20, "4vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 3:
                return scene.add.sprite(16, 20, "3vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 2:
                return scene.add.sprite(16, 20, "2vidas").setOrigin(0).setScrollFactor(0);
                break;
            case 1:
                return scene.add.sprite(16, 20, "1vida").setOrigin(0).setScrollFactor(0);
                break;
            default:
                break;
        }
    }
    updateLife(vidas, life){
        switch (life) {
            case 10:
                vidas.setTexture("10vidas");
                break;
            case 9:
                vidas.setTexture("9vidas");
                break;
            case 8:
                vidas.setTexture("8vidas");
                break;
            case 7:
                vidas.setTexture("7vidas");
                break;
            case 6:
                vidas.setTexture("6vidas");
                break;
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
                vidas.destroy();
                break;
        }
    }
    //No descomentar hasta que la capa de tierra no tenga debajo la de agua
    gameOverPorAgua(player){
        if(player.body.y >= 580 || player.y >= 580){
            player.life = 0;
        }
        return player;
    }
    dibujaMonedas(scene){
        scene.add.sprite(850, 20, "coin").setOrigin(0).setScrollFactor(0).setScale(1.5);
        return scene.add.text(890, 27, "X " + scene.player.coins, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "30px" }).setOrigin(0).setScrollFactor(0);
    }
    updateMonedas(textMonedas, coins){
        textMonedas.setText("X " + coins);
    }
    creaAnimacionesPlayer(anims){
        //Sin nada
        anims.create({
         key: "up",
         frames: anims.generateFrameNumbers('player', { start: 56, end: 57 }),
         frameRate: 10,
         repeat: 0
       });
       //Solo capa
       anims.create({
         key: "up-capa",
         frames: anims.generateFrameNumbers('player', { start: 69, end: 70 }),
         frameRate: 10,
         repeat: 0
       });
       //Solo espada
       anims.create({
         key: "up-espada",
         frames: anims.generateFrameNumbers('player', { start: 58, end: 59 }),
         frameRate: 10,
         repeat: 0
       });
       //Capa espada
       anims.create({
         key: "up-capa-espada",
         frames: anims.generateFrameNumbers('player', { start: 62, end: 63 }),
         frameRate: 10,
         repeat: 0
       });
       //Solo escudo
       anims.create({
         key: "up-escudo",
         frames: anims.generateFrameNumbers('player', { start: 65, end: 66 }),
         frameRate: 10,
         repeat: 0
       });
       //Escudo capa
       anims.create({
         key: "up-capa-escudo",
         frames: anims.generateFrameNumbers('player', { start: 67, end: 68 }),
         frameRate: 10,
         repeat: 0
       });
       //Escudo espada
       anims.create({
         key: "up-espada-escudo",
         frames: anims.generateFrameNumbers('player', { start: 60, end: 61 }),
         frameRate: 10,
         repeat: 0
       });
       //Todo
       anims.create({
         key: "up-capa-espada-escudo",
         frames: anims.generateFrameNumbers('player', { start: 70, end: 71 }),
         frameRate: 10,
         repeat: 0
       });
       //Sin nada
       anims.create({
         key: "down",
         frames: anims.generateFrameNumbers('player', { start: 39, end: 40 }),
         frameRate: 10,
         repeat: 0
       });
       //Solo capa
       anims.create({
         key: "down-capa",
         frames: anims.generateFrameNumbers('player', { start: 45, end: 46 }),
         frameRate: 10,
         repeat: 0
       });
       //Solo espada
       anims.create({
         key: "down-espada",
         frames: anims.generateFrameNumbers('player', { start: 41, end: 42 }),
         frameRate: 10,
         repeat: 0
       });
       //Capa espada
       anims.create({
         key: "down-capa-espada",
         frames: anims.generateFrameNumbers('player', { start: 49, end: 50 }),
         frameRate: 10,
         repeat: 0
       });
       //Solo escudo
       anims.create({
         key: "down-escudo",
         frames: anims.generateFrameNumbers('player', { start: 43, end: 44 }),
         frameRate: 10,
         repeat: 0
       });
       //Escudo capa
       anims.create({
         key: "down-capa-escudo",
         frames: anims.generateFrameNumbers('player', { start: 52, end: 53 }),
         frameRate: 10,
         repeat: 0
       });
       //Escudo espada
       anims.create({
         key: "down-espada-escudo",
         frames: anims.generateFrameNumbers('player', { start: 47, end: 48 }),
         frameRate: 10,
         repeat: 0
       });
       //Todo
       anims.create({
         key: "down-capa-espada-escudo",
         frames: anims.generateFrameNumbers('player', { start: 54, end: 55 }),
         frameRate: 10,
         repeat: 0
       });
         //Sin nada
         anims.create({
           key: "right",
           frames: anims.generateFrameNumbers('player', { start: 18, end: 19 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo capa
         anims.create({
           key: "right-capa",
           frames: anims.generateFrameNumbers('player', { start: 14, end: 15 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo espada
         anims.create({
           key: "right-espada",
           frames: anims.generateFrameNumbers('player', { start: 16, end: 17 }),
           frameRate: 10,
           repeat: 0
         });
         //Capa espada
         anims.create({
           key: "right-capa-espada",
           frames: anims.generateFrameNumbers('player', { start: 6, end: 7 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo escudo
         anims.create({
           key: "right-escudo",
           frames: anims.generateFrameNumbers('player', { start: 24, end: 25 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo capa
         anims.create({
           key: "right-capa-escudo",
           frames: anims.generateFrameNumbers('player', { start: 32, end: 33 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo espada
         anims.create({
           key: "right-espada-escudo",
           frames: anims.generateFrameNumbers('player', { start: 26, end: 27 }),
           frameRate: 10,
           repeat: 0
         });
         //Todo
         anims.create({
           key: "right-capa-espada-escudo",
           frames: anims.generateFrameNumbers('player', { start: 28, end: 29 }),
           frameRate: 10,
           repeat: 0
         });
         //Sin nada
         anims.create({
           key: "left",
           frames: anims.generateFrameNumbers('player', { start: 4, end: 5 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo capa
         anims.create({
           key: "left-capa",
           frames: anims.generateFrameNumbers('player', { start: 2, end: 3 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo espada
         anims.create({
           key: "left-espada",
           frames: anims.generateFrameNumbers('player', { start: 10, end: 11 }),
           frameRate: 10,
           repeat: 0
         });
         //Capa espada
         anims.create({
           key: "left-capa-espada",
           frames: anims.generateFrameNumbers('player', { start: 8, end: 9 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo escudo
         anims.create({
           key: "left-escudo",
           frames: anims.generateFrameNumbers('player', { start: 12, end: 13 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo capa
         anims.create({
           key: "left-capa-escudo",
           frames: anims.generateFrameNumbers('player', { start: 30, end: 31 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo espada
         anims.create({
           key: "left-espada-escudo",
           frames: anims.generateFrameNumbers('player', { start: 20, end: 21 }),
           frameRate: 10,
           repeat: 0
         });
         //Todo
         anims.create({
           key: "left-capa-espada-escudo",
           frames: anims.generateFrameNumbers('player', { start: 22, end: 23 }),
           frameRate: 10,
           repeat: 0
         });
         //Sin nada
         anims.create({
           key: "right-stand",
           frames: anims.generateFrameNumbers('player', { start: 18, end: 18 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo capa
         anims.create({
           key: "right-capa-stand",
           frames: anims.generateFrameNumbers('player', { start: 14, end: 14 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo espada
         anims.create({
           key: "right-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 16, end: 16 }),
           frameRate: 10,
           repeat: 0
         });
         //Capa espada
         anims.create({
           key: "right-capa-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 6, end: 6 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo escudo
         anims.create({
           key: "right-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 24, end: 24 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo capa
         anims.create({
           key: "right-capa-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 32, end: 32 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo espada
         anims.create({
           key: "right-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 26, end: 26 }),
           frameRate: 10,
           repeat: 0
         });
         //Todo
         anims.create({
           key: "right-capa-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 28, end: 28 }),
           frameRate: 10,
           repeat: 0
         });
         //Sin nada
         anims.create({
           key: "left-stand",
           frames: anims.generateFrameNumbers('player', { start: 4, end: 4 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo capa
         anims.create({
           key: "left-capa-stand",
           frames: anims.generateFrameNumbers('player', { start: 2, end: 2 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo espada
         anims.create({
           key: "left-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 10, end: 10 }),
           frameRate: 10,
           repeat: 0
         });
         //Capa espada
         anims.create({
           key: "left-capa-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 8, end: 8 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo escudo
         anims.create({
           key: "left-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 12, end: 12 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo capa
         anims.create({
           key: "left-capa-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 30, end: 30 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo espada
         anims.create({
           key: "left-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 20, end: 20 }),
           frameRate: 10,
           repeat: 0
         });
         //Todo
         anims.create({
           key: "left-capa-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 22, end: 22 }),
           frameRate: 10,
           repeat: 0
         });
         //Stand up
         anims.create({
           key: "up-stand",
           frames: anims.generateFrameNumbers('player', { start: 56, end: 56 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo capa
         anims.create({
           key: "up-capa-stand",
           frames: anims.generateFrameNumbers('player', { start: 69, end: 69 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo espada
         anims.create({
           key: "up-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 58, end: 58 }),
           frameRate: 10,
           repeat: 0
         });
         //Capa espada
         anims.create({
           key: "up-capa-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 62, end: 62 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo escudo
         anims.create({
           key: "up-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 65, end: 65 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo capa
         anims.create({
           key: "up-capa-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 67, end: 67 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo espada
         anims.create({
           key: "up-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 60, end: 60 }),
           frameRate: 10,
           repeat: 0
         });
         //Todo
         anims.create({
           key: "up-capa-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 71, end: 71 }),
           frameRate: 10,
           repeat: 0
         });
         //Stand down
         anims.create({
           key: "down-stand",
           frames: anims.generateFrameNumbers('player', { start: 39, end: 39 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo capa
         anims.create({
           key: "down-capa-stand",
           frames: anims.generateFrameNumbers('player', { start: 45, end: 45 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo espada
         anims.create({
           key: "down-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 41, end: 41 }),
           frameRate: 10,
           repeat: 0
         });
         //Capa espada
         anims.create({
           key: "down-capa-espada-stand",
           frames: anims.generateFrameNumbers('player', { start: 49, end: 49 }),
           frameRate: 10,
           repeat: 0
         });
         //Solo escudo
         anims.create({
           key: "down-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 43, end: 43 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo capa
         anims.create({
           key: "down-capa-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 53, end: 53 }),
           frameRate: 10,
           repeat: 0
         });
         //Escudo espada
         anims.create({
           key: "down-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 47, end: 47 }),
           frameRate: 10,
           repeat: 0
         });
         //Todo
         anims.create({
           key: "down-capa-espada-escudo-stand",
           frames: anims.generateFrameNumbers('player', { start: 55, end: 55 }),
           frameRate: 10,
           repeat: 0
         });
     }
     makeButton(name, x, y, precio)
    {
         let button = this.add.image(x, y, 'button', 0).setInteractive(), text;
         button.name = name;
         button.precio = precio;
         if(button.name === "Aumento de Vida Máxima"){
             button.setScale(4, 1.5);
             text = this.add.bitmapText(x - 40, y - 8, 'nokia', "+1 Vida Máxima X " + precio + " monedas", 16);
             text.x += (button.width - text.width) / 2;
         }
         else{
             button.setScale(3, 1.5)
             text = this.add.bitmapText(x - 40, y - 8, 'nokia', name + " X " + precio + " monedas", 16);
             text.x += (button.width - text.width) / 2;
         }
         return [button,text];
    }
    setButtonFrame(button, frame)
    {
        button.frame = button.scene.textures.getFrame('button', frame);
    }
}
