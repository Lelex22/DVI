export default class Fireball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy, speed) {
        super(scene, x + 7, y + 60, "fireball");
        this.scene = scene;
        this.magox = x;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.vel = 350;
        this.speed = speed;
        if(this.speed)
            this.vel = this.vel;
        else{
            this.vel = -this.vel;
            this.setFlipX(true);
        }
        this.body.allowGravity = false;
        this.scene.armasEnemigos.add(this);
    }

    preUpdate(d, t) {
        super.preUpdate(d, t);
        this.body.setVelocityX(this.vel);
        
        //Si fuera del limite del mapa
        if (this.x < this.magox - 1000 || this.x > this.magox + 1000) 
            this.destroy();
    }
}
