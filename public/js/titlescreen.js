export default class TitleScreenScene extends Phaser.Scene {

    constructor ()
    {
        super('TitleScreenScene');
    }
    preload(){}
    create(){
        this.carga = this.scene.get('Preloads');        
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
        this.background = this.add.sprite(500, 300, 'background').play('run');
        this.add.image(600, 300, 'luigi');
        this.add.dynamicBitmapText(200, 150, 'nokia', 'Zelgui', 128).setScrollFactor(0);
        this.add.dynamicBitmapText(200, 500, 'nokia', 'Pulsa ENTER para iniciar', 30).setScrollFactor(0);        
    }
    update(){        
        this.background.anims.play("run", true);
        if(this.key.isDown){
            this.scene.start("DungeonScene");
        }
    }
}