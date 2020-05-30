export default class Preloads extends Phaser.Scene {
    constructor(){
        super('Preloads');
    }
    preload(){
        this.load.bitmapFont('nokia', '../DVI/public/assets/nokia16.png', '../DVI/public/assets/nokia16.xml');
        this.load.image("background", '../DVI/public/img/title3.png');
        this.load.image("background2", '../DVI/public/img/title4.png');
        this.load.image("luigi", '../DVI/public/img/title2.png');
        //Dungeon preloads
        this.load.audio("mazmorra", "../DVI/public/assets/audio/dungeon.mp3");
        this.load.audio("letsgo", "../DVI/public/assets/audio/letsgo.wav");
        this.load.image("tiles", "../DVI/public/assets/tilesets/prueba2.png");
        this.load.image("10vidas", "../DVI/public/assets/imagenes/10vidas.png");
        this.load.image("9vidas", "../DVI/public/assets/imagenes/9vidas.png");
        this.load.image("8vidas", "../DVI/public/assets/imagenes/8vidas.png");
        this.load.image("7vidas", "../DVI/public/assets/imagenes/7vidas.png");
        this.load.image("6vidas", "../DVI/public/assets/imagenes/6vidas.png");
        this.load.image("5vidas", "../DVI/public/assets/imagenes/5vidas.png");
        this.load.image("4vidas", "../DVI/public/assets/imagenes/4vidas.png");
        this.load.image("3vidas", "../DVI/public/assets/imagenes/3vidas.png");
        this.load.image("2vidas", "../DVI/public/assets/imagenes/2vidas.png");
        this.load.image("1vida", "../DVI/public/assets/imagenes/1vida.png");
        this.load.image("lavabackground", "../DVI/public/assets/tilesets/Background (5).png");
        this.load.spritesheet("coin", "../DVI/public/assets/imagenes/coins.png", {
        frameWidth: 22.8333,
        frameHeight: 29
        });
        this.load.spritesheet(
        "player",
        "../DVI/public/assets/spritesheets/edit1.png",
        {
            frameWidth: 33,
            frameHeight: 24
        }
        );
        this.load.spritesheet(
            "tendera",
            "../DVI/public/assets/spritesheets/tendera.png",
            {
                frameWidth: 104,
                frameHeight: 104
            });
        //Tienda preloads
        this.load.image('tiendaTiles', '../DVI/public/assets/tilesets/tienda.png');
        this.load.tilemapTiledJSON('tiendaMap', '../DVI/public/assets/tilesets/tienda.json');        
        this.load.spritesheet('button', '../DVI/public/img/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
        //Mapa verde preloads
        //Audio mapa verde
        this.load.audio("audio_mapaverde", "../DVI/public/assets/audio/mapaverde.mp3");
        //Audio mapa lava
        this.load.audio("audio_mapalava", "../DVI/public/assets/audio/mapalava.mp3");
        //Audios 
        this.load.audio("atacaplayer", "../DVI/public/assets/audio/atacaplayer.mp3");
        this.load.audio("defiendeplayer", "../DVI/public/assets/audio/defiendeplayer.mp3");
        this.load.audio("atacaciclope", "../DVI/public/assets/audio/atacaciclope.wav");
        this.load.audio("luigiatacado", "../DVI/public/assets/audio/luigiatacado.wav");
        this.load.audio("menufin", "../DVI/public/assets/audio/menufin.mp3");
        this.load.audio("fin", "../DVI/public/assets/audio/fin.wav");
        this.load.audio("firesound", "../DVI/public/assets/audio/fireball.wav");
        this.load.audio("boom1", "../DVI/public/assets/audio/boom1.wav");
        this.load.audio("boom7", "../DVI/public/assets/audio/boom7.wav");
        this.load.audio("coin3", "../DVI/public/assets/audio/coin3.wav");
        this.load.image("piedra", "../DVI/public/assets/imagenes/piedra.png");
        this.load.image("smash", "../DVI/public/assets/imagenes/smash1.png");

        this.load.spritesheet("mago","../DVI/public/assets/spritesheets/imageedit_13_7724971945.png",{
            frameWidth: 83,
            frameHeight: 80
        });
        this.load.spritesheet("fireballdrcha","../DVI/public/assets/spritesheets/fireballdrch.png",{
            frameWidth: 37,
            frameHeight: 47
        });
        this.load.spritesheet("fireballizda","../DVI/public/assets/spritesheets/fireballizda.png",{
            frameWidth: 37,
            frameHeight: 47
        });
        this.load.image("fireball", "../DVI/public/assets/spritesheets/fireball.png");
        this.load.spritesheet("ciclope", "../DVI/public/assets/spritesheets/Cyclops Sprite Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("vikingos", "../DVI/public/assets/spritesheets/enemigo1.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("fregona", "../DVI/public/assets/spritesheets/fregona.png", {
            frameWidth: 45,
            frameHeight: 14
        });
        this.load.spritesheet("fregonaiz", "../DVI/public/assets/spritesheets/fregonaiz.png", {
            frameWidth: 45,
            frameHeight: 14
        });
        this.load.spritesheet("escudo", "../DVI/public/assets/spritesheets/escudo.png", {
            frameWidth: 60,
            frameHeight: 165
        });
        this.load.spritesheet("escudoiz", "../DVI/public/assets/spritesheets/escudoiz.png", {
            frameWidth: 60,
            frameHeight: 165
        });
        this.load.image('escaleras1', '../DVI/public/assets/tilesets/pruebanewtiles2.png');
        this.load.image('escaleras2', '../DVI/public/assets/tilesets/pruebanewtiles3.png');
        this.load.image('escaleras3', '../DVI/public/assets/tilesets/pruebanewtiles.png');
        this.load.image('mapaverde', '../DVI/public/assets/tilesets/genaric-cartoon-charactor-sprite-png-15-original.png');
        this.load.image('mapalava', '../DVI/public/assets/tilesets/Spritesheet_tileset.png');
        this.load.tilemapTiledJSON('map1', '../DVI/public/assets/tilesets/mapaVerde.json');
        this.load.tilemapTiledJSON('map2', '../DVI/public/assets/tilesets/nivel2.json');
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
    }
}
