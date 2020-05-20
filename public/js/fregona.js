export default class Fregona extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tipo, player) {
        super(scene, x, y, tipo);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.duracionAtaque = 10;
        this.creacion = 0;
        this.player = player;
        this.scene.fregona.add(this);
    }

    preUpdate(d, t) {
        super.preUpdate(d, t);
        if(this.creacion <= this.duracionAtaque)
            this.creacion++;
        else{
            this.destroy();
            this.player.isAttacking = false;
        }
    }
}