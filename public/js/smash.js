export default class Smash extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy, speed) {
        super(scene, x + 7, y + 30, "smash");
        this.vikingx = x;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.vel = 350;
        if (speed)
            this.vel = this.vel;
        else {
            this.vel = -this.vel;
            this.setFlipX(true);
        }
        this.body.allowGravity = false;
        this.scene.armasEnemigos.add(this);
        //this.body.setOffset(5,10);
        //this.body.syncBounds = true;
    }

    preUpdate(d, t) {
        super.preUpdate(d, t);
        this.body.setVelocityX(this.vel);
        //Si fuera del limite del mapa
        if (this.x < this.vikingx - 500 || this.x > this.vikingx + 500)
            this.destroy();
    }
}
