export default class Fireball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy, speed) {
        super(scene, x + 7, y + 30, "fireball");
        this.magox = x;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.vel = 350;
        if(speed)
            this.vel = this.vel;
        else{
            this.vel = -this.vel;
            this.setFlipX(true);
        }
        this.body.allowGravity = false;
        this.scene.armasEnemigos.add(this);
        //this.body.setOffset(5,10);
        //this.body.syncBounds = true;
    
        if (this.tipo.localeCompare("fireballdrcha") === 0) {
            //Ataca derecha
               anims.create({
                key: "fireballdrcha",
                frames: anims.generateFrameNumbers('mago', { start: 0, end: 3 }),
                frameRate: 7,
                repeat: -1
            });
        } 
        if (this.tipo.localeCompare("fireballizda") === 0) {        
            //Ataca izquierda
            anims.create({
                key: "fireballizda",
                frames: anims.generateFrameNumbers('mago', { start: 0 , end: 3 }),
                frameRate: 7,
                repeat: -1
            });
        } 
    }

    preUpdate(d, t) {
        super.preUpdate(d, t);
        this.body.setVelocityX(this.vel);
        if(this.lastPosition.localeCompare("movizq") === 0){
            this.anims.play("fireballizda", true);
            lastSpeed = false;
        }
        else{
            this.anims.play("fireballdrcha", true);
            lastSpeed = true;
        }
        //Si fuera del limite del mapa
        if (this.x < this.magox - 500 || this.x > this.magox + 500) 
            this.destroy();
    }
}
