export default class TitleScreenScene extends Phaser.Scene {

    constructor ()
    {
        super('TitleScreenScene');
    }
    preload(){
        this.load.bitmapFont('nokia', '../DVI/public/assets/nokia16.png', '../public/assets/nokia16.xml');
        this.load.image("background", '../DVI/public/img/title3.png');
        this.load.image("background2", '../DVI/public/img/title4.png');
        this.load.image("luigi", '../DVI/public/img/title2.png');
    }
    create(){
        this.anims.create({
            key: "run",
            frames: [
                {key: 'background'}, 
                {key: 'background2'}
            ],
            frameRate: 2,
            repeat: 0
        });       
        this.key = this.input.keyboard.addKey('ENTER');
        this.background = this.add.sprite(400, 300, 'background').play('run');
        this.add.image(400, 300, 'luigi');
        this.add.dynamicBitmapText(100, 100, 'nokia', 'Zelgui', 128).setScrollFactor(0);
        this.add.dynamicBitmapText(30, 500, 'nokia', 'Pulsa ENTER para iniciar', 30).setScrollFactor(0);
        
    }
    update(){
        
        this.background.anims.play("run", true);
        if(this.key.isDown){
            this.scene.start("DungeonScene");
        }
    }
}