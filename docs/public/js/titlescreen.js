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
        //Audio
        const config = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
         };   
        this.audio = this.sound.add("musiinicio", config);
		this.audio.play();      
    }
    update(){        
        this.background.anims.play("run", true);
        if(this.key.isDown){
            this.scene.start("DungeonScene");
            this.sound.removeByKey("musiinicio");
            this.audio = null;
        }
    }
}