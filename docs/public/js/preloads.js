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
        this.load.image("5vidas", "../DVI/public/assets/imagenes/5vidas.png");
        this.load.image("4vidas", "../DVI/public/assets/imagenes/4vidas.png");
        this.load.image("3vidas", "../DVI/public/assets/imagenes/3vidas.png");
        this.load.image("2vidas", "../DVI/public/assets/imagenes/2vidas.png");
        this.load.image("1vida", "../DVI/public/assets/imagenes/1vida.png");
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
        //Mapa verde preloads
        //Audio mapa verde
        this.load.audio("audio_mapaverde", "../DVI/public/assets/audio/mapaverde.mp3");
        //Audios 
        this.load.audio("atacaplayer", "../DVI/public/assets/audio/atacaplayer.mp3");
        this.load.audio("defiendeplayer", "../DVI/public/assets/audio/defiendeplayer.mp3");
        this.load.audio("atacaciclope", "../DVI/public/assets/audio/atacaciclope.wav");
        this.load.audio("luigiatacado", "../DVI/public/assets/audio/luigiatacado.wav");
        this.load.audio("menufin", "../DVI/public/assets/audio/menufin.mp3");
        this.load.audio("fin", "../DVI/public/assets/audio/fin.wav");
        this.load.image("piedra", "../DVI/public/assets/imagenes/piedra.png");
        this.load.spritesheet("ciclope", "../DVI/public/assets/spritesheets/Cyclops Sprite Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("fregona", "../DVI/public/assets/spritesheets/fregona.png", {
            frameWidth: 26,
            frameHeight: 14
        });
        this.load.spritesheet("fregonaiz", "../DVI/public/assets/spritesheets/fregonaiz.png", {
            frameWidth: 26,
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
        this.load.tilemapTiledJSON('map1', '../DVI/public/assets/tilesets/mapaVerde.json');
    }
    create(){
        this.scene.start("TitleScreenScene");
    }
}