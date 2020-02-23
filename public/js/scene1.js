class scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image('ground', 'https://labs.phaser.io/assets/tilemaps/tiles/drawtiles.png');
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space1.png');
        this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser2.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/flame2.png');
        this.load.image('star','https://labs.phaser.io/assets/sprites/gem.png');
        this.load.image('bomb', 'https://labs.phaser.io/assets/sprites/mine.png');
        this.load.spritesheet('dude', 'public/img/hiclipart.com.png',
        { frameWidth: 60.75, frameHeight: 60.75 });
    }
    create(){
        
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");
    }
}