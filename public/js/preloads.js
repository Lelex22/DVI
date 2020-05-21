export default class Preloads extends Phaser.Scene {
    constructor(){
        super('Preloads');
    }
    preload(){
        this.load.bitmapFont('nokia', '../public/assets/nokia16.png', '../public/assets/nokia16.xml');
        this.load.image("background", '../public/img/title3.png');
        this.load.image("background2", '../public/img/title4.png');
        this.load.image("luigi", '../public/img/title2.png');
        //Dungeon preloads
        this.load.audio("mazmorra", "../public/assets/audio/dungeon.mp3");
        this.load.audio("letsgo", "../public/assets/audio/letsgo.wav");
        this.load.image("tiles", "../public/assets/tilesets/prueba2.png");
        this.load.image("5vidas", "../public/assets/imagenes/5vidas.png");
        this.load.image("4vidas", "../public/assets/imagenes/4vidas.png");
        this.load.image("3vidas", "../public/assets/imagenes/3vidas.png");
        this.load.image("2vidas", "../public/assets/imagenes/2vidas.png");
        this.load.image("1vida", "../public/assets/imagenes/1vida.png");
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
        //Mapa verde preloads
        //Audio mapa verde
        this.load.audio("audio_mapaverde", "../public/assets/audio/mapaverde.mp3");
        //Audios 
        this.load.audio("atacaplayer", "../public/assets/audio/atacaplayer.mp3");
        this.load.audio("defiendeplayer", "../public/assets/audio/defiendeplayer.mp3");
        this.load.audio("atacaciclope", "../public/assets/audio/atacaciclope.wav");
        this.load.audio("luigiatacado", "../public/assets/audio/luigiatacado.wav");
        this.load.audio("menufin", "../public/assets/audio/menufin.mp3");
        this.load.audio("fin", "../public/assets/audio/fin.wav");
        this.load.image("piedra", "../public/assets/imagenes/piedra.png");
        this.load.spritesheet("ciclope", "../public/assets/spritesheets/Cyclops Sprite Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("fregona", "../public/assets/spritesheets/fregona.png", {
            frameWidth: 26,
            frameHeight: 14
        });
        this.load.spritesheet("fregonaiz", "../public/assets/spritesheets/fregonaiz.png", {
            frameWidth: 26,
            frameHeight: 14
        });
        this.load.spritesheet("escudo", "../public/assets/spritesheets/escudo.png", {
            frameWidth: 60,
            frameHeight: 165
        });
        this.load.spritesheet("escudoiz", "../public/assets/spritesheets/escudoiz.png", {
            frameWidth: 60,
            frameHeight: 165
        });
        this.load.image('escaleras1', '../public/assets/tilesets/pruebanewtiles2.png');
        this.load.image('escaleras2', '../public/assets/tilesets/pruebanewtiles3.png');
        this.load.image('escaleras3', '../public/assets/tilesets/pruebanewtiles.png');
        this.load.image('mapaverde', '../public/assets/tilesets/genaric-cartoon-charactor-sprite-png-15-original.png');
        this.load.tilemapTiledJSON('map1', '../public/assets/tilesets/mapaVerde.json');
    }
    create(){
        this.scene.start("TitleScreenScene");
    }
}