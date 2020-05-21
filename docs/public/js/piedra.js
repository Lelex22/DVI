export default class Piedra extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy, speed) {
        super(scene, x + 7, y + 30, "piedra");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.vel = 200;
        if(speed)
            this.vel = this.vel;
        else this.vel = -this.vel;
        this.body.allowGravity = false;
        this.scene.armasEnemigos.add(this);
        this.body.setOffset(5,10);
        //this.body.syncBounds = true;
    }

    preUpdate(d, t) {
        super.preUpdate(d, t);
        this.body.setVelocityX(this.vel);
        //Si fuera del limite del mapa
        if (this.x < -30 || this.x > 9553) 
            this.destroy();
    }
}
