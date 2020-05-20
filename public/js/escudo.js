export default class Escudo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tipo, player) {
        super(scene, x, y, tipo);
        this.tipo = tipo;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.player = player;
        this.scene.escudo.add(this);
    }

    preUpdate(d, t) {
        super.preUpdate(d, t);

        if(!this.player.isDefending)
            this.destroy();
        
    }
}